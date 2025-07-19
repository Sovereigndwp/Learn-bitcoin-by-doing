/* =====================================================
   MODERN SYSTEMS INITIALIZATION
   Initialize and coordinate all modern interaction systems
   ===================================================== */

import audioSystem from './audioSystem.js';
import contextualBehavior from './contextualBehavior.js';

class ModernSystemsManager {
  constructor() {
    this.initialized = false;
    this.systemsReady = {
      audio: false,
      behavior: false,
      ui: false
    };
  }

  async initialize() {
    if (this.initialized) return;
    
    console.log('🚀 Initializing Modern Learning Experience...');
    
    try {
      // Initialize audio system first (requires user interaction)
      await this.initializeAudio();
      
      // Initialize contextual behavior system
      this.initializeBehaviorSystem();
      
      // Initialize UI enhancements
      this.initializeUIEnhancements();
      
      // Add global event listeners
      this.addGlobalEventListeners();
      
      // Apply modern card styling to existing elements
      this.enhanceExistingElements();
      
      this.initialized = true;
      console.log('✅ Modern systems initialized successfully!');
      
      // Show welcome notification
      this.showWelcomeMessage();
      
    } catch (error) {
      console.warn('⚠️ Some modern systems could not be initialized:', error);
    }
  }

  async initializeAudio() {
    try {
      // Audio requires user interaction, so we'll enable it on first interaction
      document.addEventListener('click', async () => {
        if (!this.systemsReady.audio) {
          await audioSystem.enableAudio();
          this.systemsReady.audio = true;
          console.log('🔊 Audio system activated');
        }
      }, { once: true });
      
      // Create audio controls and add to settings
      const audioControls = audioSystem.createAudioControls();
      this.addAudioControlsToUI(audioControls);
      
    } catch (error) {
      console.warn('Audio system initialization failed:', error);
    }
  }

  initializeBehaviorSystem() {
    try {
      // Contextual behavior system initializes automatically
      this.systemsReady.behavior = true;
      console.log('🧠 Contextual behavior system activated');
      
      // Add adaptation level controls
      this.addAdaptationControls();
      
    } catch (error) {
      console.warn('Behavior system initialization failed:', error);
    }
  }

  initializeUIEnhancements() {
    try {
      // Apply modern styling to key elements
      this.applyModernStyling();
      
      // Initialize progressive disclosure
      this.initializeProgressiveDisclosure();
      
      // Add motion preferences respect
      this.respectMotionPreferences();
      
      this.systemsReady.ui = true;
      console.log('🎨 UI enhancement system activated');
      
    } catch (error) {
      console.warn('UI enhancement initialization failed:', error);
    }
  }

  applyModernStyling() {
    // Apply modern card styling to learning elements
    const cardElements = document.querySelectorAll(`
      .quiz-container, 
      .explanation-card, 
      .concept-card, 
      .module-card,
      .learning-section,
      .step-content,
      .tool-section
    `);
    
    cardElements.forEach(element => {
      if (!element.classList.contains('modern-card')) {
        element.classList.add('modern-card');
        
        // Determine card type based on content
        if (element.closest('.technical-content, .numbers-module, .hashing-module')) {
          element.classList.add('technical-card');
        } else if (element.closest('.practice-content, .interactive-lab, .hands-on')) {
          element.classList.add('practice-card');
        } else if (element.closest('.mastery-content, .achievement, .completion')) {
          element.classList.add('mastery-card');
        } else {
          element.classList.add('concept-card');
        }
      }
    });

    // Apply learning phase colors based on module context
    this.applyLearningPhaseColors();
  }

  applyLearningPhaseColors() {
    const moduleMap = {
      'bitcoin-basics': 'exploration',
      'money': 'exploration', 
      'numbers': 'technical',
      'hashing': 'technical',
      'keys': 'technical',
      'mining': 'technical',
      'transactions': 'technical',
      'scripts': 'technical',
      'merkle': 'technical',
      'lightning': 'creativity',
      'custody': 'mastery',
      'myths': 'creativity',
      'advanced-topics': 'mastery',
      'toolkit': 'creativity'
    };

    // Detect current module from URL or body class
    const currentModule = this.getCurrentModule();
    const learningPhase = moduleMap[currentModule] || 'exploration';
    
    document.body.classList.add(`learning-phase-${learningPhase}`);
    
    // Apply to module containers
    const moduleContainers = document.querySelectorAll('.module-container, .module-content, .step-content');
    moduleContainers.forEach(container => {
      container.classList.add(`learning-phase-${learningPhase}`);
    });
  }

