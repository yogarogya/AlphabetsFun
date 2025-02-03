let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let shuffledLetters = [];
let selectedLetters = [];
let levelInterval;
let stopwatchInterval;
let time = 0;

function startGame() {
    document.getElementById("message").textContent = "";
    selectedLetters = [];
    document.getElementById("selectedBox").innerHTML = "";
    shuffledLetters = shuffleArray([...alphabet]);
    displayLetters();
    resetStopwatch();
    startStopwatch();
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function displayLetters() {
    let alphabetBox = document.getElementById("alphabetBox");
    alphabetBox.innerHTML = "";
    shuffledLetters.forEach(letter => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.classList.add("letter");
        span.style.backgroundColor = getRandomColor();
        span.onclick = () => selectLetter(letter, span);
        alphabetBox.appendChild(span);
    });
}

function selectLetter(letter, element) {
    let correctIndex = selectedLetters.length;
    if (letter !== alphabet[correctIndex]) {
        alert("Wrong selection: " + letter);
        return;
    }
    selectedLetters.push(letter);
    document.getElementById("selectedBox").appendChild(element);
    element.onclick = null;
    checkWin();
}

function checkWin() {
    let correctSequence = alphabet.slice(0, selectedLetters.length).join("");
    let selectedSequence = selectedLetters.join("");
    if (selectedLetters.length === alphabet.length) {
        document.getElementById("message").textContent = selectedSequence === correctSequence ? "You are the Winner!" : "Try Again!";
    }
}

function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setLevel(intervalTime) {
    clearInterval(levelInterval);
    levelInterval = setInterval(() => {
        shuffledLetters = shuffleArray([...alphabet]);
        displayLetters();
    }, intervalTime);
}

function startStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = setInterval(() => {
        time++;
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        document.getElementById("stopwatch").textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }, 1000);
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    time = 0;
    document.getElementById("stopwatch").textContent = "0:00";
}

function stopGame() {
    clearInterval(stopwatchInterval);
    clearInterval(levelInterval);
}