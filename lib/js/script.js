// selectors
const clock = document.querySelector(".center__clock");
const settingsBtn = document.querySelector(".settings__button");
const settingsPanel = document.querySelector(".settings__panel");
const clockStyleToggle = document.querySelector("#clock__style__toggle");
const showSearchToggle = document.querySelector("#show__search__toggle");
const bgBlurToggle = document.querySelector("#bg__blur__toggle");

// global variables
let clockId;
let clockInitiated = false;
let nowMinutes = new Date().getMinutes();
let amPmEnabled = false;

// sync the clock
function syncClock({ instant } = {}) {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();

    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;

    let time;

    if (amPmEnabled) {
        const suffix = hh > 12 ? " PM" : " AM";
        hh = hh > 12 ? hh - 12 : hh;
        time = hh + ":" + mm + suffix;
    } else {
        time = hh + ":" + mm;
    }

    if (!clockInitiated || mm !== nowMinutes || instant) {
        clock.innerText = time;
        clockInitiated = true;
        nowMinutes = mm;
    }

    clockId = setTimeout(function () {
        syncClock();
    }, 1000);
}

// show/hide settings panel
function toggleSettingsPanel() {
    settingsPanel.classList.toggle("show");
}

// toggle 24 hour clock style
function toggleClockStyle() {
    amPmEnabled = !amPmEnabled;
    localStorage.setItem("am_pm_enabled", amPmEnabled);
    clearTimeout(clockId);
    syncClock({ instant: true });
}

// initial setup
function initSetup() {
    // clock setup
    if (localStorage.getItem("am_pm_enabled") !== undefined) {
        amPmEnabled = localStorage.getItem("am_pm_enabled") === "true";
    } else {
        localStorage.setItem("am_pm_enabled", false);
    }
    clockStyleToggle.checked = !amPmEnabled;
    syncClock();
}

// event listeners
window.addEventListener("DOMContentLoaded", initSetup);
settingsBtn.addEventListener("click", toggleSettingsPanel);
clockStyleToggle.addEventListener("change", toggleClockStyle);
