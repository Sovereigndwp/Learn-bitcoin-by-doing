/**
 * Learning Analytics Utility
 * Tracks user learning patterns and provides insights
 */

export class LearningAnalytics {
  constructor() {
    this.startTime = Date.now();
    this.interactions = [];
    this.moduleStartTimes = new Map();
  }

  // Track when user starts a module
  startModule(moduleId) {
    this.moduleStartTimes.set(moduleId, Date.now());
    this.logInteraction('module_start', { moduleId });
  }

  // Track when user completes a module
  completeModule(moduleId, score = null) {
    const startTime = this.moduleStartTimes.get(moduleId);
    const duration = startTime ? Date.now() - startTime : null;
    
    this.logInteraction('module_complete', { 
      moduleId, 
      duration,
      score 
    });
  }

  // Track user interactions
  logInteraction(type, data = {}) {
    this.interactions.push({
      type,
      timestamp: Date.now(),
      data
    });
  }

  // Get learning insights
  getInsights() {
    const totalTime = Date.now() - this.startTime;
    const completedModules = this.interactions
      .filter(i => i.type === 'module_complete')
      .map(i => i.data.moduleId);

    const averageModuleTime = this.getAverageModuleTime();
    const mostDifficultModule = this.getMostDifficultModule();

    return {
      totalLearningTime: totalTime,
      completedModules: completedModules.length,
      averageModuleTime,
      mostDifficultModule,
      totalInteractions: this.interactions.length,
      learningVelocity: completedModules.length / (totalTime / (1000 * 60 * 60)) // modules per hour
    };
  }

  getAverageModuleTime() {
    const completions = this.interactions
      .filter(i => i.type === 'module_complete' && i.data.duration)
      .map(i => i.data.duration);

    if (completions.length === 0) return 0;
    return completions.reduce((sum, time) => sum + time, 0) / completions.length;
  }

  getMostDifficultModule() {
    const moduleTimes = {};
    
    this.interactions
      .filter(i => i.type === 'module_complete' && i.data.duration)
      .forEach(interaction => {
        const { moduleId, duration } = interaction.data;
        if (!moduleTimes[moduleId] || duration > moduleTimes[moduleId]) {
          moduleTimes[moduleId] = duration;
        }
      });

    let longestModule = null;
    let longestTime = 0;

    for (const [moduleId, time] of Object.entries(moduleTimes)) {
      if (time > longestTime) {
        longestTime = time;
        longestModule = moduleId;
      }
    }

    return longestModule;
  }

  // Export data for analysis
  exportData() {
    return {
      startTime: this.startTime,
      interactions: this.interactions,
      insights: this.getInsights()
    };
  }

  // Import previous session data
  importData(data) {
    if (data.startTime) this.startTime = data.startTime;
    if (data.interactions) this.interactions = data.interactions;
  }
}

// Global analytics instance
export const analytics = new LearningAnalytics();

// React Hook for using analytics
export const useAnalytics = () => {
  return {
    startModule: analytics.startModule.bind(analytics),
    completeModule: analytics.completeModule.bind(analytics),
    logInteraction: analytics.logInteraction.bind(analytics),
    getInsights: analytics.getInsights.bind(analytics),
    exportData: analytics.exportData.bind(analytics)
  };
};
