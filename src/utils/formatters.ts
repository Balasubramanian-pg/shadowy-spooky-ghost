/**
 * Currency and Numerical Formatting Utilities
 * Formats monetary amounts in Indian Rupee (INR) and standard numeric notations
 */

export const formatINR = (amount: number): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatCompactINR = (amount: number): string => {
  if (isNaN(amount) || amount === null || amount === undefined || amount === 0) {
    return '₹0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (val: number, decimals: number = 1): string => {
  if (isNaN(val) || val === null || val === undefined) {
    return '0.0%';
  }
  return `${val.toFixed(decimals)}%`;
};

export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(d);
};
