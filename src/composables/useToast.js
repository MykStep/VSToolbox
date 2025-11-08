import { reactive } from 'vue';

// State is internal to the composable
const toast = reactive({
  visible: false,
  message: '',
  type: 'success',
  timeoutId: null
});

export function useToast() {
  // We expose a *method* to change the state
  const showToast = (message, type = 'success', duration = 3000) => {
    if (toast.timeoutId) {
      clearTimeout(toast.timeoutId);
    }
    
    toast.message = message;
    toast.type = type;
    toast.visible = true;
    
    toast.timeoutId = setTimeout(() => {
      toast.visible = false;
    }, duration);
  };

  // Expose only what the component needs
  return {
    toast: reactive(toast), // The reactive state
    showToast // The method to change it
  };
}