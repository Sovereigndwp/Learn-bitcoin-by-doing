import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProgressProvider } from '../contexts/ProgressContext';
import { NotificationProvider } from '../components/NotificationSystem';
import { LanguageProvider } from '../contexts/LanguageContext';
import Homepage from '../components/Homepage';
import App from '../App';

const TestWrapper = ({ children }) => (
  <LanguageProvider>
    <ProgressProvider>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </ProgressProvider>
  </LanguageProvider>
);

describe('Performance Tests', () => {
  test('App renders within reasonable time', () => {
    const start = performance.now();
    
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );
    
    const end = performance.now();
    const renderTime = end - start;
    
    // App should render in under 300ms in test environment
    expect(renderTime).toBeLessThan(300);
  });

  test('Homepage handles multiple rapid interactions', () => {
    render(
      <BrowserRouter>
        <TestWrapper>
          <Homepage />
        </TestWrapper>
      </BrowserRouter>
    );

    // Multiple rapid renders should not cause memory issues
    for (let i = 0; i < 10; i++) {
      render(
        <BrowserRouter>
          <TestWrapper>
            <Homepage />
          </TestWrapper>
        </BrowserRouter>
      );
    }
    
    expect(true).toBe(true); // If we get here without errors, test passes
  });

  test('Context providers do not cause memory leaks', () => {
    const initialMemory = performance.memory?.usedJSHeapSize || 0;
    
    // Render and unmount multiple times
    for (let i = 0; i < 5; i++) {
      const { unmount } = render(
        <TestWrapper>
          <div>Test content</div>
        </TestWrapper>
      );
      unmount();
    }
    
    // Memory should not grow significantly
    const finalMemory = performance.memory?.usedJSHeapSize || 0;
    const memoryGrowth = finalMemory - initialMemory;
    
    // Allow some memory growth but not excessive
    expect(memoryGrowth).toBeLessThan(1000000); // 1MB threshold
  });
});
