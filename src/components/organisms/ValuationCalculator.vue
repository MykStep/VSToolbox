<template>
    <InformationTable>
        <TableItem :itemData="{key: 'Living Area', value: valuationMetrics.dvmLA}" editMode="true" v-model="valuationMetrics.dvmLA"></TableItem>
        <TableItem :itemData="{key: 'PSQM Correction', value: valuationMetrics.dvmPSQM}" editMode="true" v-model="valuationMetrics.dvmPSQM"></TableItem>
        <TableItem :itemData="{key: 'Valuation', value: dvmPrice}"></TableItem>
        <TableItem :itemData="{key: 'Confidence Interval ARG', value: dvmConfidenceIntervalARG}"></TableItem>
        <TableItem :itemData="{key: 'Confidence Interval ING', value: dvmConfidenceIntervalING}"></TableItem>
    </InformationTable>
    <div class="vtsb--toggle-card-action-bar">
        <slot name="actionbar"></slot>
    </div>
</template>

<script setup>
import InformationTable from '../molecules/InformationTable.vue';
import TableItem from '../atoms/TableItem.vue';
import { useValuation } from '../../composables/useValuation';


const { 
  valuationMetrics, 
  dvmPrice, 
  dvmConfidenceIntervalARG, 
  dvmConfidenceIntervalING 
} = useValuation();



</script>