import * as yup from 'yup'
import { useTranslation } from 'react-i18next'

export const useValidationSchema = () => {
  const { t } = useTranslation()

  const validationSchema = yup.object({
    username: yup
      .string()
      .required(t('forms.auth.username_required'))
      // .test('only letters', t('forms.auth.username_letters'), (value) => {
      //   return !/[\&!@#$%\^\*\)\(\[\]\{\}<>,/\/\+\\]/.test(value as string);
      // })
      .min(4, t('forms.auth.username_min'))
      .max(15, t('forms.auth.username_max')),
    password: yup
      .string()
      .trim()
      .test('password', t('forms.auth.password_whitespaces'), (value) => {
        return !/\s/.test(value as string)
      })
      .required(t('forms.auth.password_required'))
      .test('password', t('forms.auth.password_characters'), (value) => {
        return !/[\&@#$%\^\*]/.test(value as string)
      })
      .min(4, t('forms.auth.password_min')),
  })

  return validationSchema
}
