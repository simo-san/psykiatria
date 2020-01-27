'use strict';
const { lahetaVirhe, lahetaKyselyVirhe } = require('./viestit')

const Laake = require('../DB_tiedot/laaketietokanta');
const laake = new Laake();

const express = require('express')
const reitit = require('express').Router()

reitit.use(express.urlencoded( {extended: true} ))

//KAIKKI Lääkkeet
 reitit.post('/haeKaikki', async (req, res) => {
    try {
        const tulos = await laake.haeKaikki();
        if (tulos.kyselynTulos.length > 0 ) {
            res.render('kaikkiLaakkeet', { laakkeet:tulos.kyselynTulos} );
        }//if
    }
    catch (virhe) {
        lahetaKyselyVirhe(res, virhe.message);
    }
 })
//HAE LÄÄKERYHMÄ
reitit.post('/haeRyhma', async (req, res)=> {
    try{
        const tulos =  await laake.haeLaakeRyhma(req.body.hakusana);
        if (tulos.kyselynTulos.length > 0 ) {
            
            res.render('ryhmaListaus', {
                laakkeet : tulos.kyselynTulos
            });
        }//if
    }
    catch (virhe) {
        res.render('hakutulos', { paaotsikko: 'Ongelma', otsikko: 'Ongelma haussa', 
        tiedot: 'Valitettavasti hakusanalla ei löytynyt vastausta tietokannasta'}) 
    }
})

//HAE LÄÄKKEEN INDIKAATIO
reitit.post('/haeIndikaatio', async (req, res) => {
    try {
        const tulos = await laake.haeIndikaatio(req.body.hakusana);
        if ( tulos.kyselynTulos.length > 0 ) {
            res.render('aihelistaus',
            { 
                laakkeet: tulos.kyselynTulos
            });
        }
    }
    catch (virhe) {
        res.render('hakutulos', { paaotsikko: 'Ongelma', otsikko: 'Ongelma haussa', 
        tiedot: 'Valitettavasti hakusanalla ei löytynyt vastausta tietokannasta'})
    }
})

reitit.post('/haeTuotenimi', async (req, res) => {

    try {
        const tulos = await laake.haeNimi(req.body.hakusana);
        
        if (tulos.kyselynTulos.length > 0) {

            res.render('tuotenimi', {
                laake: {
                    nimi: tulos.kyselynTulos[0].nimi,
                    sivuvaikutukset: tulos.kyselynTulos[0].sivuvaikutukset,
                    vaikuttavaAine: tulos.kyselynTulos[0].vaikuttavaAine,
                    ryhma: tulos.kyselynTulos[0].ryhma,
                    indikaatio: tulos.kyselynTulos[0].indikaatio
                }
            });
        }
        else {
            res.render('hakutulos', { paaotsikko: 'Ongelma', otsikko: 'Ongelma haussa', 
            tiedot: 'Valitettavasti hakusanalla ei löytynyt vastausta tietokannasta'})
        }
    }
    catch (virhe) {
        lahetaKyselyVirhe(res, virhe.message);
    }
})


module.exports = reitit;