import React, { useState } from 'react';
import '../styles/sims.css';

/** Socratic layout with Learn / Do / Reflect and a small clipboard export */
export default function SimLayout({ title, learn, play, reflect }) {
  const [tab, setTab] = useState('learn');
  const [notes, setNotes] = useState('');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(notes);
      alert('Reflection copied.');
    } catch {
      alert('Copy failed. Select and copy.');
    }
  };
  return (
    <div className="sim-wrap" role="region" aria-label={title}>
      <h1 className="sim-title">{title}</h1>
      <div className="sim-tabs" role="tablist">
        <button className={tab==='learn'?'on':''} onClick={() => setTab('learn')} role="tab" aria-selected={tab==='learn'}>Learn</button>
        <button className={tab==='do'?'on':''} onClick={() => setTab('do')} role="tab" aria-selected={tab==='do'}>Do</button>
        <button className={tab==='reflect'?'on':''} onClick={() => setTab('reflect')} role="tab" aria-selected={tab==='reflect'}>Reflect</button>
      </div>
      <div className="sim-body">
        {tab === 'learn' && <div className="sim-panel">{learn}</div>}
        {tab === 'do' && <div className="sim-panel">{play}</div>}
        {tab === 'reflect' && (
          <div className="sim-panel">
            {reflect}
            <div className="notes">
              <label>My reflection
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Write what you learned, questions, and one next step." />
              </label>
              <button onClick={copy}>Copy notes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
