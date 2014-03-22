// this is now "yui" instead of "yui3"? 2013-04-27
//var yui3 = require('yui3');
var yui3 = require('yui');

var YUI = yui3.YUI;


var adjective_exports = require ('../modules/adjective.js');
var Adjective = adjective_exports.Adjective;
var word_exports = require ('../modules/word.js');
var Word = word_exports.Word;
var WordYuiAdder = word_exports.addYUI;

// this is the *preposition* tester here
var tester_exports = require ('../modules/preposition-tester.js');
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

var preposition_exports = require('../modules/preposition.js');
var Preposition = preposition_exports.Preposition;
var preposition_data_exports = require('../modules/data-prepositions.js');
var prepositionData = preposition_data_exports.prepositionData;



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
        Y.augment(Preposition, FormatterStub);
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
var dom  = new Noun(nounData.findRow("house"));
var spódnica = new Noun(nounData.findRow("skirt"));
var kobieta  = new Noun(nounData.findRow("woman"));
var kiełbasa  = new Noun(nounData.findRow("sausage"));
var zwierzę = new Noun(nounData.findRow("animal"));
var marchew = new Noun(nounData.findRow("carrot"));
var koń = new Noun(nounData.findRow("horse"));
var krzeszła = new Noun(nounData.findRow("chair"));
var czytać = new Verb(verbData.findRow("to read"));
var wracać = new Verb(verbData.findRow("to return"));
var biegać = new Verb(verbData.findRow("to run"));
var jeść = new Verb(verbData.findRow("to eat"));

var w_Locative = new Preposition(prepositionData.findRow("w+locative"));
var pod = new Preposition(prepositionData.findRow("pod+instrumental"));





describe('tester', function(){
    var tester = new Tester();

    // need a "addAdjective" method that does this
    tester.adjectives.push(niebieski);
    tester.addVerb(czytać);
    tester.addNoun(córka);
    tester.addNoun(książka);
    tester.addNoun(dom);
    tester.addPreposition(w_Locative);

    tester.prepositionalNoun = dom;
    tester.currentVerb = czytać;
    tester.currentTense = 'present';
    tester.isNegated = false; // let's not bother with negations for prepositions

    tester.subjectNumber = 'singular';
    tester.currentPerson = 3;
    tester.currentSubject = córka;
    tester.subjectIsPronoun = false;

    tester.currentObject = null;
    tester.objectAdjective = null;
    tester.objectNumber = null;

    describe('currentEnglishSentence locative', function(){
        it('as singular should be The daughter + to read + in the house', function(){
            tester.currentPreposition = w_Locative;
            tester.prepositionalNounNumber = 'singular';
            tester.currentEnglishSentence({wrapInPushpinDivs: false}).should.equal('The daughter + to read + in the house');
        });
        it('as plural should be The daughter + to read + in the houses', function(){
            tester.currentPreposition = w_Locative;
            tester.prepositionalNounNumber = 'plural';
            tester.currentEnglishSentence({wrapInTooltipDivs: false}).should.equal('The daughter + to read + in the houses');
        });
    });
    describe('currentPolishSentence locative', function(){
        it('as singular should be córka czyta w domu', function(){
            tester.currentPreposition = w_Locative;
            tester.prepositionalNounNumber = 'singular';
            tester.currentPolishSentence().should.equal('Córka czyta w domu.');
        });
        it('as plural should be córka czyta w domach', function(){
            tester.currentPreposition = w_Locative;
            tester.prepositionalNounNumber = 'plural';
            tester.currentPolishSentence().should.equal('Córka czyta w domach.');
        });
    });


    describe('currentEnglishSentence instrumental', function(){
        it('as singular should be The daughter + to read + under the house for córka czyta', function(){
            tester.currentPreposition = pod;
            tester.prepositionalNounNumber = 'singular';
            tester.currentEnglishSentence({wrapInPushpinDivs: false}).should.equal('The daughter + to read + under the house');
        });
        it('as plural should be The daughter + to read + under the houses for córka czyta', function(){
            tester.currentPreposition = pod;
            tester.prepositionalNounNumber = 'plural';
            tester.currentEnglishSentence({wrapInTooltipDivs: false}).should.equal('The daughter + to read + under the houses');
        });
    });
    describe('currentPolishSentence instrumental', function(){
        it('as plural should be córka czyta pod domem', function(){
            tester.currentPreposition = pod;
            tester.prepositionalNounNumber = 'singular';
            tester.currentPolishSentence().should.equal('Córka czyta pod domem.');
        });
        it('as plural should be córka czyta pod domami', function(){
            tester.currentPreposition = pod;
            tester.prepositionalNounNumber = 'plural';
            tester.currentPolishSentence().should.equal('Córka czyta pod domami.');
        });
    });



});
