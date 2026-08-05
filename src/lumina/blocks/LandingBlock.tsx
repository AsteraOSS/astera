import { LuminaButton } from '@/lumina/components/Buttons';
import { ShieldCheck, Sparkles, ArrowRight, Github } from 'lucide-react';

export const LandingBlock: React.FC = () => {
  return (
    <div className="bg-[#090a0f] border border-[#272d40] rounded-2xl p-12 text-center space-y-8 relative overflow-hidden select-none">
      {/* Subtle Glow Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-indigo-600/15 blur-3xl pointer-events-none rounded-full" />

      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-mono font-semibold">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Lumina UI v1.0.0 is Officially Live</span>
      </div>

      {/* Hero Headings */}
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-100 font-sans tracking-tight leading-tight">
          Crafted for Developers Who Demand Absolute Excellence.
        </h1>
        <p className="text-sm text-slate-400 font-sans leading-relaxed">
          The reference implementation for open-source UI component libraries. Minimal. Functional. Timeless. Built strictly with 8pt grid tokens and Framer Motion micro-physics.
        </p>
      </div>

      {/* Hero CTAs */}
      <div className="flex items-center justify-center gap-3">
        <LuminaButton variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
          Explore Components
        </LuminaButton>
        <LuminaButton variant="secondary" size="lg" leftIcon={<Github className="w-4 h-4" />}>
          Star on GitHub (14.2k)
        </LuminaButton>
      </div>

      {/* Feature Pills */}
      <div className="pt-8 border-t border-[#272d40]/60 grid grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
        <div className="p-4 bg-[#11131b] border border-[#272d40] rounded-xl space-y-1">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> WCAG AAA Accessible
          </div>
          <p className="text-[11px] text-slate-400">Headless Radix primitives with keyboard focus navigation.</p>
        </div>
        <div className="p-4 bg-[#11131b] border border-[#272d40] rounded-xl space-y-1">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> 60 FPS Micro-Interactions
          </div>
          <p className="text-[11px] text-slate-400">Natural spring physics using Framer Motion 11.</p>
        </div>
        <div className="p-4 bg-[#11131b] border border-[#272d40] rounded-xl space-y-1">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" /> Zero TypeScript Errors
          </div>
          <p className="text-[11px] text-slate-400">Strict mode enabled with clean auto-complete inferencing.</p>
        </div>
      </div>
    </div>
  );
};
