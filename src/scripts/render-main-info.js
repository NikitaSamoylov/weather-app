import { spinner } from "./preloader";
import {renderAdditionalInfo} from './render-additional-info';
import { addAnim } from "./add-anim-to-element";
const locationMainName = document.querySelector('.main-info__title');
const currentTempValue = document.querySelector('.current-info__value');
const weatherMainIcon = document.querySelector('.info-selectors__icon');
const sliderTabs = document.querySelector('.tabs__head');
const sliderTabsItems = document.querySelectorAll('.tabs-head__item');
const weatherSelectorBtns = document.querySelectorAll('.info-selectors__item');
const weatherSelectorToday = document.querySelector('.info-selectors__today');
const anim = document.querySelector('.anim')

const date = new Date();
let mainResult;
let now = false;
let dayIndex = 0;

const hideElement = (param) => {
    param.style.opacity = '0';
    setTimeout(() => {
        param.style.display = 'none';
    });
};

const showElement = (param) => {
    setTimeout(() => {
        param.style.display = 'block';
    }, 300);
    setTimeout(() => {
        param.style.opacity = '1';
    }, 500);
};

const renderSliderData = (currentResult) => {
    currentResult.forEach((result) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `<div class="swiper-slide" name="slide">
            <div class="swiper-slide__time">${result.time.match(/\s...../gm)}</div>
            <div class="swiper-slide__icon"><img src=${result.condition.icon} alt="weather icon"></div>
            <div class="swiper-slide__temperature">${result.temp_c.toFixed()}°</div>
            </div>`
            document.querySelector('.swiper-wrapper').appendChild(div);
            setTimeout(() => {
                spinner(0);
            }, 300);
    });
};

const removePrevSlides = () => {
    const prevSlides = document.querySelector('.swiper-wrapper').children;
    Array.from(prevSlides).forEach((slide) => {
            slide.style.opacity = '0'
        setTimeout(() => {
            slide.remove()
        }, 300)
    });
};

const chooseDay = (result, index = 0) => {
    let currentResult;
    if (index === 0) {
        const hourDayLength = result.forecast.forecastday[index].hour.length;
        currentResult = result.forecast.forecastday[index].hour.splice(date.getHours(), hourDayLength);
    } else {
        currentResult = result.forecast.forecastday[index].hour;
    }
    removePrevSlides();
    renderSliderData(currentResult);

    if (currentResult.length > 10) {
        document.querySelectorAll('.swiper__btn').forEach((btn) => {
            showElement(btn);
        });
    } else {
        document.querySelectorAll('.swiper__btn').forEach((btn) => {
            hideElement(btn)
        });
    };
};
// here we add rendering additional info-------
const renderCurrentTemp = (result, dayIndex = 0) => {
    if (now) {
        currentTempValue.textContent = `${Math.ceil(result.current.temp_c)}°`;  
        weatherMainIcon.src = result.current.condition.icon;
        renderAdditionalInfo(result.current);
        now = false;
    } else {
        weatherSelectorBtns.forEach((el) => {
            el.classList.remove('info-selectors__item--active');
        });
        document.querySelector('.info-selectors__today').classList.add('info-selectors__item--active');
        currentTempValue.textContent = `${Math.ceil(result.forecast.forecastday[dayIndex].day.maxtemp_c)}°`
        weatherMainIcon.src = result.forecast.forecastday[dayIndex].day.condition.icon;
        renderAdditionalInfo(result.forecast.forecastday[dayIndex].day);
    };
};
// ---------------------------------
const renderMainData = (result, cityData) => {
    const cleanCityName = Array.from(cityData.split(',')).splice(0, 1);
    locationMainName.textContent = Array.from(cleanCityName.toString().split(' ')).splice(1, 3).toString().replace(',', ' ');

    renderCurrentTemp(result);
    mainResult = JSON.parse(JSON.stringify(result));
    chooseDay(result);
};

const renderWeatherTabPeriod = (period = 0) => {
    const periods = ['сегодня', 'завтра', 'послезавтра'];
    weatherSelectorToday.innerHTML = periods[period];
};

sliderTabs.addEventListener('click', function(evt) {
    spinner(1);
    sliderTabsItems.forEach((tab) => {
        tab.classList.remove('tabs-head__item--active');
    });
    evt.target.classList.add('tabs-head__item--active');
    let index = [...this.children].findIndex(el => el == evt.target);
    dayIndex = index;
    chooseDay(mainResult, index);
    renderCurrentTemp(mainResult, dayIndex);
    renderWeatherTabPeriod(dayIndex);
});

weatherSelectorBtns.forEach((selector) => {
    selector.addEventListener('click', (evt) => {
        addAnim(currentTempValue);
        document.querySelectorAll('.additional-info__value').forEach((el) => addAnim(el));
        weatherSelectorBtns.forEach((elem) => {
            elem.classList.remove('info-selectors__item--active');
        });
        evt.target.classList.add('info-selectors__item--active');
        if (evt.target.textContent == 'сейчас') {
            now = true;
        } else {
            now = false;
        }
        renderCurrentTemp(mainResult, dayIndex);
    });
});

export {renderMainData};