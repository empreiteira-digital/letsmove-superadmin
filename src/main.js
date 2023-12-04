import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import ToastPlugin from 'vue-toast-notification';

import 'primeicons/primeicons.css';
import StyleClass from 'primevue/styleclass';
import 'primeflex/primeflex.css';
import './assets/theme.css';
import 'primevue/resources/primevue.min.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import App from './App.vue';
import router from './router';

const pinia = createPinia();

createApp(App)
  .use(PrimeVue, { ripple: true })
  .use(router)
  .use(pinia)
  .use(ToastPlugin)
  .directive('tooltip', Tooltip)
  .directive('styleclass', StyleClass)
  .mount('#app');
