const body = document.querySelector('body');

const date = new Date();
let day;
if (date.getHours() >= 7 && date.getHours() <= 23) {
    day = true;
}
else {
    day = false;
};

const changeBackground = (data) => {
    const weather = Array.from(data.condition.text.split(' ')).forEach((item) => {
        if (item == 'дождь') {
            if (day) {
                body.style.backgroundImage  = 'url("./assets/day-rain.jpg")';
            }
            else {
                body.style.backgroundImage  = "url('./assets/img/night-rain.jpg')";
            }
        }
    });
};

export {changeBackground};