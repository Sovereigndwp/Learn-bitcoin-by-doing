import React, { useState } from 'react';
import SimLayout from '../components/SimLayout';
import { calcRelativeLocktime } from '../utils/btc';

function Socratic({ q, hint }){
  const [open, setOpen] = useState(false);
  return (
    <details className="qa" open={open} onToggle={e=>setOpen(e.target.open)}>
      <summary>{q}</summary>
      <div className="hint"><strong>Hint:</strong> {hint}</div>
    </details>
  );
}

export default function RelativeLocktimeLab() {
  const [mode, setMode] = useState('blocks');
  const [value, setValue] = useState(100);

  const result = calcRelativeLocktime(value, mode);

  const learn = (
    <div>
      <p>Relative locktime is a delay. Spend is valid only after enough blocks or seconds pass.</p>
      <ul>
        <li>Blocks ≈ 10 minutes each on average.</li>
        <li>Seconds are wall-clock time.</li>
      </ul>
    </div>
  );

  const play = (
    <div className="grid">
      <div className="coach">Use blocks to align with chain events.</div>
      <label>Mode:
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="blocks">Blocks</option>
          <option value="seconds">Seconds</option>
        </select>
      </label>

      <label>Value:
        <input type="number" min="1" max="1000000" value={value} onChange={e => setValue(Number(e.target.value))} />
      </label>

      <div className="card">
        {result.ok ? (
          <>
            <p>{result.text}</p>
            <p>As seconds: <strong>{result.seconds}</strong></p>
            <p>As blocks: <strong>{result.blocks}</strong></p>
            <p className="hint">Blocks vary. Do not treat them as exact minutes.</p>
          </>
        ) : <p>{result.text}</p>}
      </div>

      <div className="mini">
        <p><strong>Try this:</strong> Set a 2-hour delay. Is it clearer in seconds (7200) or blocks (~12)? Why?</p>
      </div>
    </div>
  );

  const reflect = (
    <div className="reflect">
      <Socratic q="You set 100 blocks. Blocks slow down this week. What changes?" hint="Calendar time grows; 100 blocks remain 100 blocks." />
      <Socratic q="When would seconds be better than blocks?" hint="When wall-clock timing matters." />
      <Socratic q="How does a time-lock help a family safety plan?" hint="It buys time to respond before funds can move." />
    </div>
  );

  return <SimLayout title="Relative Locktime Lab" learn={learn} play={play} reflect={reflect} />;
}
