var hostname = window.location.host;

/* ######## INSTALL VUE  ########*/
(function () {
  // Check that vue-app isn't already injected
  if (document.getElementById('my-vue-app')) {
    console.log('Vue app already injected.');
    return;
  }

  // Define styles and inject into <head>
  const styles = `
    /* Text Color: #009CFF */

:root {
  --text-color: #009CFF;
  --secondary-color:#798DA6;
  --active-bg: rgb(204, 235.2, 255);
  --active-hover-bg: rgb(191, 225, 247);

}

@import url('https://fonts.cdnfonts.com/css/satoshi');

body {
  height: auto !important;
}

input {
  text-align: right;
}

.container--main-header{top: 25px !important;}
.classified__header{top: calc(3.75em + 25px) !important;}


#myk--app {
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Satoshi', sans-serif;
}

.myk--container-basics{
  margin: 5px 0;
}

.myk--container-basics_negative {
  background: #fff;
  border-radius: 6px;
  margin: 5px;
  border: 1px solid rgb(214, 226, 233);
  padding: 10px;
}

#myk--app-header {
    width: 100%;
    height: 25px;
    background-color: #fff;
    border-bottom: 1px solid #d6e2e9;
    color: var(--text-color);
}

#myk--app-container {
    position: absolute;
    right: 0;
    width: 450px;
    height: 700px;
    background: rgb(247, 249, 251);
    border-bottom: 1px solid #d6e2e9;
    box-shadow: 0 1px 5px #0003, 0 2px 2px #00000024, 0 3px 1px -2px #0000001f;
}

#myk--bg-re-logo{
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 55px;
  filter: invert(0.3) grayscale(1);
  z-index: 1;
}

#myk--app-selector-menu{
    display: flex;
    width: 100%;
    justify-content: space-between;

}
#myk--app-selector-menu>.myk--selector-buttons{
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 3);
    height: 50px;
    border-bottom: var(--text-color) 2px solid;
    cursor: pointer;
    font-weight: 600;
}

#myk--app-selector-menu>.myk--selector-buttons.active{
  background-color: var(--active-bg); /* Light green */
  color: var(--text-color);
}

.myk--selector-buttons:hover{
    background: #f7f9fb;
}

.myk--tab-container {
  padding: 15px;
  display:flex;
  position: relative;
  width: 100%;
  height: calc(100% - 75px);
  flex-direction: column;
  overflow-y: scroll;
  border-radius: 12px;
  z-index: 5000;

}

.myk--section-header{
  font-size: 16px;
  color: rgb(0, 24, 55);
  margin: 5px 0;
  font-weight: 600;
}

.myk--dropdown-reference-container{
  margin: 10px 0;
}

.myk--reference-bar{
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  background: #fff;
  border: 1px solid rgb(214, 226, 233);
}

.myk--reference-bar.active-reference{
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

.myk--within-bar-icon{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  font-size: 12px;
  color: var(--secondary-color);
}

.myk--within-bar-icon.icon-start{
  border-right: 1px solid rgb(214, 226, 233);
}

.myk--within-bar-icon.icon-last{
  border-left: 1px solid rgb(214, 226, 233);
}

.myk--reference-info{
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background: #fff;
  border: 1px solid rgb(214, 226, 233);
  border-top: 0;
  padding: 10px;
  font-size: 14px;
}


.myk--reference-info-command-box {
  display: flex;
  margin: 5px 0;
  border-radius: 6px;
  border: 1px solid rgb(214, 226, 233);
  width: max-content;
  overflow: hidden;
  width: max-content;
  overflow: hidden;
}
.myk--reference-info-command-button{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  font-size: 14px;
  background: #fff;
}

.myk--reference-info-command-button.icon-start{
  border-right: 1px solid rgb(214, 226, 233);
}

.myk--reference-info-command-button.icon-last{
  border-left: 1px solid rgb(214, 226, 233);
}

.myk--button{
  -webkit-user-select: none;
  cursor:pointer;
  user-select: none;
}

.myk--button:hover{
  background: #f7f9fb;
}

.myk--button.severity-info:hover, .myk--button.severity-info.active {
  color: rgb(14, 165, 233);
  background: rgb(246, 429, 255);
}

.myk--button.severity-danger:hover, .myk--button.severity-danger.active{
  color: rgb(239, 68, 68);
  background: rgb(254,242,242);
}

.myk--ruler-bottom{
  border-bottom: 1px solid rgb(214, 226, 233);
}

.myk--reference-info-table-line{
  margin: 3px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.myk--reference-info-table{
  margin: 5px 0;
  border-radius: 6px;
  border: 1px solid rgb(214, 226, 233);
  padding: 0 8px;
}

.toast-notification{
  position: absolute;
  bottom: 15px;
  left: 50%;
  width: max-content;
  transform: translateX(-50%);
  color: rgb(14, 165, 233);
  background: rgb(246, 429, 255);
  border: 1px solid rgb(127.5, 205.5, 255);
  padding: 5px 12px;
  border-radius: 50px;
  z-index: 10000;
}

.toast-info{
  color: rgb(14, 165, 233);
  background: rgb(246, 429, 255);
  border-color: rgb(14, 165, 233);
}

.toast-danger{
  color: rgb(239, 68, 68);
  background: rgb(254,242,242);
  border-color: rgb(239, 68, 68);
}

.myk--reference-info-command-box-container {
  display:flex;
  justify-content: space-between;
}

.myk--input-line{
  display: flex;
  justify-content: space-between;
  align-items: center;
}


  `;

  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  // Creating and injectin app target div (for the Vue App to mount on)
  const appContainer = document.createElement('div');
  appContainer.id = 'my-vue-app';
  appContainer.style.position = 'sticky';
  appContainer.style.top = '0';
  appContainer.style.zIndex = '10000';
  
  document.body.prepend(appContainer);


  // Vue App Component initialization and mounting
  function initializeVueApp() {
    // Creation / Initialization of the component
    const App = {
      
      template: `
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
          <div class="myk--container-basics" style="display: flex; justify-content: space-between;align-items: end;">
              <span class="myk--section-header">Current Tab: {{ pageHostname }}</span>
              <span v-if="pageHostname.includes('immoweb')" class="myk--section-header">Listing Information:</span>
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
         <template v-if="currentWindow == 'vs.rock.estate'">
            <div class="myk--reference-info-command-box">
              <div class="myk--reference-info-command-button severity-info myk--button" @click="reloadValuedPropertyInfo()">Reload</div> 
            </div>

            <div class="myk--reference-info-table">
              <template v-for="(value, key, findex) in basicPropertyInfo" :key="key">
                <div 
                  v-if="!['uid','link'].includes(key)"
                  class="myk--reference-info-table-line"
                  :class="{ 'myk--ruler-bottom': findex < (Object.keys(currentListing).length - 1) }"
                >
                  <span>{{ capitalize(key) }}:</span>
                  <span v-if="!['note'].includes(key)" style="color: rgb(0, 24, 55)">{{ value }} {{ returnUnitMetric({key: [key]}) }}</span>
                </div>
              </template>
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
                        <div class="myk--reference-info-command-button myk--button" @click="reference.isEdited = true">Edit</div>
                        <div class="myk--reference-info-command-button icon-last severity-info myk--button" @click="copyObjectToClipboard([reference])">Clipboard</div> 
                      </div>
                      <div class="myk--reference-info-command-box">
                        <div class="myk--reference-info-command-button severity-info myk--button" @click="openLink(reference.link)">Link</div> 
                      </div>
                      <div v-if="reference.isEdited" class="myk--reference-info-command-box">
                        <div class="myk--reference-info-command-button myk--button icon-start severity-danger" @click="getProperties();reference.isEdited = false;">Cancel</div>
                        <div class="myk--reference-info-command-button myk--button severity-info" @click="reference.isEdited = false;saveProperties(selectedProperties);">Save</div>
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
      `,

      
      data() {
        return {
          displayApp: true,
          pageHostname: '',
          currentListing: currentListing,
          activeTab: 'References',
          selectedProperties: [],
          expandedPropertyId: [],
          settings: {
            additionalTools: false,
            valType: 'Normal',
          },
          valuationMetrics: {
            dvmLA: 150
          },
          STORAGE_KEY: 'selectedProperties',
          SETTINGS_KEY: 'settingsMyk',
          toast: {
            visible: false,
            message: '',
            type: 'success', // can be 'success' or 'error'
            timeoutId: null
          },
          currentWindow: hostname,
          devianceArray: [],
          basicPropertyInfo: [],
        }
      },
      
      
      methods: {
        capitalize(str) {
          if (!str) return '';
          return str.charAt(0).toUpperCase() + str.slice(1);
        },
        returnUnitMetric(informationItem){
          var unitList = {
            advertisedPrice: "€",
            EPC: "kWh/m²",
            LA: "sqm",
            PSQM: "€/sqm"
          };
          if (unitList[informationItem.key]) {
            return unitList[informationItem.key];
          } else {
            return;
          }
        },
        triggerToast(message, type = '', duration = 3000) {
          if (this.toast.timeoutId) {
            clearTimeout(this.toast.timeoutId);
          }
          
          // Set the toast's properties
          this.toast.message = message;
          this.toast.type = type;
          this.toast.visible = true;
    
          // Set a timer to hide the toast after the duration
          this.toast.timeoutId = setTimeout(() => {
            this.toast.visible = false;
          }, duration);
        },
        handleSaveClick() {
          // You would call this after successfully saving a property
          this.triggerToast('Property saved successfully!', 'danger');
        },
        getSettings() {
          const settings = localStorage.getItem(this.SETTINGS_KEY);
          this.settings = settings ? JSON.parse(settings) : this.settings;
        },
        saveSettings(){
          localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(this.settings));
          this.triggerToast('Settings saved successfully!', 'info');
        },
        getProperties() {
          const properties = localStorage.getItem(this.STORAGE_KEY);
          // If no data exists, return an empty array to prevent errors.
          this.selectedProperties = properties ? JSON.parse(properties) : [];
        },
        saveProperties(properties) {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(properties));
          this.triggerToast('Property saved successfully!', 'info');
        },
        addProperty(property) {
          this.getProperties();
          var totalUIDs = this.selectedProperties.map(x => x.uid);
          if (!totalUIDs.includes(property.uid)) {
            this.selectedProperties.push(property);
          }

          this.saveProperties(this.selectedProperties);
        },
        removeProperty(propertyId) {
          this.getProperties();
          this.selectedProperties = this.selectedProperties.filter(p => p.uid !== propertyId);
          this.saveProperties(this.selectedProperties);
          console.log(`Property with id ${propertyId} removed.`);
          this.triggerToast(`Property with id ${propertyId} removed.`,'danger');
        },
        removeAllProperty() {
          this.selectedProperties = [];
          this.saveProperties(this.selectedProperties);
          this.triggerToast(`Properties removed.`,'danger');
        },
        toggleReferenceDetails(referenceUID) {
          if (this.expandedPropertyId === referenceUID) {
            // If the clicked item is already open, close it.
            this.expandedPropertyId = null;
          } else {
            // Otherwise, open the clicked item.
            this.expandedPropertyId = referenceUID;
          }
        },
        formatObjectForClipboard(data, index = null) {
          const formattedPrice = (Number(data.advertisedPrice) / 1000).toFixed(1).replace('.', ',') + 'k';
          
          const linkText = index !== null
            ? `Reference ${index}: ${data.link}` // <-- New format with index
            : `Link: ${data.link}`;

          const textToReturn = `${linkText}
EPC: ${data.EPC}, ${data.EPCLabel}
LA: ${data.LA}
CY: ${data.CY}
P: ${formattedPrice}
PSQM: ${data.PSQM}
Note: ${data.note}`;

          return textToReturn;

        },
        copyObjectToClipboard(data){
          //Step 1:
          // Set empty string to populate iteratively later on
          var textToCopy = ""
          
          //Iterate through each reference and populate textToCopy
          data.forEach((reference,index) => {

            const displayIndex = data.length > 1 ? index + 1 : null;

            let referenceText = this.formatObjectForClipboard(reference, displayIndex);
            textToCopy += (`

` + referenceText);
          });
          
        
          // Step 2: Use the Clipboard Function to copy the string
          navigator.clipboard.writeText(textToCopy).then(() => {
            // Success message
            console.log('Text copied to clipboard successfully!');
            this.triggerToast('Copied to clipboard', 'info');
          }).catch(err => {
            // Error message
            console.error('Failed to copy text: ', err);
            this.triggerToast('Failed to copy', 'success');
          });
        },
        // Summary Statistics
        copySummaryStatistics(sumStats, data = null){
          // Step 1:
          // Set empty string to populate itteratively later on
          var textToCopy = ""
          
          //Iterate through each reference and populate textToCopy
          if(data !== null){
            data.forEach((reference,index) => {

            const displayIndex = data.length > 1 ? index + 1 : null;

            let referenceText = this.formatObjectForClipboard(reference, displayIndex);
            textToCopy += (`

` + referenceText);
          });
          }
          
          // Step 2:
          // Iterate through the sumStats
          for (const [key, value] of Object.entries(sumStats)) {
            let sumStatsItemText = `${key}: ${value}`;
            textToCopy += (`

` + sumStatsItemText);
          };

          // Step 3: Use the Clipboard Function to copy the string
          navigator.clipboard.writeText(textToCopy).then(() => {
            // Success message
            console.log('Text copied to clipboard successfully!');
            this.triggerToast('Copied to clipboard', 'info');
          }).catch(err => {
            // Error message
            console.error('Failed to copy text: ', err);
            this.triggerToast('Failed to copy', 'success');
          });
        },
        average(properties, key = '') {
          const priceList = properties
            .map(x => parseFloat(x[key]))
            .filter(price => !Number.isNaN(price));

          if (priceList.length === 0) {
            return '0.00';
          }

          const sum = priceList.reduce((total, currentPrice) => total + currentPrice, 0);
          
          return (sum / priceList.length).toFixed(2);
        },
        openLink(link){
          window.open(link, '_blank', 'noopener,noreferrer');
        },
        reloadCurrentListingData() {
          console.log('reloading...');
          informationGathering();
          console.log(currentListing);
          this.currentListing = currentListing;
        },
        reloadValuedPropertyInfo() {
          getValuedPropertyDetails();
          this.devianceArray = devianceArray;
          this.basicPropertyInfo = basicPropertyInfo;
        }
      },
      computed: {
        dvmPrice(){
          const area = parseFloat(this.valuationMetrics.dvmLA) || 0;
          const psqm = parseFloat(this.valuationMetrics.dvmPSQM) || 0;
          
          return (area * psqm).toFixed(0); 
        },
        dvmConfidenceIntervalARG(){
          var lower = this.dvmPrice / 1.2;
          var upper = this.dvmPrice / 0.95;

          return {lower: lower.toFixed(0),upper: upper.toFixed(0)};
        },
        dvmConfidenceIntervalING(){
          var lower = this.dvmPrice / 1.1;
          var upper = this.dvmPrice / 0.9;

          return {lower: lower.toFixed(0),upper: upper.toFixed(0)};
        }
      },
      
      watch: {
        settings: {
          handler: 'saveSettings',
          deep: true
        }
      },

      created() {
        this.getProperties();
        this.getSettings();

      }
    };

    // Mounting of the component
    Vue.createApp(App).mount('#my-vue-app');
    console.log('Vue App Mounted Successfully!');
  }

  // Adding Vue CDN then executing the VueApp initialization
  const vueScript = document.createElement('script');
    // Use the production version of Vue 3
    vueScript.src = 'https://unpkg.com/vue@3/dist/vue.global.prod.js';
    
    // 5. CRITICAL STEP: Wait for the script to load, THEN initialize the app.
    vueScript.onload = initializeVueApp;
    
    // 6. Append the script to the page's <head> to start loading it.
    document.head.appendChild(vueScript);

})();


