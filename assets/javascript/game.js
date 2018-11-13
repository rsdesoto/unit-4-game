var crystalArray = ["blue", "yellow", "red", "green"];

var wins;
var losses;
var gamesPlayed;

var currentScore;
var currentTarget;

// set the random values for the crystals
function setCrystalValue() {
    for (i = 0; i < crystalArray.length; i++) {
        // create a random number between 1 - 12
        crysVal = Math.floor(Math.random() * 12 + 1);

        // get the crystal ID
        crystal = $("#" + crystalArray[i]);
        console.log(crystal.attr("class"));

        // assign the random number to the crystal as data-value
        crystal.attr("data-value", crysVal);
        console.log(crystal.attr("data-value"));
    }
}

setCrystalValue();

// set the random number the user is trying to get;
function setGuessNumber() {
    currentTarget = Math.floor(Math.random() * (120 - 19 + 1) + 19);
    console.log(currentTarget);
}

setGuessNumber();

// clear out current score;
function clearScore() {
    currentScore = 0;
}

clearScore();

// create a function that calls all the reset variables
function setRound() {
    setCrystalValue();
    setGuessNumber();
    clearScore();
    $("#roundendtext").hide();
    $("#resetbutton").hide();
}

// create a function that initializes the game upon page refresh
function setGame() {
    wins = 0;
    losses = 0;
    gamesPlayed = 0;
    setRound();
}

setGame();

// create a function that prints wins, losses, games played, and the target score;
function printVals() {
    $("#wins").html(wins);
    $("#losses").html(losses);
    $("#gamesplayed").html(gamesPlayed);
    $("#targetnum").html(currentTarget);
    $("#playerscore").html(currentScore);
}

// check for win/loss
function checkGameEnd() {
    if (currentScore < currentTarget) {
        // nothing: keep playing
    } else if (currentScore === currentTarget) {
        wins++;
        $("#roundendtext").show();
        $("#roundendtext").html("Congratulations! You win!");
        $("#resetbutton").show();
    } else if (currentScore > currentTarget) {
        losses++;
        $("#roundendtext").show();
        $("#roundendtext").html("Too bad :c You lost");
        $("#resetbutton").show();
    }
}

// on click: get the data value of the crystal clicked on, add to user score, and check for win/lose condition
$(".crystal").on("click", function() {
    // only run this as long as currentScore from user is below the current Target number
    if (currentScore < currentTarget) {
        var dataval = $(event.target).attr("data-value");
        console.log(dataval);
        currentScore += parseInt(dataval);
        console.log(currentScore);
        $("#playerscore").html(currentScore);

        checkGameEnd();
    }
});

// on click: reset the game
$("#resetbutton").on("click", function() {
    setRound();
    printVals();
});
