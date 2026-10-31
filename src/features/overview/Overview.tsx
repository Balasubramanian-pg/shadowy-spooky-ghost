import React, { useMemo } from 'react';
import { KPICard, SectionHeader, Card } from '@/components/Shared';
import { COLORS, GLASS_TOOLTIP_STYLE } from '@/constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, LabelList } from 'recharts';
import { TimeRange, KPIMetric, Transaction, FinancialGoal } from '@/types';
import { formatINR, formatCompactINR } from '@/utils';
import { BarChart2, Bell, Download } from 'lucide-react';

interface OverviewProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  transactions: Transaction[];
  goals: FinancialGoal[];
}

const Overview: React.FC<OverviewProps> = ({ timeRange, onTimeRangeChange, transactions, goals }) => {
  
  // Calculate KPIs dynamically
  const kpis = useMemo(() => {
    // 1. Calculate Net Worth (Simplified: Sum of Income - Sum of Expense across history, assuming starting 0 for demo)
    // In a real app, this would come from an Account balance sheet. We will simulate it.
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const simulatedNetWorth = 40000000 + (totalIncome - totalExpense); // Start with base

    // 2. Savings Rate (Income vs Expense)
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

    // 3. Cash Flow (Income vs Expense this month)
    // Simplified logic: just taking total for now to prevent date parsing complexity bugs in this step
    const cashFlow = totalIncome - totalExpense;

    return [
        { title: "Net Worth", value: simulatedNetWorth, subValue: "Est. Total Assets", change: 5.2, trend: [420, 435, 450, 465, 482], type: 'currency', color: 'blue' },
        { title: "Savings Rate", value: savingsRate, subValue: "Target: 20%", change: 2.1, trend: [18, 20, 22, 19, 24], type: 'percent', color: 'teal' },
        { title: "Net Cash Flow", value: cashFlow, subValue: "Total Period", change: 8.4, trend: [2500, 1200, 3000, 2800, 3240], type: 'currency', color: 'green' },
        { title: "Active Goals", value: goals.length, subValue: `${goals.filter(g => g.priority === 'high').length} High Priority`, change: 0, trend: [2, 2, 3, 3, 3], type: 'count', color: 'amber' }
    ] as KPIMetric[];
  }, [transactions, goals]);

  // Aggregate Data for Chart
  const cashFlowData = useMemo(() => {
      const inc = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const exp = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
      // Mock split for fixed/variable
      const fixed = Math.round(exp * 0.6);
      const variable = Math.round(exp * 0.4);
      const savings = Math.max(0, inc - exp);

      return [
        { name: 'Income', value: inc, type: 'income' },
        { name: 'Fixed', value: fixed, type: 'expense' },
        { name: 'Variable', value: variable, type: 'expense' },
        { name: 'Savings', value: savings, type: 'save' },
      ];
  }, [transactions]);


  const getColor = (type: string) => {
    switch(type) {
      case 'income': return COLORS.green;
      case 'expense': return COLORS.gray; 
      case 'save': return COLORS.teal;
      case 'invest': return COLORS.blue;
      default: return COLORS.gray;
    }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Category,Type,Amount\n" 
      + cashFlowData.map(c => [c.name, c.type, c.value].join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "overview_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      {/* Top Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-slate-700">Performance Summary</h2>
        </div>
        
        {/* Modern Pill Toggle */}
        <div className="bg-white p-1 rounded-full border border-slate-200 shadow-sm flex space-x-1">
          {['Weekly', 'MTD', 'QTD', 'YTD'].map((range) => (
            <button
              key={range}
              onClick={() => onTimeRangeChange(range as TimeRange)}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                timeRange === range 
                  ? 'bg-opus-blue text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-50 hover:t