let socket;
try {
    socket = io(); // Tente de se connecter au serveur Node
} catch (e) {
    console.log("Mode simulation clavier activé.");
}

const edaDisplay = document.getElementById('eda-val');
const videoCards = document.querySelectorAll('.video-card');
const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('overlay');

let fakeEDA = 0; 
const THRESHOLD = 600;

// 1. Démarrage
startBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    document.querySelectorAll('video').forEach(v => {
        v.play().catch(err => console.log("Auto-play bloqué par le navigateur"));
    });
});

// 2. Mise à jour visuelle (Fonction commune)
function updateUI(value) {
    edaDisplay.innerText = value;
    videoCards.forEach(card => {
        if (value > THRESHOLD) {
            card.classList.add('overloaded');
        } else {
            card.classList.remove('overloaded');
        }
    });
}

// 3. Test Clavier (Flèches Haut/Bas)
window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowUp") fakeEDA = Math.min(1024, fakeEDA + 50);
    if (e.key === "ArrowDown") fakeEDA = Math.max(0, fakeEDA - 50);
    updateUI(fakeEDA);
});

// 4. Réception données réelles (BITalino)
if (socket) {
    socket.on('eda-data', (value) => {
        updateUI(value);
    });
}