import 'dotenv/config';
import { AlphaClient } from '@alpha-arcade/sdk';
import algosdk from 'algosdk';

// Load config from .env
const mnemonic = process.env.MNEMONIC;
const marketAppId = Number(process.env.MARKET_APP_ID);
const price = Number(process.env.ORDER_PRICE ?? '500000');       // $0.50 default
const quantity = Number(process.env.ORDER_QUANTITY ?? '1000000'); // 1 share default

if (!mnemonic) throw new Error('MNEMONIC is required in .env');
if (!marketAppId) throw new Error('MARKET_APP_ID is required in .env');

// Derive wallet from mnemonic
const account = algosdk.mnemonicToSecretKey(mnemonic);
const signer = algosdk.makeBasicAccountTransactionSigner(account);

// Connect to Algorand mainnet
const client = new AlphaClient({
  algodClient: new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', 443),
  indexerClient: new algosdk.Indexer('', 'https://mainnet-idx.algonode.cloud', 443),
  signer,
  activeAddress: account.addr.toString(),
  matcherAppId: 3078581851,
  usdcAssetId: 31566704,
  apiKey: process.env.ALPHA_API_KEY,
});

console.log(`Wallet:  ${account.addr}`);
console.log(`Market:  ${marketAppId}`);
console.log(`Order:   BUY YES @ $${price / 1e6} x ${quantity / 1e6} shares\n`);

// Place a limit buy order for Yes shares
const result = await client.createLimitOrder({
  marketAppId,
  position: 1, // 1 = Yes
  price,
  quantity,
  isBuying: true,
});

// Log result
console.log('Order confirmed!');
console.log(`  Escrow App ID  : ${result.escrowAppId}`);
console.log(`  Confirmed Round: ${result.confirmedRound}`);
console.log(`  Tx IDs         : ${result.txIds.join(', ')}`);
if (result.matchedQuantity) {
  console.log(`  Matched        : ${result.matchedQuantity / 1e6} shares @ $${(result.matchedPrice ?? 0) / 1e6}`);
}
