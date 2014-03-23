
// "exports" is needed for our unit tests in mocha
// this fakes it up in case we're *not* in mocha
var exports;
if (typeof exports === "undefined"){
    exports = {};
} 

/**
 * @class Preposition
 */
function Preposition(args){
    var i = 0;
    this.english       = args[i++];
    this.polish        = args[i++];
    this.governingCase = args[i++];
    this.quality       = args[i++];
    this.okNouns       = args['okNouns'];

    this.wordId = this.polish + '+' + this.governingCase; // like a primary key for all the words here

};
//Y.extend(Preposition, Word);
exports.Preposition = Preposition;

    
