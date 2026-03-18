import { useMemo, useState } from "react"
import { ArrowUpDown } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { buildPriceMap, fetchPrices, SUPPORTED_CURRENCIES } from "@/api/prices"
import { AmountRow } from "@/components/currency-swap/AmountRow"
import { BALANCES, fmtBalance, parseAmount } from "@/utils/currency"
import { useSwapUx } from "@/hooks/useSwapUx"

export const CurrencySwap: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("USDC")
  const [fromAmount, setFromAmount] = useState("100")
  const { swapUx, startSwap, reset, isLoading: isSwapLoading } = useSwapUx()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["prices"],
    queryFn: fetchPrices,
    staleTime: 60_000,
  })

  const priceMap = useMemo(() => {
    if (!data) return {}
    return buildPriceMap(data)
  }, [data])

  const parsedFromAmount = parseAmount(fromAmount)

  const rate =
    priceMap[fromCurrency] && priceMap[toCurrency]
      ? priceMap[toCurrency] / priceMap[fromCurrency]
      : undefined

  const toAmount =
    !Number.isNaN(parsedFromAmount) && rate !== undefined
      ? (parsedFromAmount * rate).toFixed(6)
      : ""

  const fromBalance = BALANCES[fromCurrency] ?? 0
  const isFromAmountValid =
    fromAmount.trim().length === 0
      ? true
      : !Number.isNaN(parsedFromAmount) && parsedFromAmount <= fromBalance
  const fromAmountError =
    !isFromAmountValid && !Number.isNaN(parsedFromAmount)
      ? `Insufficient balance. Available: ${fmtBalance.format(fromBalance)} ${fromCurrency}`
      : !isFromAmountValid
        ? "Invalid input amount."
        : undefined

  const canSubmit =
    isFromAmountValid &&
    !isLoading &&
    !isError &&
    Boolean(rate) &&
    !isSwapLoading

  const handleSwapSides = () => {
    if (isSwapLoading) return
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const handleConfirm = () => {
    if (!canSubmit) return
    startSwap({ fromAmount, fromCurrency, toAmount, toCurrency })
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-slate-400">
            Currency
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Swap and convert
          </h1>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 shadow-2xl shadow-slate-950/70 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-slate-800/80 px-5 py-3.5">
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Swap
                </span>
                <span className="text-sm font-medium text-slate-100">
                  Spot conversion
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Market open</span>
            </div>
          </div>

          <div className="space-y-4 px-5 py-5">
            {swapUx.status !== "idle" && (
              <div
                className={
                  swapUx.status === "success"
                    ? "rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-200"
                    : "rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-xs text-slate-200"
                }
                role={swapUx.status === "success" ? "status" : "status"}
                aria-live="polite"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {swapUx.status === "loading" && (
                      <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
                    )}
                    <span className="leading-5">{swapUx.message}</span>
                  </div>
                  {swapUx.status === "success" && (
                    <button
                      type="button"
                      className="rounded-md px-2 py-1 text-[11px] font-medium text-emerald-200 hover:bg-emerald-500/10"
                      onClick={reset}
                      aria-label="Dismiss notification"
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              </div>
            )}

            <AmountRow
              label="From"
              amount={fromAmount}
              onAmountChange={(v) => {
                if (isSwapLoading) return
                setFromAmount(v)
              }}
              currency={fromCurrency}
              onCurrencyChange={(v) => {
                if (isSwapLoading) return
                setFromCurrency(v)
              }}
              currencies={SUPPORTED_CURRENCIES}
              isCurrencyEnabled={(c) => Boolean(priceMap[c])}
              getBalance={(c) => BALANCES[c] ?? 0}
              error={fromAmountError}
              helper={
                rate && !Number.isNaN(parsedFromAmount)
                  ? `1 ${fromCurrency} ≈ ${rate.toFixed(6)} ${toCurrency}`
                  : undefined
              }
            />

            <div className="flex justify-center">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-100 hover:bg-slate-800"
                onClick={handleSwapSides}
                aria-label="Swap sides"
                disabled={isSwapLoading}
              >
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </div>

            <AmountRow
              label="To"
              amount={toAmount}
              onAmountChange={() => {}}
              currency={toCurrency}
              onCurrencyChange={(v) => {
                if (isSwapLoading) return
                setToCurrency(v)
              }}
              currencies={SUPPORTED_CURRENCIES}
              isCurrencyEnabled={(c) => Boolean(priceMap[c])}
              getBalance={(c) => BALANCES[c] ?? 0}
              readOnly
              helper={
                rate && !Number.isNaN(parsedFromAmount)
                  ? `${parsedFromAmount || 0} ${fromCurrency} ≈ ${toAmount || 0} ${toCurrency}`
                  : undefined
              }
            />
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-slate-800/80 px-5 py-4">
            <div className="flex flex-col text-xs text-slate-400">
              <span>
                Est. received:{" "}
                <span className="font-medium text-slate-100">
                  {toAmount || "--"} {toCurrency}
                </span>
              </span>
            </div>

            <Button
              onClick={handleConfirm}
              disabled={!canSubmit}
              className="rounded-full bg-emerald-500 px-6 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-300 disabled:opacity-100"
            >
              {isSwapLoading ? "Swapping…" : "Confirm swap"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
