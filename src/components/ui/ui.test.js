import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProgressProvider } from '../../contexts/ProgressContext';
import { NotificationProvider } from '../NotificationSystem';
import { LanguageProvider } from '../../contexts/LanguageContext';
import Card from './Card';
import Toggle from './Toggle';
import QuizChoice from './QuizChoice';

// Test wrapper with all providers
const TestWrapper = ({ children }) => (
  <LanguageProvider>
    <ProgressProvider>
      <NotificationProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </NotificationProvider>
    </ProgressProvider>
  </LanguageProvider>
);

describe('Card Component', () => {
  test('renders card with title and children', () => {
    render(
      <TestWrapper>
        <Card title="Test Card">
          <p>Test content</p>
        </Card>
      </TestWrapper>
    );
    
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('applies custom className when provided', () => {
    render(
      <TestWrapper>
        <Card title="Test Card" className="custom-class">
          <p>Test content</p>
        </Card>
      </TestWrapper>
    );
    
    const cardElement = screen.getByText('Test Card').closest('.card');
    expect(cardElement).toHaveClass('custom-class');
  });
});

describe('Toggle Component', () => {
  test('renders toggle with label', () => {
    const mockOnChange = jest.fn();
    render(
      <TestWrapper>
        <Toggle label="Test Toggle" checked={false} onChange={mockOnChange} />
      </TestWrapper>
    );
    
    expect(screen.getByText('Test Toggle')).toBeInTheDocument();
  });

  test('calls onChange when clicked', () => {
    const mockOnChange = jest.fn();
    render(
      <TestWrapper>
        <Toggle label="Test Toggle" checked={false} onChange={mockOnChange} />
      </TestWrapper>
    );
    
    const toggleElement = screen.getByRole('checkbox');
    fireEvent.click(toggleElement);
    
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  test('reflects checked state visually', () => {
    const mockOnChange = jest.fn();
    render(
      <TestWrapper>
        <Toggle label="Test Toggle" checked={true} onChange={mockOnChange} />
      </TestWrapper>
    );
    
    const toggleElement = screen.getByRole('checkbox');
    expect(toggleElement).toBeChecked();
  });
});

describe('QuizChoice Component', () => {
  test('renders choice with text', () => {
    const mockOnSelect = jest.fn();
    render(
      <TestWrapper>
        <QuizChoice 
          text="Test choice" 
          isSelected={false} 
          isCorrect={null}
          onSelect={mockOnSelect} 
        />
      </TestWrapper>
    );
    
    expect(screen.getByText('Test choice')).toBeInTheDocument();
  });

  test('calls onSelect when clicked', () => {
    const mockOnSelect = jest.fn();
    render(
      <TestWrapper>
        <QuizChoice 
          text="Test choice" 
          isSelected={false} 
          isCorrect={null}
          onSelect={mockOnSelect} 
        />
      </TestWrapper>
    );
    
    const choiceButton = screen.getByText('Test choice');
    fireEvent.click(choiceButton);
    
    expect(mockOnSelect).toHaveBeenCalled();
  });

  test('shows selected state visually', () => {
    const mockOnSelect = jest.fn();
    render(
      <TestWrapper>
        <QuizChoice 
          text="Test choice" 
          isSelected={true} 
          isCorrect={null}
          onSelect={mockOnSelect} 
        />
      </TestWrapper>
    );
    
    const choiceButton = screen.getByText('Test choice').closest('button');
    expect(choiceButton).toHaveClass('selected');
  });

  test('shows correct answer state', () => {
    const mockOnSelect = jest.fn();
    render(
      <TestWrapper>
        <QuizChoice 
          text="Test choice" 
          isSelected={true} 
          isCorrect={true}
          onSelect={mockOnSelect} 
        />
      </TestWrapper>
    );
    
    const choiceButton = screen.getByText('Test choice').closest('button');
    expect(choiceButton).toHaveClass('correct');
  });

  test('shows incorrect answer state', () => {
    const mockOnSelect = jest.fn();
    render(
      <TestWrapper>
        <QuizChoice 
          text="Test choice" 
          isSelected={true} 
          isCorrect={false}
          onSelect={mockOnSelect} 
        />
      </TestWrapper>
    );
    
    const choiceButton = screen.getByText('Test choice').closest('button');
    expect(choiceButton).toHaveClass('incorrect');
  });
});