  getCurrentModule() {
    // Try to detect from URL
    const path = window.location.pathname;
    const moduleMatch = path.match(/\/module\/([^\/]+)/);
    if (moduleMatch) {
      return moduleMatch[1];
    }
    
    // Try to detect from body class
    const bodyClasses = Array.from(document.body.classList);
    const moduleClass = bodyClasses.find(cls => cls.endsWith('-module'));
    if (moduleClass) {
      return moduleClass.replace('-module', '');
    }
    
    return 'exploration'; // default
  }

  initializeProgressiveDisclosure() {
    // Find explanations that can be made expandable
    const explanations = document.querySelectorAll('.explanation, .description, .help-text');
    
    explanations.forEach(explanation => {
      if (explanation.textContent.length > 200) { // Long explanations
        this.makeExpandable(explanation);
      }
    });
  }

  makeExpandable(element) {
    const text = element.textContent;
    const shortText = text.substring(0, 150) + '...';
    
    element.classList.add('expandable-explanation');
    element.innerHTML = `
      <div class="short-explanation">${shortText}</div>
      <div class="additional-explanation" style="display: none;">${text}</div>
      <button class="expand-toggle" onclick="this.parentElement.classList.toggle('expanded'); this.style.display='none';">
        Read more
      </button>
    `;
  }

  respectMotionPreferences() {
    // Check user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.body.classList.add('reduce-motion');
    }
    
