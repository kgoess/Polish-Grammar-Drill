
/**
 * This is the base class for Noun, Verb, Adjective, and Pronoun.
 * @class Word
 */    

// "exports" is needed for our unit tests in mocha
// this fakes it up in case we're *not* in mocha
var exports;
if (typeof exports === "undefined"){
    exports = {};
} 

function Word(){

}

exports.Word = Word;

Word.prototype.wrapInTooltipDivsTemplate = function (args){
    var str              = args.polishStr;
    var wikiLookup       = args.wikiLookup;
    var tooltipStr       = args.tooltipStr;

    var tooltipTemplate = this.tooltipTemplate;

    var stash = {
        polishStr: str,
        wikiLookup: wikiLookup,
        tooltipStr: tooltipStr
    }

    return Y.substitute(tooltipTemplate, stash);
}

// looking for :hover on span instead of a tag means IE6 isn't supported, oh well
Word.prototype.tooltipTemplate = '<span class="answer-word" >{polishStr}<span class="tooltip"><a href="http://en.wiktionary.org/wiki/{wikiLookup}#Polish" target="_blank">{tooltipStr}</a></span></span> ';

Word.prototype.wrapInTooltipDivsTemplate = function (args){
    var str              = args.polishStr;
    var wikiLookup       = args.wikiLookup;
    var tooltipStr       = args.tooltipStr;

    var tooltipTemplate = this.tooltipTemplate;

    var stash = {
        polishStr: str,
        wikiLookup: wikiLookup,
        tooltipStr: tooltipStr
    }

    return Y.substitute(tooltipTemplate, stash);
};

Word.prototype.pushpinTemplate = '<span class="question-word" id="question-word-{partOfSpeech}"><span class="pushpin {hiddenClass} {onOffClass}" id="question-word-{partOfSpeech}-pushpin"><img src="{imgSrc}"/></span>{englishStr}</span>';

Word.prototype.wrapInPushpinDivs = function(englishStr, partOfSpeech){

    var stash = {
        englishStr: englishStr,
        partOfSpeech: partOfSpeech,
        hiddenClass: (this.pinned ? '' : 'pushpin-hidden'),
        imgSrc: (this.pinned ? 'push_pin-on.png' : 'push_pin-off.png'),
        onOffClass: (this.pinned ? 'pushpin-on' : 'pushpin-off')
    };
        
    return Y.substitute(this.pushpinTemplate, stash);
};

