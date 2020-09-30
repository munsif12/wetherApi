window.onload = () => {
    var date = document.querySelector(".datecs");
    var time = document.querySelector(".timecs");
    var weekday = document.querySelector(".weekdaycs");
    const getCurrDay = () => {
        var d = new Date();
        var weekdays = new Array(7);
        weekdays[0] = "Sunday";
        weekdays[1] = "Monday";
        weekdays[2] = "Tuesday";
        weekdays[3] = "Wednesday";
        weekdays[4] = "Thursday";
        weekdays[5] = "Friday";
        weekdays[6] = "Saturday";
        var n = weekdays[d.getDay()];
        return n;
    }
    const getCurrMonth = () => {
        var d = new Date();
        let yearMonth = ["January", "Fabuary", "March", "Aprail", "May", "June", "July", "August", "September", "Octuber", "November", "December"];
        var res = yearMonth[d.getMonth()];
        return res;
    }
    date.innerHTML = `${getCurrDay()} , ${new Date().getDate()} ${getCurrMonth()}`;
    const getCurrTime = () => {
        let hours = new Date().getHours();
        let minutes = new Date().getMinutes();
        let sec = new Date().getSeconds();
        let MN = "am";
        if (hours > 11) {
            MN = "pm";
            if (houes > 12) {
                hours -= 12;
            }
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        time.innerHTML = `${hours}:${minutes}:${sec} ${MN}`;
    }

    // time.innerHTML = `${getCurrTime()}`;
    setInterval(getCurrTime, 1000);
    weekday.innerHTML = `${getCurrDay()}`;
}