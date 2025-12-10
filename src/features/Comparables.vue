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
   
  <template v-if="settingsStore.settings.valType == 'Normal' || !settingsStore.settings.additionalTools">
    <ComparablesNormal></ComparablesNormal>
  </template>
  
  <template v-if="settingsStore.settings.valType == 'New Construction' && settingsStore.settings.additionalTools">
    <ComparablesNewConstructions></ComparablesNewConstructions>
  </template>
</template>

<script setup>
// Imports
// Components
import BasicContainer from '../components/atoms/BasicContainer.vue';
import ButtonGroup from '../components/molecules/ButtonGroup.vue';
import BaseButton from '../components/atoms/BaseButton.vue';
import ComparablesNormal from './comparables/ComparablesNormal.vue';
import ComparablesNewConstructions from './comparables/ComparablesNewConstructions.vue';

// Stores
import { useSettingsStore } from '../stores/settings';

const settingsStore = useSettingsStore()


</script>