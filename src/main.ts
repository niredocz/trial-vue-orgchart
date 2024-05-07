import { createApp } from 'vue'
import router from './router'
// import HighchartsVue from 'highcharts-vue';
import './style.css'

import App from './App.vue'

const app = createApp(App)

app.use(router)
// app.use(HighchartsVue)

app.mount('#app')
