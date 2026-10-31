import { KPIMetric, Transaction, BudgetCategory, InvestmentHolding, FinancialGoal } from '../types';

// Palette Reference
export const COLORS = {
  blue: '#2563EB',
  teal: '#0D9488',
  green: '#16A34A',
  amber: '#F59E0B',
  red: '#DC2626',
  dark: '#0F172A',
  gray: '#64748B',
  lightGray: '#F1F5F9',
  white: '#FFFFFF',
  charts: ['#2563EB', '#0D9488', '#F59E0B', '#DC2626', '#16A34A', '#7C3AED', '#DB2777']
};

export const GLASS_TOOLTIP_STYLE = {
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  borderRadius: '12px',
  boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
  padding: '8px 12px',
  outline: 'none'
};

export const MOCK_KPIS: KPIMetric[] = [
  { title: "Net Worth", value: 40550000, subValue: "+₹12.4L YoY", change: 5.2, trend: [420, 435, 450, 465, 482], type: 'currency', color: 'blue' },
  { title: "Savings Rate", value: 24.5, subValue: "Target: 20%", change: 2.1, trend: [18, 20, 22, 19, 24], type: 'percent', color: 'teal' },
  { title: "Cash Flow (MTD)", value: 275000, subValue: "Safe", change: 8.4, trend: [2500, 1200, 3000, 2800, 3240], type: 'currency', color: 'green' },
  { title: "Inv. Returns (YTD)", value: 11.2, subValue: "Nifty: 9.8%", change: -0.5, trend: [2, 4, 8, 10, 11], type: 'percent', color: 'amber' }
];

export const MOCK_TRANSACTIONS: Transaction[] = Array.from({ length: 50 }).map((_, i) => {
  const isRecurring = Math.random() > 0.7; // 30% recurring
  const isPending = i < 4; // First 4 are pending
  return {
    id: `tx-${i}`,
    date: new Date(2023, 9, 30 - i).toISOString().split('T')[0],
    description: ['JioMart', 'Netflix Subscription', 'Indian Oil', 'Salary Deposit', 'Adani Electricity', 'Amazon India', 'Zerodha Fund Add'][Math.floor(Math.random() * 7)],
    category: ['Groceries', 'Entertainment', 'Transport', 'Income', 'Utilities', 'Shopping', 'Investments'][Math.floor(Math.random() * 7)],
    account: ['ICICI Bank', 'Federal Bank'][Math.floor(Math.random() * 2)],
    amount: Math.floor(Math.random() * 25000)