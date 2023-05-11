<template>
    <p>Register the event here</p>
    <button @click="register"> Register Me </button>
  </template>
  
  <script>
  export default {
    props: ['event'],
    methods: {
      register() {
       this.$router.push({ name: 'event-details' })
      }
    }

  }

  </script>