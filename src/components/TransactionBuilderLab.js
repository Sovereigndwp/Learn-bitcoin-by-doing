import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import './TransactionBuilderLab.css';

const mockUTXOs = [
  { id: 1, amount: 0.5, confirmations: 6 },
  { id: 2, amount: 0.3, confirmations: 12 },
  { id: 3, amount: 0.8, confirmations: 3 },
  { id: 4, amount: 0.1, confirmations: 20 }
];

const TransactionBuilderLab = ({ onComplete }) => {
  const [selectedInputs, setSelectedInputs] = useState([]);
  const [outputs, setOutputs] = useState([{ address: '', amount: '' }]);
  const [feeRate, setFeeRate] = useState(10); // sats/byte
  const [estimatedSize, setEstimatedSize] = useState(0);
  const [rawTransaction, setRawTransaction] = useState('');
  const [error, setError] = useState('');
  const [stage, setStage] = useState('input-selection'); // input-selection, output-creation, fee-calculation, review

  const calculateTotalInput = () => {
    return selectedInputs.reduce((sum, utxo) => sum + utxo.amount, 0);
  };

  const calculateTotalOutput = () => {
    return outputs.reduce((sum, output) => sum + (parseFloat(output.amount) || 0), 0);
  };

  const estimateTransactionSize = useCallback(() => {
    // Rough size estimation:
    // 10 bytes overhead
    // 148 bytes per input
    // 34 bytes per output
    return 10 + (selectedInputs.length * 148) + (outputs.length * 34);
  }, [selectedInputs.length, outputs.length]);

  const calculateFee = () => {
    const size = estimateTransactionSize();
    return (size * feeRate) / 100000000; // Convert sats to BTC
  };

  const handleInputSelect = (utxo) => {
    if (selectedInputs.find(input => input.id === utxo.id)) {
      setSelectedInputs(selectedInputs.filter(input => input.id !== utxo.id));
    } else {
      setSelectedInputs([...selectedInputs, utxo]);
    }
  };

  const handleOutputChange = (index, field, value) => {
    const newOutputs = [...outputs];
    newOutputs[index] = { ...newOutputs[index], [field]: value };
    setOutputs(newOutputs);
  };

  const addOutput = () => {
    setOutputs([...outputs, { address: '', amount: '' }]);
  };

  const removeOutput = (index) => {
    if (outputs.length > 1) {
      setOutputs(outputs.filter((_, i) => i !== index));
    }
  };

  const generateMockRawTx = () => {
    // Generate a mock raw transaction hex
    const mockTx = '02000000' + // version
      selectedInputs.map(() => '01234567...').join('') + // inputs
      outputs.map(() => '89abcdef...').join(''); // outputs
    setRawTransaction(mockTx);
  };

  const validateTransaction = () => {
    const totalIn = calculateTotalInput();
    const totalOut = calculateTotalOutput();
    const fee = calculateFee();
    
    if (totalIn < (totalOut + fee)) {
      setError('Insufficient funds: inputs must cover outputs plus fees');
      return false;
    }
    
    if (outputs.some(output => !output.address || !output.amount)) {
      setError('All outputs must have valid addresses and amounts');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleContinue = () => {
    if (stage === 'input-selection' && selectedInputs.length > 0) {
      setStage('output-creation');
    } else if (stage === 'output-creation' && validateTransaction()) {
      setStage('fee-calculation');
    } else if (stage === 'fee-calculation') {
      generateMockRawTx();
      setStage('review');
    } else if (stage === 'review') {
      onComplete();
    }
  };

  useEffect(() => {
    const size = estimateTransactionSize();
    setEstimatedSize(size);
  }, [selectedInputs, outputs, estimateTransactionSize]);

  return (
    <div className="transaction-builder">
      <div className="stage-indicator">
        <div className={`stage ${stage === 'input-selection' ? 'active' : ''}`}>
          1. Select Inputs
        </div>
        <ArrowRight size={16} />
        <div className={`stage ${stage === 'output-creation' ? 'active' : ''}`}>
          2. Add Outputs
        </div>
        <ArrowRight size={16} />
        <div className={`stage ${stage === 'fee-calculation' ? 'active' : ''}`}>
          3. Set Fee
        </div>
        <ArrowRight size={16} />
        <div className={`stage ${stage === 'review' ? 'active' : ''}`}>
          4. Review
        </div>
      </div>

      {stage === 'input-selection' && (
        <div className="input-selection-section">
          <h3>Available UTXOs (Unspent Transaction Outputs)</h3>
          <div className="utxo-grid">
            {mockUTXOs.map(utxo => (
              <div
                key={utxo.id}
                className={`utxo-box ${selectedInputs.find(input => input.id === utxo.id) ? 'selected' : ''}`}
                onClick={() => handleInputSelect(utxo)}
              >
                <div className="utxo-amount">{utxo.amount} BTC</div>
                <div className="utxo-confirmations">{utxo.confirmations} confirmations</div>
              </div>
            ))}
          </div>
          <div className="total-selected">
            Total Selected: {calculateTotalInput().toFixed(8)} BTC
          </div>
        </div>
      )}

      {stage === 'output-creation' && (
        <div className="output-creation-section">
          <h3>Create Transaction Outputs</h3>
          {outputs.map((output, index) => (
            <div key={index} className="output-row">
              <input
                type="text"
                placeholder="Recipient Address"
                value={output.address}
                onChange={(e) => handleOutputChange(index, 'address', e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount (BTC)"
                value={output.amount}
                onChange={(e) => handleOutputChange(index, 'amount', e.target.value)}
              />
              {outputs.length > 1 && (
                <button 
                  className="remove-output"
                  onClick={() => removeOutput(index)}
                >
                  <Minus size={16} />
                </button>
              )}
            </div>
          ))}
          <button className="add-output" onClick={addOutput}>
            <Plus size={16} /> Add Output
          </button>
          {error && <div className="error-message">{error}</div>}
        </div>
      )}

      {stage === 'fee-calculation' && (
        <div className="fee-calculation-section">
          <h3>Calculate Transaction Fee</h3>
          <div className="fee-calculator">
            <div className="fee-rate-selector">
              <label>Fee Rate (sats/byte):</label>
              <select value={feeRate} onChange={(e) => setFeeRate(parseInt(e.target.value))}>
                <option value="5">5 (Low Priority)</option>
                <option value="10">10 (Medium Priority)</option>
                <option value="20">20 (High Priority)</option>
              </select>
            </div>
            <div className="fee-breakdown">
              <div className="fee-item">
                <span>Transaction Size:</span>
                <span>{estimatedSize} bytes</span>
              </div>
              <div className="fee-item">
                <span>Fee Amount:</span>
                <span>{calculateFee().toFixed(8)} BTC</span>
              </div>
              <div className="fee-item total">
                <span>Change Amount:</span>
                <span>
                  {(calculateTotalInput() - calculateTotalOutput() - calculateFee()).toFixed(8)} BTC
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {stage === 'review' && (
        <div className="review-section">
          <h3>Review Transaction</h3>
          <div className="transaction-summary">
            <div className="summary-section">
              <h4>Inputs ({selectedInputs.length})</h4>
              <div className="summary-amount">Total: {calculateTotalInput().toFixed(8)} BTC</div>
            </div>
            <ArrowRight size={24} />
            <div className="summary-section">
              <h4>Outputs ({outputs.length})</h4>
              <div className="summary-amount">Total: {calculateTotalOutput().toFixed(8)} BTC</div>
              <div className="summary-fee">Fee: {calculateFee().toFixed(8)} BTC</div>
            </div>
          </div>
          <div className="raw-transaction">
            <h4>Raw Transaction</h4>
            <code>{rawTransaction}</code>
          </div>
        </div>
      )}

      <div className="navigation-buttons">
        {stage !== 'input-selection' && (
          <button 
            className="back-button"
            onClick={() => setStage(prev => {
              if (prev === 'output-creation') return 'input-selection';
              if (prev === 'fee-calculation') return 'output-creation';
              if (prev === 'review') return 'fee-calculation';
              return prev;
            })}
          >
            Back
          </button>
        )}
        <button 
          className="continue-button"
          onClick={handleContinue}
          disabled={
            (stage === 'input-selection' && selectedInputs.length === 0) ||
            (stage === 'output-creation' && !validateTransaction())
          }
        >
          {stage === 'review' ? 'Complete' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default TransactionBuilderLab; 