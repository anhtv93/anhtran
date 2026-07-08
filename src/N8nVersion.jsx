import React, { useMemo } from 'react';
import { ArrowRight, Download, Mail, Menu, Sparkles, Workflow, Zap } from 'lucide-react';
import { CONTACT_ROUTES, EXPERIENCES, PROFILE_MARKERS, PROJECTS, SERVICES, STATS } from './App.jsx';
import './index.css';

const GlowOrb = ({ className = '' }) => (
  <div aria-hidden="true" className={`pointer-events-none absolute rounded-full blur-[88px] ${className}`} />
);

const N8nMark = () => (
  <div className="flex items-center gap-3 text-white">
    <svg viewBox="0 0 92 42" className="h-9 w-[78px] text-white/60" fill="none" aria-hidden="true">
      <path d="M10 21h16m14 0h18m-32 0 11-12h17m-28 12 11 12h17" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {[10, 26, 42, 58, 74].map((cx, i) => (
        <circle key={cx} cx={cx} cy={i === 2 ? 9 : i === 3 ? 33 : 21} r="6.5" stroke="currentColor" strokeWidth="4" fill="#120b1d" />
      ))}
    </svg>
    <span className="text-3xl font-black tracking-[-0.08em]">Anh</span>
  </div>
);

const OrangeButton = ({ href, children, className = '' }) => (
  <a
    href={href}
    className={`inline-flex min-h-[80px] w-full items-center justify-center rounded-[14px] bg-gradient-to-r from-[#ff8426] to-[#ff1f13] px-6 text-xl md:text-2xl font-medium text-white shadow-[0_18px_70px_rgba(255,70,34,0.28)] transition-transform hover:-translate-y-0.5 ${className}`}
  >
    {children}
  </a>
);

const GhostButton = ({ href, children }) => (
  <a
    href={href}
    className="inline-flex min-h-[80px] w-full items-center justify-center rounded-[14px] border border-white/5 bg-white/[0.12] px-6 text-xl md:text-2xl font-medium text-white/90 transition-colors hover:bg-white/[0.18]"
  >
    {children}
  </a>
);

