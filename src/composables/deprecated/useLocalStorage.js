import { ref, watch, onMounted,onUnmounted } from 'vue';

export function useLocalStorage(key, defaultValue) {
  // 1. Set default value or push existing value from localStorage
  const data = ref(defaultValue);
  const storedValue = localStorage.getItem(key);
  if (storedValue !== null) { // Check for explicit null
    try {
      data.value = JSON.parse(storedValue);
    } catch (e) {
      console.error(`[useLocalStorage] Error parsing stored value for key "${key}":`, e);
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }
  } else {
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }

  // 2. Use a "watcher" to automatically save any changes back to localStorage.
  watch(data, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  }, {
    deep: true
  });

  // 3. Synchronize changes from other tabs: localStorage -> Vue ref
  const updateFromStorage = (event) => {
    console.log('event key: ' + event.key);
    console.log('eventlistener from: ' + key);
    console.log(event.key === key);
    console.log('--------');
    // Check if the change is for the key this instance cares about
    if (event.key === key) {
      console.log('first step with: ' + key);
      if (event.newValue === null) {
        // Item was removed/cleared from localStorage in another tab
        data.value = defaultValue;
        console.log('operation consisted of a removal in: ' + key);
      } else {
        try {
          // Parse and update the local ref
          console.log(data.value);
          data.value = JSON.parse(event.newValue);
          console.log(data.value);
          console.log(JSON.parse(event.newValue));
        } catch (e) {
          console.error(`[useLocalStorage] Error parsing broadcasted value for key "${key}":`, e);
        }
      }
    }
  };

  onMounted(() => {
    window.addEventListener('storage', updateFromStorage);
    console.log('mounted: ' + key);
  });

  onUnmounted(() => {
    window.removeEventListener('storage', updateFromStorage);
    console.log('unmounted: ' + key);
  });

  // 4. Return the ref.
  return data;
}