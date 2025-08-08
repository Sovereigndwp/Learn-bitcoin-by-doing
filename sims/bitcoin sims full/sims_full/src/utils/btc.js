// Helpers for teaching only. Do not use with real keys or funds.

export function clamp(v, lo, hi){ return Math.max(lo, Math.min(hi, v)); }

// Difficulty retarget intuition: newDifficulty ≈ oldDifficulty * (target/actual), clamped to 0.25x..4x window
export function retargetDifficulty(targetBlockTime, actualAvgBlockTime) {
  if (!actualAvgBlockTime || !targetBlockTime) return 1;
  const ratio = clamp(actualAvgBlockTime / targetBlockTime, 0.25, 4);
  return 1 / ratio; // actual faster → ratio < 1 → difficulty multiplier > 1
}

// Relative locktime intuition (blocks or seconds). 600s per block avg.
export function calcRelativeLocktime(value, mode) {
  if (!value || value < 0) return { ok: false, text: 'Set a locktime value.' };
  if (mode === 'blocks') {
    return { ok: true, blocks: Math.floor(value), seconds: Math.floor(value * 600), text: `Earliest spend after ${value} blocks.` };
  } else {
    const blocks = Math.floor(value / 600);
    return { ok: true, blocks, seconds: Math.floor(value), text: `Earliest spend after about ${blocks} blocks.` };
  }
}

// PSBT teaching model (no signing, only a state machine for visualizing collaboration)
export function makeBlankPSBT() {
  return {
    policy: { m: 2, n: 3 },
    inputs: [{ utxo: 'testnet:txid:0', partialSigs: [] }],
    outputs: [{ address: 'tb1qexample...', value: 100000 }],
    finalized: false
  };
}

export function addPartialSig(psbt, signerName) {
  if (psbt.finalized) return { ...psbt };
  const next = JSON.parse(JSON.stringify(psbt));
  const s = signerName?.trim() || 'Signer';
  if (!next.inputs[0].partialSigs.includes(s)) next.inputs[0].partialSigs.push(s);
  return next;
}

export function finalizePSBT(psbt) {
  const sigs = (psbt.inputs?.[0]?.partialSigs || []).length;
  const done = sigs >= psbt.policy.m;
  const next = JSON.parse(JSON.stringify(psbt));
  next.finalized = done;
  return next;
}
