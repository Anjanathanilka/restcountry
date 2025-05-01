import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';

test('should login and logout', () => {
  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
  const { result } = renderHook(() => useAuth(), { wrapper });

  act(() => {
    result.current.login({ name: 'testuser' });
  });
  expect(result.current.user.name).toBe('testuser');

  act(() => {
    result.current.logout();
  });
  expect(result.current.user).toBe(null);
});
