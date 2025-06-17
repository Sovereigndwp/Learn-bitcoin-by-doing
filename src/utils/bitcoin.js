// Browser-compatible Bitcoin utilities for educational purposes

// Number and Encoding Utilities
export const hexToDec = (hex) => {
  return parseInt(hex, 16);
};

export const decToHex = (dec) => {
  return dec.toString(16).padStart(2, '0');
};

export const hexToLittleEndian = (hex) => {
  // Convert hex string to little endian format
  const bytes = hex.match(/.{1,2}/g) || [];
  return bytes.reverse().join('');
};

export const littleEndianToHex = (littleEndian) => {
  // Convert little endian format back to hex
  const bytes = littleEndian.match(/.{1,2}/g) || [];
  return bytes.reverse().join('');
};

// Convert string to Uint8Array for crypto operations
const stringToUint8Array = (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str);
};

// Convert ArrayBuffer to hex string
const arrayBufferToHex = (buffer) => {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

// Real SHA-256 implementation using Web Crypto API
export const sha256 = async (message) => {
  try {
    const msgUint8 = stringToUint8Array(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    return arrayBufferToHex(hashBuffer);
  } catch (error) {
    console.error('SHA-256 hashing failed:', error);
    throw error;
  }
};

// Double SHA-256 hash (used in Bitcoin)
export const hash256 = async (message) => {
  try {
    const firstHash = await sha256(message);
    return await sha256(firstHash);
  } catch (error) {
    console.error('Double SHA-256 hashing failed:', error);
    throw error;
  }
};

// Mining Simulation
export const isValidHash = (hash, target) => {
  // Check if hash is below target (has enough leading zeros)
  try {
    const hashBigInt = BigInt('0x' + hash);
    const targetBigInt = BigInt('0x' + target);
    return hashBigInt < targetBigInt;
  } catch (error) {
    // Fallback for browsers without BigInt
    return hash < target;
  }
};

export const mineBlock = (blockHeader, target, maxNonce = 10000) => {
  // Simple mining simulation
  for (let nonce = 0; nonce < maxNonce; nonce++) {
    const blockWithNonce = blockHeader + nonce.toString(16).padStart(8, '0');
    const hash = hash256(blockWithNonce);
    
    if (isValidHash(hash, target)) {
      return {
        success: true,
        nonce,
        hash,
        attempts: nonce + 1
      };
    }
  }
  
  return {
    success: false,
    attempts: maxNonce
  };
};

// Simple Key Generation (Educational purposes only)
export const generatePrivateKey = () => {
  // Generate a random 32-byte private key (educational simulation)
  let privateKey = '';
  for (let i = 0; i < 64; i++) {
    privateKey += Math.floor(Math.random() * 16).toString(16);
  }
  return privateKey;
};

export const privateKeyToPublicKey = (privateKeyHex) => {
  try {
    // Educational simulation of public key generation
    return sha256(privateKeyHex + "pubkey").substring(0, 66);
  } catch (error) {
    throw new Error('Invalid private key');
  }
};

export const publicKeyToAddress = (publicKeyHex, network = 'testnet') => {
  try {
    // Educational simulation of address generation
    const prefix = network === 'mainnet' ? '1' : 'm';
    const addressHash = sha256(publicKeyHex + "address").substring(0, 25);
    return prefix + addressHash;
  } catch (error) {
    throw new Error('Invalid public key');
  }
};

// Transaction Utilities (Educational purposes)
export const createSimpleTransaction = (inputs, outputs, network = 'testnet') => {
  try {
    return {
      inputs: inputs.length,
      outputs: outputs.length,
      txid: sha256(JSON.stringify({inputs, outputs}) + Date.now()),
      message: 'Educational transaction simulation'
    };
  } catch (error) {
    throw new Error('Failed to create transaction: ' + error.message);
  }
};

// Script Utilities
export const decodeScript = (scriptHex) => {
  try {
    // Educational script decoding
    const opcodes = {
      '76': 'OP_DUP',
      'a9': 'OP_HASH160',
      '88': 'OP_EQUALVERIFY',
      'ac': 'OP_CHECKSIG'
    };
    
    let decoded = '';
    for (let i = 0; i < scriptHex.length; i += 2) {
      const opcode = scriptHex.substring(i, i + 2);
      decoded += (opcodes[opcode] || opcode) + ' ';
    }
    
    return decoded.trim();
  } catch (error) {
    throw new Error('Invalid script');
  }
};

export const encodeScript = (scriptAsm) => {
  try {
    // Educational script encoding
    const opcodes = {
      'OP_DUP': '76',
      'OP_HASH160': 'a9',
      'OP_EQUALVERIFY': '88',
      'OP_CHECKSIG': 'ac'
    };
    
    return scriptAsm.split(' ').map(op => opcodes[op] || op).join('');
  } catch (error) {
    throw new Error('Invalid script ASM');
  }
};

// Merkle Tree Utilities
export const calculateMerkleRoot = (txids) => {
  if (txids.length === 0) return null;
  if (txids.length === 1) return txids[0];
  
  let level = [...txids];
  
  while (level.length > 1) {
    const nextLevel = [];
    
    for (let i = 0; i < level.length; i += 2) {
      const left = level[i];
      const right = level[i + 1] || left; // Duplicate last hash if odd number
      
      const combined = left + right;
      const hash = hash256(combined);
      nextLevel.push(hash);
    }
    
    level = nextLevel;
  }
  
  return level[0];
};

export const getMerkleProof = (txids, targetTxid) => {
  const proof = [];
  let level = [...txids];
  let targetIndex = level.indexOf(targetTxid);
  
  if (targetIndex === -1) {
    throw new Error('Transaction not found in block');
  }
  
  while (level.length > 1) {
    const nextLevel = [];
    
    for (let i = 0; i < level.length; i += 2) {
      const left = level[i];
      const right = level[i + 1] || left;
      
      if (i === targetIndex || i + 1 === targetIndex) {
        // Add sibling to proof
        const sibling = (i === targetIndex) ? right : left;
        const isLeft = (i === targetIndex);
        proof.push({ hash: sibling, isLeft: !isLeft });
      }
      
      const combined = left + right;
      const hash = hash256(combined);
      nextLevel.push(hash);
    }
    
    targetIndex = Math.floor(targetIndex / 2);
    level = nextLevel;
  }
  
  return proof;
};

export const verifyMerkleProof = (txid, proof, merkleRoot) => {
  let hash = txid;
  
  for (const step of proof) {
    const combined = step.isLeft ? step.hash + hash : hash + step.hash;
    hash = hash256(combined);
  }
  
  return hash === merkleRoot;
};

// Validation Utilities
export const isValidHex = (str) => {
  return /^[0-9a-fA-F]+$/.test(str);
};

export const isValidBitcoinAddress = (address, network = 'testnet') => {
  try {
    // Educational validation
    const validPrefixes = network === 'mainnet' ? ['1', '3', 'bc1'] : ['m', '2', 'tb1'];
    return validPrefixes.some(prefix => address.startsWith(prefix)) && address.length > 25 && address.length < 62;
  } catch (error) {
    return false;
  }
};

// Format Utilities
export const formatSatoshis = (satoshis) => {
  return (satoshis / 100000000).toFixed(8) + ' BTC';
};

export const satoshisToBTC = (satoshis) => {
  return satoshis / 100000000;
};

export const BTCToSatoshis = (btc) => {
  return Math.round(btc * 100000000);
}; 