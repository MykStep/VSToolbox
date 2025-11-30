<template>
    <div :class="['vstb--information-table', size ]">
        <template v-for="(value, key, index) in data" :key="key">
            <TableItem v-if="!omitObjectItems.includes(key)" :itemData="{value: value, key: key, index: index}" :editMode="editMode" v-model="data[key]">
            </TableItem>
        </template>
        <slot></slot>
    </div>
</template>

<script setup>
import TableItem from '../atoms/TableItem.vue';

defineProps({
  data: {
    type: Object,
    default: {}
  },
  editMode: {
    type: Boolean,
    default: false
  },
  omitObjectItems: {
    type: Array,
    default: []
  },
  size: {
    type: String,
    default: 'large'
  }
});
</script>