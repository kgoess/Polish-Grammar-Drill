// this is now "yui" instead of "yui3"? 2013-04-27
//var yui3 = require('yui3');
var yui3 = require('yui');

var YUI = yui3.YUI;


var adjective_exports = require ('../modules/adjective.js');
var Adjective = adjective_exports.Adjective;
var word_exports = require ('../modules/word.js');
var Word = word_exports.Word;
var WordYuiAdder = word_exports.addYUI;
var tester_exports = require ('../modules/nvo-tester.js');
var Tester = tester_exports.Tester;
var noun_exports = require ('../modules/noun.js');
var Noun = noun_exports.Noun;
var verb_exports = require ('../modules/verb.js');
var Verb = verb_exports.Verb;
var pronoun_exports = require ('../modules/pronoun.js');
var Pronoun = pronoun_exports.Pronoun;
var noun_data_exports = require ('../modules/data-nouns.js');
var nounData = noun_data_exports.nounData;
var verb_data_exports = require ('../modules/data-verbs.js');
var verbData = verb_data_exports.verbData;
var adjective_data_exports = require('../modules/data-adjectives.js');
var adjectiveData = adjective_data_exports.adjectiveData;
var pronoun_data_exports = require('../modules/data-pronouns.js');
var pronounData = pronoun_data_exports.pronounData;


// here's a passthru stub formatter that just returns the string
// it was given
function FormatterStub() { }
FormatterStub.prototype.wrapInTooltipDivs = function(args){
    var str              = args.polishStr;
    var wikiLookup       = args.wikiLookup;
    var tooltipStr       = args.tooltipStr;
    return str;
};
FormatterStub.prototype.wrapInPushpinDivs = function(englishStr, partOfSpeech){
    return englishStr;
};


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
        // console.log("doing the extends");
        Y.augment(Adjective, Word);
        Y.augment(Noun, FormatterStub);
        Y.augment(Verb, FormatterStub);
        Y.augment(Pronoun, FormatterStub);
        WordYuiAdder(Y);
        done();
    });
});


// load some words to test with
var niebieski = new Adjective(adjectiveData.findRow('blue'));
var gorący = new Adjective(adjectiveData.findRow('hot'));
var drogi = new Adjective(adjectiveData.findRow('expensive'));
var córka    = new Noun(nounData.findRow("daughter"));
var książka  = new Noun(nounData.findRow("book"));
var spódnica = new Noun(nounData.findRow("skirt"));
var kobieta  = new Noun(nounData.findRow("woman"));
var kiełbasa  = new Noun(nounData.findRow("sausage"));
var marchew = new Noun(nounData.findRow("carrot"));
var koń = new Noun(nounData.findRow("horse"));
var czytać = new Verb(verbData.findRow("to read"));
var mieć = new Verb(verbData.findRow("to have"));
var biegać = new Verb(verbData.findRow("to run"));
var jeść = new Verb(verbData.findRow("to eat"));



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
        it('should be The daughter + to read for córka czyta', function(){
            tester.currentEnglishSentence({wrapInPushpinDivs: false}).should.equal('The daughter + to read');
        });
    });
    describe('currentPolishSentence', function(){
        it('should be córka czyta', function(){
            tester.currentPolishSentence().should.equal('Córka czyta.');
        });
    });
});

//damn, the problem doesn't repro here
describe("testing bug: The woman + will be having + the hot sausage. where's the adjective?", function(){
    var tester = new Tester();

    // need a "addAdjective" method that does this
    tester.adjectives.push(gorący);
    tester.addVerb(mieć);
    tester.addNoun(kiełbasa);
    tester.addNoun(kobieta);

    tester.currentVerb = mieć;
    tester.currentTense = 'future';
    tester.isNegated = false;

    tester.subjectNumber = 'singular';
    tester.currentPerson = 3;
    tester.currentSubject = kobieta;
    tester.subjectIsPronoun = false;

    tester.currentObject = kiełbasa;
    tester.objectAdjective = gorący;
    tester.objectNumber = 'singular';

    describe('currentEnglishSentence', function(){
        it('should be The woman + will be having + the hot sausage.', function(){
            tester.currentEnglishSentence({wrapInPushpinDivs: false}).should.equal('The woman + will be having + the hot sausage.');
        });
    });
    describe('currentPolishSentence', function(){
        it('should be Kobieta będzie miała gorącą kiełbasę.', function(){
            tester.currentPolishSentence().should.equal('Kobieta będzie miała gorącą kiełbasę.');
        });
    });
});

// not a bug, biegły is correct, the verb is biec, not biegać, see notes in verbData
describe("testing bug: Konie będą biegły.?", function(){
    var tester = new Tester();

    tester.addVerb(biegać);
    tester.addNoun(koń);

    tester.currentVerb = biegać;
    tester.currentTense = 'future';
    tester.isNegated = false;

    tester.subjectNumber = 'plural';
    tester.currentPerson = 3;
    tester.currentSubject = koń;
    tester.subjectIsPronoun = false;

    describe('currentEnglishSentence', function(){
        it('should be The horses + will be running.', function(){
            tester.currentEnglishSentence({wrapInPushpinDivs: false}).should.equal('The horses + will be running');
        });
    });
    describe('currentPolishSentence', function(){
        it('should be Konie będą biegły.', function(){
            tester.currentPolishSentence().should.equal('Konie będą biegły.');
        });
    });
});

// bug: you (formal, masc.) + to not eat + the expensive carrot. Pan nie je drogej marchwi. s/b drogiej.
describe("testing bug: drogiej?", function(){
    var tester = new Tester();

    var pan = new Pronoun(pronounData.findRow('you (formal, masc.)'));
    tester.pronouns.push(pan);

    tester.addVerb(jeść);
    //tester.addNoun(koń);

    tester.currentVerb = jeść;
    tester.currentTense = 'present';
    tester.isNegated = true;

    tester.subjectNumber = 'singular';
    tester.currentPerson = 3;
    tester.currentSubject = pan;
    tester.subjectIsPronoun = true;

    tester.currentObject = marchew;
    tester.objectAdjective = drogi;
    tester.objectNumber = 'singular';

    describe('currentEnglishSentence', function(){
        it('should be you (formal, masc.) + to not eat + the expensive carrot', function(){
            tester.currentEnglishSentence({wrapInPushpinDivs: false}).should.equal('You (formal, masc.) + to not eat + the expensive carrot.');
        });
    });
    describe('currentPolishSentence', function(){
        it('should be Pan nie je drogiej marchwi.', function(){
            tester.currentPolishSentence().should.equal('Pan nie je drogiej marchwi.');
        });
    });
});
