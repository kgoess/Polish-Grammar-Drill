
// "exports" is needed for our unit tests in mocha
// this fakes it up in case we're *not* in mocha
var exports;
if (typeof exports === "undefined"){
    exports = {};
} 

/**
 * This is the controller class that drives the page, keeps track of the 
 * current sentence and checks the answer.
 * @class Tester
 */
function Tester(){
    this.prepositions = [];
    this.nouns = [];
    this.pronouns = [];
    this.adjectives = [];
    this.verbs = [];
    this.agents = [];
    this.intelligentAgents = [];
    this.nounLookup = {};
    this.currentPreposition = null;
    this.currentPPAdjectve = null;
    this.currentPPNoun = null;
    this.currentVerb  = null;
    this.currentTense = null;
    this.currentPerson = null;
    this.currentSubject = null;
    this.currentObject = null;
    this.subjectIsPronoun = false; // for the current sentence
    this.isNegated = false;
};

exports.Tester = Tester;

Tester.prototype.addPreposition = function(preposition){
    this.prepositions.push(preposition);
}

Tester.prototype.addNoun = function(noun){
    this.nouns.push(noun);
    var type = noun.agentType;  // agent, i-agent, no-agent
    if (type === "agent"){
        this.agents.push(noun);
    }else if (type === "i-agent"){
        this.agents.push(noun);
        this.intelligentAgents.push(noun);
    }
    this.nounLookup[ noun.nom_sing ] = noun;
};
Tester.prototype.addVerb = function(verb){
    this.verbs.push(verb);
};

Tester.prototype.askQuestion = function(){
    var questionStr;

    this.generateQuestion();
    this.updateUIWithQuestion();
};

Tester.prototype.generateQuestion = function(){
    var preposition, s, failsafe, ppNoun;
    if (this.currentPreposition && this.currentPreposition.pinned){
        preposition = this.currentPreposition;
    }else{
        preposition = this.pickRandomActivePreposition();
        this.currentPreposition = preposition;
    }

    ppNoun = this.pickPPNoun(preposition);
    this.currentPPNoun = ppNoun;

    ppAdjective = this.pickPPAdjective(ppNoun);
    this.currentPPAdjective = ppAdjective;
};

Tester.prototype.updateUIWithQuestion = function(){
    var questionDiv, outputDiv, inputEl;

    questionDiv = Y.one('#question');
    questionDiv.set('innerHTML', this.currentEnglishSentence());

    outputDiv = Y.one('#output');
    outputDiv.set('innerHTML', '');

    inputEl = Y.one('#input input');
    inputEl.focus();
    inputEl.set('value', '');

};

Tester.prototype.pickRandomActivePreposition = function(){
    var aPreposition, activePrepositions;

    activePrepositions = [];

//    // hmm, wonder how this will scale with more verbs...
//    for (i in this.verbs){
//        aVerb = this.verbs[i];
//        checkboxEl = Y.one("#wordlist-checkbox-" + aVerb.wordId);
//        if (checkboxEl.get('checked')){
//            activeVerbs.push(aVerb);
//        }
//    }
//    // ...if the user has unchecked all the boxes...
//    if (activeVerbs.length === 0){
        activePrepositions = this.prepositions;
//    }
//
    aPreposition = activePrepositions [ Math.floor(Math.random()*activePrepositions.length) ];

    return aPreposition;
}

Tester.prototype.pickRandomActiveVerb = function(){
    var aVerb, activeVerbs;

    activeVerbs = [];

    // hmm, wonder how this will scale with more verbs...
    for (i in this.verbs){
        aVerb = this.verbs[i];
        checkboxEl = Y.one("#wordlist-checkbox-" + aVerb.wordId);
        if (checkboxEl.get('checked')){
            activeVerbs.push(aVerb);
        }
    }
    // ...if the user has unchecked all the boxes...
    if (activeVerbs.length === 0){
        activeVerbs = this.verbs;
    }

    aVerb = activeVerbs [ Math.floor(Math.random()*activeVerbs.length) ];

    return aVerb;
};

