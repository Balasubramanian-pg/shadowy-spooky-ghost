import React, { useEffect, useState } from 'react';
import { Card } from '@/components/Shared';
import { COLORS, GLASS_TOOLTIP_STYLE } from '@/constants';
import { Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, ComposedChart } from 'recharts';
import { Flag, Car, Home, Plane, Calculator, AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatINR, formatCompactINR } from '@/utils';
import { FinancialGoal } from '@/types';

interface GoalsProps {
    data: FinancialGoal[];
}

const Goals: React.FC<GoalsProps> = ({ data: goals }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Monte Carlo Mock (INR)
  const simulationData = Array.from({length: 30}).map((_, i) => ({
      year: 2023 + i,
      p10: 5000000 * Math.pow(1.08, i),
      p50: 5000000 * Math.pow(1.12, i),
      p90: 5000000 * Math.pow(1.15, i),
  }));

  const getIcon = (name: string) => {
      if (name.includes('Home')) return Home;
      if (name.includes('Car')) return Car;
      if (name.includes('Trip')) return Plane;
      return Flag;
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle size={16} className="text-opus-red ml-2" fill="currentColor" fillOpacity={0.1} />;
      case 'medium': return <AlertTriangle size={16} className="text-opus-amber ml-2" fill="currentColor" fillOpacity={0.1} />;
      case 'low': return <CheckCircle size={16} className="text-opus-green ml-2" fill="currentColor" fillOpacity={0.1} />;
      default: return null;
    }
  }

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Goal List */}
            <div className="space-y-6">
                {goals.map((goal) => {
                    const Icon = getIcon(goal.name);
                    const percent = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
                    
                    // Logic for status
                    // Simplistic "On Track" calculation: 
                    // If (Current + (Monthly * MonthsRemaining)) >= Target
                    const today = new Date();
                    const targetDate = new Date(goal.targetDate);
                    const monthsRemaining = Math.max(0, (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30));
                    const projectedAmount = goal.currentAmount + (goal.monthlyContribution * monthsRemaining);
                    const isOnTrack = projectedAmount >= goal.targetAmount;

                    let StatusIcon = CheckCircle;
                    let statusText = "On Track";
                    let statusColorClass = "bg-green-50 text-opus-green";

                    if (!isOnTrack) {
                        if (goal.priority === 'high') {
                            StatusIcon = AlertCircle;
                            statusText = "Off Track";
                            statusColorClass = "bg-red-50 text-opus-red";
                        } else {
                            StatusIcon = AlertTriangle;
                            statusText = "At Risk";
                            statusColorClass = "bg-amber-50 text-opus-amber";
                        }
                    }

                    return (
                        <Card key={goal.id} className="relative overflow-hidden hover:shadow-glow transition-all duration-300">
                             <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center">
                                    <div className="p-3.5 bg-blue-50 text-opus-blue rounded-xl mr-4 shadow-sm">
                                        <Icon size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center">
                                          <h3 className="font-bold text-slate-900 text-lg tracking-tight">{goal.name}</h3>
                                          {getPriorityIcon(goal.priority)}
                                        </div>
                                        <p className="text-sm text-slate-500 font-medium">Target: {goal.targetDate}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-slate-900">{formatINR(goal.currentAmount)}</div>
                                    <div className="text-xs text-slate-400 font-medium mt-1">of {formatINR(goal.targetAmount)}</div>
                                </div>
                             </div>

                             {/* Progress Bar */}
                           