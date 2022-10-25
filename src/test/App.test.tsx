import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import App from '../App';

test('renders TodoListHomeViewPage section title', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText('Progress')).toBeInTheDocument();
  expect(screen.getByText('Tasks')).toBeInTheDocument();
});