Tester.prototype.pickPPAdjective = function(preposition){
    var anAdjective;

    anAdjective = this.adjectives [ Math.floor(Math.random()*this.adjectives.length) ];

    return anAdjective;
};
Tester.prototype.pickPPNoun = function(preposition){
    var aNoun;

    aNoun = this.nouns [ Math.floor(Math.random()*this.nouns.length) ];

    return aNoun;
};

Tester.prototype.generateSubject = function(verb){
    var okSubjectType, okSubjects;


    if (this.doUsePronounSubject()){
        var pronoun = this.pronouns[ Math.floor(Math.random()*this.pronouns.length) ];
        this.currentSubject = pronoun;
        this.subjectNumber = pronoun.number === 's' ? 'singular' : 'plural';
        this.currentPerson = pronoun.person;
        this.subjectIsPronoun = true;
    }else{ //generateSubjectNumber will revert to 'singular' if nothing is checked
        this.subjectNumber = this.generateSubjectNumber();
        this.currentPerson = 3;
        okSubjectType = verb.subjectType;
        if (okSubjectType === 'i-agent'){
            okSubjects = this.intelligentAgents; 
        }else{
            okSubjects = this.agents;
        }
        okSubjects = this.filterActiveSubjects(okSubjects);
        this.currentSubject   = okSubjects[ Math.floor(Math.random()*okSubjects.length) ];
        this.subjectIsPronoun = false;
    }
};

Tester.prototype.filterActiveSubjects = function(okSubjects){
    var i, activeSubjects;

    activeSubjects = [];

    for (i in okSubjects){
        aNoun = okSubjects[i];
        checkboxEl = Y.one("#wordlist-checkbox-" + aNoun.wordId);
        if (checkboxEl.get('checked')){
            activeSubjects.push(aNoun);
        }
    }
    // ...if the user has unchecked all the boxes...
    if (activeSubjects.length === 0){
        activeSubjects = okSubjects;
    }

    return activeSubjects;
};

Tester.prototype.generateSubjectAdjective = function(){
    var subjectAdjectivesOk = document.settings["subject-adjectives"].checked;

    if (subjectAdjectivesOk){
        if (this.subjectIsPronoun){
            this.subjectAdjective = false;
        }else{
            this.subjectAdjective = this.pickAdjectiveForSubject();
        }
    }else{
        this.subjectAdjective = false;
    }
};

Tester.prototype.setNegation = function(){
    if (this.doUseNegation()){
        this.isNegated = true;
    }else{
        this.isNegated = false;
    }
}

// if set, make a third of the sentences negations
Tester.prototype.doUseNegation = function(){
    var negationSetting = '';
    var numButtons = document.settings["verbs-negation"].length;
    var i;
    for (i = 0; i < numButtons; ++ i){
        if (document.settings["verbs-negation"][i].checked){
            negationSetting = document.settings["verbs-negation"][i].value; //sometimes, always, never
        }
    }
    if (negationSetting === "always"){
        return true;
    }else if (negationSetting === "never"){
        return false;
    }else if (negationSetting === "sometimes"){
        return Math.floor( Math.random()*(3) +1 ) % 3 === 0 ? true : false;
    }else{
        return false;
    }
}

Tester.prototype.canUseRegularSubject = function(){
    var singularOk = document.settings["subject-singular"].checked;
    var pluralOk   = document.settings["subject-plural"].checked;

    return singularOk || pluralOk;
};


Tester.prototype.generateSubjectNumber = function(){
    var singularOk = document.settings["subject-singular"].checked;
    var pluralOk   = document.settings["subject-plural"].checked;

    if (singularOk && pluralOk){ 
        return Math.floor( Math.random()*(2) +1 ) % 2 === 0 ? 'singular' : 'plural';
    }else if (pluralOk){
        return 'plural';
    }else if (singularOk){
        return 'singular';
    }else{
        document.settings["subject-singular"].checked = 1;
        return 'singular';
    }
};

Tester.prototype.pickAdjectiveForSubject = function(){
    return this.adjectives[ Math.floor(Math.random()*this.adjectives.length) ];
};

