/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router'
import VueLogger from 'vuejs3-logger'
import {LoggerOption} from "@/core/plugins/vuejs3-logger";
import pinia from "@/core/plugins/pinia";
// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(VueLogger, LoggerOption)
    .use(pinia)
}
