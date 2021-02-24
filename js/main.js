window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    ibg();
    scrollHeader();
    burger();
    lineActive();
    scrolling();
    widgetOn();
    slider('.wedo__sliders', '.wedo__sliders__item', '.wedo__sliders__previous', '.wedo__sliders__next');
    slider('.work__sliders', '.work__sliders__item', '.work__sliders__previous', '.work__sliders__next');
    showMoreStyles('.footer-instagram__linck', '.footer-instagram__grid', '..//foto.json');

});


/* Header */
const ibg = () => {

    let ibg = document.querySelectorAll(".ibg");

    ibg.forEach((item, i) => {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    });
};

//ibg();

//При скоулинге сайта header делается маленьким и прижимается к верху.

const scrollHeader = () => {
    const header = document.querySelector('.header__body');

    window.addEventListener('scroll', () => {
        if (window.scrollY >= 2) {
            header.classList.add('block');
        } else {
            header.classList.remove('block');
        }
    });
};

//scrollHeader();

const burger = () => {

    let burger = document.querySelector('.header__burger'),
        menu = document.querySelector('.header__menu'),
        links = document.querySelectorAll('.menu__link'),
        body = document.querySelector('body');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
        body.classList.toggle('lock');
    });

    //Закрытие Хедер с сылками по клику на ссылку 
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (e.target) {
                e.preventDefault();
            }
            burger.classList.toggle('active');
            menu.classList.toggle('active');
            body.classList.toggle('lock');
        });
    });

};
//burger();

//Окрашивание ссылок Link выбранного раздела
const lineActive = () => {
    let header = document.querySelector('.header__menu'),
        active = document.querySelectorAll('.menu__link');

    function hideActive() {
        active.forEach(item => {
            item.classList.remove('activeNav');
        });
    }

    function showActive(i = 0) {
        active[i].classList.add('activeNav');
    }

    header.addEventListener('click', (e) => {
        const target = e.target;

        if (target && (target.classList.contains('menu__link'))) {

            active.forEach((item, i) => {
                if (target == item || target.parentNode == item) {
                    hideActive();
                    showActive(i);
                }
            });
        }
    });

    /*-Вешает активный элемент ссылки Link при скроулинге-*/
    //на все секции, куда ссылаются ссылки NAV BAR Link, устанавливаем класс: '.contentActiv'
    //пример: <section id="about" class="about contentActiv">

    let contents = document.querySelectorAll('.contentActiv');

    function scrollActiv() {
        contents.forEach((content, i) => {
            let contentOfsetTop = content.offsetTop;
            if (window.scrollY >= contentOfsetTop + -10) {
                hideActive();
                showActive(i);
            }
        });
    }
    window.addEventListener('scroll', scrollActiv);
};

/*- Медленный скроулинг по документу-*/
const scrolling = () => {
    // Scrolling with raf

    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.3;

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock));

                document.documentElement.scrollTo(0, r);

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });
};
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



/* Footer */
//
// Строит дополнительные карточки (фото, карточки товара и т.д.) 
//из файла .json метод GET по нажатию кнопки.
//
const showMoreStyles = (trigger, wrapper, url) => {
    const btn = document.querySelector(trigger);
    
    //запрос GET на сервер 
    const getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    //Обработка промиса
    btn.addEventListener('click', function () { //стрелочную функцию ghbvtyznm нельзя, так как не сработает this
        getResource(url)
            .then(res => createCards(res.сards)) //промис масива .cards в файле .json
            .catch(error => alert.log(error));
        this.remove();
    });

    //При нажатии на тригер (кнопку) формируем новые карточки
    function createCards(response) {
        response.forEach(({
            src
        }) => {
            let card = document.createElement('div');
            card.classList.add('footer-instagram__img', 'fadeInUp');
            card.innerHTML = `
                    <img src=${src} alt=${src}>
            `;
            document.querySelector(wrapper).appendChild(card);
            document.querySelector(wrapper).style.marginBottom = '30px';
        });
    }
};

