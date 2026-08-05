import React, { useState } from 'react';
import { LuminaButton } from '@/lumina/components/Buttons';
import { Check, Sparkles } from 'lucide-react';

export const PricingBlock: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="p-8 bg-[#090a0f] border border-[#272d40] rounded-2xl space-y-8 select-none">
      <div className="text-center space-y-2 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-slate-100 font-sans">Transparent Ecosystem Pricing</h2>
        <p className="text-xs text-slate-400 font-sans">Open-source core forever. Enterprise cluster options available.</p>

        <div className="inline-flex items-center p-1 bg-[#11131b] border border-[#272d40] rounded-lg text-xs font-medium mt-2">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-3 py-1 rounded-md transition-colors ${!isAnnual ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1 ${isAnnual ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
          >
            Annual <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1 rounded font-mono">SAVE 20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Community Tier */}
        <div className="p-6 bg-[#11131b] border border-[#272d40] rounded-xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100">Community Core</h3>
            <p className="text-[11px] text-slate-400">For solo developers & open-source projects</p>
            <div className="text-2xl font-bold font-mono text-slate-100 mt-2">$0</div>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Unlimited API Client Requests</li>
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 3 Local Database Explorer Drivers</li>
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Community Discord Support</li>
          </ul>
          <LuminaButton variant="outline" className="w-full">Get Started Free</LuminaButton>
        </div>

        {/* Pro Tier (Highlighted) */}
        <div className="p-6 bg-[#161924] border-2 border-indigo-500 rounded-xl space-y-4 shadow-astera-glow relative">
          <div className="absolute -top-3 right-4 px-2 py-0.5 bg-indigo-600 text-white font-mono text-[10px] font-bold rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> MOST POPULAR
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">Pro Developer</h3>
            <p className="text-[11px] text-slate-400">For fast-moving engineering teams</p>
            <div className="text-2xl font-bold font-mono text-indigo-400 mt-2">
              ${isAnnual ? '29' : '36'}<span className="text-xs text-slate-500 font-normal"> / mo</span>
            </div>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Everything in Community</li>
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> AES-256 KMS Vault Sync</li>
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Unlimited Event Workflow Nodes</li>
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Sub-millisecond Telemetry Logs</li>
          </ul>
          <LuminaButton variant="primary" className="w-full">Start 14-Day Free Trial</LuminaButton>
        </div>

        {/* Enterprise Tier */}
        <div className="p-6 bg-[#11131b] border border-[#272d40] rounded-xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100">Enterprise Dedicated</h3>
            <p className="text-[11px] text-slate-400">For high-security corporate fleets</p>
            <div className="text-2xl font-bold font-mono text-slate-100 mt-2">Custom</div>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Dedicated Kubernetes Cluster</li>
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Custom SAML / Okta SSO</li>
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> 24/7 Priority SLA & Audit Logs</li>
          </ul>
          <LuminaButton variant="secondary" className="w-full">Contact Enterprise Team</LuminaButton>
        </div>
      </div>
    </div>
  );
};
