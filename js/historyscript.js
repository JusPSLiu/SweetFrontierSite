"use strict";

const offsetty = 12; // offset for the content height

const revealerButtons = Array.from(document.querySelectorAll('.revealer'));
const root = document.documentElement;


revealerButtons.forEach((button) => {
    button.addEventListener('click', reveal);
});


function reveal(e) {
    let btn = e.target;
    let paragraph = btn.nextElementSibling;
    if (!paragraph) {
        btn = btn.parentElement;
        paragraph = btn.nextElementSibling;
    }

    if (paragraph.classList.contains('shown')) {
        paragraph.classList.remove('shown');
        btn.children[0].classList.remove('fa-angle-up');
        btn.children[0].classList.add('fa-angle-down');
    } else {
        root.style.setProperty('--content-height', (btn.nextElementSibling.scrollHeight+offsetty) + 'px');
        paragraph.classList.add('shown');
        btn.children[0].classList.remove('fa-angle-down');
        btn.children[0].classList.add('fa-angle-up');

        // hide other paragraphs
        revealerButtons.forEach((otherButton) => {
            if (otherButton !== btn) {
                let otherParagraph = otherButton.nextElementSibling;
                otherParagraph.classList.remove('shown');
                otherButton.children[0].classList.remove('fa-angle-up');
                otherButton.children[0].classList.add('fa-angle-down');
            }
        });
    }
}

// support window resizing :D
window.addEventListener('resize', () => {
    const accontent = document.querySelector('.detail.shown');
    if (!accontent) return;
    root.style.setProperty('--content-height', accontent.scrollHeight + 'px');
});