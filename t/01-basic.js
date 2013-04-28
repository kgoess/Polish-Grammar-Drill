// this is now "yui" instead of "yui3"? 2013-04-27
//var yui3 = require('yui3');
var yui3 = require('yui');

var YUI = yui3.YUI;


var adjective_exports = require ('../modules/adjective.js');
var Adjective = adjective_exports.Adjective;
var word_exports = require ('../modules/word.js');
var Word = word_exports.Word;

var Y = YUI().use();
//Y.extend(Adjective, Word);


describe('adjective', function(){
    describe('genitiveSingularForStemsEndingIn-k', function(){
        var niebieski = new Adjective(
            ['blue',   'niebieski',  'niebieska',  'niebieskie', 'niebiescy' ]
        );
        it('(f) should be niebieskiej for niebieski', function(){
            niebieski.genitiveSingularForGender('f').should.equal('niebieskiej');
            
          //[1,2,3].indexOf(5).should.equal(-1);
          //[1,2,3].indexOf(0).should.equal(-1);
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

    describe('genitivePluralForStemsEndingIn-i', function(){
        var tani = new Adjective(
            [ 'cheap',     'tani',    'tania',      'tanie',      'tani'       ]
        );
        it('(m-pers) should be tanich, not taniich', function(){
            tani.genitivePluralForGender('m-personal').should.equal('tanich');
            
          //[1,2,3].indexOf(5).should.equal(-1);
          //[1,2,3].indexOf(0).should.equal(-1);
        });
        it('other plurals for tani should stay the same', function(){
            tani.genitivePluralForGender('f').should.equal('tanich');
            tani.genitivePluralForGender('n').should.equal('tanich');
            tani.genitivePluralForGender('m').should.equal('tanich');
            tani.genitivePluralForGender('m-animate').should.equal('tanich');
        });
        it('(n) doubl-checking niebieski', function(){
            var niebieski = new Adjective(
                ['blue',   'niebieski',  'niebieska',  'niebieskie', 'niebiescy' ]
            );
            niebieski.genitivePluralForGender('n').should.equal('niebieskich');
        });
    })
})
