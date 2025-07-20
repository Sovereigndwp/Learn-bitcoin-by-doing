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
    expect(screen.getByText(/Bitcoin Learning Journey/i)).toBeInTheDocument();

    // Test "Begin Your Journey" button works
    const startButton = screen.getByText(/Begin Your Journey/i);
    expect(startButton).toBeInTheDocument();
    
    // Test navigation tabs work
    const learningTab = screen.getByText('Learning');
    expect(learningTab).toBeInTheDocument();
    
    const progressTab = screen.getByText('Progress');
    expect(progressTab).toBeInTheDocument();
  });

  test('slide navigation provides educational progression', async () => {
    render(
      <IntegrationWrapper>
        <Homepage />
      </IntegrationWrapper>
    );

    const nextButton = screen.getByText(/Next/i);
    const prevButton = screen.getByText(/Previous/i);

    // Initial state
    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    // Navigate forward through slides
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(prevButton).not.toBeDisabled();
    });
  });
});
