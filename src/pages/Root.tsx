import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { auth } from '../firebase';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { snackActions } from '../store/reducers/snackSlice';
import { userActions } from '../store/reducers/userSlice';
import routes from '../utils/constants/routes';

const Root = () => {
  const isLogged = useTypedSelector((state) => state.user.isLogged);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('user onAuthStateChanged', user);
      if (user) {
        const { email, displayName, photoURL } = user;
        // set up user dispatch
        const userInfo = {
          userName: displayName,
          email,
          userPhoto: photoURL,
        };
        dispatch(userActions.logIn(userInfo));
        dispatch(snackActions.openSuccessSnack('Successfully logged in'));
      } else {
        // set up user dispatch null
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
