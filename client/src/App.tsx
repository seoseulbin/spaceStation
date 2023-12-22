import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PATH } from "./global/constants";
import MainPage from "./pages/MainPage";
import CreateFeedPage from "./pages/CreateFeedPage";
import LoginPage from "./pages/LoginPage";
import UpdateFeedPage from "./pages/UpdateFeedPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileUpdate from "./components/Profile/ProfileUpdate";
import ProfileSetting from "./components/Profile/Profile.Setting";
import CategoryPage from "./pages/CategoryPage";
import * as Sample from "./components/common/Modal/Sample";

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
    path: PATH.updateFeed(),
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
  //TODO : useCutsomDialog 설명을 위한 데모 페이지. 공유 되면 삭제 예정
  {
    path: PATH.sample,
    element: (
      <>
        <Sample.SampleModal />
        <Sample.SampleDialog />
        <Sample.SampleConfirm />
        <Sample.SampleConfirmWithInput />
      </>
    ),
  },
  {
    path: PATH.categoryPage(),
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
