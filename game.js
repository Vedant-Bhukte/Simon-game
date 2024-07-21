var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var index=0;


function startOver() {
    level = 0;
    index = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function checkAns(currlevel){
    if(userClickedPattern[currlevel] === gamePattern[currlevel]){
        //console.log("success");
        currlevel++;
        if(level === currlevel){
            index=0;
            userClickedPattern=[];
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }else{
            index++;
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currColor){
    $("."+currColor).addClass("pressed");
    setTimeout(function() {
        $("."+currColor).removeClass("pressed");
    }, 100);
}
  


function nextSequence(){
    level++;
    $("h1").text("level "+level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}


$(".btn").on("click", function (event){
    var userChosenColour = this.id;
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAns(index);
});

$(document).on("keypress", function(event){
    if(level == 0){
        nextSequence();
    }
});
