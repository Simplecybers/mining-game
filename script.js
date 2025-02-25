const spinBtn = document.getElementById("spin-btn");
const wheel = document.getElementById("spin-wheel");
const spinLeftDisplay = document.getElementById("spin-count");
const resultModal = document.getElementById("result-modal");
const winAmountDisplay = document.getElementById("win-amount");
const payoutBtn = document.getElementById("payout-btn");
const closeModal = document.getElementById("close-modal");

let spinsLeft = JSON.parse(localStorage.getItem('spinsLeft')) || 3;

const prizes = [500, 250, 100, 50, 20, 10, 5, 1]; // Prize values in USDT

function updateSpinCount() {
    spinLeftDisplay.textContent = spinsLeft;
    localStorage.setItem('spinsLeft', JSON.stringify(spinsLeft));
}

spinBtn.addEventListener("click", () => {
    if (spinsLeft <= 0) return alert("No spins left today!");

    spinsLeft--;
    updateSpinCount();

    const rotation = Math.floor(Math.random() * 360 + 1440); // Random 4-6 full spins
    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
        const prizeIndex = Math.floor(Math.random() * prizes.length);
        const prize = prizes[prizeIndex];
        winAmountDisplay.textContent = `You won ${prize} USDT! 💸`;
        resultModal.style.display = "block";
        saveWin(prize);
    }, 5000);
});

payoutBtn.addEventListener("click", () => {
    alert("Payout request submitted successfully! 💳");
    resultModal.style.display = "none";
});

closeModal.addEventListener("click", () => {
    resultModal.style.display = "none";
});

function saveWin(amount) {
    const history = JSON.parse(localStorage.getItem('winHistory')) || [];
    history.push({ date: new Date().toLocaleString(), amount });
    localStorage.setItem('winHistory', JSON.stringify(history));
}

updateSpinCount();