window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    ibg();
    scrollHeader();
    burger();
    lineActive();
    scrolling();
    widgetOn();
    slider('.wedo__sliders', '.wedo__sliders__item', '.wedo__sliders__previous', '.wedo__sliders__next');
    slider('.work__sliders', '.work__sliders__item', '.work__sliders__previous', '.work__sliders__next');
    showMoreStyles('.footer-instagram__linck', '.footer-instagram__grid', '..//foto.json');

});


// @prepros-append header/header.js
// @prepros-append main/main.js
// @prepros-append footer/footer.js