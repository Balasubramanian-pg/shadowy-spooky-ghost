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
      Investmen