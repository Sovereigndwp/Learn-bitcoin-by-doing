import React, { useState } from 'react';
import SimLayout from '../components/SimLayout';
import { makeBlankPSBT, addPartialSig, finalizePSBT } from '../utils/btc';

function Socratic({ q, hint }){
  const [open, setOpen] = useState(false);
  return (
    <details className="qa" open={open} onToggle={e=>setOpen(e.target.open)}>
      <summary>{q}</summary>
      <div className="hint"><strong>Hint:</strong> {hint}</div>
    </details>
  );
}

export default function PSBTDecoderLab() {
  const [psbt, setPsbt] = useState(makeBlankPSBT());
  const [signer, setSigner] = useState('Alice');

  const learn = (
    <div>
      <p>PSBT is a safe envelope for a transaction. People can sign on different devices without exposing keys. When enough signers add their part, you finalize.</p>
      <ul>
        <li><strong>m-of-n policy</strong>: how many signatures are required</li>
        <li><strong>Partial signatures</strong>: who has signed so far</li>
        <li><strong>Finalize</strong>: allowed once the policy is met</li>
      </ul>
    </div>
  );

  const play = (
    <div className="grid">
      <div className="coach">Use 2-of-3 as a default for resilience.</div>

      <div className="card">
        <p><strong>Policy:</strong> {psbt.policy.m} of {psbt.policy.n}</p>
        <p><strong>Inputs:</strong> {psbt.inputs.length}</p>
        <p><strong>UTXO:</strong> {psbt.inputs[0].utxo}</p>
        <p><strong>Signers so far:</strong> {psbt.inputs[0].partialSigs.join(', ') || 'None'}</p>
        <p><strong>Finalized:</strong> {psbt.finalized ? 'Yes' : 'No'}</p>
      </div>

      <label>Signer name:
        <input type="text" value={signer} onChange={e => setSigner(e.target.value)} />
      </label>
      <button onClick={() => setPsbt(addPartialSig(psbt, signer))}>Add Partial Sig</button>

      <button onClick={() => setPsbt(finalizePSBT(psbt))}>Finalize</button>

      <div className="mini">
        <p><strong>Try this:</strong> Add two different signers. Then press Finalize. Change policy to 1-of-1 in code and see what breaks.</p>
      </div>
    </div>
  );

  const reflect = (
    <div className="reflect">
      <Socratic q="Why pass a PSBT instead of a raw transaction to another signer?" hint="It carries needed data in a structured way and avoids unsafe edits." />
      <Socratic q="When is 2-of-3 better than 1-of-1 for custody?" hint="It reduces single point of failure and allows recovery if one key is lost." />
      <Socratic q="What new risks appear if you switch to 3-of-3?" hint="Loss of any key blocks spending; no slack." />
    </div>
  );

  return <SimLayout title="PSBT Decoder Lab" learn={learn} play={play} reflect={reflect} />;
}
