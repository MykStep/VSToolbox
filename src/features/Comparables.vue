<template>
    <BasicContainer v-if="settingsStore.settings.additionalTools">
          <template #header>Valuation Type</template>
          <template #main>
            <ButtonGroup>
              <BaseButton severity="info" :active="settingsStore.settings.valType === 'Normal'" @click="settingsStore.settings.valType = 'Normal'">Normal</BaseButton>
              <BaseButton severity="info" :active="settingsStore.settings.valType === 'New Construction'" @click="settingsStore.settings.valType = 'New Construction'">New Construction</BaseButton>
            </ButtonGroup>
          </template>
        </BasicContainer>

        <BasicContainer v-if="settingsStore.settings.valType == 'Normal' || !settingsStore.settings.additionalTools">
          <template #header>Reference Table</template>
          <template #main>
            <ReferenceTable></ReferenceTable>
          </template>
        </BasicContainer>
        
        <template v-if="settingsStore.settings.valType == 'Normal' || !settingsStore.settings.additionalTools">
          <BasicContainer>
            <template #header>Summary Stastics</template>
            <template #main>
              <InformationTable :data="{pSQM: propertyStore.averagePSQM.formatted, price: propertyStore.averagePrice.formatted}"></InformationTable>
              <ValuationCalculator>
                <template #actionbar>
                    <ButtonGroup>
                      <BaseButton severity="info" @click="copySummaryStatistics()">Copy Statistics</BaseButton>
                      <BaseButton severity="info" @click="copySummaryStatistics(sumStats = {'PSQM Average':  propertyStore.averagePSQM.formatted},propertyStore.savedProperties)">Clipboard All</BaseButton>
                    </ButtonGroup>
                </template>
              </ValuationCalculator>
            </template>
          </BasicContainer>
        </template>
        
        <template v-if="settingsStore.settings.valType == 'New Construction' && settingsStore.settings.additionalTools">
        Still under construction... 🥁
        </template>
</template>

<script setup>
// Imports
// Components
import BasicContainer from '../components/atoms/BasicContainer.vue';
import ButtonGroup from '../components/molecules/ButtonGroup.vue';
import BaseButton from '../components/atoms/BaseButton.vue';
import ReferenceTable from '../components/organisms/ReferenceTable.vue';
import InformationTable from '../components/molecules/InformationTable.vue';
import ValuationCalculator from '../components/organisms/ValuationCalculator.vue';

// Stores
import { useSettingsStore } from '../stores/settings';
import { usePropertyStore } from '../stores/properties';

const settingsStore = useSettingsStore()
const propertyStore = usePropertyStore()

// Composables
import { useClipboard } from '../composables/useClipboard';

const { copySummaryStatistics } = useClipboard();

</script>