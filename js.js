// movie data base
const movies = [
    { name: "The Lion King", emojis: ["🦁 👑"] },
    { name: "Harry Potter", emojis: ["⚡️ 👓 🧙‍♂️"] },
    { name: "Frozen", emojis: ["❄️", "👸"] },
    { name: "Toy Story", emojis: ["🤠 🧸"] },
    { name: "Titanic", emojis: ["🚢 💔"] },
    { name: "Up", emojis: ["🎈 🏠"] },
    { name: "Batman", emojis: ["🦇 🃏"] },
    { name: "Zootopia", emojis: ["🐰 👮‍♂️"] },
    { name: "Star Wars", emojis: ["⚔️ 🚀 👽"] },
    { name: "Inside Out", emojis: ["🧠 😡"] }
];

let currentMovieIndex = 0;
let score = 0;
const maxQuestions = movies.length;

// DOM Elements
const emojiContainer = document.getElementById('emoji');
const guessInput = document.getElementById('guess');
const feedbackDiv = document.getElementById('feedback');
const correctAnswerDiv = document.getElementById('correctAnswer');
const gameForm = document.getElementById('gameForm');

// display the question
function showCurrentMovie() {
    const currentMovie = movies[currentMovieIndex];
    emojiContainer.textContent = currentMovie.emojis.join(' ');
    guessInput.value = '';
    guessInput.disabled = false;
    guessInput.focus();
    feedbackDiv.textContent = '';
    feedbackDiv.className = '';
    correctAnswerDiv.textContent = '';
    correctAnswerDiv.style.display = 'none';
}


// check the user's guess
function checkAnswer(guess) {
    const currentMovie = movies[currentMovieIndex];
    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedAnswer = currentMovie.name.toLowerCase();

    guessInput.disabled = true; // 👈 disable input during feedback

    if (normalizedGuess === normalizedAnswer) {
        score++;
        feedbackDiv.textContent = "Correct! ✅";
        feedbackDiv.className = "correct";
    } else {
        feedbackDiv.textContent = "Wrong! ❌";
        feedbackDiv.className = "incorrect";
        correctAnswerDiv.textContent = `The correct answer was: ${currentMovie.name}`;
        correctAnswerDiv.style.display = "block";
    }

    currentMovieIndex++;
    if (currentMovieIndex < maxQuestions) {
        setTimeout(showCurrentMovie, 2000);
    } else {
        setTimeout(endGame, 2000);

    }
}

// result screen
function endGame() {
    correctAnswerDiv.textContent = '';
    correctAnswerDiv.style.display = 'none';
    emojiContainer.textContent = "You've completed the game!";
    gameForm.style.display = "none";
    feedbackDiv.textContent = `Final Score: ${score}/${maxQuestions}`;
    feedbackDiv.style.fontSize = "1.5rem";

    if (score === maxQuestions) {
        feedbackDiv.textContent += " Perfect! 🏆";
    } else if (score >= maxQuestions * 0.7) {
        feedbackDiv.textContent += " Great job! 👍";
    } else {
        feedbackDiv.textContent += " Keep practicing! 💪";
    }

    // retry button
    document.getElementById('retrybutton').style.display = 'block';
}


// does not od anything until a character is typed
gameForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const guess = guessInput.value;
    if (guess.trim() !== '') {
        checkAnswer(guess);
    }
});

// to start the game
showCurrentMovie();


