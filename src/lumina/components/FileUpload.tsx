import React, { useState } from 'react';
import { UploadCloud, File, CheckCircle2 } from 'lucide-react';

export const LuminaFileUpload: React.FC<{
  onUpload?: (files: File[]) => void;
}> = ({ onUpload }) => {
  const [fileList, setFileList] = useState<{ name: string; size: string }[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) {
      const files = Array.from(e.dataTransfer.files).map((f) => ({
        name: f.name,
        size: (f.size / 1024).toFixed(1) + ' KB',
      }));
      setFileList((prev) => [...prev, ...files]);
      onUpload?.(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div className="space-y-3 font-sans select-none">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="p-6 border-2 border-dashed border-[#272d40] hover:border-indigo-500/60 rounded-xl bg-[#11131b] text-center space-y-2 cursor-pointer transition-colors group"
      >
        <div className="p-3 w-12 h-12 rounded-full bg-[#161924] border border-[#272d40] mx-auto flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
          <UploadCloud className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-200">
            Drag & drop files here, or <span className="text-indigo-400">browse</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Supports JSON, SQL, TS, PNG (Max 25MB)</p>
        </div>
      </div>

      {fileList.length > 0 && (
        <div className="space-y-1.5 font-mono text-xs">
          {fileList.map((f, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 bg-[#161924] border border-[#272d40] rounded-lg text-slate-300"
            >
              <div className="flex items-center gap-2">
                <File className="w-3.5 h-3.5 text-indigo-400" />
                <span>{f.name}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span>{f.size}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
