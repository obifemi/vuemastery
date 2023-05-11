<script setup>
import { ref, onMounted, watchEffect, computed } from 'vue'

import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
const events = ref(null)
const totalEvents = ref(0)
const page = ref(1)
defineProps({
  page: Number,
})
onMounted(() => {
  fetchEvents()
})
watchEffect(() => {
  events.value = null
  fetchEvents()
})
function fetchEvents() {
  EventService.getEvents(2, page.value)
    .then((response) => {
      console.log(response)
      events.value = response.data
      totalEvents.value = response.headers['x-total-count']
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
const hasNextPage = computed(() => {
  var totalPages = Math.ceil(totalEvents.value / 2)
  return page.value < totalPages
})
</script>

<template>
  <h1>Events For Good</h1>
  <p v-if="events === null">Events Loading...</p>
  <div v-if="events != null" class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        @click="previousPage()"
        >Previous</router-link
      >

      <router-link
        v-if="hasNextPage"
        id="page-next"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        @click="page++"
        >Next</router-link
      >
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width:290px
}
.pagination a {
  flex: 1;
  text-decoration:none;
  color: #000;
}
#page-prev{
  text-align:left;
}
#page-next{
  text-align:right;
}
</style>
