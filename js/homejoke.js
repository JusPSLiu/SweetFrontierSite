"use strict";

const jokespot = document.getElementById("jokeyjokester");

async function getJoke() {
    try {
        // try getting a joke
        const response = await fetch("https://icanhazdadjoke.com/", {headers: {Accept: "application/json"}});
        const data = await response.json();

        // remove skeleton and show joke
        jokespot.classList.remove("skeleton");
        jokespot.textContent = data.joke;
    } catch (error) {
        // whelp, time to make up a joke
        // remove skeleton
        jokespot.classList.remove("skeleton");
        // this sounded funnier in my head
        jokespot.textContent = "Why did the Joey cross the road?";
        setTimeout(() => {
            jokespot.textContent += " Because his mother was shot at by the wizard";
            setTimeout(() => {
                jokespot.textContent += " - and the Joey was in her pouch!";
                setTimeout(() => {
                    jokespot.innerHTML += "<br><br>Alright, fine. I couldn't keep it secret forever. The joke API is down.";
                    setTimeout(() => {
                        jokespot.innerHTML += "<br>Or for whatever reason I can't access it.";
                        setTimeout(() => {
                            jokespot.innerHTML += " Anyway, have fun out here!";
                        }, 5000);
                    }, 4000);
                }, 4000);
            }, 2000);
        }, 2000);
    }
}

getJoke();