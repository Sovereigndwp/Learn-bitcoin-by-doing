import React, { useState } from 'react';
import EasyMoneyPrinter from '../components/EasyMoneyPrinter';
import GoldMiningChallenge from '../components/GoldMiningChallenge';
import ProofOfWorkDemo from '../components/ProofOfWorkDemo';

const DigitalScarcity = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const next = () => setStage(stage + 1);

  return (
    <>
      {stage === 0 && <EasyMoneyPrinter onDone={next} />}
      {stage === 1 && <GoldMiningChallenge onDone={next} />}
      {stage === 2 && <ProofOfWorkDemo onFinish={() => onComplete(6)} />}
    </>
  );
};

export default DigitalScarcity;
