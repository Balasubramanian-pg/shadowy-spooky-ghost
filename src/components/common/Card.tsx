import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ElementType;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  action,
  icon: Icon,
}) => (
  <div className="flex justify-between items-end mb-6">
    <div className="flex items-center space-x-3">
      {Icon && (
        <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
          <Icon size={18} />
        </div>
      )}
      <div>
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
    {action && <div>{action}</div>}
  </div>
);

export const Card: React.FC<{ children: React.R