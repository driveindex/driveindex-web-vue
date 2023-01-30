import {createI18n} from 'vue-i18n'
import zh from './lang/zh-cn.json'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: sessionStorage.getItem('locale') || 'zh',
  messages: {
    zh,
  }
})

export default i18n
