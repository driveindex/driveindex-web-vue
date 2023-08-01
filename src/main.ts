import {createApp} from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

// Vue Router
import router from "./core/router";

// Vue i18n
import i18n from "./core/i18n";

// Pinia
import pinia from "./core/store";

createApp(App)
    .use(vuetify)
    .use(router)
    .use(i18n)
    .use(pinia)
    .mount('#app')
