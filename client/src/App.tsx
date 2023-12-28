import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import {
  MainPage,
  CreateFeedPage,
  LoginPage,
  UpdateFeedPage,
  ProfilePage,
  ProfileSetting,
  CategoryPage,
  ProfileUpdatePage,
  Layout,
  NotFoundPage,
  CategoryDetailPage,
  ProfileFeedDetailPage,
  BookmarkDetailPage,
  SearchPage,
  SearchFeedDetailPage,
  HashtagFeedOverviewPage,
  HashtagFeedDetailPage,
} from "./pages";
import { PATH } from "./global/constants";
import { storage, storageKeys } from "./global/storage";
import Splash from "./components/Splash/Splash";
import GeoLocationFeedOverviewPage from "./pages/GeoLocationFeedOverviewPage";
import GeoLocationFeedDetailPage from "./pages/GeoLocationFeedDetailPage";

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
    element: <Layout />,
    children: [
      {
        path: PATH.root,
        element: <MainPage />,
      },
      {
        path: PATH.category(":categoryId"),
        element: <CategoryPage />,
      },
      {
        path: PATH.categoryDetail(":categoryId", ":cursor"),
        element: <CategoryDetailPage />,
      },
      {
        path: PATH.profile,
        element: <ProfilePage />,
      },
      {
        path: PATH.profileFeedDetail(":userId", ":cursor"),
        element: <ProfileFeedDetailPage />,
      },
      {
        path: PATH.bookmarkFeedDetail(":cursor"),
        element: <BookmarkDetailPage />,
      },
      {
        path: PATH.search(),
        element: <SearchPage />,
      },
      {
        path: PATH.searchFeedDetail(":query", ":cursor"),
        element: <SearchFeedDetailPage />,
      },
      {
        path: PATH.hashtagFeedOverview(":hashtag"),
        element: <HashtagFeedOverviewPage />,
      },
      {
        path: PATH.hashtagFeedDetail(":hashtag", ":cursor"),
        element: <HashtagFeedDetailPage />,
      },
      {
        path: PATH.geoLocationFeedOverview(":geoLocationContent"),
        element: <GeoLocationFeedOverviewPage />,
      },
      {
        path: PATH.geoLocationFeedDetail(":geoLocationContent", ":cursor"),
        element: <GeoLocationFeedDetailPage />,
      },
    ],
  },
  {
    path: PATH.login,
    element: <LoginPage />,
  },
  {
    element: <CheckHasAuth />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: PATH.createFeed,
            element: <CreateFeedPage />,
          },
          {
            path: PATH.updateFeed(":id"),
            element: <UpdateFeedPage />,
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
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <>
      <Splash />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
