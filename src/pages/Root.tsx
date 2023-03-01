import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { auth } from '../firebase';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { fetchGoods, goodsActions } from '../store/reducers/goodsSlice';
import { snackActions } from '../store/reducers/snackSlice';
import { userActions } from '../store/reducers/userSlice';
import routes from '../utils/constants/routes';

const Root = () => {
  const isLogged = useTypedSelector((state) => state.user.isLogged);
  const isFetched = useTypedSelector((state) => state.goods.isFetched);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchGoods());
      dispatch(goodsActions.isFetched(true));
    }
  }, [dispatch, isFetched]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;
        const userInfo = {
          userName: displayName,
          email,
          userPhoto: photoURL,
        };
        dispatch(userActions.logIn(userInfo));
        dispatch(snackActions.openSuccessSnack('Successfully logged in'));
      } else {
        dispatch(userActions.logOut());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      {routes.global.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
      {isLogged
        ? routes.auth.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))
        : routes.unAuth.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
    </Routes>
  );
};

export default Root;
