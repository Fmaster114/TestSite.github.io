const crashCar1Button = document.getElementById('crash-car-1');
const crashCar2Button = document.getElementById('crash-car-2');
const crashCar3Button = document.getElementById('crash-car-3');
const crashCar4Button = document.getElementById('crash-car-4');
const crashCar5Button = document.getElementById('crash-car-5');
const crashCar6Button = document.getElementById('crash-car-6');
const crashCar7Button = document.getElementById('crash-car-7');
const crashCar8Button = document.getElementById('crash-car-8');
const crashCar9Button = document.getElementById('crash-car-9');
const crashCar10Button = document.getElementById('crash-car-10');
const crashCar11Button = document.getElementById('crash-car-11');
const crashCar12Button = document.getElementById('crash-car-12');
const crashCar13Button = document.getElementById('crash-car-13');
const crashCar14Button = document.getElementById('crash-car-14');
const crashCar15Button = document.getElementById('crash-car-15');
const yellowFlagButton = document.getElementById('yellow-flag');
const redFlagButton = document.getElementById('red-flag');
const flagText = document.getElementById('flag-text');
const leaderboardList = document.getElementById('leaderboard-list');
const lightDarkModeButton = document.getElementById('light-dark-mode');

let isDarkMode = false;
let flagStatus = '';

crashCar1Button.addEventListener('click', () => {
    crashCar(1);
});

crashCar2Button.addEventListener('click', () => {
    crashCar(2);
});

crashCar3Button.addEventListener('click', () => {
    crashCar(3);
});

crashCar4Button.addEventListener('click', () => {
    crashCar(4);
});

crashCar5Button.addEventListener('click', () => {
    crashCar(5);
});

crashCar6Button.addEventListener('click', () => {
    crashCar(6);
});

crashCar7Button.addEventListener('click', () => {
    crashCar(7);
});

crashCar8Button.addEventListener('click', () => {
    crashCar(8);
});

crashCar9Button.addEventListener('click', () => {
    crashCar(9);
});

crashCar10Button.addEventListener('click', () => {
    crashCar(10);
});

crashCar11Button.addEventListener('click', () => {
    crashCar(11);
});

crashCar12Button.addEventListener('click', () => {
    crashCar(12);
});

crashCar13Button.addEventListener('click', () => {
    crashCar(13);
});

crashCar14Button.addEventListener('click', () => {
    crashCar(14);
});

crashCar15Button.addEventListener('click', () => {
    crashCar(15);
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

function crashCar(carNumber) {
    const carItem = document.querySelector(`[data-car="${carNumber}"]`);
    if (carItem) {
        carItem.style.textDecoration = 'line-through';
        carItem.style.opacity = '0.5';
    }
}

function setFlag(flag) {
    flagStatus = flag;
    flagText.textContent = flagStatus;
    if (flag === 'Yellow Flag') {
        flagText.style.color = 'yellow';
    } else if (flag === 'Red Flag') {
        flagText.style.color = 'red';
    } else {
        flagText.style.color = '';
    }
}
