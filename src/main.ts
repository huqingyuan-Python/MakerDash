import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia';
import App from './App.vue';
import zhCN from './locales/zh-CN';
import enUS from './locales/en-US';
import jaJP from './locales/ja-JP';
import zhTW from './locales/zh-TW';
import './assets/styles.scss';

const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
    'ja-JP': jaJP,
    'zh-TW': zhTW,
  },
});

const app = createApp(App);
app.use(createPinia());
app.use(i18n);
app.mount('#app');