import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Container } from './components/container/Container';
import { Search } from './pages/Search.page';
import { Library } from './pages/Library.page';
import { ProfileSettings } from './pages/profile/Settings.page';

const router = createBrowserRouter([
  {
    path: '/books-ui/',
    element: <Container />,
    children: [
      {
        path: '',
        element: <Search />,
      },
      {
        path: 'activity',
        element: 'Activity page',
      },
      {
        path: 'library',
        element: <Library />,
      },
      {
        path: 'challenges',
        element: 'Challenges page',
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'profile/settings',
        element: <ProfileSettings />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
