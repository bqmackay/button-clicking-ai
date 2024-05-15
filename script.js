let score = 0;
let pointsPerClick = 1;
let autoClickPoints = 0;

const scoreElement = document.getElementById('score');
const clickButton = document.getElementById('click-button');
const autoClickUpgradesElement = document.getElementById('auto-click-upgrades');
const userClickUpgradesElement = document.getElementById('user-click-upgrades');

// Check if elements are correctly selected
console.log('scoreElement:', scoreElement);
console.log('clickButton:', clickButton);
console.log('autoClickUpgradesElement:', autoClickUpgradesElement);
console.log('userClickUpgradesElement:', userClickUpgradesElement);

// Load upgrades from JSON file
fetch('http://localhost:3000/upgrades.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const autoClickUpgrades = data['auto-click-upgrades'];
        const userClickUpgrades = data['user-click-upgrades'];

        // Display auto-click upgrades
        autoClickUpgrades.forEach(upgrade => {
            const li = document.createElement('li');
            li.textContent = `${upgrade.name} (Cost: ${upgrade.cost}, Value: ${upgrade.value}/s)`;
            const button = document.createElement('button');
            button.textContent = 'Buy';
            button.onclick = () => buyAutoClickUpgrade(upgrade, li);
            li.appendChild(button);
            autoClickUpgradesElement.appendChild(li);
        });

        // Display user-click upgrades
        userClickUpgrades.forEach(upgrade => {
            const li = document.createElement('li');
            li.textContent = `${upgrade.name} (Cost: ${upgrade.cost}, Value: ${upgrade.value} points/click)`;
            const button = document.createElement('button');
            button.textContent = 'Buy';
            button.onclick = () => buyUserClickUpgrade(upgrade, li);
            li.appendChild(button);
            userClickUpgradesElement.appendChild(li);
        });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        console.error('Error details:', error);
    });

clickButton.addEventListener('click', () => {
    score += pointsPerClick;
    updateScore();
});

function updateScore() {
    scoreElement.textContent = score;
}

function buyAutoClickUpgrade(upgrade, listItem) {
    if (score >= upgrade.cost) {
        score -= upgrade.cost;
        autoClickPoints += upgrade.value;
        upgrade.cost = Math.ceil(upgrade.cost * 1.15); // Increase cost by 15%
        listItem.childNodes[0].textContent = `${upgrade.name} (Cost: ${upgrade.cost}, Value: ${upgrade.value}/s)`;
        updateScore();
    }
}

function buyUserClickUpgrade(upgrade, listItem) {
    if (score >= upgrade.cost) {
        score -= upgrade.cost;
        pointsPerClick += upgrade.value;
        upgrade.cost = Math.ceil(upgrade.cost * 1.15); // Increase cost by 15%
        listItem.childNodes[0].textContent = `${upgrade.name} (Cost: ${upgrade.cost}, Value: ${upgrade.value} points/click)`;
        updateScore();
    }
}

// Auto-click functionality
setInterval(() => {
    score += autoClickPoints;
    updateScore();
}, 1000);

// Function to trim intermediate steps
function trimIntermediateSteps() {
    // Logic to trim intermediate steps
    console.log("Trimming intermediate steps...");
}

// Check if trimIntermediateSteps is callable and call it
if (typeof trimIntermediateSteps === 'function') {
    trimIntermediateSteps();
}
