import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import PageNotFound from './PageNotFound.jsx';
import UserAuth from '../pages/UserAuth/index.jsx';
import Dashboard from '../pages/Dashboard/index.jsx';
import BucketFile from '../pages/BucketFile/index.jsx';
import ROUTES from './constants.js';

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: ROUTES.ROOT,
        element: <UserAuth />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES.BUCKETFILES,
        element: <BucketFile />,
      },
    ],
  },
]);

export default router;
