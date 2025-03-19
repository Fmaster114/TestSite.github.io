const crashCarButtons = document.querySelectorAll('[id^="crash-car-"]');
const leaderboardList = document.getElementById('leaderboard-list');
const lightDarkModeButton = document.getElementById('light-dark-mode');

let isDarkMode = true; // Default to dark mode
let raceInterval;

function startRace() {
    raceInterval = setInterval(() => {
        moveCars();
    }, 2000); // Adjust speed as needed
}

function moveCars() {
    const listItems = Array.from(leaderboardList.children);
    for (let i = 0; i < listItems.length; i++) {
        const randomMove = Math.random();
        if (randomMove < 0.2) { // 20% chance to move
            if (i > 0) {
                leaderboardList.insertBefore(listItems[i], listItems[i - 1]);
            }
        }
    }
}

crashCarButtons.forEach(button => {
    button.addEventListener('click', () => {
        const carNumber = parseInt(button.id.split('-')[2]);
        crashCar(carNumber);
    });
});

function crashCar(carNumber) {
    const carItem = document.querySelector(`[data-car="${carNumber}"]`);
    if (carItem) {
        carItem.classList.add('crashed');
        setTimeout(() => {
            carItem.classList.remove('crashed');
        }, 10000); // 10 seconds
    }
}

lightDarkModeButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.querySelector('.control-panel').classList.toggle('dark-mode', isDarkMode);
    document.querySelectorAll('.leaderboard li').forEach(li => li.classList.toggle('dark-mode', isDarkMode));
});

startRace();
