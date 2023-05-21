import { getWeatherData } from "./requests";

const tabsItems = document.querySelectorAll('.main-search__item');

tabsItems.forEach((tab) => {

    tab.addEventListener('click', (e) => {
        if (e.target.textContent == 'москва') {
            let span = document.createElement('span');
            span.classList.add('main-search__lat');
            span.textContent = '  55.7522,37.6156';
            tab.appendChild(span);
        }
        else if (e.target.textContent == 'самара') {
            let span = document.createElement('span');
            span.classList.add('main-search__lat');
            span.textContent = '  3.2000700,50.1500000';
            tab.appendChild(span);
        }
        else if (e.target.textContent == 'спб') {
            let span = document.createElement('span');
            span.classList.add('main-search__lat');
            span.textContent = '  59.9386300,30.3141300';
            tab.appendChild(span);
        }
    });
});

tabsItems.forEach((tab) => {
    tab.addEventListener('click', (evt) => {
    const location = evt.target.textContent.match(/  .{1,20}/)[0].trim();
    getWeatherData(location)
        .then(res => {console.log(res)});
    });
});



