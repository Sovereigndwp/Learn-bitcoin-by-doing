import React, { useState } from 'react';
import { Hash } from 'lucide-react'; // Replace with your module icon
import UniversalModuleBase from '../components/UniversalModuleBase';
import {
  IntroSection,
  ContentSection,
  SupportingSection,
  CompactSection,
  InteractiveSection,
  QuizSection,
  ProgressSection,
  InsightBox,
  NavigationControls,
  CompletionSection,
  DemoSection,
  CaseStudySection,
  VisualElement,
  DataSection
} from '../components/StandardizedContent';

/**
 * UNIVERSAL MODULE TEMPLATE
 * Copy this file and customize it for any new module
 * All styling, progress, and navigation is handled automatically
 */

// Step Components - Define your learning steps here
const IntroductionStep = ({ onComplete }) => (
  <IntroSection
    title="Your Module Title"
    description="Brief description of what this module teaches"
    theme="dark" // or "light"
  >
    <NavigationControls
      canGoPrevious={false}
      onNext={() => onComplete(0)}
      nextLabel="Start Learning"
    />
  </IntroSection>
);

const LearningStep = ({ onComplete }) => (
  <ContentSection
    title="Main Learning Content"
    description="This is where your main content goes"
    theme="dark"
  >
    <SupportingSection title="Key Concepts">
      <ul>
        <li>Concept 1: Explanation here</li>
        <li>Concept 2: Explanation here</li>
        <li>Concept 3: Explanation here</li>
      </ul>
    </SupportingSection>

    <InsightBox title="💡 Pro Tip" type="tip">
      This is a helpful tip that will be styled consistently across all modules.
    </InsightBox>

    <NavigationControls
      canGoPrevious={true}
      onPrevious={() => console.log('Go back')}
      onNext={() => onComplete(1)}
      nextLabel="Continue"
    />
  </ContentSection>
);

const InteractiveStep = ({ onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    setTimeout(() => onComplete(2), 2000);
  };

  return (
    <ContentSection
      title="Interactive Learning"
      description="Test your understanding with this question"
      theme="dark"
    >
      <QuizSection
        question="What is the correct answer to this example question?"
        options={[
          'Option A - This is incorrect',
          'Option B - This is correct',
          'Option C - This is also incorrect'
        ]}
        selectedAnswer={selectedAnswer}
        onAnswer={handleAnswer}
        feedback={showFeedback ? { correct: selectedAnswer === 1 } : null}
        correctAnswer="Option B - This is correct"
        explanation="This explains why option B is the correct answer and helps reinforce the learning."
        theme="dark"
      />
    </ContentSection>
  );
};

const DemoStep = ({ onComplete }) => (
  <ContentSection
    title="Interactive Demo"
    description="Experience the concept hands-on"
    theme="dark"
  >
    <DemoSection
      title="🧪 Try It Yourself"
      description="This demo lets you experiment with the concept"
      theme="dark"
      actions={
        <NavigationControls
          onPrevious={() => console.log('Go back')}
          onNext={() => onComplete(3)}
          nextLabel="Continue to Completion"
        />
      }
    >
      <div>
        {/* Your interactive demo content goes here */}
        <p>Interactive elements, visualizations, or tools would go here.</p>
        
        <VisualElement
          src="/path-to-your-gif-or-image.gif"
          alt="Description of visual"
          caption="This visual helps explain the concept"
          type="gif"
          theme="dark"
        />
      </div>
    </DemoSection>
  </ContentSection>
);

const CompletionStep = ({ onComplete }) => (
  <CompletionSection
    title="🎉 Module Complete!"
    message="Congratulations! You've successfully completed this module."
    achievements={[
      {
        title: "Understanding Gained",
        description: "You now understand the core concepts covered in this module."
      },
      {
        title: "Skills Developed",
        description: "You've developed practical skills you can apply."
      },
      {
        title: "Knowledge Applied",
        description: "You've successfully applied your learning through interactive exercises."
      }
    ]}
    onContinue={() => onComplete(4)}
    theme="dark"
  />
);

// Main Module Component
const YourModuleName = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('yourModuleCompletedSteps');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Define your module steps
  const steps = [
    { title: 'Introduction', component: IntroductionStep },
    { title: 'Learn Concepts', component: LearningStep },
    { title: 'Test Knowledge', component: InteractiveStep },
    { title: 'Try Demo', component: DemoStep },
    { title: 'Complete', component: CompletionStep }
  ];

  const handleStepComplete = (stepIndex) => {
    const newCompletedSteps = new Set(completedSteps).add(stepIndex);
    setCompletedSteps(newCompletedSteps);
    
    // Save progress
    try {
      localStorage.setItem('yourModuleCompletedSteps', JSON.stringify(Array.from(newCompletedSteps)));
    } catch (error) {
      console.warn('Failed to save progress:', error);
    }
    
    // Navigate to next step or complete module
    if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
    // Module completion is handled by UniversalModuleBase
  };

  const handleStepChange = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handleResetProgress = () => {
    setCompletedSteps(new Set());
    setCurrentStep(0);
  };

  const CurrentStepComponent = steps[currentStep]?.component;

  return (
    <UniversalModuleBase
      moduleId="your-module-name" // Replace with your module ID
      title="Your Module Title"
      subtitle="Brief description of what this module teaches"
      icon={Hash} // Replace with your module icon
      steps={steps}
      currentStep={currentStep}
      completedSteps={completedSteps}
      onStepComplete={handleStepComplete}
      onStepChange={handleStepChange}
      resetProgressCallback={handleResetProgress}
    >
      {/* Your module content renders here */}
      {CurrentStepComponent && (
        <CurrentStepComponent onComplete={handleStepComplete} />
      )}
    </UniversalModuleBase>
  );
};

export default YourModuleName;
