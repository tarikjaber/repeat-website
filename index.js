var repeatInterval = prompt("Enter repeat interval (minutes): ")

var audio = new Audio('ding.mp3');

var args = repeatInterval.split(" ");
var repeatTimeSeconds;
var isPaused = false;

if (args.length == 2) {
    repeatTimeSeconds = parseInt(args[0]) * 60 + parseInt(args[1]);
} else {
    repeatTimeSeconds = parseInt(args[0]) * 60;
}

console.log(repeatTimeSeconds);

var secondsPassed = 0;

setInterval(function () {
    if (!isPaused) {
        secondsPassed++;
        if (secondsPassed == repeatTimeSeconds) {
            secondsPassed = 0;
            audio.play();
        }
        var secondsLeft = repeatTimeSeconds - secondsPassed;
        var minutesLeft = Math.floor(secondsLeft / 60);
        var secondsLeft = secondsLeft % 60;
        var minutesString = String(minutesLeft).padStart(2, '0');
        var secondsString = String(secondsLeft).padStart(2, '0');
        document.title = `${minutesString}:${secondsString}`;
    }
}, 1000);

// Buttons
var pauseButton = document.getElementById("pause");
var playButton = document.getElementById("play");

pauseButton.addEventListener('click', function (e) {
    isPaused = true;
});

playButton.addEventListener('click', function (e) {
    isPaused = false;
});
