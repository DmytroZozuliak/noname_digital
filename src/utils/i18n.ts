import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { Language } from './constants/enums'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['localStorage'],
    },

    fallbackLng: Language.En,
    debug: false,

    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/noname_digital/locales/{{lng}}/{{ns}}.json',
    },
  })

export default i18n
