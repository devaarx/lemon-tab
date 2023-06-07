// selectors
const clock = document.querySelector(".center__clock");
const settingsBtn = document.querySelector(".settings__button");
const settingsPanel = document.querySelector(".settings__panel");

// global variables
let clockInitiated = false;
let nowMinutes = new Date().getMinutes();

// sync the clock
function syncClock() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();

    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    let time = hh + ":" + mm;

    if (!clockInitiated || mm !== nowMinutes) {
        clock.innerText = time;
        clockInitiated = true;
        nowMinutes = mm;
    }

    setTimeout(function () {
        syncClock();
    }, 1000);
}

// show/hide settings panel
function toggleSettingsPanel() {
    settingsPanel.classList.toggle("show");
}

// event listeners
window.addEventListener("DOMContentLoaded", syncClock);
settingsBtn.addEventListener("click", toggleSettingsPanel);
