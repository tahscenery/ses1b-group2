import React from 'react';
import ReactDom from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});

  jest.mock('react-router-dom', () => ({
    useLocation: jest.fn().mockReturnValue({
      state: {
        didRedirect: false,
        from: {
          pathName: '/'
        }
      }
    })
  }))
});

describe('App', () => {
  const app = render(<App/>);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<App/>, div);
    ReactDom.unmountComponentAtNode(div);
  });

  // it('renders a nice message', () => {
  //   const { getByText } = render(<App />);
  //   const linkElement = getByText(/Welcome to Sapori Unici/i);
  //   expect(linkElement).toBeInTheDocument();
  // });
});
