/**
 * Financial Calculation Utilities
 * Reusable mathematical algorithms for savings rate, net worth, budget variances, and goal progress
 */

import { Transaction, BudgetCategory, InvestmentHolding, FinancialGoal } from '../types';

export const calculateTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + (t.amount || 0), 0);
};

export const calculateTotalExpenses = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + (t.amount || 0), 0);
};

export const calculateSavingsRate = (income: number, expenses: number): number => {
  if (income <= 0) return 0;
  const savings = income - expenses;
  if (savings <= 0) return 0;
  return Number(((savings / income) * 100).toFixed(1));
};

export const calculateBudgetUtilization = (budget: BudgetCategory): number => {
  if (!budget.budget || budget.budget <= 0) return 0;
  return Number(((budget.actual / budget.budget) * 100).toFixed(1));
};

export const calculatePortfolioValue = (holdings: InvestmentHolding[]): number => {
  return holdings.reduce((sum, h) => sum + (h.shares * h.currentPrice), 0);
};

export const calculatePortfolioGain = (holdings: InvestmentHolding[]): { gain: number; percentage: number } => {
  const currentTotal = holdings.reduce((sum, h) => sum + (h.shares * h.currentPrice), 0);
  const costTotal = holdings.reduce((sum, h) => sum + (h.shares * h.costBasis), 0);
  const gain = currentTotal - costTotal;
  const percentage = costTotal > 0 ? Number(((gain / costTotal) * 100).toFixed(2)) : 0;
  return { gain, percentage };
};

export const calculateGoalProgress = (goal: FinancialGoal): number => {
  if (!goal.targetAmount || goal.targetAmount <= 0) return 0;
  const pct = (goal.currentAmount / goal.targetAmount) * 100;
  return Math.min(100, Number(pct.toFixed(1)));
};
