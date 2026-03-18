# Problem 3 Code Review


## 1. Missing and Incorrect Types

The `WalletBalance` interface does not include a `blockchain` field, but the code relies on it in multiple places. This will either cause TypeScript errors or force unsafe assumptions.

Also, `getPriority` uses `any`, which defeats the purpose of using TypeScript in the first place.

**Recommendation:**
Define the correct shape of your data and avoid `any`.

---

## 2. Undefined Variable 

There is a reference to `lhsPriority` inside the filter logic, but this variable is never defined. This will crash at runtime.

This looks like a simple typo, but it's a serious issue that should be caught early.

---

## 3. Broken Filtering Logic

The filter condition is confusing and likely incorrect:

- It keeps balances with `amount <= 0`, which doesn't make much sense in a wallet context.
- The logic is nested unnecessarily, making it harder to read.

**Recommendation:**
Flatten the condition and make the intent clear (e.g. only keep valid balances with positive amounts).

---

## 4. Inefficient Sorting

`getPriority` is called multiple times inside the `sort` comparator.

**Recommendation:**
Compute the priority once per item before sorting.

---

## 5. Incomplete Sort Comparator

The `sort` function does not handle the equality case (`return 0`). 

---

## 6. Incorrect useMemo Dependencies

The `useMemo` depends on `prices`, but `prices` is not used inside the computation.

This causes unnecessary recalculations and defeats the purpose of memoization.

---

## 7. Unused Intermediate Data

`formattedBalances` is created but never used. This is a clear sign of either leftover code or incomplete refactoring.

---

## 8. Type Mismatch

In the `rows` mapping, the code assumes each item is a `FormattedWalletBalance`, but the actual data is still `WalletBalance`.

This mismatch can lead to runtime bugs and incorrect assumptions about available fields.

---

## 9. Using Index as Key

Using `index` as a React key is a well-known anti-pattern. It can cause issues when the list changes (reordering, insertion, deletion), leading to incorrect UI updates.

**Recommendation:**
Use a stable unique value (like `currency`).

---

## 10. Missing Memoization for Derived Data

The `rows` array is recalculated on every render, even when inputs haven't changed.

This is not a big issue for small lists, but can become expensive as the data grows.

---

## 11. Unsafe Access to Prices

The code assumes that every currency exists in the `prices` object. If it doesn’t, the result will be `NaN`.

---

## 12. Function Recreated on Every Render

`getPriority` is defined inside the component, so it gets recreated on every render. This can reduce the effectiveness of memoization.

**Recommendation:**
Move it outside the component or memoize it.

---

## 13. Formatting Precision Issue

Calling `toFixed()` without arguments defaults to zero decimal places, which is usually not what you want for financial data.
