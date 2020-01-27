'use strict';

function lahetaTila( res, viesti) {
    res.render('tilasivu', { paaotsikko: 'Tila', otsikko: ' Tulos', viesti } );
}
function lahetaVirhe( res, virhe ) {
    res.render('tilasivu', { paaotsikko: 'Virhe', otsikko:'Virhe', viesti: 'virhe'});
}
function lahetaKyselyVirhe( res, virhe ) {
    res.render('tilasivu', { paaotsikko: 'Virhe', otsikko: 'Ei onnistunut!', viesti: 'Harmillista'})  
}

module.exports = { lahetaTila, lahetaVirhe, lahetaKyselyVirhe }