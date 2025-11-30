<template>
    <button :class="['vstb--button', `severity-${severity}`]">
        <slot></slot>
    </button>
</template>

<script setup>
defineProps({
  severity: {
    type: String,
    default: 'default' 
  }
});
</script>
