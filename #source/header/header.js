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