import { defineStore } from "pinia";
import { ref } from 'vue'

function init(key){
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function syncToLocalStorage(state, key) {
    window.addEventListener('storage', (event) => {
        if (event.key === key){
            if (event.newValue === null) {
                // TODO Find a way for this to not necessarily tied to []
                // Instead must rely on some form of "defaultValue"
                state.value = [];
                showToast(`${key} in localStorage was cleared.`,'danger');
            } else {
                try {
                    state.value = JSON.parse(event.newValue)
                    showToast(`Intercepted localStorage udpdate.`, 'info');
                } catch (e) {
                    showToast('Failed to parse intercepted JSON.','danger');
                }
            }
        }
    });
}

export const useSettingsStore = defineStore('settings', () => {
    // State
    const STORAGE_KEY = 'settingsMyk';
    const settings = ref(init(STORAGE_KEY));
    syncToLocalStorage(settings, STORAGE_KEY);

    function save(){
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings.value));
    }


    return { settings, save }
})