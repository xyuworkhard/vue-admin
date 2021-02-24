import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import '@/styles/eleReset.scss'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import Folder from "@/components/Folder"
import csceSelect from "@/components/Csce_Select"

import axios from 'axios'
import md5 from 'js-md5'
import { getDictionaryVal, getDataSource, getNameById, getIdByName, getDataSourceFinc, dateFormat, dealCompany, GUID, dealDictionary } from '@/utils/getDataMethods'
import { getUserInfo } from '@/utils/auth'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.apiroute = 'http://192.168.1.59:8090'

Vue.component('Folder', Folder)
Vue.component('csceSelect', csceSelect)

//axios
Vue.prototype.$axios = axios
//引入md5加密 
Vue.prototype.$md5 = md5
//filter
Vue.filter('dateFormat', (dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  if (!dateStr) { return };
  return dateFormat(new Date(dateStr), pattern);
})

//common methods
Vue.prototype.getDictionaryVal = function (type) {
  return getDictionaryVal(type, this)
}
Vue.prototype.getCompanyList = function () {
  return getDataSource(this)
}
Vue.prototype.getDealCompany = function () {
  return dealCompany(this)
}
Vue.prototype.getdealDictionary = function (type) {
  return dealDictionary(this, type)
}
Vue.prototype.getCompanyFincList = function () {
  return getDataSourceFinc(this)
}
Vue.prototype.getNameById = function (type, id) {
  let arr = getDictionaryVal(type, this)
  return getNameById(arr, id)
}
Vue.prototype.getIdByName = function (type, name) {
  let arr = getDictionaryVal(type, this)
  return getIdByName(arr, name)
}
Vue.prototype.adminAccount = function () {
  let userInfo = JSON.parse(getUserInfo())
  return userInfo.UserType == 9 && userInfo.UserStat == 1 ? true : false
}
Vue.prototype.GUID = function () {
  return GUID();
};

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
