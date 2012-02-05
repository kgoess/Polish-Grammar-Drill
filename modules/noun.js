
/**
 * Can be the subject or the direct object
 * @class Noun
 */

function Noun(args){
    this.english_sing= args[0];
    this.english_pl = args[1];
    this.nom_sing = args[2];
    this.nom_pl = args[3];
    this.acc_sing = args[4];
    this.acc_pl = args[5];
    this.gender = args[6];
    this.agentType = args[7];

    this.wordId = this.nom_sing; // like a primary key for all the words here
}

Y.extend(Noun, Word);

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

