import { describe, it, expect } from 'vitest';
import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateSavingsRate,
  calculateBudgetUtilization,
  calculatePortfolioValue,
  calculatePortfolioGain,
  calculateGoalProgress,
} from '../src/utils/calculations';
import { Transaction, BudgetCategory, InvestmentHolding, FinancialGoal } from '../src/types';

describe('Financial Math & Calculation Utilities', () => {
  const mockTransactions: Transaction[] = [
    {
      id: 'tx-1',
      date: '2023-10-01',
      description: 'Salary',
      category: 'Income',
      account: 'ICICI Bank',
      amount: 100000,
      type: 'income',
      status: 'posted',
      isRecurring: true,
    },
    {
      id: 'tx-2',
      date: '2023-10-05',
      description: 'Rent',
      category: 'Housing',
      account: 'ICICI Bank',
      amount: 30000,
      type: 'expense',
      status: 'posted',
      isRecurring: true,
    },
    {
      id: 'tx-3',
      date: '2023-10-10',
      description: 'Groceries',
      category: 'Food',
      account: 'Federal Bank',
      amount: 10000,
      type: 'expense',
      status: 'posted',
      isRecurring: false,
    },
  ];

  it('calculates total income correctly', () => {
    expect(calculateTotalIncome(mockTransactions)).toBe(100000);
  });

  it('calculates total expenses correctly', () => {
    expect(calculateTotalExpenses(mockTransactions)).toBe(40000);
  });

  it('calculates savings rate percentage accurately', () => {
    // income: 100k, expense: 40k, savings: 60k -> 60%
    const rate = calculateSavingsRate(100000, 40000);
    expect(rate).toBe(60);
  });

  it('ret