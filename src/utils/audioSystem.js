/* =====================================================
   PROFESSIONAL AUDIO SYSTEM
   Contextual sound design for enhanced learning experience
   ===================================================== */

class AudioSystem {
  constructor() {
    this.audioContext = null;
    this.sounds = new Map();
    this.enabled = localStorage.getItem('audioEnabled') !== 'false';
    this.volume = parseFloat(localStorage.getItem('audioVolume') || '0.3');
    this.initialized = false;
    
    this.initializeAudioContext();
    this.loadSoundLibrary();
  }

  async initializeAudioContext() {
    try {
      // Modern browsers require user interaction before audio
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = this.volume;
      this.initialized = true;
    } catch (error) {
      console.warn('Audio context not supported:', error);
    }
  }

  // Professional sound library with procedurally generated tones
  loadSoundLibrary() {
    this.soundDefinitions = {
      // Success sounds (musical, not jarring)
      achievement: {
        type: 'chord',
        frequencies: [523.25, 659.25, 783.99], // C-E-G major chord
        duration: 0.8,
        envelope: { attack: 0.1, decay: 0.2, sustain: 0.4, release: 0.5 }
      },
      
      progress: {
        type: 'tone',
        frequency: 880, // A5 - pleasant, not intrusive
        duration: 0.2,
        envelope: { attack: 0.02, decay: 0.05, sustain: 0.1, release: 0.15 }
      },
      
      discovery: {
        type: 'ascending',
        startFreq: 440,
        endFreq: 880,
        duration: 0.4,
        envelope: { attack: 0.05, decay: 0.1, sustain: 0.2, release: 0.25 }
      },

      // Process sounds (realistic but pleasant)
      mining: {
        type: 'filtered_noise',
        frequency: 220,
        duration: 2.0,
        filter: 'lowpass',
        envelope: { attack: 0.3, decay: 0.5, sustain: 1.0, release: 1.2 }
      },
      
      transaction: {
        type: 'digital_whisper',
        frequency: 1760, // High, digital-sounding
        duration: 0.3,
        modulation: { rate: 20, depth: 0.1 }
      },
      
      networkSync: {
        type: 'pulse',
        frequency: 110,
        duration: 1.0,
        pulseRate: 2,
        envelope: { attack: 0.1, decay: 0.3, sustain: 0.4, release: 0.6 }
      },

      // Interactive feedback
      buttonHover: {
        type: 'soft_click',
        frequency: 800,
        duration: 0.1,
        envelope: { attack: 0.01, decay: 0.02, sustain: 0.03, release: 0.04 }
      },
      
      cardFlip: {
        type: 'rustle',
        frequencies: [200, 400, 800, 1600],
        duration: 0.4,
        envelope: { attack: 0.02, decay: 0.1, sustain: 0.1, release: 0.3 }
      },
      
      unlock: {
        type: 'mechanical',
        frequency: 440,
        duration: 0.3,
        clicks: 3,
        envelope: { attack: 0.01, decay: 0.05, sustain: 0.05, release: 0.2 }
      }
    };
  }

  async enableAudio() {
    if (!this.initialized) {
      await this.initializeAudioContext();
    }
    
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    
    this.enabled = true;
    localStorage.setItem('audioEnabled', 'true');
  }

