import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SlidersHorizontal, Keyboard, ShieldCheck } from 'lucide-react';

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Astera Studio Settings"
      description="Configure developer workspace preferences, keyboard shortcuts, and engine specs"
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Workspace Options */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" /> Preferences
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 bg-[#161924] border border-[#272d40] rounded-lg">
              <div>
                <div className="font-semibold text-slate-100">Dark Mode Obsidian Theme</div>
                <div className="text-[#94a3b8] text-[11px]">Primary handcrafted high-contrast palette</div>
              </div>
              <Badge variant="purple">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#161924] border border-[#272d40] rounded-lg">
              <div>
                <div className="font-semibold text-slate-100">Telemetry Engine Auto-Stream</div>
                <div className="text-[#94a3b8] text-[11px]">Automatically poll diagnostic logs every 500ms</div>
              </div>
              <input type="checkbox" defaultChecked className="rounded border-[#272d40] text-indigo-600 focus:ring-indigo-500" />
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts Reference Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
            <Keyboard className="w-3.5 h-3.5 text-emerald-400" /> Keyboard Shortcuts
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="flex justify-between p-2 bg-[#0d0e14] border border-[#272d40] rounded">
              <span className="text-slate-400">Command Palette</span>
              <kbd className="px-1.5 py-0.5 bg-[#1f2434] text-slate-200 rounded">⌘ + K</kbd>
            </div>
            <div className="flex justify-between p-2 bg-[#0d0e14] border border-[#272d40] rounded">
              <span className="text-slate-400">Send API Request</span>
              <kbd className="px-1.5 py-0.5 bg-[#1f2434] text-slate-200 rounded">⌘ + Enter</kbd>
            </div>
            <div className="flex justify-between p-2 bg-[#0d0e14] border border-[#272d40] rounded">
              <span className="text-slate-400">Execute SQL Query</span>
              <kbd className="px-1.5 py-0.5 bg-[#1f2434] text-slate-200 rounded">⌘ + E</kbd>
            </div>
            <div className="flex justify-between p-2 bg-[#0d0e14] border border-[#272d40] rounded">
              <span className="text-slate-400">Run Node Workflow</span>
              <kbd className="px-1.5 py-0.5 bg-[#1f2434] text-slate-200 rounded">⌘ + R</kbd>
            </div>
          </div>
        </div>

        {/* Open Source Engine Information */}
        <div className="p-3 bg-[#0d0e14] border border-[#272d40] rounded-lg text-xs space-y-1">
          <div className="flex items-center justify-between text-slate-300 font-semibold font-sans">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Astera Studio v1.0.0 (MIT License)
            </span>
            <span className="font-mono text-emerald-400">Production Build</span>
          </div>
          <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
            Handcrafted developer tools designed to serve as the reference implementation for open-source software quality.
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={onClose} variant="primary" size="sm">
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};
