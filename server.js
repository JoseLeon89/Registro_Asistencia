const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let generatedCode = ''; // Variable para almacenar el código generado
let expirationTime = 0; // Variable para la hora de expiración del código

// Endpoint para generar un nuevo código
app.post('/generate-code', (req, res) => {
    const { code, duration } = req.body;
    generatedCode = code;
    expirationTime = new Date().getTime() + duration * 60000;
    res.json({ message: 'Código generado correctamente' });
});

// Endpoint para obtener el código actual
app.get('/get-code', (req, res) => {
    const now = new Date().getTime();
    if (now > expirationTime) {
        res.json({ code: '', message: 'El código ha expirado' });
    } else {
        res.json({ code: generatedCode, expirationTime });
    }
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
