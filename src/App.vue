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

      <div class="myk--tab-container" v-if="activeTab === 'References'" >
        <div v-if="settings.additionalTools" class="myk--container-basics">
          <span class="myk--section-header">Valuation Type</span>
          <div class="myk--reference-info-command-box">
            <div class="myk--reference-info-command-button myk--button icon-start severity-info"  :class="{ active: settings.valType === 'Normal' }" @click="settings.valType = 'Normal'">Normal</div>
            <div class="myk--reference-info-command-button myk--button severity-info"  :class="{ active: settings.valType === 'New Construction' }" @click="settings.valType = 'New Construction'">New Construction</div>
          </div>
        </div>
        
        <template v-if="settings.valType == 'Normal' || !settings.additionalTools">
          <div class="myk--container-basics">
            <span class="myk--section-header">Reference Table</span>
            <div id="myk--dropdown-reference-table-container" class="myk--container-basics">
              <div :key="reference.uid" v-for="(reference, index) in selectedProperties" class="myk--dropdown-reference-container">
                <div class="myk--reference-bar myk--button" :class="{ 'active-reference': expandedPropertyId === reference.uid }" @click="toggleReferenceDetails(reference.uid)">
                  <div class="myk--within-bar-icon icon-start" style="font-weight: 600;">{{ index + 1 }}</div>
                  <span>{{ reference.advertisedPrice }}</span>
                  <div class="myk--within-bar-icon icon-last">{{ expandedPropertyId === reference.uid ? '▲' : '▼' }}</div>
                </div>
                <div class="myk--reference-info" v-if="expandedPropertyId === reference.uid">
                  <div class="myk--reference-info-table">
                    
                      <template v-for="(value, key, findex) in reference" :key="key">
                        <div 
                          v-if="!['uid','isEdited','link'].includes(key)"
                          class="myk--reference-info-table-line"
                          :class="{ 'myk--ruler-bottom': findex < (Object.keys(reference).length - 1) }"
                        >
                          <span>{{ capitalize(key) }}:</span>
                          <span v-if="!reference.isEdited" style="color: rgb(0, 24, 55); max-width: 80%;text-align:right;">{{ value }} {{ returnUnitMetric({key: [key]}) }}</span>
                          <input v-if="reference.isEdited" type="text" v-model="reference[key]"/> 
                        </div>
                      </template>
                    
                  </div>
                  <div class="myk--reference-info-command-box-container">
                    <div class="myk--reference-info-command-box">
                      <div class="myk--reference-info-command-button icon-start severity-danger myk--button" @click="removeProperty(reference.uid)">Delete</div>
                      <div class="myk--reference-info-command-button myk--button" @click="reference.isEdited = !reference.isEdited">Edit</div>
                      <div class="myk--reference-info-command-button icon-last severity-info myk--button" @click="copyObjectToClipboard([reference])">Clipboard</div> 
                    </div>
                    <div class="myk--reference-info-command-box">
                      <div class="myk--reference-info-command-button severity-info myk--button" @click="openLink(reference.link)">Link</div> 
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
            <div v-if="selectedProperties != 0" class="myk--reference-info-command-box">
              <div class="myk--reference-info-command-button myk--button icon-start severity-danger" @click="removeAllProperty()">Delete All</div>
              <div class="myk--reference-info-command-button myk--button severity-info" @click="copyObjectToClipboard(selectedProperties)">Clipboard</div>
            </div>
          </div>

          <div class="myk--container-basics">
            <span class="myk--section-header">Summary Stastics</span>
            <div class="myk--container-basics_negative">
              <div class="myk--reference-info-table-line myk--ruler-bottom">
                <span>PSQM: </span><span style="color: rgb(0, 24, 55)">{{ average(selectedProperties, 'PSQM') }} {{ returnUnitMetric({key: 'PSQM'}) }}</span>
              </div>
              <div class="myk--reference-info-table-line">
                <span>Price: </span><span style="color: rgb(0, 24, 55)">{{ average(selectedProperties, 'advertisedPrice') }} {{ returnUnitMetric({key: 'advertisedPrice'}) }}</span>
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
            <div v-if="average(selectedProperties, 'PSQM') != 0" class="myk--reference-info-command-box">
              <div class="myk--reference-info-command-button myk--button icon-start severity-info" @click="copySummaryStatistics()">Copy Statistics</div>
              <div class="myk--reference-info-command-button myk--button severity-info" @click="copySummaryStatistics(sumStats = {'PSQM Average':  average(selectedProperties, 'PSQM') + returnUnitMetric({key: 'PSQM'})},selectedProperties)">Clipboard All</div>
            </div>
          </div>
        </template>
        
        <template v-if="settings.valType == 'New Construction' && settings.additionalTools">
        Still under construction... 🥁
        </template>
      
      </div>

      <div class="myk--tab-container" v-if="activeTab === 'Settings'">
        <div class="myk--input-line">
          <span>Toggle Extra Valuation Tools</span>
          <input type="checkbox" v-model="settings.additionalTools" />
        </div>
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
import { useValuation } from './composables/useValuation';
import { useLocalStorage } from './composables/useLocalStorage';


// --- State and Methods Usage ---
// scraping immoweb
const { 
  currentListing, 
  currentWindow, 
  reloadCurrentListingData 
} = scrapImmowebData();

// property CRUD
const {
  selectedProperties,
  addProperty,
  removeProperty,
  removeAllProperty
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

// Valuation
const { 
  valuationMetrics, 
  dvmPrice, 
  dvmConfidenceIntervalARG, 
  dvmConfidenceIntervalING 
} = useValuation();

// settings
const settings = useLocalStorage('settingsMyk', {
  additionalTools: false,
  valType: 'Normal',
});

// --- UI State ---
const displayApp = ref(true);
const activeTab = ref('Main');
const expandedPropertyId = ref(null);

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

</script>

<style scoped>

</style>
