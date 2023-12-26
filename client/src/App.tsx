import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import { PATH } from "./global/constants";
import MainPage from "./pages/MainPage";
import CreateFeedPage from "./pages/CreateFeedPage";
import LoginPage from "./pages/LoginPage";
import UpdateFeedPage from "./pages/UpdateFeedPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileSetting from "./components/Profile/Profile.Setting";
import CategoryPage from "./pages/CategoryPage";
import * as Sample from "./components/common/Modal/Sample";
import { storage, storageKeys } from "./global/storage";
import ProfileUpdatePage from "./pages/ProfileUpdatePage";

// 인증을 수행하지 않고 storage에 인증정보의 유무만 검사 함
const CheckHasAuth = () => {
  const { pathname } = useLocation();
  const currentUser = storage.get(storageKeys.currentUser);

  if (!currentUser) {
    return <Navigate replace to={PATH.login} state={{ from: pathname }} />;
  }
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: PATH.root,
    element: <MainPage />,
  },

  {
    path: PATH.category(),
    element: <CategoryPage />,
  },
  {
    path: PATH.login,
    element: <LoginPage />,
  },
  {
    element: <CheckHasAuth />,
    children: [
      {
        path: PATH.createFeed,
        element: <CreateFeedPage />,
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
        element: <ProfileUpdatePage />,
      },
      {
        path: PATH.profileSetting,
        element: <ProfileSetting />,
      },
    ],
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
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
