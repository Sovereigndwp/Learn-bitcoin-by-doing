/* =====================================================
   CONTEXTUAL BEHAVIOR SYSTEM
   Intelligent responses to user interaction patterns
   ===================================================== */

import audioSystem from './audioSystem.js';

class ContextualBehaviorSystem {
  constructor() {
    this.userBehavior = {
      staring: false,
      clicking: false,
      scrolling: false,
      pausing: false,
      struggling: false,
      excelling: false
    };
    
    this.timers = new Map();
    this.behaviorHistory = [];
    this.adaptationLevel = this.getAdaptationLevel();
    
    this.initializeBehaviorTracking();
  }

  getAdaptationLevel() {
    // Get user's preferred adaptation level from localStorage
    return localStorage.getItem('adaptationLevel') || 'medium';
  }

  setAdaptationLevel(level) {
    this.adaptationLevel = level;
    localStorage.setItem('adaptationLevel', level);
  }

  initializeBehaviorTracking() {
    this.trackMouseBehavior();
    this.trackScrollBehavior(); 
    this.trackClickBehavior();
    this.trackFocusBehavior();
    this.trackPerformanceBehavior();
  }

  trackMouseBehavior() {
    let mouseIdleTimer = null;
    let lastMouseMove = Date.now();
    
    document.addEventListener('mousemove', (e) => {
      lastMouseMove = Date.now();
      this.updateBehavior('staring', false);
      
      // Clear existing timer
      if (mouseIdleTimer) {
        clearTimeout(mouseIdleTimer);
      }
      
      // Set new timer for detecting "staring"
      mouseIdleTimer = setTimeout(() => {
        this.detectStaring(e.target);
      }, 3000); // 3 seconds of no mouse movement = staring
    });
  }

  detectStaring(element) {
    // Check if user is staring at interactive content
    const isInteractiveContent = element.closest('.explanation, .concept-card, .question-section, .learning-content');
    
    if (isInteractiveContent && this.adaptationLevel !== 'minimal') {
      this.updateBehavior('staring', true);
      this.triggerContextualHelp(element, 'staring');
      
      // Play subtle audio cue
      if (this.adaptationLevel === 'high') {
        audioSystem.onDiscovery();
      }
    }
  }

