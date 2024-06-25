export const ConvertPrice = (number: number): string => {
  return number
    .toLocaleString('it-IT', {style: 'currency', currency: 'VND'})
    .replace('VND', '₫ ');
};

export const FormatCurrency = (amount: number) => {
  if (!amount) return '0 đ';
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ';
};
