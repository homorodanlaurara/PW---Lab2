const express = require('express');
const router = express.Router();
const destinatii = require('../db/destinatii');

router.get('/protected', (req, res) => {
    req.session.views = (req.session.views || 0) + 1;
    const ultima = req.cookies.ultima_vizualizata || "Niciuna";
    
    res.render('protected', {
        user: req.session.user,
        views: req.session.views,
        destinatii: destinatii,
        ultima: ultima
    });
});

router.get('/detalii/:id', (req, res) => {
    const dest = destinatii.find(d => d.id == req.params.id);
    if (dest) {
        res.cookie('ultima_vizualizata', dest.nume, { maxAge: 900000 });
        res.render('detalii', { dest });
    } else {
        res.redirect('/travel/protected');
    }
});

module.exports = router;