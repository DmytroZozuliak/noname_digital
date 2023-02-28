import { FormValues } from '../../interfaces/formInterfaces'

export const mockFormData: FormValues = {
  password: '12345',
  username: 'admin',
}

export const authDataForPages = [
  {
    title: 'Log In',
    redirectButton: 'Already has an account? Sign in!',
  },
  {
    title: 'Sign Up',
    redirectButton: "Don't have an account yet? Sign up!",
  },
]
