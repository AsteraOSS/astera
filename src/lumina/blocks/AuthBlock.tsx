import React, { useState } from 'react';
import { LuminaButton } from '@/lumina/components/Buttons';
import { Github, KeyRound, ArrowRight } from 'lucide-react';

export const AuthBlock: React.FC = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="max-w-md mx-auto p-8 bg-[#11131b] border border-[#272d40] rounded-2xl shadow-astera-modal space-y-6 font-sans">
      <div className="text-center space-y-1">
        <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 mx-auto flex items-center justify-center text-indigo-400 font-mono font-bold text-lg mb-3">
          A
        </div>
        <h2 className="text-lg font-bold text-slate-100">Sign in to Astera Studio</h2>
        <p className="text-xs text-slate-400">Access your developer tools and encrypted vaults</p>
      </div>

      <div className="space-y-2">
        <LuminaButton variant="secondary" className="w-full" leftIcon={<Github className="w-4 h-4" />}>
          Continue with GitHub
        </LuminaButton>
        <LuminaButton variant="outline" className="w-full" leftIcon={<KeyRound className="w-4 h-4 text-emerald-400" />}>
          Use WebAuthn Passkey
        </LuminaButton>
      </div>

      <div className="flex items-center gap-3 text-slate-600 text-xs font-mono">
        <div className="flex-1 h-[1px] bg-[#272d40]" />
        <span>OR WORKSPACE EMAIL</span>
        <div className="flex-1 h-[1px] bg-[#272d40]" />
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Work Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="developer@astera.dev"
            className="w-full h-9 bg-[#090a0f] border border-[#272d40] rounded-lg px-3 text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <LuminaButton variant="primary" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
          Send Magic Login Link
        </LuminaButton>
      </div>

      <p className="text-[11px] text-center text-slate-500">
        Protected by hardware-grade AES-256 KMS encryption.
      </p>
    </div>
  );
};
