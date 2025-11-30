<template>
    <div class="vtsb--toggle-card">
        <div :class="['vtsb--toggle-card-bar', {active: !collapsed}]" @click="$emit('clicked')">
            <div class="vstb--toggle-card-icon icon-start">
                <slot name="start"></slot>
            </div>
                <slot name="bar"></slot>
            <div class="vstb--toggle-card-icon icon-end">
                <slot name="end"></slot>
            </div>
        </div>
        <div :class="['vtsb--toggle-card-collapsed', {active: !collapsed}] ">
            <slot name="content"></slot>
            <div class="vtsb--toggle-card-action-bar">
                <slot name="actionbar"></slot>
            </div>
        </div>
    </div> 
</template>

<script setup>
defineProps({
    collapsed: {
        type: Boolean,
        default: true
    }
})
</script>