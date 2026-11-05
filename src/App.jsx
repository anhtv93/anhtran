/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  ExternalLink,
  ArrowDownRight,
  BriefcaseBusiness,
  Building2,
  Download,
  MessageCircle,
  CalendarCheck,
  ShoppingBag,
  X,
  Mail,
  Mic2,
  ArrowUp,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Trophy,
  HandHeart
} from 'lucide-react';


const ZaloIcon = ({ className = '' }) => (
  <span className={`box-border inline-grid shrink-0 place-items-center rounded-[4px] border font-black leading-none ${className}`}>
    <span className="block text-[10px] leading-none translate-y-[0.25px]">Z</span>
  </span>
);

const getHoChiMinhDateTime = () => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return {
    date: `${values.year}-${values.month}-${values.day}`,
    time: `${values.hour}:${values.minute}`,
    second: Number(values.second),
  };
};

const isFutureHoChiMinhSlot = (date, time, now = Date.now()) =>
  Date.parse(`${date}T${time}:00+07:00`) > now;

const getFutureAppointmentSlots = (date, now = Date.now()) => {
  if (!date) return [];
  return Array.from({ length: 20 }, (_, index) => {
    const hour = String(9 + Math.floor(index / 2)).padStart(2, '0');
    const minute = index % 2 ? '30' : '00';
    return `${hour}:${minute}`;
  }).filter((time) => isFutureHoChiMinhSlot(date, time, now));
};

const addOneHoChiMinhDay = (date) => {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day + 1)).toISOString().slice(0, 10);
};

const getNextAvailableAppointmentDate = () => {
  const today = getHoChiMinhDateTime().date;
  return getFutureAppointmentSlots(today).length ? today : addOneHoChiMinhDay(today);
};

export const SERVICES = [
  { title: "Brand Strategy", meta: "BRAND POSITIONING • BRAND IDENTITY • RESEARCH", Icon: Target, desc: "Xây dựng và tái định vị Brand positioning dựa trên Marketing research, Internal data và Customer insight. Chuẩn hoá thương hiệu, tạo lợi thế cạnh tranh rõ ràng và giúp SME được khách hàng lựa chọn thay vì bị so sánh về giá." },
  { title: "Growth & Performance", meta: "CUSTOMER JOURNEY • DEMAND GEN • CONVERSION", Icon: TrendingUp, desc: "Thiết kế và tối ưu Customer journey: từ Demand generation > Lead acquisition > Conversion > Retention. Kết nối Marketing, Sales và Product thành một hệ thống thống nhất nhằm đo lường và thúc đẩy tăng trưởng bền vững." },
  { title: "Martech & AI", meta: "CRM • AUTOMATION • AI WORKFLOWS", Icon: Zap, desc: "Triển khai CRM, Marketing automation, AI workflow, Data-driven nhằm tối ưu hiệu suất đội ngũ, chuẩn hóa quy trình, xây dựng nền tảng vận hành có khả năng scale và giúp SME bắt kịp xu hướng." },
  { title: "IMC", meta: "ADS • PR • DIGITAL • SOCIAL • SALES", Icon: ShoppingBag, desc: "Xây dựng hệ thống Intergrated Marketing Communication: Ads, PR, Digital, Social media, Sales, Promotion, Direct marketing. Đảm bảo mọi touchpoint đều đồng bộ và cùng hướng tới mục tiêu tăng trưởng." }
];

export const EXPERIENCES = [
  {
    period: "2021 - 2025",
    role: "CEO",
    company: "Dự Án Việt Nam",
    image: "/assets/1.jpeg",
    desc: "Hoàn thiện và phát triển phần mềm TMĐT xây dựng duanvietnam.vn. Chịu trách nhiệm toàn diện từ chiến lược sản phẩm, vận hành đến tăng trưởng.",
    details: [
      "Chiến lược Go-to-Market: Thiết lập mô hình kinh doanh B2B2C, định vị duanvietnam.vn là hệ thống TMĐT tiên phong trong lĩnh vực xây dựng.", 
      "Phát triển Core Product: Xây dựng Roadmap trên nền tảng Angular 8.0, tối ưu hoá UX và nâng cấp hệ thống dịch vụ.", 
      "Thiết lập hệ thống quản trị: Xây dựng bộ máy nhân sự, văn hoá doanh nghiệp và hệ thống OKRs, KPIs cho Sales, Marketing, Tech, Finance với quy mô tinh gọn 20 nhân sự.", 
      "P&L: Chịu trách nhiệm về hiệu quả tài chính, tối ưu hóa chi phí vận hành linh hoạt theo từng thời điểm.", 
      "Marketing: Thực hiện R&D, hoạch định chiến lược, điều phối hoạt động Branding, Digital, Media.",
      "Scaling: Phát triển các dịch vụ B2B, B2C, mở rộng mạng lưới CTV, đàm phán hợp tác với các hiệp hội và tổ chức trong ngoài ngành."
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
      "Strategy: Thực hiện R&D định vị lại thương hiệu Nguyễn Văn Cừ, chuẩn hoá Brand Identity/Voice/Equity nhằm gắn kết hơn với tệp khách hàng hiện đại.", 
      "Digital Transformation: Dịch chuyển trọng tâm từ bán lẻ truyền thống sang mô hình Omnichannel, ứng dụng công nghệ vào các hoạt động vận hành.", 
      "Marketing: Xây dựng chiến lược BTL, tập trung Lead2Order và tối ưu hoá CVR, collab với các thương hiệu văn phòng phẩm, Art toys, Boardgames.", 
      "E-commerce: Xây dựng hạ tầng TMĐT Website, E-com platforms, Logistics và triển khai các chương trình bán hàng, tìm kiếm nhà cung cấp.",
      "HRM: Tuyển dụng và đào tạo đội ngũ kế cận, thiết lập hệ thống KPIs, báo cáo chiến lược đến BOD."
    ],
    tags: ["Conversion", "Branding", "Data", "CRM"],
    link: "https://www.behance.net/gallery/106953807/NguyenVanCu-Bookstores"
  },
  {
    period: "2019",
    role: "Project Marketing",
    company: "LEGO Education",
    image: "/assets/3.jpeg",
    desc: "Triển khai mở rộng chuỗi hoạt động Educate Market, định hình tư duy phụ huynh về phương pháp giáo dục STEAM.",
    details: [
      "Product Launch: Triển khai các chiến dịch ATL ra mắt sản phẩm chiến lược LEGO Education SPIKE Prime qua các campaign và hội thảo giáo dục.", 
      "Brand Equity: Đảm bảo nhất quán thương hiệu LEGO Education trên hệ sinh thái digital của nhãn hàng và đối tác.", 
      "Content Creation: Sản xuất các nội dung phục vụ campaign và nội dung media chất lượng cao.", 
      "Performance: Trực tiếp làm việc với các Agency marketing, kết hợp Sales team tối ưu chỉ số CPL, ROAS, CAC, CLV.",
      "Partnerships: Thiết lập và vận hành mạng lưới phân phối chiến lược thông qua các đối tác giáo dục & bán lẻ hàng đầu: MyKingdom, ILA, Sylvan Learning.",
      "Digital Transformation: Tiên phong chuyển đổi mô hình học tập với chiến dịch 'Vui học tại nhà', duy trì kết nối và giá trị thương hiệu xuyên suốt giai đoạn đại dịch COVID."
    ],
    tags: ["Branding", "Creative", "Scaling", "Execution"],
    link: "https://www.behance.net/gallery/106955351/LEGO-Education"
  },
  {
    period: "2019",
    role: "Marketing Manager",
    company: "FitForce Fitness",
    image: "/assets/4.jpeg",
    desc: "Xây dựng định vị thương hiệu Fitness cao cấp tại trung tâm Q1 và tối ưu hoá giá trị khách hàng.",
    details: [
      "Brand Positioning: Kiến tạo trải nghiệm khách hàng cao cấp thông qua: Brand Image/Voice premium, tăng trải nghiệm cá nhân hoá, kết hợp hình ảnh Influencers, các sự kiện membership độc quyền.", 
      "Performance: Chỉ đạo sản xuất nội dung và trực tiếp triển khai các campaign BTL, tối ưu chỉ số CVR, CPL, ROAS, CAC.", 
      "Growth: Đồng bộ Sales team khai thác tệp khách hàng mới tiềm năng, song song thiết lập hệ thống CRM re-targeting khách hàng cũ, thông qua các Activations tại cơ sở.", 
      "Sales Optimization: R&D, testing và launching các nhóm sản phẩm mới (giáo trình bài tập, thực phẩm bổ sung, sản phẩm hỗ trợ) thúc đẩy doanh thu và chỉ số CLV.",
      "PR & Communication: Kết nối thành công các nhãn hàng thể thao và Influencers, KOCs, hành chính địa phương để tạo độ phủ và tăng uy tín thương hiệu.",
      "HRM: Tuyển dụng, đào tạo và quản lý đội ngũ nhân sự: Content, Performance, Media, báo cáo trực tiếp cho BOD."
    ],
    tags: ["Social Media", "Branding", "Event", "Influencer"],
    link: "https://www.behance.net/gallery/106954181/FitForce-Fitness-Yoga"
  },
  {
    period: "2018",
    role: "Sales & Marketing",
    company: "Ambassador Hotel",
    image: "/assets/5.jpeg",
    desc: "Đặt nền móng thương hiệu cho chi nhánh mới tại TP. Vũng Tàu, khai thác thị trường khu vực trung tâm thành phố.",
    details: [
      "Brand Positioning: Định vị rõ phân khúc tầm trung; dựa trên đặc điểm vị trí, tập trung vào nhóm khách hàng ưa thích du lịch trải nghiệm, ưu tiên tính tiện lợi, và nhóm khách hàng thích trải nghiệm ẩm thực mới lạ.", 
      "Market Penetration: Triển khai chiến lược thâm nhập thị trường Vũng Tàu cho thương hiệu Ambassador ở mảng Hotel và Camellia ở mảng F&B.", 
      "Social Media: Xây dựng hệ thống kênh MXH cho Ambassador tập trung vào các nội dung hình ảnh tương tác nhằm tăng nhận diện và tạo phễu leads data.",
      "Brand Equity: Phát triển hình ảnh và đảm bảo nhất quán thương hiệu Online2Offline ở các chi nhánh.",
      "Networking: Duy trì quan hệ với các doanh nghiệp địa phương và các hiệp hội du lịch, khai thác tệp Corporate.",
      "Inventory Optimization: Tối ưu công suất phòng qua hệ thống OTA, TA, các kênh Booking online của hệ thống."
    ],
    tags: ["Social Media", "Branding", "Revenue", "Execution"],
    link: "https://www.behance.net/gallery/106960225/Ambassador-Hotel-Group"
  }
];

