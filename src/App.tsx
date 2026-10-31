import React, { useState } from 'react';
import { Sidebar, Topbar } from './components/Navigation';
import { FileUploader } from './components/FileUploader';
import Overview from './views/Overview';
import IncomeExpenses from './views/IncomeExpenses';
import Budget from './views/Budget';
import Investments from './views/Investments';
import Goals from './views/Goals';
import { View, TimeRange, GlobalFilterRange, AccountFilter, Transaction, BudgetCategory, InvestmentHolding, FinancialGoal } from './types';
import { MOCK_TRANSACTIONS, MOCK_BUDGETS, MOCK_HOLDINGS, MOCK_GOALS } from './constants';

const App: React.FC = () => {
  const [hasData, setHasData] = useState(false);
  const [currentView, setCurrentView] = useState<View>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Dashboard Data State
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<BudgetCategory[]>([]);
  const [holdings, setHoldings] = useState<InvestmentHolding[]>([]);
  const [goals, setGoals] = useState<FinancialGoal[]>([]);

  // Dashboard Filters State
  const [overviewTimeRange, setOverviewTimeRange] = useState<TimeRange>('MTD');
  const [filters, setFilters] = useState<{range: GlobalFilterRange; account: AccountFilter}>({
    range: 'Last 3 Months',
    account: 'All Accounts'
  });

  const handleFilterChange = (type: 'range' | 'account', value: string) => {
    setFilters(prev => ({...prev, [type]: value}));
  };

  const handleDataLoaded = (data: { transactions: Transaction[], budgets: BudgetCategory[], holdings: InvestmentHolding[], goals: FinancialGoal[] }) => {
    setTransactions(data.transactions);
    setBudgets(data.budgets);
    setHoldings(data.holdings);
    setGoal