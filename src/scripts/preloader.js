    const spinner = (value) => {
        if (value) {
            let div = document.createElement('div');
            div.classList.add('preloader')
            console.log('value')
            div.innerHTML = `
            <?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="84px" height="84px" viewBox="0 0 128 128" xml:space="preserve"><g><path fill="#ffffff" fill-opacity="0.8" d="M26.9 65.08c3.87 21.1 21.26 37 42.13 37 23.72 0 41.6-20.58 42.95-45.88 1-18.84-9.45-37.5-32.57-47.88A52.2 52.2 0 0 0 47.08 5c22.23-6.02 41.53.02 54.6 10.66 8.2 6.46 16.12 15.33 19.32 24.4a67.13 67.13 0 0 1 3.77 19.85c0 34.4-26.87 62.3-61.26 62.3A62.27 62.27 0 0 1 2.05 70.1c.57-15.82 19.83-18.23 24.83-5.02z"/><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1260ms" repeatCount="indefinite"></animateTransform></g></svg>
        </div>
        </br>
        <div class="preloader-notice">
            Долгая загрузка. Перезагрузите страницу.
        </div>
        
        <style>
            .preloader {
                position: fixed;
                z-index: 3;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
                background-color: #08173885;
                backdrop-filter: blur(30px);
                transition: .3s;
            }
            .preloader-notice {
                display: none;
                position: absolute;
                top: 60%;
                font-size: 1.4rem;
            }
        </style>
        `
        document.querySelector('.body').prepend(div)

            let a = setTimeout(() => {
                 let c = document.querySelector('.preloader');
                 if (c) {
                     let b = document.querySelector('.preloader-notice')
                     b.style.display = 'block'
                 }
            }, 10500)
            setTimeout(() => {
                clearTimeout(a)
            }, 11000)

        } else {
            let a = document.querySelector('.preloader');
            if (a) {
                setTimeout(() => {
                    a.style.opacity = '0';
                }, 200)
                setTimeout(() => {
                    a.remove();
                }, 300)
            };
        };
    };
//     const showNotice = setTimeout(() => {
//     const notice = document.querySelector('.body').children
//     notice.style.display = 'block'
// }, 3000)
//     setTimeout(() => {
//         clearTimeout(showNotice)
//     }, 4000)



        export {spinner};
