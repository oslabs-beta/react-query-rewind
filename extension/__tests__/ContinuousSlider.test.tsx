import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContinuousSlider from '../src/components/ContinuousSlider'; // Adjust the import path as necessary
import '@testing-library/jest-dom';

describe('ContinuousSlider', () => {
  it('renders correctly with given props', () => {
    const handleChange = jest.fn();
    const { asFragment } = render(<ContinuousSlider value={30} maxValue={100} onChange={handleChange} />);

    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('aria-valuemax', '100');
    expect(slider).toHaveAttribute('aria-valuenow', '30');
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls onChange with the new value when changed', async () => {
    const handleChange = jest.fn();
    render(<ContinuousSlider value={30} maxValue={100} onChange={handleChange} />);

    // Assuming the slider allows keyboard input, you can simulate changes like this
    const slider = screen.getByRole('slider');
    await userEvent.click(slider);
    await userEvent.keyboard('{arrowright}'); // Simulates pressing the right arrow key to increase the value

    expect(handleChange).toHaveBeenCalledWith(expect.any(Number));
  });

});
