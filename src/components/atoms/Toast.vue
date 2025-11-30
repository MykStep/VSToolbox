<template>
    <transition name="toast-fade">
        <div v-if="toast.visible" class="toast-notification" :class="'toast-' + toast.type">
            {{ toast.message }}
        </div>
    </transition>
</template>

<script setup>
// Composable
import { useToast } from '../../composables/useToast';
const { toast } = useToast()
</script>
