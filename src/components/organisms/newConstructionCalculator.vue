<template>
    <ToggleCard :collapsed="collapsed || false" @clicked="collapsed = !collapsed">
        <template #start>🏠</template>
        <template #bar>Property Information</template>
        <template #end>{{ !collapsed ? '▲' : '▼' }}</template>
        <template #content>
            <InformationTable>
                <TableItem :itemData="{key: 'Construction Cost', value: newConstructionsStore.CC}" editMode="true" v-model="newConstructionsStore.CC"></TableItem>
                <TableItem :itemData="{key: 'Land Cost', value: newConstructionsStore.PC}" editMode="true" v-model="newConstructionsStore.PC"></TableItem>
                <TableItem :itemData="{key: 'VAT', value: newConstructionsStore.VAT}"></TableItem>
            </InformationTable>
            <InformationTable>
                <TableItem :itemData="{key: 'Living Area', value: newConstructionsStore.LA}" editMode="true" v-model="newConstructionsStore.LA"></TableItem>
                <TableItem :itemData="{key: 'PSQM', value: newConstructionsStore.PSQM}" editMode="true" v-model="newConstructionsStore.PSQM"></TableItem>
            </InformationTable>
        </template>
    </ToggleCard>

    <InformationTable>
        <TableItem :itemData="{key: 'Ground Portion', value: newConstructionsStore.groundPortion.formatted}"></TableItem>
    </InformationTable>

    <InformationTable>
        <TableItem :itemData="{key: 'Construction Method', value: newConstructionsStore.valuationCM.formatted}"></TableItem>
        <TableItem :itemData="{key: 'Market Method', value: newConstructionsStore.valuationMM.formatted}"></TableItem>
        <TableItem :itemData="{key: 'Valuation (Average)', value: newConstructionsStore.valuationFinal.formatted}"></TableItem>
    </InformationTable>

</template>

<script setup>
// Imports
import { computed, ref } from 'vue';

// Components
import InformationTable from '../molecules/InformationTable.vue';
import TableItem from '../atoms/TableItem.vue';
import ToggleCard from '../molecules/ToggleCard.vue';


// Stores
import { useNewConstructionsStore } from '../../stores/newConstructions';
const newConstructionsStore = useNewConstructionsStore();
const collapsed = ref(true);





</script>