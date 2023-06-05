// selectors
const clock = document.querySelector('.center__clock');

// sync the clock
function syncClock() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();

    hh = hh < 10 ? '0' + hh : hh;
    mm = mm < 10 ? '0' + mm : mm;

    let time = hh + ':' + mm;
    clock.innerText = time;

    setTimeout(function () {
        syncClock();
    }, 1000);
}

// set background wallpaper

window.addEventListener('DOMContentLoaded', syncClock);
