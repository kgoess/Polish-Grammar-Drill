var yui3 = require('yui3');
var YUI = yui3.YUI;

exports = require ('../modules/adjective.js');


//var Y = YUI().use('adjective', function(Y){});
var Y;




var f;
console.log("exports is " + exports);
for (f in exports){
    console.log(f + ": " + exports[f]);
}
//console.log("Y.adjective is " + Y.adjective);

describe('adjective', function(){
  describe('genitiveSingularForGender(m)', function(){
    it('should be niebieskiej for niebieski', function(){
      var niebieski = new Adjective();
      //[1,2,3].indexOf(5).should.equal(-1);
      //[1,2,3].indexOf(0).should.equal(-1);
    })
  })
})
