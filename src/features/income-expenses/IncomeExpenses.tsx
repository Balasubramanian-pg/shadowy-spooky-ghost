import React, { useState, useMemo, useEffect } from 'react';
import { Card, SectionHeader, Badge } from '@/components/Shared';
import { COLORS, GLASS_TOOLTIP_STYLE } from '@/constants';
import { ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { formatINR, formatCompactINR } from '@/utils';
import { 
    TrendingUp, PieChart as PieIcon, X, Wallet, Search, Download, Filter, 
    RefreshCcw, Clock, CheckCircle, ShoppingBag, Utensils, Car, Zap, 
    Clapperboard, Briefcase, MoreHorizontal
} from 'lucide-react';
import { AccountFilter, GlobalFilterRange, Transaction } from '@/types';

interface IncomeExpensesProps {
  filters: {
    range: GlobalFilterRange;
    account: AccountFilter;
  };
  data: Transaction[];
}

type TagFilterType = 'All' | 'Recurring' | 'One-time' | 'Pending';

const TableSkeleton = () => (
  <div className="animate-pulse space-y-4">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="flex justify-between items-center py-3 border-b border-slate-50">
         <div className="flex items-center space-x-3 w-1/2">
             <div className="h-10 w-10 bg-slate-100 rounded-full"></div>
             <div className="space-y-2 w-full">
                 <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                 <div className="h-3 bg-slate-100 rounded w-1/4"></div>
             </div>
         </div>
         <div className="h-5 bg-slate-100 rounded w-20"></div>
      </div>
    ))}
  </div>
);

