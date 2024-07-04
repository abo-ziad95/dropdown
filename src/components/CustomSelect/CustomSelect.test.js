import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomSelect from './index';
import { keyEvent } from './constants';

const mockOptions = [
  { objectId: '1', Name: 'Option 1' },
  { objectId: '2', Name: 'Option 2' },
  { objectId: '3', Name: 'Option 3' },
];

describe('CustomSelect Component', () => {
  test('renders with loading state', () => {
    render(<CustomSelect loading={true} options={[]} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('keyboard navigation and selection', () => {
    const handleChange = jest.fn();
    render(<CustomSelect loading={false} options={mockOptions} onChange={handleChange} />);

    // Focus the dropdown
    const dropdown = screen.getByText('Select an option');
    dropdown.focus();

    // Navigate using keyboard
    fireEvent.keyDown(dropdown, { key: keyEvent.ARROW_DOWN });
    fireEvent.keyDown(dropdown, { key: keyEvent.ARROW_DOWN });
    fireEvent.keyDown(dropdown, { key: keyEvent.ENTER });

    // Verify the selected option is displayed and onChange is called
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith('Option 2');
  });
});
