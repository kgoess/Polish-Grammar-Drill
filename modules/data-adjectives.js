

var adjectiveData = [
  //           m             f             n           m-pers-plural
 [ 'large',  'duży',       'duża',       'duże',       'dużi'       ], 
 [ 'small',  'mały',       'mała',       'małe',       'małi'       ], 
 [ 'good',   'dobry',      'dobra',      'dobre',      'dobrzy'     ], 
 [ 'bad',    'zły',        'zła',        'złe',        'zli'        ], 
 [ 'tasty',  'smaczny',    'smaczna',    'smaczne',    'smaczni'    ], 
 [ 'nasty',  'niesmaczny', 'niesmaczna', 'niesmaczne', 'niesmaczni' ], 
 [ 'clean',  'czysty',     'czysta',     'czyste',     'czyści'     ], 
 [ 'wet',    'mokry',      'mokra',      'mokre',      'mokrzy'     ], 
 [ 'dry',    'suchy',      'sucha',      'suche',      'susi'       ], 
 [ 'dirty',  'brudny',     'brudna',     'brudne',     'brudni'     ], 
 [ 'sick',   'chory',      'chora',      'chore',      'chorzy'     ], 
 [ 'tired',  'zmęczony',   'zmęczona',   'zmęczone',   'zmęczeni'   ], 
 [ 'hot',    'gorący',     'gorąca',     'gorące',     'gorący'     ], 
 [ 'cold',   'zimny',      'zimna',      'zimne',      'zimni'      ], 
 [ 'white',  'biały',      'biała',      'białe',      'biali'      ], 
 [ 'black',  'czarny',     'czarna',     'czarne',     'czarni'     ], 
 [ 'red',    'czerwony',   'czerwona',   'czerwone',   'czerwoni'   ], 
 [ 'yellow', 'żółty',      'żółta',      'żółte',      'żółci'      ], 
 [ 'blue',   'niebieski',  'niebieska',  'niebieskie', 'niebiescy'  ], 
 [ 'green',  'zielony',    'zielona',    'zielone',    'zieleni'    ],
 [ 'gray',   'szary',      'szara',      'szare',      'szarzy'     ],
 [ 'brown',  'brązowy',    'brązowa',    'brązowe',    'brązowi'    ],
 [ 'pink',   'różowy',     'różowa',     'różowe',     'różowi'     ],
 [ 'tall',   'wysoki',     'wysoka',     'wysokie',    'wysocy'     ], 
 [ 'long',   'długi',      'długa',      'długie',     'dłudzy'     ], 
 [ 'distant','daleki',     'daleka',     'dalekie',    'dalecy'     ], 
 [ 'near',   'bliski',     'bliska',     'bliskie',    'bliscy'     ], 
 [ 'fast',   'szybki',     'szybka',     'szybkie',    'szybcy'     ],
 [ 'new',    'nowy',       'nowa',       'nowe',       'nowi'       ],
 [ 'old',    'stary',      'stara',      'stare',      'starzy'     ],
 [ 'polish', 'polski',     'polska',     'polskie',    'polscy'     ], 
 [ 'short(low)', 'niski',  'niska',      'niskie',     'niscy'      ], 
 [ 'expensive', 'drogi',   'droga',      'drogie',     'drodzy'     ], 
 [ 'cheap',     'tani',    'tania',      'tanie',      'tani'       ]

// [ 'short(hair)', 'krótki', 'krótka', 'krótkie' ], 
 //[ 'heavy', 'ci
 //light lekka ...
 //powolne
 //mili nice
];
adjectiveData.findRow = function(english){
    var i;
    for (i = 0; i < this.length; ++i){
        if (this[i][0] === english){
            return this[i];
        }
    }
    return false;
};
