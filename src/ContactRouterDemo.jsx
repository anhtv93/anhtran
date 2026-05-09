import React, { useMemo, useState } from 'react';
import { ArrowDownRight, BriefcaseBusiness, Building2, CheckCircle2, Copy, Download, Mail, MessageCircle, Mic2, Send, Sparkles } from 'lucide-react';
import './index.css';

const ROUTES = [
  {
    id: 'ceo',
    label: 'CEO / Founder',
    eyebrow: 'Growth System Audit',
    title: 'Find the leak before spending more.',
    intent: 'Dành cho CEO muốn biết thương hiệu, phễu bán hàng hoặc hệ thống marketing đang nghẽn ở đâu.',
    icon: Building2,
    bullets: ['3 điểm nghẽn tăng trưởng', 'Góc nhìn brand-to-revenue', 'Ưu tiên hành động trong 14 ngày'],
    cta: 'Audit my growth system',
    emailSubject: 'Growth System Audit Request',
    message: 'Tôi muốn audit hệ thống growth/brand/funnel hiện tại.',
  },
  {
    id: 'hr',
    label: 'HR / Recruiter',
    eyebrow: 'Leadership Profile',
    title: 'Get the CMO-ready snapshot.',
    intent: 'Dành cho HR cần profile ngắn gọn, dễ gửi nội bộ và dễ đánh giá scope leadership.',
    icon: BriefcaseBusiness,
    bullets: ['Scope & industries', 'Team size / budget context', 'Key achievements summary'],
    cta: 'Request leadership profile',
    emailSubject: 'Leadership Profile Request - Tran Viet Anh',
    message: 'Tôi muốn nhận leadership profile theo format tuyển dụng.',
    cvHref: '/Tran-Viet-Anh-CMO-Leadership-Profile.html',
  },
  {
    id: 'collab',
    label: 'Collaboration',
    eyebrow: 'Strategic Conversation',
    title: 'Build a sharper point of view.',
    intent: 'Dành cho talk, podcast, advisory, partnership hoặc dự án cần tư duy chiến lược.',
    icon: Mic2,
    bullets: ['Brand growth topics', 'Transformation / GTM', 'Podcast / event / advisory'],
    cta: 'Start a strategic conversation',
    emailSubject: 'Strategic Collaboration Conversation',
    message: 'Tôi muốn trao đổi về collaboration/advisory/talk.',
  },
];

