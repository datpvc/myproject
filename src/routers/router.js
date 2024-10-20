import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';

export const routes = [
  {
    key: 1,
    path: '/',
    element: <HomePage />,
  },
  {
    key: 2,
    path: '/login',
    element: <LoginPage />,
  },
];
