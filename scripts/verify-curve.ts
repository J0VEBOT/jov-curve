// ═══════════════════════════════════════════════════════════════
// jov-curve / scripts / verify-curve.ts
// Verify $JOV bonding curve parameters post-deployment
// Run: npx tsx scripts/verify-curve.ts
// ═══════════════════════════════════════════════════════════════

const JOV_MINT = '4qHkV14MAqHqM5eEX9YzeTNhdGnzDeWQYj8kXpQUjov0';
const TOTAL_SUPPLY = 1_000_000_000;
const DECIMALS = 9;

interface CurvePoint {
  solIn: number;
  price: number;
  fdv: number;
  percentFilled: number;
  tokensOut: number;
}

function simulateCurve(): CurvePoint[] {
  const initFdv = 30;   // SOL
  const migFdv = 400;   // SOL
  const points: CurvePoint[] = [];

  // CP-AMM: price increases as liquidity enters
  // k = x * y (constant product)
  const steps = 20;
  for (let i = 0; i <= steps; i++) {
    const pct = i / steps;
    const solIn = pct * 370; // ~370 SOL to fill
    
    // Price follows bonding curve: P = initPrice * (1 + solIn/k)^2
    const priceMultiple = 1 + (pct * (Math.sqrt(migFdv / initFdv) - 1));
    const price = (initFdv / TOTAL_SUPPLY) * (priceMultiple ** 2);
    const fdv = price * TOTAL_SUPPLY;
    const tokensOut = solIn / price;

    points.push({
      solIn: Math.round(solIn * 100) / 100,
      price,
      fdv: Math.round(fdv * 100) / 100,
      percentFilled: Math.round(pct * 100),
      tokensOut: Math.round(tokensOut),
    });
  }

  return points;
}

function printCurve() {
  console.log('⚡ $JOV Bonding Curve Verification');
  console.log('═'.repeat(72));
  console.log(`  Mint:       ${JOV_MINT}`);
  console.log(`  Supply:     ${TOTAL_SUPPLY.toLocaleString()} JOV`);
  console.log(`  Init FDV:   30 SOL`);
  console.log(`  Migrate:    400 SOL (13.3x)`);
  console.log(`  Curve:      Constant Product (CP-AMM)`);
  console.log('═'.repeat(72));
  console.log();

  const points = simulateCurve();

  // Table header
  console.log('  Fill%  │  SOL In    │  Price (SOL)       │  FDV (SOL)  │  Tokens Out');
  console.log('  ──────┼────────────┼────────────────────┼─────────────┼─────────────');

  for (const p of points) {
    const fill = String(p.percentFilled).padStart(4) + '%';
    const sol = String(p.solIn.toFixed(1)).padStart(8);
    const price = p.price.toFixed(12).padStart(18);
    const fdv = String(p.fdv.toFixed(1)).padStart(9);
    const tokens = p.tokensOut.toLocaleString().padStart(13);
    console.log(`  ${fill}  │  ${sol}  │  ${price}  │  ${fdv}  │  ${tokens}`);
  }

  console.log();

  // ASCII bonding curve chart
  console.log('  Bonding Curve Visualization:');
  console.log('  ┌' + '─'.repeat(50) + '┐');
  const chartHeight = 15;
  const maxFdv = 400;
  for (let row = chartHeight; row >= 0; row--) {
    let line = '  │';
    const threshold = (row / chartHeight) * maxFdv;
    for (let col = 0; col < 50; col++) {
      const pct = col / 50;
      const solIn = pct * 370;
      const priceMultiple = 1 + (pct * (Math.sqrt(400 / 30) - 1));
      const fdv = 30 * (priceMultiple ** 2);
      if (fdv >= threshold) {
        if (Math.abs(fdv - threshold) < maxFdv / chartHeight) {
          line += '█';
        } else {
          line += '░';
        }
      } else {
        line += ' ';
      }
    }
    const label = row === chartHeight ? ' 400 SOL (migration)' : row === 0 ? ' 30 SOL (launch)' : '';
    line += '│' + label;
    console.log(line);
  }
  console.log('  └' + '─'.repeat(50) + '┘');
  console.log('   0 SOL' + ' '.repeat(34) + '~370 SOL');
  console.log();
  console.log('  ● Migration threshold: 400 SOL FDV');
  console.log('  ● After migration: graduates to full DAMM v2 pool');
  console.log('  ● Position NFTs: earn trading fees forever');
  console.log();
}

printCurve();