Tester.prototype.generateObjectAdjective = function(){
   var objectAdjectivesOk = document.settings["object-adjectives"].checked;
    if (objectAdjectivesOk){
        return this.adjectives[ Math.floor(Math.random()*this.adjectives.length) ];
    }else{
        return null;
    }
};

Tester.prototype.doUsePronounSubject = function(){
    var pronounsOk = document.settings["subject-pronouns"].checked;
    if (pronounsOk){
        if (this.canUseRegularSubject()){
            return Math.floor(Math.random()*3) % 3 === 0;
        }else{
            return true;
        }
    }else{
        return false;
    }
};

Tester.prototype.checkAnswer = function(){
    var answer = Y.one('#input input').get('value');
    var praise;
    answer = answer.replace(/ +$/, '');
    answer = answer.replace(/^ +/, '');


    if (answer === this.currentPolishSentence({wrapInTooltipDivs: false})){
        Y.one('#output').set('innerHTML', this.currentPolishSentence({wrapInTooltipDivs: true}));
        Y.one('#input-element').setStyle("background-color", "#3CFF00");
        
        praise = this.generateRandomPraise();
        alert(praise);

        var anim = new Y.Anim(
            { node: '#input-element', 
              from: { backgroundColor: "#3CFF00" },
              to:  { backgroundColor:  "#FFFFFF" }
            } 
        ); 
        anim.run();
        this.addToHistory(answer);

    }else{
        alert('Nie, zła odpowiedź, spróbuj ponownie!');
        //alert(this.currentPolishSentence({wrapInTooltipDivs: false}));
    }
};

Tester.prototype.addToHistory = function(answer){
    var historyDiv = Y.one('.answer-history');
    historyDivItem = Y.Node.create('<div class="answer-history-item">' + answer + '</div>');
    historyDiv.prepend(historyDivItem);
}

Tester.prototype.generateRandomPraise = function(){
    var praises = [ 'Świetnie!', 'Dobrze!', 'Wszystko Dobrze!',
                    'Wszystko dobre, co się dobrze kończy', 
                    'Najświetniej!',
                    'Doskonale!'
                  ];
    
    var roll = Math.floor(Math.random()*praises.length);
    return praises[roll];
}

