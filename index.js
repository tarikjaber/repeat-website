let timeInputBox = document.getElementById("timeInput")
let timerText = document.getElementById("timerText");

let lastTimeInput = 0

let audio = new Audio('ding.mp3');

let repeatTimeSeconds;
let isPaused = true;

let secondsPassed = 0;

let permission;

timeInputBox.focus()

window.addEventListener('load', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const intervalParam = urlParams.get('interval');
    if (intervalParam !== null && !isNaN(intervalParam)) {
        timeInputBox.value = intervalParam;
        play();
    }
})

/* ----------------- Handling Permissions for Notifications ----------------- */
async function handlePermissions() {
    permission = await Notification.requestPermission();
    console.log(permission);
}

handlePermissions();

/* ---------------------------------- Timer --------------------------------- */
function notification() {
    audio.play();
    if (permission == "granted") {
        new Notification("Interval Finished!");
    } else {
        console.log("Permission status: " + permission);
        console.log("Notification not allowed");
    }
}


setInterval(function () {
    if (!isPaused) {
        secondsPassed++;
        if (secondsPassed == repeatTimeSeconds) {
            secondsPassed = 0;
            notification();
        }
        secondsLeft = repeatTimeSeconds - secondsPassed;
        let minutesLeft = Math.floor(secondsLeft / 60);
        secondsLeft = secondsLeft % 60;
        let minutesString = String(minutesLeft).padStart(2, '0');
        let secondsString = String(secondsLeft).padStart(2, '0');
        let timeString = minutesString + ":" + secondsString;
        document.title = timeString;
        timerText.innerText = timeString;
    }
}, 1000);

function pause() {
    button.classList.remove("pause");
    button.classList.add("play");
    button.innerText = "Play";
    isPaused = true;
}

function play() {
    button.classList.remove("play");
    button.classList.add("pause");
    button.innerText = "Pause";
    handle_play();
    isPaused = false;
}

function toggle() {
    if (timeInputBox.value == "") {
        alert("Please enter a valid interval.")
        return;
    }
    if (isPaused) {
        play()
    } else {
        pause()
    }
}

/* --------------------------------- Buttons -------------------------------- */
let button = document.getElementsByTagName("button")[0];

button.addEventListener("click", function (e) {
    toggle()
});

/* -------------------------- Time Input Box Enter -------------------------- */
timeInputBox.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        toggle()
    } else {
        pause()
    }
})

/* --------------------------- Play Functionality --------------------------- */
function handle_play() {
    let input = timeInputBox.value;

    let paddedInput = input.padStart(4, '0');

    let minutes = paddedInput.slice(0, 2);
    let seconds = paddedInput.slice(2, 4);


    newInterval = Number(minutes) * 60 + Number(seconds);

    if (newInterval > 6000) {
        newInterval = 6000;
    }

    if (newInterval > 0) {
        secondsPassed = 0;
        repeatTimeSeconds = newInterval;
    } else {
        alert("An interval of 0 seconds is not allowed. Please enter a valid interval.")
    }

    lastTimeInput = input;
}
