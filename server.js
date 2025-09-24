const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Ruta para obtener usuarios
app.get('/api/users', (req, res) => {
  const usersPath = path.join(__dirname, 'api', 'users.json');
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo users.json' });
    res.json(JSON.parse(data));
  });
});

// Puedes agregar aquí más rutas para tu API

app.listen(PORT, () => {
  console.log(`API escuchando en puerto ${PORT}`);
});
