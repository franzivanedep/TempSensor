import { createRouter, createWebHistory } from 'vue-router';
import TemperatureSensor from './components/temp.vue'; // Ensure the path is correct
import chart from './components/chart.vue'
// Define routes
const routes = [
    {
        path: '/temperature',
        name: 'TemperatureSensor',
        component: TemperatureSensor,
    },

    {
        path: '/chart',
        name: 'chart',
        component: chart,
    },
    // You can add more routes here if needed
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
});

export default router;
