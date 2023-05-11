<template>
    <div>
        <h1>404 - Not Found</h1>
        <p>The {{ resource }} is not found.</p>
        <router-link :to="{name:'event-list'}">Go Home</router-link>
    </div>
</template>

<script>

export default {
    props:{
        resource: {
            type: String,
            required: true,
            default: 'page'
        }
    }
}

</script>