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

      <div