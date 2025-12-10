<template>
    <BasicContainer>
      <template #header>Reference Table</template>
      <template #main>
        <ReferenceTable :store="newConstructionsStore"></ReferenceTable>
      </template>
    </BasicContainer>

    <BasicContainer>
      <template #header>Summary Statistics</template>
      <template #main>
        <div class="vtsb--conditional-two-col">
          <InformationTable :data="{pSQM: newConstructionsStore.averagePSQM.formatted, price: newConstructionsStore.averagePrice.formatted}"></InformationTable>
          <InformationTable :data="{pSQM: newConstructionsStore.averagePSQMInclVAT.formatted, price: newConstructionsStore.averagePriceInclVAT.formatted}"></InformationTable>
        </div>
        <newConstructionCalculator></newConstructionCalculator>
      </template>
    </BasicContainer>
</template>

<script setup>
// Imports
// Components
import BasicContainer from '../../components/atoms/BasicContainer.vue';
import ReferenceTable from '../../components/organisms/ReferenceTable.vue';
import newConstructionCalculator from '../../components/organisms/newConstructionCalculator.vue';
import InformationTable from '../../components/molecules/InformationTable.vue';

// Stores
import { useNewConstructionsStore } from '../../stores/newConstructions';
const newConstructionsStore = useNewConstructionsStore();

</script>