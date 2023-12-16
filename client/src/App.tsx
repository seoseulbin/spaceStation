import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PATH } from "./config/constants";
import MainPage from "./pages/MainPage";
import CreateFeedPage from "./pages/CreateFeedPage";

const router = createBrowserRouter([
  {
    path: PATH.root,
    element: <MainPage />,
  },
  {
    path: PATH.createFeed,
    element: <CreateFeedPage />,
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
