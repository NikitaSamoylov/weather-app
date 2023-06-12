import { changeBackground } from "./background";

const additionalInfoItem = document.querySelectorAll('.additional-info__value');

const renderAdditionalInfo = (data) => {
   
    let isToday;
    const additionalInfoItemArr = [...additionalInfoItem];
    if (data.last_updated) {
        isToday = true;
    } else {
        isToday = false;
    }

    for (let i = 0; i < additionalInfoItemArr.length; i++) {
        additionalInfoItemArr[0].textContent = isToday ? `${data.wind_kph} км` : `${data.maxwind_kph} км`;
        additionalInfoItemArr[1].textContent = isToday ? `${data.vis_km} км` : `${data.avgvis_km} км`;
        additionalInfoItemArr[2].textContent = isToday ? `${data.precip_mm} мм` : `${data.totalprecip_mm} мм`;
        additionalInfoItemArr[3].textContent = data.condition.text;

    };

    changeBackground(data);

};

export {renderAdditionalInfo};