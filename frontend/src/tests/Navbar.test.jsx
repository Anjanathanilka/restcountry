import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { AuthProvider } from '../context/AuthContext';

test('renders Navbar with title', () => {
  render(<AuthProvider><Navbar /></AuthProvider>);
  expect(screen.getByText(/Countries App/i)).toBeInTheDocument();
});
