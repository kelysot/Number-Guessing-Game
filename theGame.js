let game = { "min": 1, "max": 5 };

document.addEventListener("DOMContentLoaded", function () {
    game.output = document.querySelector(".output");
    game.message = document.querySelector(".message");
    game.guessInput = document.querySelector("input");
    game.btn = document.querySelector("button");
    game.btn.addEventListener("click", guessValue);

    init();
})

function init() {//The start of the game.
    game.guesses = 0;
    game.num = ranNumber(game.min, game.max);
    let tempMes = `Guess a number from ${game.min} to ${game.max}`;
    message(tempMes, "blue");
}

function ranNumber(min, max) { //Get a random number betweem range of min and max.
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function message(mes, clr) { //Receive a message with the requested color.
    game.message.innerHTML = mes;
    game.message.style.color = clr || "black";
    game.guessInput.style.borderColor = clr || "black";
    game.btn.style.backgroundColor = clr || "black";
    game.btn.style.color = "white";
}

function guessValue() {
    if (game.btn.classList.contains("continue")) {//Start again after success.
        game.btn.innerHTML = "Guess";
        game.guessInput.style.display = "block";
        game.btn.classList.remove("continue");
        init();
    }
    else {//The user hasn't guessed the number.
        game.guesses++;
        let tempGuess = game.guessInput.value;
        game.guessInput.value = "";
        tempGuess = parseInt(tempGuess);
        if (isNaN(tempGuess)) {//Check if the user typed a number
            message(`Please enter only numbers`, "red");
        }
        else if (tempGuess === game.num) {//Check if the user succeeded to guess the number.
            message(`Correct guess of the number ${game.num} in ${game.guesses} guesses! :) `, "green");
            gameOver();
        }
        else { //Send a message based on the value of the number that the user guessed.
            let holder = tempGuess > game.num ? 
            { "color": "turquoise", "message": "Is Lower" } : 
            { "color": "blueviolet", "message": "Is Higher" };
            message(holder.message, holder.color);
        }
    }
}
function gameOver() {//Increase the number range by 5 after success.
    game.btn.innerHTML = "Continue";
    game.guessInput.style.display = "none";
    game.btn.classList.add("continue");
    game.max += 5;
}

