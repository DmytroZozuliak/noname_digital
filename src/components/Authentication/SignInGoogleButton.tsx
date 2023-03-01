import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import GoogleButton from 'react-google-button';
import { auth } from '../../firebase';
import { useTypedSelector } from '../../hooks/redux';
import { themeMode } from '../../theme/theme';

const SignInGoogleButton = () => {
  const theme = useTypedSelector((state) => state.settings.theme);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error instanceof Error) {
        console.log('error when using sign with google', error.message);
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
