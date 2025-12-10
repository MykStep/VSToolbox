import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ImmowebScraper } from '../services/scraper/immoweb'
import { useToast } from '../composables/useToast'
import { omitObjectItems } from '../composables/utils';

const { showToast } = useToast();



export const useListingStore = defineStore('listing', () => {
    // State
    const currentListing = ref({})

    function reloadCurrentListingData() {
        const scraper = new ImmowebScraper(document);
        const result = scraper.scrape();
        
        if (result.success) {
            currentListing.value = result.data;
            showToast('Scraping successful', 'info');
        } else {
            showToast('Scraping unsuccessful', 'danger');
        }
    }

    const renderListingData = computed(() => {
        let validData = {}; // Cleaned Data (with Metadata)
        let missing = [];
        
        for(const [key, value] of Object.entries(currentListing.value)){
            const isEmpty = 
                value == null || 
                value == undefined || 
                value == 'Not specified' || 
                value == 0 ||
                Number.isNaN(value);
            if (isEmpty && key != 'note') {
                missing.push(key)
            } else {
                validData[key] = value
            }
        }

        const filteredData = omitObjectItems(validData, ['uid','link','isEdited','hasVAT']); // Cleaned Data (excl. Metadata)

        return {
            valid: validData,
            filtered: filteredData,
            missing: missing
        }
    })

    const validData = computed(() => {
        return renderListingData.value.valid
    })

    const filteredData = computed(() => {
        return renderListingData.value.filtered
    })

    return { currentListing , renderListingData, validData, filteredData, reloadCurrentListingData }
})