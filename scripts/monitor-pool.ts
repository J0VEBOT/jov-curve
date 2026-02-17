// ═══════════════════════════════════════════════════════════════
// jov-curve / scripts / monitor-pool.ts
// Live monitoring of $JOV pool status
// Run: npx tsx scripts/monitor-pool.ts
// ═══════════════════════════════════════════════════════════════

const JOV_MINT = '4qHkV14MAqHqM5eEX9YzeTNhdGnzDeWQYj8kXpQUjov0';

async function monitor() {
  console.log('⚡ $JOV Pool Monitor');
  console.log('═'.repeat(56));

  // Fetch token data from Jupiter
  const res = await fetch(`https://datapi.jup.ag/v1/assets/search?query=${JOV_MINT}`);
  const data = await res.json() as any;
  const token = Array.isArray(data) ? data[0] : data;

  if (!token) {
    console.log('  Token not found on Jupiter. May be pre-migration.');
    return;
  }

  const price = token.usdPrice || 0;
  const mcap = token.mcap || token.fdv || 0;
  const liq = token.liquidity || 0;
  const holders = token.holderCount || 0;
  const bc = token.bondingCurve;
  const vol = token.stats24h
    ? (token.stats24h.buyVolume || 0) + (token.stats24h.sellVolume || 0)
    : 0;

  console.log(`  Token:       JOV ($JOV)`);
  console.log(`  Mint:        ${JOV_MINT}`);
  console.log(`  Price:       $${price < 0.01 ? price.toFixed(10) : price.toFixed(6)}`);
  console.log(`  Market Cap:  $${formatNum(mcap)}`);
  console.log(`  Liquidity:   $${formatNum(liq)}`);
  console.log(`  24h Volume:  $${formatNum(vol)}`);
  console.log(`  Holders:     ${holders.toLocaleString()}`);
  
  if (bc !== undefined) {
    console.log(`  Bonding:     ${bc.toFixed(1)}% filled`);
    const bar = '█'.repeat(Math.floor(bc / 2)) + '░'.repeat(50 - Math.floor(bc / 2));
    console.log(`  Progress:    [${bar}]`);
    
    if (bc >= 100) {
      console.log(`  Status:      ✅ GRADUATED — migrated to DAMM v2`);
    } else {
      console.log(`  Status:      🔄 PRE-MIGRATION — bonding curve active`);
      console.log(`  To migrate:  ~${(370 * (1 - bc / 100)).toFixed(0)} SOL remaining`);
    }
  }

  console.log('═'.repeat(56));
  console.log(`  Explorer:    https://solscan.io/token/${JOV_MINT}`);
  console.log(`  Jupiter:     https://jup.ag/swap/SOL-${JOV_MINT}`);
  console.log(`  Last check:  ${new Date().toISOString()}`);
}

function formatNum(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(2) + 'K';
  return n.toFixed(2);
}

monitor().catch(console.error);
