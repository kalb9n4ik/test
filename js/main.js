function stages() {
    let list = document.querySelector("[data-target='stages']");
    let listElems = document.querySelectorAll("[data-target='stage']");
    let prevBtn = document.querySelector("[data-action='stagesBtnLeft']"); 
    let nextBtn = document.querySelector("[data-action='stagesBtnRight']");
    let dotsContainer = document.querySelector("[data-target='stagesDots']");
    

    let widthImage = 335;
    let marginRight = 20;
    let count = 1 // видимое количество изображений
    let position = 0; // текущая позиция карусели

    let totalCards = listElems.length; //  кол-во карточек
    let width =  widthImage + marginRight;// ширина картинки + gap
    
    // Создание точек
    function createDots(container, count) {
        for (let i = 0; i < count; i++) {
          const dot = document.createElement('li');
          dot.classList.add('slider__dot')
          if (i === 0) dot.classList.add('slider__dot_active');
          container.appendChild(dot);
        }
      }

    // Обновление точек
    function updateDots(container, currentIndex) {
        const dots = container.querySelectorAll('.slider__dot');
        const activeIndex = Math.abs(currentIndex / width);
        dots.forEach(dot => dot.classList.remove('slider__dot_active'));
        dots[activeIndex].classList.add('slider__dot_active');
      }

    // Обновление видимости кнопок
    function updateButtons() {
        prevBtn.classList.toggle('slider__button-disabled', position === 0);
        nextBtn.classList.toggle('slider__button-disabled', position <= -(width * (listElems.length - count)));
    }
   
    // Функция для сдвига карусели
    function shiftCarousel(shift) {
        position += shift;
        position = Math.max(position, -(width * (listElems.length - count)));
        position = Math.min(position, 0);
        list.style.transform = `translateX(${position}px)`;
        updateButtons();
    }

    // Обработчики событий для кнопок
    prevBtn.onclick = function() {
        shiftCarousel(width);
        updateDots(dotsContainer, position)
    };

    nextBtn.onclick = function() {
        shiftCarousel(-width);
        updateDots(dotsContainer, position)
    };

    // Инициализация
    createDots(dotsContainer, totalCards);
    updateButtons();
}

function carouselPlayers() {
    
    let list = document.querySelector("[data-target='cards']");
    let listElems = document.querySelectorAll("[data-target='card']");
    let prevBtn = document.querySelector("[data-action='cardBtnLeft']"); 
    let nextBtn = document.querySelector("[data-action='cardBtnRight']");
    let lastVisibleElem = document.querySelector("[data-target='visibleCards']");
    let totalElems = document.querySelector("[data-target='totalCards']");

    let widthImage = Number(window.getComputedStyle(listElems[0]).width.match(/\d+/g)[0]);
    let marginRight = Number(window.getComputedStyle(listElems[0]).marginRight.match(/\d+/g)[0]);
    let widthCarousel = Number(window.getComputedStyle(list).width.match(/\d+/g)[0]);

    let width =  widthImage + marginRight;// ширина картинки + gap
    let count = Math.floor(widthCarousel / widthImage); // видимое количество изображений
    let position = 0; // текущая позиция карусели
    let interval = null;

    // Инициализация счетчиков
    lastVisibleElem.textContent = count;
    totalElems.textContent = listElems.length;

    // Обновление видимости кнопок
    function updateButtons() {
        prevBtn.classList.toggle('slider__button-disabled', position === 0);
        nextBtn.classList.toggle('slider__button-disabled', position <= -(width * (listElems.length - count)));
    }

    // Функция для сдвига карусели
    function shiftCarousel(shift) {
        position += shift;
        position = Math.max(position, -(width * (listElems.length - count)));
        position = Math.min(position, 0);

        list.style.transform = `translateX(${position}px)`;
        lastVisibleElem.textContent = Math.abs(position / width) + count;

        updateButtons();
    }

    // Обработчики событий для кнопок
    prevBtn.onclick = function() {
        stopAutoMove();
        shiftCarousel(width * Math.min(count, Math.abs(position / width)));
    };

    nextBtn.onclick = function() {
        stopAutoMove();
        let remainingElems = listElems.length - (Math.abs(position / width) + count);
        shiftCarousel(-width * Math.min(count, remainingElems));
    };

    function autoMoveCarousel() {
        let remainingElems = listElems.length - (Math.abs(position / width) + count);
        if (remainingElems <= 0) {
            position = width * (count - 1); // сбрасываем позицию для цикличности
            lastVisibleElem.textContent = 1; // сбрасываем счетчик видимых элементов
        }
        shiftCarousel(-width * Math.min(count, remainingElems));
    }

    function startAutoMove() {
        if (!interval) {
            interval = setInterval(autoMoveCarousel, 4000);
        }
    }

    function stopAutoMove() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    // Инициализация
    updateButtons();
    startAutoMove();
}

document.addEventListener('DOMContentLoaded', carouselPlayers);
document.addEventListener('DOMContentLoaded', stages);
