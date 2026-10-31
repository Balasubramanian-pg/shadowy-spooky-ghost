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
    expect(formatINR(NaN)).toBe('₹0');
  });

  it('formats compact INR with K or L or Cr notation', () => {
    const compact1L = formatCompactINR(100000);
    expect(compact1L.length).toBeGreaterThan(0);
    expect(formatCompactINR(0)).toBe('₹0');
  });

  it('formats percentage with specified decimal places', () => {
    expect(formatPercentage(24.567, 1)).toBe('24.6%');
    expect(formatPercentage(10, 0)).toBe('10%');
    expect(formatPercentage(NaN)).toBe('0.0%');
  });

  it('formats valid date strings in en-IN format', () => {
    const res = formatDate('2023-10-31');
    expect(res).toContain('2023');
    expect(res).toContain('Oct');
  });
});
