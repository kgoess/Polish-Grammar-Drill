
var prepositionData = [
// english        polish   gov'ing case     quality
 [ 'on',          'na',    'locative',      null ],
 [ 'onto',        'na',    'accusative',    'motion' ],
 [ 'above',       'nad',   'instrumental',  null ],
 [ 'to',          'nad',   'accusative',    'motion' ],
 [ 'behind',      'za',    'instrumental',  null ],
 [ 'in front of', 'przed', 'instrumental',  null ],
 [ 'through/across','przez','accusative',    'motion' ],
 [ 'under',       'pod',    'instrumental', null ],
 [ 'with',        'z',      'instrumental', 'combination' ],
 [ 'from',        'z',      'genitive',     'motion' ], // actually requires a 'place' if być:
                                                        // jestem z kalifornii
 [ 'from',        'od',     'genitive',     'motion' ],
 [ 'to',          'do',     'genitive',     'motion' ],
// [ 'at',          'u',      'genitive',     'place'  ], // u kolegi
 [ 'without',     'bez',    'genitive',     'combination' ], // herbata bez cukru
// [ 'between',     'między', 'instrumental', 'motion' ], 
 [ 'next to',     'obok',   'genitive',     null ],
 [ 'in',          'w',      'locative',     null ],
 [ 'in',          'w',      'accusative',   'motion' ],
 [ 'at',          'u',      'genitive',     null ], 
 [ 'about (concerning)',    'o',  'locative', 'relation' ],
 [ 'next to (hard by)',     'przy', 'locative', null ],
// [ 'before (chronologically)', 'przed', 'instrumental', null ], //requires an event
];


var okNounsForPreposition = {
    // motion or static
    'na+accusative': [
        'schody', 'plaża', 'dach', 'stadion', 'kurs', 'rynek', 
        'poczta', 'uniwersytet', 'dworzec', 'peron', 'plac', 'parking',
        'wykład', 'kurs'
    ],
    'na+locative': [
        'schody', 'plaża', 'dach', 'stadion', 'kurs', 'rynek', 
        'poczta', 'uniwersytet', 'dworzec', 'peron', 'plac', 'parking',
        'wykład', 'kurs',
        //locative only:
        'gitara',
    ],
    'nad+accusative': [
        'morze', 'jezioro', 'rzeka', 'Wisła'
    ],
    'nad+instrumental': [
        'morze', 'jezioro', 'rzeka', 'Wisła'
    ],
    'z+instrumental': [
        // motion:
        'przyjęcia', 'praca', 'kuchnia', 'plaża', 'księgarnia',
        // combination:
        'cuker', 'cytryn', 'ser', 'jabłko', 'śmietana', 'czekolada', 
        'cebulka'
        //zrobiony z ...
        //drewno, plasktik, etc.

    ],
    'z+genitive': [
        // rozmawić z ....
        'kolega', 'rodzina', 

    ],
    // motion only
    'do+genitive': [
        // do kogo?
        'kolega', 'przyjaciel', 'rodzina', 'fryzjera',
        // dokąd?
        'Polska', 'Kraków', 'dom', 'kawiarnia', 'kino', 'park', 'autobus',
        'szkoła', 'praca', 'pokój', 'hotel', 'bank', 'apteka', 'biblioteka'
    ],

    // static only
    'u+genitive': [
        'kolega', 'przyjaciel', 'rodzina', 'fryzjera'
    ],
    'w+locative': [
        'Polska', 'Kraków', 'dom', 'kawiarnia', 'kino', 'park', 
        'jaskinia', 'samochód', 'kuchnia', 'księgarnia', 'sklep'
    ],
//    'w+accusative': [
//        but is plural only
//        'góra'
//    ],
    'za+instrumental': [
        'drewno'
    ],
    'przez+accusative': [
        'most', 'ulica'
    ],
//    'bez+genitive': [
//
//    ],

    // I think these can apply to anything
    'obok+genitive': '*',
    'przed+instrumental': '*', 
    'pod+instrumental': '*',
    'przy+locative': '*',
    'o+locative': '*'
};

// "exports" is needed for our unit tests in mocha
// this fakes it up in case we're *not* in mocha
var exports;
if (typeof exports === "undefined"){
    exports = {};
} 
prepositionData.findRow = function(polish_plus_case){
    var splitStr = polish_plus_case.split('+');
    var polishPreposition = splitStr[0];
    var governingCase = splitStr[1];
    var i;
    for (i = 0; i < this.length; ++i){
       if (this[i][1] === polishPreposition && 
           this[i][2] == governingCase ){
          return this[i];
        }
    }
    throw("Error: no preposition match for '" + polish_plus_case + "'");
};

var key, preposition;
for (key in okNounsForPreposition){
    preposition = prepositionData.findRow(key);
    preposition.okNouns = okNounsForPreposition[key];
}
    
    
exports.prepositionData = prepositionData;
