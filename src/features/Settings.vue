<template>
    <div class="vstb--input-line">
        <span>Toggle Extra Valuation Tools</span>
        <input type="checkbox" v-model="settingsStore.settings.additionalTools" />
    </div>
</template>

<script setup>
// Imports
// Stores
import { useSettingsStore } from '../stores/settings';
const settingsStore = useSettingsStore();
</script>