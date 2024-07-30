# vue-telify

## Description
Vue-telify is a Vue.js component library for phone number input and validation with support for country-specific formatting and Vuetify integration.

## Upcoming Changes
Note: vue-telify is currently undergoing some updates and modifications. Please stay tuned for new features and improvements. We recommend checking back for updates and following the project's GitHub repository for the latest information.

## Installation
To install vue-telify, you need to have `vue`, `vue-i18n`, and `vuetify` already installed in your project. If not, you can install them using the following commands:

```bash
npm install vue@^3.4.33 vue-i18n@^9.13.1 vuetify@^3.6.13

or 

yarn add vue@^3.4.33 vue-i18n@^9.13.1 vuetify@^3.6.13
```

Then, install vue-telify:

```bash
npm install vue-telify

or 

yarn add vue-telify
```

## Required Dependencies

Make sure you have the following dependencies in your project for vue-telify to work properly:

```bash
"peerDependencies": {
  "vue": "^3.4.33",
  "vue-i18n": "^9.13.1",
  "vuetify": "^3.6.13"
}
```

If you don't have these dependencies installed, please install them using the command provided above.

## Additional Dependencies
vue-telify also relies on the following packages which are automatically installed when you install vue-telify:

```bash
"dependencies": {
  "@mdi/font": "^7.4.47",
  "flag-icons": "^7.2.3",
  "vite-plugin-vuetify": "^2.0.3"
}
```

## Usage
To use vue-telify in your project, import it in your main.js or main.ts file:

```bash
import { createApp } from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import VueTelify from 'vue-telify';

import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.min.css';
import 'flag-icons/css/flag-icons.min.css';

const app = createApp(App);

app.use(Vuetify);
app.use(VueTelify);

app.mount('#app');
```

## Example
Here is a simple example of how to use the vue-telify component:
```bash
<template>
  <div id="app">
    <TelInput v-model="phoneNumber" />
  </div>
</template>

<script setup lang="ts">
import TelInput from '~/components/TelInput.vue';
import { ref } from 'vue';

const phoneNumber = ref('')
</script>
```

## Contributing
Contributions are welcome! Please see the [contributing guidelines](https://github.com/exodevfr/vue-telify/blob/master/CONTRIBUTING.md) for more information.

## License
vue-telify is licensed under the MIT License. See the [LICENSE](https://github.com/exodevfr/vue-telify/blob/master/LICENSE) file for more details.

## Issues
If you encounter any issues, please report them on the [GitHub issues page](https://github.com/exodevfr/vue-telify/issues).

## Author
Cindy RAOUX (Codindy) | EXO-DEV

