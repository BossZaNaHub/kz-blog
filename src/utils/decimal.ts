export const DecimalWithSymbol = (amount: number) => {
  return new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(
    amount
  );
  // amount.toLocaleString(prefix)
};
