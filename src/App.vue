<script setup>
import { RouterLink, RouterView } from 'vue-router'

// eslint-disable-next-line no-unused-vars
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'

// Check if jwtToken is in cookies
const cookies = document.cookie.split(';')
let jwtTokenInCookies = null
for (const cookie of cookies) {
  const [name, value] = cookie.split('=')
  if (name.trim() === 'jwtToken') {
    jwtTokenInCookies = value
    break
  }
}

// If jwtToken is in cookies and not in local storage, set it in local storage
if (jwtTokenInCookies && !localStorage.getItem('jwtToken')) {
  localStorage.setItem('jwtToken', jwtTokenInCookies)

  document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
}

// Retrieve the token from local storage
const token = localStorage.getItem('jwtToken')

// Include the token in Axios requests if it exists
onMounted(() => {
  if (!token) {
    // Log a message to indicate there's no token
    console.error('No token found. Redirecting to login page.')

    // Redirect to the login page if there's no token
    nextTick(() => {
      // window.location.href = 'http://localhost:4200/#'
    })
  }
  // Include the token in the request headers
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
})

const logout = () => {
  // Remove the token from local storage
  localStorage.removeItem('jwtToken')
  // Redirect to the login page or another appropriate page
  window.location.href = 'http://localhost:5173/#' // Adjust the URL as needed
}
</script>

<template>
  <header>
    <div class="wrapper">
      <RouterLink to="/"><h1 class="green">Songshare</h1></RouterLink>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/your-songs">Your Songs</RouterLink>
        <RouterLink to="/songs">Songs</RouterLink>
        <RouterLink to="/websocket">Websocket</Routerlink>
      </nav>
    </div>
    <button @click="logout">Logout</button>
  </header>

  <RouterView/>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: -0.2rem;
    margin-left: 1rem;
  }
}
</style>
