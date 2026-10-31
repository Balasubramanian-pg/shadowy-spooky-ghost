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

  it('returns 0 savings rate when income is 0 or negative', () => {
    expect(calculateSavingsRate(0, 5000)).toBe(0);
    expect(calculateSavingsRate(1000, 2000)).toBe(0);
  });

  it('calculates budget utilization percentage', () => {
    const budget: BudgetCategory = {
      category: 'Food',
      budget: 15000,
      actual: 18000,
      trend: 20,
    };
    expect(calculateBudgetUtilization(budget)).toBe(120);
  });

  it('calculates portfolio total value and gain', () => {
    const holdings: InvestmentHolding[] = [
      { ticker: 'INFY', name: 'Infosys', shares: 10, costBasis: 1000, currentPrice: 1500, allocation: 0 },
      { ticker: 'TCS', name: 'TCS', shares: 5, costBasis: 3000, currentPrice: 3200, allocation: 0 },
    ];
    // Total current: (10 * 1500) + (5 * 3200) = 15000 + 16000 = 31000
    // Total cost: (10 * 1000) + (5 * 3000) = 10000 + 15000 = 25000
    // Gain: 6000, Percentage: (6000 / 25000) * 100 = 24%
    expect(calculatePortfolioValue(holdings)).toBe(31000);
    const { gain, percentage } = calculatePortfolioGain(holdings);
    expect(gain).toBe(6000);
    expect(percentage).toBe(24);
  });

  it('calculates financial goal progress capped at 100%', () => {
    const goal: FinancialGoal = {
      id: 'g-1',
      name: 'Emergency Fund',
      targetAmount: 200000,
      currentAmount: 100000,
      monthlyContribution: 10000,
      targetDate: '2025-01-01',
      priority: 'high',
    };
    expect(calculateGoalProgress(goal)).toBe(50);

    const completedGoal: FinancialGoal = {
      ...goal,
      currentAmount: 250000,
    };
    expect(calculateGoalProgress(completedGoal)).toBe(100);
  });
});
