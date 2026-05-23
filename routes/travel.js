const express = require('express');
const router = express.Router();

// Vectorul masiv cu toate destinatiile
const destinatii = [
    { id: 'paris', nume: "Paris", descriere: "Europa / Franta - Orasul Iubirii", zile: 4, nopti: 3, regim: "Mic Dejun", hotel: "Ritz Paris", linkHotel: "https://www.ritzparis.com", pret: "500 EUR", link: "https://www.lonelyplanet.com/france/paris" },
    { id: 'maldive', nume: "Maldive", descriere: "Asia - Plaje exotice de vis", zile: 8, nopti: 7, regim: "All Inclusive", hotel: "Soneva Fushi Resort", linkHotel: "https://soneva.com", pret: "1200 EUR", link: "https://www.visitmaldives.com" },
    { id: 'sardinia', nume: "Sardinia", descriere: "Europa / Italia - Marea Mediterana", zile: 6, nopti: 5, regim: "Demipensiune", hotel: "Hotel Romazzino", linkHotel: "https://www.marriott.com", pret: "800 EUR", link: "https://www.sardegnaturismo.it" },
    { id: 'florenta', nume: "Florenta", descriere: "Europa / Italia - Capitala artei", zile: 5, nopti: 4, regim: "Mic Dejun", hotel: "Hotel Savoy", linkHotel: "https://www.roccofortehotels.com", pret: "450 EUR", link: "https://www.visitflorence.com" },
    { id: 'sevilia', nume: "Sevilia", descriere: "Europa / Spania - Cultura Flamenco", zile: 4, nopti: 3, regim: "Fara Masa", hotel: "Hotel Alfonso XIII", linkHotel: "https://www.marriott.com", pret: "400 EUR", link: "https://www.andalucia.org" },
    { id: 'edinburgh', nume: "Edinburgh", descriere: "Europa / Scotia - Castele magice", zile: 5, nopti: 4, regim: "Mic Dejun", hotel: "The Balmoral", linkHotel: "https://www.roccofortehotels.com", pret: "600 EUR", link: "https://www.visitscotland.com" },
    { id: 'mykonos', nume: "Mykonos", descriere: "Europa / Grecia - Paradisul alb-albastru", zile: 7, nopti: 6, regim: "All Inclusive", hotel: "Cavo Tagoo", linkHotel: "https://www.cavotagoo.com", pret: "900 EUR", link: "https://www.visitgreece.gr" },
    { id: 'barcelona', nume: "Barcelona", descriere: "Europa / Spania - Arhitectura si plaja", zile: 5, nopti: 4, regim: "Demipensiune", hotel: "W Barcelona", linkHotel: "https://www.marriott.com", pret: "550 EUR", link: "https://www.barcelonaturisme.com" },
    { id: 'dubrovnik', nume: "Dubrovnik", descriere: "Europa / Croatia - Marea Adriatica", zile: 6, nopti: 5, regim: "Mic Dejun", hotel: "Hotel Excelsior", linkHotel: "https://www.adriaticluxuryhotels.com", pret: "500 EUR", link: "https://tzdubrovnik.hr" },
    { id: 'hawaii', nume: "Hawaii", descriere: "America / SUA - Aventura la ocean", zile: 10, nopti: 9, regim: "All Inclusive", hotel: "Four Seasons Maui", linkHotel: "https://www.fourseasons.com/maui/", pret: "2500 EUR", link: "https://www.gohawaii.com" },
    { id: 'kenya', nume: "Kenya", descriere: "Africa - Safari cu animale salbatice", zile: 7, nopti: 6, regim: "Pensiune Completa", hotel: "Giraffe Manor", linkHotel: "https://www.thesafaricollection.com", pret: "2000 EUR", link: "https://magicalkenya.com" },
    { id: 'cappadocia', nume: "Cappadocia", descriere: "Orient / Turcia - Zbor cu balonul", zile: 4, nopti: 3, regim: "Mic Dejun", hotel: "Museum Hotel", linkHotel: "https://www.museumhotel.com.tr", pret: "700 EUR", link: "https://www.goturkiye.com" },
    { id: 'brazilia', nume: "Rio", descriere: "America de Sud - Carnaval si energie", zile: 8, nopti: 7, regim: "Mic Dejun", hotel: "Copacabana Palace", linkHotel: "https://www.belmond.com", pret: "1800 EUR", link: "https://visitbrasil.com" },
    { id: 'stlucia', nume: "St. Lucia", descriere: "Caraibe - Relaxare pe plaje virgine", zile: 9, nopti: 8, regim: "All Inclusive", hotel: "Jade Mountain", linkHotel: "https://jademountain.com", pret: "2200 EUR", link: "https://www.stlucia.org" },
    { id: 'bali', nume: "Bali", descriere: "Asia / Indonezia - Temple si spirit zen", zile: 12, nopti: 11, regim: "Mic Dejun", hotel: "Hanging Gardens", linkHotel: "https://hanginggardensofbali.com", pret: "1100 EUR", link: "https://www.indonesia.travel" },
    { id: 'cancun', nume: "Cancun", descriere: "America / Mexic - Ape limpezi si resorturi", zile: 8, nopti: 7, regim: "All Inclusive", hotel: "Le Blanc Spa Resort", linkHotel: "https://www.leblancsparesorts.com", pret: "1300 EUR", link: "https://www.visitmexico.com" }
];

// 1. RUTA PENTRU AFISAREA ISTORICULUI DE REZERVARI
// IMPORTANT: Trebuie sa fie sus, inainte de rutele cu parametru ":nume" sau ":id"
router.get('/rezervari', (req, res) => {
    const numeAfisat = (req.session && req.session.userId) ? req.session.userId : "Laura";
    const istoricRezervari = (req.session && req.session.rezervari) ? req.session.rezervari : [];
    
    res.render('rezervari', {
        userName: numeAfisat,
        rezervari: istoricRezervari
    });
});

// 2. RUTA PENTRU PAGINA PRINCIPALA DE OFERTE
router.get('/protected', (req, res) => {
    const numeAfisat = (req.session && req.session.userId) ? req.session.userId : "Laura";
    const ultimaVizita = (req.session && req.session.lastVisited) ? req.session.lastVisited : "Niciuna";

    res.render('protected', { 
        userName: numeAfisat, 
        lastVisited: ultimaVizita,
        destinatii: destinatii 
    });
});

// 3. RUTA POST PENTRU ADAUGAREA UNEI REZERVARI NOI
router.post('/rezerva', (req, res) => {
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

// 4. RUTA PENTRU ACTUALIZAREA ULTIMEI DESTINATII VIZUALIZATE
router.get('/update-last-visited/:nume', (req, res) => {
    if (req.session) req.session.lastVisited = req.params.nume;
    res.sendStatus(200);
});

module.exports = router;