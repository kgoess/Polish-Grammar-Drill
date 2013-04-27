// this is now "yui" instead of "yui3"? 2013-04-27
//var yui3 = require('yui3');
var yui3 = require('yui');

var YUI = yui3.YUI;

exports = require ('../modules/adjective.js');


//var Y = YUI().use('adjective', function(Y){});
var Y;


var Adjective = exports.Adjective;

describe('adjective', function(){
    describe('genitiveSingularForGenders', function(){
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
})
