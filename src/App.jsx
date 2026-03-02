import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  PieChart, 
  Zap, 
  ChevronRight, 
  ExternalLink,
  Menu,
  X,
  Linkedin,
  Mail,
  CheckCircle2,
  ArrowDownRight,
  Sparkles,
  ShoppingBag,
  Cpu,
  BarChart3,
  Globe2,
  Send,
  Briefcase 
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

const MagneticButton = ({ children, className = "" }) => {
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
    >
      {children}
    </motion.button>
  );
};

const SectionTitle = ({ title, subtitle }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <div ref={ref} className="mb-10 md:mb-20">
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        className="text-purple-500 font-mono text-sm tracking-tighter uppercase mb-2 block"
      >
        / {subtitle}
      </motion.span>
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "100%" }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="text-5xl md:text-8xl font-black uppercase leading-none"
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
};

const ExperienceRow = ({ exp, index, isActive }) => {
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
            <a 
              href={exp.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all duration-500 ${isActive ? 'border-pink-500 text-pink-500 opacity-100' : 'border-white/10 text-white/10 opacity-0'}`}
            >
              <ExternalLink className="w-5 h-5 md:w-6 md:h-6" />
            </a>
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
              <div className="flex flex-wrap gap-2">
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

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);
  const expRefs = useRef([]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    
    const handleScroll = () => {
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
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const services = [
    { title: "Brand Strategy", icon: <Target className="w-6 h-6 md:w-8 md:h-8" />, desc: "Xây dựng và định vị ADN thương hiệu độc bản giúp SME nổi bật giữa số đông." },
    { title: "Performance", icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />, desc: "Thiết kế và tối ưu phễu chuyển đổi đa kênh, tối ưu ngân sách, tăng trưởng mục tiêu doanh thu dài hạn." },
    { title: "Martech", icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />, desc: "Triển khai hệ thống CRM, Automation và AI nhằm nâng cao hiệu suất đội ngũ và tối ưu chi phí marketing." },
    { title: "Omni channel", icon: <ShoppingBag className="w-6 h-6 md:w-8 md:h-8" />, desc: "Xây dựng chiến lược nội dung và triển khai đa kênh nhằm gia tăng nhận diện và chuyển đổi." }
  ];

  const experiences = [
    {
      period: "2021 - 2025",
      role: "CEO",
      company: "Dự Án Việt Nam",
      desc: "Kiến trúc sư trưởng cho hệ thống TMĐT xây dựng tiên phong duanvietnam.vn. Chịu trách nhiệm toàn diện từ chiến lược sản phẩm, vận hành đến tăng trưởng.",
      tags: ["Strategy", "Leadership", "Start-up", "P&L Management"],
      link: "https://www.nguoiduatin.vn/doanh-nhan-tre-tran-viet-anh-thuong-mai-dien-tu-lan-song-moi-cho-nganh-xay-dung-204665722.htm"
    },
    {
      period: "2020",
      role: "Phó BP.Online",
      company: "Hệ thống Nguyễn Văn Cừ",
      desc: "Dẫn dắt công cuộc Chuyển đổi số toàn diện, đưa thương hiệu truyền thống lâu đời thâm nhập thị trường TMĐT.",
      tags: ["Conversion", "Branding", "Data", "CRM"],
      link: "https://www.behance.net/gallery/106953807/NguyenVanCu-Bookstores"
    },
    {
      period: "2019",
      role: "Project Marketing",
      company: "LEGO Education",
      desc: "Triển khai mở rộng chuỗi hoạt động 'Educate Market', định hình tư duy phụ huynh về phương pháp giáo dục STEAM.",
      tags: ["Branding", "Creative", "Scaling", "Execution"],
      link: "https://www.behance.net/gallery/106955351/LEGO-Education"
    },
    {
      period: "2019",
      role: "Marketing Manager",
      company: "FitForce Fitness",
      desc: "Kiến tạo trải nghiệm khách hàng và tối ưu hóa doanh thu dịch vụ cao cấp thông qua chiến lược KOLs và Event.",
      tags: ["Social Media", "Branding", "Event", "Influencer"],
      link: "https://www.behance.net/gallery/106954181/FitForce-Fitness-Yoga"
    },
    {
      period: "2018",
      role: "Sales & Marketing",
      company: "Ambassador Hotel",
      desc: "Đặt nền móng thương hiệu cho chi nhánh mới tại TP.Vũng Tàu, khai thác thị trường khu vực trung tâm thành phố.",
      tags: ["Social Media", "Branding", "Revenue", "Execution"],
      link: "https://www.behance.net/gallery/106960225/Ambassador-Hotel-Group"
    }
  ];

  const projects = [
    {
      title: "THE ART OF GROWTH",
      category: "Digital Strategy",
      image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1200",
      description: "Tái định nghĩa trải nghiệm người dùng cho hệ sinh thái F&B lớn nhất khu vực."
    },
    {
      title: "NEO-MARKETING 2025",
      category: "Automation AI",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
      description: "Hệ thống vận hành marketing tự động dựa trên dữ liệu thời gian thực."
    },
    {
      title: "CULTURAL IMPACT",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=1200",
      description: "Chiến dịch truyền cảm hứng cho thế hệ SME mới tại Việt Nam."
    }
  ];

  const stats = [
    { label: 'Total Budget', value: '5B+' },
    { label: 'Project', value: '50+' },
    { label: 'Leading', value: '100+' },
    { label: 'Digital Transform.', value: '3' },
  ];

  const globalStyles = `
    .text-outline-white { -webkit-text-stroke: 1px white; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    ::selection { background: white; color: black; }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .animate-marquee { display: flex; animation: marquee 30s linear infinite; }
    .text-stroke { -webkit-text-stroke: 1px rgba(255,255,255,0.2); color: transparent; }
    .snap-x-mandatory { scroll-snap-type: x mandatory; }
    .snap-center { scroll-snap-align: center; }
  `;

  return (
    <div ref={containerRef} className="bg-[#050505] text-white selection:bg-white selection:text-black overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      
      {/* Custom Cursor Follower */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
      />

      {/* Hero Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-white z-[100] origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
        <motion.div className="text-xl font-black tracking-tighter uppercase">ANH.TRANVIET</motion.div>
        <button onClick={() => setIsMenuOpen(true)} className="flex items-center gap-2 group">
          <span className="text-sm font-bold uppercase tracking-widest group-hover:pr-2 transition-all">Menu</span>
          <div className="w-8 h-[2px] bg-white" />
        </button>
      </nav>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-white text-black p-10 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <span className="font-mono text-sm uppercase">Navigation</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-4xl font-light">×</button>
            </div>
            <div className="flex flex-col gap-4">
              {['Home', 'Experience', 'Works', 'Connect'].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-6xl md:text-9xl font-black uppercase hover:italic transition-all cursor-pointer leading-none"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="flex justify-between border-t border-black/10 pt-10 font-bold uppercase text-xs">
              <span>Hanoi, Vietnam</span>
              <div className="flex gap-10">
                <a href="#">Instagram</a>
                <a href="#">LinkedIn</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center px-6 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30 grayscale contrast-125" />
        </motion.div>

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h1 className="text-[12vw] font-black leading-none uppercase mb-6 tracking-tighter">
              The <br />
              <span className="text-outline-white text-transparent">Creative</span><br />
              Growth
            </h1>
            <p className="text-lg md:text-2xl font-light max-w-2xl mx-auto text-gray-400 mb-12">
              Xây dựng và vận hành hệ thống Marketing chuyển hóa thương hiệu thành doanh thu.
            </p>
            <MagneticButton className="px-12 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-4 mx-auto">
              Bắt đầu hành trình <ArrowDownRight className="w-6 h-6" />
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-[0.3em] opacity-50"
        >
          Scroll to explore
        </motion.div>
      </section>

      {/* Marquee Section */}
      <div className="py-10 border-y border-white/5 bg-white/2 backdrop-blur-sm overflow-hidden whitespace-nowrap relative z-10">
        <div className="animate-marquee">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex gap-20 items-center px-10 shrink-0">
              <span className="text-5xl md:text-8xl font-black uppercase flex items-center gap-6">
                GROWTH <Sparkles className="w-10 h-10 text-pink-500" />
              </span>
              <span className="text-5xl md:text-8xl font-black uppercase text-outline-white text-transparent">STRATEGY</span>
              <span className="text-5xl md:text-8xl font-black uppercase flex items-center gap-6">
                CREATIVE <Globe2 className="w-10 h-10 text-indigo-500" />
              </span>
              <span className="text-5xl md:text-8xl font-black uppercase text-outline-white text-transparent">DATA</span>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES SECTION */}
      <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto relative z-10">
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
      <section className="py-24 md:py-40 max-w-7xl mx-auto relative z-10 px-6">
        <SectionTitle title="Experience" subtitle="Journey" />
        <div className="flex flex-col">
          {experiences.map((exp, i) => (
            <div 
              key={i}
              ref={el => expRefs.current[i] = el}
              className="scroll-mt-[30vh]"
            >
              <ExperienceRow 
                exp={exp} 
                index={i} 
                isActive={activeIdx === i} 
              />
            </div>
          ))}
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-24 md:py-40 bg-white text-black overflow-hidden relative z-10">
        <div className="px-6 mb-10 md:mb-20">
          <SectionTitle title="The Works" subtitle="Gallery" />
        </div>

        <div className="flex overflow-x-auto gap-6 md:gap-10 px-6 scrollbar-hide pb-10">
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 0.98 }}
              className="flex-shrink-0 w-[85vw] md:w-[45vw] group cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-gray-200 mb-6 md:mb-8">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" 
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase mb-1 md:mb-2 leading-none">{p.title}</h3>
                  <p className="text-gray-500 font-medium uppercase text-[10px] md:text-xs tracking-widest">{p.category}</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                  <ArrowDownRight className="-rotate-45 w-4 h-4 md:w-5 md:h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
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
                  className="p-6 md:p-10 border border-white/10 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center text-center"
                >
                  <span className="text-4xl md:text-7xl font-black mb-1 md:mb-2">{s.value}</span>
                  <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-purple-500">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative min-h-screen bg-[#030303] pt-32 md:pt-40 pb-20 px-6 md:px-8 flex flex-col justify-between overflow-hidden relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-600/10 blur-[150px] rounded-full" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <SectionTitle title="Connect" subtitle="Contact" />
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end">
            
            {/* LEFT SIDE */}
            <div>
              <motion.h3 
                className="text-6xl md:text-[12rem] font-black uppercase leading-[0.8] mb-12 tracking-tighter"
                whileHover={{ skewX: -5 }}
              >
                Let's <br /> Talk <span className="text-pink-500">.</span>
              </motion.h3>

              {/* FORM */}
              <form
                action="https://formsubmit.co/4nhtran@gmail.com"
                method="POST"
                className="space-y-6 w-full max-w-xl"
                onSubmit={() => {
                  setTimeout(() => {
                    console.log("Form submitted");
                  }, 500);
                }}
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New Contact From Website" />
                <input type="hidden" name="_template" value="table" />

                <input
                  type="text"
                  name="Người liên hệ"
                  placeholder="Người liên hệ"
                  required
                  className="w-full bg-transparent border-b border-gray-600 focus:border-pink-500 outline-none py-3 text-white placeholder-gray-500 transition"
                />

                <input
                  type="text"
                  name="Tên thương hiệu"
                  placeholder="Tên thương hiệu"
                  required
                  className="w-full bg-transparent border-b border-gray-600 focus:border-pink-500 outline-none py-3 text-white placeholder-gray-500 transition"
                />

                <input
                  type="email"
                  name="Email"
                  placeholder="Email"
                  required
                  className="w-full bg-transparent border-b border-gray-600 focus:border-pink-500 outline-none py-3 text-white placeholder-gray-500 transition"
                />

                <input
                  type="tel"
                  name="Số điện thoại"
                  placeholder="Số điện thoại"
                  required
                  className="w-full bg-transparent border-b border-gray-600 focus:border-pink-500 outline-none py-3 text-white placeholder-gray-500 transition"
                />

                <textarea
                  name="Nội dung trao đổi"
                  placeholder="Nội dung trao đổi"
                  rows="4"
                  required
                  className="w-full bg-transparent border-b border-gray-600 focus:border-pink-500 outline-none py-3 text-white placeholder-gray-500 transition resize-none"
                />

                {/* Hidden real submit button */}
                <button type="submit" className="hidden" id="real-submit" />
              </form>
            </div>

            {/* RIGHT SIDE BUTTON */}
            <div className="flex flex-col gap-12 items-start lg:items-end w-full">
              <MagneticElement distance={0.5}>
                <div
                  className="relative group cursor-pointer"
                  onClick={() => document.getElementById("real-submit").click()}
                >
                  <div className="w-40 h-40 md:w-64 md:h-64 rounded-full border border-pink-500/30 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-500">
                    <div className="w-full h-full bg-pink-500 rounded-full flex items-center justify-center text-black overflow-hidden relative">
                      <motion.div 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="relative z-10 flex flex-col items-center gap-2"
                      >
                        <Send className="w-6 h-6 md:w-8 md:h-8" />
                        <span className="font-black text-[10px] md:text-xs uppercase tracking-widest">
                          Send Hi
                        </span>
                      </motion.div>
                      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </MagneticElement>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="relative z-10 w-full max-w-7xl mx-auto border-t border-white/10 mt-24 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
          <div className="flex gap-8 md:gap-12">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for new projects</span>
          </div>
          <p>© 2024 HM Studio. Digital Growth Agency.</p>
        </div>
      </section>
    </div>
  );
};

export default App;