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
  const holdings