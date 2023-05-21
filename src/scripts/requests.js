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

const getWeatherData = async (city) => {
    try {
        const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=2ba703d98b684941b17194908230805&q=${city}&aqi=no`);
        if (!res.ok) {
            throw new Error(console.log(res.message));
        }
        return await res.json();
    }
    catch (error) {
        document.querySelector('.main-search--error').textContent = `ошибка ${error.message}. Перезагрузите страницу`;
    };
};
const cityDefault = '47.2313500,39.7232800';
getWeatherData(cityDefault);

export {getWeatherData, getLocation};