/* ######## PAGE INFORMATION GATHERING / LOGIC  ########*/

function classifyTableInformation(){
  var rows = document.getElementsByClassName('classified-table__row');
  console.log(rows);
  if(rows.length > 0) {
    
    Array.from(rows).forEach(row => {
      var tableInfoHeader = row.getElementsByClassName('classified-table__header')[0];
      var tableInfoValue = row.getElementsByClassName('classified-table__data')[0];
      if( tableInfoHeader != undefined && tableInfoValue != undefined) {
        tableInformation.push({header: tableInfoHeader.innerText, value: tableInfoValue.innerText});
      }
      
    });

    console.log("Pushed Table" + tableInformation);
  } else {
    console.log("coudn't spot rows");
  }
}

function callInfoByHeader(header){
  return tableInformation.find(item => item.header === header)?.value.split(' ')[0];
}

/* ######## APP LOGIC  ########*/

// -- Setup -- //
var currentListing = [];
var currentListings = [];
var tableInformation = [];

// -- Functions -- //

// Add Reference


/* ######## APP CODE EXECUTION  ########*/
// -- Information Gathering: Execution -- //

// information getter function for Immoweb (scraper)
function informationGathering() {
  classifyTableInformation();

  var price = document.getElementsByClassName('classified__price')[0].getElementsByClassName('sr-only')[0].innerText.split('€')[0];
    
  console.log(tableInformation);


  // Creating Current Listing Object
  var advertisedPrice = price;
  var PSQM = Math.round(price / parseFloat(callInfoByHeader("Living area")));
  var LA = callInfoByHeader("Living area");
  var EPC = callInfoByHeader("Primary energy consumption");
  var EPCLabel = callInfoByHeader("Energy class");
  var CY = callInfoByHeader("Construction year");
  var uid = window.location.pathname.split('/').at(-1);
  var link = window.location.href;


  currentListing = {
    uid: uid,
    link: link,
    advertisedPrice: advertisedPrice,
    PSQM: PSQM,
    LA: LA,
    EPC: EPC,
    EPCLabel: EPCLabel,
    CY: CY,
    note: ""
  };

  console.log(currentListing);
}




/* ####################################### */

// In the case of the VS Tool
//setup
var devianceArray = [];
var basicPropertyInfo = [];

// getter function
function getValuedPropertyDetails(){
  Array.from(document.getElementsByClassName('q-gutter-y-xs')[2].getElementsByClassName('row')).forEach(row => {
      basicPropertyInfo.push(row.getElementsByTagName('span')[0].innerText + " " + row.getElementsByTagName('span')[1].innerText);
  });

  devianceArray = Array.from(document.querySelectorAll('[role="listitem"]')).filter(el => el.textContent.includes('%='));

  console.log(basicPropertyInfo);
  console.log(devianceArray);
}

if (window.location.host == "vs.rock.estate") {
} else {
  informationGathering();
}
