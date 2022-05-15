import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import io from 'socket.io-client';

const socket = io('https://3000-<URL>', {
    reconnection: false,
    transports: ["websocket", "polling"]
});

createApp(App).use(router).mount('#app')
