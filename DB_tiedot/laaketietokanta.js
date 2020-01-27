'use strict';
const Tietokanta = require('./tietokanta');

//sql-lauseet
const haeKaikkiSQL = 'select nimi, indikaatio, vaikuttavaAine, sivuvaikutukset, ryhma from laake';
const haeRyhmaSQL = 'select nimi, indikaatio from laake where ryhma = ?';
const haeIndikaatioSQL = 'select nimi, sivuvaikutukset from laake where indikaatio = ?';
const haeNimiSQL = 'select nimi, indikaatio, vaikuttavaAine, sivuvaikutukset, ryhma from laake where nimi = ?';
const haeSivuvaikutuksetSQL = 'select sivuvaikutukset from laake where nimi = ?';
const lisaaLaakeSQL = 'insert into laake (nimi, indikaatio, vaikuttavaAine, sivuvaikutukset, ryhma) values (?,?,?,?,?)';
const poistaLaakeSQL = 'delete from laake where nimi = ?'; 
//const paivitaSQL = 

module.exports = class Laakekanta {
        constructor(optiot = {
                host:'localhost',
                port:3306,
                user:'root',
                password:'',
                database:'laakkeet'
        }) {
                this.laakkeet = new Tietokanta(optiot)
        }

//seuraavat palauttavat lupauksen
        haeKaikki() {
                return this.laakkeet.teeKysely(haeKaikkiSQL); 
        }

        haeLaakeRyhma(ryhma) { 
                return this.laakkeet.teeKysely(haeRyhmaSQL, [ryhma]); }

        haeIndikaatio(indikaatio) { 
                return this.laakkeet.teeKysely(haeIndikaatioSQL, [indikaatio]); }
        
        haeSivuvaikutukset(laake) {
                return this.laakkeet.teeKysely(haeSivuvaikutuksetSQL, [laake]);
        }

        lisaaLaake(uusiLaake) { 
                return this.laakkeet.teeKysely(lisaaLaakeSQL, Object.values(uusiLaake));
        }

        poistaLaake(nimi) { 
                return this.laakkeet.teeKysely(poistaLaakeSQL, [nimi]);
        }

        haeNimi(tuote) { 
                return  this.laakkeet.teeKysely(haeNimiSQL, [tuote]); 
        }
}//Lääkekanta