////////////business logic

//player logic
function Player(name) {
  this.name = name,
    this.turnScore = 0,
    this.totalScore = 0
}

//game logic
function Game() {
  this.players = [];
  this.currentId = 0,
    this.playerTurn = 1,
    this.gameOver = false
}

Game.prototype.addPlayer = function (player) {
  player.id = this.assignId();
  this.players.push(player);
}

Game.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
}

Game.prototype.animateDie = function (roll) {
  var rolNum = roll;

  if (rolNum === 6) {
    $("#dice").html("<p>*-----------*</p><p>*-----------*</p><p>*-----------*</p>");
  } else if (rolNum === 5) {
    $("#dice").html("<p>*-----------*</p><p>------*------</p><p>*-----------*</p>");
  } else if (rolNum === 4) {
    $("#dice").html("<p>*-----------*</p><p>-------------</p><p>*-----------*</p>");
  } else if (rolNum === 3) {
    $("#dice").html("<p>*------------</p><p>------*------</p><p>------------*</p>");
  } else if (rolNum === 2) {
    $("#dice").html("<p>*------------</p><p>-------------</p><p>------------*</p>");
  } else {
    $("#dice").html("<p>-------------</p><p>------*------</p><p>-------------</p>");
  }

}

Game.prototype.executeTurn = function (roll, turn) {
  var rollNumber = roll;
  var index = turn - 1;

  $("#rollDisplay").text(rollNumber);

  if (rollNumber !== 1) {
    this.players[index].turnScore += rollNumber;
    //alert(this.players[index].turnScore);
    $("#turnScorePlayer" + turn).text(this.players[index].turnScore);
  } else {
    this.players[index].turnScore = 0;
    this.endTurn(turn);

  }
}

Game.prototype.roll = function () {
  var number = Math.floor(Math.random() * 6) + 1;
  //console.log(number);
  return number;
}

Game.prototype.endTurn = function (turn) {
  var snd = new Audio("sounds/congratulations.mp3");
  var index = turn - 1;
  var holdPoints = this.players[index].turnScore;
  $("#dice").html("");
  this.players[index].totalScore += holdPoints;

  if (this.players[index].totalScore >= 20) {
    var modal = document.getElementById("myModal");
    var close = document.getElementById("close");
    snd.play();
    $("#reward").show();

    modal.style.display = "block";

    close.onclick = function () {
      modal.style.display = "none";
      window.location.reload();
    }
    $("#winnerName").text(this.players[index].name)

    $("#totalScorePlayer" + turn).text(this.players[index].totalScore);
  }

  $("#totalScorePlayer" + turn).text(this.players[index].totalScore);
  this.players[index].turnScore = 0;
  $("#turnScorePlayer" + turn).text(this.players[index].turnScore);

  this.changeTurn(turn);
}

Game.prototype.changeTurn = function (turn) {

  if (turn === 1) {
    this.playerTurn = 2;
  } else {
    this.playerTurn = 1;
  }
  var index = this.playerTurn - 1;
  $("#turnDisplay").text(this.players[index].name);

}

//only when player 1 or player 2 score reaches 100 after endTurn is executed
Game.prototype.gameOver = function () {

}

// user interface
$(document).ready(function () {
  $("#register").submit(function (event) {
    event.preventDefault();
    var pOneName = $("#playerOneName").val();
    var pTwoName = $("#playerTwoName").val();

    // if play against computer is chosen, pTwoName = computer and computerChosen = true
    // add computerChosen as a game parameter
    // if computerChosen === true, then when player turn === 2, game.animateDie game.executeTurn go twice

    var pOne = new Player(pOneName);
    var pTwo = new Player(pTwoName);
    var game = new Game();


    game.addPlayer(pOne);
    game.addPlayer(pTwo);

    $("#register").hide();
    $("#theHub").slideDown();

    $("#playerOneNameDisplay").text(pOne.name);
    $("#playerTwoNameDisplay").text(pTwo.name);
    $("#turnDisplay").text(pOne.name);

    console.log(pOne.name);
    console.log(pTwo.name);
    console.log(game);

    $("#rollButton").mousedown(function () {
      $("#dice").html('<p>########<p/><p>########<p/><p>########<p/>');
      //$("#dice").html('<div class="test" contenteditable><p class="smaller">########<p/><p class="smaller">########</p></div><svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs><filter id="squiggly-0"><feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="0"/><feDisplacementMap id="displacement" in="SourceGraphic" in2="noise" scale="6" /></filter><filter id="squiggly-1"><feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="1"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="8" /></filter><filter id="squiggly-2"><feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="2"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="6" /></filter><filter id="squiggly-3"><feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="3"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="8" /></filter><filter id="squiggly-4"><feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="4"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="6" /></filter></defs></svg>');



    });
    $("#rollButton").mouseup(function () {
      var roll = game.roll();
      var turn = game.playerTurn;
      game.animateDie(roll);
      game.executeTurn(roll, turn);

    });

    $("#endTurnButton").click(function () {
      var turn = game.playerTurn;
      game.endTurn(turn);

    });

  });

});