
/**
 * Can be attached to the subject or the direct object, or turned off on either/both of those
 * @class Adjective
 */
function Adjective(args){
    this.english   = args[0];
    this.m         = args[1];
    this.f         = args[2];
    this.n         = args[3];
    this.mPersMasc = args[4];

    this.wordId = this.m; // like a primary key for all the words here
}
Y.extend(Adjective, Word);

Adjective.prototype.adjectiveEndings = adjectiveEndings;
Adjective.prototype.nominativeSingularForGender = function (gender){
    switch(gender) {
        case 'f': 
            return this.f;
        case 'n':
            return this.n;
        case 'm':
        case 'm-animate':
        case 'm-personal':
            return this.m;
        default:
            alert("Hey, what gender is '" + gender + "' supposed to be?");
    }
};
Adjective.prototype.nominativePluralForGender = function (gender){

    var result = '';
    
    switch(gender) {
        case 'f': 
        case 'n':
        case 'm':
        case 'm-animate':
            result = this.n;
            break;
        case 'm-personal':
            result = this.mPersMasc;
            break;
        default:
            alert("Hey, what gender is '" + gender + "' supposed to be?");
    }
    return result;
};
Adjective.prototype.genitivePluralForGender = function (gender) {
    var stem = this.stem();
    var masculineEnding = this.masculineEnding(); // "i" or "y"
    var endings = this.adjectiveEndings['genitive-p'];
    var result = '';
    switch(gender) {
        case 'f': 
        case 'n':
        case 'm':
        case 'm-animate':
        case 'm-personal':
            result = stem + endings[0];
            break;
        default:
            alert("Hey, what gender is '" + gender + "' supposed to be?");
    }
    return result.replace('*', masculineEnding);
};

Adjective.prototype.stem = function (){
    return this.f.replace(/a$/, '');
};
Adjective.prototype.accusativeSingularForGender = function (gender){
    var stem = this.stem();
    var masculineEnding = this.masculineEnding(); // "i" or "y"
    var endings = this.adjectiveEndings['accusative-s'];
    var result = '';
    switch(gender) {
        case 'f': 
            result = stem + endings[2];
            break;
        case 'n':
            result = stem + endings[3];
            break;
        case 'm':
            result = this.m; // "=nom"
            break;
        case 'm-animate':
        case 'm-personal':
            if (stem.charAt(stem.length-1)=='k'){
                result = stem + 'i' + endings[0];  //e.g. bliskiego
            }else{
                result = stem + endings[0];
            }
            break;
        default:
            alert("Hey, what gender is '" + gender + "' supposed to be?");
    }
    return result.replace('*', masculineEnding);
};
Adjective.prototype.accusativePluralForGender = function (gender){
    var result = '';
    switch(gender) {
        case 'f': 
        case 'n':
        case 'm':
        case 'm-animate':
            result = this.nominativePluralForGender(gender);
            break;
        case 'm-personal':
            result = this.genitivePluralForGender(gender);
            break;
        default:
            alert("Hey, what gender is '" + gender + "' supposed to be?");
    }
    return result;
};
Adjective.prototype.masculineEnding = function(){
    return this.m.substr( this.m.length -1 );
};

Adjective.prototype.wrapInTooltipDivs = function(str){
    return this.wrapInTooltipDivsTemplate({
        polishStr:      str,
        wikiLookup:     this.m,
        tooltipStr:     this.m+','+this.f+','+this.n
    });
} 

Adjective.prototype.makePolishStr = function(args){
    var caseMethodName     = args.caseMethodName; //e.g. "nominativeSingularForGender"
    var gender             = args.gender;
    var isInitialWord      = args.isInitialWord;
    var wrapInTooltipDivs  = args.wrapInTooltipDivs;

    var subjectAdjectiveStr = this[caseMethodName](gender);

    if (isInitialWord){
        subjectAdjectiveStr = subjectAdjectiveStr.charAt(0).toUpperCase() + subjectAdjectiveStr.slice(1);
    }
    if (wrapInTooltipDivs){
        subjectAdjectiveStr = this.wrapInTooltipDivs(subjectAdjectiveStr);
    }
    return subjectAdjectiveStr;
};

