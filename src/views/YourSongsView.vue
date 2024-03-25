<template>
  <div>
    <h1 class="TitleH1">Your Song Page</h1>
    <p class="TitleP">Hier staan alle songs die jij hebt geüpload op deze site!</p>

    <button class="Addsongbutton" @click="toggleForm">
      {{ showForm ? 'Niet toevoegen' : 'Nummer toevoegen' }}
    </button>

    <form class="Addsongform" v-if="showForm" @submit.prevent="addSong">
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="newSong.title" required>

      <label for="band">Band:</label>
      <input type="text" id="band" v-model="newSong.band" required>

      <label for="category">Genre:</label>
      <input type="text" id="category" v-model="newSong.category" required>

      <button class="Submitaddsongbutton" type="submit">Add Song</button>
    </form>

    <div v-if="showConfirmationDialog" class="confirmation-dialog">
      <p>Are you sure you want to delete this song?</p>
      <button class="cancelbutton" @click="cancelDelete">Cancel</button>
      <button class="confirmdeletebutton" @click="deleteSong">Confirm</button>
    </div>
    <table>
      <thead>
      <tr>
        <th>Title</th>
        <th> | </th>
        <th>Band</th>
        <th> |</th>
        <th>Genre</th>
        <th> |</th>
        <th>Likes</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="song in songs" :key="song.id">
        <td>{{ song.title }}</td>
        <td> | </td>
        <td>{{ song.band }}</td>
        <td> | </td>
        <td>{{ song.category }}</td>
        <td> | </td>
        <td>{{ song.likes }}</td>
        <button class="Editbutton">
          <RouterLink :to="{ name: 'editSong', params: { id: song.id }}" style="color: white">Edit</RouterLink>
        </button>
        <button class="Deletebutton" @click="confirmDelete(song.id)">Delete</button>
      </tr>
      </tbody>
    </table>
    <div v-if="songs.length > 0" class="genre-distribution">
      <h2>Genre Distribution:</h2>
      <div v-for="genre in getGenreDistribution()" :key="genre.name" class="genre-bar">
        <p> {{ genre.name }}: {{ genre.percentage }}% </p>
        <div :style="{ width: genre.percentage + '%' }" class="bar"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { RouterLink } from 'vue-router'

export default {
  components: { RouterLink },
  data () {
    return {
      songs: [],
      showForm: false,
      showConfirmationDialog: false,
      songToDeleteId: null,
      newSong: {
        title: '',
        band: '',
        category: '',
        likes: '0'
      }
    }
  },
  mounted () {
    this.fetchSongs()
  },
  methods: {
    toggleForm () {
      this.showForm = !this.showForm
    },
    async fetchSongs (userId = 1) {
      try {
        const response = await axios.get(`http://localhost:8080/api/usersongs/${userId}/songs`)
        this.songs = response.data || [];
        console.log('Fetched songs:', this.songs)
      } catch (error) {
        console.error('Error fetching songs:', error)
      }
    },
    async addSong () {
      try {
        const { title, band, category } = this.newSong // Extract song details from the form

        const userId = 1 // Assuming a default user ID for this example

        // Make a POST request to add the song to the user
        await axios.post(`http://localhost:8080/api/usersongs/${userId}/addsong`, {
          title,
          band,
          category,
          likes: 0 // Assuming default likes as 0
        })

        // After successful addition, re-fetch the updated list of songs
        await this.fetchSongs(userId)

        this.newSong = {
          title: '',
          band: '',
          category: '',
          likes: '0'
        }
        this.showForm = false // Hide the form after adding the song
      } catch (error) {
        console.error('Error adding a new song:', error)
      }
    },

    confirmDelete (songId) {
      this.showConfirmationDialog = true
      this.songToDeleteId = songId
    },

    cancelDelete () {
      this.showConfirmationDialog = false
      this.songToDeleteId = null
    },

    async deleteSong () {
      try {
        if (this.songToDeleteId) {
          // Make a DELETE request to delete the song
          const userId = 1 // Assuming a default user ID for this example
          await axios.delete(`http://localhost:8080/api/usersongs/${userId}/deletesong/${this.songToDeleteId}`)

          // After successful deletion, re-fetch the updated list of songs
          await this.fetchSongs()

          // Reset values
          this.showConfirmationDialog = false
          this.songToDeleteId = null
        }
      } catch (error) {
        console.error('Error deleting the song:', error)
      }
    },
    getGenreDistribution () {
      const genreCounts = {}
      const totalSongs = this.songs.length

      // Count the occurrences of each genre
      this.songs.forEach(song => {
        const genre = song.category
        genreCounts[genre] = (genreCounts[genre] || 0) + 1
      })

      // Calculate the percentage for each genre
      const genreDistribution = Object.entries(genreCounts).map(([name, count]) => ({
        name,
        percentage: (count / totalSongs) * 100
      }))

      return genreDistribution
    }
  }
}

</script>

<style scoped>

</style>
