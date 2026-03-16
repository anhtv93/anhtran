import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView, useMotionValue, useTransform } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  ExternalLink,
  ArrowDownRight,
  ShoppingBag,
  Send,
  X,
  Mail,
  Phone,
  Facebook,
  MessageCircle,
  ArrowUp,
  CheckCircle2
} from 'lucide-react';

const SERVICES = [
  { title: "Brand Strategy", Icon: Target, desc: "Xây dựng và định vị ADN thương hiệu độc bản, R&D sản phẩm giúp SME nổi bật giữa số đông." },
  { title: "Performance", Icon: TrendingUp, desc: "Thiết kế và tối ưu phễu chuyển đổi, quy trình từ Sales-MKT-ADM, tăng trưởng doanh thu dài hạn." },
  { title: "Martech", Icon: Zap, desc: "Triển khai CRM, Automation và AI nâng cao hiệu suất đội ngũ và tối ưu năng suất marketing." },
  { title: "Omni channel", Icon: ShoppingBag, desc: "Xây dựng chiến lược nội dung và triển khai đa kênh bán hàng gia tăng nhận diện và chuyển đổi." }
];

const EXPERIENCES = [
  {
    period: "2021 - 2025",
    role: "CEO",
    company: "Dự Án Việt Nam",
    image: "/assets/1.jpeg",
    desc: "Kiến trúc sư trưởng cho hệ thống TMĐT xây dựng tiên phong duanvietnam.vn. Chịu trách nhiệm toàn diện từ chiến lược sản phẩm, vận hành đến tăng trưởng.",
    details: [
      "Hoạch định chiến lược kinh doanh, xây dựng sản phẩm lõi B2B/B2C.", 
      "Thiết lập hệ thống quản trị: OKRs, KPI, quy trình liên phòng ban (Sales-MKT-Tech-HR).", 
      "Quản lý tài chính, tối ưu hóa chi phí vận hành.", 
      "Đào tạo và dẫn dắt đội ngũ 20 nhân sự chính thức và hàng trăm CTV.", 
      "Đại diện thương hiệu đàm phán với đối tác chiến lược và hiệp hội."
    ],
    tags: ["Strategy", "Leadership", "Start-up", "P&L Management"],
    link: "https://www.nguoiduatin.vn/doanh-nhan-tre-tran-viet-anh-thuong-mai-dien-tu-lan-song-moi-cho-nganh-xay-dung-204665722.htm"
  },
  {
    period: "2020",
    role: "Phó BP.Online",
    company: "Hệ thống Nguyễn Văn Cừ",
    image: "/assets/2.jpeg",
    desc: "Dẫn dắt công cuộc Chuyển đổi số toàn diện, đưa thương hiệu truyền thống lâu đời thâm nhập thị trường TMĐT.",
    details: [
      "Nghiên cứu thị trường, phân tích các lợi thế cạnh tranh để đề xuất lộ trình phát triển.", 
      "Xây dựng hạ tầng TMĐT từ con số 0: Website, Ecom platform, Logistics.", 
      "Triển khai Marketing tổng lực (ATL & BTL).", 
      "Xây dựng và quản lý đội ngũ nhân sự trẻ kế cận cho doanh nghiệp."
    ],
    tags: ["Conversion", "Branding", "Data", "CRM"],
    link: "https://www.behance.net/gallery/106953807/NguyenVanCu-Bookstores"
  },
  {
    period: "2019",
    role: "Project Marketing",
    company: "LEGO Education",
    image: "/assets/3.jpeg",
    desc: "Triển khai mở rộng chuỗi hoạt động 'Educate Market', định hình tư duy phụ huynh về phương pháp giáo dục STEAM.",
    details: [
      "Tổ chức họp báo ra mắt sản phẩm chiến lược LEGO Education SPIKE Prime.", 
      "Quản lý các kênh digital và sản xuất nội dung media chất lượng cao (bài giảng, recap).", 
      "Thiết lập và quản trị mạng lưới phân phối chiến lược thông qua các đối tác giáo dục & bán lẻ hàng đầu: MyKingdom, ILA, Sylvan Learning.", 
      "Tiên phong chuyển đổi mô hình học tập với chiến dịch 'Vui học tại nhà', duy trì kết nối và giá trị thương hiệu xuyên suốt giai đoạn đại dịch COVID."
    ],
    tags: ["Branding", "Creative", "Scaling", "Execution"],
    link: "https://www.behance.net/gallery/106955351/LEGO-Education"
  },
  {
    period: "2019",
    role: "Marketing Manager",
    company: "FitForce Fitness",
    image: "/assets/4.jpeg",
    desc: "Kiến tạo trải nghiệm khách hàng và tối ưu hóa doanh thu dịch vụ cao cấp thông qua chiến lược KOLs và Event.",
    details: [
      "Xây dựng bộ máy vận hành: Thiết lập phòng ban Sales & Marketing chuyên nghiệp, quản lý ngân sách và điều phối KPI.", 
      "Mở rộng mạng lưới KOLs/Partners: Kết nối thành công các nhãn hàng thể thao và người nổi tiếng.", 
      "Chiến lược hóa sản phẩm: Thiết kế các gói sản phẩm Upsell/Cross-sell linh hoạt.", 
      "Chỉ đạo sản xuất các ấn phẩm, đảm bảo tiêu chuẩn hóa hình ảnh thương hiệu."
    ],
    tags: ["Social Media", "Branding", "Event", "Influencer"],
    link: "https://www.behance.net/gallery/106954181/FitForce-Fitness-Yoga"
  },
  {
    period: "2018",
    role: "Sales & Marketing",
    company: "Ambassador Hotel",
    image: "/assets/5.jpeg",
    desc: "Đặt nền móng thương hiệu cho chi nhánh mới tại TP.Vũng Tàu, khai thác thị trường khu vực trung tâm thành phố.",
    details: [
      "Phát triển song song 2 thương hiệu: Ambassador (Hotel) & Camellia (F&B).", 
      "Tối ưu hóa công suất phòng qua quản lý Booking/OTA.", 
      "Xây dựng và phát triển kênh social media của Ambassdor group.", 
      "Đối ngoại và hợp tác các doanh nghiệp địa phương."
    ],
    tags: ["Social Media", "Branding", "Revenue", "Execution"],
    link: "https://www.behance.net/gallery/106960225/Ambassador-Hotel-Group"
  }
];

