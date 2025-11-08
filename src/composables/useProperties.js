import { useLocalStorage } from './useLocalStorage';
import { useToast } from './useToast';

// Get the state/methods from other composables
const { showToast } = useToast();
const selectedProperties = useLocalStorage('selectedProperties', []);

export function useProperties() {

  function addProperty(property) {
    const totalUIDs = selectedProperties.value.map(x => x.uid);
    if (!totalUIDs.includes(property.uid)) {
      selectedProperties.value.push(property);
      showToast('Property saved successfully!', 'info');
    }
  }

  function removeProperty(propertyId) {
    selectedProperties.value = selectedProperties.value.filter(p => p.uid !== propertyId);
    console.log(`Property with id ${propertyId} removed.`);
    showToast(`Property with id ${propertyId} removed.`, 'danger');
  }

  function removeAllProperty() {
    selectedProperties.value = [];
    showToast(`Properties removed.`, 'danger');
  }

  return {
    selectedProperties,
    addProperty,
    removeProperty,
    removeAllProperty
  };
}