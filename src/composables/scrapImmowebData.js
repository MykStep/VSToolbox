import { ref, readonly } from 'vue';

const currentListing = ref(null); 
const currentWindow = ref(window.location.hostname);
const tableInformation = ref([]);

function informationGathering() {
    var price = document.getElementsByClassName('classified__price')[0].getElementsByClassName('sr-only')[0].innerText.split('€')[0];

    classifyTableInformation();

    currentListing.value = {
        uid: window.location.pathname.split('/').at(-1),
        link: window.location.href,
        advertisedPrice: price,
        PSQM: Math.round(price / parseFloat(callInfoByHeader("Usable floor area"))),
        LA: callInfoByHeader("Usable floor area"),
        EPC: callInfoByHeader("Primary energy consumption"),
        EPCLabel: callInfoByHeader("EPC/EPC label"),
        CY: callInfoByHeader("Construction year"),
        isEdited: false,
        note: ""
    };
}

function classifyTableInformation() {
    var rows = document.getElementsByClassName('classified-table__row');
    if (rows.length > 0) {
        Array.from(rows).forEach(row => {
            var tableInfoHeader = row.getElementsByClassName('classified-table__header')[0];
            var tableInfoValue = row.getElementsByClassName('classified-table__data')[0];
            
            if( tableInfoHeader != undefined && tableInfoValue != undefined) {
                tableInformation.value.push({header: tableInfoHeader.innerText, value: tableInfoValue.innerText});
            }
        });
    } else {
        // TODO: Connect Toast for better debugging
        console.log("Couldn't spot rows.")
    }
}

function callInfoByHeader(header){
  return tableInformation.value.find(item => item.header === header)?.value.split(' ')[0];
}

informationGathering();

export function scrapImmowebData() {
    function reloadCurrentListingData() {
        informationGathering();
        console.log(currentListing.value);
    }
  return {
    // State
    currentListing: currentListing,
    currentWindow: readonly(currentWindow),

    // Methods
    reloadCurrentListingData,
  };
}