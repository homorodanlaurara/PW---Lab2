require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// CONFIG
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configurare Sesiune
app.use(session({
    secret: 'cheie-secreta-pink-travel',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

// Middleware de Logging (Corectat)
app.use((req, res, next) => {
    const userEmail = req.session.userId ? req.session.userId : 'Guest';
    console.log(`${req.method} ${req.url} - user: ${userEmail}`);
    next();
});

// Middleware de Autentificare (AICI ERA PROBLEMA!)
const requireLogin = (req, res, next) => {
    // Acum paznicul cauta 'userId', exact ce ii dam noi la login!
    if (req.session && req.session.userId) {
        return next();
    }
    res.redirect('/login');
};

// IMPORT RUTE
const authRoutes = require('./routes/auth');
const travelRoutes = require('./routes/travel');

// RUTE PRINCIPALE
// home
app.get('/', (req, res) => {
    res.render('home', { user: req.session.userId });
});

// login, register, logout
app.use('/', authRoutes);

// utilizare rute protejate sub prefixul /travel
app.use('/travel', requireLogin, travelRoutes);
// --- RUTE FORTATE PENTRU REZERVARI ---
app.post('/travel/rezerva', (req, res) => {
    if (req.session) {
        if (!req.session.rezervari) req.session.rezervari = [];
        
        const nouaRezervare = {
            destinatie: req.body.destinatie,
            pret: req.body.pret,
            data: new Date().toLocaleString('ro-RO')
        };
        req.session.rezervari.push(nouaRezervare);
    }
    res.sendStatus(200);
});

app.get('/travel/rezervari', (req, res) => {
    const numeAfisat = (req.session && req.session.userId) ? req.session.userId : "Laura";
    const istoricRezervari = (req.session && req.session.rezervari) ? req.session.rezervari : [];
    
    res.render('rezervari', {
        userName: numeAfisat,
        rezervari: istoricRezervari
    });
});

// PORNIRE SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('------------------------------------------');
    console.log(`ruleaza!`);
    console.log(`Adresa: http://localhost:${PORT}`);
    console.log('------------------------------------------');
});