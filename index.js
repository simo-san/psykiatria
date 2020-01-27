

'use strict';

const express = require('express');
const app = express();
const path = require('path');

const json_haku = require('./reitit/JSON_hakureitit')
const testiPisteet = require('./reitit/lomakeTesti_reitti')
const db_haku = require('./reitit/DB_hakureitit')
const db_paivitys = require('./reitit/DB_paivitysreitit')
const db_poisto = require('./reitit/DB_poistoreitit')

app.set('view engine', 'ejs')
app.set('views')

app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'JSON_tiedot')))
app.use(express.static(path.join(__dirname,'DB_tiedot')))
app.use(express.static(path.join(__dirname,'reitit')))

app.use('/', json_haku);
app.use('/', testiPisteet);
app.use('/', db_paivitys);
app.use('/', db_haku);
app.use('/', db_poisto);


app.get('/', (req, res) => {
  res.render('koti',
    {
      paaotsikko: 'Kotisivu',
      otsikko: 'Tervetuloa uudelle sivustollemme',
      viesti:'',
    });
});

app.get('/laake', (req, res) => {
  res.render('laake', {
      paaotsikko: 'Tietoja lääkkeistä',
      otsikko: 'Syötä tarvittavat tiedot',
      viesti: 'Lääkehoito on tärkeä osa sairauden hoitoa',
    });  
});

app.get('/testi', (req, res) => {
    res.render('testi', {
        paaotsikko: 'Mielialakysely',
        otsikko: 'Täytä  lomake, ole hyvä',
        viesti: 'Lomakkeen täytön jälkeen saat tuloksen yhdellä napin painalluksella',
    });
});

app.get('/tieto', (req, res,) => {
    res.render('tieto', { 
        paaotsikko:' Täällä saat tietoa sairauksista',
        otsikko: 'Tässä on eri vaihtoehtoja kuinka saat tietoa',
        viesti: 'haku',
    });
});

app.listen(3000, () => {
  console.log('Portissa 3000');
});
