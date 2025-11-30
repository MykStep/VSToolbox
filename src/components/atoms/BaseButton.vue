<template>
    <button :class="['vstb--button', `severity-${severity}`, { active: active}]">
        <slot></slot>
    </button>
</template>

<script setup>
defineProps({
  severity: {
    type: String,
    default: 'default' 
  },
  active: {
    type: Boolean,
    default: false
  }
});
</script>
