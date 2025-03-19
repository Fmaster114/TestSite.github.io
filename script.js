const startRaceButton = document.getElementById('start-race');
const crashCarButtons = document.querySelectorAll('[id^="crash-car-"]');
const yellowFlagButton = document.getElementById('yellow-flag');
const redFlagButton = document.getElementById('red-flag');
const flagText = document.getElementById('flag-text');
const leaderboardList = document.getElementById('leaderboard-list');
const lightDarkModeButton = document.getElementById('light-dark-mode');
const timerDisplay = document.getElementById('timer');

let isDarkMode = false;
let flagStatus = '';
let raceStarted = false;
let timerInterval;
let timeLeft = 30; // Initial timer value

startRaceButton.addEventListener('click', () => {
    if (!raceStarted) {
        raceStarted = true;
        startRace();
    }
});

crashCarButtons.forEach(button => {
    button.addEventListener('click', () => {
        const carNumber = parseInt(button.id.split('-')[2]);
        crashCar(carNumber);
    });
});

yellowFlagButton.addEventListener('click', () => {
    setFlag('Yellow Flag');
});

redFlagButton.addEventListener('click', () => {
    setFlag('Red Flag');
});

lightDarkModeButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.querySelector('.control-panel').classList.toggle('dark-mode', isDarkMode);
    document.querySelectorAll('.leaderboard li').forEach(li => li.classList.toggle('dark-mode', isDarkMode));
});

function startRace() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;
