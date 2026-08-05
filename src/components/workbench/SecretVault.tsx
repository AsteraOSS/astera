import React, { useState } from 'react';
import { Key, Lock, Eye, EyeOff, Copy, Plus, Trash2, ShieldCheck, Search } from 'lucide-react';
import { useVaultStore, useToastStore } from '@/store/useStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Environment } from '@/types';

export const SecretVault: React.FC = () => {
  const { secrets, addSecret, deleteSecret } = useVaultStore();
  const { addToast } = useToastStore();
  const [filter, setFilter] = useState('');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newEnv, setNewEnv] = useState<Environment>('production');

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = async (val: string, keyName: string) => {
    await navigator.clipboard.writeText(val);
    addToast({
      title: 'Secret Copied',
      description: `Copied value of [${keyName}] to clipboard.`,
      type: 'info',
    });
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey || !newValue) return;
    addSecret(newKey, newValue, newEnv);
    setNewKey('');
    setNewValue('');
    setIsAddModalOpen(false);
  };

  const filteredSecrets = secrets.filter(
    (s) =>
      s.key.toLowerCase().includes(filter.toLowerCase()) ||
      s.environment.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-[#090a0f] overflow-hidden select-none">
      {/* Top Header */}
      <div className="p-4 bg-[#0d0e14] border-b border-[#272d40] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-100 font-sans">Encrypted KMS Secret Vault</h2>
            <p className="text-[11px] text-slate-400">
              AES-256-GCM encrypted environment variables with zero-knowledge storage
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search keys or env..."
            leftIcon={<Search className="w-3.5 h-3.5" />}
            className="w-56"
          />
          <Button
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            variant="primary"
            size="sm"
          >
            New Secret
          </Button>
        </div>
      </div>

      {/* Secret List */}
      <div className="flex-1 p-6 overflow-y-auto space-y-3 bg-[#0b0c12]">
        {filteredSecrets.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            No secret variables matching your filter.
          </div>
        ) : (
          filteredSecrets.map((sec) => {
            const isRevealed = revealedIds[sec.id];
            return (
              <div
                key={sec.id}
                className="p-4 bg-[#11131b] border border-[#272d40] rounded-xl flex items-center justify-between hover:border-[#3b4460] transition-all shadow-sm"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-2 rounded-lg bg-[#161924] border border-[#272d40] text-rose-400">
                    <Key className="w-4 h-4" />
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-100 tracking-wide">
                        {sec.key}
                      </span>
                      <Badge
                        variant={
                          sec.environment === 'production'
                            ? 'error'
                            : sec.environment === 'staging'
                            ? 'warning'
                            : 'info'
                        }
                      >
                        {sec.environment}
                      </Badge>
                      <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" /> AES-256
                      </span>
                    </div>

                    {/* Masked / Unmasked Value */}
                    <div className="font-mono text-xs text-slate-400 bg-[#0d0e14] px-3 py-1.5 rounded-lg border border-[#272d40] inline-block max-w-lg truncate">
                      {isRevealed ? sec.value : '••••••••••••••••••••••••••••••••••••'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleReveal(sec.id)}
                    className="p-2 text-slate-400 hover:text-slate-200 bg-[#161924] border border-[#272d40] rounded-lg transition-colors"
                    title={isRevealed ? 'Mask secret' : 'Reveal secret'}
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => handleCopy(sec.value, sec.key)}
                    className="p-2 text-slate-400 hover:text-slate-200 bg-[#161924] border border-[#272d40] rounded-lg transition-colors"
                    title="Copy value"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteSecret(sec.id)}
                    className="p-2 text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg transition-colors"
                    title="Delete secret"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Secret Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Encrypted Secret"
        description="Store a new environment key securely in Astera KMS"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 font-sans block mb-1">
              Secret Key Name
            </label>
            <Input
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="e.g. STRIPE_SECRET_KEY"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 font-sans block mb-1">
              Secret Value
            </label>
            <textarea
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Paste value here..."
              required
              className="w-full bg-[#11131b] border border-[#272d40] rounded-lg p-2.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-indigo-500"
              rows={3}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 font-sans block mb-1">
              Environment Target
            </label>
            <select
              value={newEnv}
              onChange={(e) => setNewEnv(e.target.value as Environment)}
              className="w-full bg-[#11131b] border border-[#272d40] text-xs text-slate-200 font-mono rounded-lg p-2 focus:outline-none focus:border-indigo-500"
            >
              <option value="production">Production</option>
              <option value="staging">Staging</option>
              <option value="development">Development</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Encrypt & Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
