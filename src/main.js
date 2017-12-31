// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
// import axios from 'axios'
import {
  Radio,
  RadioGroup,
  Form,
  FormItem,
  Col,
  Row,
  Button,
  Container,
  Header,
  DatePicker,
  Dialog,
  Menu,
  MenuItem,
  Main,
  Tabs,
  TabPane,
  Input,
  Table,
  TableColumn,
  Select,
  MessageBox,
  Card,
  Option
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Col)
Vue.use(Row)
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Main)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Card)
Vue.use(Option)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert

const store = new Vuex.Store({
  state: {
    isLogin: false,
    identity: 0,
    userInfo: {}
  },
  mutations: {
    login (state, u) {
      state.isLogin = true
      state.userInfo = u
    },
    c (state, p) {
      state.identity = p
    },
    signUp (state, p) {
      state.isLogin = false
      state.identity = 0
      state.userName = {}
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
