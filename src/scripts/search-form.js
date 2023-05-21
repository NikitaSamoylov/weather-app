import {getWeatherData, getLocation} from './requests';
import { darkenBackground } from './darkenBackground';
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

const savedCities = localStorage.getItem('tabsCities');
const savedCitiesArr = Array.from(savedCities.split(','));
for (let i = 0; i < tabsCities.length; i++) {
    tabsCities[0].textContent = savedCitiesArr[0];
    tabsCities[1].textContent = savedCitiesArr[1];
    tabsCities[2].textContent = savedCitiesArr[2];
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
}

returnIcon.addEventListener('click', () => {
    returnMainForm();
});

const renderData = (data) => {
    data.forEach(el => {
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

searchField.addEventListener('input', () => {
    if (searchField.value.length >= 1) {
        darkenBackground(1);
        hideIcons(0);
    }

    if (searchField.value.length >= 3) {
        removeResultList();
        getLocation(searchField)
            .then(res => {
            renderData(res);
        });
    }
    else if (searchField.value === '') {
        removeResultList();
        darkenBackground(0);
        hideIcons(1);
    };
});

const changeTab = (tabText) => {
    const resultArr = Array.from(tabText.split(' '));
    let locationValue = resultArr.slice(1, 2);
    tabValue.textContent = locationValue.join().replace(',', '').toLowerCase();

    let arrStorage = [];
    tabsCities.forEach((tab, index) => {
        if (index != 3) {
            arrStorage.push(tab.textContent)
            localStorage.setItem("tabsCities", arrStorage)
        }
});

};

resultList.addEventListener('click', (evt) => {
    if (tabList.style.display != 'none') {
        const city = evt.target.textContent.match(/  .{1,20}/)[0].trim();
        getWeatherData(city)
            .then(res => {console.log(res)})
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
    }
});


console.log('Доделать: навигацию по городам кнопкой клавы и энтером выбор; сохранение выбора в локалсторедж; автоопределение локации;')

