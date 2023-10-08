
// global variable declaration
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level =0;
var gameStarted = false;




// function that start the game when any key is pressed , can only be active if the game is not started
$(document).keypress(function (){

    if(gameStarted == false){
        $("h1").text("level 0");
        nextSequence();
    }

    gameStarted = true;
    

})



//function that give the next color in the sequence (game pattern)
function nextSequence(){

    randomNumber = Math.round(Math.random() * 3);
    randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level++;
    
    $("h1").text("level "+level);

    userClickedPattern = [];

    
}



//function that takes the user input (click) and compare it to the game pattern
$(".btn").click(function (event){

if(gameStarted == true){
    userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    chekAnswer(userClickedPattern);


}

});


//function that play the sound of the given color
function playSound(name){

    var sound = new Audio("./sounds/"+ name +".mp3");
    sound.play();
}

//function that add animation to the given color
function animatePress(currentColour){


    $("."+currentColour).addClass("pressed");
    setTimeout(() => {  $("."+currentColour).removeClass("pressed"); }, 100);

}


//function that compare the user input with the game pattern used in the click function
function chekAnswer(userClickedPattern){


    var c =0;


    for(var i=0; i < userClickedPattern.length; i ++){
        c++;
        if (userClickedPattern[i] != gamePattern[i]){
            gameOver();
        }
    }


    if(c == gamePattern.length){
        setTimeout(() => {  nextSequence() }, 500);
    }


}

//function that ends the game and restart all the variables
function gameOver(){


    gamePattern = [];
    userClickedPattern = [];
    level =0;
    gameStarted = false;
    var sound = new Audio("./sounds/wrong.mp3");

    $("h1").text("Game Over");
    $("body").addClass("game-over");
    
    
    sound.play();
    setTimeout(() => {  $("body").removeClass("game-over"); }, 300);
}



