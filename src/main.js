// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue';

export default function(Vue, { router, head, isClient }) {
    /* Bootstrap */
    require('bootstrap-css-only');
    // Set default layout as a global component
    Vue.component('Layout', DefaultLayout);
    /* Fontes */
    head.link.push({
        rel: 'stylesheet',
        href:
            'https://fonts.googleapis.com/css?family=Belleza:400|Poppins:400,800&display=swap'
    });
}
