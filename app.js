require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

//CONFIG
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configurare Sesiune
app.use(session({
    secret: process.env.SESSION_SECRET || 'pink_travel_fallback_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 } // Sesiunea expira in 10 minute
}));


// Middleware de Logging
app.use((req, res, next) => {
    const userEmail = req.session.user ? req.session.user.email : 'Guest';
    console.log(`${req.method} ${req.url} - user: ${userEmail}`);
    next();
});

// Middleware de Autentificare
const requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/login');
};

//IMPORT RUTE
const authRoutes = require('./routes/auth');
const travelRoutes = require('./routes/travel');

//RUTE PRINCIPALE

//home
app.get('/', (req, res) => {
    res.render('home', { user: req.session.user });
});

//login, register, logout
app.use('/', authRoutes);

//utilizare rute protejate sub prefixul /travel
app.use('/travel', requireLogin, travelRoutes);

//PORNIRE SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('------------------------------------------');
    console.log(`ruleaza!`);
    console.log(`Adresa: http://localhost:${PORT}`);
    console.log('------------------------------------------');
});