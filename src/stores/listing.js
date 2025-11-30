import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ImmowebScraper } from '../services/scraper/immoweb'
import { useToast } from '../composables/useToast'

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

    return { currentListing , reloadCurrentListingData }
})