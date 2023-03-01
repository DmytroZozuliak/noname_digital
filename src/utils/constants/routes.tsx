import { Navigate } from 'react-router-dom';
import { IRouterRoutes } from '../../interfaces/baseInterfaces';
import Home from '../../pages/home_page/HomePage';
import SignInPage from '../../pages/authentication_page';
import Goods from '../../pages/goods_page';
import Profile from '../../pages/profile_page';
import SignUpPage from '../../pages/authentication_page/SignUpPage';
import Product from '../../pages/product_page';

export enum RoutePath {
  Home = '/',
  Goods = '/goods',
  Product = '/goods/:id',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  Profile = '/profile',
  NotFound = '*',
}

const routes: IRouterRoutes = {
  global: [
    {
      path: RoutePath.Home,
      element: <Home />,
    },
    {
      path: RoutePath.Goods,
      element: <Goods />,
    },
    {
      path: RoutePath.Product,
      element: <Product />,
    },
  ],
  unAuth: [
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
      element: <Navigate to={RoutePath.SignIn} replace />,
    },
  ],
  auth: [
    {
      path: RoutePath.Profile,
      element: <Profile />,
    },
    {
      path: RoutePath.NotFound,
      element: <Navigate to={RoutePath.Home} replace />,
    },
  ],
};

export default routes;
