import React from 'react'
import GoogleButton from 'react-google-button'
import { useTypedSelector } from '../../hooks/redux'
import { themeMode } from '../../theme/theme'

const SignInGoogleButton = () => {
  const theme = useTypedSelector(state => state.settings.theme)

  return (
    <GoogleButton
      type={theme === themeMode.dark ? 'dark' : 'light'}
      onClick={() => console.log('clicked sign in with google')}
      label='Sign in with Google'
    />
  )
}

export default SignInGoogleButton
