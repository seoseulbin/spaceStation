import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PATH } from "./config/constants";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: PATH.root,
    element: <MainPage />,
  },{
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
