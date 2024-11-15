'use strict';

//get modal and buttons
var openbutton = document.getElementById("submitty");
var closey = document.getElementsByClassName("closeButton")[0];
var modal = document.getElementsByClassName("modal")[0];

openbutton.onclick = function() {
    modal.classList.add("active");
}

// close button closes modal
closey.onclick = function() {
    modal.classList.add("shrinky");
    modal.classList.remove("active");
    setTimeout(deactivate, 310);
}
// clicking outside modal also closes
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.add("shrinky");
        modal.classList.remove("active");
        setTimeout(deactivate, 310);
    }
}

// reset after shrink animation
function deactivate() {
    modal.classList.remove("shrinky");
}