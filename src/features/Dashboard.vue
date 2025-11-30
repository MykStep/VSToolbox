<template>
    <BasicContainer>
        <template #header>
            Listing Information
            <BaseButton severity="info" @click="listingStore.reloadCurrentListingData()">Reload</BaseButton>
        </template>
        <template #main>
            <InformationTable :data="omitObjectItems(currentListing, ['uid','link','isEdited','note'])">
            <TableItem :editMode="true" :itemData="{key: 'note', value: currentListing.note}" v-model="currentListing.note" ></TableItem>
            </InformationTable>

            <ButtonGroup>
            <BaseButton severity="info" @click="copyObjectToClipboard([currentListing])">Clipboard</BaseButton>
            <BaseButton severity="info" @click="propertyStore.addProperty(currentListing)">Add</BaseButton>
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
import { omitObjectItems } from '../composables/utils';
import { useClipboard } from '../composables/useClipboard';

const { 
  copyObjectToClipboard
} = useClipboard();

// Stores
import { useListingStore } from '../stores/listing.js';
import { usePropertyStore } from '../stores/properties';

const listingStore = useListingStore();
const { currentListing } = storeToRefs(listingStore);

const propertyStore = usePropertyStore();

</script>