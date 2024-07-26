import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  // Vuetify configuration options
  icons: {
    defaultSet: 'mdi',
    aliases, 
    sets: {
      mdi
    }
  }
})
