<template>
  <div>

    <RouterLink to="/your-songs">Go Back</RouterLink>

    <h1>Edit Song: {{ editedSong.title }}</h1>

    <form @submit.prevent="submitForm">
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="editedSong.title" required>

      <label for="band">Band:</label>
      <input type="text" id="band" v-model="editedSong.band" required>

      <label for="genre">Genre:</label>
      <input type="text" id="genre" v-model="editedSong.category" required>

      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

export default {
  components: { RouterLink },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const songId = route.params.id
    const editedSong = ref({
      title: '',
      band: '',
      category: ''
    })

    onMounted(async () => {
      // Fetch song details when the component is mounted
      try {
        const response = await axios.get(`http://localhost:8080/api/songs/${songId}`)
        const song = response.data
        editedSong.value = {
          title: song.title,
          band: song.band,
          category: song.category
        }
      } catch (error) {
        console.error('Error fetching song details:', error)
      }
    })

    const submitForm = async () => {
      try {
        const { title, band, category } = editedSong.value
        // Make a PUT request to update the song details
        await axios.put(`http://localhost:8080/api/songs/${songId}`, {
          title: title,
          band: band,
          category: category
        })

        // Redirect to the song page or any other desired route after successful update
        await router.push({ name: 'your-songs' })
      } catch (error) {
        console.error('Error updating song details:', error)
      }
    }

    return {
      editedSong,
      submitForm
    }
  }
}
</script>

<style scoped>

</style>
