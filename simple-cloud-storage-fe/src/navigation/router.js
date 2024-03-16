import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import PageNotFound from "./PageNotFound.jsx";
import UserAuth from "../pages/UserAuth/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <UserAuth />
      }
    ]
  }
]);

export default router;