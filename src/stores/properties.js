import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useToast } from '../composables/useToast'
import { returnUnitMetric, average } from '../composables/utils';

const { showToast } = useToast();

function init(key){
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function syncToLocalStorage(state, key) {
    window.addEventListener('storage', (event) => {
        if (event.key === key){
            if (event.newValue === null) {
                // TODO Find a way for this to not necessarily tied to []
                // Instead must rely on some form of "defaultValue"
                state.value = [];
                showToast(`${key} in localStorage was cleared.`,'danger');
            } else {
                try {
                    state.value = JSON.parse(event.newValue)
                    showToast(`Intercepted localStorage udpdate.`, 'info');
                } catch (e) {
                    showToast('Failed to parse intercepted JSON.','danger');
                }
            }
        }
    });
}


export const usePropertyStore = defineStore('properties', () => {
    // State TODO: create a generalized function to cleany create new instances of refs
    const STORAGE_KEY = 'selectedProperties';
    const savedProperties = ref(init(STORAGE_KEY));
    syncToLocalStorage(savedProperties, STORAGE_KEY);

    // Actions
    function addProperty(listing) {
        if (!savedProperties.value.find(p => p.uid === listing.uid)){
            savedProperties.value.push(listing);
            save()
            showToast('Property saved successfully!', 'info');
        } else {

        }
    }

    function removeProperty(uid){
        savedProperties.value = savedProperties.value.filter(p => p.uid !== uid);
        save();
        showToast(`Property with id ${uid} removed.`, 'danger');
    }

    function removeAllProperty(){
        savedProperties.value = [];
        save();
        showToast(`Properties removed.`, 'danger');
    }

    function save(){
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProperties.value));
    }

    // Getters
    const averagePSQM = computed(() => {
        return {
            formatted: average(savedProperties.value, 'PSQM') + ' ' + returnUnitMetric({key: 'PSQM'}),
            unformatted: average(savedProperties.value, 'PSQM')
        }
    });

    const averagePrice = computed(() => {
        return {
            formatted: average(savedProperties.value, 'advertisedPrice') + ' ' + returnUnitMetric({key: 'advertisedPrice'}),
            unformatted: average(savedProperties.value, 'advertisedPrice')
        }
    });

    return { savedProperties, addProperty, removeProperty, removeAllProperty, save, averagePSQM, averagePrice }
})