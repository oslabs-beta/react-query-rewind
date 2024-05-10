import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import JsonDiff from '../src/components/JsonDiff';

describe('JsonDiff Component', () => {
  it('displays initial state message for empty currentJson and snapshot', () => {
    const { getByText, asFragment } = render(
      <JsonDiff
        oldJson={undefined}
        currentJson=""
        queryKey="testQueryKey"
        isHidden={false}
      />
    );
    expect(getByText(/Initial state - no comparison available/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays a diff when there are differences between oldJson and currentJson and snapshot', () => {
    const oldJson = { key: "oldValue" };
    const currentJson = { key: "newValue" };
    const { container, asFragment } = render(
      <JsonDiff
        oldJson={oldJson}
        currentJson={currentJson}
        queryKey="testQueryKey"
        isHidden={false}
      />
    );
    // Assert that the diff is displayed
    expect(container.querySelector('.jsondiffpatch-delta')).not.toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });
  

  it('displays no changes message when oldJson and currentJson are the same', () => {
    const json = { key: "value" };
    const { getByText, asFragment } = render(
      <JsonDiff
        oldJson={json}
        currentJson={json}
        queryKey="testQueryKey"
        isHidden={false}
      />
    );
    expect(getByText(/QueryKey data not modified on this state change/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('toggles visibility based on isHidden prop', () => {
    const json = { key: "value" };
    const newJson = { key: "newValue" };
    const { container, rerender, asFragment } = render(
      <JsonDiff
        oldJson={json}
        currentJson={newJson}
        queryKey="testQueryKey"
        isHidden={true}
      />
    );
    // Initially, the class indicating hidden changes should be present
    expect(container.querySelector('.jsondiffpatch-unchanged-hidden')).not.toBeNull();
    expect(asFragment()).toMatchSnapshot();
  
    // Rerender with isHidden = false and check if the class is removed
    rerender(
      <JsonDiff
        oldJson={json}
        currentJson={newJson}
        queryKey="testQueryKey"
        isHidden={false}
      />
    );
    expect(container.querySelector('.jsondiffpatch-unchanged-hidden')).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });
  
});
