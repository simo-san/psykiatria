'use strict';

const express = require('express')
const testi = require('express').Router()
testi.use(express.urlencoded({extended: true}))

testi.post('/laskePisteet', (req, res) => {
    if(!req.body) {
        return res.sendStatus(400)
    }
    else {
        try { 
            let pisteet = 0;
            pisteet += +req.body.oire1
            pisteet += +req.body.oire2
            pisteet += +req.body.oire3

            res.render('hakutulos', 
            { paaotsikko: 'Hakutulos', 
            otsikko:'Normaali: 0-12, lievä: 13-18, kohtalainen: 19-29 ja Vaikea: 30 tai yli',
            tiedot: pisteet }  )
        }
        catch (virhe) {
            res.render('virhe', { viesti: virhe} );
        }
    }
})

module.exports = testi;