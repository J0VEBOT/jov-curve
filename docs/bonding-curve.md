# Bonding Curve Deep Dive

## How $JOV's Bonding Curve Works

$JOV uses a **Meteora DAMM v2** constant-product bonding curve. This means the token price increases along a mathematical curve as more SOL enters the pool.

## Parameters

| Parameter | Value |
|-----------|-------|
| Initial FDV | 30 SOL (~$5,443) |
| Migration FDV | 400 SOL (~$72,568) |
| Multiple | 13.3x |
| SOL to fill | ~370 SOL |
| Curve type | Constant Product (CP-AMM) |
| Segments | 16 |
| Pre-graduation fee | 1% flat |
| Migration fee | 6% |

## Price Formula

In a constant-product AMM:

```
k = x × y (constant)

Where:
  x = SOL reserves
  y = JOV reserves
  k = invariant
```

The price at any point is:

```
price = x / y
```

As SOL enters (x increases), JOV leaves (y decreases), and the price rises.

## Migration Lifecycle

```
Phase 1: BONDING CURVE (pre-graduation)
├── Price follows CP-AMM curve
├── Fee: 1% flat on all trades
├── Anti-sniping: active
└── ~370 SOL needed to fill

        ↓ FDV reaches 400 SOL ↓

Phase 2: MIGRATION (automatic)
├── Pool graduates to full DAMM v2
├── Migration fee: 6% charged
├── LP allocated: 100% to JOV treasury
└── Position NFTs activated

        ↓

Phase 3: FULL POOL (post-graduation)
├── Dynamic fees (volatility-adaptive)
├── Concentrated liquidity ranges
├── Position NFTs earn fees forever
└── Full Jupiter/DEX routing active
```

## Anti-Sniping Protection

The bonding curve has built-in anti-sniping protection that prevents bots from front-running the launch:

- Transactions in the first blocks are rate-limited
- Large buys are capped during the initial period
- MEV protection via Meteora's infrastructure

## Position NFTs

After migration, liquidity providers receive **Position NFTs** that represent their share of the pool. These NFTs:

- Earn trading fees proportional to position size
- Fees accrue in raw SOL — claim anytime
- Position is transferable (sell/trade the NFT)
- No lock-up period
- Earn fees **forever** as long as the pool is active

## Fee Revenue Model

All trading fees flow to the JOV treasury and are allocated:

```
Trading Fees
    │
    ├── 50% → Buyback $JOV (buy from market, burn or redistribute)
    ├── 25% → Buy RWA Assets (real-world asset backing)
    └── 25% → Marketing & Growth
```

## Verification

Run the verification script to confirm curve parameters:

```bash
npx tsx scripts/verify-curve.ts
```

Monitor live pool status:

```bash
npx tsx scripts/monitor-pool.ts
```
