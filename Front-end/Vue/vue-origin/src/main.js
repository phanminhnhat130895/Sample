import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// Import css file
/* eslint-disable */
import "@/assets/style.css"

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   // store,
//   components: { App },
//   template: '<App/>'
// })

new Vue({
  render: h => h(App),
  router,
  components: { App }
}).$mount('#app')