export const PROJECTS = [
  {
    title: "Đại diện thương hiệu",
    category: "Branding",
    image: "/assets/6.jpeg",
    description: "Đại diện Dự Án Việt Nam nhận giải thưởng Top 10 Asia Top Brand Award 2024.",
    link: "https://www.facebook.com/reel/987442559539122"
  },
  {
    title: "Tư vấn chiến lược thương hiệu",
    category: "Marketing Strategy",
    image: "/assets/28.jpeg",
    description: "Tái định vị thương hiệu Nước giải khát tỉnh Khánh Hòa, đưa thương hiệu trở lại đường đua và bắt kịp xu hướng.",
    link: "https://drive.google.com/drive/folders/1xWq9vmXwFj7mxfCx_Y0uyCwPa0P1uaql?usp=share_link"
  },
  {
    title: "Tư vấn chiến lược thương hiệu",
    category: "Marketing Strategy",
    image: "/assets/7.jpeg",
    description: "Định vị thương hiệu, xây dựng & chuyển giao lộ trình phát triển nhân sự và chiến lược marketing dài hạn cho hệ thống Onsen Nhật.",
    link: "https://drive.google.com/drive/folders/18EePklHJB1nS5eMQ5oittod5AsQw58Cl?usp=sharing"
  },
  {
    title: "Đào tạo nhân sự",
    category: "Training",
    image: "/assets/8.jpeg",
    description: "Thiết kế bài giảng và tổ chức đào tạo cho sản phẩm chiến lược mới cho chuỗi Trung tâm Tiếng Anh tại khu vực miền Nam.",
    link: "https://docs.google.com/presentation/d/1jNi_LlrgeViBc2TIu6oEIoAqJzI2XyUd/edit?usp=sharing&ouid=116372570508469460772&rtpof=true&sd=true"
  },
  {
    title: "Tổ chức sự kiện",
    category: "Workshop",
    image: "/assets/9.jpeg",
    description: "Tổ chức workshop 'Marketing gắn liền với quản trị SME' xây dựng uy tín thương hiệu và khai thác tệp khách hàng mục tiêu.",
    link: "https://www.facebook.com/share/v/1QjRa3wwj1"
  },
  {
    title: "Tư vấn chiến lược thương hiệu",
    category: "Marketing Strategy",
    image: "/assets/10.jpeg",
    description: "Tư vấn tái định vị thương hiệu, xây dựng chiến lược sản phẩm mới, đồng thời phát triển thương hiệu cá nhân bà Huynh.",
    link: "https://drive.google.com/file/d/1sAqQLPlSmI2lQS23BAo8UpKlZ1-SZZdE/view?usp=sharing"
  },
  {
    title: "Chuyển đổi số Xây dựng",
    category: "Event",
    image: "/assets/11.jpeg",
    description: "Giới thiệu gói giải pháp 'Ứng dụng nền tảng TMĐT vào ngành xây dựng' tại sự kiện, giúp SMEs tối ưu vận hành và tăng trưởng.",
    link: "https://baoxaydung.vn/du-an-viet-nam-lan-song-moi-thuong-mai-dien-tu-nganh-xay-dung-1926868376281.htm"
  },
  {
    title: "Chuyển đổi số Nhà sách",
    category: "Transformation",
    image: "/assets/12.jpeg",
    description: "Xây dựng hệ thống TMĐT đa kênh, logistics, data management; hợp tác các nhãn hàng, NXB mới; triển khai kênh social media cho hệ thống.",
    link: "https://nhasachnguyenvancu.vn/"
  },
  {
    title: "Chuyển đổi số Giáo dục",
    category: "Transformation",
    image: "/assets/13.jpeg",
    description: "Sản xuất và phát hành series 'HỌC LÀM NHÀ PHÁT MINH CÔNG NGHỆ VỚI LEGO SPIKE PRIME'.",
    link: "https://www.youtube.com/playlist?list=PLoVM1h2NMGedtN4dGV13m0WFEulBF3JKB"
  },
  {
    title: "Xây dựng và vận hành hệ thống bán lẻ",
    category: "Ecommerce",
    image: "/assets/14.jpeg",
    description: "Xây dựng hệ thống TMĐT đa kênh, làm mới Brand Identity, đào tạo đội ngũ marketing mới cho doanh nghiệp.",
    link: "https://www.facebook.com/congtyquatangata"
  },
  {
    title: "Setup nhà hàng",
    category: "F&B",
    image: "/assets/15.jpeg",
    description: "Triển khai xây dựng ý tưởng nhà hàng ăn vặt đầu tiên tại Vũng Tàu.",
    link: "https://www.tripadvisor.com.vn/Restaurant_Review-g303946-d14948011-Reviews-Camellia_Coffee_Restaurant-Vung_Tau_Ba_Ria_Vung_Tau_Province.html"
  },    
  {
    title: "Khách mời Podcast",
    category: "Podcast",
    image: "/assets/16.jpeg",
    description: "Chia sẻ câu chuyện khởi nghiệp Dự Án Việt Nam - Personal Branding.",
    link: "https://drive.google.com/file/d/1ly37dJYfFfn50gHxCLItw37oWYm5Sssc/view?usp=sharing"
  },
  {
    title: "Tài trợ sự kiện",
    category: "Event",
    image: "/assets/17.jpeg",
    description: "Tổ chức gian hàng tại 'Vietbuild 2024', giới thiệu giải pháp & khai thác tệp khách hàng tiềm năng.",
    link: "https://www.tiktok.com/@duanvietnam/video/7385468335833599239"
  },
  {
    title: "Tài trợ sự kiện",
    category: "Event",
    image: "/assets/18.jpeg",
    description: "Đặt gian hàng tại 'Kết nối giao thương CLB doanh nhân trẻ TP HCM', tăng nhận diện thương hiệu & khai thác tệp khách hàng tiềm năng.",
    link: "https://www.facebook.com/share/v/14aGWYWH5LJ"
  },
  {
    title: "Tổ chức sự kiện",
    category: "Workshop",
    image: "/assets/19.jpeg",
    description: "Tổ chức workshop 'Xây dựng & quản trị doanh nghiệp theo khoa học phong thuỷ', series go viral trên các kênh social.",
    link: "https://www.tiktok.com/@duanvietnam/video/7405381047292103956"
  },
  {
    title: "Tổ chức sự kiện",
    category: "Workshop",
    image: "/assets/20.jpeg",
    description: "Tổ chức sự kiện 'Tầm quan trọng của đấu thầu đối với sinh viên ngành xây dựng' tại HUTECH, tăng branding & trust.",
    link: "https://www.hutech.edu.vn/homepage/tin-tuc/hoat-dong-sinh-vien/14612371-sinh-vien-nganh-xay-dung-hutech-tim-hieu-co-hoi-nghe-nghiep-ve-dau-thau-qua-mang-cung-chuyen-gia"
  },
  {
    title: "Khách mời Podcast",
    category: "Podcast",
    image: "/assets/21.jpeg",
    description: "Tham gia 'Podcast Nhảy việc cuối năm hay chờ thưởng Tết', go viral nhờ chủ đề tranh cãi & đúng thời điểm.",
    link: "https://www.youtube.com/watch?v=P0pekIKb1I0"
  },
  {
    title: "NTT Kim Cương - Giải Tenis Doanh nhân Lan Anh 2022",
    category: "Event",
    image: "/assets/22.jpeg",
    description: "Tăng nhận diện thương hiệu đến tệp khách hàng B2B tiềm năng.",
    link: "https://www.facebook.com/share/p/17BhWsc9oJ/"
  },
  {
    title: "Tổ chức sự kiện",
    category: "Event",
    image: "/assets/23.jpeg",
    description: "Sự kiện trải nghiệm thu hút nhiều lượt quan tâm, go viral nhờ chủ đề nhân văn và hướng về các nét đẹp văn hoá Tết cổ truyền.",
    link: "https://www.tiktok.com/@duanvietnam/video/7332505366900641026"
  },
  {
    title: "Dự án quà Tết 2024",
    category: "Branding",
    image: "/assets/24.jpeg",
    description: "Dự án quà tặng độc đáo đầy ý nghĩa từ đội ngũ Dự Án Việt Nam, mang ý nghĩa cộng đồng và gắn kết nhóm khách hàng trung thành.",
    link: "https://www.youtube.com/watch?v=gtelaltr2kg"
  },
  {
    title: "Sản xuất Campaign",
    category: "Campaign",
    image: "/assets/25.jpeg",
    description: "Campaign tuyển dụng thu hút CTV xây dựng nhờ nội dung vui nhộn bắt trend, target nhóm người nội trợ.",
    link: "https://www.facebook.com/reel/1173113730744110"
  },
  {
    title: "Sản xuất Podcast",
    category: "Podcast",
    image: "/assets/26.jpeg",
    description: "Sản xuất 'Podcast Xây nhà cuối năm', go viral nhờ chủ đề tranh cãi & đúng thời điểm, đánh đúng nhóm đối tượng mục tiêu.",
    link: "https://www.youtube.com/watch?v=XttzQ1aUcIo"
  },
  {
    title: "Sản xuất Media",
    category: "Branding",
    image: "/assets/27.jpeg",
    description: "Xây dựng uy tín Dự Án Việt Nam qua những 'Video revew thành phẩm' chất lượng cao được đầu tư quay dựng bài bản, tăng branding & trust.",
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

export const STATS = [
  { value: "5B+ VND", label: "Total Budget" },
  { value: "50+", label: "Project Delivered" },
  { value: "100+", label: "Team members" },
  { value: "10+", label: "Industries" }
];

export const CONTACT_ROUTES = [
  {
    id: 'ceo',
    label: 'CEO / Founder',
    eyebrow: 'Core member',
    title: 'ĐỒNG HÀNH CÙNG START-UPS',
    intent: 'SME cần người xây dựng, phụ trách marketing & tăng trưởng.',
    Icon: Building2,
    bullets: ['Marketing Strategy.', 'Build/ Training.', 'Go-to-market.'],
  },
  {
    id: 'hr',
    label: 'HR / Recruiter',
    eyebrow: 'Tuyển dụng nhân sự',
    title: 'MARKETING MANAGER PROFILE.',
    intent: 'HR cần đặt lịch hẹn trao đổi công việc.',
    Icon: BriefcaseBusiness,
    bullets: ['Strategy Manager.', 'Growth Manager.', 'Performance Manager.'],
  },
  {
    id: 'collab',
    label: 'Collaboration',
    eyebrow: 'Collab marketing',
    title: 'HỢP TÁC TRUYỀN THÔNG.',
    intent: 'SME cần collab marketing xây dựng thương hiệu.',
    Icon: Mic2,
    bullets: ['Talkshow.', 'Podcast.', 'Event.'],
  },
];

export const PROFILE_MARKERS = [
  {
    type: "Education",
    year: "2011",
    title: "Đại học HUTECH",
    detail: "Tài chính ngân hàng",
    Icon: GraduationCap,
  },
  {
    type: "Education",
    year: "2013",
    title: "Cao đẳng HUTECH",
    detail: "Quản trị doanh nghiệp SMEs",
    Icon: GraduationCap,
  },
  {
    type: "Award",
    year: "2015",
    title: "Cuộc thi khởi nghiệp HUTECH",
    detail: "Giải thưởng Top 20",
    Icon: Trophy,
  },
  {
    type: "Community",
    year: "2024",
    title: "CLB Doanh Nhân Trẻ TP. HCM",
    detail: "Thành viên Ban Đại Sứ",
    Icon: HandHeart,
  },
];

const GLOBAL_STYLES = `
  .text-outline-white { -webkit-text-stroke: 1px white; }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  @keyframes cv-download-wiggle {
    0%, 72%, 100% { transform: rotate(0) translateX(0); }
    75% { transform: rotate(-22deg) translateX(-1px); }
    79% { transform: rotate(24deg) translateX(1px); }
    83% { transform: rotate(-18deg) translateX(-1px); }
    87% { transform: rotate(14deg) translateX(1px); }
    91% { transform: rotate(-8deg); }
    95% { transform: rotate(0); }
  }
  .cv-download-wiggle { animation: cv-download-wiggle 3s ease-in-out infinite; transform-origin: 50% 55%; }
  ::selection { background: white; color: black; }
  html { scroll-behavior: smooth; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    .cv-download-wiggle { animation: none !important; }
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
      setDisplayText(
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

const SectionTitle = ({ title, subtitle, dark = false, subtitleClassName = '', reserveTwoLines = false }) => {
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
          className={`text-5xl md:text-8xl font-black uppercase leading-none whitespace-pre-line ${reserveTwoLines ? 'md:min-h-[2em]' : ''} ${dark ? 'text-black' : 'text-white'}`}
        >
          <ScrambleText text={title} trigger={isInView} />
        </motion.h2>
      </div>
    </div>
  );
};

const CountUp = ({ value, duration = 700 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const raw = String(value);
    const match = raw.match(/[0-9]+(?:\.[0-9]+)?/);
    if (!match) {
      const t = setTimeout(() => setDisplay(raw), 0);
      return () => clearTimeout(t);
    }

    const num = parseFloat(match[0]);
    const suffix = raw.replace(match[0], "");
    const hasLeadingZero = /^0\d+$/.test(match[0]);
    const padLen = hasLeadingZero ? match[0].length : 0;
    const start = performance.now();
    const dur = Math.max(300, duration);
    let raf = null;

    const step = (t) => {
      const p = Math.min((t - start) / dur, 1);
      const current = Math.round(num * p);
      const str = hasLeadingZero ? String(current).padStart(padLen, "0") : String(current);
      setDisplay(p <= 0.03 ? "0" : `${str}${suffix}`);
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
              aria-label={`Xem chi tiết ${exp.role} — ${exp.company}`}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full border border-pink-500 text-pink-400 flex items-center justify-center transition-all duration-300 hover:text-black active:text-black ${isActive ? 'opacity-100 scale-110' : 'opacity-0'}`}
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

const HeroContent = ({ scale, y, scrollCueOpacity }) => (
  <motion.div className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center" style={{ scale, y }}>
    <div>
      <h1 className="text-[14vw] md:text-[10.5vw] font-black leading-none uppercase mb-5 tracking-tighter">
        The <br />
        <span className="text-outline-white text-transparent">Creative</span><br />
        Growth
      </h1>
      <p className="text-base md:text-[1.4rem] font-light max-w-2xl mx-auto text-gray-300 leading-relaxed">
        Xây dựng và vận hành hệ thống Marketing <br />
        Nâng tầm thương hiệu - tăng trưởng doanh thu.
      </p>
    </div>
    <motion.div className="absolute bottom-[7svh] left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.32em] text-white/70 md:text-xs" style={{ opacity: scrollCueOpacity }}>
      <span>Scroll to Explore</span>
      <span aria-hidden="true" className="h-8 w-px bg-gradient-to-b from-pink-400/80 via-violet-400/60 to-transparent" />
    </motion.div>
  </motion.div>
);

const ServiceSlide = ({ service, index, progress, segmentCount, width, gap }) => {
  const fillStart = Math.max(0, (index - 0.66) / segmentCount);
  const fillEnd = Math.min(1, (index + 0.66) / segmentCount);
  const fillProgress = useTransform(progress, [fillStart, fillEnd], [0, 1], { clamp: true });
  const titleClip = useTransform(fillProgress, (value) => `inset(0 ${100 - value * 100}% 0 0)`);
  const titleLinesByTitle = {
    'Brand Strategy': ['Brand', 'Strategy'],
    'Growth & Performance': ['Growth &', 'Performance'],
    'Martech & AI': ['Martech &', 'AI'],
    IMC: ['IMC', '\u00a0'],
  };
  const titleLines = titleLinesByTitle[service.title] || [service.title, '\u00a0'];
  const ServiceIcon = service.Icon;
  const ordinal = String(index + 1).padStart(2, '0');

  const titleClass = 'text-3xl font-black uppercase leading-[0.98] tracking-[-0.045em] sm:text-4xl md:text-6xl';
  return (
    <article className="relative h-[50svh] shrink-0" style={{ width, marginRight: index < segmentCount ? gap : 0 }}>
      <div className="relative h-full">
        <div className="absolute left-0 right-0 top-0 flex items-start justify-between gap-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/55 sm:text-[10px] md:text-xs">
          <ServiceIcon className={`${titleClass} h-[1em] w-[1em] shrink-0 text-pink-400`} aria-hidden="true" />
          <div className="flex max-w-[78%] items-start gap-3 text-right md:gap-5">
            <span className="leading-relaxed">{service.meta}</span>
          </div>
        </div>
        <div className="absolute left-0 top-[35%] z-10 w-full">
          <h3 className={`${titleClass} h-[2em] w-[94%] text-transparent md:w-[82%]`} style={{ WebkitTextStroke: '1px rgba(255,255,255,0.76)' }}>
            {titleLines.map((line, lineIndex) => <span key={`${line}-${lineIndex}`} className="block">{line}</span>)}
          </h3>
          <motion.h3 aria-hidden="true" className={`${titleClass} absolute left-0 top-0 h-[2em] w-[94%] text-white md:w-[82%]`} style={{ clipPath: titleClip }}>
            {titleLines.map((line, lineIndex) => <span key={`${line}-${lineIndex}`} className="block">{line}</span>)}
          </motion.h3>
          <p className="mt-3 w-1/2 max-w-[54ch] text-left text-xs leading-relaxed text-white/70 sm:text-sm md:mt-5 md:text-base">
            {service.desc}
          </p>
        </div>
        <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 select-none pb-[0.12em] pr-[0.12em] font-light text-[clamp(6rem,15vw,12rem)] leading-none tracking-[-0.09em] text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
          {ordinal}
        </span>
        <motion.span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 select-none pb-[0.12em] pr-[0.12em] font-light text-[clamp(6rem,15vw,12rem)] leading-none tracking-[-0.09em] text-white/55" style={{ clipPath: titleClip }}>
          {ordinal}
        </motion.span>
      </div>
    </article>
  );
};

const BRAND_PARTS = [
  { src: '/assets/loader/part-1.png', title: '"A"', description: 'Anh.Trần Việt' },
  { src: '/assets/loader/part-2.png', title: 'Strategy', description: 'La bàn định hướng' },
  { src: '/assets/loader/part-3.png', title: 'Growth', description: 'Vector tăng trưởng' },
  { src: '/assets/loader/part-4.png', title: 'Creative', description: '#FFFF00 - Màu vàng sáng tạo' },
];

const BRAND_SLOTS = [
  { x: '-20vw', mobileX: '-25vw', y: '-18vh', mobileY: '-14vh', side: 'left' },
  { x: '20vw', mobileX: '25vw', y: '-10vh', mobileY: '-7vh', side: 'right' },
  { x: '-20vw', mobileX: '-25vw', y: '10vh', mobileY: '7vh', side: 'left' },
  { x: '20vw', mobileX: '25vw', y: '18vh', mobileY: '14vh', side: 'right' },
];

const shuffleBrandSlots = (currentOrder) => {
  const order = [0, 1, 2, 3];
  for (let index = order.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
  }
  if (order.every((slot, index) => slot === currentOrder[index])) {
    order.push(order.shift());
  }
  return order;
};

const BrandRevealPart = ({ part, slot, index, progress, reducedMotion, isMobile }) => {
  const start = index === 3 ? 0.99 : (index + 1) * 0.25;
  const targetX = isMobile ? slot.mobileX : slot.x;
  const targetY = isMobile ? slot.mobileY : slot.y;
  const opacity = useTransform(progress, [start - 0.1, start], [0, 1]);
  const x = useTransform(progress, [start - 0.12, start, 1], ['0vw', targetX, targetX]);
  const y = useTransform(progress, [start - 0.12, start, 1], ['0vh', targetY, targetY]);
  const isRight = slot.side === 'right';

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-20 w-[min(46vw,300px)] -translate-x-1/2 -translate-y-1/2"
      style={{ x: reducedMotion ? targetX : x, y: reducedMotion ? targetY : y, opacity: reducedMotion ? 1 : opacity }}
    >
      <div className={`flex items-center gap-2 sm:gap-3 ${isRight ? 'flex-row-reverse text-right' : 'text-left'}`}>
        <img src={part.src} alt="" className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14 md:h-16 md:w-16" draggable="false" />
        <div className="min-w-0">
          <span className="block text-base font-black uppercase leading-tight tracking-tight text-white sm:text-lg md:text-2xl">{part.title}</span>
          <span className="mt-1 block text-xs font-medium leading-snug text-white/70 sm:text-sm md:text-base">{part.description}</span>
        </div>
      </div>
    </motion.div>
  );
};

