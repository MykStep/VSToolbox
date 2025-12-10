<template > 
   <div class="vstb--information-table-table-item" v-if="editMode || !String(itemData.value).includes('NaN')">
      <span>{{ capitalize(itemData.key) }}:</span>
      <span v-if="!editMode" style="color: rgb(0, 24, 55)">{{ itemData.value }} {{ returnUnitMetric({key: [itemData.key]}) }}</span>
      <input v-if="editMode" type="text" placeholder="Additonal Notes" v-model="model"/>
    </div>
</template>

<script setup>
import { capitalize, returnUnitMetric } from '../../composables/utils';

defineProps({
  editMode: {
    type: Boolean,
    default: false
  },
  itemData: {
    type: Object,
    default: {}
  }
});

const model = defineModel();
</script>