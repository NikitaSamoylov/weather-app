import { spinner } from "./preloader";
const locationMainName = document.querySelector('.main-info__title');
const currentTempValue = document.querySelector('.current-info__value');
const weatherMainIcon = document.querySelector('.info-selectors__icon');
const sliderTabs = document.querySelector('.tabs__head');
const sliderTabsItems = document.querySelectorAll('.tabs-head__item');

const date = new Date();
let mainResult;

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

const renderMainData = (result, cityData) => {
    // console.log(result);
    const cleanCityName = Array.from(cityData.split(',')).splice(0, 1);
    locationMainName.textContent = Array.from(cleanCityName.toString().split(' ')).splice(1, 3).toString().replace(',', ' ');

    currentTempValue.textContent = `${Math.ceil(result.current.temp_c)}°`;
    weatherMainIcon.src = result.current.condition.icon;

    mainResult = JSON.parse(JSON.stringify(result));
    chooseDay(result);

};

sliderTabs.addEventListener('click', function(evt) {
    spinner(1);
    sliderTabsItems.forEach((tab) => {
        tab.classList.remove('tabs-head__item--active');
    });
    evt.target.classList.add('tabs-head__item--active');
    let index = [...this.children].findIndex(el => el == evt.target);
    chooseDay(mainResult, index);
});

export {renderMainData};