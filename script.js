const names = [
    "Burna", "Nelma", "Inda", "Wallace", "Bagdem", "Kim",
    "Wilgen", "Arcelie", "Feng", "Bz", "Eva", "King",
    "Jed", "Ondo", "Emma", "Treswin", "Kody"
];

const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#FF9A33",
    "#33FFA7", "#9AFF33", "#5733FF", "#33CFFF", "#FF3333", "#33FFCF",
    "#FFC733", "#CF33FF", "#A7FF33", "#33A7FF", "#FFA733"
];

const wheel = document.getElementById("wheel");
const nameForm = document.getElementById("nameForm");
const userNameInput = document.getElementById("userName");
const spinButton = document.getElementById("spinButton");
const result = document.getElementById("result");
const resetButton = document.getElementById("resetButton");
const hostControls = document.getElementById("hostControls");

let currentUserName = "";
let pickedNames = new Set();
let spinAllowed = true;

// Create wheel segments dynamically
function createWheel() {
    wheel.innerHTML = ""; // Clear any existing wheel segments
    names.forEach((name, index) => {
        const segment = document.createElement("div");
        segment.style.backgroundColor = colors[index];
        segment.style.transform = `rotate(${index * (360 / names.length)}deg) skewY(-70deg)`;
        segment.setAttribute("data-name", name); // Store the name on each segment
        wheel.appendChild(segment);
    });
}

// Check if user has already spun
if (localStorage.getItem("hasSpun")) {
    nameForm.style.display = "none";
    result.textContent = "You have already spun the wheel!";
}

// Form submission
nameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const enteredName = userNameInput.value.trim();

    if (!names.includes(enteredName)) {
        alert("Name not in the circle!");
        return;
    }

    if (pickedNames.has(enteredName)) {
        alert("This name has already been picked!");
        return;
    }

    currentUserName = enteredName;
    spinButton.disabled = false;
    alert(`Welcome, ${currentUserName}. You can spin the circle!`);
});

// Spin logic
spinButton.addEventListener("click", () => {
    if (!spinAllowed) {
        alert("You have already spun the wheel!");
        return;
    }

    spinButton.disabled = true;
    spinAllowed = false;

    const randomIndex = Math.floor(Math.random() * names.length);
    const selectedName = names[randomIndex];

    const rotation = 3600 + randomIndex * (360 / names.length); // Add multiple spins for at least 10 seconds
    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
        if (pickedNames.has(selectedName)) {
            result.textContent = `Oops, ${selectedName} is already picked!`;
        } else {
            result.textContent = `Congratulations! The arrow pointed to ${selectedName}`;
            pickedNames.add(selectedName);
        }

        localStorage.setItem("hasSpun", true);
        hostControls.style.display = "block"; // Show reset button
    }, 10500); // Wait for the wheel to stop spinning
});

// Reset button
resetButton.addEventListener("click", () => {
    pickedNames.clear();
    localStorage.removeItem("hasSpun");
    result.textContent = "";
    nameForm.style.display = "block";
    spinButton.disabled = true;
    hostControls.style.display = "none";
});

// Initialize wheel
createWheel();
