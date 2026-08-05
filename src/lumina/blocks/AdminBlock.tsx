import { LuminaDataGrid } from '@/lumina/components/DataGrid';
import { Badge } from '@/components/ui/Badge';
import { Server, ShieldCheck, UserCheck } from 'lucide-react';

export const AdminBlock: React.FC = () => {
  const users = [
    { id: '1', name: 'Alex Rivera', role: 'Staff Engineer', email: 'alex@astera.dev', status: 'ACTIVE' },
    { id: '2', name: 'Elena Rostova', role: 'Security Architect', email: 'elena@astera.dev', status: 'ACTIVE' },
    { id: '3', name: 'Marcus Chen', role: 'DevOps Lead', email: 'marcus@astera.dev', status: 'ACTIVE' },
    { id: '4', name: 'Sarah Jenkins', role: 'Product Manager', email: 'sarah@astera.dev', status: 'ACTIVE' },
  ];

  return (
    <div className="p-6 bg-[#090a0f] border border-[#272d40] rounded-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-100 font-sans">Fleet Administration Console</h2>
          <p className="text-xs text-slate-400">User permissions, node health, and audit logs</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="success" dot>Cluster: 48 Nodes Healthy</Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-[#11131b] border border-[#272d40] rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400"><UserCheck className="w-5 h-5" /></div>
          <div><div className="text-lg font-bold font-mono text-slate-100">4 Active Admins</div><div className="text-[11px] text-slate-500">MFA Enforced</div></div>
        </div>
        <div className="p-4 bg-[#11131b] border border-[#272d40] rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400"><Server className="w-5 h-5" /></div>
          <div><div className="text-lg font-bold font-mono text-slate-100">48 K8s Nodes</div><div className="text-[11px] text-slate-500">us-east-1 Cluster</div></div>
        </div>
        <div className="p-4 bg-[#11131b] border border-[#272d40] rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400"><ShieldCheck className="w-5 h-5" /></div>
          <div><div className="text-lg font-bold font-mono text-slate-100">SOC2 Type II</div><div className="text-[11px] text-slate-500">Audit Compliant</div></div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-300 font-sans">Organization Members</h3>
        <LuminaDataGrid
          data={users}
          columns={[
            { key: 'name', header: 'User Name' },
            { key: 'role', header: 'Role' },
            { key: 'email', header: 'Email' },
            { key: 'status', header: 'Status', render: (r) => <Badge variant="success" dot>{r.status}</Badge> },
          ]}
        />
      </div>
    </div>
  );
};
