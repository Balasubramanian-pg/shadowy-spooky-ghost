/**
 * @file Enterprise Domain Type Definitions
 * @summary Core data models for Opus Personal Finance Dashboard
 */

export type View = 'overview' | 'income-expenses' | 'budget' | 'investments' | 'goals' | 'settings';

export type TimeRange = 'Weekly' | 'MTD' | 'QTD' | 'YTD';

export type GlobalFilterRange = 'Last Month' | 'Last 3 Months' | 'Last 6 Months';

export type AccountFilter = 'All Accounts' | 'Federal Bank' | 'ICICI Bank' | string;

export interface KPIMetric {
  title: string;
  value: number;
  subValue?: string;
  change?: number; // percentage
  trend?: number[];
  type: 'currency' | 'percent' | 'count';
  color: 'blue' | 'teal' | 'green' | 'amber' | 'red';
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: st