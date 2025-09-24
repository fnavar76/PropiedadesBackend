const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- USERS ---
app.get('/users', (req, res) => {
  const usersPath = path.join(__dirname, 'api', 'users.json');
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo users.json' });
    res.json(JSON.parse(data));
  });
});

// --- LOGIN ---
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const usersPath = path.join(__dirname, 'api', 'users.json');
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo users.json' });
    const users = JSON.parse(data);
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  });
});

// --- PROPERTIES CRUD ---
const propertiesPath = path.join(__dirname, 'api', 'properties.json');
app.get('/properties', (req, res) => {
  fs.readFile(propertiesPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo properties.json' });
    res.json(JSON.parse(data));
  });
});
app.post('/properties', (req, res) => {
  fs.readFile(propertiesPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo properties.json' });
    const properties = JSON.parse(data);
    const newProperty = { ...req.body, id: Date.now().toString() };
    properties.push(newProperty);
    fs.writeFile(propertiesPath, JSON.stringify(properties, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Error guardando property' });
      res.json(newProperty);
    });
  });
});
app.put('/properties/:id', (req, res) => {
  fs.readFile(propertiesPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo properties.json' });
    let properties = JSON.parse(data);
    const idx = properties.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
    properties[idx] = { ...properties[idx], ...req.body };
    fs.writeFile(propertiesPath, JSON.stringify(properties, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Error guardando property' });
      res.json(properties[idx]);
    });
  });
});
app.delete('/properties/:id', (req, res) => {
  fs.readFile(propertiesPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo properties.json' });
    let properties = JSON.parse(data);
    properties = properties.filter(p => p.id !== req.params.id);
    fs.writeFile(propertiesPath, JSON.stringify(properties, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Error guardando property' });
      res.json({ success: true });
    });
  });
});

// --- ACTIVITIES ---
const activitiesPath = path.join(__dirname, 'api', 'activities.json');
app.get('/activities', (req, res) => {
  fs.readFile(activitiesPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo activities.json' });
    res.json(JSON.parse(data));
  });
});
app.post('/activities', (req, res) => {
  fs.readFile(activitiesPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo activities.json' });
    const activities = JSON.parse(data);
    const newActivity = { ...req.body, id: Date.now().toString() };
    activities.push(newActivity);
    fs.writeFile(activitiesPath, JSON.stringify(activities, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Error guardando activity' });
      res.json(newActivity);
    });
  });
});

// --- USERS CRUD (opcional, ejemplo para POST) ---
const usersPath = path.join(__dirname, 'api', 'users.json');
app.post('/users', (req, res) => {
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo users.json' });
    const users = JSON.parse(data);
    const newUser = { ...req.body, id: Date.now().toString() };
    users.push(newUser);
    fs.writeFile(usersPath, JSON.stringify(users, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Error guardando user' });
      res.json(newUser);
    });
  });
});
app.put('/users/:id', (req, res) => {
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo users.json' });
    let users = JSON.parse(data);
    const idx = users.findIndex(u => u.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
    users[idx] = { ...users[idx], ...req.body };
    fs.writeFile(usersPath, JSON.stringify(users, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Error guardando user' });
      res.json(users[idx]);
    });
  });
});
app.delete('/users/:id', (req, res) => {
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo users.json' });
    let users = JSON.parse(data);
    users = users.filter(u => u.id !== req.params.id);
    fs.writeFile(usersPath, JSON.stringify(users, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Error guardando user' });
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`API escuchando en puerto ${PORT}`);
});
