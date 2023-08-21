import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

let app = createApp(App)

import globalComponents from './common/globalComponents'
globalComponents(app)

app.use(router).use(createPinia()).mount('#app')
