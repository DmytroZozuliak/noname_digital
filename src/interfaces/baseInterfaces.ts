export interface IRoute {
  path: string;
  element: JSX.Element;
}

export interface IRouterRoutes {
  global: IRoute[];
  unAuth: IRoute[];
  auth: IRoute[];
}
