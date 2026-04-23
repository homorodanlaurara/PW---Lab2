const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const users = require('../db/users');

const getHash = (p) => crypto.createHash('sha256').update(p).digest('base64');

router.get('/register', (req, res) => res.render('register', { error: null }));

router.post('/register', (req, res) => {
    const { email, firstName, password } = req.body;
    if (users.find(u => u.email === email)) return res.render('register', { error: "Email deja folosit!" });
    
    const newUser = { email, firstName, password: getHash(password) };
    users.push(newUser);
    res.redirect('/login');
});

router.get('/login', (req, res) => res.render('login', { error: null }));

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === getHash(password));
    
    if (user) {
        req.session.user = user;
        res.redirect('/travel/protected');
    } else {
        res.render('login', { error: "Email sau parolă incorectă!" });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('ultima_vizualizata');
    res.redirect('/');
});

module.exports = router;