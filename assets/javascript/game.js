$(document).ready(function() {
    //////////////////////////////////////////////////////////////////
    // VARIABLES /////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////

    // initialize the array of crystals. If more crystals are added, update this array accordingly
    var crystalArray = ["blue", "yellow", "red", "green"];

    // initialize variables that carry over round to round
    var wins;
    var losses;
    var gamesPlayed;

    // initialize variables for each round
    var currentScore;
    var currentTarget;

    //////////////////////////////////////////////////////////////////
    // FUNCTIONS /////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////

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

    // set the random number the user is trying to get;
    function setGuessNumber() {
        currentTarget = Math.floor(Math.random() * (120 - 19 + 1) + 19);
        console.log(currentTarget);
    }

    // clear out current score;
    function clearScore() {
        currentScore = 0;
    }

    // create a function that prints wins, losses, games played, and the target score;
    function printVals() {
        $("#wins").html(wins);
        $("#losses").html(losses);
        $("#gamesplayed").html(gamesPlayed);
        $("#targetnum").html(currentTarget);
        $("#playerscore").html(currentScore);
    }

    // create a function that calls all the reset variables
    function setRound() {
        setCrystalValue();
        setGuessNumber();
        clearScore();
        printVals();
        $("#gameendtext").hide();
        // $("#resetbutton").hide();
    }

    // create a function that initializes the game upon page refresh
    function setGame() {
        wins = 0;
        losses = 0;
        gamesPlayed = 0;
        setRound();
    }

    // check for win/loss
    function checkGameEnd() {
        if (currentScore === currentTarget) {
            wins++;
            gamesPlayed++;
            $("#gameendtext").show();
            $("#roundendtext").html("Congratulations! You win!");
            // $("#resetbutton").show();
            printVals();
        } else if (currentScore > currentTarget) {
            losses++;
            gamesPlayed++;
            $("#gameendtext").show();
            $("#roundendtext").html("Too bad :c You lost");
            // $("#resetbutton").show();
            printVals();
        }
    }

    //////////////////////////////////////////////////////////////////
    // GAME //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////

    // set the initial variables and prep the game for being played
    setGame();

    // when user clicks on a crystal, grab the value, add it to the current score, and check to see if the game should end
    $(".crystal").on("click", function() {
        // only run this as long as currentScore from user is below the current Target number
        if (currentScore < currentTarget) {
            var dataval = $(event.target).attr("data-value");

            currentScore += parseInt(dataval);

            $("#playerscore").html(currentScore);

            checkGameEnd();
        }
    });

    // on clicking on the rest button: reset the game
    $("#resetbutton").on("click", function() {
        setRound();
    });
});
