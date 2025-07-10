import { render, screen } from '@testing-library/react';
import App from './App';

test('renders homepage with Bitcoin title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Money's Mess & Bitcoin's Fix/i);
  expect(titleElement).toBeInTheDocument();
});
