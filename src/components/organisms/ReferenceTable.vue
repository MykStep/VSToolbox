<template>
    <div class="vstb--reference-table">

        <template v-for="(reference, index) in store.savedProperties">
            <ToggleCard :collapsed="reference.uid != expandedPropertyId" @clicked="toggleReferenceDetails(reference.uid)">
                
              <!-- Item Bar -->
                <template #start>{{ index + 1 }}</template>
                <template #bar>{{ reference.advertisedPrice }} {{ reference.hasVAT ? '' : '(excl. VAT)' }}</template>
                <template #end>{{ toggled ? '▲' : '▼' }}</template>
              <!-- Collapsed info below -->
                <template #content>
                    <InformationTable size="small" :data="reference" :omitObjectItems="['uid','link','isEdited','hasVAT']" :editMode="reference.isEdited"></InformationTable>
                </template>
                <template #actionbar>
                    <ButtonGroup>
                      <BaseButton severity="danger" @click="store.removeProperty(reference.uid)">Delete</BaseButton>
                      <BaseButton @click="handleEditMode(reference.uid)">Edit</BaseButton>
                      <BaseButton severity="info" @click="copyObjectToClipboard([reference])">Clipboard</BaseButton>
                    </ButtonGroup>

                    <BaseButton severity="info" @click="openLink(reference.link)">Link</BaseButton>
                </template>

            </ToggleCard>
        </template>
        <ButtonGroup v-if="store.savedProperties != 0">
            <BaseButton severity="danger" @click="store.removeAllProperty()">Delete All</BaseButton>
            <BaseButton severity="info" @click="copyObjectToClipboard(store.savedProperties)">Clipboard</BaseButton>
        </ButtonGroup>
    </div>
</template>

<script setup>
import ToggleCard from '../molecules/ToggleCard.vue';
import InformationTable from '../molecules/InformationTable.vue';
import ButtonGroup from '../molecules/ButtonGroup.vue';
import BaseButton from '../atoms/BaseButton.vue';


import { ref } from 'vue';
import { openLink } from '../../composables/utils';
import { useClipboard } from '../../composables/useClipboard';

const expandedPropertyId = ref(null);

const { 
  copyObjectToClipboard, 
  copySummaryStatistics 
} = useClipboard();

const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  store: {
    type: Object,
    required: true
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
  let reference = props.store.savedProperties.find(i => i.uid == referenceUID);
  
  reference.isEdited = !reference.isEdited;
  props.store.save();
}
</script>