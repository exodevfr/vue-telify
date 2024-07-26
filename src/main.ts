import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import 'flag-icons/css/flag-icons.min.css'
import { configure } from './config'
import i18n from './plugins/i18n'

configure({
  countryListOptions: ['europe'],
  language: 'fr'
})

const app = createApp(App)
app.use(vuetify)
app.use(i18n)
app.mount('#app')
