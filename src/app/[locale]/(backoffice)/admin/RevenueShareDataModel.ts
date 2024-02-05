
export type TransactionSum = {
  debit: number;
  credit: number;
  jackpot_credit: number;
  promo_credit: number;
  free_debit: number;
  free_credit: number;
  bonus_buy_debit: number;
  correction_credit: number;
  correction_debit: number;
  bonus_buy_credit: number;
  debitCreditSum: number;
  freeSum: number;
  bonusBuySum: number;
  correctionSum: number;
};

export type MonthData = TransactionSum & {
  month: string;
};

export type GameData = {
  game_code: string;
  months: MonthData[];
};

export type RevenueShareResponse = {
  overall: TransactionSum;
  games: GameData[];
};

export type ErrorResponse = {
  message: string;
  error: boolean;
};
