import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Project from './pages/Project';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'project', element: <Project /> },
      { path: 'home', element: <Home /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}