document.getElementById('startButton').addEventListener('click', startRace);
document.getElementById('modeToggle').addEventListener('click', toggleMode);

let raceInterval;
let raceTimeRemaining;
const leaderboard = document.getElementById('leaderboard');
const timerDisplay = document.getElementById('timer');
let drivers = [
    { name: "Max Verstappen", position: 1 },
    { name: "Lewis Hamilton", position: 2 },
    { name: "Charles Leclerc", position: 3 },
    { name: "George Russell", position: 4 },
    { name: "Carlos Sainz", position: 5 },
    { name: "Sergio Perez", position: 6 },
    { name: "Lando Norris", position: 7 },
    { name: "Fernando Alonso", position: 8 },
    { name: "Oscar Piastri", position: 9 },
    { name: "Lance Stroll", position: 10 }
];
let yellowFlag = false;

function startRace() {
    raceTimeRemaining = 60;
    updateButton();
    updateTimerDisplay();
    updateResults();
    createCrashButtons();

    raceInterval = setInterval(() => {
        raceTimeRemaining--;
        updateTimerDisplay();
        checkCrash();
        if (!yellowFlag) {
            randomizePositions();
        }
        updateResults();

        if (raceTimeRemaining <= 0 || drivers.length <= 1) {
            clearInterval(raceInterval);
            document.getElementById("startButton").disabled = false;
            document.getElementById("startButton").textContent = "Restart Race";
        }
    }, 1000);
}

function randomizePositions() {
    drivers.forEach(driver => {
        if (Math.random() < 0.3) {
            const move = Math.floor(Math.random() * 3) - 1;
            const newPosition = driver.position + move;

            if (newPosition > 0 && newPosition <= drivers.length) {
                const otherDriver = drivers.find(d => d.position === newPosition);
                if (otherDriver) {
                    otherDriver.position = driver.position;
                    driver.position = newPosition;
                }
            }
        }
    });

    drivers.sort((a, b) =>
