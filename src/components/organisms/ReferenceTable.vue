<template>
    <div class="vstb--reference-table">

        <template v-for="(reference, index) in propertyStore.savedProperties">
            <ToggleCard :collapsed="reference.uid != expandedPropertyId" @clicked="toggleReferenceDetails(reference.uid)">
                
              <!-- Item Bar -->
                <template #start>{{ index + 1 }}</template>
                <template #bar>{{ reference.advertisedPrice }}</template>
                <template #end>{{ toggled ? '▲' : '▼' }}</template>
              <!-- Collapsed info below -->
                <template #content>
                    <InformationTable size="small" :data="reference" :omitObjectItems="['uid','link','isEdited']" :editMode="reference.isEdited"></InformationTable>
                </template>
                <template #actionbar>
                    <ButtonGroup>
                      <BaseButton severity="danger" @click="propertyStore.removeProperty(reference.uid)">Delete</BaseButton>
                      <BaseButton @click="handleEditMode(reference.uid)">Edit</BaseButton>
                      <BaseButton severity="info" @click="copyObjectToClipboard([reference])">Clipboard</BaseButton>
                    </ButtonGroup>

                    <BaseButton severity="info" @click="openLink(reference.link)">Link</BaseButton>
                </template>

            </ToggleCard>
        </template>

        <ButtonGroup v-if="propertyStore.savedProperties != 0">
            <BaseButton severity="danger" @click="propertyStore.removeAllProperty()">Delete All</BaseButton>
            <BaseButton severity="info" @click="copyObjectToClipboard(propertyStore.savedProperties)">Clipboard</BaseButton>
        </ButtonGroup>
        
    </div>
</template>

<script setup>
import ToggleCard from '../molecules/ToggleCard.vue';
import InformationTable from '../molecules/InformationTable.vue';
import ButtonGroup from '../molecules/ButtonGroup.vue';
import BaseButton from '../atoms/BaseButton.vue';

import { usePropertyStore } from '../../stores/properties';
import { ref } from 'vue';
import { openLink } from '../../composables/utils';
import { useClipboard } from '../../composables/useClipboard';

const expandedPropertyId = ref(null);
const propertyStore = usePropertyStore();

const { 
  copyObjectToClipboard, 
  copySummaryStatistics 
} = useClipboard();

defineProps({
  data: {
    type: Array,
    default: []
  }
});

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