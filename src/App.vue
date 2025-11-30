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

            <BaseButton severity="info" @click="listingStore.reloadCurrentListingData()">Reload</BaseButton>

          </div>
          
          <InformationTable :data="omitObjectItems(currentListing, ['uid','link','isEdited','note'])">
            <TableItem :editMode="true" :itemData="{key: 'note', value: currentListing.note}" v-model="currentListing.note" ></TableItem>
          </InformationTable>

          <ButtonGroup>
            <BaseButton severity="info" @click="copyObjectToClipboard([currentListing])">Clipboard</BaseButton>
            <BaseButton severity="info" @click="propertyStore.addProperty(currentListing)">Add</BaseButton>
          </ButtonGroup>

        </template>

      </div>

      <div class="myk--tab-container" v-if="activeTab === 'References'" >
        <div v-if="settingsStore.settings.additionalTools" class="myk--container-basics">
          <span class="myk--section-header">Valuation Type</span>
          <div class="myk--reference-info-command-box">
            <div class="myk--reference-info-command-button myk--button icon-start severity-info"  :class="{ active: settingsStore.settings.valType === 'Normal' }" @click="settingsStore.settings.valType = 'Normal'">Normal</div>
            <div class="myk--reference-info-command-button myk--button severity-info"  :class="{ active: settingsStore.settings.valType === 'New Construction' }" @click="settingsStore.settings.valType = 'New Construction'">New Construction</div>
          </div>
        </div>
        
        <template v-if="settingsStore.settings.valType == 'Normal' || !settingsStore.settings.additionalTools">
          <div class="myk--container-basics">
            <span class="myk--section-header">Reference Table</span>
            <div id="myk--dropdown-reference-table-container" class="myk--container-basics">
              <div :key="reference.uid" v-for="(reference, index) in propertyStore.savedProperties" class="myk--dropdown-reference-container">
                <div class="myk--reference-bar myk--button" :class="{ 'active-reference': expandedPropertyId === reference.uid }" @click="toggleReferenceDetails(reference.uid)">
                  <div class="myk--within-bar-icon icon-start" style="font-weight: 600;">{{ index + 1 }}</div>
                  <span>{{ reference.advertisedPrice }}</span>
                  <div class="myk--within-bar-icon icon-last">{{ expandedPropertyId === reference.uid ? '▲' : '▼' }}</div>
                </div>
                <div class="myk--reference-info" v-if="expandedPropertyId === reference.uid">

                  <InformationTable :data="reference" :omitObjectItems="['uid','link','isEdited']" :editMode="reference.isEdited">

                  </InformationTable>

                  <div class="myk--reference-info-command-box-container">
                    <ButtonGroup>
                      <BaseButton severity="danger" @click="propertyStore.removeProperty(reference.uid)">Delete</BaseButton>
                      <BaseButton @click="handleEditMode(reference.uid)">Edit</BaseButton>
                      <BaseButton severity="info" @click="copyObjectToClipboard([reference])">Clipboard</BaseButton>
                    </ButtonGroup>

                    <BaseButton severity="info" @click="openLink(reference.link)">Link</BaseButton>
                  </div>
                  
                </div>
              </div>
            </div>

            <ButtonGroup v-if="propertyStore.savedProperties != 0">
              <BaseButton severity="danger" @click="propertyStore.removeAllProperty()">Delete All</BaseButton>
              <BaseButton severity="info" @click="copyObjectToClipboard(propertyStore.savedProperties)">Clipboard</BaseButton>
            </ButtonGroup>
            
          </div>

          <div class="myk--container-basics">
            <span class="myk--section-header">Summary Stastics</span>
            <div class="myk--container-basics_negative">
              <div class="myk--reference-info-table-line myk--ruler-bottom">
                <span>PSQM: </span><span style="color: rgb(0, 24, 55)">{{ propertyStore.averagePSQM.formatted }}</span>
              </div>
              <div class="myk--reference-info-table-line">
                <span>Price: </span><span style="color: rgb(0, 24, 55)">{{ propertyStore.averagePrice.formatted }}</span>
              </div>
            </div>
            <div class="myk--container-basics_negative">  
              <div class="myk--reference-info-table-line">
                <span>Living area: </span><input type="text" v-model="valuationMetrics.dvmLA">
              </div>  
              <div class="myk--reference-info-table-line">  
                <span>PSQM Correction: </span><input type="text" v-model="valuationMetrics.dvmPSQM">
              </div>  
              <div class="myk--reference-info-table-line">
                <span>Valuation: </span><span style="color: rgb(0, 24, 55)">{{ dvmPrice }} {{ returnUnitMetric({key: 'advertisedPrice'}) }}</span>
              </div>
              <div class="myk--reference-info-table-line">
                <span>Confidence Interval ARG: </span><span style="color: rgb(0, 24, 55)">[ {{ dvmConfidenceIntervalARG.lower }} ; {{ dvmConfidenceIntervalARG.upper }} ]</span>
              </div>
              <div class="myk--reference-info-table-line">
                <span>Confidence Interval ING: </span><span style="color: rgb(0, 24, 55)">[ {{ dvmConfidenceIntervalING.lower }} ; {{ dvmConfidenceIntervalING.upper }} ]</span>
              </div>
            </div>

            <ButtonGroup>
              <BaseButton severity="info" @click="copySummaryStatistics()">Copy Statistics</BaseButton>
              <BaseButton severity="info" @click="copySummaryStatistics(sumStats = {'PSQM Average':  propertyStore.averagePSQM.formatted},propertyStore.savedProperties)">Clipboard All</BaseButton>
            </ButtonGroup>

          </div>
        </template>
        
        <template v-if="settingsStore.settings.valType == 'New Construction' && settingsStore.settings.additionalTools">
        Still under construction... 🥁
        </template>
      
      </div>

      <div class="myk--tab-container" v-if="activeTab === 'Settings'">
        <div class="myk--input-line">
          <span>Toggle Extra Valuation Tools</span>
          <input type="checkbox" v-model="settingsStore.settings.additionalTools" />
        </div>
        {{ settingsStore.settings }}
      </div>

    </div>
  </div>
