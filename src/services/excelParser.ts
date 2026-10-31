/**
 * Excel Parsing and Validation Service
 * Extracts and maps worksheets ('Transactions', 'Budget', 'Investments', 'Goals')
 */

import { read, utils } from 'xlsx';
import { Transaction, BudgetCategory, InvestmentHolding, FinancialGoal, DashboardDataset } from '../types';

export interface RawWorkbookInput {
  Transactions?: any[];
  Budget?: any[];
  Investments?: any[];
  Goals?: any[];
}

export const parseWorkbookData = (workbookSheets: RawWorkbookInput): DashboardDataset => {
  const transactionsRaw = workbookSheets['Transactions'] || [];
  const budgetsRaw = workbookSheets['Budget'] || [];
  const holdingsRaw = workbookSheets['Investments'] || [];
  const goalsRaw = workbookSheets['Goals'] || [];

  if (transactionsRaw.length === 0 && budgetsRaw.length === 0) {
    throw new Error(
      "Could not find valid data. Please ensure worksheets are named 'Transactions', 'Budget', 'Investments', and 'Goals'."
    );
  }

  // Map & validate transactions
  const transactions: Transaction[] = transactionsRaw.map((t: any, i: number) => ({
    id: t.id || `tx-${i}`,
    date: t.date ? String(t.date) : new Date().toISOString().split('T')[0],
    description: t.description ? String(t.description) : 'Unknown',
    category: t.category ? String(t.category) : 'Misc',
    account: t.account ? String(t.account) : 'Cash',
    amount: Math.abs(Number(t.amount) || 0),
    type: (String(t.type).toLowerCase() === 'income') ? 'income' : 'expense',
    status: (String(t.status).toLowerCase() === 'pending') ? 'pending' : 'posted',
    isRecurring: t.isRecurring === true || String(t.isRecurring).toLowerCase() === 'true'
  }));

  // Map & validate budgets
  const budgets: BudgetCategory[] = budgetsRaw.map((b: any) => ({
    category: b.category ? String(b.category) : 'Misc',
    budget: Math.max(0, Number(b.budget) || 0),
    actual: Math.max(0, Number(b.actual) || 0),
    trend: Number(b.trend) || 0
  }));

  // Map & validate investment holdings
  const holdings: InvestmentHolding[] = holdingsRaw.map((h: any) => ({
    ticker: h.ticker ? String(h.ticker).toUpperCase() : 'UNKNOWN',
    name: h.name ? String(h.name) : 'Unknown Asset',
    shares: Math.max(0, Number(h.shares) || 0),
    costBasis: Math.max(0, Number(h.costBasis) || 0),
    currentPrice: Math.max(0, Number(h.currentPrice) || 0),
    allocation: 0
  }));

  // Calculate allocations based on current total portfolio value
  const totalPortfolioValue = holdings.reduce((sum, h) => sum + (h.shares * h.currentPrice), 0);
  holdings.forEach(h => {
    h.allocation = totalPortfolioValue > 0 ? Number((((h.shares * h.currentPrice) / totalPortfolioValue) * 100).toFixed(2)) : 0;
  });

  // Map & validate financial goals
  const goals: FinancialGoal[] = goalsRaw.map((g: any, i: number) => {
    const rawPriority = String(g.priority || 'medium').toLowerCase();
    const priority: 'high' | 'medium' | 'low' = (rawPriority === 'high' || rawPriority === 'low') ? rawPriority : 'medium';
    return {
      id: g.id || `g-${i}`,
      name: g.name ? String(g.name) : `Goal ${i + 1}`,
      targetAmount: Math.max(0, Number(g.targetAmount) || 0),
      currentAmount: Math.max(0, Number(g.currentAmount) || 0),
      monthlyContribution: Math.max(0, Number(g.monthlyContribution) || 0),
      targetDate: g.targetDate ? String(g.targetDate) : '2025-12-31',
      priority
    };
  });

  return {
    transactions,
    budgets,
    holdings,
    goals
  };
};

export const parseExcelFile = async (file: File): Promise<DashboardDataset> => {
  const data = await file.arrayBuffer();
  const workbook = read(data);
  const rawData: RawWorkbookInput = {
    Transactions: utils.sheet_to_json(workbook.Sheets['Transactions'] || {}),
    Budget: utils.sheet_to_json(workbook.Sheets['Budget'] || {}),
    Investments: utils.sheet_to_json(workbook.Sheets['Investments'] || {}),
    Goals: utils.sheet_to_json(workbook.Sheets['Goals'] || {})
  };

  return parseWorkbookData(rawData);
};
