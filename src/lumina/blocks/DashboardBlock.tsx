import { StatCard } from '@/lumina/components/Cards';
import { SparklineChart, BarChart } from '@/lumina/components/Charts';
import { Users, Activity, DollarSign, Server, Download, Filter } from 'lucide-react';
import { LuminaButton } from '@/lumina/components/Buttons';

export const DashboardBlock: React.FC = () => {
  const chartData = [
    { label: 'Mon', value: 340 },
    { label: 'Tue', value: 580 },
    { label: 'Wed', value: 720 },
    { label: 'Thu', value: 910 },
    { label: 'Fri', value: 840 },
    { label: 'Sat', value: 650 },
    { label: 'Sun', value: 980 },
  ];

  return (
    <div className="p-6 bg-[#090a0f] space-y-6 rounded-2xl border border-[#272d40]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-100 font-sans tracking-tight">
            Executive Analytics Dashboard
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Real-time metrics for astera-fleet-prod cluster</p>
        </div>
        <div className="flex gap-2">
          <LuminaButton variant="outline" size="sm" leftIcon={<Filter className="w-3.5 h-3.5" />}>
            Filter Range
          </LuminaButton>
          <LuminaButton variant="primary" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export Report
          </LuminaButton>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Total Monthly Revenue"
          value="$148,290.00"
          change="+14.2%"
          isPositive
          icon={<DollarSign className="w-4 h-4" />}
          subtitle="Compared to last month"
        />
        <StatCard
          title="Active API Developers"
          value="24,910"
          change="+8.4%"
          isPositive
          icon={<Users className="w-4 h-4" />}
          subtitle="4,210 online today"
        />
        <StatCard
          title="P99 Cluster Latency"
          value="4.2ms"
          change="-2.1ms"
          isPositive
          icon={<Activity className="w-4 h-4" />}
          subtitle="Optimal SLA threshold"
        />
        <StatCard
          title="Cluster Nodes Online"
          value="48 / 48"
          change="100%"
          isPositive
          icon={<Server className="w-4 h-4" />}
          subtitle="0 degraded nodes"
        />
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 p-5 bg-[#11131b] border border-[#272d40] rounded-xl space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-200 font-sans">Weekly API Traffic Volume</h3>
            <span className="text-xs font-mono text-indigo-400 font-semibold">5,020,410 Requests</span>
          </div>
          <BarChart data={chartData} />
        </div>

        <div className="p-5 bg-[#11131b] border border-[#272d40] rounded-xl space-y-4">
          <h3 className="text-xs font-bold text-slate-200 font-sans">Sub-millisecond Sparkline</h3>
          <div className="space-y-1">
            <div className="text-2xl font-bold font-mono text-emerald-400">99.998%</div>
            <p className="text-[11px] text-slate-500 font-mono">Uptime SLO guarantee</p>
          </div>
          <SparklineChart data={[40, 55, 60, 45, 75, 80, 95, 90, 100]} color="#10b981" height={60} />
        </div>
      </div>
    </div>
  );
};
