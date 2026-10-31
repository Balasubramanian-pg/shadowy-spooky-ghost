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
  if (!budget.budget 