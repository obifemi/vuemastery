<script setup>
defineProps({
  event: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <RouterLink class="event-link" :to="{name: 'event-details', params:{id: event.id}}">
  <div class="event-card">
   <!-- Display Event Data -->
    <h3>{{event.title}}</h3>
    <p>@{{event.time}} and on {{event.date}}</p>
    <p>at {{event.location}}</p>
    <p>{{event.description}}</p>
  </div>
  </RouterLink>
</template>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.event-link{
  text-decoration: none;
  color: black;}
</style>
