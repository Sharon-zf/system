import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './api/axios.js';//数据接口封装引入
import '../src/api/mock.js'
import axios from 'axios'

Vue.prototype.$api = api;// 将api挂载到vue的原型上
Vue.prototype.$axios = axios;
// Vue.prototype.$confirm = MessageBox.confirm
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    store.commit('addMenu', router)
  },
  render: h => h(App)
}).$mount('#app')
