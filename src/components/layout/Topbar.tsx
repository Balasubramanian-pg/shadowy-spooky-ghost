import React from 'react';
import { Download } from 'lucide-react';

interface TopbarProps {
  title: string;
}

export const Topbar: React.FC<TopbarProps> = ({ title }) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-slate-800 capitalize tracking-tight">
          {title.replace('-', ' & ')}
        </h1>
        <span className="mx-3 text-slate-300 text-xl font-light">/</span>
        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          Oct 2023
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => window.print()}
          className="flex items-center px-4 py-2 text-sm font-semibold text-slate-600 hover:text-opus-blue bg-white border border-slate-200 hover:border-opus-blue hover:bg-blue-50/50 rounded-lg transition-all shadow-sm"
        >
          <Download size={16} className="mr-2" /> Export Report
        </button>
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-opus-blue to-indigo-600 text-white flex items-center justify-center font-bold text-sm ring-4 ring-blue-50 shadow-lg cursor-pointer hover:scale-105 transition-transform">
          JD
        </div>
      </div>
    </header>
  );
};

export default Topbar;
