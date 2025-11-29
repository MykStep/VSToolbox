import { useToast } from '../../composables/useToast'

const { showToast } = useToast();

export class BaseScraper {
    constructor(document) {
        this.document = document;
    }

    scrape () {
        showToast('scrape() function not defined in child', 'danger')
    }

    htmlToNumeral(html){
        // Reach innerText
        const str = this.cleanText(html.innerText);

        // Parse text
        const data = parseInt(str.replace(/[^0-9]/g, ''), 10);
        return data || 0
    }

    // Remove extra spaces/newlines
    cleanText(str) {
        return str ? str.trim().replace(/\s+/g, ' ') : '';
    }

    // Parse Number
    parseNumber(str) {
        return parseInt(this.cleanText(str).replace(/[^0-9]/g, ''));
    }
}