Tester.prototype.currentPolishSentence = function(args){
    var str = '';
    var preposition = this.currentPreposition;
    var adjective = this.currentPPAdjective;
    var noun = this.currentPPNoun;

    // this is ugly, better way to do the routing?
    // fix it when I have to handle plurals
    switch(preposition.takes){
        case "genitive" :
            str = preposition.polish + ' '
                 + adjective.genitiveSingularForGender(noun.gender) + ' '
                 + noun.gen_sing;
            break;
        case "accusative" :
            str = preposition.polish + ' '
                 + adjective.accusativeSingularForGender(noun.gender) + ' '
                 + noun.acc_sing;
            break;
        case "instrumental" :
            str = preposition.polish + ' '
                 + adjective.instrumentalSingularForGender(noun.gender) + ' '
                 + noun.inst_sing;
            break;
        case "locative" :
            str = preposition.polish + ' '
                 + adjective.locativeSingularForGender(noun.gender) + ' '
                 + noun.loc_sing;
            break;
        default :
            throw("Error: preposition takes '" + preposition.takes + "'? WTF is that?");
    }


    return str;
//    var wrapInTooltipDivs = //true/false
//        ( typeof args === "undefined" ? false : args.wrapInTooltipDivs );  
//
//    var subject = this.currentSubject;
//    var subjectAdjective = this.subjectAdjective;
//    var tense = this.currentTense; //present, past, future, etc...
//    var verbArgs = {
//        tense:             this.currentTense, //present, past, future, etc...
//        number:            null,   // s or p
//        person:            this.currentPerson, //1, 2, 3
//        gender:            this.currentSubject.getGender(),
//        wrapInTooltipDivs: wrapInTooltipDivs,
//        isNegated:         this.isNegated
//    };
//    var subjectStr, subjectAdjectiveStr, verbStr;
//    if (this.subjectNumber === 'singular'){
//        subjectStr = subject.makePolishStr({
//            wrapInTooltipDivs: wrapInTooltipDivs,
//            caseAccessor:      "nom_sing",
//            isInitialWord:     (! subjectAdjective)
//        });
//
//        verbArgs.number = 's';
//        verbArgs.isInitialWord = (! subjectStr);
//        verbStr = this.currentPolishVerbStr(verbArgs);
//
//        if (subjectAdjective){
//            subjectAdjectiveStr = subjectAdjective.makePolishStr({
//                caseMethodName:    "nominativeSingularForGender", 
//                gender:            subject.getGender(),
//                isInitialWord:     true,
//                wrapInTooltipDivs: wrapInTooltipDivs
//            }) + ' ';
//        }else{
//            subjectAdjectiveStr = '';
//        }
//        if (! subjectAdjectiveStr && ! subjectStr){
//            verbStr = verbStr.charAt(0).toUpperCase() + verbStr.slice(1);
//        }
//
//    }else{
//        subjectStr = subject.makePolishStr({
//            wrapInTooltipDivs: wrapInTooltipDivs,
//            caseAccessor:      "nom_pl",
//            isInitialWord:     (! subjectAdjective)
//        });
//
//        verbArgs.number = 'p';
//        verbArgs.isInitialWord = (! subjectStr);
//        verbStr = this.currentPolishVerbStr(verbArgs);
//
//        if (subjectAdjective){
//            subjectAdjectiveStr =  subjectAdjective.makePolishStr({
//                caseMethodName:    "nominativePluralForGender", 
//                gender:            subject.getGender(),
//                isInitialWord:     true,
//                wrapInTooltipDivs: wrapInTooltipDivs
//            }) + ' ';
//        }else{
//            subjectAdjectiveStr = '';
//        }
//    }
//
//    var str = subjectAdjectiveStr + subjectStr + ' ' + verbStr;
//    str = str.replace(/^ +/, '');
//
//
//    if (this.currentObject){
//        var object = this.currentObject;
//        var objectAdjective = this.objectAdjective;
//        var objectStr, objectAdjectiveStr;
//        if (this.objectNumber === 'singular'){
//            objectStr = object.makePolishStr({
//                wrapInTooltipDivs: wrapInTooltipDivs,
//                caseAccessor:      this.isNegated ? "gen_sing" : "acc_sing"
//            });
//            if (objectAdjective){
//                objectAdjectiveStr =  objectAdjective.makePolishStr({
//                    caseMethodName:    this.isNegated ? "genitiveSingularForGender" : "accusativeSingularForGender", 
//                    gender:            object.getGender(),
//                    isInitialWord:     false,
//                    wrapInTooltipDivs: wrapInTooltipDivs
//                });
//            }else{
//                objectAdjectiveStr = '';
//            }
//        }else{
//            objectStr = object.makePolishStr({
//                wrapInTooltipDivs: wrapInTooltipDivs,
//                caseAccessor:      this.isNegated ? "gen_pl" : "acc_pl"
//            });
//            if (objectAdjective){
//                objectAdjectiveStr =  objectAdjective.makePolishStr({
//                    caseMethodName:    this.isNegated ? "genitivePluralForGender" : "accusativePluralForGender", 
//                    gender:            object.getGender(),
//                    isInitialWord:     false,
//                    wrapInTooltipDivs: wrapInTooltipDivs
//                });
//            }else{
//                objectAdjectiveStr = '';
//            }
//        }
//        if (objectAdjectiveStr){
//            objectAdjectiveStr = ' ' + objectAdjectiveStr ;
//        }
//        str = str + objectAdjectiveStr +  ' ' + objectStr;
//    }
//    str = str.replace(/ +$/, '') + '.';
//
//    return str;
};

