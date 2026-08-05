import React, { useState } from 'react';
import { Folder, FolderOpen, FileCode, ChevronRight } from 'lucide-react';
import { TreeItem } from '@/lumina/types';

export const LuminaTreeView: React.FC<{ items: TreeItem[] }> = ({ items }) => {
  return (
    <div className="font-mono text-xs space-y-0.5 select-none">
      {items.map((item) => (
        <TreeNode key={item.id} item={item} />
      ))}
    </div>
  );
};

const TreeNode: React.FC<{ item: TreeItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (item.type === 'file') {
    return (
      <div className="flex items-center gap-2 px-2 py-1 rounded text-slate-400 hover:text-slate-200 hover:bg-[#161924] cursor-pointer transition-colors">
        <FileCode className="w-3.5 h-3.5 text-indigo-400" />
        <span>{item.name}</span>
      </div>
    );
  }

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1 rounded text-slate-200 hover:bg-[#161924] cursor-pointer transition-colors font-semibold"
      >
        <ChevronRight className={`w-3 h-3 text-slate-500 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        {isOpen ? (
          <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
        ) : (
          <Folder className="w-3.5 h-3.5 text-amber-400" />
        )}
        <span>{item.name}</span>
      </div>
      {isOpen && item.children && (
        <div className="pl-4 border-l border-[#272d40] ml-3.5 my-0.5 space-y-0.5">
          {item.children.map((child) => (
            <TreeNode key={child.id} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};
