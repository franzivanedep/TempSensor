import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Correctly import the router

// Create the Vue app and use the router
createApp(App)
    .use(router) // Add the router to the app
    .mount('#app')
