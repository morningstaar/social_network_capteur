const socket = io('http://localhost:3000'); // Connexion au serveur

const edaDisplay = document.getElementById('eda-val');

// Réception des données du capteur
socket.on('sensor_data', (data) => {
    // Mise à jour de la valeur dans le HTML
    edaDisplay.innerText = data.value;

    // Optionnel : Changer la couleur si le stress monte (ex: > 500)
    if(data.value > 500) {
        edaDisplay.style.color = "red";
    } else {
        edaDisplay.style.color = "#00ff88";
    }
});

// Gestion du bouton démarrer
document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('overlay').style.display = 'none';
    // Lancer la lecture des vidéos ici
    const videos = document.querySelectorAll('video');
    videos.forEach(v => v.play());
});
