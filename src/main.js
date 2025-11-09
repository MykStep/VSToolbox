import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Wrapping mount logic in a function:
function mountApp() {
    // Create div to mount on
    const appContainer = document.createElement('div');
    appContainer.id = 'myk--vue-app';
    appContainer.style.position = 'sticky';
    appContainer.style.top = '0';
    appContainer.style.zIndex = '10000';

    document.body.prepend(appContainer);

    createApp(App).mount('#myk--vue-app');
}

var hostname = window.location.host;

// Mount when page is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountApp);
} else {
    mountApp();
    console.log(hostname);
}