const SectionHeading = ({ eyebrow, title, desc }) => (
  <div className="mx-auto mb-10 max-w-4xl text-center md:mb-14">
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#ff8a33]">
      <Sparkles className="h-4 w-4" />
      {eyebrow}
    </div>
    <h2 className="text-4xl font-medium leading-[0.95] tracking-[-0.06em] text-white md:text-7xl">{title}</h2>
    {desc && <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-white/58 md:text-2xl">{desc}</p>}
  </div>
);

const DarkCard = ({ children, className = '' }) => (
  <article className={`rounded-[26px] border border-white/10 bg-[#1b1526]/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_22px_70px_rgba(0,0,0,0.32)] ${className}`}>
    {children}
  </article>
);

const WorkflowNode = ({ index, title, desc, icon: Icon }) => (
  <DarkCard className="group relative overflow-hidden transition-colors hover:border-[#ff6334]/50 hover:bg-[#21182d]">
    <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#ff4d2d]/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
    <div className="relative flex items-start gap-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#ff6334]/25 bg-[#ff6334]/10 text-[#ff8a33]">
        {Icon ? <Icon className="h-6 w-6" /> : <span className="font-mono text-sm font-bold">{index}</span>}
      </div>
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.24em] text-[#ff8a33]">Node {index}</div>
        <h3 className="mt-2 text-2xl font-medium leading-none tracking-[-0.04em] text-white md:text-3xl">{title}</h3>
        <p className="mt-4 text-base leading-relaxed text-white/58">{desc}</p>
      </div>
    </div>
  </DarkCard>
);

export default function N8nVersion() {
  const hrRoute = useMemo(() => CONTACT_ROUTES.find((route) => route.id === 'hr') || CONTACT_ROUTES[0], []);
  const mailtoHref = useMemo(() => {
    const body = [
      'Xin chào Anh Trần,',
      '',
      hrRoute.message,
      '',
      '- Nội dung trao đổi: ',
      '- Company / brand: ',
      '- Expected timeline: ',
      '',
      'Trân trọng.',
    ].join('\n');
    return `mailto:anh@anhtranviet.com?subject=${encodeURIComponent(hrRoute.emailSubject)}&body=${encodeURIComponent(body)}`;
  }, [hrRoute.emailSubject, hrRoute.message]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#0d0715] text-white selection:bg-[#ff5a2a] selection:text-white">
      <section className="relative min-h-screen px-4 pb-16 pt-4 md:px-6 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(80,43,127,0.25),transparent_34%),linear-gradient(180deg,#120b1d_0%,#0d0715_62%,#171120_100%)]" />
        <GlowOrb className="bottom-[-10%] left-1/2 h-[420px] w-[520px] -translate-x-1/2 bg-[#ff6a3d]/35" />
        <GlowOrb className="bottom-[-16%] left-[28%] h-[280px] w-[340px] bg-[#2446ff]/20" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <nav className="flex items-center justify-between rounded-[30px] border border-white/10 bg-[#171120]/92 px-6 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl md:px-8">
            <N8nMark />
            <div className="hidden items-center gap-2 lg:flex">
              {['Services', 'Experience', 'Works', 'Credentials', 'Connect'].map((item) => (
                <a key={item} href={`#n8n-${item.toLowerCase()}`} className="rounded-full px-4 py-2 text-sm font-semibold text-white/58 hover:bg-white/10 hover:text-white">
                  {item}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-5">
              <a href="#n8n-connect" className="hidden rounded-[16px] bg-gradient-to-r from-[#ff8a24] to-[#ff2117] px-7 py-4 text-xl font-medium text-white md:inline-flex">
                Get Started
              </a>
              <Menu className="h-9 w-9 text-white" />
            </div>
          </nav>

          <div className="mx-auto mt-24 max-w-6xl text-center md:mt-32">
            <h1 className="text-[3.9rem] font-light leading-[0.98] tracking-[-0.075em] text-white md:text-8xl lg:text-[7.2rem]">
              Marketing workflows you can see and control
            </h1>
            <p className="mx-auto mt-10 max-w-5xl text-[1.72rem] font-light leading-[1.45] tracking-[-0.035em] text-white/72 md:text-4xl">
              Xây dựng và vận hành hệ thống Marketing. Nâng tầm thương hiệu - tăng trưởng doanh thu.
            </p>
            <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2">
              <OrangeButton href="#n8n-services">Explore the workflow</OrangeButton>
              <GhostButton href="#n8n-connect">Talk to Anh</GhostButton>
            </div>
            <div className="mx-auto mt-20 max-w-3xl text-center text-2xl leading-relaxed text-white/42">
              Portfolio system for technical growth, brand strategy, performance and transformation teams.
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-5 text-white/54 md:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                  <div className="text-3xl font-medium text-white">{stat.value}</div>
                  <div className="mt-2 text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="n8n-services" className="relative px-4 py-20 md:px-6 md:py-28">
        <SectionHeading eyebrow="Build visually" title="Expertise as workflow nodes" desc="Mỗi năng lực là một node kết nối strategy, performance, martech và omni-channel." />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          {SERVICES.map((service, index) => <WorkflowNode key={service.title} index={index + 1} title={service.title} desc={service.desc} icon={service.Icon} />)}
        </div>
      </section>

      <section id="n8n-experience" className="relative px-4 py-20 md:px-6 md:py-28">
        <GlowOrb className="right-[-10%] top-1/3 h-[420px] w-[420px] bg-[#6d45ff]/16" />
        <SectionHeading eyebrow="Reasoning trace" title="Experience mapped step-by-step" desc="Hành trình được trình bày như một execution canvas có thể theo dõi." />
        <div className="mx-auto max-w-6xl">
          <div className="relative grid gap-5 before:absolute before:left-5 before:top-8 before:h-[calc(100%-4rem)] before:w-px before:bg-gradient-to-b before:from-[#ff6334] before:via-white/16 before:to-transparent md:before:left-1/2">
            {EXPERIENCES.map((exp, index) => (
              <div key={`${exp.period}-${exp.company}`} className={`relative md:w-[48%] ${index % 2 ? 'md:ml-auto' : ''}`}>
                <WorkflowNode index={index + 1} title={`${exp.role} · ${exp.company}`} desc={exp.desc} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="n8n-works" className="relative px-4 py-20 md:px-6 md:py-28">
        <SectionHeading eyebrow="Deploy outputs" title="The Works" desc="Các project như output của workflow: strategy được triển khai thành kết quả nhìn thấy được." />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.slice(0, 12).map((project) => (
            <DarkCard key={project.title} className="overflow-hidden p-0">
              <img src={project.image} alt={project.title} className="aspect-[4/3] w-full object-cover opacity-90" loading="lazy" decoding="async" />
              <div className="p-5">
                <div className="font-mono text-[11px] font-black uppercase tracking-[0.22em] text-[#ff8a33]">{project.category}</div>
                <h3 className="mt-3 text-2xl font-medium leading-none tracking-[-0.04em]">{project.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/58">{project.description}</p>
              </div>
            </DarkCard>
          ))}
        </div>
      </section>

      <section id="n8n-credentials" className="relative px-4 py-20 md:px-6 md:py-28">
        <SectionHeading eyebrow="Control signals" title="Credentials" desc="Nền tảng học vấn, giải thưởng và hoạt động cộng đồng." />
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {PROFILE_MARKERS.map((item, index) => <WorkflowNode key={`${item.year}-${item.title}`} index={index + 1} title={item.title} desc={`${item.year} · ${item.detail}`} icon={item.Icon} />)}
        </div>
      </section>

      <section id="n8n-connect" className="relative px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-7xl rounded-[34px] border border-white/10 bg-[#171120] p-6 shadow-[0_24px_100px_rgba(0,0,0,0.45)] md:p-10">
          <SectionHeading eyebrow="Get started" title="Choose Your Next Move" desc="Chọn đúng workflow liên hệ theo ngữ cảnh." />
          <div className="grid gap-5 md:grid-cols-3">
            {CONTACT_ROUTES.map((route) => <WorkflowNode key={route.id} index={route.id === 'ceo' ? 1 : route.id === 'hr' ? 2 : 3} title={route.label} desc={route.intent} icon={route.Icon} />)}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <OrangeButton href="/Tran-Viet-Anh-CMO-Leadership-Profile.html"><span className="inline-flex items-center gap-3">Download CV <Download className="h-5 w-5" /></span></OrangeButton>
            <GhostButton href={mailtoHref}><span className="inline-flex items-center gap-3">Email <Mail className="h-5 w-5" /></span></GhostButton>
            <GhostButton href="/"><span className="inline-flex items-center gap-3">Back to main <ArrowRight className="h-5 w-5" /></span></GhostButton>
          </div>
        </div>
      </section>
    </main>
  );
}
