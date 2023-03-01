import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import GoogleButton from 'react-google-button';
import { auth } from '../../firebase';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { snackActions } from '../../store/reducers/snackSlice';
import { themeMode } from '../../theme/theme';

const SignInGoogleButton = () => {
  const theme = useTypedSelector((state) => state.settings.theme);
  const dispatch = useTypedDispatch();

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(snackActions.openErrorSnack(error.message));
      }
    }
  };

  return (
    <GoogleButton
      type={theme === themeMode.dark ? 'dark' : 'light'}
      onClick={signInWithGoogle}
      label="Sign in with Google"
    />
  );
};

export default SignInGoogleButton;
