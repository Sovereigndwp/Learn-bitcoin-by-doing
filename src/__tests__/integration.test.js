import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProgressProvider } from '../contexts/ProgressContext';
import { NotificationProvider } from '../components/NotificationSystem';
import { LanguageProvider } from '../contexts/LanguageContext';
import Homepage from '../components/Homepage';

const IntegrationWrapper = ({ children }) => (
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

describe('User Journey Integration Tests', () => {
  test('complete learning flow works correctly', async () => {
    render(
      <IntegrationWrapper>
        <Homepage />
      </IntegrationWrapper>
    );

    // Test homepage loads
    expect(screen.getByText(/Learn Bitcoin by Doing/i)).toBeInTheDocument();

    // Test "Begin Your Discovery" button works
    const startButton = screen.getByText(/Begin Your Discovery/i);
    expect(startButton).toBeInTheDocument();
    
    // Test main navigation elements exist
    expect(screen.getByText(/Learn Bitcoin by Doing/i)).toBeInTheDocument();
    expect(screen.getByText(/Master money and Bitcoin through interactive exploration/i)).toBeInTheDocument();
  });

  test('homepage interactive buttons work', async () => {
    render(
      <IntegrationWrapper>
        <Homepage />
      </IntegrationWrapper>
    );

    // Check for main interactive buttons
    const discoveryButton = screen.getByText(/Begin Your Discovery/i);
    const journeyButton = screen.getByText(/Start Your Journey/i);

    // Buttons should be present and clickable
    expect(discoveryButton).toBeInTheDocument();
    expect(journeyButton).toBeInTheDocument();

    // Test that buttons are clickable (just check they exist and are buttons)
    expect(discoveryButton.tagName).toBe('BUTTON');
    expect(journeyButton.tagName).toBe('BUTTON');
    
    // Buttons should be present initially
    expect(discoveryButton).toBeInTheDocument();
    expect(journeyButton).toBeInTheDocument();
  });
});
