import 'reflect-metadata'
import Vue from 'vue'
import Component from 'vue-class-component'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueProgressBar from 'vue-progressbar'
import VueCookies from 'vue-cookies'
import VueTour from 'vue-tour'
import Meta from 'vue-meta'
//  import 'element-ui/types/notification'
import ElementUI from 'element-ui'
import VueTypedi from 'vue-typedi'
import VueRouter from 'vue-router'
import VueDragDrop from 'vue-drag-drop'
import { store } from '@/Scandinaver/Core/Infrastructure/store'
import VueRx from 'vue-rx'
import router from './router'
import { abilitiesPlugin, Can } from '@casl/vue'
import App from './Scandinaver/Core/UI/App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'swiper/css/swiper.css'
import '@/assets/scss/style.scss'
import i18n from '@/utils/i18n'
require('vue-tour/dist/vue-tour.css')

const progressBarConfig = {
  color: '#20A0FF',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
  },
  location: 'top',
}
Vue.use(ElementUI)
Vue.use(VueTypedi)
Vue.use(VueCookies)
Vue.use(VueProgressBar, progressBarConfig)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
Vue.prototype.$eventHub = new Vue()
Vue.use(VueRouter)
Vue.use(Meta)
Vue.use(VueDragDrop)
Vue.use(VueRx)
Vue.use(VueTour)
Vue.use(abilitiesPlugin, store.getters.ability)
Vue.component('Can', Can)

Component.registerHooks(['metaInfo'])

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
