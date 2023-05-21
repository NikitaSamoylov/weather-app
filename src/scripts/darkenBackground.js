const darkenBg = document.querySelector('.darken');

const darkenBackground = (value) => {
    if (value) {
        darkenBg.style.opacity = '1';
        darkenBg.style.filter = 'blur(10px)'
        darkenBg.classList.add('darken-bg');
    }
    else {
        darkenBg.style.opacity = '0';
        setTimeout(() => {
            darkenBg.classList.remove('darken-bg');
        }, 300);
    };
};

export {darkenBackground};