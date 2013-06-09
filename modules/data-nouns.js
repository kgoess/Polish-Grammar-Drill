
//http://en.wikibooks.org/wiki/Polish/Masculine_noun_declension
//http://en.wiktionary.org/wiki/chłopiec
//  eng sing     eng pl          nom_sing    nom_pl       gen_sing    gen_pl       acc_sing    acc_pl     
var nounData = [
 [ 'house',      'houses',       'dom',      'domy',      'domu',     'domów',     'dom',      'domy',      'domem',      'domu',       'm',          'no-agent' ], 
 [ 'cat',        'cats',         'kot',      'koty',      'kota',     'kotów',     'kota',     'koty',      'kotem',      'kocie',      'm-animate',  'agent' ], 
 [ 'table',      'tables',       'stół',     'stoły',     'stołu',    'stołów',    'stół',     'stoły',     'stołem',     'stole',      'm',          'no-agent'  ], 
 [ 'store',      'stores',       'sklep',    'sklepy',    'sklepu',   'sklepów',   'sklep',    'sklepy',    'sklepem',    'sklepie',    'm',          'no-agent' ], 
 [ 'church',     'churches',     'kościół',  'kościoły',  'kościoła', 'kościołów', 'kościół',  'kościoły',  'kościołem',  'kościele',   'm',          'no-agent' ], 
 [ 'car',        'cars',         'samochód', 'samochody', 'samochodu','samochodów','samochód', 'samochody', 'samochodem', 'samochodzie','m',          'no-agent' ], 
 [ 'bicycle',    'bicycles',     'rower',    'rowery',    'roweru',   'rowerów',   'rower',    'rowery',    'rowerem',    'rowerze',    'm',          'no-agent' ],
 [ 'train',      'trains',       'pociąg',   'pociągi',   'pociągu',  'pociągów',  'pociąg',   'pociągi',   'pociągiem',  'pociągu',    'm',          'no-agent' ],
 [ 'airplane',   'airplanes',    'samolot',  'samoloty',  'samolotu', 'samolotów', 'samolot',  'samoloty',  'samolotem',  'samolocie',  'm',          'no-agent' ], 
 [ 'clock',      'clocks',       'zegar',    'zegary',    'zegara',   'zegarów',   'zegar',    'zegary',    'zegarem',    'zegarze',    'm',          'no-agent' ],
 [ 'watch',      'watches',      'zegarek',  'zegarki',   'zegarka',  'zegarków',  'zegarek',  'zegarki',   'zegarkiem',  'zegarku',    'm',          'no-agent' ],
 [ 'room',       'rooms',        'pokój',    'pokoje',    'pokoju',   'pokojów',   'pokój',    'pokoje',    'pokojem',    'pokoju',     'm',          'no-agent' ],
 [ 'boy',        'boys',         'chłopiec', 'chłopcy',   'chłopca',  'chłopców',  'chłopca',  'chłopców',  'chłopcem',   'chłopcu',    'm-personal', 'i-agent' ], 
 [ 'pen',        'pens',         'długopis', 'długopisy', 'długopisu','długopisów','długopis', 'długopisy', 'długopisem', 'długopisie', 'm',          'no-agent' ], 
 [ 'shoe',       'shoes',        'but',      'buty',      'buta',     'butów',     'but',      'buty',      'butem',      'bucie',      'm',          'no-agent' ], 
 [ 'sandwich',   'sandwiches',   'kanapka',  'kanapki',   'kanapki',  'kanapek',   'kanapkę',  'kanapki',   'kanapką',    'kanapce',    'f',          'no-agent' ],
 [ 'toy',        'toys',         'zabawka',  'zabawki',   'zabawki',  'zabawek',   'zabawkę',  'zabawki',   'zabawką',    'zabawce',    'f',          'no-agent' ],
 [ 'bank',       'banks',        'bank',     'banki',     'banku',    'banków',    'bank',     'banki',     'bankiem',    'banku',      'm',          'no-agent' ], 
 [ 'ball',       'balls',        'piłka',    'piłki',     'piłki',    'piłek',     'piłkę',    'piłki',     'piłką',      'piłce',      'f',          'no-agent' ],
 [ 'key',        'keys',         'klucz',    'klucze',    'klucza',   'kluczy',    'klucz',    'klucze',    'kluczem',    'kluczu',     'm',          'no-agent' ], 
 [ 'plate',      'plates',       'talerz',   'talerze',   'talerza',  'talerzy',   'talerz',   'talerze',   'talerzem',   'talerzu',    'm',          'no-agent' ], 
 [ 'hat',        'hats',         'kapelusz', 'kapelusze', 'kapelusza','kapeluszy', 'kapelusz', 'kapelusze', 'kapeluszem', 'kapeluszu',  'm',          'no-agent' ], 
 [ 'horse',      'horses',       'koń',      'konie',     'konia',    'koni',      'konia',    'konie',     'koniem',     'koniu',      'm-animate',  'agent' ], 
 [ 'woman',      'women',        'kobieta',  'kobiety',   'kobiety',  'kobiet',    'kobietę',  'kobiety',   'kobietą',    'kobiecie',   'f',          'i-agent' ], 
 [ 'school',     'schools',      'szkoła',   'szkoły',    'szkoły',   'szkół',     'szkołę',   'szkoły',    'szkołą',     'szkole',     'f',          'no-agent' ], 
 [ 'sister',     'sisters',      'siostra',  'siostry',   'siostry',  'siostr',    'siostrę',  'siostry',   'siostrą',    'siostrze',   'f',          'i-agent' ], 
 [ 'wife',       'wives',        'żona',     'żony',      'żony',     'żon',       'żonę',     'żony',      'żoną',       'żonie',      'f',          'i-agent' ], 
 [ 'cloud',      'clouds',       'chmura',   'chmury',    'chmury',   'chmur',     'chmurę',   'chmury',    'chmurą',     'chmurze',    'f',          'no-agent' ], 
 [ 'fish',       'fishes',       'ryba',     'ryby',      'ryby',     'ryb',       'rybę',     'ryby',      'rybą',       'rybie',      'f',          'agent' ], 
 [ 'bench',      'benches',      'ławka',    'ławki',     'ławki',    'ławek',     'ławkę',    'ławki',     'ławką',      'ławce',      'f',          'no-agent' ], 
 [ 'book',       'books',        'książka',  'książki',   'książki',  'książek',   'książkę',  'książki',   'książką',    'książce',    'f',          'no-agent' ], 
 [ 'daughter',   'daughters',    'córka',    'córki',     'córki',    'córek',     'córkę',    'córki',     'córką',      'córce',      'f',          'i-agent' ], 
 [ 't-shirt',    't-shirts',     'koszulka', 'koszulki',  'koszulki', 'koszulek',  'koszulkę', 'koszulki',  'koszulką',   'koszulce',   'f',          'no-agent' ], 
 [ 'skirt',      'skirts',       'spódnica', 'spódnice',  'spódnicy', 'spódnic',   'spódnicę', 'spódnice',  'spódnicą',   'spódnicy',   'f',          'no-agent' ], 
 [ 'street',     'streets',      'ulica',    'ulice',     'ulicy',    'ulic',      'ulicę',    'ulice',     'ulicą',      'ulicy',      'f',          'no-agent' ], 
 [ 'road',       'roads',        'droga',    'drogi',     'drogi',    'dróg',      'drogę',    'drogi',     'drogą',      'drodze',     'f',          'no-agent' ], 
 [ 'apple',      'apples',       'jabłko',   'jabłka',    'jabłka',   'jabłek',    'jabłko',   'jabłka',    'jabłkiem',   'jabłku',     'n',          'no-agent' ], 
 [ 'chair',      'chairs',       'krzesło',  'krzesła',   'krzesła',  'krzeseł',   'krzesło',  'krzesła',   'krzesłem',   'krześle',    'n',          'no-agent' ], 
 [ 'soap',       'soaps',        'mydło',    'mydła',     'mydła',    'mydeł',     'mydło',    'mydła',     'mydłem',     'mydle',      'n',          'no-agent' ], 
 [ 'bed',        'beds',         'łóżko',    'łóżka',     'łóżka',    'łóżek',     'łóżko',    'łóżka',     'łóżkiem',    'łóżku',      'n',          'no-agent' ], 
 [ 'animal',     'animals',      'zwierzę',  'zwierzęta', 'zwierzęcia','zwierząt', 'zwierzę',  'zwierzęta', ['zwierzęciem', 'zwierzętami'],['zwierzęciu', 'zwierzętach'], 'n',          'agent' ],
 [ 'father',     'fathers',      'ojciec',   'ojcowie',   'ojca',     'ojców',     'ojca',     'ojców',     'ojcem',      'ojcu',       'm-personal', 'i-agent' ],
 [ 'husband',    'husbands',     'mąż',      'mężowie',   'męża',     'mężów',     'męża',     'mężów',     'mężem',      'mężu',       'm-personal', 'i-agent' ],
 [ 'grandpa',    'grandpas',     'dziadek',  'dziadkowie','dziadka',  'dziadków',  'dziadka',  'dziadków',  'dziadkiem',  'dziadku',    'm-personal', 'i-agent' ],
 [ 'newspaper',  'newspapers',   'gazeta',   'gazety',    'gazety',   'gazet',     'gazetę',   'gazety',    'gazetą',     'gazecie',    'f',          'no-agent' ],
 [ 'letter',     'letters',      'list',     'listy',     'listu',    'listów',    'list',     'listy',     'listem',     'liście',     'm',          'no-agent' ],    
 [ 'dictionary', 'dictionaries', 'słownik',  'słowniki',  'słownika', 'słowników', 'słownik',  'słowniki',  'słownikiem', 'słowniku',   'm',          'no-agent' ], 
 [ 'sign',       'signs',        'znak',     'znaki',     'znaku',    'znaków',    'znak',     'znaki',     'znakiem',    'znaku',      'm',          'no-agent' ],
 [ 'egg',        'eggs',         'jajko',    'jajka',     'jajka',    'jajek',     'jajko',    'jajka',     'jakiem',     'jajku',      'n',          'no-agent' ],
 [ 'carrot',     'carrots',      'marchew',  'marchwie',  'marchwi',  'marchwi',   'marchew',  'marchwie',  'marchwią',   'marchwi',    'f',          'no-agent' ],
 [ 'sausage',    'sausages',     'kiełbasa', 'kiełbasy',  'kiełbasy', 'kiełbas',   'kiełbasę', 'kiełbasy',  'kiełbasą',   'kiełbasie',  'f',          'no-agent' ],
 [ 'bridge',     'bridges',      'most',     'mosty',     'mostu',    'mostów',    'most',     'mosty',     'mostem',     'moście',     'm',          'no-agent' ],
 [ 'friend',     'friends',      'przyjaciel','przyjaciele','przyjaciela','przyjaciół','przyjaciela','przyjaciół',['przyjacielem', 'przyjaciółmi'], ['przyjacielu', 'przyjaciołach'], 'm-personal',     'i-agent' ],
 [ 'cabbage',    'cabbages',     'kapusta',  'kapusty',   'kapusty',  'kapust',    'kapustę',  'kapusty',   'kapustą',    'kapuśćie',   'f',          'no-agent' ]
] ;



// "exports" is needed for our unit tests in mocha
// this fakes it up in case we're *not* in mocha
var exports;
if (typeof exports === "undefined"){
    exports = {};
} 
nounData.findRow = function(english){
    var i;
    for (i = 0; i < this.length; ++i){
        if (this[i][0] === english){
            return this[i];
        }
    }
    throw("Error: " + english + " not found in noun_data");
};
exports.nounData = nounData;



