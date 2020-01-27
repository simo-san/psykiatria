'use strict'
const mariadb =require('mariadb');

module.exports = class Tietokanta {
    constructor (optiot)  {
        this.optiot = optiot
    }

    teeKysely(sql, parametrit) {
        console.log('______________________');
        console.log('__Tietokanta/FUNKTIO_teeKyselyn parametrit:');
        console.log(sql);
        console.log(parametrit);
        return new Promise (async (resolve, reject) => {
            let yhteys;
            console.log('__Tietokanta/FUNKTIO_teeKysely/rivi_16');
            try {
                console.log('__Tietokanta/teekysely/rivi_18');
                yhteys = await mariadb.createConnection(this.optiot);
                let kyselynTulos = await yhteys.query(sql, parametrit);
                console.log('Tietokanta/teeKyselyn parametrit/TRY/yhteys:');
                console.log(sql);
                console.log(parametrit);
                if(typeof kyselynTulos === 'undefined') {
                    reject(new Error('Kyselyvirhe'));
                }//if

                else if (typeof kyselynTulos.affectedRows === 'undefined') {
                    delete kyselynTulos.meta;
                    resolve( { kyselynTulos, tulosjoukko:true } );
                }//else if

                else {
                    resolve( { tulos: { 
                        muutetutRivitLkm: kyselynTulos.affectedRows,
                        lisattyNro: kyselynTulos.insertId,
                        status: kyselynTulos.warningStatus
                    }, tulosjoukko: false });
                }//else
                
            }//try

            catch(virhe) {
                console.log('__Tietokanta/teekysely/CATCH/rivi_44');
                reject(new Error('SQL-virhe: ' + virhe.message));
            }//catch
                
            finally {
                if(yhteys) 
                    yhteys.end();
            }//finally
            
        });    //return promise   
    }//teeKysely
}//tietokanta