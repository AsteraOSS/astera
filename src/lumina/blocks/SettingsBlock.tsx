import React, { useState } from 'react';
import { LuminaSwitch } from '@/lumina/components/Inputs';
import { LuminaButton } from '@/lumina/components/Buttons';
import { ShieldCheck, Save } from 'lucide-react';

export const SettingsBlock: React.FC = () => {
  const [autoSave, setAutoSave] = useState(true);
  const [telemetry, setTelemetry] = useState(true);

  return (
    <div className="p-6 bg-[#11131b] border border-[#272d40] rounded-2xl max-w-2xl mx-auto space-y-6 font-sans">
      <div>
        <h2 className="text-base font-bold text-slate-100">Workspace Settings & Security</h2>
        <p className="text-xs text-slate-400 mt-0.5">Manage preferences for astera-fleet-prod</p>
      </div>

      <div className="space-y-4 text-xs">
        <div className="flex items-center justify-between p-4 bg-[#090a0f] border border-[#272d40] rounded-xl">
          <div>
            <div className="font-semibold text-slate-200">Auto-Save API Payloads</div>
            <div className="text-slate-400 text-[11px]">Automatically store active request tabs on change</div>
          </div>
          <LuminaSwitch checked={autoSave} onChange={setAutoSave} />
        </div>

        <div className="flex items-center justify-between p-4 bg-[#090a0f] border border-[#272d40] rounded-xl">
          <div>
            <div className="font-semibold text-slate-200">Telemetry Log Streaming</div>
            <div className="text-slate-400 text-[11px]">Stream 48-node Kubernetes diagnostic events</div>
          </div>
          <LuminaSwitch checked={telemetry} onChange={setTelemetry} />
        </div>

        <div className="p-4 bg-[#090a0f] border border-[#272d40] rounded-xl space-y-2">
          <div className="flex items-center gap-2 font-semibold text-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted Master Token</span>
          </div>
          <input
            type="text"
            readOnly
            value="ast_live_99481a8c01f92e8310c8"
            className="w-full bg-[#161924] border border-[#272d40] rounded-lg p-2 font-mono text-xs text-indigo-300"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <LuminaButton variant="primary" size="sm" leftIcon={<Save className="w-3.5 h-3.5" />}>
          Save Workspace Preferences
        </LuminaButton>
      </div>
    </div>
  );
};
