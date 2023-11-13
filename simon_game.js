
const buttonColors=["red","blue","green","yellow"];
let gamePattern=[];
let level=0,started=false;
let userClickedPattern=[];
$(document).keydown(function (e) { 
    if(!started){
        nextSequence();
        started=true;
    }
});

function playSound(name) {
    let audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function nextSequence(){
    level++;
    $("#level-title").text("Level : "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    userClickedPattern=[];
}


function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}
function wrong() {
    level=0;
    gamePattern=[];
    $("#level-title").text("Game Over.Press any key to restart");
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    started=false;
    playSound("wrong");
}
function checkAnswer(idx) {
    if(gamePattern[idx] == userClickedPattern[idx])
    {
        if(userClickedPattern.length == gamePattern.length)
        {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else
        wrong();
}
$(".btn").click(function (e) { 
    if(started)
    {
        let userclickedColor=this.id;
        userClickedPattern.push(userclickedColor);
        playSound(userclickedColor);
        animatePress(userclickedColor);
        checkAnswer(userClickedPattern.length-1);
    }
});

