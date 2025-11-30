// A simple utility to capitalize a string
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Maps a key to its unit
export function returnUnitMetric(informationItem) {
  const unitList = {
    advertisedPrice: "€",
    EPC: "kWh/m²",
    LA: "sqm",
    PSQM: "€/sqm"
  };
  return unitList[informationItem.key] || undefined;
}

// Calculates an average from a list of objects by key
export function average(properties, key = '') {
  const priceList = properties
    .map(x => parseFloat(x[key]))
    .filter(price => !Number.isNaN(price));

  if (priceList.length === 0) {
    return '0.00';
  }

  const sum = priceList.reduce((total, currentPrice) => total + currentPrice, 0);
  return (sum / priceList.length).toFixed(2);
}

// Opens a link in a new tab securely
export function openLink(link) {
  window.open(link, '_blank', 'noopener,noreferrer');
}

export function omitObjectItems(object, filterArray) {
  return Object.fromEntries(Object.entries(object).filter(([key]) => !filterArray.includes(key)));
}