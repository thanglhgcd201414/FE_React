export function formatCurrency(amount?: number): string {
  if (!amount) return '0 VNĐ';
  const roundedAmount = amount.toFixed(0);

  const formattedAmount = roundedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${formattedAmount} VNĐ`;
}
