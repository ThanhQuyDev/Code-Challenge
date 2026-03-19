export const BALANCES: Record<string, number> = {
  BLUR: 2500,
  bNEO: 12,
  BUSD: 1200,
  USD: 950,
  ETH: 0.75,
  GMX: 18,
  STEVMOS: 20000,
  LUNA: 3200,
  RATOM: 150,
  STRD: 600,
  EVMOS: 40000,
  IBCX: 25,
  IRIS: 100000,
  ampLUNA: 800,
  KUJI: 900,
  STOSMO: 1400,
  USDC: 1100,
}

export const fmtBalance = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 8,
})

export function parseAmount(raw: string): number {
  const normalized = sanitizeNumericInput(raw)
  return Number(normalized)
}

export function sanitizeNumericInput(raw: string): string {
  return raw.replace(/[^\d.]/g, "")
}

export const getLocalIconPath = (symbol: string): string => {
  return `/assets/${symbol}.svg`
}

