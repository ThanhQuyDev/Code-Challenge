export interface PriceItem {
  currency: string
  date: string
  price: number
}

export const SUPPORTED_CURRENCIES = [
  "BLUR",
  "bNEO",
  "BUSD",
  "USD",
  "ETH",
  "GMX",
  "STEVMOS",
  "LUNA",
  "RATOM",
  "STRD",
  "EVMOS",
  "IBCX",
  "IRIS",
  "ampLUNA",
  "KUJI",
  "STOSMO",
  "USDC",
] as const

const PRICES_URL = "https://interview.switcheo.com/prices.json"

export async function fetchPrices(): Promise<PriceItem[]> {
  const res = await fetch(PRICES_URL)
  if (!res.ok) {
    throw new Error("Failed to fetch prices")
  }
  const data = (await res.json()) as PriceItem[]
  return data
}

export function buildPriceMap(items: PriceItem[]): Record<string, number> {
  const map: Record<string, number> = {}
  for (const item of items) {
    map[item.currency] = item.price
  }
  return map
}

