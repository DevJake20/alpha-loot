import 'dotenv/config';
import { AlphaClient } from '@alpha-arcade/sdk';
import algosdk from 'algosdk';

// Dummy account — getLiveMarkets() is read-only so no real wallet needed
const DUMMY = algosdk.generateAccount();

// Connect to Algorand mainnet. API key is optional but gives richer data
const client = new AlphaClient({
  algodClient: new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', 443),
  indexerClient: new algosdk.Indexer('', 'https://mainnet-idx.algonode.cloud', 443),
  signer: algosdk.makeBasicAccountTransactionSigner(DUMMY),
  activeAddress: DUMMY.addr.toString(),
  matcherAppId: 3078581851, // Alpha Arcade matcher contract
  usdcAssetId: 31566704,    // USDC on Algorand mainnet
  apiKey: process.env.ALPHA_API_KEY,
});

// Fetch all live markets from the API
const markets = await client.getLiveMarkets();
console.log(`Found ${markets.length} markets:\n`);
for (const m of markets) {
  console.log(`${m.title} — App ID: ${m.marketAppId}, source: ${m.source}`);
}
