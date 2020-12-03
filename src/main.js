import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import Dialog from 'primevue/dialog';
import Steps from 'primevue/steps';
import Textarea from 'primevue/textarea';
import TabMenu from 'primevue/tabmenu';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import Toolbar from 'primevue/toolbar'
import Menubar from 'primevue/menubar';
import Editor from 'primevue/editor';
import Carousel from 'primevue/carousel';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false
Vue.component('InputText', InputText);
Vue.component('Password', Password);
Vue.component('Button', Button);
Vue.component('Card',Card);
Vue.component('Panel', Panel);
Vue.component('Dialog', Dialog);
Vue.component('Steps', Steps)
Vue.component('Textarea',Textarea)
Vue.component('TabMenu', TabMenu)
Vue.component('DataTable', DataTable);
Vue.component('Column', Column);
Vue.component('Dropdown',Dropdown);
Vue.component('Toolbar', Toolbar);
Vue.component('Menubar', Menubar);
Vue.component('Editor', Editor);
Vue.component('Carousel', Carousel);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
