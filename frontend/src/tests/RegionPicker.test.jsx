import { render, screen, fireEvent } from '@testing-library/react';
import RegionPicker from '../components/RegionPicker';

// 🧠 Mock image imports
jest.mock('../assets/Africa_map.png', () => 'AfricaImage');
jest.mock('../assets/americas.png', () => 'AmericasImage');
jest.mock('../assets/asia.png', () => 'AsiaImage');
jest.mock('../assets/europe.png', () => 'EuropeImage');
jest.mock('../assets/ocenia.png', () => 'OceaniaImage');

test('renders region cards and handles click', () => {
  const mockHandler = jest.fn();
  render(<RegionPicker onRegionPickHandler={mockHandler} />);

  expect(screen.getByText(/Africa/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/Asia/i));
  expect(mockHandler).toHaveBeenCalledWith('asia');
});
