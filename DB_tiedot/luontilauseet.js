{
    "palvelin":"localhost",
        "portti":"3306",
    
    "paakayttaja":"root",
        "paakayttajanSalasana":"",

    "kayttaja":"root",
        "kayttajanSalasana":""
    
    "poistaKayttaja":"false",
    
    "tietokanta":"laakkeet",
        "taulut":[
        
            "taulunNimi":"laake",
            "sarakkeet": [
                "ID integer not null primary key auto_increment",
                "nimi varchar(40) not null",
                "sivuvaikutukset varchar(100) not null",
                "vaikuttavaAine varchar(40) not null",
                "ryhma varchar(40) not null",
                "indikaatio varchar(40) not null"
            ]
        
    ]
}//loppu