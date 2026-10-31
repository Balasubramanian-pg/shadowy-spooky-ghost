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
   