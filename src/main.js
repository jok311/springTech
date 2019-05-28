// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 因为时间急，不做按需映入。。。
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import recursionComment from '@/views/recursionComment'
Vue.component("recursion-comment", recursionComment)

Vue.config.productionTip = false

store.dispatch('initCommentsList')

import * as filters from '@/filters' //过滤器

// // register global utility filters.注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