const IntroJourney = () => {
  const journeyRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches);
  const [brandSlotOrder, setBrandSlotOrder] = useState([0, 1, 2, 3]);
  const brandSlotOrderRef = useRef([0, 1, 2, 3]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const updateViewport = () => setIsMobile(media.matches);
    updateViewport();
    media.addEventListener?.('change', updateViewport);
    return () => media.removeEventListener?.('change', updateViewport);
  }, []);
  const finalProgress = useMotionValue(1);
  const { scrollYProgress } = useScroll({ target: journeyRef, offset: ['start start', 'end end'] });
  const heroScaleProgress = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const heroScale = useTransform(heroScaleProgress, [0, 1], [1, isMobile ? 0.62 : 1 / 3]);
  const heroY = useTransform(heroScaleProgress, [0, 1], ['0vh', isMobile ? '-22vh' : '-27vh']);
  const backdropOpacity = useTransform(scrollYProgress, [0, 0.06, 0.08], [1, 1, 0]);
  const scrollCueOpacity = useTransform(heroScaleProgress, [0, 0.28, 1], [1, 0, 0]);
  const brandProgress = useTransform(scrollYProgress, [0.12, 1], [0, 1]);
  const coreScale = useTransform(brandProgress, [0, 0.18, 1], [0.35, 1, 1]);
  const coreRotate = useTransform(brandProgress, [0, 1], [0, 360]);
  const coreOpacity = useTransform(brandProgress, [0, 0.04], [0, 1]);
  const brandOpacity = useTransform(scrollYProgress, [0.08, 0.16], [0, 1]);
  const progress = reducedMotion ? finalProgress : brandProgress;

  useEffect(() => {
    let previousProgress = scrollYProgress.get();
    return scrollYProgress.on('change', (currentProgress) => {
      if (currentProgress >= 0.12 && previousProgress < 0.12) {
        const nextOrder = shuffleBrandSlots(brandSlotOrderRef.current);
        brandSlotOrderRef.current = nextOrder;
        setBrandSlotOrder(nextOrder);
      }
      previousProgress = currentProgress;
    });
  }, [scrollYProgress]);

  return (
    <section
      id="home"
      ref={journeyRef}
      className="relative isolate z-0 bg-[#050505]"
      style={{ height: reducedMotion ? '100svh' : '450svh' }}
    >
      <div className={`${reducedMotion ? 'relative' : 'sticky top-0'} h-[100svh] overflow-hidden bg-[#050505]`}>
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          style={{ opacity: reducedMotion ? 0 : backdropOpacity }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(ellipse at 16% 30%, rgba(236,72,153,0.22), transparent 35%), radial-gradient(ellipse at 84% 64%, rgba(124,58,237,0.22), transparent 38%), radial-gradient(rgba(255,255,255,0.15) 0.7px, transparent 0.9px)',
              backgroundSize: 'auto, auto, 22px 22px',
            }}
          />
          <div className="absolute inset-0 opacity-80">
            <div className="absolute -left-[14%] top-[16%] h-[min(58vw,520px)] w-[min(58vw,520px)] rounded-full border border-white/20" />
            <div className="absolute -left-[7%] top-[25%] h-[min(42vw,370px)] w-[min(42vw,370px)] rounded-full border border-pink-400/25" />
            <div className="absolute -right-[18%] -bottom-[22%] h-[min(64vw,560px)] w-[min(64vw,560px)] rounded-full border border-violet-400/25" />
            <div className="absolute -right-[10%] -bottom-[12%] h-[min(46vw,400px)] w-[min(46vw,400px)] rounded-full border border-white/18" />
          </div>
        </motion.div>
        <HeroContent scale={reducedMotion ? (isMobile ? 0.62 : 1 / 3) : heroScale} y={reducedMotion ? (isMobile ? '-22vh' : '-27vh') : heroY} scrollCueOpacity={reducedMotion ? 1 : scrollCueOpacity} />
        <motion.div
          className="absolute inset-x-0 bottom-0 overflow-hidden"
          style={{ top: isMobile ? '50%' : '33.333333%', opacity: reducedMotion ? 1 : brandOpacity }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 z-10 h-[min(22vw,160px)] w-[min(22vw,160px)] min-h-[80px] min-w-[80px] max-h-[160px] max-w-[160px] -translate-x-1/2 -translate-y-1/2 md:min-h-[96px] md:min-w-[96px]"
            style={{
              scale: reducedMotion ? 1 : coreScale,
              rotateY: reducedMotion ? 0 : coreRotate,
              opacity: reducedMotion ? 1 : coreOpacity,
              transformPerspective: 900,
              backfaceVisibility: 'visible',
              filter: 'drop-shadow(0 0 18px rgba(250, 204, 21, 0.78)) drop-shadow(0 0 42px rgba(250, 204, 21, 0.52))',
            }}
          >
            <img src="/assets/loader/part-0.png" alt="Logo" className="h-full w-full object-contain" />
          </motion.div>
          {BRAND_PARTS.map((part, index) => (
            <BrandRevealPart key={part.src} part={part} slot={BRAND_SLOTS[brandSlotOrder[index]]} index={index} progress={progress} reducedMotion={reducedMotion} isMobile={isMobile} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const MotionSpan = motion.span;

const ScrollMouseHint = ({ axis = 'vertical', dark = false }) => {
  const isVertical = axis === 'vertical';

  return (
    <div className="flex justify-center" aria-hidden="true">
      <div
        className={`relative rounded-full border ${
          dark ? 'border-black/35' : 'border-white/35'
        } ${isVertical ? 'h-10 w-6' : 'h-6 w-10'}`}
      >
        <MotionSpan
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


export default function App() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedExp, setSelectedExp] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeContactRouteId, setActiveContactRouteId] = useState('hr');
  const [isContactPopoverOpen, setIsContactPopoverOpen] = useState(false);
  const [isAppointmentSubmitting, setIsAppointmentSubmitting] = useState(false);
  const [appointmentStatus, setAppointmentStatus] = useState({ type: '', message: '' });
  const [appointmentDate, setAppointmentDate] = useState(getNextAvailableAppointmentDate);
  const [appointmentNow, setAppointmentNow] = useState(() => Date.now());
  const [appointmentTime, setAppointmentTime] = useState(() => {
    const today = getHoChiMinhDateTime().date;
    return getFutureAppointmentSlots(today)[0] || '';
  });
  const [hasExpDetailScrolled, setHasExpDetailScrolled] = useState(false);

  const containerRef = useRef(null);
  const contactPopoverRef = useRef(null);
  const expRefs = useRef([]);
  const activeIdxRef = useRef(0);
  const servicesOuterRef = useRef(null);
  const servicesInnerRef = useRef(null);
  const expLastRef = useRef(null);
  const impactMetricsRef = useRef(null);
  const [serviceViewportWidth, setServiceViewportWidth] = useState(() => typeof window === 'undefined' ? 0 : window.innerWidth);
  const [openWorkIdx, setOpenWorkIdx] = useState(null);
  const openWorkIdxRef = useRef(null);
  const workSwipeRef = useRef({ startX: 0, startY: 0, moved: false });
  const worksOuterRef = useRef(null);
  const workCardRefs = useRef([]);
  const worksSectionRef = useRef(null);

  const activeContactRoute = useMemo(
    () => CONTACT_ROUTES.find((route) => route.id === activeContactRouteId) || CONTACT_ROUTES[0],
    [activeContactRouteId]
  );
  const appointmentSlots = useMemo(
    () => getFutureAppointmentSlots(appointmentDate, appointmentNow),
    [appointmentDate, appointmentNow]
  );
  const appointmentHours = [...new Set(appointmentSlots.map((slot) => slot.slice(0, 2)))];
  const appointmentMinutes = appointmentSlots
    .filter((slot) => slot.startsWith(`${appointmentTime.slice(0, 2)}:`))
    .map((slot) => slot.slice(3));
  const contactEmailBody = useMemo(
    () =>
      [
        'Xin chào Anh Trần,',
        '',
        activeContactRoute.message,
        '',
        '- Nội dung trao đổi: ',
        '- Company / brand: ',
        '- Expected timeline: ',
        '',
        'Trân trọng.',
      ].join('\n'),
    [activeContactRoute.message]
  );
  const contactMailtoHref = `mailto:anh@anhtranviet.com?subject=${encodeURIComponent(activeContactRoute.emailSubject)}&body=${encodeURIComponent(contactEmailBody)}`;
  const contactZaloMessage = `${activeContactRoute.emailSubject}\n\n${contactEmailBody}`;

  useEffect(() => {
    const intervalId = window.setInterval(() => setAppointmentNow(Date.now()), 30_000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const today = getHoChiMinhDateTime().date;
    if (!appointmentSlots.length && appointmentDate === today) {
      const nextDate = addOneHoChiMinhDay(today);
      setAppointmentDate(nextDate);
      setAppointmentTime(getFutureAppointmentSlots(nextDate)[0] || '');
      return;
    }
    if (!appointmentSlots.includes(appointmentTime)) {
      setAppointmentTime(appointmentSlots[0] || '');
    }
  }, [appointmentDate, appointmentSlots, appointmentTime]);

  const { scrollYProgress: servicesProgress } = useScroll({
    target: servicesOuterRef,
    offset: ['start start', 'end end'],
  });
  const { scrollYProgress: servicesEntryProgress } = useScroll({
    target: servicesOuterRef,
    offset: ['start 90%', 'end end'],
  });
  const serviceFrameWidth = serviceViewportWidth * 0.7;
  const serviceGap = Math.max(serviceViewportWidth * 0.14, 32);
  const servicesSlidePitch = serviceFrameWidth + serviceGap;
  const servicesTranslateDistance = servicesSlidePitch * Math.max(SERVICES.length - 1, 0);
  const servicesScrollScreens = serviceViewportWidth > 0 ? servicesTranslateDistance / serviceViewportWidth : SERVICES.length;
  const servicesX = useTransform(servicesProgress, [0, 1], ['0px', `-${servicesTranslateDistance}px`]);
  const servicePinStartProgress = 0.9 / (servicesScrollScreens + 0.9);
  const servicesFillProgress = useTransform(
    servicesEntryProgress,
    [0, servicePinStartProgress, 1],
    [-0.02, 0.015, 1]
  );
  const { scrollYProgress: worksThemeProgress } = useScroll({ target: expLastRef, offset: ['end start', 'end -30%'] });
  const worksBg = useTransform(worksThemeProgress, [0, 1], ['#050505', '#ffffff']);
  const worksContentOpacity = useTransform(worksThemeProgress, [0.995, 1], [0, 1]);
  const { scrollYProgress: impactThemeProgress } = useScroll({ target: impactMetricsRef, offset: ['start start', 'start -30%'] });


  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    window.__portfolioUnlockPreload?.();
    document.documentElement.classList.remove('preload-lock');
    document.body.classList.remove('preload-lock');
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    const forceHome = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    forceHome();
    const raf = window.requestAnimationFrame(forceHome);
    const t1 = window.setTimeout(forceHome, 80);
    const t2 = window.setTimeout(forceHome, 320);

    const resetScrollBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', resetScrollBeforeUnload);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener('beforeunload', resetScrollBeforeUnload);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateView = () => {
      if (!servicesInnerRef.current) {
        setServiceViewportWidth(window.innerWidth);
        return;
      }
      const styles = window.getComputedStyle(servicesInnerRef.current);
      const horizontalPadding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      setServiceViewportWidth(servicesInnerRef.current.clientWidth - horizontalPadding);
    };
    const resizeObserver = new ResizeObserver(updateView);
    if (servicesInnerRef.current) resizeObserver.observe(servicesInnerRef.current);
    updateView();
    return () => {
      resizeObserver.disconnect();
    };
  }, []);


  useEffect(() => {
    if (!PROJECTS.length || typeof window === 'undefined') return;

    const run = () => {
      PROJECTS.slice(0, 3).forEach((p) => preloadImage(p.image));
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(run, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }

    const t = window.setTimeout(run, 1200);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (selectedExp) {
      const t = setTimeout(() => setHasExpDetailScrolled(false), 0);
      return () => clearTimeout(t);
    }
  }, [selectedExp]);

  useEffect(() => {
    if (typeof window === 'undefined' || !selectedExp) return undefined;
    const body = document.body;
    const root = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousRootOverflow = root.style.overflow;
    body.style.overflow = 'hidden';
    root.style.overflow = 'hidden';
    return () => {
      body.style.overflow = previousBodyOverflow || 'auto';
      root.style.overflow = previousRootOverflow || '';
    };
  }, [selectedExp]);

  const handleContactRouteChange = useCallback((id) => {
    setActiveContactRouteId(id);
  }, []);

  useEffect(() => {
    if (!isContactPopoverOpen) return undefined;
    const closeOnOutsidePointer = (event) => {
      if (!contactPopoverRef.current?.contains(event.target)) {
        setIsContactPopoverOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsContactPopoverOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsidePointer);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isContactPopoverOpen]);

  const handleCopyAndOpenZalo = useCallback(async () => {
    const zaloWindow = window.open('about:blank', '_blank');
    try {
      await navigator.clipboard.writeText(contactZaloMessage);
    } catch {
      // Clipboard can be blocked by browser permissions; still open Zalo.
    }
    if (zaloWindow) {
      zaloWindow.location.href = 'https://zalo.me/84919999781';
    } else {
      window.location.href = 'https://zalo.me/84919999781';
    }
  }, [contactZaloMessage]);

  const handleAppointmentSubmit = useCallback(async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const jdFile = values.get('jd');
    const maxFileSize = 3 * 1024 * 1024;

    if (!appointmentDate || !appointmentTime || !isFutureHoChiMinhSlot(appointmentDate, appointmentTime)) {
      setAppointmentStatus({ type: 'error', message: 'Vui lòng chọn thời gian trong tương lai.' });
      return;
    }

    const requiredValues = ['company', 'contactName', 'phone', 'message'];
    if (requiredValues.some((name) => !String(values.get(name) || '').trim())) {
      setAppointmentStatus({ type: 'error', message: 'Vui lòng điền đầy đủ thông tin bắt buộc.' });
      return;
    }

    if (!/^\d{10}$/.test(String(values.get('phone') || ''))) {
      setAppointmentStatus({ type: 'error', message: 'Số điện thoại cần có đúng 10 chữ số.' });
      return;
    }

    if (jdFile instanceof File && jdFile.size > maxFileSize) {
      setAppointmentStatus({ type: 'error', message: 'JD vượt quá giới hạn 3 MB.' });
      return;
    }

    setIsAppointmentSubmitting(true);
    setAppointmentStatus({ type: '', message: '' });

    try {
      let attachment = null;
      if (jdFile instanceof File && jdFile.size > 0) {
        const extension = jdFile.name.split('.').pop()?.toLowerCase();
        if (!['pdf', 'doc', 'docx'].includes(extension)) {
          throw new Error('Chỉ nhận file PDF, DOC hoặc DOCX.');
        }
        const dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result || ''));
          reader.onerror = () => reject(new Error('Không đọc được file JD.'));
          reader.readAsDataURL(jdFile);
        });
        attachment = {
          name: jdFile.name,
          type: jdFile.type,
          contentBase64: dataUrl.split(',')[1] || '',
        };
      }

      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: activeContactRouteId,
          date: appointmentDate,
          time: appointmentTime,
          company: values.get('company'),
          contactName: values.get('contactName'),
          phone: values.get('phone'),
          message: values.get('message'),
          attachment,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (result.error === 'APPOINTMENT_IN_PAST') {
          throw new Error('Thời gian vừa chọn đã qua. Vui lòng chọn lại.');
        }
        throw new Error(result.error === 'SMTP_AUTH_MISSING' || result.error === 'SMTP_HOST_MISSING'
          ? 'Máy chủ email chưa được cấu hình.'
          : 'Chưa gửi được yêu cầu. Vui lòng thử lại sau.');
      }

      form.reset();
      const nextDate = getNextAvailableAppointmentDate();
      setAppointmentDate(nextDate);
      setAppointmentTime(getFutureAppointmentSlots(nextDate)[0] || '');
      setAppointmentStatus({ type: 'success', message: 'Đã gửi yêu cầu đặt lịch.' });
    } catch (error) {
      setAppointmentStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Chưa gửi được yêu cầu. Vui lòng thử lại sau.',
      });
    } finally {
      setIsAppointmentSubmitting(false);
    }
  }, [activeContactRouteId, appointmentDate, appointmentTime]);

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
    linkFavicon.href = "/logo.png";
  }, []);

  const activateExperience = useCallback((idx) => {
    if (idx === activeIdxRef.current) return;
    activeIdxRef.current = idx;
    setActiveIdx(idx);
  }, []);

  useEffect(() => {
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
  }, [activateExperience]);

  const scrollToSection = useCallback((id, behavior = 'smooth') => {
    if (id === 'connect') {
      handleContactRouteChange('hr');
    }

    if (id === 'home') {
      const forceTop = () => {
        const root = document.documentElement;
        const previousScrollBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        root.style.scrollBehavior = previousScrollBehavior;
      };

      forceTop();
      window.requestAnimationFrame(forceTop);
      window.setTimeout(forceTop, 80);
      window.setTimeout(forceTop, 260);
      return;
    }

    window.requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (!element) return;
      const top = Math.max(0, element.getBoundingClientRect().top + window.scrollY);
      window.scrollTo({ top, behavior });
    });
  }, [handleContactRouteChange]);


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

  const worksInView = useInView(worksSectionRef, { once: true, margin: '-20% 0px -20% 0px' });

  useEffect(() => {
    if (worksInView && openWorkIdxRef.current === null) {
      openWorkIdxRef.current = 0;
      const t = setTimeout(() => setOpenWorkIdx(0), 0);
      return () => clearTimeout(t);
    }
  }, [worksInView]);

  const serviceCards = useMemo(
    () =>
      SERVICES.map((service, index) => (
          <ServiceSlide
          key={service.title}
          service={service}
          index={index}
          progress={servicesFillProgress}
          segmentCount={Math.max(SERVICES.length - 1, 1)}
          width={serviceFrameWidth}
          gap={serviceGap}
        />
      )),
    [servicesFillProgress, serviceFrameWidth, serviceGap]
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
                    className="text-sm md:text-base text-gray-600 leading-relaxed min-h-0 md:min-h-[5.5em]"
                    style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
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
      STATS.map((s, index) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex min-w-0 flex-col items-center justify-center px-2 py-5 text-center md:py-8"
        >
          <span className="text-[clamp(2rem,7vw,4.75rem)] font-black leading-none tracking-[-0.06em] text-black">
            {s.value === '5B+ VND' ? (
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <CountUp value="5" duration={800} />
                <span className="flex flex-col text-[50%] leading-[0.9] tracking-[-0.04em]"><span>B+</span><span>VND</span></span>
              </span>
            ) : <CountUp value={s.value} duration={800} />}
          </span>
          <span className="mt-3 max-w-[18ch] text-[10px] font-bold uppercase leading-relaxed tracking-[0.14em] text-pink-600 sm:text-xs md:text-sm">{s.label}</span>
        </motion.div>
      )),
    []
  );

  // Gallery Navigation (scroll-driven)

  return (
    <div ref={containerRef} className="bg-[#050505] text-white selection:bg-white selection:text-black overflow-x-clip min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />

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
          <div ref={contactPopoverRef} className="relative flex items-center gap-1 md:gap-2">
            <button
              type="button"
              onClick={() => setIsContactPopoverOpen((isOpen) => !isOpen)}
              aria-label="Contact"
              aria-haspopup="dialog"
              aria-expanded={isContactPopoverOpen}
              className="flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full text-white transition-transform duration-200 hover:scale-110 active:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="nav-icon-sweep h-5 w-5 md:h-[22px] md:w-[22px]">
                <MessageCircle className="h-full w-full" strokeWidth={2.2} aria-hidden="true" />
                <MessageCircle className="nav-icon-sweep__overlay h-full w-full" strokeWidth={2.2} aria-hidden="true" />
              </span>
            </button>
            <a
              href="https://anhtranviet.com/tran-viet-anh-cmo-leadership-profile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download CV"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-110 active:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="nav-icon-sweep h-5 w-5 md:h-[22px] md:w-[22px]">
                <Download className="cv-download-wiggle h-full w-full" strokeWidth={2.2} aria-hidden="true" />
                <Download className="cv-download-wiggle nav-icon-sweep__overlay h-full w-full" strokeWidth={2.2} aria-hidden="true" />
              </span>
            </a>
            {isContactPopoverOpen && (
              <div
                role="dialog"
                aria-label="Chọn cách liên hệ"
                className="absolute right-0 top-full z-[60] mt-3 w-48 rounded-xl border border-white/15 bg-[#080808] p-2 text-white shadow-2xl mix-blend-normal"
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsContactPopoverOpen(false);
                    handleCopyAndOpenZalo();
                  }}
                  className="contact-popover-button flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors"
                >
                  <span className="nav-icon-sweep h-5 w-5">
                    <ZaloIcon className="h-5 w-5 border-white text-white" />
                    <ZaloIcon className="nav-icon-sweep__overlay h-5 w-5 border-pink-500 text-pink-500" />
                  </span>
                  Zalo
                </button>
                <a
                  href={contactMailtoHref}
                  onClick={() => setIsContactPopoverOpen(false)}
                  className="contact-popover-button flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors"
                >
                  <span className="nav-icon-sweep h-5 w-5">
                    <Mail className="h-full w-full" strokeWidth={2} aria-hidden="true" />
                    <Mail className="nav-icon-sweep__overlay h-full w-full" strokeWidth={2} aria-hidden="true" />
                  </span>
                  Email
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

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
                    </div>
                  </div>
                  <div className="relative min-h-0 overflow-hidden">
                    {!hasExpDetailScrolled && (
                      <div className="md:hidden pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2 opacity-100">
                        <ScrollMouseHint axis="vertical" />
                      </div>
                    )}
                    <div
                      className="h-full min-h-0 overflow-y-auto pr-1 md:pr-2 scrollbar-hide"
                      data-allow-scroll="true"
                      onScroll={(e) => {
                        if (!hasExpDetailScrolled && e.currentTarget.scrollTop > 6) {
                          setHasExpDetailScrolled(true);
                        }
                      }}
                    >
                    <div className="space-y-2 md:space-y-3">
                      <p className="text-gray-300 italic text-base md:text-lg leading-relaxed">{selectedExp.desc}</p>
                      {selectedExp.details.map((detail, idx) => (
                        <div key={idx} className="flex gap-3 text-sm md:text-base text-gray-400 items-start">
                          <CheckCircle2 size={18} className="text-pink-500 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
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
                          className="flex-1 md:flex-none flex items-center justify-center gap-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] border border-pink-500 bg-transparent text-pink-400 px-6 md:px-8 py-3 md:py-4 rounded-full hover:text-black transition-all whitespace-nowrap"
                        >
                          Case Study <ArrowDownRight size={14} />
                        </button>
                     </FloatingAction>
                     <FloatingAction distance={3} duration={3}>
                       <button 
                          onClick={() => setSelectedExp(null)} 
                          className="button-sweep-white flex-1 md:flex-none flex items-center justify-center gap-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] border border-white bg-transparent text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:text-black transition-all"
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

      {/* PINNED HERO + BRAND REVEAL */}
      <IntroJourney />

      {/* SERVICES SECTION */}
      <section id="services" className="relative z-10">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-60"><div className="absolute right-[-14%] top-20 h-[360px] w-[360px] rounded-full border border-pink-500/14" /><div className="absolute right-[-7%] top-40 h-[240px] w-[240px] rounded-full border border-white/10" /></div>
        <div
          ref={servicesOuterRef}
          className="relative"
          style={{ height: `${(1 + servicesScrollScreens) * 100}svh` }}
        >
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            <div ref={servicesInnerRef} className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pb-12 pt-28 md:px-6 md:pb-14 md:pt-32">
              <div className="-mb-6 md:-mb-12">
                <SectionTitle title="Expertise" subtitle="Services" />
              </div>
              <div className="relative flex h-[50svh] w-full items-center">
                <motion.div style={{ x: servicesX, willChange: 'transform' }} className="flex h-full w-max items-center">
                  {serviceCards}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <motion.section id="experience" style={{ backgroundColor: worksBg }} className="pt-24 md:pt-40 pb-[30svh] relative z-10 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-60"><div className="absolute left-[-14%] top-28 h-[400px] w-[400px] rounded-full border border-pink-500/14" /><div className="absolute left-[-7%] top-48 h-[250px] w-[250px] rounded-full border border-white/10" /></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionTitle title="Experience" subtitle="Journey" />
          <div className="flex flex-col">
            {EXPERIENCES.map((exp, i) => (
              <div
                key={`${exp.period}-${exp.company}-${exp.role}`}
                data-exp-idx={i}
                ref={el => {
                  expRefs.current[i] = el;
                  if (i === EXPERIENCES.length - 1) expLastRef.current = el;
                }}
                className="scroll-mt-[30vh]"
                onMouseEnter={() => activateExperience(i)}
              >
                <ExperienceRow exp={exp} index={i} isActive={activeIdx === i} onOpenDetail={setSelectedExp} />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* WORKS SECTION */}
      <motion.section id="works" ref={worksSectionRef} style={{ backgroundColor: worksBg }} className="isolate min-h-[180svh] pt-[30svh] md:pt-[35svh] pb-[130svh] relative z-10 overflow-hidden">
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-[#050505]" style={{ opacity: impactThemeProgress }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-70"><div className="absolute right-[-14%] top-16 h-[390px] w-[390px] rounded-full border border-pink-500/18" /><div className="absolute right-[-6%] top-36 h-[250px] w-[250px] rounded-full border border-black/10" /></div>
        <motion.div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-4 md:pt-6" style={{ opacity: worksContentOpacity }}>
          <SectionTitle title="The Works" subtitle="Projects" dark={true} subtitleClassName="text-purple-500" />

          <div
            ref={worksOuterRef}
            className="mt-12 md:mt-16 overflow-x-auto scrollbar-hide snap-x snap-mandatory touch-auto"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="flex gap-4 md:gap-6 lg:gap-8">
              {workCards}
            </div>
          </div>
          <div className="mt-6 md:mt-8"><ScrollMouseHint axis="horizontal" dark /></div>
          <div className="mt-10 border-t border-black/10 pt-6 md:mt-16 md:pt-8">
            <div ref={impactMetricsRef} className="grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-4 md:gap-6">
              {statCards}
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* CREDENTIALS SECTION */}
      <section id="credentials" className="py-24 md:py-40 bg-[#050505] relative z-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-70">
          <div className="absolute right-[-18%] top-8 h-[420px] w-[420px] rounded-full border border-pink-500/20" />
          <div className="absolute right-[-10%] top-28 h-[300px] w-[300px] rounded-full border border-white/10" />
          <div className="absolute left-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <SectionTitle title="Credentials" subtitle="Beyond Work" />
          </div>
          <p className="-mt-4 md:-mt-12 text-lg md:text-xl text-gray-400 leading-relaxed max-w-md">
            Học vấn, giải thưởng và hoạt động cộng đồng.
          </p>

          <div className="relative mt-12 md:mt-16 max-w-5xl ml-auto">
            <div className="absolute left-5 md:left-8 top-8 bottom-8 w-px bg-gradient-to-b from-pink-500 via-white/20 to-transparent" />
            <div className="grid gap-4 md:gap-5">
                {PROFILE_MARKERS.map((item, index) => {
                  const Icon = item.Icon;
                  return (
                    <motion.article
                      key={`${item.year}-${item.title}`}
                      initial={{ opacity: 0, y: 34 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true, amount: 0.35 }}
                      className="group relative pl-14 md:pl-20"
                    >
                      <motion.div
                        initial={{ borderColor: 'rgba(255,255,255,0.1)' }}
                        whileInView={{ borderColor: 'rgba(236,72,153,0.6)' }}
                        viewport={{ once: false, amount: 0.55 }}
                        className="absolute left-0 top-6 h-10 w-10 md:h-16 md:w-16 rounded-full border bg-[#050505] flex items-center justify-center group-hover:border-pink-500/60 transition-colors"
                      >
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-pink-500" />
                      </motion.div>
                      <motion.div
                        initial={{ backgroundColor: 'rgba(255,255,255,0.035)', borderColor: 'rgba(255,255,255,0.1)' }}
                        whileInView={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.2)' }}
                        viewport={{ once: false, amount: 0.55 }}
                        className="relative overflow-hidden rounded-2xl md:rounded-3xl border p-5 md:p-7 hover:bg-white/[0.06] hover:border-white/20 transition-colors"
                      >
                        <motion.div
                          className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-pink-500/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: false, amount: 0.55 }}
                        />
                        <div className="relative flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-3 mb-4">
                              <span className="text-[10px] font-black uppercase tracking-[0.28em] text-pink-500">{item.type}</span>
                            </div>
                            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                              {item.title}
                            </h3>
                            <p className="mt-3 text-gray-400 text-base md:text-lg leading-relaxed">
                              {item.detail}
                            </p>
                          </div>
                          <div className="shrink-0 text-right">
                            <span className="block text-4xl md:text-6xl font-black tracking-tighter text-white/10 group-hover:text-pink-500/25 transition-colors">
                              {item.year}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.article>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      {/* CONNECT SECTION */}
      <section id="connect" className="relative min-h-[90vh] bg-[#030303] pt-28 md:pt-36 pb-20 overflow-hidden z-10">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-55"><div className="absolute left-[-14%] top-16 h-[390px] w-[390px] rounded-full border border-pink-500/14" /><div className="absolute left-[-6%] top-36 h-[250px] w-[250px] rounded-full border border-white/10" /></div>
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-6">
          <div className="mb-8 md:mb-12">
            <SectionTitle title="Choose Your Next Move" subtitle="Contact" reserveTwoLines />
            <p className="-mt-4 md:-mt-12 max-w-xl text-gray-300 text-base md:text-xl leading-relaxed">
              Hãy đặt lịch hẹn, tôi sẽ liên hệ bạn sớm nhất có thể!
            </p>
          </div>

          <div className="grid gap-4 md:gap-6 max-w-5xl mx-auto">
            <div className="grid gap-3">
              {CONTACT_ROUTES.map((route, index) => {
                const Icon = route.Icon;
                const isActive = route.id === activeContactRouteId;
                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => handleContactRouteChange(route.id)}
                    className={`group w-full text-left border transition-all duration-300 px-5 md:px-6 py-5 md:py-6 rounded-lg ${
                      isActive
                        ? 'bg-white text-black border-white'
                        : 'bg-white/[0.035] border-white/10 text-white hover:bg-white/[0.08] hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <span className={`font-mono text-xs ${isActive ? 'text-pink-600' : 'text-gray-500'}`}>0{index + 1}</span>
                        <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-pink-600' : 'text-pink-500'}`} />
                        <span className="text-xl md:text-2xl font-black uppercase tracking-tight truncate">{route.label}</span>
                      </div>
                      <ArrowDownRight className={`w-5 h-5 shrink-0 transition-transform ${isActive ? 'rotate-45' : 'group-hover:rotate-45'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="relative border border-white/10 bg-white/[0.04] rounded-lg overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
              <div className="grid">
                <div className="p-6 md:p-8 flex flex-col justify-between border-b border-white/10">
                  <div>
                    <div className="inline-flex items-center gap-2 text-pink-500 font-mono text-xs uppercase tracking-[0.25em]">
                      <Sparkles className="w-4 h-4" />
                      {activeContactRoute.eyebrow}
                    </div>
                    <h3 className="mt-5 text-4xl md:text-6xl font-black uppercase leading-[0.92] tracking-tighter">
                      {activeContactRoute.title}
                    </h3>
                    <p className="mt-6 text-gray-300 text-base md:text-lg leading-relaxed">
                      {activeContactRoute.intent}
                    </p>
                  </div>

                  <div className="mt-10 space-y-3">
                    {activeContactRoute.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-center gap-3 text-sm md:text-base text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleAppointmentSubmit} className="p-4 md:p-6 space-y-3">
                  <div className="mb-1 flex items-start gap-2 border-b border-white/10 pb-3">
                    <CalendarCheck className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white">Đặt lịch hẹn</p>
                    </div>
                  </div>
                  <div className="grid min-w-0 grid-cols-3 gap-1" style={{ gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.7875fr) minmax(0, 0.7875fr)' }}>
                    <label className="grid min-w-0 gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Ngày
                      <span className="block h-12 w-full min-w-0 overflow-hidden rounded-md">
                        <input
                          type="date"
                          name="date"
                          required
                          min={getHoChiMinhDateTime().date}
                          value={appointmentDate}
                          onChange={(event) => {
                            const date = event.target.value;
                            setAppointmentDate(date);
                            setAppointmentTime(getFutureAppointmentSlots(date)[0] || '');
                          }}
                          className="appointment-date-input flex h-12 w-full min-w-0 max-w-full box-border items-center cursor-pointer overflow-hidden rounded-md border border-white/20 bg-white/[0.055] px-1 text-sm font-normal leading-[3rem] text-left normal-case tracking-normal text-white outline-none transition-colors hover:border-white/35 hover:bg-white/[0.08] focus:border-pink-400 focus:bg-white/[0.08] focus:ring-2 focus:ring-pink-500/25 sm:px-2"
                        />
                      </span>
                    </label>
                    <label className="grid min-w-0 gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Giờ
                      <select
                        id="appointment-hour"
                        aria-label="Giờ hẹn"
                        value={appointmentTime.slice(0, 2)}
                        disabled={!appointmentHours.length}
                        onChange={(event) => {
                          const firstSlot = appointmentSlots.find((slot) => slot.startsWith(`${event.target.value}:`));
                          if (firstSlot) setAppointmentTime(firstSlot);
                        }}
                        className="h-12 w-full min-w-0 cursor-pointer rounded-md border border-white/20 bg-white/[0.055] px-1 text-xs font-normal text-white outline-none transition-colors hover:border-white/35 focus:border-pink-400 focus:ring-2 focus:ring-pink-500/25 disabled:cursor-not-allowed disabled:opacity-50 sm:px-2 sm:text-sm"
                      >
                        {appointmentHours.length
                          ? appointmentHours.map((hour) => <option key={hour} value={hour}>{hour}</option>)
                          : <option value="">--</option>}
                      </select>
                    </label>
                    <label className="grid min-w-0 gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Phút
                      <select
                        id="appointment-minute"
                        aria-label="Phút hẹn"
                        value={appointmentTime.slice(3)}
                        disabled={!appointmentMinutes.length}
                        onChange={(event) => setAppointmentTime(`${appointmentTime.slice(0, 2)}:${event.target.value}`)}
                        className="h-12 w-full min-w-0 cursor-pointer rounded-md border border-white/20 bg-white/[0.055] px-1 text-xs font-normal text-white outline-none transition-colors hover:border-white/35 focus:border-pink-400 focus:ring-2 focus:ring-pink-500/25 disabled:cursor-not-allowed disabled:opacity-50 sm:px-2 sm:text-sm"
                      >
                        {appointmentMinutes.length
                          ? appointmentMinutes.map((minute) => <option key={minute} value={minute}>{minute}</option>)
                          : <option value="">--</option>}
                      </select>
                    </label>
                  </div>

                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    <label className="grid min-w-0 gap-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-normal text-gray-400">
                      Công ty
                      <input
                        type="text"
                        name="company"
                        autoComplete="organization"
                        placeholder="Tên công ty"
                        required
                        className="h-10 min-w-0 rounded-md border border-white/20 bg-white/[0.055] px-3 text-sm font-normal normal-case tracking-normal text-white placeholder:text-gray-500 outline-none transition-colors hover:border-white/35 hover:bg-white/[0.08] focus:border-pink-400 focus:bg-white/[0.08] focus:ring-2 focus:ring-pink-500/25"
                      />
                    </label>
                    <label className="grid min-w-0 gap-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-normal text-gray-400">
                      Người liên hệ
                      <input
                        type="text"
                        name="contactName"
                        autoComplete="name"
                        placeholder="Họ và tên"
                        required
                        className="h-10 min-w-0 rounded-md border border-white/20 bg-white/[0.055] px-3 text-sm font-normal normal-case tracking-normal text-white placeholder:text-gray-500 outline-none transition-colors hover:border-white/35 hover:bg-white/[0.08] focus:border-pink-400 focus:bg-white/[0.08] focus:ring-2 focus:ring-pink-500/25"
                      />
                    </label>
                    <label className="grid min-w-0 gap-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-normal text-gray-400">
                      Số điện thoại
                      <span className="flex h-10 min-w-0 items-center overflow-hidden rounded-md border border-white/20 bg-white/[0.055] transition-colors hover:border-white/35 hover:bg-white/[0.08] focus-within:border-pink-400 focus-within:bg-white/[0.08] focus-within:ring-2 focus-within:ring-pink-500/25">
                        <input
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          inputMode="numeric"
                          pattern="[0-9]{10}"
                          maxLength={10}
                          onChange={(event) => {
                            event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '').slice(0, 10);
                          }}
                          placeholder="(000) 000-0000"
                          required
                          title="Nhập đúng 10 chữ số"
                          className="h-full w-full min-w-0 bg-transparent px-3 text-sm font-normal normal-case tracking-normal text-white placeholder:text-gray-500 outline-none"
                        />
                      </span>
                    </label>
                  </div>

                  <label className="grid gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Nội dung
                    <textarea
                      name="message"
                      rows={3}
                      wrap="soft"
                      maxLength={4000}
                      placeholder="Nội dung cần trao đổi"
                      required
                      className="h-24 min-w-0 resize-none overflow-y-auto break-words rounded-md border border-white/20 bg-white/[0.055] px-3 py-2 text-sm font-normal normal-case tracking-normal text-white placeholder:text-gray-500 outline-none transition-colors hover:border-white/35 hover:bg-white/[0.08] focus:border-pink-400 focus:bg-white/[0.08] focus:ring-2 focus:ring-pink-500/25"
                      style={{ resize: 'none', width: '100%', maxWidth: '100%', overflowWrap: 'anywhere' }}
                    />
                  </label>

                  <div className="flex flex-row items-end gap-2 sm:gap-3">
                    <label className="grid min-w-0 flex-1 gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      JD (không bắt buộc, tối đa 3 MB)
                      <input
                        type="file"
                        name="jd"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="h-10 min-w-0 cursor-pointer rounded-md border border-white/20 bg-white/[0.055] px-2 py-1.5 text-[10px] font-normal normal-case tracking-normal text-gray-300 outline-none transition-colors hover:border-white/35 hover:bg-white/[0.08] focus:border-pink-400 focus:ring-2 focus:ring-pink-500/25 file:mr-1 file:max-w-[65%] file:truncate file:rounded file:border-0 file:bg-white/10 file:px-1.5 file:py-1 file:text-[10px] file:font-medium file:text-white sm:text-xs sm:file:mr-2 sm:file:px-2 sm:file:text-xs"
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={isAppointmentSubmitting || !appointmentTime}
                      aria-label="Gửi yêu cầu đặt lịch"
                      title="Gửi yêu cầu đặt lịch"
                      className="flex h-10 w-12 shrink-0 items-center justify-center rounded-full border border-pink-500 bg-transparent text-pink-500 transition-all hover:text-black active:scale-95 disabled:cursor-wait disabled:opacity-50"
                    >
                      {isAppointmentSubmitting
                        ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                        : <CalendarCheck className="h-5 w-5" aria-hidden="true" />}
                    </button>
                  </div>
                  {appointmentStatus.message && (
                    <p role={appointmentStatus.type === 'error' ? 'alert' : 'status'} className={`text-xs ${appointmentStatus.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                      {appointmentStatus.message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="pt-16 pb-10 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-12">
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 opacity-50">
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
