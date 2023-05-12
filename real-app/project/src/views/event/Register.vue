<template>
    <p>Register the event here</p>
    <button @click="register"> Register Me </button>
  </template>
  
  <script>
  export default {
    props: ['event'],
    inject: ['GStore'],
    methods: {
      register() {
        this.GStore.flashMessage = 'You are registered!' + this.event.title

        setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)

        this.$router.push({ name: 'event-details' })
      }
    }

  }

  </script>