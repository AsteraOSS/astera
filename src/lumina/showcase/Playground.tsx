import React, { useState } from 'react';
import { LuminaButton } from '@/lumina/components/Buttons';
import { LuminaSwitch } from '@/lumina/components/Inputs';
import { CodeEditor } from '@/components/ui/CodeEditor';
import { Sparkles, Sliders } from 'lucide-react';

export const Playground: React.FC = () => {
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'outline' | 'ghost' | 'emerald' | 'destructive'>('primary');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState('Explore Lumina UI');

  const generatedCode = `<LuminaButton\n  variant="${variant}"\n  size="${size}"${
    isLoading ? '\n  isLoading' : ''
  }${isDisabled ? '\n  disabled' : ''}\n>\n  ${buttonText}\n</LuminaButton>`;

  return (
    <div className="grid grid-cols-3 gap-6 font-sans">
      {/* Left: Prop Controls Configurator */}
      <div className="p-5 bg-[#11131b] border border-[#272d40] rounded-xl space-y-5">
        <div className="flex items-center gap-2 border-b border-[#272d40] pb-3">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-mono">
            Component Configurator
          </h3>
        </div>

        {/* Variant Picker */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block">Variant</label>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as any)}
            className="w-full bg-[#090a0f] border border-[#272d40] rounded-lg p-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
          >
            <option value="primary">primary</option>
            <option value="secondary">secondary</option>
            <option value="outline">outline</option>
            <option value="ghost">ghost</option>
            <option value="emerald">emerald</option>
            <option value="destructive">destructive</option>
          </select>
        </div>

        {/* Size Picker */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block">Size Scale</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as any)}
            className="w-full bg-[#090a0f] border border-[#272d40] rounded-lg p-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
          >
            <option value="sm">sm (32px)</option>
            <option value="md">md (36px)</option>
            <option value="lg">lg (44px)</option>
          </select>
        </div>

        {/* Label Text Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block">Button Label</label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="w-full bg-[#090a0f] border border-[#272d40] rounded-lg p-2 text-xs text-slate-200 font-sans focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* State Toggles */}
        <div className="space-y-3 pt-2 border-t border-[#272d40]">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300">Is Loading</span>
            <LuminaSwitch checked={isLoading} onChange={setIsLoading} />
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300">Is Disabled</span>
            <LuminaSwitch checked={isDisabled} onChange={setIsDisabled} />
          </div>
        </div>
      </div>

      {/* Right: Live Preview Canvas & Generated Code */}
      <div className="col-span-2 space-y-6">
        {/* Live Canvas */}
        <div className="p-12 bg-[#090a0f] border border-[#272d40] rounded-xl flex items-center justify-center min-h-[240px] relative overflow-hidden shadow-inner">
          <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
            <Sparkles className="w-3 h-3 text-indigo-400" /> LIVE COMPONENT RENDER
          </div>
          <LuminaButton
            variant={variant}
            size={size}
            isLoading={isLoading}
            disabled={isDisabled}
          >
            {buttonText}
          </LuminaButton>
        </div>

        {/* Generated Code Box */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">
            JSX Generated Snippet
          </h4>
          <CodeEditor value={generatedCode} readOnly language="tsx" minHeight="160px" />
        </div>
      </div>
    </div>
  );
};
