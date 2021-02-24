/* Main */
/* 4. Гармошка*/
const widgetOn = () => {
    const headers = document.querySelectorAll('.js-wHeader'),
        bodys = document.querySelectorAll('.js-wBody');

    const hideBody = () => {
        bodys.forEach(body => {
            body.style.display = 'none';
        });
        headers.forEach(header => {
            header.classList.remove('header-active');
        });
    };

    const showBody = (i = 0) => {
        bodys[i].style.display = 'block';
        headers[i].classList.add('header-active');
    };

    hideBody();
    showBody();
    headers.forEach((item, i) => {
        item.addEventListener('click', () => {
            hideBody();
            showBody(i);
        });
    });

};

/* 4. Слайдер */

const slider = (selectorPage, celectorSliders, selectorBtnL, selectorBtnR) => {
    const page = document.querySelector(selectorPage),
        slides = document.querySelectorAll(celectorSliders),
        btnL = document.querySelector(selectorBtnL),
        btnR = document.querySelector(selectorBtnR);
    let slideIndex = 1;
    //console.log(page);

    page.addEventListener('click', (e) => {
        let target = e.target
        console.log(target);
    });

    const showSlides = (n) => {
        //проверка ограничений слайдов ( если последний то первый, и обратно, 
        //если первый, то последний)
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        //Всем слайдам назначаем display: none;
        slides.forEach(item => {
            item.style = 'display:none';
            item.classList.remove('fadeIn');
        });

        //Только активному слайду назначаем display:block;
        slides[slideIndex - 1].style = 'display:block';
        slides[slideIndex - 1].classList.add('fadeIn');
    };
    const plusSlides = (n) => {
        showSlides(slideIndex += n);
    };

    const minusSlides = (n) => {
        showSlides(slideIndex -= n);
    };

    const render = () => {

        btnL.addEventListener('click', () => {
            plusSlides(1);
            showSlides(slideIndex);
            //console.log(this.slideIndex);
        });

        btnR.addEventListener('click', () => {
            minusSlides(1);
            showSlides(this.slideIndex);
            //console.log(this.slideIndex);
        });


        //Автоматическое пролистывание слайдера
        setInterval(() => {
            plusSlides(1);
            showSlides(slideIndex);
        }, 3000);


        // Если мы не кликаем кнопки ВПЕРЕД - НАЗАД, то показываем первый слайд.
        // При условии, что не работает автоматическое пролистование.

        showSlides(slideIndex);

    };

    render();
};


