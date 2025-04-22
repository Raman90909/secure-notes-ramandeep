const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

// Insecure: hardcoded JWT secret
const JWT_SECRET = '123456';

app.use(bodyParser.json());

app.use(express.static('public'));

const users = [];
const notes = [];

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password }); // Insecure: storing plaintext passwords
    res.send({ message: 'User registered' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ username }, JWT_SECRET);
        res.send({ token });
    } else {
        res.status(401).send({ error: 'Invalid credentials' });
    }
});

app.get('/notes', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userNotes = notes.filter(n => n.username === decoded.username);
        res.send(userNotes);
    } catch (err) {
        res.status(403).send({ error: 'Invalid token' });
    }
});

app.post('/notes', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const { content } = req.body;
        notes.push({ username: decoded.username, content });
        res.send({ message: 'Note added' });
    } catch (err) {
        res.status(403).send({ error: 'Invalid token' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); //
