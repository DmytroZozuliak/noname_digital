import * as yup from 'yup';

export const useValidationSchema = () => {
  const validationSchema = yup.object({
    email: yup.string().required('Email is required').email('Enter valid email'),
    password: yup
      .string()
      .trim()
      .test('password', "Password mustn't contain the whitespaces", (value) => {
        return !/\s/.test(value as string);
      })
      .required('Password is required')
      .test(
        'password',
        "Password mustn't contain the following characters '@, #, $, %, ^, &, *'",
        (value) => {
          return !/[\&@#$%\^\*]/.test(value as string);
        }
      )
      .min(6, 'Password must be 6 or more characters'),
  });

  return validationSchema;
};
