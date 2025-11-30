<template>
    <div id="vstb--app-header">
        <div id="vstb--header-controls">
            <div @click="displayApp = !displayApp">O/I</div>
        </div>
    </div>
</template>

<script setup>
const displayApp = defineModel({
    type: Boolean,
    default: false
})
</script>