Tester.prototype.currentPolishVerbStr = function (verbArgs){
    var verbStr = '';
    var verb = this.currentVerb;
    switch(verbArgs.tense) {
        case 'present': 
            verbStr =  verb.presentTense[ verbArgs.number ][ verbArgs.person - 1 ];
            break;
        case 'past':
            verbStr = verb.getPastTense(verbArgs);
            break;
        case 'future':
            verbStr = verb.getFutureTense(verbArgs);
            break;
    }
    if (verbArgs.isInitialWord && ! verbArgs.isNegated){
        verbStr = verbStr.charAt(0).toUpperCase() + verbStr.slice(1);
    }

    if (verbArgs.wrapInTooltipDivs){
        verbStr = verb.wrapInTooltipDivs(verbStr);
    }

    if (verbArgs.isNegated){
        verbStr = 'nie ' + verbStr;
        if (verbArgs.isInitialWord){
            verbStr = verbStr.charAt(0).toUpperCase() + verbStr.slice(1);
        }
    }
            
    return verbStr;
};

Tester.prototype.pickTense = function(){
    var roll = null;
    var presentTenseOk = document.settings["verbs-present"].checked;
    var pastTenseOk    = document.settings["verbs-past"].checked;
    var futureTenseOk  = document.settings["verbs-future"].checked;

    if (! (presentTenseOk || pastTenseOk || futureTenseOk)){
        document.settings["verbs-present"].checked = 1;
        presentTenseOk = true;
    }

    var okTenses = [];
    if (presentTenseOk){
        okTenses.push('present');
    }
    if (pastTenseOk){
        okTenses.push('past');
    }
    if (futureTenseOk){
        okTenses.push('future');
    }
    
    roll = Math.floor(Math.random()*okTenses.length);
    return okTenses [ roll ];
};

Tester.prototype.giveHint = function() {

    var str = this.currentPolishSentence({wrapInTooltipDivs: false});

    var showEvery = 3;

    var outstr = '';
    var i;
    for (i = 0; i < str.length; ++i){
        var rand = Math.floor(Math.random()*showEvery);
        // do spaces by default
        if (str.charAt(i) === ' ' || str.charAt(i) === '.'){
            outstr = outstr + str.charAt(i);
        // and initial letters
        }else if (i == 0 || i > 0 && str.charAt(i-1) === ' '){
            outstr = outstr + str.charAt(i);
        // and final letters (but not the last one of the last word, just to be difficult)
        }else if ((i < str.length -1) && str.charAt(i+1) === ' '){
            outstr = outstr + str.charAt(i);
        }else{
            outstr = outstr + (rand % showEvery === 1 ? str.charAt(i) : '<span class="graydot">.</span>');
        }
    }
    Y.one('#output').set('innerHTML', outstr);
};

Tester.prototype.showAnswer = function(){
    var str = this.currentPolishSentence({wrapInTooltipDivs: true});

    Y.one('#output').set('innerHTML', str);

};

Tester.prototype.showImagesIsChecked = function(){

    var tmpValue;
    Y.all('.radio-show-google-images').each(function(node) {
        if (node.get('checked')) tmpValue = node.get('value');
    });
    return tmpValue;
};

Tester.prototype.showHideWordList = function(buttonEl){

    var elId = buttonEl.get('id');

    var listEl = Y.one('#' + elId + '-list');
    if (listEl.hasClass('hidden')){
        listEl.removeClass('hidden');
    }else{
        listEl.addClass('hidden');
    }
};
    
Tester.prototype.currentEnglishSentence = function(){
    var s;
    var subjectNoun = '';

    s = this.currentPreposition.english;
    s = s + ' the ' + this.currentPPAdjective.english;
    s = s + ' ' + this.currentPPNoun.english_sing;

    return s;
};


// this looks funny being a method on Tester, it seems like it should be a method on Verb, but
// all the information it needs is in the Tester object
Tester.prototype.getEnglishVerb = function(){
    var englishVerbStr = '';
    switch (this.currentTense){
        case 'present':
            englishVerbStr = this.currentVerb.infinitive[1];
            break;
        case 'past':
            switch (this.subjectNumber){
                case 'singular':
                    englishVerbStr = this.currentVerb.getEnglishPast('singular', this.currentPerson);
                    break;
                case 'plural':
                    englishVerbStr = this.currentVerb.getEnglishPast('plural', this.currentPerson);
                    break;
                default:
                    alert("I don't know this subjectNumber " + this.subjectNumber + " for subject " + this.currentSubject);
            }
            break;
        case 'future':
            englishVerbStr = this.currentVerb.englishFuture;
            break;
        default:
            alert("I don't know this tense: " + this.currentTense);
    }
    if (this.isNegated){
        englishVerbStr = englishVerbStr.replace(/^(\S+)\s+/, '$1 not ');
    }
    return englishVerbStr;
};

