import Vue from 'vue'
import App from './App.vue'
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Panel from 'primevue/panel';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


Vue.config.productionTip = false
Vue.component('InputText', InputText);
Vue.component('Password', Password);
Vue.component('Button', Button);
Vue.component('Card',Card);
Vue.component('Panel', Panel);

new Vue({
  render: h => h(App),
}).$mount('#app')
