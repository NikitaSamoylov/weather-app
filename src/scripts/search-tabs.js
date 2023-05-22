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
        let cityData = 'город' + ' ' + e.target.textContent.match(/[^\d\.\,\s]/gm).join('') + ',';
        getWeatherData(location, cityData)
        // .then(res => {console.log(res)});
    });
});

// tabsItems.forEach((tab) => {
//     tab.addEventListener('click', (evt) => {
//     const location = evt.target.textContent.match(/  .{1,20}/)[0].trim();
//     let cityData = 'город' + ' ' + evt.target.textContent.match(/[^\d\.\,\s]/gm).join('') + ',';
//     getWeatherData(location, cityData)
        // .then(res => {console.log(res)});
//     });
// });