    // Listen for changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      if (e.matches) {
        document.body.classList.add('reduce-motion');
      } else {
        document.body.classList.remove('reduce-motion');
      }
    });
  }

  addGlobalEventListeners() {
    // Global achievement tracking
    document.addEventListener('moduleCompleted', (e) => {
      audioSystem.onAchievement('major');
      this.celebrateModuleCompletion(e.detail);
    });

    // Global interaction feedback
    document.addEventListener('click', (e) => {
      if (e.target.closest('.modern-card, .interactive-element')) {
        this.addInteractionRipple(e);
      }
    });

    // Page transition detection
    this.observePageTransitions();

    // Performance monitoring
    this.monitorPerformance();
  }

  addInteractionRipple(event) {
    const element = event.target.closest('.modern-card, .interactive-element');
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('div');
    ripple.className = 'interaction-ripple';
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(247, 147, 26, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      animation: rippleEffect 0.6s ease-out;
      pointer-events: none;
      z-index: 1;
    `;

    // Ensure element can contain the ripple
    if (getComputedStyle(element).position === 'static') {
      element.style.position = 'relative';
    }

    element.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  observePageTransitions() {
    // Observe when new content is loaded
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.enhanceNewContent(node);
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  enhanceNewContent(element) {
    // Apply modern styling to newly added content
    const newCards = element.querySelectorAll('.quiz-container, .explanation-card, .concept-card, .module-card');
    newCards.forEach(card => {
      if (!card.classList.contains('modern-card')) {
        card.classList.add('modern-card');
      }
    });

    // Add appropriate transition classes
    if (element.classList.contains('step-content')) {
      element.classList.add('concept-transition');
    } else if (element.classList.contains('practice-content')) {
      element.classList.add('practice-transition');
    } else if (element.classList.contains('mastery-content')) {
      element.classList.add('mastery-transition');
    }
  }

  monitorPerformance() {
    // Monitor system performance and adapt accordingly
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // Adapt based on performance
        if (fps < 30) {
          document.body.classList.add('reduce-animations');
        } else if (fps > 45) {
          document.body.classList.remove('reduce-animations');
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }

  celebrateModuleCompletion(moduleData) {
    // Create celebration effect
    audioSystem.triggerCelebrationEffects();
    
    // Show completion notification
    this.showNotification(
      `🎉 Module "${moduleData.name}" completed with ${Math.round(moduleData.score * 100)}% mastery!`,
      'mastery'
    );
  }

  addAudioControlsToUI(controls) {
    // Try to add audio controls to settings area
    const settingsArea = document.querySelector('.settings, .controls, .user-preferences');
    if (settingsArea) {
      settingsArea.appendChild(controls);
    } else {
      // Create floating audio controls
      controls.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 9999;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-lg);
        padding: var(--spacing-sm);
        backdrop-filter: blur(12px);
        font-size: 12px;
      `;
      document.body.appendChild(controls);
    }
  }

  addAdaptationControls() {
    const adaptationControls = document.createElement('div');
    adaptationControls.className = 'adaptation-controls modern-card';
    adaptationControls.innerHTML = `
      <div class="adaptation-header">
        <h4>🎯 Learning Adaptation</h4>
      </div>
      <div class="adaptation-options">
        <label>
          <input type="radio" name="adaptationLevel" value="minimal" 
                 ${contextualBehavior.adaptationLevel === 'minimal' ? 'checked' : ''}>
          <span>Minimal - Basic experience</span>
        </label>
        <label>
          <input type="radio" name="adaptationLevel" value="medium" 
                 ${contextualBehavior.adaptationLevel === 'medium' ? 'checked' : ''}>
          <span>Medium - Adaptive assistance</span>
        </label>
        <label>
          <input type="radio" name="adaptationLevel" value="high" 
                 ${contextualBehavior.adaptationLevel === 'high' ? 'checked' : ''}>
          <span>High - Full personalization</span>
        </label>
      </div>
    `;

    // Add event listeners
    adaptationControls.addEventListener('change', (e) => {
      if (e.target.name === 'adaptationLevel') {
        contextualBehavior.setAdaptationLevel(e.target.value);
      }
    });

    // Add to page
    const settingsArea = document.querySelector('.settings, .controls, .user-preferences');
    if (settingsArea) {
      settingsArea.appendChild(adaptationControls);
    }
  }

  enhanceExistingElements() {
    // Apply cascade reveal to learning sections
    const learningSections = document.querySelectorAll('.learning-content, .module-content, .step-content');
    learningSections.forEach(section => {
      section.classList.add('cascade-reveal');
    });

    // Apply Bitcoin accent to key terms
    const bitcoinTerms = document.querySelectorAll('.bitcoin-term, .btc, .bitcoin-keyword');
    bitcoinTerms.forEach(term => {
      term.classList.add('bitcoin-accent');
    });

    // Apply glow effects to achievements
    const achievements = document.querySelectorAll('.achievement, .mastery, .completion');
    achievements.forEach(achievement => {
      achievement.classList.add('bitcoin-glow');
    });
  }

  showWelcomeMessage() {
    const welcome = document.createElement('div');
    welcome.className = 'welcome-message modern-card';
    welcome.innerHTML = `
      <div class="welcome-content">
        <h3>🚀 Enhanced Learning Experience Activated!</h3>
        <p>Your Bitcoin learning journey now includes:</p>
        <ul>
          <li>🎵 Contextual audio feedback</li>
          <li>🎨 Adaptive visual design</li>
          <li>🧠 Intelligent learning assistance</li>
          <li>✨ Smooth animations and transitions</li>
        </ul>
        <button onclick="this.parentElement.parentElement.remove()" class="welcome-dismiss">
          Start Learning
        </button>
      </div>
    `;

    welcome.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10001;
      max-width: 400px;
      opacity: 0;
      animation: fadeInUp 0.5s ease-out forwards;
    `;

    document.body.appendChild(welcome);

    // Auto-remove after 8 seconds
    setTimeout(() => {
      if (welcome.parentElement) {
        welcome.style.opacity = '0';
        setTimeout(() => welcome.remove(), 500);
      }
    }, 8000);
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `modern-notification ${type} modern-card`;
    notification.innerHTML = `
      <div class="notification-content">
        <span>${message}</span>
        <button onclick="this.parentElement.parentElement.remove()">✕</button>
      </div>
    `;

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      max-width: 350px;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto-remove
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 6000);
  }

  // Public API
  getSystemStatus() {
    return {
      initialized: this.initialized,
      systems: this.systemsReady
    };
  }

  enableSystem(systemName) {
    switch (systemName) {
      case 'audio':
        audioSystem.enableAudio();
        break;
      case 'behavior':
        contextualBehavior.setAdaptationLevel('high');
        break;
    }
  }

  disableSystem(systemName) {
    switch (systemName) {
      case 'audio':
        audioSystem.disableAudio();
        break;
      case 'behavior':
        contextualBehavior.setAdaptationLevel('minimal');
        break;
    }
  }
}

// Global instance
const modernSystems = new ModernSystemsManager();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    modernSystems.initialize();
  });
} else {
  modernSystems.initialize();
}

export default modernSystems;
