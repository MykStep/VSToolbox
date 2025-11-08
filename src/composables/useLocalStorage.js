import { ref, watch } from 'vue';

// This composable takes a key and a default value,
// and gives you a ref that's auto-synced with localStorage.
export function useLocalStorage(key, defaultValue) {
  // 1. Create a ref, initializing it with the value from 
  //    localStorage, or the default.
  const data = ref(defaultValue);
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    data.value = JSON.parse(storedValue);
  }

  // 2. Use a "watcher" to automatically save any
  //    changes back to localStorage.
  watch(data, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  }, {
    deep: true // Important for objects and arrays!
  });

  // 3. Return the ref.
  return data;
}