// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/style.css'
import axios from 'axios'
Vue.prototype.axios = axios
Vue.config.productionTip = false

/*转换时间戳为正常时间*/
Vue.filter('formatDate', function (value, fmt) {
  let date = new Date(value);
  let obj = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  // 匹配年
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 匹配月/日/时/分/秒等
  for (let item in obj) {
    if (new RegExp('(' + item + ')').test(fmt)) {
      let str = '' + obj[item];
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : (('00' + str).substr(str.length)));
    }
  }
  return fmt;
});

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
  data: {
    eventHub: new Vue() // 给data添加一个 名字为eventHub 的空vue对象,用来传输非父子组件的数据
  }
}).$mount('#app')
