const Telegram = require('./notifiers/telegram');
const Binance = require('binance-api-node').default

const trade = async (body) => {
  try {
    const { ticker, strategy: { order_action, order_contracts } } = body
    const _currentClient = Binance({
      apiKey: process.env.API_KEY,
      apiSecret: process.env.API_SECRET,
    })

    if (process.env.MODE !== 'TEST') {
      return await _currentClient.order({
        type: 'MARKET',
        symbol: ticker,
        quantity: order_contracts,
        side: order_action.toUpperCase(),
      });
    }

    return await _currentClient.orderTest({
      type: 'MARKET',
      symbol: ticker,
      quantity: order_contracts,
      side: order_action.toUpperCase(),
    });
  } catch (e) {
    await Promise.reject(e);
  }
}

module.exports = {
  trade,
}
