var yui3 = require('yui');

var YUI = yui3.YUI;

var tester_exports = require ('../modules/preposition-tester.js');
var Tester = tester_exports.Tester;
var preposition_exports = require ('../modules/preposition.js');
var Preposition = preposition_exports.Preposition;
var preposition_data_exports = require ('../modules/data-prepositions.js');
var prepositionData = preposition_data_exports.prepositionData;

var adjective_exports = require ('../modules/adjective.js');
var Adjective = adjective_exports.Adjective;
var word_exports = require ('../modules/word.js');
var Word = word_exports.Word;
var WordYuiAdder = word_exports.addYUI;
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
// (maybe don't need this for prepositions?)
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
            Preposition: {},
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
var przed = new Preposition(prepositionData.findRow('in front of'));
var niebieski = new Adjective(adjectiveData.findRow('blue'));
var szkoła  = new Noun(nounData.findRow("school"));
var mydło = new Noun(nounData.findRow("soap"));
var stół = new Noun(nounData.findRow("table"));


describe('tester', function(){
    var tester = new Tester();

    // need a "addAdjective" method that does this
    tester.addNoun(szkoła);
    tester.adjectives.push(niebieski);
    tester.addPreposition(przed)

    tester.currentPreposition = przed;
    tester.PPAdjective = niebieski;
    tester.PPNoun = szkoła;

    describe('randomPreposition', function(){
        it('should be przed', function(){
            tester.pickRandomActivePreposition().polish.should.equal('przed');
        });
    });

    describe('picked PP Noun', function(){
        it('should be szkoła', function(){
            tester.pickPPNoun(przed).english_sing.should.equal('school');
        });
    });

    describe('picked PP Adjective', function(){
        it('should be niebieski', function(){
            tester.pickPPAdjective(szkoła).english.should.equal('blue');
        });
    });

    describe('generated question', function(){
        tester.generateQuestion();
        describe('english', function(){
            it('should be in front of the blue school', function(){
                tester.currentEnglishSentence().should.equal('in front of the blue school');
            });
        });
        describe('polish', function(){
            it('should be przed niebieskim szkołą', function(){
                tester.currentPolishSentence().should.equal('przed niebieską szkołą');
            });
        });
    });
});

