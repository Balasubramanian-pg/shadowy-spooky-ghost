import { describe, it, expect } from 'vitest';
import { formatINR, formatCompactINR, formatPercentage, formatDate } from '../src/utils/formatters';

describe('Currency and Formatter Utilities', () => {
  it('formats positive INR amounts with currency symbol and no decimals', () => {
    const formatted = formatINR(50000);
    expect(formatted).toContain('50,000');
    expect(formatted).toMatch(/₹|INR/);
  });

  it('formats zero correctly', () => {
    const formatted = formatINR(0);
    expect(formatted).toContain('0');
  });

  it('handles negative or invalid values gracefully', () => {
    expect(formatINR(NaN)).toBe('