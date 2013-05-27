
//http://en.wikibooks.org/wiki/Polish/Masculine_noun_declension
//http://en.wiktionary.org/wiki/chłopiec
//  eng sing     eng pl          nom_sing    nom_pl       gen_sing    gen_pl       acc_sing    acc_pl     
var nounData = [
 [ 'house',      'houses',       'dom',      'domy',      'domu',     'domów',     'dom',      'domy',      'm',          'no-agent' ], 
 [ 'cat',        'cats',         'kot',      'koty',      'kota',     'kotów',     'kota',     'koty',      'm-animate',  'agent' ], 
 [ 'table',      'tables',       'stół',     'stoły',     'stołu',    'stołów',    'stół',     'stoły',     'm',          'no-agent'  ], 
 [ 'store',      'stores',       'sklep',    'sklepy',    'sklepu',   'sklepów',   'sklep',    'sklepy',    'm',          'no-agent' ], 
 [ 'church',     'churches',     'kościół',  'kościoły',  'kościoła', 'kościołów', 'kościół',  'kościoły',  'm',          'no-agent' ], 
 [ 'car',        'cars',         'samochód', 'samochody', 'samochodu','samochodów','samochód', 'samochody', 'm',          'no-agent' ], 
 [ 'bicycle',    'bicycles',     'rower',    'rowery',    'roweru',   'rowerów',   'rower',    'rowery',    'm',          'no-agent' ],
 [ 'train',      'trains',       'pociąg',   'pociągi',   'pociągu',  'pociągów',  'pociąg',   'pociągi',   'm',          'no-agent' ],
 [ 'airplane',   'airplanes',    'samolot',  'samoloty',  'samolotu', 'samolotów', 'samolot',  'samoloty',  'm',          'no-agent' ], 
 [ 'clock',      'clocks',       'zegar',    'zegary',    'zegara',   'zegarów',   'zegar',    'zegary',    'm',          'no-agent' ],
 [ 'watch',      'watches',      'zegarek',  'zegarki',   'zegarka',  'zegarków',  'zegarek',  'zegarki',   'm',          'no-agent' ],
 [ 'room',       'rooms',        'pokój',    'pokoje',    'pokoju',   'pokojów',   'pokój',    'pokoje',    'm',          'no-agent' ],
 [ 'boy',        'boys',         'chłopiec', 'chłopcy',   'chłopca',  'chłopców',  'chłopca',  'chłopców',  'm-personal', 'i-agent' ], 
 [ 'pen',        'pens',         'długopis', 'długopisy', 'długopis', 'długopisów','długopis', 'długopisy', 'm',          'no-agent' ], 
 [ 'shoe',       'shoes',        'but',      'buty',      'buta',     'butów',     'but',      'buty',      'm',          'no-agent' ], 
 [ 'sandwich',   'sandwiches',   'kanapka',  'kanapki',   'kanapki',  'kanapek',   'kanapkę',  'kanapki',   'f',          'no-agent' ],
 [ 'toy',        'toys',         'zabawka',  'zabawki',   'zabawki',  'zabawek',   'zabawkę',  'zabawki',   'f',          'no-agent' ],
 [ 'bank',       'banks',        'bank',     'banki',     'banku',    'banków',    'bank',     'banki',     'm',          'no-agent' ], 
 [ 'ball',       'balls',        'piłka',    'piłki',     'piłki',    'piłek',     'piłkę',    'piłki',     'f',          'no-agent' ],
 [ 'key',        'keys',         'klucz',    'klucze',    'klucza',   'kluczy',    'klucz',    'klucze',    'm',          'no-agent' ], 
 [ 'plate',      'plates',       'talerz',   'talerze',   'talerza',  'talerzy',   'talerz',   'talerze',   'm',          'no-agent' ], 
 [ 'hat',        'hats',         'kapelusz', 'kapelusze', 'kapelusza','kapeluszy', 'kapelusz', 'kapelusze', 'm',          'no-agent' ], 
 [ 'horse',      'horses',       'koń',      'konie',     'konia',    'koni',      'konia',    'konie',     'm-animate',  'agent' ], 
 [ 'woman',      'women',        'kobieta',  'kobiety',   'kobiety',  'kobiet',    'kobietę',  'kobiety',   'f',          'i-agent' ], 
 [ 'school',     'schools',      'szkoła',   'szkoły',    'szkoły',   'szkół',     'szkołę',   'szkoły',    'f',          'no-agent' ], 
 [ 'sister',     'sisters',      'siostra',  'siostry',   'siostry',  'siostr',    'siostrę',  'siostry',   'f',          'i-agent' ], 
 [ 'wife',       'wives',        'żona',     'żony',      'żony',     'żon',       'żonę',     'żony',      'f',          'i-agent' ], 
 [ 'cloud',      'clouds',       'chmura',   'chmury',    'chmury',   'chmur',     'chmurę',   'chmury',    'f',          'no-agent' ], 
 [ 'fish',       'fishes',       'ryba',     'ryby',      'ryby',     'ryb',       'rybę',     'ryby',      'f',          'agent' ], 
 [ 'bench',      'benches',      'ławka',    'ławki',     'ławki',    'ławek',     'ławkę',    'ławki',     'f',          'no-agent' ], 
 [ 'book',       'books',        'książka',  'książki',   'książki',  'książek',   'książkę',  'książki',   'f',          'no-agent' ], 
 [ 'daughter',   'daughters',    'córka',    'córki',     'córki',    'córek',     'córkę',    'córki',     'f',          'i-agent' ], 
 [ 't-shirt',    't-shirs',      'koszulka', 'koszulki',  'koszulki', 'koszulek',  'koszulkę', 'koszulki',  'f',          'no-agent' ], 
 [ 'skirt',      'skirts',       'spódnica', 'spódnice',  'spódnicy', 'spódnic',   'spódnicę', 'spódnice',  'f',          'no-agent' ], 
 [ 'street',     'streets',      'ulica',    'ulice',     'ulicy',    'ulic',      'ulica',    'ulice',     'f',          'no-agent' ], 
 [ 'road',       'roads',        'droga',    'drogi',     'drogi',    'dróg',      'drogę',    'drogi',     'f',          'no-agent' ], 
 [ 'apple',      'apples',       'jabłko',   'jabłka',    'jabłka',   'jabłek',    'jabłko',   'jabłka',    'n',          'no-agent' ], 
 [ 'chair',      'chairs',       'krzesło',  'krzesła',   'krzesła',  'krzeseł',   'krzesło',  'krzesła',   'n',          'no-agent' ], 
 [ 'soap',       'soaps',        'mydło',    'mydła',     'mydła',    'mydeł',     'mydło',    'mydła',     'n',          'no-agent' ], 
 [ 'bed',        'beds',         'łóżko',    'łóżka',     'łóżka',    'łóżek',     'łóżko',    'łóżka',     'n',          'no-agent' ], 
 [ 'animal',     'animals',      'zwierzę',  'zwierzęta', 'zwierzęcia','zwierząt', 'zwierzę',  'zwierzęta', 'n',          'agent' ],
 [ 'father',     'fathers',      'ojciec',   'ojcowie',   'ojca',     'ojców',     'ojca',     'ojców',     'm-personal', 'i-agent' ],
 [ 'husband',    'husbands',     'mąż',      'mężowie',   'męża',     'mężów',     'męża',     'mężów',     'm-personal', 'i-agent' ],
 [ 'grandpa',    'grandpas',     'dziadek',  'dziadkowie','dziadka',  'dziadków',  'dziadka',  'dziadków',  'm-personal', 'i-agent' ],
 [ 'newspaper',  'newspapers',   'gazeta',   'gazety',    'gazety',   'gazet',     'gazetę',   'gazety',    'f',          'no-agent' ],
 [ 'letter',     'letters',      'list',     'listy',     'listu',    'listów',    'list',     'listy',     'm',          'no-agent' ],    
 [ 'dictionary', 'dictionaries', 'słownik',  'słowniki',  'słownika', 'słowników', 'słownik',  'słowniki',  'm',          'no-agent' ], 
 [ 'sign',       'signs',        'znak',     'znaki',     'znaku',    'znaków',    'znak',     'znaki',     'm',          'no-agent' ],
 [ 'egg',        'eggs',         'jajko',    'jajka',     'jajka',    'jajek',     'jajko',    'jajka',     'n',          'no-agent' ],
 [ 'carrot',     'carrots',      'marchew',  'marchwie',  'marchwi',  'marchwi',   'marchew',  'marchwie',  'f',          'no-agent' ],
 [ 'sausage',    'sausages',     'kiełbasa', 'kiełbasy',  'kiełbasy', 'kiełbas',   'kiełbasę', 'kiełbasy',  'f',          'no-agent' ],
 [ 'bridge',     'bridges',      'most',     'mosty',     'mostu',    'mostów',    'most',     'mosty',     'm',          'no-agent' ],
 [ 'friend',     'friends',      'przyjaciel','przyjaciele','przyjaciela','przyjaciół','przyjaciela','przyjaciół','m-personal',     'i-agent' ],
 [ 'cabbage',    'cabbages',     'kapusta',  'kapusty',   'kapusty',  'kapust',    'kapustę',  'kapusty',   'f',          'no-agent' ]
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



