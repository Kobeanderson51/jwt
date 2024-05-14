const express = require('express');
const jwt = require('jsonwebtoken');
const { expressJwtSecret } = require('express-jwt');

const secret = "supersecret";

const users = [
    { id: 1, username: 'admin', password: 'admin' },
    { id: 2, username: 'user', password: 'user' }
];

const courses = [
    {
        courseId: 1,
        courseName: 'MyCourse',
    }
];

const app = express();

app.use(express.json());
app.use(express.static('/public'));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(currUser => currUser.username === username);
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ username: user.username }, secret, { algorithm: 'HS256', expiresIn: '10s' });
    return res.json({ token: token });
});