const PROJECTS = [
  {
    title: "Đại diện thương hiệu",
    category: "Branding",
    image: "/assets/6.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Dự Án Việt Nam nhận giải thưởng Top 10 Asia Top Brand Award 2024.",
    link: "https://www.facebook.com/reel/987442559539122"
  },
  {
    title: "Tư vấn chiến lược thương hiệu",
    category: "Marketing Strategy",
    image: "/assets/7.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Định vị thương hiệu, xây dựng lộ trình phát triển nhân sự và chiến lược marketing dài hạn cho hệ thống Onsen Nhật.",
    link: "https://drive.google.com/drive/folders/18EePklHJB1nS5eMQ5oittod5AsQw58Cl?usp=sharing"
  },
  {
    title: "Đào tạo nhân sự",
    category: "Training",
    image: "/assets/8.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Thiết kế bài giảng và tổ chức đào tạo cho sản phẩm chiến lược mới cho chuỗi Trung tâm Tiếng Anh khu vực miền Nam.",
    link: "https://docs.google.com/presentation/d/1jNi_LlrgeViBc2TIu6oEIoAqJzI2XyUd/edit?usp=sharing&ouid=116372570508469460772&rtpof=true&sd=true"
  },
  {
    title: "Tổ chức sự kiện",
    category: "Workshop",
    image: "/assets/9.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Tổ chức workshop 'Marketing gắn liền với quản trị SME' khai thác nhóm khách hàng mục tiêu.",
    link: "https://www.facebook.com/share/v/1QjRa3wwj1"
  },
  {
    title: "Tư vấn chiến lược thương hiệu",
    category: "Marketing Strategy",
    image: "/assets/10.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Tư vấn tái định vị thương hiệu, xây dựng chiến lược marketing và kế hoạch ra mắt các dòng sản phẩm mới, đồng thời phát triển thương hiệu cá nhân bà Huynh.",
    link: "https://drive.google.com/file/d/1sAqQLPlSmI2lQS23BAo8UpKlZ1-SZZdE/view?usp=sharing"
  },
  {
    title: "Chuyển đổi số Xây dựng",
    category: "Event",
    image: "/assets/11.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Giới thiệu gói giải pháp 'Ứng dụng nền tảng TMĐT vào ngành xây dựng' tại sự kiện.",
    link: "https://baoxaydung.vn/du-an-viet-nam-lan-song-moi-thuong-mai-dien-tu-nganh-xay-dung-1926868376281.htm"
  },
  {
    title: "Chuyển đổi số Nhà sách",
    category: "Transformation",
    image: "/assets/12.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Xây dựng hệ thống TMĐT đa kênh, logistics, quản lý kho bằng phần mềm, hợp tác các nhãn hàng, NXB mới, triển khai social media cho hệ thống.",
    link: "https://nhasachnguyenvancu.vn/"
  },
  {
    title: "Chuyển đổi số Giáo dục",
    category: "Transformation",
    image: "/assets/13.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Sản xuất và phát hành series 'HỌC LÀM NHÀ PHÁT MINH CÔNG NGHỆ VỚI LEGO SPIKE PRIME'.",
    link: "https://www.youtube.com/playlist?list=PLoVM1h2NMGedtN4dGV13m0WFEulBF3JKB"
  },
  {
    title: "Xây dựng và vận hành hệ thống bán lẻ",
    category: "Ecommerce",
    image: "/assets/14.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Xây dựng hệ thống TMĐT đa kênh, bộ nhận diện thương hiệu, website và đội ngũ marketing mới cho doanh nghiệp.",
    link: "https://www.facebook.com/congtyquatangata"
  },
  {
    title: "Setup nhà hàng",
    category: "F&B",
    image: "/assets/15.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Triển khai xây dựng ý tưởng nhà hàng ăn vặt đầu tiên tại Vũng Tàu.",
    link: "https://www.tripadvisor.com.vn/Restaurant_Review-g303946-d14948011-Reviews-Camellia_Coffee_Restaurant-Vung_Tau_Ba_Ria_Vung_Tau_Province.html"
  },    
  {
    title: "Khách mời Podcast",
    category: "Podcast",
    image: "/assets/16.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Chia sẻ câu chuyện khởi nghiệp Dự Án Việt Nam, personal branding",
    link: "https://drive.google.com/file/d/1ly37dJYfFfn50gHxCLItw37oWYm5Sssc/view?usp=sharing"
  },
  {
    title: "Tài trợ sự kiện",
    category: "Event",
    image: "/assets/17.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Tổ chức gian hàng tại 'Vietbuild 2024', giới thiệu giải pháp & khai thác khách hàng tiềm năng.",
    link: "https://www.tiktok.com/@duanvietnam/video/7385468335833599239"
  },
  {
    title: "Tài trợ sự kiện",
    category: "Event",
    image: "/assets/18.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Tổ chức gian hàng tại 'Kết nối giao thương CLB doanh nhân trẻ TP HCM', giới thiệu giải pháp & khai thác khách hàng tiềm năng.",
    link: "https://www.facebook.com/share/v/14aGWYWH5LJ"
  },
  {
    title: "Tổ chức sự kiện",
    category: "Workshop",
    image: "/assets/19.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Tổ chức workshop 'Xây dựng & quản trị doanh nghiệp theo khoa học phong thuỷ', go viral trên các kênh social.",
    link: "https://www.tiktok.com/@duanvietnam/video/7405381047292103956"
  },
  {
    title: "Tổ chức sự kiện",
    category: "Workshop",
    image: "/assets/20.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Tổ chức sự kiện 'Tầm quan trọng của đấu thầu đối với sinh viên ngành xây dựng' tại HUTECH, branding & trust",
    link: "https://www.hutech.edu.vn/homepage/tin-tuc/hoat-dong-sinh-vien/14612371-sinh-vien-nganh-xay-dung-hutech-tim-hieu-co-hoi-nghe-nghiep-ve-dau-thau-qua-mang-cung-chuyen-gia"
  },
  {
    title: "Khách mời Podcast",
    category: "Podcast",
    image: "/assets/21.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Tham gia 'Podcast Nhảy việc cuối năm hay chờ thưởng Tết', go viral nhờ chủ đề tranh cãi & đúng thời điểm",
    link: "https://www.youtube.com/watch?v=P0pekIKb1I0"
  },
  {
    title: "NTT Kim Cương - Giải Tenis Doanh nhân Lan Anh 2022",
    category: "Event",
    image: "/assets/22.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Thu hút khách hàng tiềm năng tham gia giải",
    link: "https://www.facebook.com/share/p/17BhWsc9oJ/"
  },
  {
    title: "Tổ chức sự kiện",
    category: "Event",
    image: "/assets/23.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Sự kiện trải nghiệm thu hút nhiều lượt quan tâm, go viral nhờ chủ đề được quan tâm và đánh giá cao.",
    link: "https://www.tiktok.com/@duanvietnam/video/7331738767734115586"
  },
  {
    title: "Dự án quà Tết 2024",
    category: "Branding",
    image: "/assets/24.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Dự án quà tặng độc đáo đầy ý nghĩa từ đội ngũ Dự Án Việt Nam, khai thác nhóm khách hàng trung thành",
    link: "https://www.youtube.com/watch?v=gtelaltr2kg"
  },
  {
    title: "Sản xuất Campaign",
    category: "Campaign",
    image: "/assets/25.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Campaign tuyển dụng thu hút CTV xây dựng nhờ nội dung vui nhộn bắt trend, target nhóm người nội trợ",
    link: "https://www.facebook.com/reel/1173113730744110"
  },
  {
    title: "Sản xuất Podcast",
    category: "Podcast",
    image: "/assets/26.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Sản xuất 'Podcast Xây nhà cuối năm', go viral nhờ chủ đề tranh cãi & đúng thời điểm, đánh đúng đối tượng mục tiêu",
    link: "https://www.youtube.com/watch?v=XttzQ1aUcIo"
  },
  {
    title: "Sản xuất Media",
    category: "Branding",
    image: "/assets/27.jpeg?auto=format&fit=crop&q=80&w=1200",
    description: "Xây dựng hình ảnh Dự Án Việt Nam thông qua những 'Video revew thành phẩm' chất lượng cao được đầu tư quay dựng bài bản, branding & trust",
    link: "https://www.youtube.com/watch?v=xvJmW73i9DE"
  }
];

