<template>
    <div id="myk--app-selector-menu">
        <span 
            v-for="tab in tabs" 
            @click="switchTab(tab)" 
            :class="['myk--selector-buttons', { active: activeTab === tab}]"
        >
            {{ tab }}
        </span>
    </div>
</template>

<script setup>
defineProps({
    tabs: {
        type: Array,
        default: () => ['Main', 'References', 'Settings']
    }
})

const activeTab = defineModel({ 
    type: String, 
    default: 'Main' 
})

function switchTab(tab) {
    activeTab.value = tab;
}
</script>