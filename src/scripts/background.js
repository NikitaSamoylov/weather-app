import { spinner } from "./preloader";

const bodyElem = document.querySelector('.body')

const date = new Date();
let day;
if (date.getHours() >= 7 && date.getHours() <= 23) {
    day = true;
}
else {
    day = false;
};


const changeBackground = (data) => {
      
    Array.from(data.condition.text.split(' ')).forEach((item) => {
        console.log(item)
        bodyElem.classList.remove('body--day-rain', 'body--day-rain', 'body--night-rain', 'body--day-sun', 'body--night-sun');
        
        if (item.toLowerCase() == 'дождь' || item.toLowerCase() == 'ливень' || item.toLowerCase() == 'ливни') {
            if (day) {
            bodyElem.classList.add('body--day-rain')
            } 
            else {
                bodyElem.classList.add('body--night-rain')
            }
        } 
        else if (item.toLowerCase() == 'ясно' || item.toLowerCase() == 'солнечно' || item.toLowerCase() == 'морось' || item.toLowerCase() == 'облачно' || item.toLowerCase() == 'пасмурно' || item.toLowerCase() == 'дымка' || item.toLowerCase() == 'облачность' || item.toLowerCase() == 'туман') {
            if (day) {
                bodyElem.classList.add('body--day-sun')
            } 
            else {
                bodyElem.classList.add('body--night-sun')
            }
        };
    });
    
    setTimeout(() => {
      spinner(0);
    }, 100)
};

export {changeBackground};