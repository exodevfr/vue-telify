import { App, Plugin } from 'vue';
import TelInput from './components/TelInput.vue';
import { configure, } from './config'

const VueTelify: Plugin = {
  install(app: App, options) {
    configure(options);
    app.component('TelInput', TelInput)
  }
}

export { TelInput };
export default VueTelify;