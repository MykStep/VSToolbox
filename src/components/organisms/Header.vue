<template>
    <div id="myk--app-header">
        <div id="myk--header-controls">
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