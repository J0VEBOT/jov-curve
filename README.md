# ⚡ jov-curve

<p align="center">
  <img src="assets/banner.png" alt="jov-curve" width="100%">
</p>

<p align="center">
  <strong>$JOV Bonding Curve Deployment</strong> — deployed by JOV agent via <code>jovebot agent</code>
</p>

<p align="center">
  <code>4qHkV14MAqHqM5eEX9YzeTNhdGnzDeWQYj8kXpQUjov0</code>
</p>

---

## What is this?

This repo contains the complete deployment artifacts for **$JOV** — a token launched on Solana using a Meteora DAMM v2 bonding curve, deployed entirely by the **JOV CLI agent** (powered by Grok-3).

One message. One agent. Fully on-chain. All authorities revoked.

```bash
$ jovebot agent --message "Deploy $JOV token with 1B supply on Meteora bonding curve"
```

## Deployment Summary

| Parameter | Value |
|-----------|-------|
| **Token** | JOV ($JOV) |
| **Mint** | `4qHkV14MAqHqM5eEX9YzeTNhdGnzDeWQYj8kXpQUjov0` |
| **Supply** | 1,000,000,000 (1B) |
| **Decimals** | 9 |
| **Curve** | Meteora DAMM v2 (Constant Product) |
| **Initial FDV** | 30 SOL (~$5,443) |
| **Migration FDV** | 400 SOL (~$72,568) |
| **Multiple** | 13.3x to graduate |
| **SOL to fill** | ~370 SOL |
| **Authority** | ALL REVOKED (immutable) |
| **Deployed by** | `jovebot agent` (grok-3) |
| **Deploy time** | 9.8 seconds |

## Tokenomics

```
  ┌─────────────────────────────────────────────┐
  │           1,000,000,000 $JOV               │
  ├─────────────────────────────────────────────┤
  │  ████████████████████████████████  80%  Circulating (800M)
  │  ████                              10%  Team (100M)
  │  ████                              10%  Community (100M)
  └─────────────────────────────────────────────┘
```

## Fee Revenue

```
  Trading Fees
      │
      ├── 50%  Buyback $JOV    ████████████████████████████
      ├── 25%  Buy RWA Assets   ██████████████
      └── 25%  Marketing        ██████████████
```

## Pool Features

- ✅ **Anti-sniping** — bot protection at launch
- ✅ **Dynamic fees** — volatility-adaptive fee scheduling
- ✅ **Concentrated liquidity** — deeper pools, better execution
- ✅ **Position NFTs** — earn trading fees forever, claim raw SOL anytime
- ✅ **All authorities revoked** — supply is permanently immutable

## Bonding Curve

```
  FDV (SOL)
  400 ┤                                          ████████
      │                                     █████
      │                                 ████
      │                             ████
      │                          ███
      │                       ███
      │                    ███
      │                 ███
      │              ███
      │           ██
      │        ██
      │      ██
      │    ██
   30 ┤████
      └──────────────────────────────────────────────────
       0 SOL                   ~370 SOL            fill →

  ● Launch: 30 SOL FDV ($5,443)
  ● Migration: 400 SOL FDV ($72,568) — graduates to full DAMM v2 pool
  ● Multiple: 13.3x price appreciation
```

## Files

```
jov-curve/
├── scripts/
│   ├── deploy-jov-token.ts      # Main deployment script (executed by jovebot agent)
│   ├── verify-curve.ts           # Verify curve parameters post-deployment
│   └── monitor-pool.ts           # Live pool monitoring
├── config/
│   ├── meteora-pool.json         # Meteora DAMM v2 pool configuration
│   └── token-metadata.json       # On-chain token metadata (Arweave)
├── logs/
│   ├── deployment-2026-02-12.log # Full deployment terminal output
│   └── agent-session-transcript.md  # JOV agent conversation log
├── docs/
│   ├── bonding-curve.md          # Curve mechanics deep dive
│   └── deployment.md             # Deployment guide
├── assets/
│   ├── banner.png                # Repo banner
│   ├── jov-logo.svg             # Logo (bolt claw G)
│   └── social-preview.png        # GitHub social preview
├── package.json
├── tsconfig.json
├── LICENSE
└── README.md
```

## Quick Start

```bash
# Clone
git clone https://github.com/J0VEBOT/jov-curve.git
cd jov-curve

# Install
npm install

# Verify curve parameters
npx tsx scripts/verify-curve.ts

# Monitor live pool
npx tsx scripts/monitor-pool.ts
```

## How It Was Deployed

$JOV was deployed in a single JOV agent session:

```bash
# User ran:
jovebot agent --message "Deploy $JOV token with 1B supply on Meteora bonding curve"

# JOV agent (grok-3) autonomously:
# 1. Fetched SOL price from Jupiter
# 2. Created token mint
# 3. Uploaded metadata to Arweave
# 4. Computed 16-segment bonding curve
# 5. Created Meteora DAMM v2 pool
# 6. Enabled anti-sniping + dynamic fees + position NFTs
# 7. Revoked all authorities (immutable)
# 8. Confirmed on-chain
#
# Total: 9.8 seconds
```

See the full agent conversation: [`logs/agent-session-transcript.md`](logs/agent-session-transcript.md)

## Links

| Resource | URL |
|----------|-----|
| **Explorer** | [solscan.io/token/4qHkV14M...jov](https://solscan.io/token/4qHkV14MAqHqM5eEX9YzeTNhdGnzDeWQYj8kXpQUjov0) |
| **Jupiter** | [jup.ag/swap/SOL-JOV](https://jup.ag/swap/SOL-4qHkV14MAqHqM5eEX9YzeTNhdGnzDeWQYj8kXpQUjov0) |
| **Website** | [j0vebot.com](https://j0vebot.com) |
| **JOV CLI** | [github.com/J0VEBOT/jov-cli](https://github.com/J0VEBOT/jov-cli) |
| **JovHub** | [github.com/J0VEBOT/jov-hub](https://github.com/J0VEBOT/jov-hub) |
| **Nix** | [github.com/J0VEBOT/nix-jov](https://github.com/J0VEBOT/nix-jov) |

---

Built with ⚡ by the JOV community · Deployed by `jovebot agent` (grok-3)
