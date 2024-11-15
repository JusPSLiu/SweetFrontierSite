'use strict';

const changeyDelay = 4000; // delay for the automatic carousel change
const swipeDelay = 6000; // delay for after manually selecting a carousel item to resume the automatic carousel change


const leftBtn = document.querySelector('.carouselbtn.left');
const rightBtn = document.querySelector('.carouselbtn.right');

const carouselItems = Array.from(document.querySelectorAll('.carouselItem'));
const navItems = Array.from(document.querySelectorAll('.nav-item'));
const CAROUSEL_SIZE = carouselItems.length;

leftBtn.addEventListener('click', clearSwipe);
rightBtn.addEventListener('click', clearSwipe);

var theLoop = null;


function clearSwipe(e) {
    clearLoop();
    swipe(e);
}

function swipe(e) {
    const currentCarouselItem = document.querySelector('.carouselItem.active');
    const currentIndex = carouselItems.indexOf(currentCarouselItem);

    let nextIndex;
    if (e.currentTarget.classList.contains('left')) {
        if (currentIndex === 0) nextIndex = CAROUSEL_SIZE - 1;
        else nextIndex = currentIndex - 1;
        //fancy entering/exiting on left or on right
        currentCarouselItem.children[0].classList.add('exitright');
        carouselItems[nextIndex].children[0].classList.add('enterleft');
        setTimeout(wipeAnimation, 405, currentIndex, nextIndex, 1);
    } else {
        if (currentIndex === CAROUSEL_SIZE - 1) nextIndex = 0;
        else nextIndex = currentIndex + 1;
        //fancy entering/exiting on left or on right
        currentCarouselItem.children[0].classList.add('exitleft');
        carouselItems[nextIndex].children[0].classList.add('enterright');
        setTimeout(wipeAnimation, 405, currentIndex, nextIndex, -1);
    }

    //set active
    carouselItems[nextIndex].classList.add('active');
    navItems[nextIndex].classList.add('active');

    currentCarouselItem.classList.remove('active');
    navItems[currentIndex].classList.remove('active');
}

navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        clearLoop();
        const currentCarouselItem = document.querySelector('.carouselItem.active');
        const currentIndex = carouselItems.indexOf(currentCarouselItem);

        if (currentIndex === index) return;

        item.classList.add('active');
        carouselItems[index].classList.add('active');

        currentCarouselItem.classList.remove('active');
        navItems[currentIndex].classList.remove('active');

        //fancy entering on left or on right
        if (currentIndex < index) {
            currentCarouselItem.children[0].classList.add('exitleft');
            carouselItems[index].children[0].classList.add('enterright');
            setTimeout(wipeAnimation, 405, currentIndex, index, -1);
        } else {
            currentCarouselItem.children[0].classList.add('exitright');
            carouselItems[index].children[0].classList.add('enterleft');
            setTimeout(wipeAnimation, 405, currentIndex, index, 1);
        }
    });
});


function wipeAnimation(currentIndex, nextIndex, direction) {
    if (direction < 0) {
        carouselItems[currentIndex].children[0].classList.remove('exitleft');
        carouselItems[nextIndex].children[0].classList.remove('enterright');
    } else {
        carouselItems[currentIndex].children[0].classList.remove('exitright');
        carouselItems[nextIndex].children[0].classList.remove('enterleft');
    }
}


theLoop = setInterval(function() {swipe({currentTarget : rightBtn});}, changeyDelay);

function clearLoop() {
    if (theLoop) {
        clearInterval(theLoop);
        clearTimeout(theLoop);
        theLoop = setTimeout(() => {theLoop = setInterval(function() {swipe({currentTarget : rightBtn});}, changeyDelay)}, swipeDelay);
    }
}