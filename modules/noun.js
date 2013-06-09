
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
    this.english_sing = args[0];
    this.english_pl   = args[1];
    this.nom_sing     = args[2];
    this.nom_pl       = args[3];
    this.gen_sing     = args[4];
    this.gen_pl       = args[5];
    this.acc_sing     = args[6];
    this.acc_pl       = args[7];
    this.inst_sing    = args[8];
    this.loc_sing     = args[9];
    this.gender       = args[10];
    this.agentType    = args[11];

    this.wordId = this.nom_sing; // like a primary key for all the words here

    this.inst_pl = '';
    this.loc_pl = '';

    this.recalculateInstrumentals();
    this.recalculateLocatives();
};


Noun.prototype.recalculateInstrumentals = function(){
    var s = this.inst_sing,
         pl, stem;

    // irregular ones were explicitly specified in the data
    if (typeof s !== 'string'){
        this.inst_sing = s[0];
        this.inst_pl   = s[1];
        return;
    }

    stem = this.calculateStem();
    this.inst_pl = stem + 'ami';
};

Noun.prototype.recalculateLocatives = function(){
    var s = this.loc_sing;

    // irregular ones were explicitly specified in the data
    if (typeof s !== 'string'){
        this.loc_sing = s[0];
        this.loc_pl   = s[1];
        return;
    }

    stem = this.calculateStem();
    this.inst_pl = stem + 'ach';
};

    
    
// this seems to be a pretty reliable way to do it, for calculating
// inst pl and loc pl at least...
Noun.prototype.calculateStem = function(){
    var stem, s = this.inst_sing;
    stem = s.replace(/(ą|i?em)$/, '');
    return stem;
};



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

Noun.prototype.makePolishStr = function(args){
    var wrapInTooltipDivs = args.wrapInTooltipDivs; //true/false
    var caseAccessor      = args.caseAccessor; //e.g. "nom_sing"
    var isInitialWord     = args.isInitialWord;

    var nounStr = this[caseAccessor];

    if (isInitialWord){
        nounStr = nounStr.charAt(0).toUpperCase() + nounStr.slice(1);
    }

    if (wrapInTooltipDivs){
        nounStr = this.wrapInTooltipDivs(nounStr);
    }

    return nounStr;
};


