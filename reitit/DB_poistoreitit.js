'use strict';

const { lahetaVirhe, lahetaKyselyVirhe } = require('./viestit')

const Laake = require('../DB_tiedot/laaketietokanta.js')
const laake = new Laake()

const express = require('express')
const reitit = require('express').Router()

reitit.use(express.urlencoded( {extended: true} ))

reitit.post('/poistaLaake', async (req, res) => {
        try {
            const rivi = await laake.poistaLaake(req.body.hakusana);  
            if (rivi.tulos.muutetutRivitLkm != 1) {
                lahetaVirhe(res, 'Lääketietoja ei poistettu')
            }//if

            else {
                res.render('hakutulos', {
                    paaotsikko: 'Sql',
                    otsikko: 'Onnistuit poistamaan tietokannasta',
                    tiedot: 'Onneksi olkoon!'
                })
            }//else

        }//try
        catch (virhe) {
            lahetaVirhe(res, virhe);
        }
    
});

module.exports = reitit;