const PRELOADED_IMAGES = new Set();

const preloadImage = (src) => {
  if (!src || PRELOADED_IMAGES.has(src)) return;
  const img = new Image();
  img.src = src;
  PRELOADED_IMAGES.add(src);
};

const STATS = [
  { value: "5.000M+", label: "Total Budget" },
  { value: "50+", label: "Project Delivered" },
  { value: "100+", label: "Team Members" },
  { value: "03PM", label: "Digital Transform." }
];

const GLOBAL_STYLES = `
  .text-outline-white { -webkit-text-stroke: 1px white; }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  ::selection { background: white; color: black; }
  html { scroll-behavior: smooth; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

// --- Components ---

const MagneticElement = ({ children, distance = 0.35 }) => {
  const ref = useRef(null);
  const rectRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseEnter = useCallback(() => {
    if (!ref.current) return;
    rectRef.current = ref.current.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const rect = rectRef.current || ref.current.getBoundingClientRect();
    const { left, top, width, height } = rect;
    const dx = clientX - (left + width / 2);
    const dy = clientY - (top + height / 2);
    x.set(dx * distance);
    y.set(dy * distance);
  }, [distance, x, y]);

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

const MagneticButton = ({ children, className = "", onClick }) => {
  const ref = useRef(null);
  const rectRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseEnter = useCallback(() => {
    if (!ref.current) return;
    rectRef.current = ref.current.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const rect = rectRef.current || ref.current.getBoundingClientRect();
    const { left, top, width, height } = rect;
    const dx = clientX - (left + width / 2);
    const dy = clientY - (top + height / 2);
    x.set(dx * 0.3);
    y.set(dy * 0.3);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

const ScrambleText = ({ text, trigger }) => {
  const [displayText, setDisplayText] = useState(text);
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+';
  const intervalRef = useRef(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text.split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            if (char === " ") return " ";
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }
      iteration += 1 / 3;
    }, 30);
  }, [text]);

  useEffect(() => {
    if (trigger) scramble();
    return () => clearInterval(intervalRef.current);
  }, [trigger, scramble]);

  return (
    <span onMouseEnter={scramble} className="cursor-default">
      {displayText}
    </span>
  );
};

const SectionTitle = ({ title, subtitle, dark = false, subtitleClassName = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });

  return (
    <div ref={ref} className="mb-10 md:mb-20">
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        className={`${subtitleClassName || (dark ? 'text-pink-600' : 'text-purple-500')} font-mono text-sm tracking-tighter uppercase mb-2 block`}
      >
        / <ScrambleText text={subtitle} trigger={isInView} />
      </motion.span>
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "100%" }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className={`text-5xl md:text-8xl font-black uppercase leading-none ${dark ? 'text-black' : 'text-white'}`}
        >
          <ScrambleText text={title} trigger={isInView} />
        </motion.h2>
      </div>
    </div>
  );
};

const CountUp = ({ value, duration = 700 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const raw = String(value);
    const match = raw.match(/[0-9]+(?:\\.[0-9]+)?/);
    if (!match) {
      setDisplay(raw);
      return;
    }

    const num = parseFloat(match[0]);
    const suffix = raw.replace(match[0], "");
    const hasLeadingZero = /^0\\d+$/.test(match[0]);
    const padLen = hasLeadingZero ? match[0].length : 0;
    const start = performance.now();
    const dur = Math.max(300, duration);
    let raf = null;

    const step = (t) => {
      const p = Math.min((t - start) / dur, 1);
      const current = Math.round(num * p);
      const str = hasLeadingZero ? String(current).padStart(padLen, "0") : String(current);
      setDisplay(`${str}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => raf && cancelAnimationFrame(raf);
  }, [isInView, value, duration]);

  return <span ref={ref}>{display}</span>;
};

