
// "exports" is needed for our unit tests in mocha
// this fakes it up in case we're *not* in mocha
var exports;
if (typeof exports === "undefined"){
    exports = {};
} 

/**
 * @class Verb
 */
function Verb(args){
    this.infinitive    = args.infinitive;
    this.isTransitive  = args.transitive;
    this.subjectType   = args.ok_subjects;
    this.okObjects     = args.objects; //link?
    this.presentTense  = args.present_tense;
    this.pastTense     = args.past_tense;
    this.englishPast   = args.english_past;
    this.englishFuture = args.english_future;
    this.futureTense   = args.future_tense;

    this.wordId = args.infinitive[0]; // like a primary key for all the words here

    this.pinned        = false;
};
//Y.extend(Verb, Word);
exports.Verb = Verb;

// This breaks down for pan/pani, since that's 3rd person
// but should read "you were running" since it's
// I think I need to keep track of the separate persons
// in english v. polish
Verb.prototype.getEnglishPast = function (number, person){
    // number is 'singular' or 'plural'
    // person is 1,2,3,
    if (number == 'singular' && (person == 1 || person == 3)){
        return this.englishPast; // was reading
    }else{
        return this.englishPast.replace('was', 'were');
    }
};

Verb.prototype.getPastTense = function(verbArgs){
    var str = '';

    verbStr = this.pastTense[ verbArgs.number ][ verbArgs.person - 1];
    //verbStr is now, e.g. 'brałem/brałam'
    var parts = verbStr.split('/');

    if (verbArgs.number === 's'){
        switch(verbArgs.gender){
            case 'm':
            case 'm-animate':
            case 'm-personal':
                verbStr = parts[0];
                break;
            case 'f':
                verbStr = parts[1];
                break;
            case 'n':
                // only 3rd pers sing has a neuter
                verbStr = parts[2]; 
                break;
            case undefined:
                // remaining pronouns, also taking the easy way out for now, 
                // default to masc.
                verbStr = parts[0];
                break;                    
            default:
                alert("I don't recognize this gender: " + verbArgs.gender);
                Y.log(verbArgs);
        }
    }else{
        switch(verbArgs.gender){
            case 'm-personal':
                verbStr = parts[0];
                break;
            default:
                verbStr = parts[1];
        }
    }
    return verbStr;
};
        

Verb.prototype.getFutureTense = function(verbArgs){
    var str = '';
    if (verbArgs.number === 's'){
        switch(verbArgs.gender){
            case 'm':
            case 'm-animate':
            case 'm-personal':
                str = this.futureTense['s'][0];
                break;
            case 'f':
                str = this.futureTense['s'][1];
                break;
            case 'n':
                str = this.futureTense['s'][1];
                str = str.replace(/ła$/, 'ło');
                break;
            default:
                alert("I don't know gender '" + verbArgs.gender + "'");
        }
        str = byćPast['s'][verbArgs.person-1] + ' ' + str;
    }else{
        switch(verbArgs.gender){
            case 'm-personal':
            case undefined: //pronouns, they must be personal
                str = this.futureTense['p'][0];
                break;
            default:
                str = this.futureTense['p'][1];
        }
        str = byćPast['p'][verbArgs.person-1] + ' ' + str;
    }

    return str;
};

Verb.prototype.wrapInTooltipDivs = function(str){

    return this.wrapInTooltipDivsTemplate({
        polishStr:  (str || ''),
        wikiLookup: this.infinitive[0],
        tooltipStr: this.infinitive[0] + ', ' + this.presentTense.s[0] + ', ' + this.presentTense.s[1]
    });
};
    
