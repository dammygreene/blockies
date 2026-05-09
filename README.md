# BLOCKIES

Responsive Ethereum wallet-identity mint site built with Next.js and Tailwind CSS.

## Features

- Wallet connect/disconnect via injected EVM wallet (`window.ethereum`)
- Deterministic blockie preview generated from the connected wallet address
- Dynamic page theming based on wallet-derived palette
- Mint UX with loading, success, and one-wallet restriction feedback
- Responsive sections for hero, preview, stats, traits, and FAQ

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Validate

```bash
npm run lint
npm run build
```
