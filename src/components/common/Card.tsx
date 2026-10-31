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

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div
    className={`bg-white rounded-2xl shadow-soft border border-slate-100 p-6 ${className} hover:shadow-lg transition-shadow duration-300`}
  >
    {children}
  </div>
);

export const Badge: React.FC<{
  type: 'success' | 'warning' | 'danger' | 'neutral';
  children: React.ReactNode;
}> = ({ type, children }) => {
  const styles = {
    success: 'bg-green-100 text-green-700 ring-1 ring-green-200',
    warning: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
    danger: 'bg-red-100 text-red-700 ring-1 ring-red-200',
    neutral: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[type]}`}>
      {children}
    </span>
  );
};
