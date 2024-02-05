import { formatUnits } from 'viem';

export const formatBalance = (balance: bigint, decimals = 18): string => {
  if (('' + balance).includes('e-')) {
    // balance is a number with a scientific notation
    balance = (balance as unknown as number).toFixed(10) as unknown as bigint;
  }
  const formattedBalance = formatUnits(balance, decimals);

  const [integer, decimal = '0'] = formattedBalance.split('.');

  if (!decimal) return formattedBalance;
  if (integer !== '0') return `${integer}.${decimal.slice(0, 2)}`;

  return `0.${decimal.slice(0, 2)}`;
};

export const formatBankrollBalance = (balance: bigint, decimals = 18): string => {
  const [integer] = formatUnits(balance || 0n, decimals).split('.');
  const text = `${integer?.replace(/(.)(?=(\d{3})+$)/g, '$1,')}`;
  return text;
};
