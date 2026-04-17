# alpha-loot

Alpha Arcade scripts for Algorand prediction markets.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run get-markets` | Fetch and list all live markets |
| `npm run place-order` | Place a limit buy order |

## Setup

```bash
npm install
cp .env.example .env   # add your values
npm run get-markets
```

## .env

```
MNEMONIC=your twenty five word mnemonic
MARKET_APP_ID=3012345678
ALPHA_API_KEY=aa_pk_...
```
