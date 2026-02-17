# Deployment Guide

## How $JOV Was Deployed

$JOV was deployed using the **JOV CLI agent** — a Grok-powered AI assistant that executed the entire deployment autonomously via a single conversation.

## Prerequisites

The deployment used:

- **JOV CLI** (`npm install -g jovebot`) — the AI assistant
- **Grok-3** (xAI) — the LLM powering the agent
- **Meteora SDK** — for DAMM v2 pool creation
- **Solana Web3.js** — for on-chain transactions
- **Metaplex** — for token metadata

## Deployment Flow

```
1. User sends message to JOV agent
   └── "Deploy $JOV token with 1B supply on Meteora bonding curve"

2. JOV agent (grok-3) plans the deployment
   ├── Validates parameters
   ├── Fetches live SOL price
   └── Confirms with user

3. JOV agent executes deployment
   ├── Creates token mint
   ├── Uploads metadata to Arweave
   ├── Computes bonding curve (16 segments)
   ├── Creates Meteora DAMM v2 pool
   ├── Enables anti-sniping + dynamic fees
   ├── Revokes all authorities
   └── Confirms on-chain

4. Deployment complete in 9.8 seconds
```

## The JOV Agent Command

```bash
jovebot agent --message "Deploy $JOV token with 1B supply on Meteora bonding curve"
```

The agent:
1. Received the instruction
2. Used Grok-3 to understand and plan
3. Called the deployment tools
4. Returned the results

## Files Generated

| File | Purpose |
|------|---------|
| `scripts/deploy-jov-token.ts` | Main deployment script |
| `config/meteora-pool.json` | Pool configuration |
| `config/token-metadata.json` | On-chain metadata |
| `logs/deployment-2026-02-12.log` | Full deployment log |
| `logs/agent-session-transcript.md` | Agent conversation |

## Verification

After deployment, verify everything:

```bash
# Check curve parameters
npx tsx scripts/verify-curve.ts

# Monitor live pool
npx tsx scripts/monitor-pool.ts

# View on explorer
open https://solscan.io/token/4qHkV14MAqHqM5eEX9YzeTNhdGnzDeWQYj8kXpQUjov0
```

## Reproducibility

The deployment is fully reproducible. Clone this repo and inspect every parameter, script, and log. All authorities are revoked — the token is immutable.
