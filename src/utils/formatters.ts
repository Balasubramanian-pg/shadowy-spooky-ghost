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
   