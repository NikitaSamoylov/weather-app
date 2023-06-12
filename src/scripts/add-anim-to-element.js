const addAnim = (param) => {
    param.classList.add('anim');
    param.addEventListener('animationend', () => {
        param.classList.remove('anim');
    });
};

export {addAnim};