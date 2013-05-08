// this is now "yui" instead of "yui3"? 2013-04-27
//var yui3 = require('yui3');
var yui3 = require('yui');

var YUI = yui3.YUI;


var adjective_exports = require ('../modules/adjective.js');
var Adjective = adjective_exports.Adjective;
var word_exports = require ('../modules/word.js');
var Word = word_exports.Word;
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
        Y.extend(Adjective, Word);
        Y.extend(Noun, Word);
        Y.extend(Verb, Word);
        done();
    });
});


describe('adjective', function(){
    describe('genitiveSingularForStemsEndingIn-k', function(){
        var niebieski = new Adjective(
            ['blue',   'niebieski',  'niebieska',  'niebieskie', 'niebiescy' ]
        );
        var córka = new Noun(
            [ 'daughter',   'daughters',    'córka',    'córki',     'córki',    'córek',     'córkę',    'córki',     'f',          'i-agent' ] 
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
        var Tester = new Tester();
        tester.adjectives.push(adjective);

        it('(f) should be niebieskiej for niebieski', function(){
            niebieski.genitiveSingularForGender('f').should.equal('niebieskiej');
        });
        it('(n) should be niebieskiego for niebieski', function(){
            niebieski.genitiveSingularForGender('n').should.equal('niebieskiego');
        });
        it('other singulars for niebieski should stay the same', function(){
            niebieski.genitiveSingularForGender('m').should.equal('niebieskiego');
            niebieski.genitiveSingularForGender('m-animate').should.equal('niebieskiego');
            niebieski.genitiveSingularForGender('m-personal').should.equal('niebieskiego');
        });
    })
    describe('accusativeSingularForFeminineStemsEndingIn-k', function(){
        var niebieski = new Adjective(
            ['blue',   'niebieski',  'niebieska',  'niebieskie', 'niebiescy' ]
        );
        it('(f) should be niebieską for niebieski', function(){
            niebieski.accusativeSingularForGender('f').should.equal('niebieską');
        });
        it('other singulars for niebieski should stay the same', function(){
            niebieski.accusativeSingularForGender('n').should.equal('niebieskie');
            niebieski.accusativeSingularForGender('m').should.equal('niebieski');
            niebieski.accusativeSingularForGender('m-animate').should.equal('niebieskiego');
            niebieski.accusativeSingularForGender('m-personal').should.equal('niebieskiego');
        });
    })

    describe('genitivePluralForStemsEndingIn-i', function(){
        var tani = new Adjective(
            [ 'cheap',     'tani',    'tania',      'tanie',      'tani'       ]
        );
        var niebieski = new Adjective(
            ['blue',   'niebieski',  'niebieska',  'niebieskie', 'niebiescy' ]
        );
        it('(m-pers) should be tanich, not taniich', function(){
            tani.genitivePluralForGender('m-personal').should.equal('tanich');
        });
        it('other plurals for tani should stay the same', function(){
            tani.genitivePluralForGender('f').should.equal('tanich');
            tani.genitivePluralForGender('n').should.equal('tanich');
            tani.genitivePluralForGender('m').should.equal('tanich');
            tani.genitivePluralForGender('m-animate').should.equal('tanich');
        });
        it('(n) doubl-checking niebieski', function(){
            niebieski.genitivePluralForGender('n').should.equal('niebieskich');
        });
    })
});
