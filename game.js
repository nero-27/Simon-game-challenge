var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(document).keypress(function() {
    if (!gameStarted) {
            $("h1").text("Level "+ level);
            nextSequence();
            gameStarted = true;
        }
    })

$(".btn").click(function() {
    var userChosenColour  = $(this).attr("id");
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
})

function nextSequence() {
    
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level)
    var rn = Math.floor(Math.random() * (4))
    var randomChosenColor = buttonColors[rn]
    gamePattern.push(randomChosenColor)
    var id = "#"+randomChosenColor
    $(id).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("./sounds/"+name +".mp3");
    audio.play();
}


function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed")
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed")
    }, 100)
}


function checkAnswer(currentLevel) {
    console.log(gamePattern)
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }
    }
    else {
        playSound("wrong")
        $("h1").text("Game Over, Press Any Key to restart")
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200)
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = []
    started = 0;
}