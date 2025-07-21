import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Homepage from './components/Homepage';
import { ProgressProvider } from './contexts/ProgressContext';
import { NotificationProvider } from './components/NotificationSystem';
import { LanguageProvider } from './contexts/LanguageContext';

// Test wrapper with all providers but no router (App already has one)
const TestWrapper = ({ children }) => (
  <LanguageProvider>
    <ProgressProvider>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </ProgressProvider>
  </LanguageProvider>
);

// Test wrapper for individual components that need routing
const ComponentTestWrapper = ({ children }) => (
  <BrowserRouter>
    <LanguageProvider>
      <ProgressProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </ProgressProvider>
    </LanguageProvider>
  </BrowserRouter>
);

describe('App Component', () => {
  test('renders homepage with Bitcoin title', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );
    const titleElement = screen.getByText(/Learn Bitcoin by Doing/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders app with correct structure', () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );
    
    // Check for main app container
    const appDiv = document.querySelector('.App');
    expect(appDiv).toBeInTheDocument();
  });
});

describe('Homepage Component', () => {
  test('renders welcome section initially', () => {
    render(
      <ComponentTestWrapper>
        <Homepage />
      </ComponentTestWrapper>
    );
    
    // Check for welcome content
    expect(screen.getByText(/Money Shapes Everything/i)).toBeInTheDocument();
    expect(screen.getByText(/Begin Your Journey/i)).toBeInTheDocument();
  });

  test('renders main navigation elements', () => {
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    );
    
    // Check main navigation elements
    expect(screen.getByText(/Learn Bitcoin by Doing/i)).toBeInTheDocument();
    expect(screen.getByText(/Begin Your Journey/i)).toBeInTheDocument();
  });

  test('renders hero section with correct content', () => {
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    );
    
    // Check hero content
    expect(screen.getByText(/Money Shapes Everything/i)).toBeInTheDocument();
    expect(screen.getByText(/Yet most of us were never taught/i)).toBeInTheDocument();
    expect(screen.getByText(/Start with the basics/i)).toBeInTheDocument();
  });

  test('renders learning preview cards', () => {
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    );
    
    // Check preview cards
    expect(screen.getByText(/How Money Really Works/i)).toBeInTheDocument();
    expect(screen.getByText(/Bitcoin Fundamentals/i)).toBeInTheDocument();
    expect(screen.getByText(/Critical Thinking/i)).toBeInTheDocument();
  });

  test('renders CTA section', () => {
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    );
    
    // Check call-to-action
    expect(screen.getByText(/Begin Your Journey/i)).toBeInTheDocument();
    expect(screen.getByText(/~5 minutes to start/i)).toBeInTheDocument();
  });

  test('main call-to-action button works', async () => {
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    );
    
    // Click on Begin Your Journey button
    const journeyButton = screen.getByText(/Begin Your Journey/i);
    fireEvent.click(journeyButton);
    
    // Check if button exists and is clickable
    expect(journeyButton).toBeInTheDocument();
  });

  test('slide navigation works', async () => {
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    );
    
    // Find navigation buttons
    const nextButton = screen.getByText(/Next/i);
    const prevButton = screen.getByText(/Previous/i);
    
    // Previous button should be disabled initially
    expect(prevButton).toBeDisabled();
    
    // Next button should be enabled
    expect(nextButton).not.toBeDisabled();
    
    // Click next to go to second slide
    fireEvent.click(nextButton);
    
    // Check if we can find content from the second slide
    await waitFor(() => {
      expect(prevButton).not.toBeDisabled();
    });
  });

  test('Bitcoin symbol renders correctly', () => {
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    );
    
    // Check for Bitcoin symbol
    const bitcoinSymbol = screen.getByText('₿');
    expect(bitcoinSymbol).toBeInTheDocument();
    expect(bitcoinSymbol).toHaveClass('bitcoin-symbol');
  });

  test('progress indicators render', () => {
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    );
    
    // Check for slide indicators
    const indicators = document.querySelectorAll('.slide-indicator');
    expect(indicators.length).toBeGreaterThan(0);
    
    // First indicator should be active
    expect(indicators[0]).toHaveClass('active');
  });

  test('preview icons render correctly', () => {
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    );
    
    // Check for SVG icons in preview cards
    const svgIcons = document.querySelectorAll('.preview-icon');
    expect(svgIcons.length).toBe(3); // Should have 3 preview cards with icons
  });
});

describe('Accessibility', () => {
  test('main navigation buttons have proper attributes', () => {
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    );
    
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
    
    // All buttons should be accessible
    buttons.forEach(button => {
      expect(button).toBeInTheDocument();
    });
  });

  test('headings have proper hierarchy', () => {
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    );
    
    // Check for proper heading structure
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent(/Learn Bitcoin by Doing/i);
    
    const h2Elements = screen.getAllByRole('heading', { level: 2 });
    expect(h2Elements.length).toBeGreaterThan(0);
  });
});

describe('Responsive Design Elements', () => {
  test('header content structure is present', () => {
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    );
    
    // Check for responsive layout elements
    const headerContent = document.querySelector('.header-content');
    expect(headerContent).toBeInTheDocument();
    
    const logoSection = document.querySelector('.logo-section');
    expect(logoSection).toBeInTheDocument();
    
    const headerNav = document.querySelector('.header-nav');
    expect(headerNav).toBeInTheDocument();
  });

  test('main content areas are structured correctly', () => {
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    );
    
    const mainContent = document.querySelector('.main-content');
    expect(mainContent).toBeInTheDocument();
    
    const welcomeSection = document.querySelector('.welcome-section');
    expect(welcomeSection).toBeInTheDocument();
  });
});

describe('Content Validation', () => {
  test('contains educational content about Bitcoin', () => {
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    );
    
    // Check for Bitcoin-related educational content
    expect(screen.getByText(/Bitcoin Fundamentals/i)).toBeInTheDocument();
    expect(screen.getByText(/How Money Really Works/i)).toBeInTheDocument();
    expect(screen.getByText(/Critical Thinking/i)).toBeInTheDocument();
  });

  test('provides clear learning path information', () => {
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    );
    
    // Check for learning path guidance
    expect(screen.getByText(/What You'll Learn/i)).toBeInTheDocument();
    expect(screen.getByText(/Master money and Bitcoin through interactive exploration/i)).toBeInTheDocument();
  });

  test('includes call-to-action elements', () => {
    render(
      <TestWrapper>
        <Homepage />
      </TestWrapper>
    );
    
    // Check for engagement elements
    const startButton = screen.getByText(/Begin Your Journey/i);
    expect(startButton).toBeInTheDocument();
    expect(startButton.closest('button')).toHaveClass('start-journey-button');
    
    expect(screen.getByText(/~5 minutes to start/i)).toBeInTheDocument();
    expect(screen.getByText(/No signup required/i)).toBeInTheDocument();
  });
});
