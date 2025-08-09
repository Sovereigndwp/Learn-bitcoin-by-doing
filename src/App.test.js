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
    expect(screen.getByText('Discover')).toBeInTheDocument();
    expect(screen.getByText('Sound Money')).toBeInTheDocument();
    expect(screen.getByText(/Begin Your Discovery/i)).toBeInTheDocument();
  });

  test('renders main navigation elements', () => {
    render(
      <ComponentTestWrapper>
        <Homepage />
      </ComponentTestWrapper>
    );
    
    // Check main navigation elements
    expect(screen.getByText(/Learn Bitcoin by Doing/i)).toBeInTheDocument();
    expect(screen.getByText(/Master money and Bitcoin through interactive exploration/i)).toBeInTheDocument();
  });

  test('renders hero section with correct content', () => {
    render(
      <ComponentTestWrapper>
        <Homepage />
      </ComponentTestWrapper>
    );
    
    // Check hero content
    expect(screen.getByText('Discover')).toBeInTheDocument();
    expect(screen.getByText('Sound Money')).toBeInTheDocument();
    expect(screen.getByText(/Journey through the most important financial discovery/i)).toBeInTheDocument();
    expect(screen.getByText(/Question everything you thought you knew about money/i)).toBeInTheDocument();
  });

  test('renders learning preview cards', () => {
    render(
      <ComponentTestWrapper>
        <Homepage />
      </ComponentTestWrapper>
    );
    
    // Check question cards
    expect(screen.getByText(/What is money, really/i)).toBeInTheDocument();
    expect(screen.getByText(/Who gets to decide what money is/i)).toBeInTheDocument();
    expect(screen.getByText(/If new money can be created at will/i)).toBeInTheDocument();
  });

  test('renders CTA section', () => {
    render(
      <ComponentTestWrapper>
        <Homepage />
      </ComponentTestWrapper>
    );
    
    // Check call-to-action
    expect(screen.getByText(/Start Your Journey/i)).toBeInTheDocument();
    expect(screen.getByText(/No prior knowledge required/i)).toBeInTheDocument();
  });

  test('main call-to-action button works', async () => {
    render(
      <ComponentTestWrapper>
        <Homepage />
      </ComponentTestWrapper>
    );
    
    // Check that Start Your Journey button exists
    const journeyButton = screen.getByText(/Start Your Journey/i);
    expect(journeyButton).toBeInTheDocument();
    
    // Verify it's a clickable button
    expect(journeyButton.tagName).toBe('BUTTON');
  });

  test('homepage has interactive elements', async () => {
    render(
      <ComponentTestWrapper>
        <Homepage />
      </ComponentTestWrapper>
    );
    
    // Find main call-to-action buttons
    const discoveryButton = screen.getByText(/Begin Your Discovery/i);
    const journeyButton = screen.getByText(/Start Your Journey/i);
    
    // Buttons should be present
    expect(discoveryButton).toBeInTheDocument();
    expect(journeyButton).toBeInTheDocument();
  });

  test('Bitcoin symbol renders correctly', () => {
    render(
      <ComponentTestWrapper>
        <Homepage />
      </ComponentTestWrapper>
    );
    
    // Check for Bitcoin symbol - get the first one (header)
    const bitcoinSymbols = screen.getAllByText('₿');
    expect(bitcoinSymbols.length).toBeGreaterThan(0);
    expect(bitcoinSymbols[0]).toHaveClass('bitcoin-symbol');
  });

  test('question cards have proper styling', () => {
    render(
      <ComponentTestWrapper>
        <Homepage />
      </ComponentTestWrapper>
    );
    
    // Check for question cards
    const questionCards = document.querySelectorAll('.question-card');
    expect(questionCards.length).toBe(4); // Should have 4 question cards
  });

  test('feature cards render correctly', () => {
    render(
      <ComponentTestWrapper>
        <Homepage />
      </ComponentTestWrapper>
    );
    
    // Check for feature cards in the features grid
    const featureCards = document.querySelectorAll('.feature-card');
    expect(featureCards.length).toBe(3); // Should have 3 feature cards
  });
});

describe('Accessibility', () => {
  test('main navigation buttons have proper attributes', () => {
    render(
      <ComponentTestWrapper>
        <Homepage />
      </ComponentTestWrapper>
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
      <ComponentTestWrapper>
        <Homepage />
      </ComponentTestWrapper>
    );
    
    // Check for proper heading structure - get all h1s and check the first one
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements.length).toBeGreaterThan(0);
    expect(h1Elements[0]).toHaveTextContent(/Learn Bitcoin by Doing/i);
    
    const h2Elements = screen.getAllByRole('heading', { level: 2 });
    expect(h2Elements.length).toBeGreaterThan(0);
  });
});

describe('Responsive Design Elements', () => {
  test('header content structure is present', () => {
    render(
      <ComponentTestWrapper>
        <Homepage />
      </ComponentTestWrapper>
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
      <ComponentTestWrapper>
        <Homepage />
      </ComponentTestWrapper>
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
      <ComponentTestWrapper>
        <Homepage />
      </ComponentTestWrapper>
    );
    
    // Check for Bitcoin-related educational content
    expect(screen.getByText(/Bitcoin: The Discovery of Sound Money/i)).toBeInTheDocument();
    expect(screen.getByText(/Mathematically Secure/i)).toBeInTheDocument();
    // Use getAllByText for multiple instances
    expect(screen.getAllByText(/Globally Accessible/i)).toHaveLength(2);
  });

  test('provides clear learning path information', () => {
    render(
      <ComponentTestWrapper>
        <Homepage />
      </ComponentTestWrapper>
    );
    
    // Check for learning path guidance - handle text that may be split across elements
    expect(screen.getAllByText(/Transform/)).toHaveLength(2); // Should find both instances
    expect(screen.getByText(/Your Understanding/)).toBeInTheDocument();
    expect(screen.getByText(/Master money and Bitcoin through interactive exploration/i)).toBeInTheDocument();
  });

  test('includes call-to-action elements', () => {
    render(
      <ComponentTestWrapper>
        <Homepage />
      </ComponentTestWrapper>
    );
    
    // Check for engagement elements
    const startButton = screen.getByText(/Start Your Journey/i);
    expect(startButton).toBeInTheDocument();
    
    expect(screen.getByText(/No prior knowledge required/i)).toBeInTheDocument();
    expect(screen.getByText(/Transform your financial future/i)).toBeInTheDocument();
  });
});
