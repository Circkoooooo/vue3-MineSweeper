import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index'

import 'uno.css'
import '@/styles/index.css'
import '@unocss/reset/tailwind.css'

const app = createApp(App)
app.use(createPinia)
app.use(router)
app.mount('#app')
