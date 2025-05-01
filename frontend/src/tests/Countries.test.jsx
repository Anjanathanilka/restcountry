import { render, screen, waitFor } from '@testing-library/react';
import Countries from '../components/Countries';
import axios from 'axios';

jest.mock('axios');

const mockCountry = {
  name: { common: 'Japan' },
  population: 123456789,
  region: 'Asia',
  capital: ['Tokyo'],
  languages: { jpn: 'Japanese' },
  currencies: { JPY: { name: 'Yen', symbol: '¥' } },
  flags: { png: 'https://flagcdn.com/jp.png' },
  cca3: 'JPN',
};

test('renders countries after fetching', async () => {
  axios.get.mockResolvedValue({ data: [mockCountry] });
  render(<Countries selectedRegion="asia" clearSelectedRegionHandler={() => {}} />);
  await waitFor(() => {
    expect(screen.getByText(/Japan/)).toBeInTheDocument();
  });
});
