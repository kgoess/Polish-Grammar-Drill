
/**
 * @class Pronoun
 */
function Pronoun(args){
    this.person = args[0];
    this.number = args[1];
    this.gender = args[2];
    this.english_sing= args[3];
    this.english_pl = args[3]; //cheating here so we can use both a noun and a pronoun, fix that
    this.nom_sing = args[4] || '';
    this.nom_pl = args[4] || '';
}
Y.extend(Pronoun, Word);

Pronoun.prototype.getGender = function(){
    var g = '';
    if ( this.person === 1 ){
        g = this.genderOfSpeaker();
    }else if ( this.person === 2 ){
        g = 'm-personal'; // do something better later
    }else if (this.gender){ // 3rd p singular
        g = this.gender;
    }else{
        g = 'm-personal';   // 3rd p plural, do something better later
    }
    return g;
};

Pronoun.prototype.genderOfSpeaker = function() {
    var nodeList =  document.settings["gender-of-speaker"];
    var i;
    for(i = 0; i < nodeList.length; i++) {
        if (nodeList.item(i).checked){
            g = nodeList.item(i).value;
        }
    }
    return g;
};

// we don't actually display the polish string for the pronouns, hmm, that's some side effect of something I think...?
Pronoun.prototype.wrapInTooltipDivs = function(str){
    return str;
};
Pronoun.prototype.makePolishStr = function(args){
    var caseMethodName     = args.caseMethodName; //e.g. "nominativeSingularForGender"
    var gender             = args.gender;
    var isInitialWord      = args.isInitialWord;

    var wrapInTooltipDivs = args.wrapInTooltipDivs; //true/false
    var caseAccessor = args.caseAccessor; //e.g. "nom_sing"

    var nounStr = this[caseAccessor];

    if (isInitialWord){
        nounStr = nounStr.charAt(0).toUpperCase() + nounStr.slice(1);
    }

    if (wrapInTooltipDivs){ //this is a no-op for pronouns
        nounStr = this.wrapInTooltipDivs(nounStr);
    }

    return nounStr;
};


