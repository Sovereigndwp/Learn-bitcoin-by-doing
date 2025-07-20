import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProgressProvider, useProgress } from './ProgressContext';
import { LanguageProvider, useLanguage } from './LanguageContext';

// Test component for ProgressProvider
const ProgressTestComponent = () => {
  const { 
    getModuleProgress, 
    isModuleCompleted, 
    completeModule, 
    resetProgress 
  } = useProgress();

  const handleCompleteModule = () => {
    completeModule('test-module');
  };

  const handleUpdateProgress = () => {
    completeModule('test-module', 50);
  };

  const handleReset = () => {
    resetProgress();
  };

  return (
    <div>
      <div data-testid="progress">{getModuleProgress('test-module')}</div>
      <div data-testid="completed">{isModuleCompleted('test-module').toString()}</div>
      <button onClick={handleCompleteModule} data-testid="complete-btn">Complete</button>
      <button onClick={handleUpdateProgress} data-testid="update-btn">Update</button>
      <button onClick={handleReset} data-testid="reset-btn">Reset</button>
    </div>
  );
};

// Test component for LanguageProvider
const LanguageTestComponent = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleChangeLanguage = () => {
    setLanguage('es');
  };

  return (
    <div>
      <div data-testid="language">{language}</div>
      <div data-testid="translation">{t('welcome')}</div>
      <button onClick={handleChangeLanguage} data-testid="change-lang-btn">Change Language</button>
    </div>
  );
};

describe('ProgressProvider', () => {
  test('provides initial progress state', () => {
    render(
      <BrowserRouter>
        <ProgressProvider>
          <ProgressTestComponent />
        </ProgressProvider>
      </BrowserRouter>
    );

    expect(screen.getByTestId('progress')).toHaveTextContent('0');
    expect(screen.getByTestId('completed')).toHaveTextContent('false');
  });

  test('completes module correctly', () => {
    render(
      <BrowserRouter>
        <ProgressProvider>
          <ProgressTestComponent />
        </ProgressProvider>
      </BrowserRouter>
    );

    act(() => {
      fireEvent.click(screen.getByTestId('complete-btn'));
    });

    expect(screen.getByTestId('progress')).toHaveTextContent('100');
    expect(screen.getByTestId('completed')).toHaveTextContent('true');
  });

  test('updates module progress correctly', () => {
    render(
      <BrowserRouter>
        <ProgressProvider>
          <ProgressTestComponent />
        </ProgressProvider>
      </BrowserRouter>
    );

    act(() => {
      fireEvent.click(screen.getByTestId('update-btn'));
    });

    // Note: completeModule completes the module regardless of score
    expect(screen.getByTestId('progress')).toHaveTextContent('100');
    expect(screen.getByTestId('completed')).toHaveTextContent('true');
  });

  test('resets progress correctly', () => {
    render(
      <BrowserRouter>
        <ProgressProvider>
          <ProgressTestComponent />
        </ProgressProvider>
      </BrowserRouter>
    );

    // First complete a module
    act(() => {
      fireEvent.click(screen.getByTestId('complete-btn'));
    });

    expect(screen.getByTestId('completed')).toHaveTextContent('true');

    // Then reset
    act(() => {
      fireEvent.click(screen.getByTestId('reset-btn'));
    });

    expect(screen.getByTestId('progress')).toHaveTextContent('0');
    expect(screen.getByTestId('completed')).toHaveTextContent('false');
  });

  test('persists progress to localStorage', () => {
    const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
    
    render(
      <BrowserRouter>
        <ProgressProvider>
          <ProgressTestComponent />
        </ProgressProvider>
      </BrowserRouter>
    );

    act(() => {
      fireEvent.click(screen.getByTestId('complete-btn'));
    });

    // Progress is stored in multiple localStorage keys
    expect(mockSetItem).toHaveBeenCalledWith(
      'completedModules', 
      expect.stringContaining('test-module')
    );

    mockSetItem.mockRestore();
  });
});

describe('LanguageProvider', () => {
  test('provides initial language state', () => {
    render(
      <BrowserRouter>
        <LanguageProvider>
          <LanguageTestComponent />
        </LanguageProvider>
      </BrowserRouter>
    );

    expect(screen.getByTestId('language')).toHaveTextContent('en');
  });

  test('changes language correctly', () => {
    render(
      <BrowserRouter>
        <LanguageProvider>
          <LanguageTestComponent />
        </LanguageProvider>
      </BrowserRouter>
    );

    act(() => {
      fireEvent.click(screen.getByTestId('change-lang-btn'));
    });

    expect(screen.getByTestId('language')).toHaveTextContent('es');
  });

  test('provides translation function', () => {
    render(
      <BrowserRouter>
        <LanguageProvider>
          <LanguageTestComponent />
        </LanguageProvider>
      </BrowserRouter>
    );

    // Should show the key as fallback since 'welcome' key doesn't exist in translations
    expect(screen.getByTestId('translation')).toHaveTextContent('welcome');
  });

  test('persists language to localStorage', () => {
    const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
    
    render(
      <BrowserRouter>
        <LanguageProvider>
          <LanguageTestComponent />
        </LanguageProvider>
      </BrowserRouter>
    );

    act(() => {
      fireEvent.click(screen.getByTestId('change-lang-btn'));
    });

    expect(mockSetItem).toHaveBeenCalledWith('bitcoinLearningLanguage', 'es');

    mockSetItem.mockRestore();
  });
});

describe('Context Integration', () => {
  test('providers work together without conflicts', () => {
    // Clear localStorage to avoid test interference
    localStorage.clear();
    
    render(
      <BrowserRouter>
        <LanguageProvider>
          <ProgressProvider>
            <div>
              <ProgressTestComponent />
              <LanguageTestComponent />
            </div>
          </ProgressProvider>
        </LanguageProvider>
      </BrowserRouter>
    );

    // Both contexts should work
    expect(screen.getByTestId('progress')).toHaveTextContent('0');
    expect(screen.getByTestId('language')).toHaveTextContent('en');

    // Test interactions
    act(() => {
      fireEvent.click(screen.getByTestId('complete-btn'));
      fireEvent.click(screen.getByTestId('change-lang-btn'));
    });

    expect(screen.getByTestId('progress')).toHaveTextContent('100');
    expect(screen.getByTestId('language')).toHaveTextContent('es');
  });
});
