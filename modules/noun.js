
// "exports" is needed for our unit tests in mocha
// this fakes it up in case we're *not* in mocha
var exports;
if (typeof exports === "undefined"){
    exports = {};
} 

/**
 * Can be the subject or the direct object
 * @class Noun
 */

function Noun(args){
    var i = 0;
    this.english_sing = args[i++];
    this.english_pl   = args[i++];
    this.nom_sing     = args[i++];
    this.nom_pl       = args[i++];
    this.gen_sing     = args[i++];
    this.gen_pl       = args[i++];
    this.acc_sing     = args[i++];
    this.acc_pl       = args[i++];
    // a little shim until I update all the data
    var lengthWithPrepositionData = 7;
    if (args.length - i  === lengthWithPrepositionData){
        this.inst_sing  = args[i++];
        this.inst_pl    = args[i++];
        this.loc_sing   = args[i++];
        this.loc_pl     = args[i++];
    }
    this.gender       = args[i++];
    this.agentType    = args[i++];

    this.is_place     = args[i++];

    this.wordId = this.nom_sing; // like a primary key for all the words here
}

exports.Noun = Noun;

//Y.extend(Noun, Word);

Noun.prototype.getGender = function(){
    return this.gender;
};
Noun.prototype.wrapInTooltipDivs = function(str){

    return this.wrapInTooltipDivsTemplate({
        polishStr: str,
        wikiLookup: this.nom_sing,
        tooltipStr: this.nom_sing+' '+this.gender+'.'
    });
} 

// can take either caseAccessor, e.g. nom_sing
// *or* caseWanted + numWanted, e.g. "locative", "sing"
Noun.prototype.makePolishStr = function(args){
    var wrapInTooltipDivs = args.wrapInTooltipDivs; //true/false
    var caseAccessor      = args.caseAccessor; //e.g. "nom_sing"
    var isInitialWord     = args.isInitialWord;
    var caseWanted        = args.caseWanted;
    var numWanted         = args.numWanted;

    if (! caseAccessor ){
        caseAccessor = this.makeCaseAccessorFromCaseAndNumber(caseWanted, numWanted);
    }
    var nounStr = this[caseAccessor];

    if (isInitialWord){
        nounStr = nounStr.charAt(0).toUpperCase() + nounStr.slice(1);
    }

    if (wrapInTooltipDivs){
        nounStr = this.wrapInTooltipDivs(nounStr);
    }

    return nounStr;
};

var caseAbbr = {
   "nominative": "nom",
   "genitive": "gen",
   "dative": "dat",
   "accusative": "acc",
   "instrumental": "inst",
   "locative": "loc"
};
var numAbbr = {
    "singular" : "sing",
    "sing" : "sing",
    "s" : "sing",
    "plural" : "pl",
    "pl" : "pl",
    "p" : "pl"
};
Noun.prototype.makeCaseAccessorFromCaseAndNumber = function (caseWanted, numWanted){
    // no args checking, maybe add later
    if (numWanted === null){
        numWanted = 'sing';
    }
    return caseAbbr[caseWanted] + '_' + numAbbr[numWanted];
};

Noun.prototype.getEnglishForNumber = function (numWanted) {
    var accessor;
    if (numWanted === null){
        numWanted = 'sing';
    }
    accessor = 'english_' + numAbbr[numWanted];

    return this[accessor];
}
    