  trackScrollBehavior() {
    let scrollTimer = null;
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      const scrollSpeed = Math.abs(currentScrollY - lastScrollY);
      
      this.updateBehavior('scrolling', true);
      this.updateProgressIndicators();
      
      // Detect scroll patterns
      if (scrollSpeed > 100) {
        // Fast scrolling - user might be lost or frustrated
        this.analyzeScrollPattern('fast', scrollDirection);
      } else if (scrollSpeed < 10) {
        // Slow scrolling - user is carefully reading
        this.analyzeScrollPattern('careful', scrollDirection);
      }
      
      lastScrollY = currentScrollY;
      
      // Clear scroll state after scroll stops
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        this.updateBehavior('scrolling', false);
      }, 150);
    });
  }

  analyzeScrollPattern(speed, direction) {
    const pattern = { speed, direction, timestamp: Date.now() };
    this.behaviorHistory.push(pattern);
    
    // Keep only recent history (last 10 interactions)
    if (this.behaviorHistory.length > 10) {
      this.behaviorHistory.shift();
    }
    
    // Analyze patterns for learning insights
    this.detectLearningPatterns();
  }

  detectLearningPatterns() {
    if (this.behaviorHistory.length < 5) return;
    
    const recentPatterns = this.behaviorHistory.slice(-5);
    const fastScrolls = recentPatterns.filter(p => p.speed === 'fast').length;
    const backScrolls = recentPatterns.filter(p => p.direction === 'up').length;
    
    // User might be struggling if lots of fast scrolling or back-scrolling
    if (fastScrolls >= 3 || backScrolls >= 3) {
      this.updateBehavior('struggling', true);
      this.triggerStruggleSupport();
    }
  }

  trackClickBehavior() {
    let clickCount = 0;
    let clickTimer = null;
    
    document.addEventListener('click', (e) => {
      clickCount++;
      this.updateBehavior('clicking', true);
      
      // Highlight clicked elements briefly
      this.highlightInteraction(e.target);
      
      // Audio feedback for interactions
      if (e.target.closest('.interactive-element, button, .clickable')) {
        audioSystem.onInteraction('click');
      }
      
      // Reset click state
      if (clickTimer) clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        this.updateBehavior('clicking', false);
        clickCount = 0;
      }, 500);
      
      // Detect rapid clicking (frustration indicator)
      if (clickCount >= 3) {
        this.detectFrustration();
      }
    });
  }

  highlightInteraction(element) {
    // Add temporary highlight class
    element.classList.add('user-clicking', 'interactive-highlight');
    
    setTimeout(() => {
      element.classList.remove('user-clicking', 'interactive-highlight');
    }, 300);
  }

  detectFrustration() {
    this.updateBehavior('struggling', true);
    this.triggerFrustrationRelief();
  }

  trackFocusBehavior() {
    // Track how long user spends on different sections
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.onSectionFocus(entry.target);
        } else {
          this.onSectionBlur(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    // Observe all learning sections
    document.querySelectorAll('.learning-section, .module-content, .step-content').forEach(section => {
      observer.observe(section);
    });
  }

  onSectionFocus(section) {
    section.dataset.focusStartTime = Date.now();
    
    // Apply appropriate visual focus
    if (this.adaptationLevel === 'high') {
      section.classList.add('section-focused');
    }
  }

  onSectionBlur(section) {
    const focusStartTime = parseInt(section.dataset.focusStartTime || '0');
    const focusTime = Date.now() - focusStartTime;
    
    // Analyze focus time
    if (focusTime > 30000) { // 30 seconds = deep engagement
      this.updateBehavior('excelling', true);
      this.triggerEncouragement();
    } else if (focusTime < 3000) { // 3 seconds = quick skip
      this.updateBehavior('struggling', true);
    }
    
    section.classList.remove('section-focused');
    delete section.dataset.focusStartTime;
  }

  trackPerformanceBehavior() {
    // Monitor quiz/interaction performance
    document.addEventListener('answerSubmitted', (e) => {
      const { correct, timeSpent } = e.detail;
      this.analyzePerformance(correct, timeSpent);
    });
    
    document.addEventListener('moduleCompleted', (e) => {
      const { score, timeSpent } = e.detail;
      this.analyzeModulePerformance(score, timeSpent);
    });
  }

  analyzePerformance(correct, timeSpent) {
    if (correct && timeSpent < 5000) {
      // Quick correct answers = excelling
      this.updateBehavior('excelling', true);
      this.updateBehavior('struggling', false);
    } else if (!correct || timeSpent > 30000) {
      // Wrong answers or very slow = struggling
      this.updateBehavior('struggling', true);
      this.updateBehavior('excelling', false);
    }
  }

  analyzeModulePerformance(score, timeSpent) {
    if (score > 0.8) {
      this.updateBehavior('excelling', true);
      this.triggerMastery();
    } else if (score < 0.5) {
      this.updateBehavior('struggling', true);
      this.triggerRemediation();
    }
  }

  updateBehavior(behaviorType, isActive) {
    const wasActive = this.userBehavior[behaviorType];
    this.userBehavior[behaviorType] = isActive;
    
    // Update document classes for CSS targeting
    if (isActive && !wasActive) {
      document.body.classList.add(`user-${behaviorType}`);
    } else if (!isActive && wasActive) {
      document.body.classList.remove(`user-${behaviorType}`);
    }
    
    // Trigger adaptive responses
    this.respondToBehavior(behaviorType, isActive);
  }

  respondToBehavior(behaviorType, isActive) {
    if (!isActive) return;
    
    switch (behaviorType) {
      case 'staring':
        this.showAdditionalExplanations();
        break;
      case 'struggling':
        this.activateStruggleSupport();
        break;
      case 'excelling':
        this.activateAdvancedMode();
        break;
      default:
        // Handle other behavior types or ignore
        break;
    }
  }

  triggerContextualHelp(element, reason) {
    const helpContainer = this.findOrCreateHelpContainer(element);
    
    if (!helpContainer) return;
    
    const helpContent = this.generateContextualHelp(element, reason);
    if (helpContent) {
      this.showContextualHelp(helpContainer, helpContent);
    }
  }

  findOrCreateHelpContainer(element) {
    // Look for existing help container
    let helpContainer = element.querySelector('.contextual-help');
    
    if (!helpContainer) {
      // Check if element can contain help
      const parentContainer = element.closest('.learning-content, .explanation, .concept-card');
      if (parentContainer) {
        helpContainer = document.createElement('div');
        helpContainer.className = 'contextual-help';
        parentContainer.appendChild(helpContainer);
      }
    }
    
    return helpContainer;
  }

  generateContextualHelp(element, reason) {
    const helpTexts = {
      staring: [
        "💡 Take your time to absorb this concept - understanding Bitcoin is a journey!",
        "🤔 This is a key concept. Would you like a different explanation approach?",
        "📚 Deep learning takes time. You're building important knowledge here.",
        "🎯 Focus on the practical implications - how does this affect real Bitcoin users?"
      ],
      struggling: [
        "🆘 No worries! Bitcoin concepts can be complex. Let's break this down further.",
        "📖 Consider reviewing the previous section - concepts often build on each other.",
        "💪 Learning takes patience. You're building expertise that few people have!",
        "🔄 Try thinking about this from a practical perspective - what would you do?"
      ],
      clicking: [
        "👆 Great interaction! Each click builds your understanding.",
        "🎮 Active learning works - keep exploring these interactive elements!"
      ]
    };
    
    const texts = helpTexts[reason];
    if (!texts) return null;
    
    return texts[Math.floor(Math.random() * texts.length)];
  }

  showContextualHelp(container, content) {
    container.innerHTML = `
      <div class="help-content">
        <span class="help-text">${content}</span>
        <button class="help-dismiss" onclick="this.parentElement.parentElement.style.display='none'">
          ✕
        </button>
      </div>
    `;
    
    container.style.display = 'block';
    container.classList.add('show-help');
    
    // Auto-hide after 8 seconds (longer than before)
    setTimeout(() => {
      container.style.opacity = '0';
      setTimeout(() => {
        container.style.display = 'none';
        container.classList.remove('show-help');
        container.style.opacity = '1';
      }, 500);
    }, 8000);
  }

  showAdditionalExplanations() {
    // Find elements that can show additional explanations
    const expandableElements = document.querySelectorAll('.expandable-explanation:not(.expanded)');
    
    if (expandableElements.length > 0 && this.adaptationLevel !== 'minimal') {
      const randomElement = expandableElements[Math.floor(Math.random() * expandableElements.length)];
      this.expandExplanation(randomElement);
    }
  }

  expandExplanation(element) {
    element.classList.add('expanded');
    
    const additionalContent = element.querySelector('.additional-explanation');
    if (additionalContent) {
      additionalContent.style.display = 'block';
      additionalContent.classList.add('additional-explanation');
      
      // Smooth scroll to the new content
      setTimeout(() => {
        additionalContent.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        });
      }, 100);
    }
  }

  activateStruggleSupport() {
    if (this.adaptationLevel === 'minimal') return;
    
    // Reduce animation speeds
    document.body.classList.add('reduce-motion-temporarily');
    
    // Show more explanations
    this.showAdditionalExplanations();
    
    // Offer help
    this.offerLearningAssistance();
    
    // Remove temporary motion reduction after 30 seconds
    setTimeout(() => {
      document.body.classList.remove('reduce-motion-temporarily');
    }, 30000);
  }

  activateAdvancedMode() {
    if (this.adaptationLevel === 'minimal') return;
    
    // Speed up animations slightly
    document.body.classList.add('accelerated-learning');
    
    // Hide basic explanations, show advanced ones
    this.showAdvancedContent();
    
    // Offer challenge content
    this.offerAdvancedChallenges();
  }

  offerLearningAssistance() {
    // Create assistance modal if one doesn't exist
    if (document.querySelector('.learning-assistance-modal')) return;
    
    const modal = document.createElement('div');
    modal.className = 'learning-assistance-modal modern-card';
    modal.innerHTML = `
      <div class="assistance-content">
        <h3>🤝 Learning Support</h3>
        <p>Bitcoin concepts can be challenging! Here are some ways to make learning easier:</p>
        <div class="assistance-options">
          <button class="assistance-option" onclick="if(window.moduleNavigation && window.moduleNavigation.reviewPrevious) { window.moduleNavigation.reviewPrevious(); } this.parentElement.parentElement.parentElement.remove();">
            📖 Review Previous Section
          </button>
          <button class="assistance-option" onclick="this.parentElement.parentElement.parentElement.remove()">
            💡 Get Alternative Explanation
          </button>
        </div>
        <button class="modal-close" onclick="if(window.moduleNavigation && window.moduleNavigation.continueLearning) { window.moduleNavigation.continueLearning(); } this.parentElement.parentElement.remove();">
          Continue Learning
        </button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-remove after 15 seconds if not interacted with
    setTimeout(() => {
      if (modal.parentElement) {
        modal.remove();
      }
    }, 15000);
  }

  offerAdvancedChallenges() {
    // Find advanced content sections
    const advancedSections = document.querySelectorAll('.advanced-content:not(.revealed)');
    
    if (advancedSections.length > 0) {
      advancedSections.forEach(section => {
        section.classList.add('revealed');
        section.style.display = 'block';
      });
      
      // Notification
      this.showNotification("🚀 Advanced content unlocked! You're ready for deeper concepts.", 'success');
    }
  }

  showAdvancedContent() {
    // Hide beginner explanations
    document.querySelectorAll('.beginner-explanation').forEach(el => {
      el.style.display = 'none';
    });
    
    // Show advanced explanations
    document.querySelectorAll('.advanced-explanation').forEach(el => {
      el.style.display = 'block';
    });
  }

  triggerStruggleSupport() {
    audioSystem.playSound('discovery'); // Gentle, encouraging sound
    this.showNotification("💪 Take your time - mastering Bitcoin takes patience!", 'encouragement');
  }

  triggerEncouragement() {
    audioSystem.onAchievement('normal');
    this.showNotification("🌟 Great focus! You're building deep Bitcoin knowledge.", 'success');
  }

  triggerMastery() {
    audioSystem.onAchievement('major');
    this.showNotification("🏆 Excellent mastery! You're becoming a Bitcoin expert.", 'mastery');
  }

  triggerFrustrationRelief() {
    this.showNotification("😌 No rush! Bitcoin is complex - every expert started where you are.", 'calm');
  }

  triggerRemediation() {
    this.showNotification("📚 Let's strengthen your foundation before moving forward.", 'support');
  }

  updateProgressIndicators() {
    const progressElements = document.querySelectorAll('.progress-indicator');
    progressElements.forEach(element => {
      element.classList.add('user-scrolling');
      setTimeout(() => {
        element.classList.remove('user-scrolling');
      }, 300);
    });
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `contextual-notification ${type} modern-card`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">✕</button>
      </div>
    `;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      max-width: 300px;
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
    
    // Auto-remove after 6 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 300);
    }, 6000);
  }

  // Public API for manual behavior updates
  userStartedSection(sectionType) {
    this.currentSection = sectionType;
    this.sectionStartTime = Date.now();
  }

  userCompletedSection(sectionType, success = true) {
    const timeSpent = Date.now() - (this.sectionStartTime || Date.now());
    
    if (success && timeSpent < 10000) {
      this.updateBehavior('excelling', true);
    } else if (!success || timeSpent > 60000) {
      this.updateBehavior('struggling', true);
    }
    
    // Auto-scroll to learning path when section is completed successfully
    if (success) {
      this.scrollToLearningPath();
    }
    
    // Reset section tracking
    this.currentSection = null;
    this.sectionStartTime = null;
  }

  userAnsweredQuestion(correct, timeSpent) {
    // Dispatch event for performance tracking
    document.dispatchEvent(new CustomEvent('answerSubmitted', {
      detail: { correct, timeSpent }
    }));
  }

  userCompletedModule(score, timeSpent) {
    // Dispatch event for module completion tracking
    document.dispatchEvent(new CustomEvent('moduleCompleted', {
      detail: { score, timeSpent }
    }));
    
    // Auto-scroll to top (learning path) when module is completed
    this.scrollToLearningPath();
  }
  
  // Helper method to scroll to learning path or top of page
  scrollToLearningPath() {
    // Try to find learning path element first
    const learningPath = document.querySelector('.learning-path, .module-nav, .breadcrumb, .progress-indicator');
    
    if (learningPath) {
      learningPath.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    } else {
      // Fallback to scroll to top
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    }
    
    // Show a subtle notification about next steps
    this.showNotification('✨ Great progress! Check your learning path above to continue.', 'success');
  }
  
  // Method to be called when all activities on a page are completed
  allPageActivitiesCompleted() {
    this.scrollToLearningPath();
    this.showNotification('🎯 All activities completed! Ready for the next module?', 'completion');
  }
}

// Global contextual behavior system
const contextualBehavior = new ContextualBehaviorSystem();

export default contextualBehavior;
