import React, { useState } from 'react';
import { ArrowRight, Plus, Trash2, Send } from 'lucide-react';
import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import './TransactionBuilder.css';

bitcoin.initEccLib(ecc);

const TransactionBuilder = () => {
  const [senders, setSenders] = useState([
    { name: '', address: '', amount: 0 }
  ]);
  const [receivers, setReceivers] = useState([
    { name: '', address: '', amount: 0 }
  ]);
  const [fee, setFee] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const addSender = () => {
    setSenders([...senders, { name: '', address: '', amount: 0 }]);
  };

  const addReceiver = () => {
    setReceivers([...receivers, { name: '', address: '', amount: 0 }]);
  };

  const removeSender = (index) => {
    setSenders(senders.filter((_, i) => i !== index));
  };

  const removeReceiver = (index) => {
    setReceivers(receivers.filter((_, i) => i !== index));
  };

  const updateSender = (index, field, value) => {
    const newSenders = [...senders];
    newSenders[index] = { ...newSenders[index], [field]: value };
    setSenders(newSenders);
    calculateFee();
  };

  const updateReceiver = (index, field, value) => {
    const newReceivers = [...receivers];
    newReceivers[index] = { ...newReceivers[index], [field]: value };
    setReceivers(newReceivers);
    calculateFee();
  };

  const calculateFee = () => {
    const totalSending = senders.reduce((sum, sender) => sum + parseFloat(sender.amount || 0), 0);
    const totalReceiving = receivers.reduce((sum, receiver) => sum + parseFloat(receiver.amount || 0), 0);
    const calculatedFee = Math.max(0, totalSending - totalReceiving);
    setFee(calculatedFee);
  };

  const handleSend = () => {
    try {
      // Validate inputs
      if (!senders[0].address || !receivers[0].address) {
        setError('Please fill in both sender and receiver addresses');
        return;
      }

      if (senders.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0) <= 0) {
        setError('Please enter a valid amount to send');
        return;
      }

      // In a real app, this would create and broadcast the transaction
      setSuccess(true);
      setError('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Something went wrong. Please check your inputs and try again.');
    }
  };

  return (
    <div className="transaction-builder">
      <h2>Send Bitcoin</h2>
      
      <div className="section">
        <h3>Who's Sending?</h3>
        {senders.map((sender, index) => (
          <div key={index} className="person-row">
            <input
              type="text"
              placeholder="Sender's name (e.g., Bob)"
              value={sender.name}
              onChange={(e) => updateSender(index, 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Sender's Bitcoin address"
              value={sender.address}
              onChange={(e) => updateSender(index, 'address', e.target.value)}
            />
            <div className="amount-input">
              <input
                type="number"
                placeholder="Amount"
                value={sender.amount}
                onChange={(e) => updateSender(index, 'amount', parseFloat(e.target.value))}
                step="0.00000001"
              />
              <span className="currency">BTC</span>
            </div>
            <button className="remove-button" onClick={() => removeSender(index)} aria-label="Remove sender">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button className="add-button" onClick={addSender}>
          <Plus size={16} /> Add Another Sender
        </button>
      </div>

      <div className="arrow-section">
        <ArrowRight size={24} />
      </div>

      <div className="section">
        <h3>Who's Receiving?</h3>
        {receivers.map((receiver, index) => (
          <div key={index} className="person-row">
            <input
              type="text"
              placeholder="Receiver's name (e.g., Alice)"
              value={receiver.name}
              onChange={(e) => updateReceiver(index, 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Receiver's Bitcoin address"
              value={receiver.address}
              onChange={(e) => updateReceiver(index, 'address', e.target.value)}
            />
            <div className="amount-input">
              <input
                type="number"
                placeholder="Amount"
                value={receiver.amount}
                onChange={(e) => updateReceiver(index, 'amount', parseFloat(e.target.value))}
                step="0.00000001"
              />
              <span className="currency">BTC</span>
            </div>
            <button className="remove-button" onClick={() => removeReceiver(index)} aria-label="Remove receiver">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button className="add-button" onClick={addReceiver}>
          <Plus size={16} /> Add Another Receiver
        </button>
      </div>

      <div className="fee-section">
        <div className="fee-explanation">
          <h3>Network Fee</h3>
          <p>This is what you'll pay to the Bitcoin network to process your transaction. Lower fees mean longer waiting times.</p>
        </div>
        <div className="fee-amount">
          <span>{fee.toFixed(8)} BTC</span>
          <span className="fee-sats">({Math.floor(fee * 100000000)} satoshis)</span>
        </div>
      </div>

      <button 
        className={`send-button ${success ? 'success' : ''}`} 
        onClick={handleSend}
        disabled={success}
      >
        {success ? 'Sent Successfully!' : (
          <><Send size={16} /> Send Bitcoin</>
        )}
      </button>

      {error && <div className="error-message">{error}</div>}

      <div className="helpful-tips">
        <h3>💡 Helpful Tips:</h3>
        <ul>
          <li>Double-check the receiver's address - Bitcoin transactions can't be undone!</li>
          <li>Make sure you have enough Bitcoin to cover both the amount and the network fee</li>
          <li>Higher fees mean faster processing times</li>
        </ul>
      </div>
    </div>
  );
};

export default TransactionBuilder; 