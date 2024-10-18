import { createApp } from 'vue';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import './style.css';
import App from './App.vue';
const vuetify = createVuetify({
    components,
    directives,
  })
createApp(App).use(vuetify).use(autoAnimatePlugin).mount('#app');
