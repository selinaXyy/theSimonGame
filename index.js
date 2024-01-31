var btnColors = ['red','green','blue','yellow'];

var gamePattern = [];
var userClickedPattern = [];

var clicked = false;
var level = 0;

$(document).on("keydown",function(){
  if(!clicked){
    nextSequence();
    clicked = true;
  }
})

$('.btn').click(function(event){
  var userChosenColor = event.target.id;

  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentIndex){
  if(userClickedPattern[currentIndex] === gamePattern[currentIndex]){
    console.log('success');

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(nextSequence,1000);
    }
  }
  else{
    console.log('wrong');
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over');
    },200);
    $('#level-title').text('Game Over, Press Any Key to Restart');

    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  clicked = false;
}

function animatePress(btnColor){
  $('#'+btnColor).addClass("pressed");
  setTimeout(function(){
    $('#'+btnColor).removeClass("pressed")
  },100);
}

function playSound(name){
  var audio = new Audio('sounds/'+name+".mp3");
  audio.play();
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level '+level);
  
  var randNum = Math.floor(Math.random()*4);
  var randChosenColor = btnColors[randNum];
  gamePattern.push(randChosenColor);
  $("#"+randChosenColor).fadeOut(150).fadeIn(150);
  playSound(randChosenColor);
}


