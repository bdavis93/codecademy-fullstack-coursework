let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:

const generateTarget = () => {
    return Math.floor(Math.random() * 10);
}


const compareGuesses = (user, computer, target) => {
    let userScore = Math.abs(user-target);
    let computerScore = Math.abs(computer - target);
    if (computerScore >= userScore) {
        return true;
    }  else {
        return false;
    } 
    }



const updateScore = (winner) => {
    if (winner === 'human') {
       humanScore = humanScore + 1;
    } else {
        computerScore = computerScore + 1;
    }
}

const advanceRound = () => {
    currentRoundNumber = currentRoundNumber + 1;
}

