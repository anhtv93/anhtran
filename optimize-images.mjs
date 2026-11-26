// Nén ảnh trong public/ TẠI CHỖ (giữ nguyên tên file + đường dẫn => không cần sửa code).
//
// Cách dùng (chạy ở thư mục gốc dự án):
//   npm i -D sharp
//   node optimize-images.mjs            # mặc định xử lý ./public
//   node optimize-images.mjs path/to/public
//
// Bản gốc được backup vào ./.image-backup/ (ngoài public nên không bị deploy).
// Chỉ ghi đè khi file mới nhỏ hơn file cũ.

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve(process.argv[2] || 'public');
const BACKUP_DIR = path.resolve('.image-backup');

const JPEG_MAX_WIDTH = 1400; // ảnh dự án/kinh nghiệm hiển thị tối đa ~700px => 2x cho màn retina
const SMALL_PNG_MAX = 640;   // logo đối tác + loader hiển thị nhỏ (<= 300px)

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]))
  );
  return files.flat();
};

const fmt = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

const optimize = async (file) => {
  const ext = path.extname(file).toLowerCase();
  const rel = path.relative(PUBLIC_DIR, file).split(path.sep).join('/');
  const input = await fs.readFile(file);

  let pipeline = sharp(input).rotate(); // áp dụng EXIF orientation trước khi bỏ metadata
  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline
      .resize({ width: JPEG_MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true });
  } else if (ext === '.png') {
    const isSmallAsset = /^(Logos|assets\/loader)\//.test(rel);
    if (isSmallAsset) {
      pipeline = pipeline.resize({ width: SMALL_PNG_MAX, height: SMALL_PNG_MAX, fit: 'inside', withoutEnlargement: true });
    }
    pipeline = pipeline.png({ palette: true, quality: 85, compressionLevel: 9, effort: 10 });
  } else {
    return null;
  }

  const output = await pipeline.toBuffer();
  if (output.length >= input.length) return { rel, before: input.length, after: input.length, skipped: true };

  const backupPath = path.join(BACKUP_DIR, rel);
  await fs.mkdir(path.dirname(backupPath), { recursive: true });
  try { await fs.access(backupPath); } catch { await fs.writeFile(backupPath, input); }
  await fs.writeFile(file, output);
  return { rel, before: input.length, after: output.length, skipped: false };
};

const files = await walk(PUBLIC_DIR);
let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const result = await optimize(file);
  if (!result) continue;
  totalBefore += result.before;
  totalAfter += result.after;
  const note = result.skipped ? 'giữ nguyên' : `${fmt(result.before)} -> ${fmt(result.after)}`;
  console.log(`${result.rel.padEnd(48)} ${note}`);
}

console.log(`\nTổng: ${fmt(totalBefore)} -> ${fmt(totalAfter)} (giảm ${(100 - (totalAfter / totalBefore) * 100).toFixed(0)}%)`);
console.log(`Bản gốc đã backup tại: ${BACKUP_DIR}`);
