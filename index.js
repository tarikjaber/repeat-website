let repeatInterval = prompt("Enter repeat interval (minutes): ")

let audio = new Audio('ding.mp3');

let args = repeatInterval.split(" ");
let repeatTimeSeconds;
let isPaused = false;

if (args.length == 2) {
    repeatTimeSeconds = parseInt(args[0]) * 60 + parseInt(args[1]);
} else {
    repeatTimeSeconds = parseInt(args[0]) * 60;
}

console.log(repeatTimeSeconds);

let secondsPassed = 0;

setInterval(function () {
    if (!isPaused) {
        secondsPassed++;
        if (secondsPassed == repeatTimeSeconds) {
            secondsPassed = 0;
            audio.play();
        }
        secondsLeft = repeatTimeSeconds - secondsPassed;
        let minutesLeft = Math.floor(secondsLeft / 60);
        secondsLeft = secondsLeft % 60;
        let minutesString = String(minutesLeft).padStart(2, '0');
        let secondsString = String(secondsLeft).padStart(2, '0');
        document.title = `${minutesString}:${secondsString}`;
    }
}, 1000);

// Buttons
let pauseButton = document.getElementById("pause");
let playButton = document.getElementById("play");

pauseButton.addEventListener('click', function (e) {
    isPaused = true;
});

playButton.addEventListener('click', function (e) {
    isPaused = false;
});
