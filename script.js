document.getElementById('startButton').addEventListener('click', startRace);

let raceInterval;
let raceTimeRemaining;
const leaderboard = document.getElementById('leaderboard');
const timerDisplay = document.getElementById('timer');

function startRace() {
    const drivers = [
        "Max Verstappen", "Lewis Hamilton", "Charles Leclerc",
        "George Russell", "Carlos Sainz", "Sergio Perez",
        "Lando Norris", "Fernando Alonso", "Oscar Piastri",
        "Lance Stroll"
    ];

    raceTimeRemaining = 60;
    updateButton();
    updateTimerDisplay();

    raceInterval = setInterval(() => {
        raceTimeRemaining--;
        updateResults(drivers);
        updateTimerDisplay();

        if (raceTimeRemaining <= 0) {
            clearInterval(raceInterval);
            document.getElementById("startButton").disabled = false;
            document.getElementById("startButton").textContent = "Restart Race";
        }
    }, 1000);
}

function updateResults(drivers) {
    leaderboard.innerHTML = "";
    const shuffledDrivers = [...drivers].sort(() => Math.random() - 0.5);

    shuffledDrivers.forEach((driver, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${driver}`;
        leaderboard.appendChild(listItem);
    });
}

function updateButton() {
    const startButton = document.getElementById('startButton');
    startButton.disabled = true;
    startButton.textContent = `Race in progress`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = `${raceTimeRemaining}s`;
}
