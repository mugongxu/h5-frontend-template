import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import utils from '@plugins/utils';
import api from '@plugins/api';
import vant from '@plugins/vant';
import CommonUI from '@components/common';

// 初始化样式
import '@scss/index.scss';

Vue.config.productionTip = false;
Vue.prototype.$COLOR_MAPS = ['#E5A942', '#54BCC9', '#7B8ECC', '#D2D2D2'];

Vue.use(utils);
Vue.use(api);
Vue.use(vant);
Vue.use(CommonUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
