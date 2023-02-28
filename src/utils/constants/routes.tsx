import { Navigate } from 'react-router-dom';
import { IRouterRoutes } from '../../interfaces/baseInterfaces';
import Home from '../../pages/home_page/HomePage';
import SignInPage from '../../pages/authentication_page';
import News from '../../pages/news_page';
import Profile from '../../pages/profile_page';
import SignUpPage from '../../pages/authentication_page/SignUpPage';

export enum RoutePath {
  Home = '/',
  Goods = '/goods',
  GoodsItem = '/goods/:id',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  Profile = '/profile',
  NotFound = '*',
}

const routes: IRouterRoutes = {
  public: [
    {
      path: RoutePath.Home,
      element: <Home />,
    },
    {
      path: RoutePath.Goods,
      element: <News />,
    },
    {
      path: RoutePath.GoodsItem,
      element: <News />,
    },
    {
      path: RoutePath.SignIn,
      element: <SignInPage />,
    },
    {
      path: RoutePath.SignUp,
      element: <SignUpPage />,
    },
    {
      path: RoutePath.NotFound,
      element: <Navigate to={RoutePath.Home} replace />,
    },
  ],
  private: [
    {
      path: RoutePath.Profile,
      element: <Profile />,
    },
  ],
};

export default routes;
