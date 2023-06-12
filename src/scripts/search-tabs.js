import { getWeatherData } from "./requests";
import { spinner } from "./preloader";
import { renderWeatherTabPeriod, sliderTabsItems } from "./render-main-info";

const tabsItems = document.querySelectorAll('.main-search__item');

tabsItems.forEach((tab) => {

    tab.addEventListener('click', (e) => {
        spinner(1);
        renderWeatherTabPeriod(0);

        for (let i = 0; i < sliderTabsItems.length; i++) {
            sliderTabsItems[i].classList.remove('tabs-head__item--active');
            sliderTabsItems[0].classList.add('tabs-head__item--active');
        };

        if (e.target.textContent == 'москва') {
            let span = document.createElement('span');
            span.classList.add('main-search__lat');
            span.textContent = '  55.7522,37.6156';
            tab.appendChild(span);
        }
        if (e.target.textContent == 'самара') {
            let span = document.createElement('span');
            span.classList.add('main-search__lat');
            span.textContent = '  53.32166,50.195217';
            tab.appendChild(span);
        }
        if (e.target.textContent == 'спб') {
            let span = document.createElement('span');
            span.classList.add('main-search__lat');
            span.textContent = '  59.9386300,30.3141300';
            tab.appendChild(span);
        };

        const location = e.target.textContent.match(/  .{1,20}/)[0].trim();
        console.log(location)
        let cityData = 'город' + ' ' + e.target.textContent.match(/[^\d\.\,\s]/gm).join('') + ',';
        getWeatherData(location, cityData)
    });
});




