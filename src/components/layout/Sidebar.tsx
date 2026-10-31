import React from 'react';
import {
  Home,
  PieChart,
  Wallet,
  Target,
  Settings,
  ChevronLeft,
  Building2,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { View, GlobalFilterRange, AccountFilter } from '../../types';

interface SidebarProps {
  currentView: View;
  onChangeView: (view: View) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  filters: {
    range: GlobalFilterRange;
    account: AccountFilter;
  };
  onFilterChange: (type: 'range' | 'account', value: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onChangeView,
  isOpen,
  toggleSidebar,
  filters,
  onFilterChange,
}) => {
  const navItems = [
    { id: 'overview', icon: Home, label: 'Overview' },
    { id: 'income-expenses', icon: Wallet, label: 'Income & Expenses' },
    { id: 'budget', icon: PieChart, label: 'Budget Tracking' },
    { id: 'investments', icon: TrendingUp, label: 'Investments' },
    { id: 'goals', icon: Target, label: 'Goals' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col ${
        isOpen ? 'w-72' : 'w-20'
      } shadow-xl`}
    >
      {/* Header */}
      <div className="h-20 flex items-center justify-center border-b border-slate-100 relative bg-gradient-to-r from-white to-slate-50">
        <div
          className={`font-bold text-2xl text-opus-blue transition-opacity duration-200 tracking-tight flex items-center ${
            isOpen ? 'opacity-100' : 'opacity-0 hidden'
          }`}
        >
          Opus<span className="text-opus-dark ml-1">Finance</span>
        </div>
        {!isOpen && <div className="font-bold text-2xl text-opus-blue">O</div>}

        <button
          onClick={toggleSidebar}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          className="absolute -right-3 top-8 bg-white border border-slate-200 rounded-full p-1.5 hover:bg-slate-50 text-slate-500 shadow-sm z-50"
        >
          <ChevronLeft
            size={14}
            className={`transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-8 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id as View)}
              className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                isActive
                  ? 'bg-opus-blue text-white shadow-glow'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-opus-blue'
              }`