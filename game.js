
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

// First time keydown---------
$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Button clicks-------
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
});

// Playing sounds---------
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Button animations----------
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100)

}

// here I am triggering next sequence--------
function nextSequence() {
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

// Checking answers---------
function checkAnswer(currentLevel) {
// checking if the last button clicked is right-----
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
// setting a variable to count how many colours user got right-------
        var count = 0;
        //Loop through the two arrays, and comparing each value is same as the other-------
        for (var i = 0; i < gamePattern.length; i++) {
            if (userClickedPattern[i] == gamePattern[i]) {
                // if both values matches then increase count --------
                count++;
            }
        }
        // only if the count is same as the gamePattern length------
        // i.e each one of the colours was right----  
        if (count == gamePattern.length) {
            console.log("Success");
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    // otherwise, it's wrong and trigger game over-----  
    else {
        console.log("Wrong");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        // $("h1").text("Your Score is: "+(level-1));
        startOver();
       
    }
}
// Reseting variables-------
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}