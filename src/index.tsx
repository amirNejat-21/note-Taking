import React from 'react';
import ReactDOM from 'react-dom';

import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './i18n/en/translation.json';
import faTranslation from './i18n/fa/translation.json';
import './index.css';
import App from './App';

i18n
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      fa: {
        translation: faTranslation,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

ReactDOM.render(
  <React.StrictMode>
 
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>

  </React.StrictMode>,
  document.getElementById('root')
);




