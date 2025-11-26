import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import styleText from './assets/shadowStyle.css?inline'

// Wrapping mount logic in a function:
function mountApp() {
    // 1. Creating the host
    const host = document.createElement('div');
    host.id = 'vstoolbox-host';
    document.body.prepend(host);

    // 2. Attach Shadow DOM
    const shadow = host.attachShadow({mode: 'open'});

    // 3. Inject Styles into the shadow root
    const styleTag = document.createElement('style');
    styleTag.textContent = styleText;
    shadow.appendChild(styleTag);

    // 4. Create the Mount Point 
    const appRoot = document.createElement('div');
    appRoot.id = 'myk--vue-app';
    shadow.appendChild(appRoot);

    createApp(App).mount(appRoot);
}

var hostname = window.location.host;

// Mount when page is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountApp);
} else {
    mountApp();
    console.log(hostname);
}
