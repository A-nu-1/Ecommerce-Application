export function formatMoney(cents) {
   if (cents < 0) {
    // There are several ways to solve this. This is one example:
    // - Switch the negative number to positive using * -1.
    // - Put the negative sign at the front of the result.
    cents = cents * -1;
    return `-$${((cents) / 100).toFixed(2)}`;
  }
  return `$${(cents / 100).toFixed(2)}`;
}