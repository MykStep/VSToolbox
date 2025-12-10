<template>
    <BasicContainer>
        <template #header>
            Listing Information
            <BaseButton severity="info" @click="listingStore.reloadCurrentListingData()">Reload</BaseButton>
        </template>
        <template #main>
            <InformationTable :data="omitObjectItems(listingStore.filteredData, ['note'])">
            <TableItem :editMode="true" :itemData="{key: 'note', value: currentListing.note}" v-model="currentListing.note" ></TableItem>
            </InformationTable>

            <ButtonGroup>
            <BaseButton severity="info" @click="copyObjectToClipboard([currentListing])">Clipboard</BaseButton>
            <BaseButton 
                v-if="settingsStore.settings.valType == 'Normal' || !settingsStore.settings.additionalTools" 
                severity="info" 
                @click="propertyStore.addProperty(listingStore.validData)"
            >
                Add
            </BaseButton>
            <BaseButton 
                v-else 
                severity="info" 
                @click="newConstructionsStore.addProperty(listingStore.validData)"
                >
                Add
            </BaseButton>
            </ButtonGroup>
        </template>
    </BasicContainer>
</template>

<script setup>
// Imports
import { storeToRefs } from 'pinia'

// Components
import BasicContainer from '../components/atoms/BasicContainer.vue';
import ButtonGroup from '../components/molecules/ButtonGroup.vue';
import BaseButton from '../components/atoms/BaseButton.vue';
import InformationTable from '../components/molecules/InformationTable.vue';
import TableItem from '../components/atoms/TableItem.vue';

// Composables
import { useClipboard } from '../composables/useClipboard';
import { omitObjectItems } from '../composables/utils.js';

const { 
  copyObjectToClipboard
} = useClipboard();

// Stores
import { useListingStore } from '../stores/listing.js';
import { usePropertyStore } from '../stores/properties';
import { useSettingsStore } from '../stores/settings';
import { useNewConstructionsStore } from '../stores/newConstructions.js';


const listingStore = useListingStore();
const { currentListing } = storeToRefs(listingStore);

const propertyStore = usePropertyStore();
const settingsStore = useSettingsStore();
const newConstructionsStore = useNewConstructionsStore();

</script>