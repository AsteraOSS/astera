import React, { useState } from 'react';
import { LuminaButton, ButtonGroup, SplitButton } from '@/lumina/components/Buttons';
import { StatCard, GlassCard, BorderGlowCard } from '@/lumina/components/Cards';
import { LuminaSwitch, LuminaCheckbox, LuminaSlider } from '@/lumina/components/Inputs';
import { LuminaDropdown } from '@/lumina/components/Dropdowns';
import { LuminaContextMenu } from '@/lumina/components/ContextMenu';
import { LuminaBreadcrumbs, LuminaPagination } from '@/lumina/components/Navigation';
import { LuminaDataGrid } from '@/lumina/components/DataGrid';
import { SparklineChart, BarChart } from '@/lumina/components/Charts';
import { LuminaCalendar, LuminaDatePicker } from '@/lumina/components/Calendar';
import { LuminaTabs } from '@/lumina/components/Tabs';
import { LuminaAccordion } from '@/lumina/components/Accordion';
import { LuminaTreeView } from '@/lumina/components/TreeView';
import { LuminaFileUpload } from '@/lumina/components/FileUpload';
import { LuminaSkeleton, LuminaEmptyState, LuminaLoadingSpinner } from '@/lumina/components/Skeleton';

import { DashboardBlock } from '@/lumina/blocks/DashboardBlock';
import { LandingBlock } from '@/lumina/blocks/LandingBlock';
import { AuthBlock } from '@/lumina/blocks/AuthBlock';
import { SettingsBlock } from '@/lumina/blocks/SettingsBlock';
import { PricingBlock } from '@/lumina/blocks/PricingBlock';
import { AdminBlock } from '@/lumina/blocks/AdminBlock';