export default function ContactRouterDemo() {
  const [activeId, setActiveId] = useState('ceo');
  const [isChoosingChannel, setIsChoosingChannel] = useState(false);
  const [copied, setCopied] = useState(false);
  const [actionStatus, setActionStatus] = useState('');
  const activeRoute = useMemo(() => ROUTES.find((route) => route.id === activeId) || ROUTES[0], [activeId]);
  const ActiveIcon = activeRoute.icon;
  const emailBody = useMemo(
    () => [
      `Xin chao anh Viet,`,
      ``,
      activeRoute.message,
      ``,
      `Context ngan gon:`,
      `- Company / brand:`,
      `- Current challenge:`,
      `- Expected timeline:`,
      ``,
      `Cam on anh.`,
    ].join('\n'),
    [activeRoute.message]
  );
  const mailtoHref = `mailto:anh@anhtranviet.com?subject=${encodeURIComponent(activeRoute.emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const zaloMessage = `${activeRoute.emailSubject}\n\n${emailBody}`;

  const handleRouteChange = (id) => {
    setActiveId(id);
    setIsChoosingChannel(false);
    setCopied(false);
    setActionStatus('');
  };

  const copyAndOpenZalo = async () => {
    try {
      await navigator.clipboard.writeText(zaloMessage);
      setCopied(true);
      setActionStatus('Copied message to clipboard and opened Zalo.');
    } catch {
      setCopied(false);
      setActionStatus('Opened Zalo. Clipboard copy was blocked by the browser.');
    }
    window.open('https://zalo.me/84919999781', '_blank');
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      <section className="relative min-h-screen px-4 md:px-6 py-8 md:py-12 flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(236,72,153,0.24),transparent_34%),radial-gradient(circle_at_80%_72%,rgba(34,211,238,0.16),transparent_36%),linear-gradient(135deg,#050505_0%,#0c0c0f_48%,#050505_100%)]" />
        <div className="absolute inset-0 opacity-[0.13] bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[length:34px_34px]" />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-pink-500">/ Contact Router Demo</span>
              <h1 className="mt-3 text-5xl md:text-8xl font-black uppercase leading-[0.86] tracking-tight">
                Choose <br /> Your Next Move
              </h1>
            </div>
            <p className="max-w-xl text-gray-300 text-base md:text-xl leading-relaxed">
              Không chỉ là liên hệ. Đây là cách người xem tự chọn đúng ngữ cảnh để bắt đầu một cuộc trò chuyện có ích.
            </p>
          </div>

          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-4 md:gap-6">
            <div className="space-y-3">
              {ROUTES.map((route, index) => {
                const Icon = route.icon;
                const isActive = route.id === activeId;
                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => handleRouteChange(route.id)}
                    className={`group w-full text-left border transition-all duration-300 px-5 md:px-6 py-5 md:py-6 rounded-[8px] ${
                      isActive
                        ? 'bg-white text-black border-white translate-x-0'
                        : 'bg-white/[0.035] border-white/10 text-white hover:bg-white/[0.08] hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className={`font-mono text-xs ${isActive ? 'text-pink-600' : 'text-gray-500'}`}>0{index + 1}</span>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-pink-600' : 'text-pink-500'}`} />
                        <span className="text-xl md:text-2xl font-black uppercase tracking-tight">{route.label}</span>
                      </div>
                      <ArrowDownRight className={`w-5 h-5 transition-transform ${isActive ? 'rotate-45' : 'group-hover:rotate-45'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="relative border border-white/10 bg-white/[0.04] rounded-[8px] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
              <div className="grid md:grid-cols-[0.95fr_1.05fr] min-h-[560px]">
                <div className="p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
                  <div>
                    <div className="inline-flex items-center gap-2 text-pink-500 font-mono text-xs uppercase tracking-[0.25em]">
                      <Sparkles className="w-4 h-4" />
                      {activeRoute.eyebrow}
                    </div>
                    <h2 className="mt-5 text-4xl md:text-6xl font-black uppercase leading-[0.92] tracking-tight">
                      {activeRoute.title}
                    </h2>
                    <p className="mt-6 text-gray-300 text-base md:text-lg leading-relaxed">
                      {activeRoute.intent}
                    </p>
                  </div>

                  <div className="mt-10 space-y-3">
                    {activeRoute.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-center gap-3 text-sm md:text-base text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div className="aspect-square max-h-[260px] md:max-h-[320px] border border-pink-500/25 rounded-full mx-auto w-full max-w-[320px] flex items-center justify-center relative">
                    <div className="absolute inset-6 rounded-full border border-white/10" />
                    <div className="absolute inset-12 rounded-full bg-pink-500/10 blur-xl" />
                    <ActiveIcon className="relative z-10 w-20 h-20 md:w-24 md:h-24 text-pink-500" />
                  </div>

                  <div className="mt-8">
                    {!isChoosingChannel ? (
                      <button
                        type="button"
                        onClick={() => setIsChoosingChannel(true)}
                        className="group w-full min-h-[72px] bg-pink-500 text-black rounded-full flex items-center justify-center gap-3 px-6 text-xs md:text-sm font-black uppercase tracking-[0.2em] hover:bg-white transition-colors"
                      >
                        <Send className="w-5 h-5" />
                        {activeRoute.cta}
                      </button>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <a
                          href={mailtoHref}
                          onClick={() => setActionStatus('Opened email app with prefilled subject and body.')}
                          className="min-h-[72px] bg-pink-500 text-black rounded-full flex items-center justify-center gap-3 px-5 text-xs font-black uppercase tracking-[0.18em] hover:bg-white transition-colors"
                        >
                          <Mail className="w-5 h-5" />
                          Send email
                        </a>
                        <button
                          type="button"
                          onClick={copyAndOpenZalo}
                          className="min-h-[72px] border border-white/15 bg-white/[0.06] text-white rounded-full flex items-center justify-center gap-3 px-5 text-xs font-black uppercase tracking-[0.18em] hover:border-pink-500/60 hover:bg-white/[0.1] transition-colors"
                        >
                          {copied ? <CheckCircle2 className="w-5 h-5 text-pink-500" /> : <Copy className="w-5 h-5 text-pink-500" />}
                          {copied ? 'Copied + open Zalo' : 'Copy + open Zalo'}
                        </button>
                      </div>
                    )}

                    {isChoosingChannel && (
                      <div className="mt-4 border border-white/10 bg-black/35 rounded-[8px] p-4">
                        <div className="text-[10px] uppercase tracking-widest text-pink-500 font-black">Action preview</div>
                        <div className="mt-3 text-xs text-gray-400 font-mono leading-relaxed">
                          <div className="text-white">Subject: {activeRoute.emailSubject}</div>
                          <pre className="mt-2 whitespace-pre-wrap font-mono text-gray-400">{emailBody}</pre>
                        </div>
                        {actionStatus && (
                          <div className="mt-3 text-[11px] uppercase tracking-widest text-white font-black flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-pink-500" />
                            {actionStatus}
                          </div>
                        )}
                      </div>
                    )}

                    {activeRoute.cvHref && (
                      <a
                        href={activeRoute.cvHref}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 min-h-[56px] border border-white/10 bg-black/30 rounded-[8px] px-4 py-4 hover:border-pink-500/60 hover:bg-white/[0.06] transition-colors flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-gray-500 font-black">For HR</div>
                          <div className="mt-1 text-sm font-bold text-white">Open leadership CV profile</div>
                        </div>
                        <Download className="w-5 h-5 text-pink-500 shrink-0" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
