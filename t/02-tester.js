// this is now "yui" instead of "yui3"? 2013-04-27
//var yui3 = require('yui3');
var yui3 = require('yui');

var YUI = yui3.YUI;


var adjective_exports = require ('../modules/adjective.js');
var Adjective = adjective_exports.Adjective;
var word_exports = require ('../modules/word.js');
var Word = word_exports.Word;
var WordYuiAdder = word_exports.addYUI;
var tester_exports = require ('../modules/tester.js');
var Tester = tester_exports.Tester;
var noun_exports = require ('../modules/noun.js');
var Noun = noun_exports.Noun;
var verb_exports = require ('../modules/verb.js');
var Verb = verb_exports.Verb;

var Y;

// If we don't want to make each word-type thing its own
// module, we'll do a YUI wrapper in noun-verb-object.html.tt
// and implement the same functions here
//http://ronderksen.nl/2012/04/26/how-to-use-mocha-js-to-unit-test-yui/
before (function (done) {
    Y = YUI({
        modules: {
            Word: {},
            Adjective: {},
            Tester: {},
            Noun: {},
            Verb: {},
        }
    }).use(['base'], function () {
        //make this 'augment' instead of 'extend'?
console.log("******** doing the extends**************");
        Y.extend(Adjective, Word);
        Y.augment(Noun, Word);
        Y.augment(Verb, Word);
console.log("Y is " + Y);
        WordYuiAdder(Y);
        done();
    });
});


// load some words to test with
var niebieski = new Adjective(
    ['blue',   'niebieski',  'niebieska',  'niebieskie', 'niebiescy' ]
);
var córka = new Noun(
    [ 'daughter',   'daughters',    'córka',    'córki',     'córki',    'córek',     'córkę',    'córki',     'f',          'i-agent' ] 
);
var książka = new Noun(
    [ 'book',       'books',        'książka',  'książki',   'książki',  'książek',   'książkę',  'książki',   'f',          'no-agent' ] 
);
var spodnica = new Noun(
    [ 'skirt',      'skirts',       'spódnica', 'spódnice',  'spódnicy', 'spódnic',   'spódnicę', 'spódnice',  'f',          'no-agent' ] 
);

var czytać = new Verb(
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
    }
);

describe('tester', function(){
    var tester = new Tester();

    // need a "addAdjective" method that does this
    tester.adjectives.push(niebieski);
    tester.addVerb(czytać);
    tester.addNoun(córka);
    tester.addNoun(książka);

    tester.currentVerb = czytać;
    tester.currentTense = 'present';
    tester.isNegated = false;

    tester.subjectNumber = 'singular';
    tester.currentPerson = 3;
    tester.currentSubject = córka;
    tester.subjectIsPronoun = false;

    tester.currentObject = null;
    tester.objectAdjective = null;
    tester.objectNumber = null;

    describe('currentEnglishSentence', function(){
        it('should be xxx for córka czyta', function(){
            tester.currentEnglishSentence({wrapInPushpinDivs: false}).should.equal('yyy');
        });
    });
    describe('currentPolishSentence', function(){
        it('should be córka czyta', function(){
            tester.currentPolishSentence().should.equal('Córka czyta.');
        });
    });
});