</template>

<script setup>
// Imports of components
import BaseButton from './components/atoms/BaseButton.vue';
import ButtonGroup from './components/molecules/ButtonGroup.vue';
import InformationTable from './components/molecules/InformationTable.vue';
import TableItem from './components/atoms/TableItem.vue';


// --- Imports ---
import { ref, watch, onMounted } from 'vue';

// composables
import { capitalize, returnUnitMetric, omitObjectItems, openLink } from './composables/utils';

import { useToast } from './composables/useToast';
import { useClipboard } from './composables/useClipboard';
import { useValuation } from './composables/useValuation';

import { storeToRefs } from 'pinia'
import { useListingStore } from './stores/listing.js';
import { usePropertyStore } from './stores/properties';
import { useSettingsStore } from './stores/settings';


// Stores
const listingStore = useListingStore();
const propertyStore = usePropertyStore();
const settingsStore = useSettingsStore();

const { currentListing } = storeToRefs(listingStore);

const { settings } = storeToRefs(settingsStore);

watch( settings, (newSettings) => {
  settingsStore.save();
}, {deep: true} );

// Services
// TODO: create a wrapper function that routes towards the correct scraper

onMounted(() => {
  listingStore.reloadCurrentListingData();
})

// --- State and Methods Usage ---

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

// Valuation
const { 
  valuationMetrics, 
  dvmPrice, 
  dvmConfidenceIntervalARG, 
  dvmConfidenceIntervalING 
} = useValuation();



// --- UI State ---
const displayApp = ref(true);
const activeTab = ref('References');
const expandedPropertyId = ref(null);
const currentWindow = ref(window.location.hostname);

// -- App Logic ---
function toggleReferenceDetails(referenceUID) {
  if (expandedPropertyId.value === referenceUID) {
    // If the clicked item is already open, close it.
    expandedPropertyId.value = null;
  } else {
    // Otherwise, open the clicked item.
    expandedPropertyId.value = referenceUID;
  }
}

function handleEditMode(referenceUID) {
  propertyStore.savedProperties.find(i => i.uid == referenceUID).isEdited = !propertyStore.savedProperties.find(i => i.uid == referenceUID).isEdited;
  propertyStore.save();
}

</script>