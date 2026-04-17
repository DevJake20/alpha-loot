# alpha-loot
Build a minimal Node.js/TypeScript script that places a limit order on an Alpha Arcade prediction market.

What It Does:

Reads a wallet mnemonic from a .env file and initializes an AlphaClient connected to Algorand mainnet
Fetches live markets and picks one (or hardcodes a marketAppId to start)
Places a limit buy order for 1 Yes share at a specified price
Logs the result (escrow app ID, confirmed round) and exits
Scope:

Just get one limit order placed and confirmed on-chain. The long-term goal is to build a bot with a winning strategy that earns LP rewards while hedging risk on Alpha Arcade.
