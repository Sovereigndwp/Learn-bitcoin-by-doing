import React, { useState } from 'react';
import SimLayout from '../components/SimLayout';
import { retargetDifficulty, clamp } from '../utils/btc';

function Socratic({ q, hint }){
  const [open, setOpen] = useState(false);
  return (
    <details className="qa" open={open} onToggle={e=>setOpen(e.target.open)}>
      <summary>{q}</summary>
      <div className="hint"><strong>Hint:</strong> {hint}</div>
    </details>
  );
}

export default function DifficultyAdjuster() {
  const [hashpower, setHashpower] = useState(100);
  const [actualTime, setActualTime] = useState(600);
  const targetTime = 600;

  const ratio = (actualTime / targetTime).toFixed(2);
  const newDiffMul = retargetDifficulty(targetTime, actualTime).toFixed(2);
  const coach = actualTime < 600 ? 'Blocks are fast. Expect difficulty to rise.' :
               actualTime > 600 ? 'Blocks are slow. Expect difficulty to fall.' :
               'Right on target.';

  const learn = (
    <div>
      <p>Blocks aim for ~10 minutes. If blocks come faster, the network raises difficulty. If slower, it lowers difficulty. No committee needed.</p>
    </div>
  );

  const play = (
    <div className="grid">
      <div className="coach">{coach}</div>
      <label>Hashpower (relative): {hashpower}%
        <input type="range" min="10" max="300" value={hashpower} onChange={e => {
          const v = Number(e.target.value);
          setHashpower(v);
          const seconds = clamp(Math.round(600 * (100 / v)), 60, 1800);
          setActualTime(seconds);
        }} />
      </label>

      <label>Actual avg block time (sec):
        <input type="number" value={actualTime} min="60" max="1800" onChange={e => setActualTime(Number(e.target.value))} />
      </label>

      <div className="card">
        <p>Actual vs Target: <strong>{ratio}x</strong></p>
        <p>New Difficulty Multiplier: <strong>{newDiffMul}x</strong></p>
        <p className="hint">&gt; 1 harder, &lt; 1 easier.</p>
      </div>

      <div className="mini">
        <p><strong>Try this:</strong> Set hashpower to 200%. Predict the next difficulty change before you look.</p>
      </div>
    </div>
  );

  const reflect = (
    <div className="reflect">
      <Socratic q="Blocks are 30% faster for two weeks. What should happen to difficulty?" hint="Faster blocks → raise difficulty." />
      <Socratic q="Why is automatic adjustment safer than a board meeting?" hint="No single point of control. Uses measured data." />
      <Socratic q="If many miners shut down, what happens before/after the retarget?" hint="Blocks slow; after retarget difficulty drops." />
    </div>
  );

  return <SimLayout title="Difficulty Adjuster" learn={learn} play={play} reflect={reflect} />;
}
