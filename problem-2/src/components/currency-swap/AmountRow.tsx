import type { AmountRowProps } from "@/types/currencySwap"
import { fmtBalance, sanitizeNumericInput } from "@/utils/currency"

import { CurrencySelect } from "./CurrencySelect"

export const AmountRow: React.FC<AmountRowProps> = ({
  label,
  amount,
  onAmountChange,
  currency,
  onCurrencyChange,
  currencies,
  isCurrencyEnabled,
  getBalance,
  helper,
  readOnly,
  error,
}) => {
  const balance = getBalance(currency)

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3.5">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{label}</span>
        <span>
          Balance: {fmtBalance.format(balance)} {currency}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <div className="flex-1">
          <input
            className="w-full bg-transparent text-2xl font-semibold tracking-tight text-slate-50 outline-none placeholder:text-slate-600"
            inputMode="decimal"
            maxLength={30}
            readOnly={readOnly}
            value={amount}
            onChange={(e) => onAmountChange(sanitizeNumericInput(e.target.value))}
            placeholder="0.00"
          />
        </div>

        <CurrencySelect
          value={currency}
          onChange={onCurrencyChange}
          currencies={currencies}
          isCurrencyEnabled={isCurrencyEnabled}
          getBalance={getBalance}
        />
      </div>
      <div className="mt-1 min-h-4">
        {error ? <div className="text-[11px] text-red-400">{error} </div> : null}
      </div>

      {helper && (
        <div className="mt-1 text-[11px] text-slate-500">{helper}</div>
      )}
    </div>
  )
}

