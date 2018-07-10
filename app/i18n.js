import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';

i18n
  .use(XHR)
  .init({
    fallbackLng: 'vi',

    ns: ['nav'],
    defaultNS: 'nav',

    keySeparator: false,

    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },

    react: {
      wait: true
    },

    backend: {
      loadPath: '/lang/{{lng}}/{{ns}}.json',
      // addPath: './locales/{{lng}}/{{ns}}',
      allowMultiLoading: false,
    }
  });

export default i18n;