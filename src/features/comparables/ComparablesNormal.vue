<template>
    <BasicContainer>
      <template #header>Reference Table</template>
      <template #main>
        <ReferenceTable :store="propertyStore"></ReferenceTable>
      </template>
    </BasicContainer>
    
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

<script setup>
// Imports
// Components
import BasicContainer from '../../components/atoms/BasicContainer.vue';
import ValuationCalculator from '../../components/organisms/ValuationCalculator.vue';
import InformationTable from '../../components/molecules/InformationTable.vue';
import BaseButton from '../../components/atoms/BaseButton.vue';
import ButtonGroup from '../../components/molecules/ButtonGroup.vue';
import ReferenceTable from '../../components/organisms/ReferenceTable.vue';

// Composables
import { useClipboard } from '../../composables/useClipboard';
const { copySummaryStatistics } = useClipboard();

// Stores
import { usePropertyStore } from '../../stores/properties';
const propertyStore = usePropertyStore()

</script>