


var verbData = [
    { infinitive: [ 'czytać', "to read" ],
      english_past: 'was reading',
      english_future: 'will be reading',
      transitive: true,
      ok_subjects: 'i-agent',
      objects: [ 'książka', 'gazeta', 'list', 'słownik', 'znak' 
      ],
      present_tense: {
        s: [ 'czytam', 'czytasz', 'czyta' ],
        p: [ 'czytamy', 'czytacie', 'czytają' ]
      },
      past_tense: {
        s: [ 'czytałem/czytałam', 'czytałeś/czytałaś', 'czytał/czytała/czytało' ],
        p: [ 'czytaliśmy/czytałyśmy', 'czytaliście/czytałyście', 'czytali/czytały' ]
      },
      future_tense: {
        s: [ 'czytał', 'czytała' ],
        p: [ 'czytali', 'czytały']
      }
    },

    { infinitive: [ 'jeść', "to eat" ],
      english_past: 'was eating',
      english_future: 'will be eating',
      transitive: true,
      ok_subjects: 'agent',
      objects: [ 'kanapka', 'jabłko', 'jajko', 'kiełbasa', 'marchew', 'kapusta' 
      ],
      present_tense: {
        s: [ 'jem', 'jesz', 'je' ],
        p: [ 'jemy', 'jecie', 'jedzą' ]
      },
      past_tense: {
        s: [ 'jadłem/jadłam', 'jadłeś/jadłaś', 'jadł/jadła/jadło' ],
        p: [ 'jedliśmy/jadłyśmy', 'jedliście/jadłysćie', 'jedli/jadły' ]
      }, 
      future_tense: {
        s: [ 'jadł', 'jadła'  ],
        p: [ 'jedli', 'jadły' ]
      }
    },

    { infinitive: [ 'lubić', 'to like' ],
      english_past: 'was liking',
      english_future: 'will be liking',
      transitive: true,
      ok_subjects: 'agent',
      objects: 'any',
      present_tense: {
        s: [ 'lubię', 'lubisz', 'lubi' ],
        p: [ 'lubimy', 'lubicie', 'lubią']
      },
      past_tense: {
        s: [ 'lubiłem/lubiłam', 'lubiłeś/lubiłaś', 'lubił/lubiła/lubiło' ],
        p: [ 'lubiliśmy/lubiłyśmy', 'lubiliście/lubiłyście', 'lubili/lubiły' ]
      },
      future_tense: {
        s: [ 'lubił', 'lubiła'  ],
        p: [ 'lubili', 'lubiły' ]
      }
    },
// apparently chcieć takes the genitive 
// http://www.polishforums.com/grammar-usage-18/adjective-endings-masculine-personal-51432/
//    { infinitive: [ 'chcieć', 'to want' ],
//      transitive: true,
//      ok_subjects: 'i-agent',
//      objects: 'any', 
//      present_tense: {
//        s: [ 'chcę', 'chcesz', 'chce' ],
//        p: [ 'chcemy', 'chcecie', 'chcą' ]
//      }
//    },

    { infinitive: ['biec', 'to run' ],
        english_past: 'was running',
        english_future: 'will be running',
       //http://en.wiktionary.org/wiki/biec see also http://en.wiktionary.org/wiki/biegać
       //The difference in the meaning is that biegać implies a repeated action whereas biec only a single/permanent one.
      transitive: false,
      ok_subjects: 'agent',
      present_tense: {
        s: [ 'biegnę', 'biegniesz', 'biegnie' ],
        p: [ 'biegniemy', 'biegniecie', 'biegną' ]
      },
      past_tense: {
        s: [ 'biegłem/biegłam', 'biegłeś/biegłaś', 'biegł/biegła/biegło' ],
        p: [ 'biegliśmy/biegłyśmy', 'biegliście/biegłyście', 'biegli/biegły' ]
      },
        
      future_tense: {
        s: [ 'biegł', 'biegła'  ],
        p: [ 'biegli', 'biegły' ]
      }
    },
    { infinitive: ['brać', 'to take' ],
      english_past: 'was taking',
      english_future: 'will be taking',
      transitive: true,
      ok_subjects: 'agent',
      objects: 'any',
      present_tense: {
        s: ['biorę', 'bierzesz', 'bierze' ],
        p: ['bierzemy', 'bierzecie', 'biorą' ]
      },
      past_tense: {
        s: [ 'brałem/brałam', 'brałeś/brałaś', 'brał/brała/brało' ],
        p: [ 'braliśmy/brałyśmy', 'braliście/brałyście', 'brali/brały' ]
      },
      future_tense: {
        s: [ 'brał', 'brała'  ],
        p: [ 'brali', 'brały' ]
      }
    },
    { infinitive: ['potrzebować', 'to need' ],
      english_past: 'was needing', 
      english_future: 'will be needing',
      transitive: true,
      object_case: 'genitive',
      ok_subjects: 'i-agent',
      objects: 'any',
      present_tense: {
        s: [ 'potrzebuję', 'potrzebujesz', 'potrzebuje' ],
        p: [ 'potrzebujemy', 'potrzebujecie', 'potrzebują' ]
      },
      past_tense: {
        s: [ 'potrzebowałem/potrzebowałam','potrzebowałeś/potrzebowałaś','potrzebował/potrzebowała' ],
        p: [ 'potrzebowaliśmy/potrzebowałyśmy', 'potrzebowaliście/potrzebowałyście', 'potrzebowali/potrzebowały' ]
      },
      future_tense: {
        s: [ 'potrzebował', 'potrzebowała'  ],
        p: [ 'potrzebowali', 'potrzebowały' ] 
      }
    },
    { infinitive: ['wracać', 'to return' ],
      english_past: 'was returning', 
      english_future: 'will be returning',
      transitive: false,
      ok_subjects: 'agent',
      //objects: 'any',
      present_tense: {
        s: [ 'wracam', 'wracasz', 'wraca' ],
        p: [ 'wracamy', 'wracacie', 'wracają' ]
      },
      past_tense: {
        s: [ 'wracałem/wracałam','wracałeś/wracałaś','wracał/wracała' ],
        p: [ 'wracaliśmy/wracałyśmy', 'wracaliście/wracałyście', 'wracali/wracały' ]
      },
      future_tense: {
        s: [ 'wracał', 'wracała'  ],
        p: [ 'wracali', 'wracały' ] 
      }
    },
    { infinitive: ['mieć', 'to have' ],
      english_past: 'was having', 
      english_future: 'will be having',
      transitive: true,
      ok_subjects: 'agent',
      objects: 'any',
      present_tense: {
        s: [ 'mam', 'masz', 'ma' ],
        p: [ 'mamy', 'macie', 'mają' ]
      },
      past_tense: {
        s: [ 'miałem/miałam','miałeś/miałaś','miał/miała' ],
        p: [ 'mieliśmy/miałysmy', 'mieliście/miałyście', 'mieli/miały' ]
      },
      future_tense: {
        s: [ 'miał', 'miała'  ],
        p: [ 'mieli', 'miały' ] 
      }
    },
    { infinitive: ['widzieć', 'to see' ],
      english_past: 'was seeing', 
      english_future: 'will be seeing',
      transitive: true,
      ok_subjects: 'agent',
      objects: 'any',
      present_tense: {
        s: [ 'widzę', 'widzisz', 'widzi' ],
        p: [ 'widzimy', 'widzicie', 'widzą' ]
      },
      past_tense: {
        s: [ 'widziałem/widziałam','widziałeś/widziałaś','widział/widziała' ],
        p: [ 'widzieliśmy/widziełyśmy', 'widzieliście/widziełyscie', 'widzieli/widziały' ]
      },
      future_tense: {
        s: [ 'widział', 'widziała'  ],
        p: [ 'widzieli', 'widziały' ] 
      }
    },
    { infinitive: ['słuchać', 'to listen to' ],
      english_past: 'was listening to', 
      english_future: 'will be listening to',
      transitive: true,
      ok_subjects: 'agent',
      object_case: 'genitive',
      objects: [ 'kot', 'samochód', 'rower', 'pociąg', 'samolot', 'zegar', 
                 'zegarek', 'chłopiec', 'zabawka', 'koń', 'kobieta', 'siostra', 
                 'żona', 'córka', 'zwierzę', 'ojciec', 'mąż', 'dziadek', 
                 'niedźwiedź', 'ptak', 'żółw', 'wąż', 'żaba', 'krowa' ],
      present_tense: {
        s: [ 'słucham',  'słuchasz', 'słucha' ],
        p: [ 'słuchamy', 'słuchacie', 'słuchają' ]
      },
      past_tense: {
        s: [ 'słuchałem/słuchałam',     'słuchałeś/słuchałaś',       'słuchał/słuchała' ],
        p: [ 'słuchaliśmy/słuchałyśmy', 'słuchaliście/słuchałyście', 'słuchali/słuchały' ]
      },
      future_tense: {
        s: [ 'słuchał',  'słuchała'  ],
        p: [ 'słuchali', 'słuchały' ] 
      }
    },
    { infinitive: ['mieszkać', 'to live' ],
      english_past: 'was living', 
      english_future: 'will be living',
      transitive: false,
      ok_subjects: 'agent',
      //object_case: 'genitive',
      //objects: [ 'kot', 'samochód', 'rower', 'pociąg', 'samolot', 'zegar', 
      present_tense: {
        s: [ 'mieszkam',  'mieszkasz', 'mieszka' ],
        p: [ 'mieszkamy', 'mieszkacie', 'mieszkają' ]
      },
      past_tense: {
        s: [ 'mieszkałem/mieszkałam',     'mieszkałeś/mieszkałaś',       'mieszkał/mieszkała' ],
        p: [ 'mieszkaliśmy/mieszkałyśmy', 'mieszkaliście/mieszkałyście', 'mieszkali/mieszkały' ]
      },
      future_tense: {
        s: [ 'mieszkał',  'mieszkała'  ],
        p: [ 'mieszkali', 'mieszkały' ] 
      },
      prepositional_phrase: 'required', // required/optional/never
      prepositional_nouns: [ 'place' ]
    }
];

// "exports" is needed for our unit tests in mocha
// this fakes it up in case we're *not* in mocha
var exports;
if (typeof exports === "undefined"){
    exports = {};
} 
verbData.findRow = function(english){
    var i;
    for (i = 0; i < this.length; ++i){
        if (this[i]['infinitive'][1] === english){
            return this[i];
        }
    }
    throw("Error: no verb match for '" + english + "'");
};
exports.verbData = verbData;
