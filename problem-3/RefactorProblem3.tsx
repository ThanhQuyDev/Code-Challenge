interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
  }
  
  interface Props extends BoxProps {}
  
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis': return 100;
      case 'Ethereum': return 50;
      case 'Arbitrum': return 30;
      case 'Zilliqa': return 20;
      case 'Neo': return 20;
      default: return -99;
    }
  };
  
  const WalletPage: React.FC<Props> = (props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
  
    const sortedBalances = useMemo(() => {
      return balances
        .map(balance => ({
          ...balance,
          priority: getPriority(balance.blockchain)
        }))
        .filter(balance => balance.priority > -99 && balance.amount > 0)
        .sort((a, b) => b.priority - a.priority);
    }, [balances]);
  
    const rows = useMemo(() => {
      return sortedBalances.map(balance => {
        const price = prices[balance.currency] ?? 0;
        const usdValue = price * balance.amount;
  
        return (
          <WalletRow
            key={balance.currency}
            className={classes.row}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.amount.toFixed(2)}
          />
        );
      });
    }, [sortedBalances, prices]);
  
    return <div {...rest}>{rows}</div>;
  };