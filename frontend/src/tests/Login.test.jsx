import { render, screen } from '@testing-library/react';
import Login from '../components/Login';

test('renders login page heading', () => {
  render(<Login />);
  expect(screen.getByText(/login to countries app/i)).toBeInTheDocument();
});
