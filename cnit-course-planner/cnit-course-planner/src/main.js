import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './AppComposition.vue' // default: Composition API implementation
import './assets/style.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.mount('#app')
