export function formatCurrency(amount?: number): string {
  if (!amount) return '$0.00';

  // Format as USD with 2 decimal places
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}
