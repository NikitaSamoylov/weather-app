import {getWeatherData, getLocation} from './requests';
import { darkenBackground } from './darkenBackground';
import { spinner } from './preloader';
import './search-tabs';

const searchField = document.querySelector('.main-input__search');
const resultList = document.querySelector('.result-list');
const searchIcon = document.querySelector('.main-input__icon');
const editIcon = document.querySelectorAll('.main-search__icon');
const tabList = document.querySelector('.main-search__list');
const addTabsHeader = document.querySelector('.main-search__add-tabs');
const returnIcon = document.querySelector('.main-search__icon--return');
let tabsCities = document.querySelectorAll('.main-search__item');
const resultListItem = resultList.children;

let tabValue;

if (localStorage.getItem('tabsCities') !== null) {
    const savedCitiesStorage = localStorage.getItem('tabsCities');
    const savedCities = JSON.parse(savedCitiesStorage);
    let cityLat = [];
    let cityName = [];

    // const currentCities = [];
    // tabsCities.forEach((el) => {
    //     currentCities.push(el)
    // });
    const currentCities = [...tabsCities];

    // const savedCitiesArr = []
    // savedCities.forEach((item) => {
    //     savedCitiesArr.push(item)
    // });
    const savedCitiesArr = [...savedCities]
    

    savedCitiesArr.forEach((city) => {
        cityLat.push(city.match(/  .{1,20}/))
        cityName.push(city.match(/[^\d\.\s]/gm).join('').replace(',', ''))
    });
   
    for (let i = 0; i < currentCities.length; i++) {

    let span1 = document.createElement('span');
    span1.classList.add('main-search__lat');
    span1.textContent = `  ${cityLat[0]}`;
    let span2 = document.createElement('span');
    span2.classList.add('main-search__lat');
    span2.textContent = `  ${cityLat[1]}`;
    let span3 = document.createElement('span');
    span3.classList.add('main-search__lat');
    span3.textContent = `  ${cityLat[2]}`;
    currentCities[0].textContent = cityName[0];
    currentCities[0].appendChild(span1);
    currentCities[1].textContent = cityName[1];
    currentCities[1].appendChild(span2);
    currentCities[2].textContent = cityName[2];
    currentCities[2].appendChild(span3);

}
};

editIcon.forEach((icon) => {

    icon.addEventListener('click', () => {
        tabValue = icon.previousElementSibling;
        tabList.style.opacity = '0';

        setTimeout(() => {
            tabList.style.display = 'none';
        }, 300);

        addTabsHeader.style.display = 'flex';

        setTimeout(() => {
             addTabsHeader.style.opacity = '1'
             searchField.focus();
        }, 350);
    });

});

const returnMainForm = () => {

    setTimeout(() => {
        tabList.style.display = 'flex';
        tabList.style.opacity = '0';
    }, 300);

    setTimeout(() => {
        tabList.style.opacity = '1';   
    }, 350);

    addTabsHeader.style.opacity = '0'

    setTimeout(() => {
        addTabsHeader.style.display = 'none';
    }, 300);

};

returnIcon.addEventListener('click', () => {
    returnMainForm();
});

const removeResultList = () => {
    Array.from(resultListItem).forEach(arr => {
        arr.remove();
    });
};

const hideIcons = (value) => {

    if (value) {
        searchIcon.style.display = 'block';

        setTimeout(() => {
            searchIcon.style.opacity = '1';
        }, 80);
    } else {
        searchIcon.style.opacity = '0';

        setTimeout(() => {
            searchIcon.style.display = 'none';
        }, 300);
    };

};

const renderData = (locationData) => {
    
    locationData.forEach(el => {

        const li = document.createElement('li');
        li.classList.add('result-list__item');
        li.textContent = el.value.slice(0, 55) + '...' + ' ' + ' ';
        resultList.appendChild(li);

        const span = document.createElement('span');
        span.textContent = el.geo_inside.lat + ',' +el.geo_inside.lon;
        span.style.display = 'none';
        li.appendChild(span);

    });

};

searchField.addEventListener('input', () => {
    if (searchField.value.length >= 1) {
        darkenBackground(1);
        hideIcons(0);
        removeResultList();
    }
    if (searchField.value.length >= 3) {
        removeResultList();

        getLocation(searchField)
            .then(res => {
            renderData(res)
            })
    }
    else if (searchField.value === '' && searchField.value.length <= 3) {
        removeResultList();
        darkenBackground(0);
        hideIcons(1);
        setTimeout(() => {
            removeResultList()
        }, 500)
    };
});

const changeTab = (tabText) => {
    const lattitudeValue = tabText.match(/  .{1,20}/)[0].trim();
    const resultArr = Array.from(tabText.split(' '));
    const locationValue = resultArr.slice(1, 2);
    tabValue.textContent = locationValue.join().replace(',', '').toLowerCase();

    let span = document.createElement('span');
    span.classList.add('main-search__lat');
    span.textContent = `  ${lattitudeValue}`;
    tabValue.appendChild(span);

    let arrStorage = [];

    tabsCities.forEach((tab) => {
        arrStorage.push(tab.textContent)
    });

    localStorage.setItem("tabsCities", JSON.stringify(arrStorage))
};

resultList.addEventListener('click', (evt) => {
    if (tabList.style.display != 'none') {
        const city = evt.target.textContent.match(/  .{1,20}/)[0].trim();

        getWeatherData(city, evt.target.textContent);
        spinner(1);

        setTimeout(() => {
            spinner(0);
        }, 500)
    } else {
        changeTab(evt.target.textContent);
        returnMainForm();
    };

    searchField.value = '';

    removeResultList();
    darkenBackground(0);
    hideIcons(1);
});

document.addEventListener('keydown', (evt) => {
    if (searchField.value.length != 0 && evt.key =='Escape') {
        searchField.value = '';

        removeResultList();
        darkenBackground(0);
        hideIcons(1);
    }
    if (tabList.style.display == 'none' && evt.key =='Escape') {
        searchField.value = '';

        removeResultList();
        darkenBackground(0);
        hideIcons(1);
        returnMainForm();
    };
});


console.log('Доделать: навигацию по городам кнопкой клавы и энтером выбор; сохранение выбора в локалсторедж; автоопределение локации;')

