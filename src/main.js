import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

import 'primeicons/primeicons.css';
import StyleClass from 'primevue/styleclass';
import 'primeflex/primeflex.css';
import './assets/theme.css';
import 'primevue/resources/primevue.min.css';

import App from './App.vue';
import router from './router';

const pinia = createPinia();

createApp(App)
  .use(PrimeVue, { ripple: true })
  .use(router)
  .use(pinia)
  .directive('styleclass', StyleClass)
  .mount('#app');
