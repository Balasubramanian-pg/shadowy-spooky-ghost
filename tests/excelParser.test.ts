import { describe, it, expect } from 'vitest';
import { parseWorkbookData } from '../src/services/excelParser';

describe('Excel Parser Service', () => {
  it('throws an error if both Transactions and Budget sheets are missing/empty', () => {
    expect(() => {
      parseWorkbookData({});
    }).toThrow(/Could not find valid data/);
  });

  it('correctly maps raw worksheets into validated dataset with calculated allocations', () => {
    const rawData = {
      Transactions: [
        {
          date: '2023-10-15',
          description: 'Grocery Shopping',
          category: 'Food',
          account: 'ICICI Bank',
          amount: 4500,
          type: 'expense',
          status: 'posted',
          isRecurring: 'false',
        },
        {
          date: '2023-10-01',
          description: 'Client Project Fee',
          category: 'Income',
          account: 'Federal Bank',
          amount: 80000,
          type: 'income',
          status: 'posted',
          isRecurring: 'true',
        },
      ],
      Budget: [
        { category: 'Food', budget: 15000, actual: 12000, trend: -5 },
      ],
      Investments: [
        { ticker: 'RELIANCE', name: 'Reliance Industries', shares: 10, costBasis: 2000, currentPrice: 2500 },
        { ticker: 'HDFCBANK', name: 'HDFC Bank', shares: 10, costBasis: 1500, currentPrice: 1500 },
      ],
      Goals: [
        { name: 'Vehicle', targetAmount: 1000000, currentAmount: 300000, monthlyContribution: 20000, priority: 'High' },
      ],
    };

    const result = parseWorkbookData(rawData);

    expect(result.transactions).toHaveLength(2);
    expect(result.transactions[0].description).toBe('Grocery Shopping');
    expect(result.transactions[1].isRecurring).toBe(true);

    expect(result.budgets).toHaveLength(1);
    expect(result.budgets[0].budget).toBe(15000);

    expect(result.holdings).toHaveLength(2);
    // Reliance: 10 * 2500 = 25000
    // HDFC: 10 * 1500 = 15000
    // Total: 40000
    // Reliance allocation: 25000 / 40000 = 62.5%
    // HDFC allocation: 15000 / 40000 = 37.5%
    expect(result.holdings[0].allocation).toBe(62.5);
    expect(result.holdings[1].allocation).toBe(37.5);

    expect(result.goals).toHaveLength(1);
    expect(result.goals[0].priority).toBe('high');
  });
});
