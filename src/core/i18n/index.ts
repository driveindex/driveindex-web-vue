import {createI18n} from "vue-i18n";
import zh_cn from './lang/zh-cn.ts'
import en_us from './lang/en-us.ts'


const i18n: any = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'zh-CN',
    messages: {
        'zh-CN': zh_cn,
        'en-US': en_us
    }
})

export default i18n