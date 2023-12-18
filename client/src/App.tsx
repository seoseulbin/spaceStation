import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PATH } from "./global/constants";
import MainPage from "./pages/MainPage";
import CreateFeedPage from "./pages/CreateFeedPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: PATH.root,
    element: <MainPage />,
  },
  {
    path: PATH.createFeed,
    element: <CreateFeedPage />,
  },
  {
    path: PATH.login,
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
