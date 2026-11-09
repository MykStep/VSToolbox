import { BaseScraper } from "./base";

//TODO: Create a Scraper"Factory", i.e, a scraper router for scalability

export class ImmowebScraper extends BaseScraper {
    scrape (){
        try {
            // Metadata
            const metadata = {
                uid: window.location.pathname.split('/').at(-1),
                link: window.location.href,
                isEdited: false,
                note: ""
            }

            // Scraped data
            const priceContainer = this.document.querySelector('.classified__price .sr-only');
            const hasVAT = !priceContainer.innerText.includes('*');

            const scraped = {
                advertisedPrice: this.htmlToNumeral(priceContainer),
                hasVAT: hasVAT
            }

            // TODO: Start using ClassifiedObject as a whole
            const classified = this._getClassfiedObject();
            // TODO: make the address operation a seperate function
            scraped["address"] = `${classified.property.location.street} ${classified.property.location.number}, ${classified.property.location.postalCode}`;
            console.log(scraped);

            scraped["PA"] = classified.property.land.surface;

            // Push scraped data from table
            const features = this._getTableData();
            const filter = {
                LA: {key: 'Usable floor area', type: 'int'},
                EPC: {key: 'Primary energy consumption', type: 'int'},
                EPCLabel: {key: 'EPC/EPC label', type: 'string'},
                CY: {key: 'Construction year', type: 'int'},
            };
            this._pushData(scraped, features, filter)

            
            // Computes
            const computes = {
                PSQM: (scraped.advertisedPrice / scraped.LA || 0).toFixed(0)
            }

            const data = {
                uid: metadata.uid,
                link: metadata.link,
                advertisedPrice: scraped.advertisedPrice,
                PSQM: computes.PSQM,
                address: scraped.address,
                LA: scraped.LA,
                EPC: scraped.EPC,
                EPCLabel: scraped.EPCLabel,
                CY: scraped.CY,
                PA: scraped.PA,
                hasVAT: scraped.hasVAT,
                note: metadata.note
            };

            return { success: true, data }
        } catch (e) {
            return { success: false, e }
        }
    }

    _getClassfiedObject() {
        let classified = window.classified;
        return classified;
    }

    _getTableData() {
        //TODO: Turn this into a try/catch function
        const map = {};
        const rows = this.document.querySelectorAll('.classified-table__row');

        rows.forEach(row => {
            const header = row.querySelector('.classified-table__header');
            const value = row.querySelector('.classified-table__data');
            
            if (header && value) {
                const key = header.innerText.trim();
                const val = value.innerText.trim();
                map[key] = val;
            }
        });

        return map;
    }

    _pushData(obj, map, filters) {
        for (let itemKey in filters) {
            const config = filters[itemKey];
            obj[itemKey] = config.type === 'int' ? this.parseNumber(map[config.key]) : this.cleanText(map[config.key]);
        }
    }
}