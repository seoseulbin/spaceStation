import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PATH } from "./global/constants";
import MainPage from "./pages/MainPage";
import CreateFeedPage from "./pages/CreateFeedPage";
import LoginPage from "./pages/LoginPage";
import UpdateFeedPage from "./pages/UpdateFeedPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileUpdate from "./components/Profile/ProfileUpdate";
import ProfileSetting from "./components/Profile/Profile.Setting";
import Sample from "./components/common/Modal/Sample";
import CategoryPage from "./pages/CategoryPage";

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
  {
    path: PATH.upadteFeed,
    element: <UpdateFeedPage />,
  },
  {
    path: PATH.profile,
    element: <ProfilePage />,
  },
  {
    path: PATH.profileUpdate,
    element: <ProfileUpdate />,
  },
  {
    path: PATH.profileSetting,
    element: <ProfileSetting />,
  },
  {
    path: PATH.sample,
    element: <Sample />,
  },
  {
    path: PATH.categoryPage,
    element: <CategoryPage />,
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