  disableAudio() {
    this.enabled = false;
    localStorage.setItem('audioEnabled', 'false');
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.masterGain) {
      this.masterGain.gain.value = this.volume;
    }
    localStorage.setItem('audioVolume', this.volume.toString());
  }

  // Generate and play contextual sounds
  async playSound(soundName, options = {}) {
    if (!this.enabled || !this.audioContext || !this.initialized) {
      return;
    }

    const soundDef = this.soundDefinitions[soundName];
    if (!soundDef) {
      console.warn(`Sound '${soundName}' not found`);
      return;
    }

    try {
      await this.generateAndPlaySound(soundDef, options);
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }

  async generateAndPlaySound(soundDef, options) {
    const startTime = this.audioContext.currentTime + (options.delay || 0);
    
    switch (soundDef.type) {
      case 'tone':
        this.playTone(soundDef, startTime);
        break;
      case 'chord':
        this.playChord(soundDef, startTime);
        break;
      case 'ascending':
        this.playAscending(soundDef, startTime);
        break;
      case 'pulse':
        this.playPulse(soundDef, startTime);
        break;
      case 'digital_whisper':
        this.playDigitalWhisper(soundDef, startTime);
        break;
      case 'soft_click':
        this.playSoftClick(soundDef, startTime);
        break;
      case 'mechanical':
        this.playMechanical(soundDef, startTime);
        break;
      case 'filtered_noise':
        this.playFilteredNoise(soundDef, startTime);
        break;
      case 'rustle':
        this.playRustle(soundDef, startTime);
        break;
    }
  }

  playTone(soundDef, startTime) {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = soundDef.frequency;
    
    this.applyEnvelope(gainNode, soundDef.envelope, startTime, soundDef.duration);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + soundDef.duration);
  }

  playChord(soundDef, startTime) {
    soundDef.frequencies.forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        oscillator.type = 'sine';
        oscillator.frequency.value = freq;
        
        // Slightly stagger chord notes for natural feel
        const noteStartTime = startTime + (index * 0.02);
        this.applyEnvelope(gainNode, soundDef.envelope, noteStartTime, soundDef.duration);
        
        oscillator.start(noteStartTime);
        oscillator.stop(noteStartTime + soundDef.duration);
      }, index * 20);
    });
  }

  playAscending(soundDef, startTime) {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(soundDef.startFreq, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      soundDef.endFreq, 
      startTime + soundDef.duration
    );
    
    this.applyEnvelope(gainNode, soundDef.envelope, startTime, soundDef.duration);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + soundDef.duration);
  }

  playPulse(soundDef, startTime) {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const lfoOscillator = this.audioContext.createOscillator();
    const lfoGain = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    lfoOscillator.connect(lfoGain);
    lfoGain.connect(gainNode.gain);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = soundDef.frequency;
    
    lfoOscillator.type = 'square';
    lfoOscillator.frequency.value = soundDef.pulseRate;
    lfoGain.gain.value = 0.3;
    
    this.applyEnvelope(gainNode, soundDef.envelope, startTime, soundDef.duration);
    
    oscillator.start(startTime);
    lfoOscillator.start(startTime);
    oscillator.stop(startTime + soundDef.duration);
    lfoOscillator.stop(startTime + soundDef.duration);
  }

  playDigitalWhisper(soundDef, startTime) {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    oscillator.type = 'square';
    oscillator.frequency.value = soundDef.frequency;
    
    filter.type = 'highpass';
    filter.frequency.value = soundDef.frequency * 0.5;
    
    // Modulation for digital effect
    const lfo = this.audioContext.createOscillator();
    const lfoGain = this.audioContext.createGain();
    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency);
    
    lfo.type = 'sine';
    lfo.frequency.value = soundDef.modulation.rate;
    lfoGain.gain.value = soundDef.frequency * soundDef.modulation.depth;
    
    gainNode.gain.setValueAtTime(0.1, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + soundDef.duration);
    
    oscillator.start(startTime);
    lfo.start(startTime);
    oscillator.stop(startTime + soundDef.duration);
    lfo.stop(startTime + soundDef.duration);
  }

  playSoftClick(soundDef, startTime) {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    oscillator.type = 'triangle';
    oscillator.frequency.value = soundDef.frequency;
    
    // Sharp attack and quick decay for click sound
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + soundDef.duration);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + soundDef.duration);
  }

  playMechanical(soundDef, startTime) {
    for (let i = 0; i < soundDef.clicks; i++) {
      const clickTime = startTime + (i * soundDef.duration / soundDef.clicks);
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain);
      
      oscillator.type = 'square';
      oscillator.frequency.value = soundDef.frequency + (i * 50); // Slightly different pitch per click
      
      gainNode.gain.setValueAtTime(0, clickTime);
      gainNode.gain.linearRampToValueAtTime(0.05, clickTime + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.05);
      
      oscillator.start(clickTime);
      oscillator.stop(clickTime + 0.05);
    }
  }

  playFilteredNoise(soundDef, startTime) {
    // Create noise buffer
    const bufferSize = this.audioContext.sampleRate * soundDef.duration;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const source = this.audioContext.createBufferSource();
    const filter = this.audioContext.createBiquadFilter();
    const gainNode = this.audioContext.createGain();
    
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    filter.type = soundDef.filter;
    filter.frequency.value = soundDef.frequency;
    filter.Q.value = 10;
    
    this.applyEnvelope(gainNode, soundDef.envelope, startTime, soundDef.duration);
    
    source.start(startTime);
  }

  playRustle(soundDef, startTime) {
    soundDef.frequencies.forEach((freq, index) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain);
      
      oscillator.type = 'sawtooth';
      oscillator.frequency.value = freq;
      
      const noteStart = startTime + (index * 0.05);
      const envelope = { ...soundDef.envelope };
      envelope.attack *= (1 + index * 0.1);
      
      this.applyEnvelope(gainNode, envelope, noteStart, soundDef.duration);
      
      oscillator.start(noteStart);
      oscillator.stop(noteStart + soundDef.duration);
    });
  }

  applyEnvelope(gainNode, envelope, startTime, duration) {
    const { attack, decay, sustain, release } = envelope;
    const sustainLevel = sustain;
    
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, startTime + attack);
    gainNode.gain.exponentialRampToValueAtTime(
      this.volume * 0.3 * sustainLevel, 
      startTime + attack + decay
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001, 
      startTime + duration
    );
  }

  // Contextual sound triggers for learning events
  onAchievement(level = 'normal') {
    const soundName = level === 'major' ? 'achievement' : 'progress';
    this.playSound(soundName);
    
    if (level === 'major') {
      // Add celebration particles
      this.triggerCelebrationEffects();
    }
  }

  onDiscovery() {
    this.playSound('discovery');
  }

  onInteraction(type) {
    switch (type) {
      case 'hover':
        this.playSound('buttonHover');
        break;
      case 'click':
        this.playSound('unlock');
        break;
      case 'flip':
        this.playSound('cardFlip');
        break;
    }
  }

  onProcess(type, duration = 1000) {
    switch (type) {
      case 'mining':
        this.playSound('mining');
        break;
      case 'transaction':
        this.playSound('transaction');
        break;
      case 'sync':
        this.playSound('networkSync');
        break;
    }
  }

  triggerCelebrationEffects() {
    // Create floating Bitcoin symbols
    const symbols = ['₿', '🟠', '⚡'];
    symbols.forEach((symbol, index) => {
      setTimeout(() => {
        this.createFloatingParticle(symbol);
      }, index * 100);
    });
  }

  createFloatingParticle(symbol) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle bitcoin-accent';
    particle.textContent = symbol;
    particle.style.cssText = `
      position: fixed;
      left: ${Math.random() * window.innerWidth}px;
      top: ${window.innerHeight}px;
      font-size: 24px;
      pointer-events: none;
      z-index: 10000;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 2000);
  }

  // Audio controls UI
  createAudioControls() {
    const controls = document.createElement('div');
    controls.className = 'audio-controls';
    controls.innerHTML = `
      <div class="audio-toggle">
        <label>
          <input type="checkbox" ${this.enabled ? 'checked' : ''} />
          <span>🔊 Audio Feedback</span>
        </label>
      </div>
      <div class="volume-control">
        <label>
          Volume: <input type="range" min="0" max="1" step="0.1" value="${this.volume}" />
        </label>
      </div>
    `;
    
    // Event listeners
    const toggle = controls.querySelector('input[type="checkbox"]');
    const volume = controls.querySelector('input[type="range"]');
    
    toggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        this.enableAudio();
      } else {
        this.disableAudio();
      }
    });
    
    volume.addEventListener('input', (e) => {
      this.setVolume(parseFloat(e.target.value));
    });
    
    return controls;
  }
}

// Global audio system instance
const audioSystem = new AudioSystem();

export default audioSystem;
