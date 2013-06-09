
// "exports" is needed for our unit tests in mocha
// this fakes it up in case we're *not* in mocha
var exports;
if (typeof exports === "undefined"){
    exports = {};
} 


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
//augment would be better than extend anyway
//http://yuilibrary.com/yui/docs/yui/yui-augment.html
//Y.extend(Adjective, Word);


exports.Adjective = Adjective;

var adjectiveEndings = {
             //    m-p_+_a  m-inam    f      n
 // "nominative-s": [    ~y or i~     'a'    'e'
    "genitive-s":   [ 'ego',  'ego',  'ej', 'ego' ],
    "dative-s":     [ 'emu',  'emu',  'ej', 'emu' ],
    "accusative-s": [ 'ego',  '=nom', 'ą',  'e'   ],
    "instrumental-s":['*m',   '*m',   'ą',  '*m'  ], 
    "locative-s":   [ '*m',   '*m',   'ej', '*m'  ], 
            //      m-pers    m       f    n 
    "nominative-p": [ 'IRR',   '=nas', '=nas', '=nas'],
    "genitive-p":   [ '*ch',   '*ch',  '*ch',  '*ch'] ,
    "dative-p":     [ '*m',    '*m',   '*m',   '*m' ],
    "accusative-p": [ '=gen',  '=nom', '=nom', '=nom'  ]
};

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

Adjective.prototype.genitiveSingularForGender = function (gender){
    var stem = this.stem();
    var masculineEnding = this.masculineEnding(); // "i" or "y"
    var endings = this.adjectiveEndings['genitive-s'];
    var result = '';
    switch(gender) {
        case 'f': 
            result = this.addEndingToStemGenitiveSingular(endings[2]);
            break;
        case 'n':
            result = this.addEndingToStemGenitiveSingular(endings[3]);
            break;
        case 'm':
        case 'm-animate':
        case 'm-personal':
            result = this.addEndingToStemGenitiveSingular(endings[0]);
            break;
        default:
            alert("Hey, what gender is '" + gender + "' supposed to be?");
    }
    return result;
};

Adjective.prototype.addEndingToStemGenitiveSingular = function (ending){
    var stem = this.stem(),
        result;
    if (stem.charAt(stem.length-1) == 'k' ||
        stem.charAt(stem.length-1) == 'g'   // I think is right, długiej and drogiej
       ){
        result = stem + 'i' + ending;  //e.g. bliskiego
    }else{
        result = stem + ending;
    }
    return result;
}

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
    // for e.g. tani we don't want to end up with taniich
    return result.replace(/i?\*/, masculineEnding);
};

Adjective.prototype.instrumentalSingularForGender = function(gender){
    var result = '',
        stem = this.stem();

    var endings = this.adjectiveEndings['instrumental-s'];

    switch(gender){
        case 'f':
            result = stem + endings[2];
            break;
        case 'm':
        case 'm-animate':
        case 'm-personal':
        case 'n':
            result = stem + endings[0];
            if (stem.charAt(stem.length-1) == 'k' ||
                stem.charAt(stem.length-1) == 'g'   
               ){
                result = result.replace(/\*/, 'i');
            }else{
                result = result.replace(/\*/, 'y');
            }
            // for e.g. tani we don't want to end up with taniym
            result = result.replace(/iym/, 'im');
            break;
        default:
            alert("Hey, what gender is '" + gender + "' supposed to be?");
    }
    return result;
}

Adjective.prototype.instrumentalPluralForGender = function(gender){
    var stem = this.stem(), result;
    if (stem.charAt(stem.length-1) == 'k' ||
        stem.charAt(stem.length-1) == 'g'   
       ){
        result = stem + 'imi'; 
    }else{
        result = stem + 'ymi';
    }
}

Adjective.prototype.locativeSingularForGender = function(gender){
    var stem = this.stem(), result;
    var endings = this.adjectiveEndings['locative-s'];
    var ending;

    if (gender === 'f'){
        ending = endings[2];
        if (stem.charAt(stem.length-1) == 'k' ||
            stem.charAt(stem.length-1) == 'g'   
           ){
            result = stem + 'i' + ending; 
        }else{
            result = stem + ending;
        }
    }else { 
        result = this.instrumentalSingularForGender(gender);
    }
    return result;
}

Adjective.prototype.locativePluralForGender= function(gender){
    return this.genitivePluralForGender(gender);
}

Adjective.prototype.stem = function (){
    return this.f.replace(/a$/, '');
};
Adjective.prototype.masculineEnding = function(){
    return this.m.substr( this.m.length -1 );
};
Adjective.prototype.accusativeSingularForGender = function (gender){
    var stem = this.stem();
    // for e.g. niskie ryby, should move this logic into the stem method?
    //       k and g go to k′ and g′ before endings beginning with y or è: wielk-y:
    //       wielk′-y/i, spelled wielki; wielk-è: wielk′-e, spelled wielkie

    // F gets its own stem below so this is irrelevant for F
    if (gender !== 'f' && stem.match(/[kg]$/)){
        stem = stem + 'i';
    }
    var masculineEnding = this.masculineEnding(); // "i" or "y"
    var endings = this.adjectiveEndings['accusative-s'];
    var result = '';
    switch(gender) {
        case 'f': 
            // note we're re-assigning to stem
            stem = this.nominativeSingularForGender('f');
            stem = stem.replace(/a$/, '');
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

    var adjectiveStr = this[caseMethodName](gender);

    if (isInitialWord){
        adjectiveStr = adjectiveStr.charAt(0).toUpperCase() + adjectiveStr.slice(1);
    }
    if (wrapInTooltipDivs){
        adjectiveStr = this.wrapInTooltipDivs(adjectiveStr);
    }
    return adjectiveStr;
};

