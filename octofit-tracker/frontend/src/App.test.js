import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SepioFit Tracker headline', () => {
  render(<App />);
  const heading = screen.getByText(/SepioFit Tracker/i);
  expect(heading).toBeInTheDocument();
});
