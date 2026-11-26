// KHÔNG thay thế file vite.config của bạn: chỉ MERGE các khóa dưới đây vào config hiện có.
import { defineConfig } from 'vite';

export default defineConfig({
  // ...giữ nguyên plugins (react()...) và các cấu hình đang có...

  build: {
    // Không xuất source map ra production => người ngoài không dựng lại được code React gốc
    // (tên component, tên biến, cấu trúc file) từ bundle. Mặc định của Vite đã là false,
    // nhưng nếu ai đó từng bật thì dòng này đảm bảo tắt.
    sourcemap: false,
  },

  esbuild: {
    // Bỏ console.* / debugger và comment bản quyền khỏi bundle production.
    drop: ['console', 'debugger'],
    legalComments: 'none',
  },

  // Chỉ dùng khi test trên điện thoại / qua tunnel (npm run dev, npm run preview).
  // Không ảnh hưởng bản build deploy.
  server: {
    host: true,                          // lắng nghe trên mạng LAN (tương đương --host)
    allowedHosts: ['.trycloudflare.com'], // cho phép link tạm của cloudflared
  },
  preview: {
    host: true,
    allowedHosts: ['.trycloudflare.com'],
  },
});
