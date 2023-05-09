<script setup>
import {ref,onMounted} from 'vue'
import EventService from '@/services/EventService.js'
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
})

const event = ref(null)

onMounted(() => {
    EventService.getEvent(props.id)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
    <div class="event-details"   v-if='event'>
        <h1>{{event.title}}</h1>
        <p>@{{event.time}} and on {{event.date}}</p>
        <p>at {{event.location}}</p>
        <p>{{event.description}}</p>
    </div>
</template>