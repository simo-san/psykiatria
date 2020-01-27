'use strict';

const { lahetaVirhe, lahetaKyselyVirhe } = require('./viestit')

const Laake = require('../DB_tiedot/laaketietokanta.js')
const laake = new Laake()

const express = require('express')
const reitit = require('express').Router()

reitit.use(express.urlencoded( {extended: true} ))
reitit.post('/lisaaLaake', async (req, res) => {
    
        try {
            const rivi = await laake.lisaaLaake(req.body);
            
            if (rivi.tulos.muutetutRivitLkm != 1) {
                lahetaVirhe(res, 'Lääketietoja ei lisätty');
            }//if

            else {
                res.render('hakutulos', {
                    paaotsikko: 'Sql',
                    otsikko: 'Onnistuit tallentamaan tietokantaan',
                    tiedot: 'Onneksi olkoon!'
                })
            }//else

        }//try
        catch (virhe) {
            lahetaKyselyVirhe(res, virhe);
        }//catch
});

//lisayslomake
reitit.get('/lisaysLomake', async (req, res) => {
    res.render('lisaysLomake', {
        paaotsikko: 'Täytä tiedot',
        otsikko: 'Jos lisäät paina lisää, jos päivität: päivitä '
    })
})

module.exports = reitit;