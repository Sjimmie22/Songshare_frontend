<!-- SongsTable.vue -->
<template>
  <div>
    <h1 class="TitleH1">Song Page</h1>
    <p class="TitleP">Hier staan alle songs die geüpload zijn op deze site!</p>
    <table>
      <thead>
      <tr>
        <th>Title</th>
        <th> | </th>
        <th>Band</th>
        <th> |</th>
        <th>Genre</th>
        <th> | </th>
        <th>Likes </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="song in songs" :key="song.id">
        <td>{{ song.title }}</td>
        <td> | </td>
        <td>{{ song.band }}</td>
        <td> | </td>
        <td>{{ song.category }}</td>
        <td> |</td>
        <td>{{ song.likes}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      songs: []
    }
  },
  mounted () {
    this.fetchSongs()
  },
  methods: {
    async fetchSongs () {
      try {
        const response = await axios.get('http://localhost:8080/api/songs') // Het endpoint van je backend
        this.songs = response.data // De ontvangen gegevens worden toegewezen aan de 'songs'-array
      } catch (error) {
        console.error('Fout bij het ophalen van songgegevens:', error)
      }
    }
  }
}
</script>

<style scoped>

</style>