Tester.prototype.getObjectAdjectiveEnglishStr = function(){
    if (this.objectAdjective){
        return this.objectAdjective.english;
    }else{
        return '';
    }

};

Tester.prototype.generateGoogleUrl = function() {
    var s = escape(this.currentEnglishSentence());

    return 'http://images.google.com/search?safe=on&tbm=isch&q=' + s;
};

Tester.prototype.pushpinPushed = function(pushpinSpanEl){

    var elId = pushpinSpanEl.get('id'); //e.g answer-word-verb-pushpin-setter
    var matched = elId.match(/question-word-(.+?)-pushpin/);
    var partOfSentence = matched[1]; //subject, verb, object, subject-adjective, object-adjective

    if (pushpinSpanEl.hasClass('pushpin-on')){
        this.unsetPushpin(pushpinSpanEl, partOfSentence);
    }else{
        this.setPushpin(pushpinSpanEl, partOfSentence);
    }
};

Tester.prototype.setPushpin = function(pushpinSpanEl, partOfSentence){

    var pushpinImgEl = pushpinSpanEl.one('img');

    pushpinSpanEl.removeClass('pushpin-hidden');
    pushpinSpanEl.removeClass('pushpin-off');
    pushpinSpanEl.addClass('pushpin-on');
    pushpinImgEl.set('src', 'push_pin-on.png');

    switch (partOfSentence){
        case 'verb':
            var verb = this.currentVerb;
            verb.pinned = true;
            break;
        case 'subject':
            var subject = this.currentSubject;
            subject.pinned = true;
            break;
        default:
            return;
    }
};
Tester.prototype.unsetPushpin = function(pushpinSpanEl, partOfSentence){
    var pushpinImgEl = pushpinSpanEl.one('img');

    pushpinImgEl.set('src', 'push_pin-off.png');
    // don't hide it right away, too abrupt, pushpinSpanEl.addClass('pushpin-hidden');

    switch (partOfSentence){
        case 'verb':
            var verb = this.currentVerb;
            verb.pinned = false;
            break;
        case 'subject':
            var subject = this.currentSubject;
            subject.pinned = false;
            break;
        default:
            return;
    }
};


Tester.prototype.checkboxWordListTemplate = '<input id="wordlist-checkbox-{wordId}" type="checkbox" checked="1"/>{english}</input><br/>';
Tester.prototype.populateCheckboxWordLists = function() {
//    var i, row, word, template, stash, html;
//
//    template = this.checkboxWordListTemplate;
//
//    for (i in verbData){
//        row = verbData[i];
//        // to skip the findRow method we added
//        if (typeof row !== 'object'){
//            continue;
//        }
//        word = new Verb(row);
//        stash = { 
//            english: word.infinitive[1],
//            wordId: word.wordId
//        };
//        html = Y.substitute(template, stash);
//        el = Y.Node.create(html);
//
//        sectionEl = Y.one('#verb-section-list');
//        sectionEl.append(el);  
//    }
//
//    // the subjects (only agents or i-agents are subjects for verbs)
//    for (i in nounData){
//        row = nounData[i];
//        // to skip the findRow method we added
//        if (typeof row !== 'object'){
//            continue;
//        }
//        word = new Noun(row);
//        if (word.agentType === 'no-agent'){
//            continue;
//        }
//        stash = {
//            english: word.english_sing,
//            wordId: word.wordId
//        };
//        html = Y.substitute(template, stash);
//        el = Y.Node.create(html);
//
//        sectionEl = Y.one('#subject-section-list');
//        sectionEl.append(el);
//    }
};

