import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  ExternalLink,
  ArrowDownRight,
  Sparkles,
  ShoppingBag,
  Globe2,
  Send,
  X,
  Mail,
  Phone,
  Facebook,
  MessageCircle,
  ArrowUp,
  CheckCircle2
} from 'lucide-react';

// --- Components ---

const MagneticElement = ({ children, distance = 0.35 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * distance, y: y * distance });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
};

const MagneticButton = ({ children, className = "", onClick }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
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

  const scramble = () => {
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
  };

  useEffect(() => {
    if (trigger) scramble();
  }, [trigger, text]);

  return (
    <span onMouseEnter={scramble} className="cursor-default">
      {displayText}
    </span>
  );
};

const SectionTitle = ({ title, subtitle, dark = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });

  return (
    <div ref={ref} className="mb-10 md:mb-20">
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        className={`${dark ? 'text-pink-600' : 'text-purple-500'} font-mono text-sm tracking-tighter uppercase mb-2 block`}
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

const ExperienceRow = ({ exp, index, isActive, onOpenDetail }) => {
  return (
    <div className={`border-b border-white/10 transition-colors duration-500 ${isActive ? 'bg-white/[0.02]' : ''}`}>
      <div className="py-12 md:py-16 transition-all duration-500 px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
               <span className={`font-mono text-sm transition-colors duration-500 ${isActive ? 'text-pink-500' : 'text-gray-600'}`}>0{index + 1}</span>
               <span className="text-gray-500 font-mono text-sm tracking-widest">{exp.period}</span>
            </div>
            <h3 className={`text-3xl md:text-6xl font-black uppercase tracking-tighter transition-all duration-500 ${isActive ? 'text-white' : 'text-white/30'}`}>
              {exp.role}
            </h3>
          </div>

          <div className="flex items-center gap-10">
            <span className={`text-xl md:text-2xl font-bold uppercase transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-20'}`}>
              {exp.company}
            </span>
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
};

const MinimalHeroBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
      <div 
        className="absolute inset-0 opacity-[0.05]" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/20 to-[#050505]" />
    </div>
  );
};

const CreditLoader = ({ onComplete }) => {
  const keywords = ["Growth", "Strategy", "Creative", "Data"];
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2800; 
    const interval = 20;
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-between py-24 md:py-32 overflow-hidden"
    >
      <div className="relative flex-1 w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="relative h-[200px] md:h-[300px] flex flex-col items-center">
          {keywords.map((word, i) => (
            <motion.div
              key={word}
              initial={{ y: 350, opacity: 0 }}
              animate={{ y: -350, opacity: [0, 1, 1, 0] }}
              transition={{ 
                duration: 2.8, 
                delay: i * 0.5, 
                ease: "easeInOut",
                times: [0, 0.25, 0.75, 1]
              }}
              onAnimationComplete={() => {
                if (i === keywords.length - 1) {
                  setTimeout(onComplete, 400);
                }
              }}
              className="absolute text-5xl md:text-9xl font-black uppercase tracking-tighter text-white"
            >
              {word}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-sm md:max-w-xl px-10 flex flex-col items-center gap-6 mt-12 relative">
        <div className="flex justify-between w-full items-end gap-4">
            <div className="flex items-center gap-3">
                <motion.img 
                  src="https://i.ibb.co/qYVpRnX8/Logo-A.png" 
                  alt="Logo" 
                  className="w-10 h-10 md:w-14 md:h-14 object-contain filter brightness-100"
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

  // Gallery Stack State
  const [currentProjectIdx, setCurrentProjectIdx] = useState(0);

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const expRefs = useRef([]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isUnlocked]);

  const handleFormSubmit = async () => {
    if (isSent || isSubmitting) return;

    if (formRef.current && !formRef.current.checkValidity()) {
        formRef.current.reportValidity();
        return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSent(true);
    
    const realSubmit = document.getElementById("real-submit");
    if (realSubmit) realSubmit.click();
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
    linkFavicon.href = "https://i.ibb.co/qYVpRnX8/Logo-A.png";
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isUnlocked) return;
      const vh = window.innerHeight;
      const center = vh / 2;
      expRefs.current.forEach((ref, idx) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        if (rect.top < center && rect.bottom > center) {
          setActiveIdx(idx);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isUnlocked]);

  const scrollToSection = (id) => {
    setIsUnlocked(true);
    const element = document.getElementById(id);
    if (element) {
      setIsMenuOpen(false);
      setTimeout(() => {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }, 50);
    }
  };

  const startJourney = () => {
    setIsLoading(true);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setIsUnlocked(true); 
    setTimeout(() => {
      scrollToSection('services');
    }, 100);
  };

  const services = [
    { title: "Brand Strategy", icon: <Target className="w-6 h-6 md:w-8 md:h-8" />, desc: "Xây dựng và định vị ADN thương hiệu độc bản, R&D sản phẩm giúp SME nổi bật giữa số đông." },
    { title: "Performance", icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />, desc: "Thiết kế và tối ưu phễu chuyển đổi, quy trình từ Sales-MKT-ADM, tăng trưởng doanh thu dài hạn." },
    { title: "Martech", icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />, desc: "Triển khai CRM, Automation và AI nâng cao hiệu suất đội ngũ và tối ưu năng suất marketing." },
    { title: "Omni channel", icon: <ShoppingBag className="w-6 h-6 md:w-8 md:h-8" />, desc: "Xây dựng chiến lược nội dung và triển khai đa kênh bán hàng gia tăng nhận diện và chuyển đổi." }
  ];

  const experiences = [
    {
      period: "2021 - 2025",
      role: "CEO",
      company: "Dự Án Việt Nam",
      image: "https://i.ibb.co/4wHf7MLn/IMG-7762.jpg",
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
      image: "https://i.ibb.co/GhVKk41/c7f1becf306e6185a0a7324b11a94545.jpg",
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
      image: "https://i.ibb.co/HThDHMF8/IMG-8232.jpg",
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
      image: "https://i.ibb.co/RkBGSNz7/IMG-8231.jpg",
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
      image: "https://i.ibb.co/HThDHMF8/IMG-8232.jpg",
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

const projects = [
    {
      title: "Đại diện thương hiệu",
      category: "Branding",
      image: "https://i.ibb.co/V07s3kjs/HUY07053.jpg?auto=format&fit=crop&q=80&w=1200",
      description: "Dự Án Việt Nam nhận giải thưởng Top 10 Asia Top Brand Award 2024.",
      link: "https://www.facebook.com/reel/987442559539122"
    },
    {
      title: "Tư vấn chiến lược thương hiệu",
      category: "Marketing Strategy",
      image: "https://i.ibb.co/SDMtCpzY/IMG-6606.jpg?auto=format&fit=crop&q=80&w=1200",
      description: "Định vị thương hiệu, xây dựng lộ trình phát triển nhân sự và chiến lược marketing dài hạn cho hệ thống Onsen Nhật.",
      link: "https://drive.google.com/drive/folders/18EePklHJB1nS5eMQ5oittod5AsQw58Cl?usp=sharing"
    },
    {
      title: "Đào tạo nhân sự",
      category: "Training",
      image: "https://i.ibb.co/DDBmTJ6T/IMG-5500.avif?auto=format&fit=crop&q=80&w=1200",
      description: "Thiết kế bài giảng và tổ chức đào tạo cho sản phẩm chiến lược mới cho chuỗi Trung tâm Tiếng Anh khu vực miền Nam.",
      link: "https://docs.google.com/presentation/d/1jNi_LlrgeViBc2TIu6oEIoAqJzI2XyUd/edit?usp=sharing&ouid=116372570508469460772&rtpof=true&sd=true"
    },
   {
      title: "Tổ chức sự kiện",
      category: "Workshop",
      image: "https://i.ibb.co/YF0gSDgp/IMG-2561.jpg?auto=format&fit=crop&q=80&w=1200",
      description: "Tổ chức workshop 'Marketing gắn liền với quản trị SME' khai thác nhóm khách hàng mục tiêu.",
      link: "https://www.facebook.com/share/v/1QjRa3wwj1"
    },
    {
      title: "Tư vấn chiến lược thương hiệu",
      category: "Marketing Strategy",
      image: "https://i.ibb.co/DfjXRKqH/463606762-1116268483834789-7250201260302132560-n.jpg?auto=format&fit=crop&q=80&w=1200",
      description: "Tư vấn tái định vị thương hiệu, xây dựng chiến lược marketing và kế hoạch ra mắt các dòng sản phẩm mới, đồng thời phát triển thương hiệu cá nhân bà Huynh.",
      link: "https://drive.google.com/file/d/1sAqQLPlSmI2lQS23BAo8UpKlZ1-SZZdE/view?usp=sharing"
    },
    {
      title: "Chuyển đổi số Xây dựng",
      category: "Event",
      image: "https://i.ibb.co/Y4K5m10M/picture1-17405408.webp?auto=format&fit=crop&q=80&w=1200",
      description: "Giới thiệu gói giải pháp 'Ứng dụng nền tảng TMĐT vào ngành xây dựng' tại sự kiện.",
      link: "https://baoxaydung.vn/du-an-viet-nam-lan-song-moi-thuong-mai-dien-tu-nganh-xay-dung-1926868376281.htm"
    },
    {
      title: "Chuyển đổi số Nhà sách",
      category: "Transformation",
      image: "https://i.ibb.co/B2nMgjhG/nh-m-n-h-nh-2026-02-14-l-c-20-49-31.png?auto=format&fit=crop&q=80&w=1200",
      description: "Xây dựng hệ thống TMĐT đa kênh, logistics, quản lý kho bằng phần mềm, hợp tác các nhãn hàng, NXB mới, triển khai social media cho hệ thống.",
      link: "https://nhasachnguyenvancu.vn/"
    },
    {
      title: "Chuyển đổi số Giáo dục",
      category: "Transformation",
      image: "https://i.ibb.co/0yLfzqfg/2020-03-13-001.jpg?auto=format&fit=crop&q=80&w=1200",
      description: "Sản xuất và phát hành series 'HỌC LÀM NHÀ PHÁT MINH CÔNG NGHỆ VỚI LEGO SPIKE PRIME'.",
      link: "https://www.youtube.com/playlist?list=PLoVM1h2NMGedtN4dGV13m0WFEulBF3JKB"
    },
    {
      title: "Xây dựng và vận hành hệ thống bán lẻ",
      category: "Ecommerce",
      image: "https://i.ibb.co/K8x5Jyj/326804800-841212936980388-1635642820059160142-n.png?auto=format&fit=crop&q=80&w=1200",
      description: "Xây dựng hệ thống TMĐT đa kênh, bộ nhận diện thương hiệu, website và đội ngũ marketing mới cho doanh nghiệp.",
      link: "https://www.facebook.com/congtyquatangata"
    },
    {
      title: "Setup nhà hàng",
      category: "F&B",
      image: "https://i.ibb.co/VcgWk92K/2018-09-12-003.jpg?auto=format&fit=crop&q=80&w=1200",
      description: "Triển khai xây dựng ý tưởng nhà hàng ăn vặt đầu tiên tại Vũng Tàu.",
      link: "https://www.tripadvisor.com.vn/Restaurant_Review-g303946-d14948011-Reviews-Camellia_Coffee_Restaurant-Vung_Tau_Ba_Ria_Vung_Tau_Province.html"
    },    
    {
      title: "Khách mời Podcast",
      category: "Podcast",
      image: "https://i.ibb.co/9HdPTVNT/Xem-nh-g-n-y.png?auto=format&fit=crop&q=80&w=1200",
      description: "Chia sẻ câu chuyện khởi nghiệp Dự Án Việt Nam, personal branding",
      link: "https://drive.google.com/file/d/1ly37dJYfFfn50gHxCLItw37oWYm5Sssc/view?usp=sharing"
    },
    {
      title: "Tài trợ sự kiện",
      category: "Event",
      image: "https://i.ibb.co/xbQBm3j/H-nh-nh-1.jpg?auto=format&fit=crop&q=80&w=1200",
      description: "Tổ chức gian hàng tại 'Vietbuild 2024', giới thiệu giải pháp & khai thác khách hàng tiềm năng.",
      link: "https://www.tiktok.com/@duanvietnam/video/7385468335833599239"
    },
    {
      title: "Tài trợ sự kiện",
      category: "Event",
      image: "https://i.ibb.co/6cfN3ZGd/IMG-1766.avif?auto=format&fit=crop&q=80&w=1200",
      description: "Tổ chức gian hàng tại 'Kết nối giao thương CLB doanh nhân trẻ TP HCM', giới thiệu giải pháp & khai thác khách hàng tiềm năng.",
      link: "https://www.facebook.com/share/v/14aGWYWH5LJ"
    },
    {
      title: "Tổ chức sự kiện",
      category: "Workshop",
      image: "https://i.ibb.co/hFMbfyHP/DSC05937.jpg?auto=format&fit=crop&q=80&w=1200",
      description: "Tổ chức workshop 'Xây dựng & quản trị doanh nghiệp theo khoa học phong thuỷ', go viral trên các kênh social.",
      link: "https://www.tiktok.com/@duanvietnam/video/7405381047292103956"
    },
    {
      title: "Tổ chức sự kiện",
      category: "Workshop",
      image: "https://i.ibb.co/WjZGrYG/NAK-6356.jpg?auto=format&fit=crop&q=80&w=1200",
      description: "Tổ chức sự kiện 'Tầm quan trọng của đấu thầu đối với sinh viên ngành xây dựng' tại HUTECH, branding & trust",
      link: "https://www.hutech.edu.vn/homepage/tin-tuc/hoat-dong-sinh-vien/14612371-sinh-vien-nganh-xay-dung-hutech-tim-hieu-co-hoi-nghe-nghiep-ve-dau-thau-qua-mang-cung-chuyen-gia"
    },
    {
      title: "Khách mời Podcast",
      category: "Podcast",
      image: "https://i.ibb.co/HDVH43Kn/H-nh-nh.jpg?auto=format&fit=crop&q=80&w=1200",
      description: "Tham gia 'Podcast Nhảy việc cuối năm hay chờ thưởng Tết', go viral nhờ chủ đề tranh cãi & đúng thời điểm",
      link: "https://www.youtube.com/watch?v=P0pekIKb1I0$0"
    },
    {
      title: "Tài trợ sự kiện",
      category: "Event",
      image: "https://i.ibb.co/SXcky3FK/IMG-8747.avif?auto=format&fit=crop&q=80&w=1200",
      description: "NTT Kim Cương - Giải Tenis Doanh nhân Lan Anh 2022, thu hút khách hàng tiềm năng tham gia giải",
      link: "https://www.facebook.com/share/p/17BhWsc9oJ/"
    },
    {
      title: "Tổ chức sự kiện",
      category: "Event",
      image: "https://i.ibb.co/TBbkf6B6/475875893-946567974248849-5401705813596239019-n.jpg?auto=format&fit=crop&q=80&w=1200",
      description: "Sự kiện trải nghiệm thu hút nhiều lượt quan tâm, go viral nhờ chủ đề được quan tâm và đánh giá cao.",
      link: "https://www.tiktok.com/@duanvietnam/video/7331738767734115586"
    },
    {
      title: "Dự án quà Tết 2024",
      category: "Branding",
      image: "https://i.ibb.co/DH1dXpMR/476118625-946048054300841-4916888734441721401-n.jpg?auto=format&fit=crop&q=80&w=1200",
      description: "Dự án quà tặng độc đáo đầy ý nghĩa từ đội ngũ Dự Án Việt Nam, khai thác nhóm khách hàng trung thành",
      link: "https://www.youtube.com/watch?v=gtelaltr2kg"
    },
    {
      title: "Sản xuất Campaign",
      category: "Campaign",
      image: "https://i.ibb.co/1G1Jbtk2/475295641-939901134915533-2582455679541459243-n.jpg?auto=format&fit=crop&q=80&w=1200",
      description: "Campaign tuyển dụng thu hút CTV xây dựng nhờ nội dung vui nhộn bắt trend, target nhóm người nội trợ",
      link: "https://www.facebook.com/reel/1173113730744110"
    },
    {
      title: "Sản xuất Podcast",
      category: "Podcast",
      image: "https://i.ibb.co/PGytWkpy/476025777-946034737635506-7400360316311342076-n.jpg?auto=format&fit=crop&q=80&w=1200",
      description: "Sản xuất 'Podcast Xây nhà cuối năm', go viral nhờ chủ đề tranh cãi & đúng thời điểm, đánh đúng đối tượng mục tiêu",
      link: "https://www.youtube.com/watch?v=XttzQ1aUcIo"
    },
    {
      title: "Sản xuất Media",
      category: "Branding",
      image: "https://i.ibb.co/qYZ9Svjq/476128433-946058190966494-8179110441562004188-n.jpg?auto=format&fit=crop&q=80&w=1200",
      description: "Xây dựng hình ảnh Dự Án Việt Nam thông qua những 'Video revew thành phẩm' chất lượng cao được đầu tư quay dựng bài bản, branding & trust",
      link: "https://www.youtube.com/watch?v=xvJmW73i9DE$0"
    }
  ];


  const stats = [
    { value: "5B+", label: "Total Budget" },
    { value: "50+", label: "Project Delivered" },
    { value: "100+", label: "Team Members" },
    { value: "03", label: "Digital Transform." }
  ];

  const globalStyles = `
    .text-outline-white { -webkit-text-stroke: 1px white; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    ::selection { background: white; color: black; }
  `;

  // Gallery Navigation
  const nextProject = () => setCurrentProjectIdx(prev => (prev + 1) % projects.length);
  const prevProject = () => setCurrentProjectIdx(prev => (prev - 1 + projects.length) % projects.length);

  return (
    <div ref={containerRef} className="bg-[#050505] text-white selection:bg-white selection:text-black overflow-x-hidden min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-white z-[100] origin-left" style={{ scaleX }} />

      <AnimatePresence>
        {isLoading && <CreditLoader onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <nav className="fixed w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
        <motion.div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => scrollToSection('home')}
        >
          <div className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden flex items-center justify-center">
            <img 
              src="https://i.ibb.co/qYVpRnX8/Logo-A.png" 
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
              {['Home', 'Services', 'Experience', 'Works', 'Connect'].map((name, i) => (
                <motion.a
                  key={name}
                  initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-5xl md:text-9xl font-black uppercase hover:italic transition-all cursor-pointer leading-none"
                  onClick={() => scrollToSection(name.toLowerCase())}
                >
                  {name}
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
            className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center p-4 md:p-10 overflow-y-auto"
            onClick={() => setSelectedExp(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="max-w-6xl w-full grid md:grid-cols-2 gap-8 md:gap-10 items-start bg-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/3] bg-white/5">
                <img src={selectedExp.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col h-full justify-between py-2 md:py-4 text-left">
                <div>
                  <span className="text-pink-500 font-mono text-[10px] md:text-sm uppercase tracking-widest mb-2 md:mb-4 block">{selectedExp.period}</span>
                  <h2 className="text-3xl md:text-7xl font-black uppercase mb-2 md:mb-4 leading-tight tracking-tighter">{selectedExp.role}</h2>
                  <p className="text-lg md:text-2xl font-bold text-gray-400 mb-6 md:mb-8">{selectedExp.company}</p>
                  <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                     <p className="text-gray-300 italic text-base md:text-lg">{selectedExp.desc}</p>
                     <div className="space-y-2 md:space-y-3">
                        {selectedExp.details.map((detail, idx) => (
                           <div key={idx} className="flex gap-3 text-[12px] md:text-sm text-gray-400 items-start">
                              <CheckCircle2 size={16} className="text-pink-500 shrink-0 mt-0.5" />
                              <span>{detail}</span>
                           </div>
                        ))}
                     </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 pt-6 md:pt-8 border-t border-white/10">
                   <div className="flex flex-wrap gap-2">
                      {selectedExp.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest border border-white/10 text-gray-500">{tag}</span>
                      ))}
                   </div>
                   <div className="flex gap-3 md:gap-4">
                     <button 
                        onClick={() => window.open(selectedExp.link, '_blank')} 
                        className="flex-1 md:flex-none flex items-center justify-center gap-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] bg-pink-500 text-black px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-white transition-all whitespace-nowrap"
                      >
                        Case Study <ArrowDownRight size={14} />
                      </button>
                      <button 
                        onClick={() => setSelectedExp(null)} 
                        className="flex-1 md:flex-none flex items-center justify-center gap-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] border border-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-white hover:text-black transition-all"
                      >
                        Close
                      </button>
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
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col h-full justify-center text-left">
                <span className="text-pink-500 font-mono text-[10px] md:text-sm uppercase tracking-widest mb-2 block">{selectedProject.category}</span>
                <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 leading-tight tracking-tighter">{selectedProject.title}</h2>
                <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed italic">"{selectedProject.description}"</p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => window.open(selectedProject.link, '_blank')} 
                    className="flex-1 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] bg-white text-black px-8 py-4 rounded-full hover:bg-pink-500 transition-all"
                  >
                    View <ExternalLink size={14} />
                  </button>
                  <button 
                    onClick={() => setSelectedProject(null)} 
                    className="w-14 h-14 flex items-center justify-center border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-all"
                  >
                    <X size={20} />
                  </button>
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
            <h1 className="text-[12vw] font-black leading-none uppercase mb-6 tracking-tighter">
              The <br />
              <span className="text-outline-white text-transparent">Creative</span><br />
              Growth
            </h1>
            <p className="text-lg md:text-2xl font-light max-w-2xl mx-auto text-gray-400 mb-20"> 
              Xây dựng và vận hành hệ thống Marketing chuyển hóa thương hiệu thành doanh thu.
            </p>
            <MagneticButton 
              className="px-12 py-5 bg-white text-black rounded-full hover:bg-pink-500 font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-4 mx-auto"
              onClick={startJourney}
            >
              Bắt đầu hành trình <ArrowDownRight className="w-6 h-6" />
            </MagneticButton>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }} 
          className="absolute bottom-10 right-10 md:right-16 text-xs font-bold uppercase tracking-[0.3em] opacity-50 z-20"
        >
          Use button to explore
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 md:py-40 px-6 max-w-7xl mx-auto relative z-10">
        <SectionTitle title="Expertise" subtitle="Services" />
        
        <div className="hidden md:grid grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-[3rem] overflow-hidden">
          {services.map((s, i) => (
            <motion.div 
              key={i} 
              whileHover={{ backgroundColor: "rgba(236, 72, 153, 0.05)" }}
              className="p-16 bg-[#030303] group transition-colors"
            >
              <div className="text-pink-500 mb-8 group-hover:scale-110 transition-transform origin-left">{s.icon}</div>
              <h3 className="text-3xl font-bold mb-6 uppercase tracking-tight">{s.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm max-w-xs">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden">
          <div className="flex overflow-x-auto snap-x-mandatory scrollbar-hide gap-4 pb-8 -mx-6 px-6">
            {services.map((s, i) => (
              <div 
                key={i} 
                className="shrink-0 w-[80vw] snap-center bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  <div className="text-pink-500 mb-6">{s.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight leading-tight">{s.title}</h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em] mt-4 text-center">Swipe to explore services</p>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-24 md:py-40 max-w-7xl mx-auto relative z-10 px-6">
        <SectionTitle title="Experience" subtitle="Journey" />
        <div className="flex flex-col">
          {experiences.map((exp, i) => (
            <div key={i} ref={el => expRefs.current[i] = el} className="scroll-mt-[30vh]">
              <ExperienceRow exp={exp} index={i} isActive={activeIdx === i} onOpenDetail={(item) => setSelectedExp(item)} />
            </div>
          ))}
        </div>
      </section>

      {/* WORKS SECTION - UPDATED STACKED CARDS */}
      <section id="works" className="py-24 md:py-40 bg-white text-black overflow-hidden relative z-10">
        <div className="px-6 mb-10 md:mb-20 max-w-7xl mx-auto">
          <SectionTitle title="The Works" subtitle="Gallery" dark={true} />
        </div>

        <div className="relative w-full h-[500px] md:h-[650px] flex items-center justify-center">
           <div className="relative w-full max-w-[90vw] md:max-w-4xl h-full flex items-center justify-center perspective-1000">
              <AnimatePresence initial={false}>
                {projects.map((p, i) => {
                  const offset = (i - currentProjectIdx + projects.length) % projects.length;
                  const isActive = offset === 0;
                  const isPrev = offset === projects.length - 1;
                  const isNext = offset === 1;

                  // Chỉ hiển thị 3 thẻ: chính giữa, trái, phải
                  if (offset > 1 && offset < projects.length - 1) return null;

                  let x = 0;
                  let scale = 1;
                  let zIndex = 10;
                  let opacity = 1;
                  let rotate = 0;

                  if (isNext) {
                    x = "40%";
                    scale = 0.85;
                    zIndex = 5;
                    opacity = 0.4;
                    rotate = 5;
                  } else if (isPrev) {
                    x = "-40%";
                    scale = 0.85;
                    zIndex = 5;
                    opacity = 0.4;
                    rotate = -5;
                  } else if (isActive) {
                    x = 0;
                    scale = 1;
                    zIndex = 20;
                    opacity = 1;
                    rotate = 0;
                  }

                  return (
                    <motion.div
                      key={p.title}
                      initial={false}
                      animate={{ 
                        x, 
                        scale, 
                        zIndex, 
                        opacity,
                        rotate,
                        filter: isActive ? "blur(0px)" : "blur(2px)"
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20 
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(e, info) => {
                        if (info.offset.x < -50) nextProject();
                        if (info.offset.x > 50) prevProject();
                      }}
                      className={`absolute w-[280px] md:w-[450px] aspect-[4/5] md:aspect-[3/4] cursor-grab active:cursor-grabbing`}
                      style={{ pointerEvents: isActive || isNext || isPrev ? 'auto' : 'none' }}
                      onClick={() => {
                        if (isNext) nextProject();
                        if (isPrev) prevProject();
                      }}
                    >
                      <div className={`relative w-full h-full p-1 transition-all duration-500 rounded-[2rem] md:rounded-[3rem] ${isActive ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-pink-500' : 'bg-transparent'}`}>
                        <div className={`w-full h-full overflow-hidden bg-gray-100 relative group ${isActive ? 'rounded-[1.8rem] md:rounded-[2.8rem]' : 'rounded-[2rem] md:rounded-[3rem]'}`}>
                          <img 
                            src={p.image} 
                            alt={p.title} 
                            className="w-full h-full object-cover select-none" 
                          />
                          
                          {/* Overlay cho thẻ Active */}
                          {isActive && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-8 text-center text-white"
                            >
                              <motion.span initial={{ y: 20 }} animate={{ y: 0 }} className="text-[10px] font-bold uppercase tracking-widest text-pink-400 mb-2">{p.category}</motion.span>
                              <motion.h3 initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.1 }} className="text-2xl md:text-3xl font-black uppercase mb-6 leading-tight">{p.title}</motion.h3>
                              <motion.button 
                                initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.2 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedProject(p);
                                }}
                                className="px-8 py-3 bg-pink-500 text-white rounded-full font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-white hover:text-black transition-all"
                              >
                                View Project <ArrowDownRight size={14} />
                              </motion.button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
           </div>
        </div>

        <div className="flex justify-center gap-4 mt-10 md:mt-16">
          <button onClick={prevProject} className="w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all">
            <ArrowDownRight className="rotate-135 w-5 h-5" />
          </button>
          <button onClick={nextProject} className="w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all">
            <ArrowDownRight className="-rotate-45 w-5 h-5" />
          </button>
        </div>
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.4em] mt-8 text-gray-400">Swipe or use buttons to navigate</p>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 md:py-40 px-6 bg-[#050505] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionTitle title="Impact" subtitle="Data" />
              <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-10">
                Xây dựng hệ thống Marketing bài bản, tối ưu vận hành và tăng trưởng lợi nhuận bền vững.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {stats.map((s, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="p-6 md:p-10 border border-white/10 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors"
                >
                  <span className="text-4xl md:text-7xl font-black mb-1 md:mb-2">{s.value}</span>
                  <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-purple-500">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONNECT SECTION */}
      <section id="connect" className="relative min-h-[80vh] bg-[#030303] pt-32 md:pt-40 pb-20 px-6 md:px-8 overflow-hidden z-10">
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <SectionTitle title="Connect" subtitle="Contact" />
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end">
            <div>
              <motion.h3 className="text-6xl md:text-[12rem] font-black uppercase leading-[0.8] mb-12 tracking-tighter" whileHover={{ skewX: -5 }}>
                Let's <br /> Talk <span className="text-pink-500">.</span>
              </motion.h3>
              <form ref={formRef} action="https://formsubmit.co/4nhtran@gmail.com" method="POST" className="space-y-6 w-full max-w-xl">
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="Name" placeholder="Người liên hệ" required className="w-full bg-transparent border-b border-gray-600 focus:border-pink-500 outline-none py-3 text-white transition" />
                <input type="text" name="Brand" placeholder="Tên thương hiệu" required className="w-full bg-transparent border-b border-gray-600 focus:border-pink-500 outline-none py-3 text-white transition" />
                <input type="email" name="Email" placeholder="Email" required className="w-full bg-transparent border-b border-gray-600 focus:border-pink-500 outline-none py-3 text-white transition" />
                <textarea name="Message" placeholder="Nội dung trao đổi" rows="4" required className="w-full bg-transparent border-b border-gray-600 focus:border-pink-500 outline-none py-3 text-white transition resize-none" />
                <button type="submit" className="hidden" id="real-submit" />
              </form>
            </div>
            <div className="flex flex-col gap-12 items-start lg:items-end w-full">
              <div className="relative">
                <AnimatePresence>
                  {isSent && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center gap-2 whitespace-nowrap z-20 shadow-lg"
                    >
                      <CheckCircle2 size={14} className="text-green-500" /> Message Sent
                    </motion.div>
                  )}
                </AnimatePresence>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="pt-20 pb-10 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
            {[
              { label: 'Email', val: 'anh@anhtranviet.com', icon: <Mail size={18} />, url: 'mailto:anh@anhtranviet.com' },
              { label: 'Hotline', val: '091.9999.781', icon: <Phone size={18} />, url: 'tel:+84919999781' },
              { label: 'Zalo', val: 'Chat now', icon: <MessageCircle size={18} />, url: 'https://zalo.me/84919999781' },
              { label: 'Fanpage', val: 'Follow me', icon: <Facebook size={18} />, url: 'https://www.facebook.com/4nhtran/' }
            ].map((item, idx) => (
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
            <button 
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] hover:text-pink-500 transition-colors group"
            >
              Back to top <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}