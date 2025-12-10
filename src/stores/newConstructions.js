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


export const useNewConstructionsStore = defineStore('newConstructions', () => {
    // State TODO: create a generalized function to cleany create new instances of refs
    const STORAGE_KEY = 'selectedNewConstructions';
    const savedProperties = ref(init(STORAGE_KEY));
    syncToLocalStorage(savedProperties, STORAGE_KEY);

    const VAT = ref(21);
    const CC = ref();
    const PC = ref();

    const LA = ref();
    const PSQM = ref();


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

    const groundPortion = computed(() => {
        let computedValue = PC.value / (parseFloat(CC.value) + parseFloat(PC.value))
        return {
            formatted: (computedValue * 100).toFixed(0) + '%',
            unformatted: computedValue
        }
    })

    const averagePSQMInclVAT = computed(() => {
        let psqm = parseFloat(averagePSQM.value.unformatted);
        let portion = groundPortion.value.unformatted;
        let vat = VAT.value / 100;
        let computedValue = psqm + ( 1 - portion ) * psqm * vat;

        return {
            formatted: (computedValue).toFixed(2) + ' €/sqm',
            unformatted: computedValue
        }
    })

    const averagePriceInclVAT = computed(() => {
        let p = parseFloat(averagePrice.value.unformatted);
        let portion = groundPortion.value.unformatted;
        let vat = VAT.value / 100;
        let computedValue = p + ( 1 - portion ) * p * vat;

        return {
            formatted: (computedValue).toFixed(2) + ' €',
            unformatted: computedValue
        }
    })

    const valuationCM = computed(() => {
        let vat = VAT.value / 100;
        let computedValue = parseFloat(CC.value) * (1 + vat) + parseFloat(PC.value)
        return {
            formatted: (computedValue).toFixed(2) + ' €',
            unformatted: computedValue,
        }
    })

    const valuationMM = computed(() => {
        let computedValue = parseFloat(LA.value) * parseFloat(PSQM.value);
        return {
            formatted: (computedValue).toFixed(2) + ' €',
            unformatted: computedValue,
        }
    })

    const valuationFinal = computed(() => {
        let computedValue = (valuationCM.value.unformatted + valuationMM.value.unformatted) / 2
        return {
            formatted: (computedValue).toFixed(2) + ' €',
            unformatted: computedValue,
        }
    })



    return { 
        savedProperties,
        VAT, PC, CC,
        LA, PSQM,
        addProperty, 
        removeProperty, 
        removeAllProperty, 
        save, 
        averagePSQM, 
        averagePrice,
        groundPortion,
        averagePSQMInclVAT, 
        averagePriceInclVAT,
        valuationCM,
        valuationMM,
        valuationFinal
     }
})