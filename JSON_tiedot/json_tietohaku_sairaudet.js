'use strict';

const info = require('./sairaudet.json');

const MasK = info.Masennus.Kliininen_kuva;
const MasH = info.Masennus.Hoito;
const MasL = info.Masennus.Lääkkeet;
const MasE = info.Masennus.Etiologia;

const SyoK = info.Syömishäiriö.Kliininen_kuva;
const SyoH = info.Syömishäiriö.Hoito;
const SyoL = info.Syömishäiriö.Lääkkeet;
const SyoE = info.Syömishäiriö.Etiologia;

const PanK = info.Paniikkihäiriö.Kliininen_kuva;
const PanH = info.Paniikkihäiriö.Hoito;
const PanL = info.Paniikkihäiriö.Lääkkeet;
const PanE = info.Paniikkihäiriö.Etiologia;
    
const  palautaS = (sairaus) => {
  let vastaus = ' ';
  if (sairaus === 'Masennus') {
    vastaus += MasK + ',  ' + MasH + ',  ' + MasL + '  ja  ' + MasE;
  }
  if ( sairaus === 'Syömishäiriö') {
    vastaus += SyoK + ',  ' + SyoH + ',  ' + SyoL + '  ja  ' + SyoE;
  }
  if ( sairaus === 'Paniikkihäiriö') {
    vastaus += PanK + ',  ' + PanH + ',  ' + PanL + '  ja ' + PanE;
  }
  return vastaus;
}

const haeP = (sairaus, piirre) =>  {
    let vastaus = ' ';
    if (sairaus === 'Masennus') {
        if ( piirre === 'Kliininen kuva')
            vastaus += MasK;
        if (piirre === 'Hoito')
            vastaus += MasH;
        if (piirre === 'Lääkkeet')
            vastaus += MasL;
        if ( piirre === 'Etiologia')
            vastaus += MasE;
    }
    else if (sairaus === 'Paniikkihäiriö' ) {
        if ( piirre === 'Kliininen kuva')
            vastaus += PanK;
        if (piirre === 'Hoito')
             vastaus += PanH;
        if (piirre === 'Lääkkeet')
             vastaus += PanL;
        if ( piirre === 'Etiologia')
             vastaus += PanE;
    }
    else if (sairaus === 'Syömishäiriö') {
        if ( piirre === 'Kliininen kuva')
            vastaus += SyoK;
        if (piirre === 'Hoito')
            vastaus += SyoH;
        if (piirre === 'Lääkkeet')
            vastaus += SyoL;
        if ( piirre === 'Etiologia')
            vastaus += SyoE;
    }
    return vastaus;
};

module.exports = { haeP, palautaS }