import { useToast } from './useToast';

// Internal helper function, not exported
function formatObjectForClipboard(data, index = null) {
  const formattedPrice = (Number(data.advertisedPrice) / 1000).toFixed(1).replace('.', ',') + 'k';
  
  const linkText = index !== null
    ? `Reference ${index}: ${data.link}`
    : `Link: ${data.link}`;

  return `${linkText}
EPC: ${data.EPC}, ${data.EPCLabel}
LA: ${data.LA}
CY: ${data.CY}
P: ${formattedPrice}
PSQM: ${data.PSQM}
Note: ${data.note}`;
}

export function useClipboard() {
  const { showToast } = useToast();

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard successfully!');
      showToast('Copied to clipboard', 'info');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      showToast('Failed to copy', 'error');
    }
  }

  function copyObjectToClipboard(data) {
    let textToCopy = "";
    data.forEach((reference, index) => {
      const displayIndex = data.length > 1 ? index + 1 : null;
      let referenceText = formatObjectForClipboard(reference, displayIndex);
      textToCopy += (`\n\n` + referenceText);
    });
    
    copyToClipboard(textToCopy.trim());
  }
  
  function copySummaryStatistics(sumStats, data = null) {
    let textToCopy = "";
    
    if (data !== null) {
      data.forEach((reference, index) => {
        const displayIndex = data.length > 1 ? index + 1 : null;
        let referenceText = formatObjectForClipboard(reference, displayIndex);
        textToCopy += (`\n\n` + referenceText);
      });
    }
    
    for (const [key, value] of Object.entries(sumStats)) {
      let sumStatsItemText = `${key}: ${value}`;
      textToCopy += (`\n\n` + sumStatsItemText);
    };

    copyToClipboard(textToCopy.trim());
  }

  return {
    copyObjectToClipboard,
    copySummaryStatistics
  };
}