import { render, screen } from '@testing-library/react';
import App from '../App'; 
import { AuthProvider } from './context/AuthContext';

test('shows login when not authenticated', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  expect(screen.getByText(/Login to Countries App/i)).toBeInTheDocument();
});
