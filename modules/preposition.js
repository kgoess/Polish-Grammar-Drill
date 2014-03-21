
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
    this.english       = args[0];
    this.polish        = args[1];
    this.governingCase = args[2];

    this.wordId = this.polish + '+' + this.governingCase; // like a primary key for all the words here

};
//Y.extend(Preposition, Word);
exports.Preposition = Preposition;

    
