import { createBrowserRouter } from "react-router-dom";
import SignIn from "./SignIn";
import Contacts from "./Contacts";
import ErrorPage from "./Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contacts",
    element: <Contacts />,
  },
]);
