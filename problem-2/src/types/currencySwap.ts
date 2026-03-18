export interface AmountRowProps {
  label: string
  amount: string
  onAmountChange: (value: string) => void
  currency: string
  onCurrencyChange: (value: string) => void
  currencies: readonly string[]
  isCurrencyEnabled: (currency: string) => boolean
  getBalance: (currency: string) => number
  helper?: string
  readOnly?: boolean
  error?: string
}

export interface CurrencySelectProps {
  value: string
  onChange: (value: string) => void
  currencies: readonly string[]
  isCurrencyEnabled: (currency: string) => boolean
  getBalance: (currency: string) => number
}
