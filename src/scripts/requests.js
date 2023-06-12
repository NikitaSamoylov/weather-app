import { renderMainData } from "./render-main-info";
import { spinner } from "./preloader";

const getLocation = async (searchField) => {
    try {
        const res = await fetch(`https://api.geotree.ru/search.php?key=IcoB2LVizRx0&term=${searchField.value}&level=4`);
        if (!res.ok) {
            throw new Error(res.status);
        }
        return await res.json();
    }
    catch(error) {
        document.querySelector('.main-search--error').textContent = `ошибка ${error.message}. Перезагрузите страницу`;
    };
};

const getWeatherData = async (city, cityData='город Ростов-на-Дону, ростовкая область') => {
    if (city == null) {
        document.querySelector('.main-search--error').textContent = `данных нет. Попробуйте другой населенный пункт`;
    }
    try {
        const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=2ba703d98b684941b17194908230805&q=${city}&days=3&aqi=no&alerts=no&lang=ru`);
        if (!res.ok) {
            throw new Error(console.log(res.message));
        }
        let result = await res.json();
        renderMainData(result, cityData)
    }
    catch (error) {
        document.querySelector('.main-search--error').textContent = `ошибка ${error.message}. Перезагрузите страницу`;
    };
    // spinner(0);
};
const cityDefault = '47.2313500,39.7232800';
getWeatherData(cityDefault);

export {getWeatherData, getLocation};