import { Playground } from '@/lumina/showcase/Playground';
import { Sparkles, Layers, Layout, Sliders, Activity, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const LuminaApp: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<
    'primitives' | 'blocks' | 'playground' | 'docs'
  >('primitives');

  const [activeBlock, setActiveBlock] = useState<
    'dashboard' | 'landing' | 'auth' | 'settings' | 'pricing' | 'admin'
  >('dashboard');

  const [switchChecked, setSwitchChecked] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [sliderValue, setSliderValue] = useState(65);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#090a0f] text-slate-100 overflow-hidden font-sans select-none">
      {/* Top Lumina Banner */}
      <div className="h-14 border-b border-[#272d40] bg-[#0d0e14] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-mono font-bold text-xs text-white shadow-sm shadow-indigo-950">
            L
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-slate-100 font-sans tracking-tight">
                Lumina UI Component Reference Library
              </h1>
              <Badge variant="purple">v1.0.0 Reference</Badge>
            </div>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex bg-[#11131b] border border-[#272d40] p-1 rounded-xl gap-1">
          <button
            onClick={() => setActiveCategory('primitives')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeCategory === 'primitives' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Component Catalog
          </button>
          <button
            onClick={() => setActiveCategory('blocks')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeCategory === 'blocks' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layout className="w-3.5 h-3.5" /> Application Blocks
          </button>
          <button
            onClick={() => setActiveCategory('playground')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeCategory === 'playground' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" /> Interactive Playground
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#090a0f] space-y-8">
        {/* Category: Component Catalog */}
        {activeCategory === 'primitives' && (
          <div className="space-y-8 max-w-6xl mx-auto pb-12">
            {/* Buttons & Triggers */}
            <section className="p-6 bg-[#11131b] border border-[#272d40] rounded-2xl space-y-4">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Buttons & Action Triggers
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <LuminaButton variant="primary">Primary Action</LuminaButton>
                <LuminaButton variant="secondary">Secondary</LuminaButton>
                <LuminaButton variant="outline">Outline</LuminaButton>
                <LuminaButton variant="ghost">Ghost Button</LuminaButton>
                <LuminaButton variant="emerald">Emerald Success</LuminaButton>
                <LuminaButton variant="destructive">Destructive</LuminaButton>
                <LuminaButton variant="primary" isLoading>Loading</LuminaButton>

                <ButtonGroup>
                  <LuminaButton variant="ghost" size="sm">Day</LuminaButton>
                  <LuminaButton variant="ghost" size="sm">Week</LuminaButton>
                  <LuminaButton variant="ghost" size="sm">Month</LuminaButton>
                </ButtonGroup>

                <SplitButton
                  label="Publish Build"
                  onClick={() => alert('Publishing...')}
                  options={['Publish to Staging', 'Publish to Production', 'Draft Release']}
                  onSelectOption={(opt) => alert(`Selected: ${opt}`)}
                />
              </div>
            </section>

            {/* Cards & Visualization Primitives */}
            <section className="p-6 bg-[#11131b] border border-[#272d40] rounded-2xl space-y-4">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                Cards & Vector Charts
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <StatCard title="Active Cluster Load" value="24.6%" change="+2.1%" isPositive icon={<Activity className="w-4 h-4" />} />
                <GlassCard><div className="text-xs font-bold text-slate-200">Glassmorphic Surface Card</div><p className="text-[11px] text-slate-400 mt-1">Backdrop blur filter with subtle rim outline.</p></GlassCard>
                <BorderGlowCard title="Indigo Glow Card" description="Subtle radial ambient background glow." actionText="Explore Spec" />
              </div>
              <div className="p-4 bg-[#090a0f] border border-[#272d40] rounded-xl flex items-center justify-between">
                <div className="w-1/2">
                  <div className="text-xs font-bold text-slate-300 mb-1">Vector Sparkline</div>
                  <SparklineChart data={[10, 25, 40, 30, 60, 85, 95]} color="#6366f1" height={40} />
                </div>
                <div className="w-1/2">
                  <div className="text-xs font-bold text-slate-300 mb-1">Bar Chart</div>
                  <BarChart data={[{ label: 'Mon', value: 40 }, { label: 'Tue', value: 80 }, { label: 'Wed', value: 65 }]} />
                </div>
              </div>
            </section>

            {/* Inputs & Controls */}
            <section className="p-6 bg-[#11131b] border border-[#272d40] rounded-2xl space-y-4">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                Inputs, Switches & Sliders
              </h2>
              <div className="grid grid-cols-3 gap-6 items-center">
                <LuminaSwitch checked={switchChecked} onChange={setSwitchChecked} label="Enable Auto-Save" />
                <LuminaCheckbox checked={checkboxChecked} onChange={setCheckboxChecked} label="Accept Terms & Policy" />
                <LuminaSlider value={sliderValue} onChange={setSliderValue} label="Memory Threshold" />
              </div>
            </section>

            {/* Popovers & Context Menu */}
            <section className="p-6 bg-[#11131b] border border-[#272d40] rounded-2xl space-y-4">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                Dropdowns & Context Menus
              </h2>
              <div className="flex items-center gap-4">
                <LuminaDropdown
                  label="Select Actions"
                  items={[
                    { id: '1', label: 'Edit Properties', shortcut: '⌘E' },
                    { id: '2', label: 'Duplicate Item', shortcut: '⌘D' },
                    { id: '3', label: 'Delete Record', destructive: true },
                  ]}
                  onSelect={(item) => alert(item.label)}
                />

                <LuminaContextMenu
                  menuItems={[
                    { label: 'Copy Symbol', action: () => alert('Copied') },
                    { label: 'Inspect Schema', action: () => alert('Inspect') },
                  ]}
                >
                  <div className="p-3 bg-[#161924] border border-[#272d40] rounded-lg text-xs font-mono text-slate-300">
                    Right-click inside this target zone for Context Menu
                  </div>
                </LuminaContextMenu>
              </div>
            </section>

            {/* Navigation & Data Grid */}
            <section className="p-6 bg-[#11131b] border border-[#272d40] rounded-2xl space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                  Navigation & Data Grid Primitive
                </h2>
                <LuminaBreadcrumbs items={[{ label: 'Astera' }, { label: 'Lumina' }, { label: 'DataGrid' }]} />
              </div>
              <LuminaDataGrid
                data={[
                  { id: '1', name: 'astera-core', type: 'Package', status: 'Active' },
                  { id: '2', name: 'lumina-ui', type: 'Library', status: 'Active' },
                  { id: '3', name: 'telemetry-engine', type: 'Service', status: 'Active' },
                ]}
                columns={[
                  { key: 'name', header: 'Repository Name' },
                  { key: 'type', header: 'Type' },
                  { key: 'status', header: 'Status', render: (r) => <Badge variant="success" dot>{r.status}</Badge> },
                ]}
              />
              <div className="flex justify-end pt-2">
                <LuminaPagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
              </div>
            </section>

            {/* Calendar, File Trees, Drag-Drop & Skeletons */}
            <section className="p-6 bg-[#11131b] border border-[#272d40] rounded-2xl space-y-6">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                Calendar, File Tree, Dropzone & Loading Skeletons
              </h2>
              <div className="grid grid-cols-3 gap-6 items-start">
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-300">Calendar & Picker</div>
                  <LuminaDatePicker />
                  <LuminaCalendar />
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-300">Collapsible File Tree</div>
                  <div className="p-3 bg-[#090a0f] border border-[#272d40] rounded-xl">
                    <LuminaTreeView
                      items={[
                        {
                          id: 'f1',
                          name: 'src',
                          type: 'folder',
                          children: [
                            { id: 'f2', name: 'App.tsx', type: 'file' },
                            { id: 'f3', name: 'main.tsx', type: 'file' },
                          ],
                        },
                      ]}
                    />
                  </div>

                  <div className="text-xs font-bold text-slate-300 pt-2">Skeleton & Spinner</div>
                  <div className="space-y-2">
                    <LuminaSkeleton className="h-4 w-full" />
                    <LuminaSkeleton className="h-4 w-3/4" />
                    <LuminaLoadingSpinner label="Compiling AST..." />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-300">Drag & Drop Upload Zone</div>
                  <LuminaFileUpload />
                  <LuminaEmptyState
                    title="No Items Selected"
                    description="Select a component primitive to inspect its properties."
                    icon={<FileText className="w-5 h-5 text-indigo-400" />}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-[#272d40]/60 space-y-4">
                <LuminaTabs tabs={[{ id: 't1', label: 'Overview', badge: '12' }, { id: 't2', label: 'API Specs' }, { id: 't3', label: 'Logs' }]} />
                <LuminaAccordion items={[{ id: 'a1', title: 'What is Lumina UI?', content: 'Lumina UI is Astera’s open-source UI component reference library.' }]} />
              </div>
            </section>
          </div>
        )}

        {/* Category: Application Blocks */}
        {activeCategory === 'blocks' && (
          <div className="space-y-6 max-w-6xl mx-auto pb-12">
            {/* Block Sub Navigation */}
            <div className="flex bg-[#11131b] border border-[#272d40] p-1 rounded-xl gap-1 w-fit">
              {(['dashboard', 'landing', 'auth', 'settings', 'pricing', 'admin'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setActiveBlock(b)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                    activeBlock === b ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {b} Block
                </button>
              ))}
            </div>

            {/* Active Rendered Block */}
            {activeBlock === 'dashboard' && <DashboardBlock />}
            {activeBlock === 'landing' && <LandingBlock />}
            {activeBlock === 'auth' && <AuthBlock />}
            {activeBlock === 'settings' && <SettingsBlock />}
            {activeBlock === 'pricing' && <PricingBlock />}
            {activeBlock === 'admin' && <AdminBlock />}
          </div>
        )}

        {/* Category: Interactive Playground */}
        {activeCategory === 'playground' && (
          <div className="max-w-5xl mx-auto pb-12">
            <Playground />
          </div>
        )}
      </div>
    </div>
  );
};
