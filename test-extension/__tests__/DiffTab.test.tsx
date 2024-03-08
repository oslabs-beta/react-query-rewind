import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DiffTab from '../src/containers/DiffTab';
import '@testing-library/jest-dom';
import { QueryDisplay } from '../src/types';
import exp from 'constants';

describe('DiffTab Component', () => {
  const queryDisplayMock: QueryDisplay[][] = [
    [
      {
        queryKey: 'Query 1',
        queryData: { some: 'data' }
      },
      {
        queryKey: 'Query 2',
        queryData: { more: 'data' }
      }
    ],
    [
      {
        queryKey: 'Query 1',
        queryData: { some: 'different data' }
      }
    ]
  ];

  it('renders correctly with initial state', () => {
    const { asFragment } = render(<DiffTab queryDisplay={queryDisplayMock} currentIndex={0} />);
    expect(screen.getByLabelText(/Hide Unchanged Properties/i)).toBeInTheDocument();
    expect(screen.getByText(/Query 1/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
    });

  it('toggles isHidden state on switch toggle', () => {
    const { asFragment } = render(<DiffTab queryDisplay={queryDisplayMock} currentIndex={0} />);
    fireEvent.click(screen.getByRole('checkbox')); // Clicks the switch
    expect(screen.getByLabelText(/Show Unchanged Properties/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders JsonDiff component with correct props based on isHidden state', () => {
    const { rerender, asFragment } = render(<DiffTab queryDisplay={queryDisplayMock} currentIndex={1} />);
    let switchControl = screen.getByRole('checkbox');

    // Initially, isHidden should be false, so "Hide" should be in the label
    expect(switchControl).not.toBeChecked();
    expect(screen.getByText(/Hide Unchanged Properties/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();

    // Toggle the switch to change isHidden state
    fireEvent.click(switchControl);
    // Rerendering is necessary only if the component's response to state changes cannot be detected without it
    rerender(<DiffTab queryDisplay={queryDisplayMock} currentIndex={1} />);

    // Now, isHidden should be true, so "Show" should be in the label
    expect(screen.getByLabelText(/Show Unchanged Properties/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
