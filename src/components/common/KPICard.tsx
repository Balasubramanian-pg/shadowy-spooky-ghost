import React from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, PiggyBank, Activity } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { KPIMetric as KPIInterface } from '../../types';
import { COLORS } from '../../constants';
import { formatINR } from '../../utils';

const useCountUp = (end: number, duration: number = 800) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(easeOut * end);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return count;
};

export const KPICard: React.FC<{ metric: KPIInterface }> = ({ metric }) => {
  const Icon = metric.title.includes('Net Worth')
    ? Wallet
    : metric.title.includes('Savings')
    ? PiggyBank
    : metric.title.includes('Cash Flow')
    ? Activity
    : TrendingUp;

  const trendData = metric.trend?.map((val, i) => ({ i, val })) || [];
  const isPositive = (metric.change || 0) >= 0;
  const animatedValue = useCountUp(metric.value);

  const displayValue =
    metric.type === 'currency' ? formatINR(animatedValue) : `${animatedValue.toFixed(1)}%`;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all duration-200 ease-out border border-slate-100 relative overflow-hidden group">
      <div
        className={`absolute -top-10 -right-10 w-40 h-40 bg-${metric.color}-500 rounded-full opacity-5 blur-3xl group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div
          className={`p-3 rounded-xl bg-${metric.color}-50 text-${metric.color}-600 ring-1 ring-${metric.color}-100`}
        >
          <Icon size={22} color={COLORS[metric.color] || COLORS.blue} strokeWidth={2} />
        </div>
        <div
          className={`flex items-center text-sm font-semibold px-2 py-1 rounded-full ${
            isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {isPositive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
          {Math.abs(metric.change || 0)}%
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="text-slate-500 text-sm font-medium mb-1 tracking-wide">{metric.title}</h3>
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{displayValue}</h2>
        </div>
        <p className="text-xs text-slate-400 mt-1 font-medium">{metric.subValue}</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id={`grad-${metric.title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS[metric.color] || COLORS.blue} stopOpacity={0.8} />
                <stop offset="95%" stopColor={COLORS[metric.color] || COLORS.blue} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="val"
              stroke={COLORS[metric.color] || COLORS.blue}
              fill={`url(#grad-${metric.title})`}
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KPICard;
