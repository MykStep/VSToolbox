<template>
  <div id="myk--app">

    <div id="myk--app-header">
        <div id="myk--header-controls">
            <div @click="displayApp = !displayApp" togglediv="myk--app-container">O/I</div>
        </div>
    </div>

    <div v-if="displayApp" id="myk--app-container">
      <transition name="toast-fade">
        <div v-if="toast.visible" class="toast-notification" :class="'toast-' + toast.type">
          {{ toast.message }}
        </div>
      </transition>

      <img id="myk--bg-re-logo" src="https://cdn.prod.website-files.com/60781e1041c84501a6e9c2d8/60781e1041c8458cd8e9c348_rockestate-icon-white.svg"/>

      <div id="myk--app-selector-menu">

          <span class="myk--selector-buttons" :class="{ active: activeTab === 'Main' }" @click="activeTab = 'Main'">Main</span>
          <span class="myk--selector-buttons" :class="{ active: activeTab === 'References' }" @click="activeTab = 'References'">References</span>
          <span class="myk--selector-buttons" :class="{ active: activeTab === 'Settings' }" @click="activeTab = 'Settings'">Settings</span>

        </div>

      <div class="myk--tab-container" v-if="activeTab === 'Main'" >

        <template v-if="currentWindow != 'vs.rock.estate'" key="1">

          <div 
            class="myk--container-basics" 
            :style="{
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'end',
            }"
          >
            
            <span v-if="currentWindow.includes('immoweb')" class="myk--section-header">Listing Information:</span>
            
            <div class="myk--reference-info-command-box">
              <div class="myk--reference-info-command-button severity-info myk--button" @click="reloadCurrentListingData()">Reload</div> 
            </div>

          </div>
          
          <div class="myk--reference-info-table">
            <template v-for="(value, key, findex) in currentListing" :key="key">
              <div 
                v-if="!['uid','link'].includes(key)"
                class="myk--reference-info-table-line"
                :class="{ 'myk--ruler-bottom': findex < (Object.keys(currentListing).length - 1) }"
              >
                <span>{{ capitalize(key) }}:</span>
                <span v-if="!['note'].includes(key)" style="color: rgb(0, 24, 55)">{{ value }} {{ returnUnitMetric({key: [key]}) }}</span>
                <input v-if="['note'].includes(key)" type="text" placeholder="Additonal Notes" v-model="currentListing.note"/>
              </div>
            </template>
          </div>

          <div class="myk--reference-info-command-box">
            <div class="myk--reference-info-command-button myk--button icon-start severity-info" @click="copyObjectToClipboard([currentListing])">Clipboard</div>
            <div class="myk--reference-info-command-button myk--button severity-info" @click="addProperty(currentListing)">Add</div>
          </div>

        </template>

      </div>

    </div>
  </div>
</template>

<script setup>
// --- Imports ---
import { ref, reactive } from 'vue';
// composables
import { scrapImmowebData } from './composables/scrapImmowebData';
import { capitalize, returnUnitMetric, average, openLink } from './composables/utils';
import { useProperties } from './composables/useProperties';
import { useToast } from './composables/useToast';
import { useClipboard } from './composables/useClipboard';


// --- State and Methods Usage ---
// scraping immoweb
const { 
  currentListing, 
  currentWindow, 
  reloadCurrentListingData 
} = scrapImmowebData();

// property CRUD
const {
  addProperty
} = useProperties();

// toast
const { 
  toast, 
  showToast 
} = useToast();

// clipboard
const { 
  copyObjectToClipboard, 
  copySummaryStatistics 
} = useClipboard();

// --- UI State ---
const displayApp = ref(true);
const activeTab = ref('Main');

</script>

<style scoped>

</style>
