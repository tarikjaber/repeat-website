var repeatInterval = prompt("Enter repeat interval (minutes): ")

var args = repeatInterval.split(" ");
var repeatTimeSeconds;

if (args.length == 2) {
    repeatTimeSeconds = parseInt(args[0]) * 60 + parseInt(args[1]);
} else {
    repeatTimeSeconds = parseInt(args[0]) * 60;
}

console.log(repeatTimeSeconds);

var secondsPassed = 0;

setInterval(function () {
    secondsPassed++;
    if (secondsPassed == repeatTimeSeconds) {
        console.log("Repeat!");
        secondsPassed = 0;
    }
    var secondsLeft = repeatTimeSeconds - secondsPassed;
    var minutesLeft = Math.floor(secondsLeft / 60);
    var secondsLeft = secondsLeft % 60;
    var minutesString = String(minutesLeft).padStart(2, '0');
    var secondsString = String(secondsLeft).padStart(2, '0');
    document.title = `${minutesString}:${secondsString}`;
    console.log(`${minutesString}:${secondsString}`);
}, 1000);
