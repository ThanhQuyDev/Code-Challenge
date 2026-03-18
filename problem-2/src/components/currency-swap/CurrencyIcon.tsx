import { useState } from "react"

import { cn } from "@/lib/utils"
import { getLocalIconPath } from "@/utils/currency"

export const CurrencyIcon: React.FC<{ symbol: string; className?: string }> = ({
  symbol,
  className,
}) => {
  const [hidden, setHidden] = useState(false)
  if (hidden) return null

  return (
    <img
      src={getLocalIconPath(symbol)}
      alt={`${symbol} icon`}
      className={cn("rounded-sm", className)}
      onError={() => setHidden(true)}
      loading="lazy"
      decoding="async"
    />
  )
}

