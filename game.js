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
            if(level === 10){
                playSound("victory");
                $("body").addClass("game-victory");
                setTimeout(function() {
                $("body").removeClass("game-victory");
                }, 200);

                $("h1").text("You Won!");
                $("h2").text("Click above to Restart");
                startOver();
            }else{
                index=0;
                userClickedPattern=[];
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }
        }else{
            index++;
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").html(`Game Over <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-emoji-frown-fill svg-icon" viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m-2.715 5.933a.5.5 0 0 1-.183-.683A4.5 4.5 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.5 3.5 0 0 0 8 10.5a3.5 3.5 0 0 0-3.032 1.75.5.5 0 0 1-.683.183M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8"/>
</svg> Click here to Restart`);

        $(".svg-icon").css({
            width: $("h1").css("font-size"),
            height: $("h1").css("font-size")
        });
        //$("h2").text("");
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
    if(level != 0){
        var userChosenColour = this.id;
        // console.log(userChosenColour);
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);

        animatePress(userChosenColour);

        checkAns(index);
    }
});

$("h1").on("click ", function(event){
    if(level == 0){
        $("h2").text("Reach level 10 to win !");
        nextSequence();
    }
});
