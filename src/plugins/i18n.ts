import { createI18n } from "vue-i18n";

// Importer les traductions
import en from '~/locales/en.json'
import fr from '~/locales/fr.json'

// Création instance i18n avec les traductions
const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'en',
  globalInjection: true,
  messages: {
    fr,
    en
  }
})

export default i18n;