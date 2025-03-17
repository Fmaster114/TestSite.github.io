document.getElementById('startButton').addEventListener('click', startRace);

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

function startRace() {
    raceTimeRemaining = 60;
    updateButton();
    updateTimerDisplay();
    updateResults();

    raceInterval = setInterval(() => {
        raceTimeRemaining--;
        updateTimerDisplay();
        randomizePositions();
        updateResults();

        if (raceTimeRemaining <= 0) {
            clearInterval(raceInterval);
            document.getElementById("startButton").disabled = false;
            document.getElementById("startButton").textContent = "Restart Race";
        }
    }, 1000);
}

function randomizePositions() {
    drivers.forEach(driver => {
        if (Math.random() < 0.3) { // 30% chance to move
            const move = Math.floor(Math.random() * 3) - 1; // Move -1, 0, or 1 positions
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

    drivers.sort((a, b) => a.position - b.position); // Sort by position
}

function updateResults() {
    leaderboard.innerHTML = "";
    drivers.forEach(driver => {
        const listItem = document.createElement('li');
        listItem.textContent = `${driver.position}. ${driver.name}`;
        leaderboard.appendChild(listItem);
    });

    // Add 'moving' class to list items that changed position
    const listItems = leaderboard.querySelectorAll('li');
    drivers.forEach((driver, index) => {
        if (listItems[index] && listItems[index].textContent !== `${driver.position}. ${driver.name}`) {
            listItems[index].classList.add('moving');
            setTimeout(() => {
                listItems[index].classList.remove('moving');
            }, 300); // Remove class after animation
        }
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