const IncomeExpenses: React.FC<IncomeExpensesProps> = ({ filters, data: transactions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tagFilter, setTagFilter] = useState<TagFilterType>('All');
  const [loading, setLoading] = useState(true);
  const [hiddenCategories, setHiddenCategories] = useState<string[]>([]); 

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const getCategoryIcon = (category: string) => {
      switch(category) {
          case 'Groceries': return <ShoppingBag size={18} className="text-emerald-500 bg-emerald-50 p-1.5 rounded-lg mr-3 shrink-0 w-8 h-8" />;
          case 'Food': return <Utensils size={18} className="text-orange-500 bg-orange-50 p-1.5 rounded-lg mr-3 shrink-0 w-8 h-8" />;
          case 'Transport': return <Car size={18} className="text-blue-500 bg-blue-50 p-1.5 rounded-lg mr-3 shrink-0 w-8 h-8" />;
          case 'Utilities': return <Zap size={18} className="text-yellow-500 bg-yellow-50 p-1.5 rounded-lg mr-3 shrink-0 w-8 h-8" />;
          case 'Entertainment': return <Clapperboard size={18} className="text-purple-500 bg-purple-50 p-1.5 rounded-lg mr-3 shrink-0 w-8 h-8" />;
          case 'Shopping': return <ShoppingBag size={18} className="text-pink-500 bg-pink-50 p-1.5 rounded-lg mr-3 shrink-0 w-8 h-8" />;
          case 'Income': return <Briefcase size={18} className="text-slate-600 bg-slate-100 p-1.5 rounded-lg mr-3 shrink-0 w-8 h-8" />;
          default: return <Wallet size={18} className="text-slate-500 bg-slate-50 p-1.5 rounded-lg mr-3 shrink-0 w-8 h-8" />;
      }
  };

  const uniqueDescriptions = useMemo(() => {
    const descriptions = new Set(transactions.map(tx => tx.description));
    return Array.from(descriptions);
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      if (filters.account !== 'All Accounts' && tx.account !== filters.account) return false;
      if (searchTerm && !tx.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (tagFilter === 'Recurring' && !tx.isRecurring) return false;
      if (tagFilter === 'One-time' && tx.isRecurring) return false;
      if (tagFilter === 'Pending' && tx.status !== 'pending') return false;
      return true;
    });
  }, [filters.account, searchTerm, tagFilter, transactions]);

  const groupedTransactions = useMemo(() => {
      const groups: Record<string, Transaction[]> = {};
      const today = new Date();
      const yesterday = new Date(); yesterday.setDate(today.getDate() - 1);

      filteredTransactions.slice(0, 50).forEach(tx => {
          const date = new Date(tx.date);
          let key = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          if (date.toDateString() === today.toDateString()) key = "Today";
          else if (date.toDateString() === yesterday.toDateString()) key = "Yesterday";
          if (!groups[key]) groups[key] = [];
          groups[key].push(tx);
      });
      return groups;
  }, [filteredTransactions]);

  const handleExportCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Account', 'Amount', 'Type', 'Status'];
    const rows = filteredTransactions.map(tx => [
      tx.date, `"${tx.description}"`, tx.category, tx.account, tx.amount, tx.type, tx.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dynamically calculate trend data based on transactions
  const trendData = useMemo(() => {
     // Group by month
     const months: Record<string, { income: number, expenses: number }> = {};
     transactions.forEach(tx => {
         const d = new Date(tx.date);
         const key = d.toLocaleString('default', { month: 'short' });
         if (!months[key]) months[key] = { income: 0, expenses: 0 };
         if (tx.type === 'income') months[key].income += tx.amount;
         else months[key].expenses += tx.amount;
     });
     
     // Ensure order
     const orderedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
     return orderedMonths.map(m => ({
         name: m,
         income: months[m]?.income || 0,
         expenses: months[m]?.expenses || 0,
         get net() { return this.income - this.expenses }
     })).filter(d => d.income > 0 || d.expenses > 0); // Only show active months if realistic data, or default mock fallback?
  }, [transactions]);
  
  // If no trend data (e.g. fresh upload with no history), show empty or placeholder?
  // For demo, we might want to keep the chart existing but empty, or fallback to something.
  // For now, let's just use what we calculated.

  const totalNet = trendData.reduce((acc, curr) => acc + (curr.income - curr.expenses), 0);
  
  // Aggregate Expenses for Pie
  const rawPieData = useMemo(() => {
      const cats: Record<string, number> = {};
      transactions.filter(t => t.type === 'expense').forEach(t => {
          cats[t.category] = (cats[t.category] || 0) + t.amount;
      });
      return Object.entries(cats).map(([name, value], i) => ({
          name, value, fill: COLORS.charts[i % COLORS.charts.length]
      }));
  }, [transactions]);

  const pieData = rawPieData.filter(d => !hiddenCategories.includes(d.name));
  const toggleCategory = (name: string) => {
      setHiddenCategories(prev => prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]);
  };

  const CustomTrendTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
          const inc = payload.find((p: any) => p.dataKey === 'income')?.value || 0;
          const exp = payload.find((p: any) => p.dataKey === 'expenses')?.value || 0;
          const net = inc - exp;
          
          return (
              <div style={GLASS_TOOLTIP_STYLE} className="min-w-[180px]">
                  <p className="text-xs font-bold text-slate-400 mb-2">{label}</p>
                  <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                          <span className="text-emerald-600 font-medium">Income</span>
                          <span className="font-bold text-slate-700">{formatCompactINR(inc)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                          <span className="text-slate-500 font-medium">Expenses</span>
                          <span className="font-bold text-slate-700">{formatCompactINR(exp)}</span>
                      </div>
                      <div className="h-px bg-slate-200 my-1"></div>
                      <div className="flex justify-between text-sm">
                          <span className="text-opus-blue font-bold">Net Savings</span>
                          <span className={`font-bold ${net >= 0 ? 'text-opus-blue' : 'text-opus-red'}`}>
                              {net > 0 ? '+' : ''}{formatCompactINR(net)}
                          </span>
                      </div>
                  </div>
              </div>
          );
      }
      return null;
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      <Card>
        <SectionHeader 
            title="Income vs Expenses Trend" 
            subtitle="Monthly financial performance" 
            icon={TrendingUp} 
            action={
                 <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                     <span className="text-xs font-bold text-slate-400 uppercase">Total Net</span>
                     <span className={`text-sm font-bold ${totalNet >= 0 ? 'text-opus-blue' : 'text-opus-red'}`}>
                        {totalNet > 0 ? '+' : ''}{formatCompactINR(totalNet)}
                     </span>
                 </div>
            }
        />
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={trendData} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
              <CartesianGrid stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontWeight: 500}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} tickFormatter={formatCompactINR} />
              <Tooltip content={<CustomTrendTooltip />} cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="expenses" barSize={24} fill={COLORS.gray} radius={[6, 6, 0, 0]} fillOpacity={0.6} />
              <Line type="monotone" dataKey="income" stroke={COLORS.green} strokeWidth={4} dot={{r: 4, strokeWidth: 2, fill: '#fff'}} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <div className="flex justify-between items-start mb-6">
             <SectionHeader title="Expense Breakdown" subtitle="Distribution by category" icon={PieIcon} />
             {hiddenCategories.length > 0 && (
                 <button onClick={() => setHiddenCategories([])} className="text-xs font-medium text-opus-blue hover:underline">
                     Reset View
                 </button>
             )}
          </div>
          <div className="h-80 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  animationDuration={1000}
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
          