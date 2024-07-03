import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import CustomSelect from './index';

const mockOptions = [
  { objectId: '1', Name: 'Option 1' },
  { objectId: '2', Name: 'Option 2' },
  { objectId: '3', Name: 'Option 3' },
];

describe('CustomSelect', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders without crashing', () => {
    fetch.mockResponseOnce(JSON.stringify({ results: [] }));
    render(<CustomSelect />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('fetches and displays options', async () => {
    fetch.mockResponseOnce(JSON.stringify({ results: mockOptions }));
    render(<CustomSelect />);
    fireEvent.click(screen.getByText('Select an option'));
    await waitFor(() => {
      mockOptions.forEach(option => {
        expect(screen.getByText(option.Name)).toBeInTheDocument();
      });
    });
  });

  it('selects an option on click', async () => {
    fetch.mockResponseOnce(JSON.stringify({ results: mockOptions }));
    const handleChange = jest.fn();
    render(<CustomSelect onChange={handleChange} />);
    fireEvent.click(screen.getByText('Select an option'));
    await waitFor(() => {
      fireEvent.click(screen.getByText('Option 2'));
    });
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith('Option 2');
  });

  it('closes the dropdown on blur', async () => {
    fetch.mockResponseOnce(JSON.stringify({ results: mockOptions }));
    render(<CustomSelect />);
    fireEvent.click(screen.getByText('Select an option'));
    fireEvent.blur(screen.getByText('Select an option'));
    await waitFor(() => {
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });
  });
});
