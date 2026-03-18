import * as Select from "@radix-ui/react-select"
import { ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"
import type { CurrencySelectProps } from "@/types/currencySwap"
import { CurrencyIcon } from "./CurrencyIcon"

export const CurrencySelect: React.FC<CurrencySelectProps> = ({
  value,
  onChange,
  currencies,
  isCurrencyEnabled,
}) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className={cn(
          "inline-flex items-center justify-between gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-100 shadow-sm outline-none",
          "focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        )}
        aria-label="Select currency"
      >
        <div className="flex items-center gap-2">
          <CurrencyIcon symbol={value} className="h-4 w-4" />
          <Select.Value />
        </div>
        <Select.Icon>
          <ChevronDown className="h-3 w-3 opacity-80" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="z-50 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 text-slate-100 shadow-xl">
          <Select.ScrollUpButton className="flex items-center justify-center bg-slate-900 py-1 text-slate-500">
            <ChevronUp className="h-3 w-3" />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            {currencies.map((c) => (
              <Select.Item
                key={c}
                value={c}
                disabled={!isCurrencyEnabled(c)}
                className={cn(
                  "relative flex cursor-pointer select-none items-center justify-between rounded-lg px-3 py-1.5 text-xs outline-none",
                  "text-slate-200 data-[highlighted]:bg-slate-800 data-[highlighted]:text-slate-50",
                  "data-[state=checked]:bg-emerald-500/10 data-[state=checked]:text-emerald-400",
                  "data-[disabled]:pointer-events-none data-[disabled]:opacity-40"
                )}
              >
                <div className="flex w-full items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CurrencyIcon symbol={c} className="h-4 w-4" />
                    <Select.ItemText>{c}</Select.ItemText>
                  </div>
                </div>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

