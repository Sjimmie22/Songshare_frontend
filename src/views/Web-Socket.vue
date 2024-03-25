<template>
  <div>
    <h1>Welcome to the WebSocket test page!</h1>
    <p>Status: {{ connectionStatus }}</p>
    <button @click="toggleConnection">{{ isConnected ? 'Disconnect' : 'Connect' }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isConnected = ref(false)
const connectionStatus = ref('Disconnected')
let socket = null // Store the WebSocket instance

const toggleConnection = () => {
  if (isConnected.value) {
    disconnect()
  } else {
    connect()
  }
}

const connect = () => {
  // Replace 'your-socket-io-server-url' with your actual WebSocket server URL
  socket = new WebSocket('ws://localhost:8080/socket')

  socket.addEventListener('open', () => {
    connectionStatus.value = 'Connected'
    isConnected.value = true
  })

  socket.addEventListener('close', () => {
    connectionStatus.value = 'Disconnected'
    isConnected.value = false
  })

  // Add other event listeners or custom logic as needed
}

const disconnect = () => {
  if (socket) {
    socket.close()
    socket = null
  }
}
</script>

<style scoped>
/* Your styles go here */
</style>
