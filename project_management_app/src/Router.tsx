import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Project from './pages/Project';
import MyTask from './pages/MyTask';
import ProjectCreate from './pages/ProjectCreate';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'project', element: <Project /> },
      { path: 'home', element: <Home /> },
      { path: 'mytask', element: <MyTask /> },
      { path: 'projectCreate', element: <ProjectCreate /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}