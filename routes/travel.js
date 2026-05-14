const express = require('express');
const router = express.Router();

const destinatii = [
    { id: 'paris', nume: "Paris", regiune: "Europa / Franta" },
    { id: 'maldive', nume: "Maldive", regiune: "Asia / Oceanul Indian" },
    { id: 'sardinia', nume: "Sardinia", regiune: "Europa / Italia" }
];

router.get('/protected', (req, res) => {
    if (!req.session || !req.session.userId) {
        return res.redirect('/login');
    }

    req.session.viewCount = (req.session.viewCount || 0) + 1;

    console.log("Utilizator logat:", req.session.userName);

    res.render('protected', { 
        userName: req.session.userName || "Calator", 
        sessionCount: req.session.viewCount || 1,
        lastVisited: req.session.lastVisited || "Niciuna",
        destinatii: destinatii 
    });
});

router.get('/details/:id', (req, res) => {
    const gasit = destinatii.find(d => d.id === req.params.id);
    if (gasit) {
        req.session.lastVisited = gasit.nume;
        res.redirect('/travel/protected');
    } else {
        res.redirect('/travel/protected');
    }
});

module.exports = router;

router.get('/update-last-visited/:nume', (req, res) => {
    if (req.session) {
        req.session.lastVisited = req.params.nume;
    }
    res.sendStatus(200); 
});