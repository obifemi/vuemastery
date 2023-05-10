<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
const events = ref(null)
const page = ref(1)
defineProps({
  page: Number,
})
onMounted(() => {
  fetchEvents()
})
watchEffect(() => {
  fetchEvents()
})
function fetchEvents() {
  EventService.getEvents(2, page.value)
    .then((response) => {
      events.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
}
function previousPage() {
  if (page.value > 1) {
    page.value--
  }
}
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <router-link
        id="page-prev"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        @click="previousPage()"
        >Previous</router-link
      >

      <router-link
        id="page-next"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        @click="page++"
        >Next</router-link
      >

  </div>


   
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
