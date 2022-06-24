let timeInputBox = document.getElementById("timeInput")
let timerText = document.getElementById("timerText");

let lastTimeInput = 0

let audio = new Audio('ding.mp3');

let repeatTimeSeconds;
let isPaused = true;

let secondsPassed = 0;

let permission;
async function handlePermissions() {
    permission = await Notification.requestPermission();
    console.log(permission);
}

handlePermissions();

setInterval(function () {
    if (!isPaused) {
        secondsPassed++;
        if (secondsPassed == repeatTimeSeconds) {
            secondsPassed = 0;
            audio.play();
            if (permission == "granted") {
                let notification = new Notification("Interval Finished!");
            } else {
                console.log("Permission status: " + permission);
                console.log("Notification not allowed");
            }
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

// Buttons
let pauseButton = document.getElementById("pause");
let playButton = document.getElementById("play");

pauseButton.addEventListener('click', function (e) {
    isPaused = true;
});

playButton.addEventListener('click', function (e) {
    handle_play();
});

timeInputBox.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        handle_play();
    }
})

// Play functionality
function handle_play() {
    let input = timeInputBox.value;

    if (input != lastTimeInput) {
        secondsPassed = 0;
        let args = input.split(" ");

        if (args.length == 2) {
            repeatTimeSeconds = parseInt(args[0]) * 60 + parseInt(args[1]);
        } else {
            repeatTimeSeconds = parseInt(args[0]) * 60;
        }
        lastTimeInput = input;
    }

    isPaused = false;
}
