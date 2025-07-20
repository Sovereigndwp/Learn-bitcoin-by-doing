import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProgressProvider } from '../contexts/ProgressContext';
import { NotificationProvider } from '../components/NotificationSystem';
import { LanguageProvider } from '../contexts/LanguageContext';
import Homepage from '../components/Homepage';
import ModuleLayout from '../components/ModuleLayout';
import AboutMe from '../components/AboutMe';

// Import modules for testing
import MoneyModule from '../modules/MoneyModule';
import BitcoinBasicsModule from '../modules/BitcoinBasicsModule';

// Test wrapper with all providers but no nested router
const TestWrapper = ({ children, initialRoute = '/' }) => (
  <LanguageProvider>
    <ProgressProvider>
      <NotificationProvider>
        <MemoryRouter initialEntries={[initialRoute]}>
          {children}
        </MemoryRouter>
      </NotificationProvider>
    </ProgressProvider>
  </LanguageProvider>
);

describe('Component Rendering', () => {
  test('Homepage renders correctly', () => {
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    );

    expect(screen.getByText(/Bitcoin Learning Journey/i)).toBeInTheDocument();
  });

  test('AboutMe renders in ModuleLayout', () => {
    render(
      <TestWrapper>
        <ModuleLayout>
          <AboutMe />
        </ModuleLayout>
      </TestWrapper>
    );

    // Should render without throwing errors
    expect(true).toBe(true);
  });

  test('MoneyModule renders correctly', () => {
    render(
      <TestWrapper>
        <ModuleLayout>
          <MoneyModule />
        </ModuleLayout>
      </TestWrapper>
    );

    // Should render without throwing errors
    expect(true).toBe(true);
  });

  test('BitcoinBasicsModule renders correctly', () => {
    render(
      <TestWrapper>
        <ModuleLayout>
          <BitcoinBasicsModule />
        </ModuleLayout>
      </TestWrapper>
    );

    // Should render without throwing errors
    expect(true).toBe(true);
  });
});

describe('Module Integration', () => {
  test('modules work with required contexts', () => {
    // Test that modules can access context without errors
    render(
      <TestWrapper>
        <ModuleLayout>
          <MoneyModule />
        </ModuleLayout>
      </TestWrapper>
    );

    // Should render without throwing context errors
    expect(true).toBe(true);
  });

  test('context providers work together', () => {
    render(
      <TestWrapper>
        <ModuleLayout>
          <BitcoinBasicsModule />
        </ModuleLayout>
      </TestWrapper>
    );

    // Should render without throwing errors
    expect(true).toBe(true);
  });
});

describe('Component Structure', () => {
  test('ModuleLayout provides consistent structure', () => {
    render(
      <TestWrapper>
        <ModuleLayout>
          <div>Test Content</div>
        </ModuleLayout>
      </TestWrapper>
    );

    // Should render without throwing errors
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('components handle provider dependencies', () => {
    // Test that components work with all required providers
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    );

    // Should find main content
    expect(screen.getByText(/Bitcoin Learning Journey/i)).toBeInTheDocument();
  });
});
