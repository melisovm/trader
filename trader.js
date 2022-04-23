const Binance = require('binance-api-node').default

const trade = async ({ ticker, strategy: { order_action, order_contracts } }) => {
  try {
    const _currentClient = Binance({
      apiKey: process.env.API_KEY,
      apiSecret: process.env.API_SECRET,
    })
    
    const data = await _currentClient.order({
      type: 'MARKET',
      symbol: ticker,
      quantity: order_contracts,
      side: order_action.toUpperCase(),
    });

    console.debug(data);

    return data;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  trade,
}
