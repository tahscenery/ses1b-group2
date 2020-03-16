import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('renders a nice message', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Hello, World/i);
  expect(linkElement).toBeInTheDocument();
});
