import { useEffect, useRef, useState } from "react"

export type SwapUxState =
  | { status: "idle" }
  | { status: "loading"; message: string }
  | { status: "success"; message: string }

export interface StartSwapArgs {
  fromAmount: string
  fromCurrency: string
  toAmount: string
  toCurrency: string
}

export function useSwapUx() {
  const [swapUx, setSwapUx] = useState<SwapUxState>({ status: "idle" })
  const timersRef = useRef<number[]>([])

  const clearTimers = () => {
    for (const id of timersRef.current) window.clearTimeout(id)
    timersRef.current = []
  }

  useEffect(() => {
    return () => clearTimers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const reset = () => {
    clearTimers()
    setSwapUx({ status: "idle" })
  }

  const startSwap = ({ fromAmount, fromCurrency, toAmount, toCurrency }: StartSwapArgs) => {
    clearTimers()
    setSwapUx({ status: "loading", message: "Preparing swap…" })

    const t1 = window.setTimeout(() => {
      setSwapUx({ status: "loading", message: "Broadcasting transaction…" })
    }, 650)

    const t2 = window.setTimeout(() => {
      setSwapUx({ status: "loading", message: "Finalizing…" })
    }, 1400)

    const t3 = window.setTimeout(() => {
      setSwapUx({
        status: "success",
        message: `Swap successful: ${fromAmount || "0"} ${fromCurrency} → ${toAmount || "0"} ${toCurrency}`,
      })
    }, 2300)

    const t4 = window.setTimeout(() => {
      setSwapUx({ status: "idle" })
    }, 6000)

    timersRef.current.push(t1, t2, t3, t4)
  }

  const isLoading = swapUx.status === "loading"

  return { swapUx, startSwap, reset, isLoading } as const
}

