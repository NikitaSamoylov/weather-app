
const locationMainName = document.querySelector('.main-info__title');
const currentTempValue = document.querySelector('.current-info__value');
const weatherMainIcon = document.querySelector('.info-selectors__icon');

const renderMainData = (result, cityData) => {
    console.log(result);
    const cleanCityName = Array.from(cityData.split(',')).splice(0, 1);
    locationMainName.textContent = Array.from(cleanCityName.toString().split(' ')).splice(1, 3).toString().replace(',', ' ');
    currentTempValue.textContent = `+${Math.ceil(result.current.temp_c)}°`;
    weatherMainIcon.src = result.current.condition.icon;
};





export {renderMainData};