const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname)); 

// --- CONFIGURATION PORT SÉRIE ---
// Remplace 'COM3' par ton port (ex: '/dev/tty.usbserial-110' sur Mac)
const portPath = 'COM3'; 
const port = new SerialPort({ path: portPath, baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', (data) => {
    const edaValue = parseInt(data.trim());
    if (!isNaN(edaValue)) {
        io.emit('eda-data', edaValue);
    }
});

server.listen(3000, () => {
    console.log('Serveur actif sur http://localhost:3000');
});