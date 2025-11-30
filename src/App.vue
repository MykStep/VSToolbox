<template>
  <div id="vtsb--app">
    <Header v-model="displayApp"></Header>

    <div v-if="displayApp" id="vstb--app-container">
      <Toast></Toast>

      <img id="vstb--bg-re-logo" src="https://cdn.prod.website-files.com/60781e1041c84501a6e9c2d8/60781e1041c8458cd8e9c348_rockestate-icon-white.svg"/>

      <TabBar v-model="activeTab"></TabBar>

      <div class="vstb--tab-container">
        <Dashboard    v-if="activeTab === 'Main'"       ></Dashboard>
        <Comparables  v-if="activeTab === 'References'" ></Comparables>
        <Settings     v-if="activeTab === 'Settings'"   ></Settings>
      </div>

    </div>
  </div>
</template>

<script setup>
// Imports
import { ref, watch, onMounted } from 'vue';

// Components
import TabBar from './components/organisms/TabBar.vue';
import Header from './components/organisms/Header.vue';
import Dashboard from './features/Dashboard.vue';
import Comparables from './features/Comparables.vue';
import Settings from './features/Settings.vue';
import Toast from './components/atoms/Toast.vue';

// Composables
import { useToast } from './composables/useToast';

const { toast } = useToast();

// Stores
import { storeToRefs } from 'pinia'
import { useListingStore } from './stores/listing.js';
import { useSettingsStore } from './stores/settings';

const listingStore = useListingStore();
const settingsStore = useSettingsStore();

const { settings } = storeToRefs(settingsStore);

// Logic
const displayApp = ref(true);
const activeTab = ref('Main');

watch( settings, (newSettings) => {
  settingsStore.save();
}, {deep: true} );

onMounted(() => {
  listingStore.reloadCurrentListingData();
})

</script>