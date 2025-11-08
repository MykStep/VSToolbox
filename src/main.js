import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Wrapping mount logic in a function:
function mountApp() {
    // Create div to mount on
    const appContainer = document.createElement('div');
    appContainer.id = '__my-vue-injection-app';
    appContainer.style.position = 'fixed';
    appContainer.style.top = '20px';
    appContainer.style.right = '20px';
    appContainer.style.zIndex = '99999';
    appContainer.style.background = 'white';
    appContainer.style.padding = '1rem';
    appContainer.style.borderRadius = '8px';
    appContainer.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';

    document.body.appendChild(appContainer);

    createApp(App).mount('#__my-vue-injection-app');
}

// Mount when page is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountApp);
} else {
    mountApp();
}
