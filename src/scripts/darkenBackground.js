const darkenBg = document.querySelector('.darken');

const darkenBackground = (value) => {
    if (value) {
        darkenBg.classList.add('darken-bg');
    }
    else {
        darkenBg.classList.remove('darken-bg');
    };
};

export {darkenBackground};