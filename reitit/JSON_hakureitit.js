'use strict';

const { lahetaVirhe, lahetaKyselyVirhe } = require('./viestit')

const express = require('express')
const reitit = require('express').Router()
const haku = require('../JSON_tiedot/json_tietohaku_sairaudet.js')

reitit.use(express.urlencoded({extended: true}))

//HAE TIETOA SAIRAUDESTA !!! JSON !!!
/* reitit.get('/tieto') */
    reitit.post('/haeTieto', (req, res, next) => {
        if(!req.body){
            return res.sendStatus(400)
        } 
        else {
            try {
                let hakutulos = ' '      
                hakutulos =  haku.haeP(req.body.sairaus, req.body.piirre)
                res.render('hakutulos', 
                { paaotsikko: 'Hakutulos', 
                 otsikko:'Hakusanalla saatu tulos: ',
                 tiedot: hakutulos } )
            }
            catch (virhe) {
                res.render('virhe', { viesti: virhe} );
            }
        } 
        res.end()
    });
    //HAE KAIKKI TIEDOT SAIRAUDESTA !!! JSON !!!
     reitit.post('/haeSairaus', (req, res, next) => {

        if(!req.body){
            return res.sendStatus(400);
        } 
        else {
            try {
                const sairaus = req.body.sairaus;
                let hakutulos =  ' ';      
                hakutulos =  haku.palautaS(sairaus);
                res.render('hakutulos', {  paaotsikko:'Hakutulos',
                                            otsikko: 'Hakusanalla saatu tulos: ',
                                            tiedot : hakutulos }  );
            }
            catch (virhe) {
                res.render('virhe', { paaotsikko: virhe} );
            }
        }  
    });

    module.exports = reitit;