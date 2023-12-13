import React from 'react';
import { render } from '@testing-library/react';
import JsonFormatter from '../src/components/JsonFormatter';

describe('JsonFormatter component', () => {
  it('renders without crashing', () => {
    render(<JsonFormatter
      key={1}
      queryKey={'[posts-one]'}
      jsonData={{val: 'test', arr: [1,2,3]}}
    />);
  });
});