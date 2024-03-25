import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Set up WebSocket connection
const websocket = new WebSocket('ws://localhost:8080/socket')

// WebSocket event handlers
websocket.addEventListener('open', () => {
  console.log('WebSocket connected')
})

websocket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  console.log('Received message:', message)
  // Handle the received message as needed
})

app.config.globalProperties.$websocket = websocket

// Use the router
app.use(router)

// Mount the app to the #app element in your HTML
app.mount('#app')
