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

    drivers.sort((a, b) => a.position - b.position);
}

function checkCrash() {
    if (Math.random() < 1 / 32 && drivers.length > 1) {
        const crashedDriverIndex = Math.floor(Math.random() * drivers.length);
        crashDriver(crashedDriverIndex);
    }
}

function crashDriver(index) {
    if (index >= 0 && index < drivers.length) {
        const crashedDriver = drivers.splice(index, 1)[0];
        console.log(`${crashedDriver.name} crashed!`);
        yellowFlag = true;
        setTimeout(() => {
            yellowFlag = false;
        }, 5000);
    }
}

function updateResults() {
    leaderboard.innerHTML = "";
    drivers.forEach(driver => {
        const listItem = document.createElement('li');
        listItem.textContent = `${driver.position}. ${driver.name}`;
        leaderboard.appendChild(listItem);
    });

    const listItems = leaderboard.querySelectorAll('li');
    drivers.forEach((driver, index) => {
        if (listItems[index] && listItems[index].textContent !== `${driver.position}. ${driver.name}`) {
            listItems[index].classList.add('moving');
            setTimeout(() => {
                listItems[index].classList.remove('moving');
            }, 300);
        }
    });

    if (yellowFlag) {
        timerDisplay.textContent += " (Yellow Flag)";
        timerDisplay.classList.add('yellow-flag');
    } else {
        timerDisplay.classList.remove('yellow-flag');
    }
}

function updateButton() {
    const startButton = document.getElementById('startButton');
    startButton.disabled = true;
    startButton.textContent = `Race in progress`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = `${raceTimeRemaining}s`;
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
    const modeButton = document.getElementById("modeToggle");
    if (document.body.classList.contains('dark-mode')) {
        modeButton.textContent = "Light Mode";
    } else {
        modeButton.textContent = "Dark Mode";
    }
}

function createCrashButtons() {
    const crashButtonsDiv = document.getElementById('crashButtons');
    crashButtonsDiv.innerHTML = "";
    drivers.forEach((driver, index) => {
        const button = document.createElement('button');
        button.textContent = `Crash ${driver.name}`;
        button.addEventListener('click', () => crashDriver(index));
        crashButtonsDiv.appendChild(button);
    });
}