const ExperienceRow = React.memo(({ exp, index, isActive, onOpenDetail }) => {
  return (
    <div className={`border-b border-white/10 transition-colors duration-500 ${isActive ? 'bg-white/[0.02]' : ''}`}>
      <div className="py-12 md:py-16 transition-all duration-500 px-4 md:px-8">
        <div className="flex items-start md:items-center justify-between gap-4 md:gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
               <span className={`font-mono text-sm transition-colors duration-500 ${isActive ? 'text-pink-500' : 'text-gray-600'}`}>0{index + 1}</span>
               <span className="text-gray-500 font-mono text-sm tracking-widest">{exp.period}</span>
            </div>
            <h3 className={`text-3xl md:text-6xl font-black uppercase tracking-tighter transition-all duration-500 ${isActive ? 'text-white' : 'text-white/30'}`}>
              {exp.role}
            </h3>
            <span className={`mt-3 block text-xl md:text-2xl font-bold uppercase transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-20'}`}>
              {exp.company}
            </span>
          </div>

          <div className="ml-auto flex items-start md:items-center pr-1 md:pr-2 pt-9 md:pt-0">
            <button 
              onClick={() => onOpenDetail(exp)}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all duration-500 hover:bg-pink-500 hover:text-black hover:border-pink-500 ${isActive ? 'border-pink-500 text-pink-500 opacity-100 scale-110' : 'border-white/10 text-white/10 opacity-0'}`}
            >
              <ExternalLink className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-10 grid md:grid-cols-2 gap-10">
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl">
              {exp.desc}
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-2 md:justify-end">
                {exp.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/5 text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

const MinimalHeroBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/40 blur-[90px]"
        animate={{ scale: [1, 1.16, 1], opacity: [0.62, 0.88, 0.62] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-purple-500/30 blur-[70px]"
        animate={{ y: [0, 45, 0], x: [0, -35, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-cyan-400/20 blur-[80px]"
        animate={{ y: [0, -35, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[74vh] w-[74vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30"
        animate={{ rotate: [0, 360], scale: [0.94, 1.04, 0.94], opacity: [0.32, 0.54, 0.32] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[52vh] w-[52vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-300/35"
        animate={{ rotate: [360, 0], scale: [1.02, 0.94, 1.02], opacity: [0.24, 0.5, 0.24] }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
      />
      <div 
        className="absolute inset-0 opacity-[0.18]" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #ffffff 1.2px, transparent 1.2px)', 
          backgroundSize: '34px 34px' 
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent"
        animate={{ x: ['0%', '420%'] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/20 to-[#050505]" />
    </div>
  );
};

const SectionTransitionGlow = ({ light = false }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute left-0 right-0 top-0 h-24 md:h-28 ${
      light
        ? 'bg-gradient-to-b from-black/10 via-black/5 to-transparent'
        : 'bg-gradient-to-b from-white/10 via-white/5 to-transparent'
    }`}
  />
);

const ScrollMouseHint = ({ axis = 'vertical', dark = false }) => {
  const isVertical = axis === 'vertical';

  return (
    <div className="flex justify-center" aria-hidden="true">
      <div
        className={`relative rounded-full border ${
          dark ? 'border-black/35' : 'border-white/35'
        } ${isVertical ? 'h-10 w-6' : 'h-6 w-10'}`}
      >
        <motion.span
          className={`absolute rounded-full ${
            dark ? 'bg-black/55' : 'bg-white/70'
          } ${isVertical ? 'h-2.5 w-1.5 left-1/2 -translate-x-1/2' : 'h-1.5 w-2.5 top-1/2 -translate-y-1/2'}`}
          animate={
            isVertical
              ? { y: [4, 11, 4], opacity: [0.4, 1, 0.4] }
              : { x: [4, 11, 4], opacity: [0.4, 1, 0.4] }
          }
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

const FloatingAction = ({ children, distance = 4, duration = 2.8 }) => (
  <motion.div
    animate={{ y: [0, -distance, 0] }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const ORBIT_DEGS = [45, 135, 225, 315];
const HUD_GLYPHS = ['Δ', 'Σ', '⊗', '⎔'];

const CreditLoader = ({ onComplete }) => {
  const LOADER_DURATION = 3360;
  const logoParts = [
    { key: "a", title: "(A) - Anh.TranViet", iconSrc: "/assets/loader/part-1.png" },
    { key: "strategy", title: "Strategy", iconSrc: "/assets/loader/part-2.png" },
    { key: "creative", title: "Growth", iconSrc: "/assets/loader/part-3.png" },
    { key: "growth", title: "(#FFFF00) - Creative", iconSrc: "/assets/loader/part-4.png" },
  ];
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const layout = useMemo(() => {
    const rows = [12, 34, 56, 78];
    const sides = ['left', 'right', 'left', 'right'];
    const shuffle = (arr) => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const shuffledRows = shuffle(rows);
    const shuffledSides = shuffle(sides);

    return logoParts.map((_, idx) => {
      const baseTop = shuffledRows[idx];
      const topJitter = (Math.random() * 8) - 4;
      const top = clamp(baseTop + topJitter, 10, 86);
      const side = shuffledSides[idx];
      const baseLeft = side === 'left' ? 22 : 78;
      const leftJitter = (Math.random() * 6) - 3;
      const left = clamp(baseLeft + leftJitter, 12, 88);
      return { top, left, side };
    });
  }, []);

  useEffect(() => {
    let raf = null;
    const start = performance.now();

    const tick = (t) => {
      const ratio = Math.min((t - start) / LOADER_DURATION, 1);
      const next = Math.round(ratio * 100);
      if (next !== progressRef.current) {
        progressRef.current = next;
        setProgress(next);
      }
      if (ratio < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [LOADER_DURATION]);

  useEffect(() => {
    const extra = 600; // allow text scan to finish
    const t = setTimeout(onComplete, LOADER_DURATION + extra);
    return () => clearTimeout(t);
  }, [onComplete, LOADER_DURATION]);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-between py-24 md:py-32 overflow-hidden"
    >
      <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-5xl h-[56vh] min-h-[360px] md:min-h-[460px] px-4 md:px-6">
          <div className="absolute inset-0 -z-10 opacity-[0.22] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" aria-hidden="true">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 20%, rgba(236,72,153,0.25), transparent 55%), radial-gradient(circle at 80% 80%, rgba(236,72,153,0.2), transparent 45%), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '100% 100%, 100% 100%, 28px 28px, 28px 28px',
              }}
            />
          </div>
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-400/70 to-transparent"
            animate={{ y: ['-10%', '110%'] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            {ORBIT_DEGS.map((deg, idx) => (
              <motion.div
                key={`cone-${deg}`}
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 w-[18vw] md:w-[160px] h-[16vw] md:h-[140px] origin-left"
                style={{
                  transform: `rotate(${deg}deg)`,
                  clipPath: 'polygon(0 50%, 100% 0, 100% 100%)',
                  background: 'linear-gradient(90deg, rgba(236,72,153,0.2) 0%, rgba(236,72,153,0.05) 70%, transparent 100%)',
                }}
                animate={{ opacity: [0.15, 0.6, 0.15] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
              />
            ))}

            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 w-[52%] h-[52%] rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            >
              {ORBIT_DEGS.map((deg, idx) => (
                <motion.span
                  key={`orbit-${deg}`}
                  className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-pink-400/80 shadow-[0_0_12px_rgba(236,72,153,0.8)]"
                  style={{ transform: `rotate(${deg}deg) translateX(48%)` }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                />
              ))}
            </motion.div>
            <motion.div
              aria-hidden="true"
              className="absolute w-[62%] h-[62%] rounded-full border border-pink-400/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute w-[46%] h-[46%] rounded-full border border-pink-400/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            

            <div className="relative">
              <div className="absolute -inset-10 rounded-full bg-pink-500/15 blur-[80px]" aria-hidden="true" />
              <motion.div
                className="relative w-20 h-20 md:w-28 md:h-28 rounded-2xl border border-pink-500/50 bg-black/60 flex items-center justify-center overflow-hidden"
                animate={{ boxShadow: ['0 0 0px rgba(236,72,153,0.0)', '0 0 34px rgba(236,72,153,0.5)', '0 0 0px rgba(236,72,153,0.0)'] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-2 rounded-xl border border-pink-500/25" />
                <div className="absolute inset-4 rounded-lg border border-pink-500/15" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:16px_16px] opacity-[0.25]" />
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-pink-400/35 to-transparent"
                  animate={{ x: ['-40%', '140%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute left-1/2 top-0 h-full w-px bg-pink-400/20" />
                <div className="absolute top-1/2 left-0 h-px w-full bg-pink-400/20" />
                <img src="/assets/loader/part-0.png" alt="Logo" className="w-12 h-12 md:w-20 md:h-20 object-contain relative z-10" />
              </motion.div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.4em] text-gray-500">
                Core Logo
              </div>
            </div>
          </div>

          {logoParts.map((part, i) => {
            const reverse = layout[i]?.side === 'left';
            return (
              <motion.div
                key={part.key}
                initial={{ opacity: 0, scale: 0.96, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-[42vw] max-w-[230px] md:max-w-[320px] -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${layout[i]?.left ?? 50}%`,
                  top: `${layout[i]?.top ?? 50}%`,
                }}
              >
                <div className={`relative flex items-center gap-2.5 md:gap-4 ${reverse ? 'flex-row-reverse text-right' : ''}`}>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border border-pink-400/60 bg-black/40 overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.6)] shrink-0 aspect-square"
                  >
                    <img
                      src={part.iconSrc}
                      alt=""
                      className="w-full h-full object-cover object-center rounded-full brightness-110 contrast-110"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative px-1.5 py-0.5 ${reverse ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[1.15rem] md:text-[1.9rem] font-black uppercase tracking-tighter text-white leading-none">
                      {part.title}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-md bg-[linear-gradient(90deg,transparent,rgba(236,72,153,0.28),transparent)] opacity-0"
                      animate={{ x: ['-120%', '120%'], opacity: [0, 0.7, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: i * 0.25 }}
                    />
                    <span className="absolute left-0 -bottom-1 h-px w-full bg-pink-400/40" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
          {HUD_GLYPHS.map((glyph, i) => (
            <motion.div
              key={`glyph-${glyph}`}
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 text-pink-300/70 text-xs md:text-sm font-mono"
              animate={{
                x: i === 0 ? [-10, -120] : i === 1 ? [10, 120] : i === 2 ? [-10, -120] : [10, 120],
                y: i < 2 ? [-10, -80] : [10, 80],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            >
              {glyph}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-sm md:max-w-xl px-10 flex flex-col items-center gap-6 mt-12 relative">
        <div className="flex justify-between w-full items-end gap-4">
            <div className="flex items-center gap-3">
                <motion.img 
                  src="/assets/logoa.png" 
                  alt="Logo" 
                  className="w-10 h-10 md:w-14 md:h-14 object-contain filter brightness-100"
                  decoding="async"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                />
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-500">Initializing Journey</span>
            </div>
            <span className="font-mono text-2xl md:text-4xl font-black text-pink-500">{Math.round(progress)}%</span>
        </div>
        
        <div className="w-full h-[4px] bg-white/10 relative rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-pink-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-gray-600 text-center">
            Anh Tran Viet — Portfolio 2026
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedExp, setSelectedExp] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false); 
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const expRefs = useRef([]);
  const activeIdxRef = useRef(0);
  const servicesOuterRef = useRef(null);
  const servicesInnerRef = useRef(null);
  const [servicesItemsPerView, setServicesItemsPerView] = useState(1);
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const activeServiceIdxRef = useRef(0);
  const [openWorkIdx, setOpenWorkIdx] = useState(null);
  const openWorkIdxRef = useRef(null);
  const workSwipeRef = useRef({ startX: 0, startY: 0, moved: false });
  const worksOuterRef = useRef(null);
  const workCardRefs = useRef([]);
  const worksSectionRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const { scrollYProgress: servicesProgress } = useScroll({
    target: servicesOuterRef,
    offset: ['start start', 'end end'],
  });
  const servicesMaxTranslatePct = useMemo(
    () => Math.max((SERVICES.length / servicesItemsPerView - 1) * 100, 0),
    [servicesItemsPerView]
  );
  const servicesX = useTransform(servicesProgress, [0, 1], ['0%', `-${servicesMaxTranslatePct}%`]);


  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 1024px)');
    const updateView = () => setServicesItemsPerView(mq.matches ? 2 : 1);
    updateView();
    mq.addEventListener('change', updateView);
    return () => mq.removeEventListener('change', updateView);
  }, []);

  useEffect(() => {
    let raf = null;
    const unsubscribe = servicesProgress.on('change', (v) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = null;
        const raw = Math.round(v * (SERVICES.length - 1));
        const idx = Math.max(0, Math.min(SERVICES.length - 1, raw));
        if (idx !== activeServiceIdxRef.current) {
          activeServiceIdxRef.current = idx;
          setActiveServiceIdx(idx);
        }
      });
    });

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      unsubscribe();
    };
  }, [servicesProgress]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const outer = servicesOuterRef.current;
    const inner = servicesInnerRef.current;
    if (!outer || !inner) return;

    const state = {
      mode: null,
      left: null,
      width: null,
      insetsLeft: 0,
      insetsRight: 0,
    };

    const updateInsets = () => {
      const styles = window.getComputedStyle(outer);
      state.insetsLeft = Number.parseFloat(styles.paddingLeft || '0') || 0;
      state.insetsRight = Number.parseFloat(styles.paddingRight || '0') || 0;
    };

    const applyPosition = (mode, rect) => {
      if (mode === 'fixed') {
        const left = Math.round((rect.left + state.insetsLeft) * 10) / 10;
        const width = Math.round((rect.width - state.insetsLeft - state.insetsRight) * 10) / 10;
        if (state.mode === mode && state.left === left && state.width === width) return;
        state.mode = mode;
        state.left = left;
        state.width = width;
        inner.style.position = 'fixed';
        inner.style.top = '0';
        inner.style.bottom = 'auto';
        inner.style.left = `${left}px`;
        inner.style.right = 'auto';
        inner.style.width = `${width}px`;
        return;
      }

      if (state.mode === mode) return;
      state.mode = mode;
      state.left = null;
      state.width = null;
      inner.style.position = 'absolute';
      inner.style.left = `${state.insetsLeft}px`;
      inner.style.right = `${state.insetsRight}px`;
      inner.style.width = 'auto';
      inner.style.top = mode === 'top' ? '0' : 'auto';
      inner.style.bottom = mode === 'bottom' ? '0' : 'auto';
    };

    const updatePin = () => {
      const rect = outer.getBoundingClientRect();
      const start = rect.top;
      const end = rect.bottom - window.innerHeight;

      if (start <= 0 && end >= 0) {
        applyPosition('fixed', rect);
      } else if (start > 0) {
        applyPosition('top', rect);
      } else {
        applyPosition('bottom', rect);
      }
    };

    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = null;
        updatePin();
      });
    };

    const onResize = () => {
      updateInsets();
      onScroll();
    };

    updateInsets();
    updatePin();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!PROJECTS.length || typeof window === 'undefined') return;

    const run = () => {
      PROJECTS.slice(0, 3).forEach((p) => preloadImage(p.image));
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(run, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }

    const t = window.setTimeout(run, 250);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isUnlocked || selectedExp) {
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.overscrollBehavior = '';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.overscrollBehavior = '';
    };
  }, [isUnlocked, selectedExp]);

  const handleFormSubmit = async () => {
    if (isSent || isSubmitting) return;

    if (formRef.current && !formRef.current.checkValidity()) {
        formRef.current.reportValidity();
        return;
    }

    const formData = new FormData(formRef.current);
    const payload = {
      name: (formData.get('Name') || '').toString().trim(),
      brand: (formData.get('Brand') || '').toString().trim(),
      email: (formData.get('Email') || '').toString().trim(),
      message: (formData.get('Message') || '').toString().trim(),
    };

    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const detail = (data?.detail || data?.error || '').toString();

        if (detail === 'SMTP_AUTH_MISSING' || detail === 'SMTP_HOST_MISSING') {
          throw new Error('SMTP_NOT_CONFIGURED');
        }

        throw new Error('REQUEST_FAILED');
      }

      setIsSent(true);
    } catch (error) {
      const code = error instanceof Error ? error.message : 'UNKNOWN';

      if (code === 'SMTP_NOT_CONFIGURED') {
        setSubmitError('Server email chưa cấu hình SMTP. Vui lòng cập nhật file .env.');
      } else if (code === 'Failed to fetch') {
        setSubmitError('Không kết nối được dịch vụ gửi form. Vui lòng thử lại sau.');
      } else {
        setSubmitError('Không thể gửi lúc này. Vui lòng thử lại sau.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    document.title = "Anh Trần Việt | Creative Marketing Strategy & Growth";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Portfolio của Anh Trần Việt - Chuyên gia chiến lược Marketing, Chuyển đổi số và Tăng trưởng cho SME.";
    let linkFavicon = document.querySelector("link[rel~='icon']");
    if (!linkFavicon) {
      linkFavicon = document.createElement('link');
      linkFavicon.rel = 'icon';
      document.head.appendChild(linkFavicon);
    }
    linkFavicon.href = "/assets/logoa.png";
  }, []);

  const activateExperience = useCallback((idx) => {
    if (idx === activeIdxRef.current) return;
    activeIdxRef.current = idx;
    setActiveIdx(idx);
  }, []);

  useEffect(() => {
    if (!isUnlocked) return;
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const visibleRows = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const raw = entry.target?.dataset?.expIdx;
          const idx = Number.parseInt(raw, 10);
          if (Number.isNaN(idx)) continue;

          if (entry.isIntersecting) {
            visibleRows.set(idx, entry.target);
          } else {
            visibleRows.delete(idx);
          }
        }

        if (!visibleRows.size) return;

        const viewportCenter = window.innerHeight / 2;
        let nextIdx = activeIdxRef.current;
        let minDistance = Number.POSITIVE_INFINITY;

        for (const [idx, el] of visibleRows) {
          const rect = el.getBoundingClientRect();
          const rowCenter = rect.top + rect.height / 2;
          const distance = Math.abs(rowCenter - viewportCenter);
          if (distance < minDistance) {
            minDistance = distance;
            nextIdx = idx;
          }
        }

        activateExperience(nextIdx);
      },
      {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: [0.05, 0.2, 0.5, 0.8],
      }
    );

    for (const el of expRefs.current) {
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [activateExperience, isUnlocked]);

  const scrollToSection = useCallback((id) => {
    setIsUnlocked(true);
    setIsMenuOpen(false);

    window.requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (!element) return;
      window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
    });
  }, []);

  const startJourney = useCallback(() => {
    setIsLoading(true);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setIsUnlocked(true); 
    setTimeout(() => {
      scrollToSection('services');
    }, 100);
  }, [scrollToSection]);

  useEffect(() => {
    openWorkIdxRef.current = openWorkIdx;
  }, [openWorkIdx]);

  const handleWorkTouchStart = useCallback((e) => {
    const touch = e.touches?.[0];
    if (!touch) return;
    workSwipeRef.current = { startX: touch.clientX, startY: touch.clientY, moved: false };
  }, []);

  const handleWorkTouchMove = useCallback((e) => {
    const touch = e.touches?.[0];
    if (!touch) return;
    const dx = Math.abs(touch.clientX - workSwipeRef.current.startX);
    const dy = Math.abs(touch.clientY - workSwipeRef.current.startY);
    if (dx > 8 || dy > 8) {
      workSwipeRef.current.moved = true;
    }
  }, []);

  const toggleWorkCard = useCallback((idx) => {
    if (workSwipeRef.current.moved) {
      workSwipeRef.current.moved = false;
      return;
    }
    setOpenWorkIdx((prev) => (prev === idx ? null : idx));
  }, []);

  useEffect(() => {
    const container = worksOuterRef.current;
    if (!container) return;

    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = null;
        const center = container.scrollLeft + container.clientWidth / 2;
        let nextIdx = null;
        let minDistance = Number.POSITIVE_INFINITY;

        workCardRefs.current.forEach((card, idx) => {
          if (!card) return;
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const distance = Math.abs(cardCenter - center);
          if (distance < minDistance) {
            minDistance = distance;
            nextIdx = idx;
          }
        });

        if (nextIdx !== null && nextIdx !== openWorkIdxRef.current) {
          openWorkIdxRef.current = nextIdx;
          setOpenWorkIdx(nextIdx);
        }
      });
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const navItems = useMemo(
    () => [
      { label: 'Home', id: 'home' },
      { label: 'Services', id: 'services' },
      { label: 'Experience', id: 'experience' },
      { label: 'Works', id: 'works' },
      { label: 'Connect', id: 'connect' }
    ],
    []
  );

  const worksInView = useInView(worksSectionRef, { once: true, margin: '-20% 0px -20% 0px' });

  useEffect(() => {
    if (worksInView && openWorkIdxRef.current === null) {
      openWorkIdxRef.current = 0;
      setOpenWorkIdx(0);
    }
  }, [worksInView]);

  const serviceCards = useMemo(
    () =>
      SERVICES.map((s, idx) => (
        <div key={s.title} className="w-full lg:w-1/2 shrink-0 pr-4 md:pr-6 lg:pr-8">
          <div className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 md:p-7 min-h-[200px] h-[42vh] md:h-[46vh] max-h-[340px] md:max-h-[360px] flex flex-col justify-between overflow-hidden">
            <div
              className={`absolute inset-0 bg-pink-500/10 opacity-0 transition-opacity duration-300 ${
                activeServiceIdx === idx ? 'opacity-100' : 'group-hover:opacity-100'
              }`}
            />
            <div>
              <div className="text-pink-500 mb-6 relative z-10">
                <s.Icon className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-4 uppercase tracking-tight leading-tight relative z-10">{s.title}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-base md:text-lg max-w-3xl relative z-10">{s.desc}</p>
          </div>
        </div>
      )),
    [activeServiceIdx]
  );

  const workCards = useMemo(
    () =>
      PROJECTS.map((p, idx) => {
        const isOpen = openWorkIdx === idx;
        return (
          <article
            key={p.title}
            ref={(el) => {
              workCardRefs.current[idx] = el;
            }}
            className="group shrink-0 w-[78%] sm:w-[68%] md:w-[52%] lg:w-[46%] xl:w-[44%] snap-center lg:snap-start will-change-transform"
          >
            <div className="rounded-[22px] md:rounded-[24px] overflow-visible bg-transparent h-auto flex flex-col transition-[transform] duration-300">
              <div
                className={`relative w-full transition-[aspect-ratio,transform] duration-300 ${
                  isOpen ? 'aspect-[1/1]' : 'aspect-[1/1.2]'
                } group-hover:aspect-[1/1]`}
                onClick={() => toggleWorkCard(idx)}
                onTouchStart={handleWorkTouchStart}
                onTouchMove={handleWorkTouchMove}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setOpenWorkIdx((prev) => (prev === idx ? null : idx));
                  }
                }}
              >
                <div className="relative w-full h-full rounded-[18px] md:rounded-[20px] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full max-w-full max-h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest bg-white/85 text-purple-500 px-3 py-1 rounded-full">
                    {p.category}
                  </span>
                </div>
              </div>

              <div className="px-5 md:px-7 py-3 md:py-4 flex flex-col">
                <h3
                  className="text-2xl md:text-3xl font-black leading-tight text-black normal-case min-h-0 md:min-h-[3.4em]"
                  style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                >
                  {p.title}
                </h3>
                <div className={`mt-1.5 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`}>
                  <p
                    className="text-sm md:text-base text-gray-600 leading-relaxed min-h-0 md:min-h-[4em]"
                    style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
                    {p.description}
                  </p>
                </div>
                <div className={`mt-3 md:mt-auto pt-2 transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} group-hover:opacity-100 group-hover:pointer-events-auto`}>
                  <button
                    onClick={() => window.open(p.link, '_blank')}
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border border-pink-500 text-pink-500 px-5 py-2 rounded-full hover:bg-pink-500 hover:text-white active:bg-pink-500 active:text-white transition-all"
                  >
                    View Project <ArrowDownRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        );
      }),
    [handleWorkTouchMove, handleWorkTouchStart, openWorkIdx, toggleWorkCard]
  );

  const statCards = useMemo(
    () =>
      STATS.map((s) => (
        <motion.div 
          key={s.label}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="p-4 md:p-6 border border-white/10 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors"
        >
          <span className="text-3xl md:text-5xl font-black mb-1 md:mb-2">
            <CountUp value={s.value} duration={650} />
          </span>
          <span className="text-[9px] md:text-[11px] uppercase font-bold tracking-widest text-pink-500">{s.label}</span>
        </motion.div>
      )),
    []
  );

  const contactCards = useMemo(
    () => [
      { label: 'Email', val: 'anh@anhtranviet.com', icon: <Mail size={18} />, url: 'mailto:anh@anhtranviet.com' },
      { label: 'Hotline', val: '091.9999.781', icon: <Phone size={18} />, url: 'tel:+84919999781' },
      { label: 'Zalo', val: 'Chat now', icon: <MessageCircle size={18} />, url: 'https://zalo.me/84919999781' },
      { label: 'Fanpage', val: 'Follow me', icon: <Facebook size={18} />, url: 'https://www.facebook.com/4nhtran/' }
    ],
    []
  );

  // Gallery Navigation (scroll-driven)

  return (
    <div ref={containerRef} className="bg-[#050505] text-white selection:bg-white selection:text-black overflow-x-hidden min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-white z-[100] origin-left" style={{ scaleX }} />

      <AnimatePresence>
        {isLoading && <CreditLoader onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <nav className="fixed w-full z-50 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => scrollToSection('home')}
          >
            <div className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden flex items-center justify-center">
              <img 
                src="/assets/logoa.png" 
                alt="Logo" 
                className="w-full h-full object-contain filter brightness-100 contrast-125"
              />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase group-hover:italic transition-all duration-300">
              ANH.TRANVIET
            </span>
          </motion.div>
          <button onClick={() => setIsMenuOpen(true)} className="flex items-center gap-2 group outline-none">
            <span className="text-sm font-bold uppercase tracking-widest group-hover:pr-2 transition-all text-white">Menu</span>
            <div className="w-8 h-[2px] bg-white" />
          </button>
        </div>
      </nav>

      {/* Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-white text-black p-10 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <span className="font-mono text-sm uppercase">Navigation</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-4xl font-light hover:rotate-90 transition-transform">×</button>
            </div>
            <div className="flex flex-col gap-4">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-5xl md:text-9xl font-black uppercase hover:italic transition-all cursor-pointer leading-none"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Experience Modal */}
      <AnimatePresence>
        {selectedExp && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden overscroll-contain"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="max-w-5xl w-full h-[calc(100dvh-2rem)] max-h-[calc(100dvh-2rem)] md:h-[calc(100dvh-4rem)] md:max-h-[calc(100dvh-4rem)] grid grid-rows-[auto,minmax(0,1fr)] gap-4 md:gap-6 bg-white/5 p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col h-full justify-between py-0.5 md:py-1 text-left min-h-0 min-w-0">
                <div className="min-h-0 flex flex-col gap-4 md:gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
                    <div className="rounded-2xl md:rounded-3xl overflow-hidden aspect-[5/3] md:aspect-[16/10] h-auto max-h-[28vh] md:max-h-[34vh] bg-white/5 min-w-0 min-h-0 shrink-0">
                      <img src={selectedExp.image} alt="" className="w-full h-full max-w-full max-h-full object-cover" loading="lazy" decoding="async" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-pink-500 font-mono text-[10px] md:text-sm uppercase tracking-widest mb-2 md:mb-4 block">{selectedExp.period}</span>
                      <h2 className="text-3xl md:text-5xl font-black uppercase mb-2 md:mb-4 leading-tight tracking-tighter">{selectedExp.role}</h2>
                      <p className="text-lg md:text-2xl font-bold text-gray-400 mb-3 md:mb-5">{selectedExp.company}</p>
                      <p className="text-gray-300 italic text-base md:text-lg leading-relaxed">{selectedExp.desc}</p>
                    </div>
                  </div>
                  <div className="min-h-0 overflow-y-auto pr-1 md:pr-2 scrollbar-hide">
                    <div className="space-y-2 md:space-y-3">
                      {selectedExp.details.map((detail, idx) => (
                        <div key={idx} className="flex gap-3 text-sm md:text-base text-gray-400 items-start">
                          <CheckCircle2 size={18} className="text-pink-500 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 pt-4 md:pt-6 border-t border-white/10">
                   <div className="flex flex-wrap gap-2">
                      {selectedExp.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest border border-white/10 text-gray-500">{tag}</span>
                      ))}
                   </div>
                   <div className="flex gap-3 md:gap-4">
                     <FloatingAction distance={3} duration={2.6}>
                       <button 
                          onClick={() => window.open(selectedExp.link, '_blank')} 
                          className="flex-1 md:flex-none flex items-center justify-center gap-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] bg-pink-500 text-black px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-white transition-all whitespace-nowrap"
                        >
                          Case Study <ArrowDownRight size={14} />
                        </button>
                     </FloatingAction>
                     <FloatingAction distance={3} duration={3}>
                       <button 
                          onClick={() => setSelectedExp(null)} 
                          className="flex-1 md:flex-none flex items-center justify-center gap-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] border border-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-white hover:text-black transition-all"
                        >
                          Close
                        </button>
                     </FloatingAction>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects (Works) Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center p-4 md:p-10 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="max-w-5xl w-full grid md:grid-cols-2 gap-8 md:gap-10 items-center bg-white/5 p-6 md:p-8 rounded-[2rem] border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-white/5">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full max-w-full max-h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="flex flex-col h-full justify-center text-left">
                <span className="text-pink-500 font-mono text-[10px] md:text-sm uppercase tracking-widest mb-2 block">{selectedProject.category}</span>
                <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 leading-tight tracking-tighter">{selectedProject.title}</h2>
                <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed italic">"{selectedProject.description}"</p>
                
                <div className="flex gap-4">
                  <FloatingAction distance={3} duration={2.7}>
                    <button 
                      onClick={() => window.open(selectedProject.link, '_blank')} 
                      className="flex-1 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] bg-white text-black px-8 py-4 rounded-full hover:bg-pink-500 transition-all"
                    >
                      View <ExternalLink size={14} />
                    </button>
                  </FloatingAction>
                  <FloatingAction distance={3} duration={3.1}>
                    <button 
                      onClick={() => setSelectedProject(null)} 
                      className="w-14 h-14 flex items-center justify-center border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-all"
                    >
                      <X size={20} />
                    </button>
                  </FloatingAction>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section id="home" className="h-screen relative flex items-center justify-center px-6 overflow-hidden">
        <MinimalHeroBackground />
        
        <div className="relative z-10 text-center">
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
            <h1 className="text-[14vw] md:text-[10.5vw] font-black leading-none uppercase mb-5 md:mb-5 tracking-tighter">
              The <br />
              <span className="text-outline-white text-transparent">Creative</span><br />
              Growth
            </h1>
            <p className="text-base md:text-[1.4rem] font-light max-w-2xl mx-auto text-gray-300 mb-14 md:mb-14 leading-relaxed"> 
              Xây dựng và vận hành hệ thống Marketing <br />
              chuyển hóa thương hiệu thành doanh thu.
            </p>
            <FloatingAction distance={5} duration={3}>
              <MagneticButton 
                className="px-8 md:px-11 py-3.5 md:py-[18px] bg-white text-black rounded-full hover:bg-pink-500 font-black uppercase tracking-[0.2em] md:tracking-widest hover:scale-105 transition-transform flex items-center gap-2 md:gap-4 mx-auto text-[11px] md:text-[15px]"
                onClick={startJourney}
              >
                Bắt đầu hành trình <ArrowDownRight className="w-4 h-4 md:w-6 md:h-6" />
              </MagneticButton>
            </FloatingAction>
          </motion.div>
        </div>
        
      <motion.div 
          animate={{ y: [0, 10, 0], opacity: [0.45, 0.75, 0.45] }} 
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }} 
          className="absolute bottom-8 md:bottom-10 right-6 md:right-16 text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-50 z-20"
        >
          Use button to explore
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-0 px-0 relative z-10">
        <SectionTransitionGlow />
        <div
          ref={servicesOuterRef}
          className="relative max-w-7xl mx-auto px-4 md:px-6"
          style={{ height: `${(1 + servicesMaxTranslatePct / 100) * 100}vh` }}
        >
          <div ref={servicesInnerRef} className="h-screen overflow-hidden">
            <div className="h-full flex flex-col justify-center bg-[#050505]">
              <div className="pt-6 md:pt-8">
                <SectionTitle title="Expertise" subtitle="Services" />
              </div>
              <motion.div style={{ x: servicesX, willChange: 'transform' }} className="flex">
                {serviceCards}
              </motion.div>

              <div className="mt-6">
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 origin-left"
                    style={{ scaleX: servicesProgress }}
                  />
                </div>
                <div className="mt-3">
                  <ScrollMouseHint axis="vertical" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-24 md:py-40 relative z-10">
        <SectionTransitionGlow />
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionTitle title="Experience" subtitle="Journey" />
          <div className="flex flex-col">
            {EXPERIENCES.map((exp, i) => (
              <div
                key={`${exp.period}-${exp.company}-${exp.role}`}
                data-exp-idx={i}
                ref={el => expRefs.current[i] = el}
                className="scroll-mt-[30vh]"
                onMouseEnter={() => activateExperience(i)}
              >
                <ExperienceRow exp={exp} index={i} isActive={activeIdx === i} onOpenDetail={setSelectedExp} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS SECTION */}
      <section id="works" ref={worksSectionRef} className="py-24 md:py-40 bg-white text-black relative z-10">
        <SectionTransitionGlow light />
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4 md:pt-6">
          <SectionTitle title="The Works" subtitle="Gallery" dark={true} subtitleClassName="text-purple-500" />

          <div
            ref={worksOuterRef}
            className="mt-12 md:mt-16 overflow-x-auto scrollbar-hide snap-x snap-mandatory touch-auto"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="flex gap-4 md:gap-6 lg:gap-8">
              {workCards}
            </div>
          </div>
          <div className="mt-0">
            <ScrollMouseHint axis="horizontal" dark />
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 md:py-40 bg-[#050505] relative z-10">
        <SectionTransitionGlow />
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <SectionTitle title="Impact" subtitle="Data" />
              <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-10">
                Xây dựng hệ thống Marketing bài bản, tối ưu vận hành và tăng trưởng lợi nhuận bền vững.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:pt-20">
              {statCards}
            </div>
          </div>
        </div>
      </section>

      {/* CONNECT SECTION */}
      <section id="connect" className="relative min-h-[80vh] bg-[#030303] pt-32 md:pt-40 pb-20 overflow-hidden z-10">
        <SectionTransitionGlow />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-6">
          <SectionTitle title="Connect" subtitle="Contact" />
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end">
            <div>
              <motion.h3 className="text-6xl md:text-[12rem] font-black uppercase leading-[0.8] mb-12 tracking-tighter" whileHover={{ skewX: -5 }}>
                Let's <br /> Talk <span className="text-pink-500">.</span>
              </motion.h3>
              <form
                ref={formRef}
                className={`space-y-6 w-full max-w-xl transition-opacity ${isSent ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleFormSubmit();
                }}
              >
                <input type="text" name="Name" placeholder="Người liên hệ" required disabled={isSent || isSubmitting} className="w-full bg-transparent border-b border-gray-600 focus:border-pink-500 outline-none py-3 text-white transition disabled:opacity-60 disabled:cursor-not-allowed" />
                <input type="text" name="Brand" placeholder="Tên thương hiệu" required disabled={isSent || isSubmitting} className="w-full bg-transparent border-b border-gray-600 focus:border-pink-500 outline-none py-3 text-white transition disabled:opacity-60 disabled:cursor-not-allowed" />
                <input type="email" name="Email" placeholder="Email" required disabled={isSent || isSubmitting} className="w-full bg-transparent border-b border-gray-600 focus:border-pink-500 outline-none py-3 text-white transition disabled:opacity-60 disabled:cursor-not-allowed" />
                <textarea name="Message" placeholder="Nội dung trao đổi" rows="4" required disabled={isSent || isSubmitting} className="w-full bg-transparent border-b border-gray-600 focus:border-pink-500 outline-none py-3 text-white transition resize-none disabled:opacity-60 disabled:cursor-not-allowed" />
              </form>
            </div>
            <div className="flex flex-col gap-12 items-end w-full pr-3 md:pr-0">
              <div className="relative">
                <AnimatePresence>
                  {isSent && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center gap-2 whitespace-nowrap z-20 shadow-lg"
                    >
                      <CheckCircle2 size={14} className="text-green-500" /> Thanks! I will reply within 24h.
                    </motion.div>
                  )}
                </AnimatePresence>
                <FloatingAction distance={isSent ? 0 : 4} duration={3.2}>
                  <MagneticElement distance={isSent ? 0 : 0.5}>
                    <div 
                      className={`w-40 h-40 md:w-64 md:h-64 rounded-full border border-pink-500/30 flex items-center justify-center p-2 transition-all duration-500 ${isSent ? 'opacity-50 pointer-events-none' : 'group cursor-pointer hover:scale-105'}`}
                      onClick={handleFormSubmit}
                    >
                      <div className={`w-full h-full rounded-full flex items-center justify-center text-black overflow-hidden relative transition-colors duration-500 ${isSent ? 'bg-white' : 'bg-pink-500'}`}>
                        <div className="relative z-10 flex flex-col items-center gap-2">
                          {isSubmitting ? <div className="animate-spin w-6 h-6 border-2 border-black border-t-transparent rounded-full" /> : isSent ? <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8" /> : <Send className="w-6 h-6 md:w-8 md:h-8" />}
                          <span className="font-black text-[10px] md:text-xs uppercase tracking-widest">{isSubmitting ? 'Sending' : isSent ? 'Sent' : 'Send Hi'}</span>
                        </div>
                        {!isSent && !isSubmitting && <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />}
                      </div>
                    </div>
                  </MagneticElement>
                </FloatingAction>
                {!!submitError && (
                  <p className="mt-4 text-right text-xs font-bold tracking-wide text-red-400 max-w-[220px] md:max-w-none">
                    {submitError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="pt-20 pb-10 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
            {contactCards.map((item, idx) => (
              <a key={idx} href={item.url} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 group-hover:bg-pink-500 group-hover:text-black group-hover:border-pink-500 transition-all">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-0.5">{item.label}</span>
                  <span className="text-[11px] font-black uppercase tracking-widest text-gray-300 group-hover:text-white transition-colors">{item.val}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5 opacity-50">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              © {new Date().getFullYear()} Anh Tran Viet
            </span>
            <FloatingAction distance={2.5} duration={2.9}>
              <button 
                onClick={() => scrollToSection('home')}
                className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] hover:text-pink-500 transition-colors group"
              >
                Back to top <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform" />
              </button>
            </FloatingAction>
          </div>
        </div>
      </footer>
    </div>
  );
}
