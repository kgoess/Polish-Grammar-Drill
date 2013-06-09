
// "exports" is needed for our unit tests in mocha
// this fakes it up in case we're *not* in mocha
var exports;
if (typeof exports === "undefined"){
    exports = {};
} 

/**
 * Can be the subject or the direct object
 * @class Preposition
 */

function Preposition(args){
    this.english  = args[0];
    this.polish   = args[1];
    this.takes    = args[2]; // i.e. which case it takes

    this.wordId = this.nom_sing; // like a primary key for all the words here
}

exports.Preposition = Preposition;

//Y.extend(Preposition, Word);

Preposition.prototype.wrapInTooltipDivs = function(str){
    return '';

//    return this.wrapInTooltipDivsTemplate({
//        polishStr: str,
//        wikiLookup: this.nom_sing,
//        tooltipStr: this.nom_sing+' '+this.gender+'.'
//    });
} 

Preposition.prototype.makePolishStr = function(args){
    var polishStr;

    polishStr = this.polish;

    return polishStr;
};


