
var pronounData = [
 [ 1, 's', '',           'I', ''],
 [ 2, 's', '',           'you', ''],
 [ 3, 's', 'm',          'he', ''], //what about m-personal?
 [ 3, 's', 'f',          'she', ''],
 [ 3, 's', 'm-personal', 'you (formal, masc.)', 'pan'],
 [ 3, 's', 'f',          'you (formal, fem.)', 'pani'],
 [ 1, 'p', '',           'we'],
 [ 2, 'p', '',           'you all'],
 [ 3, 'p', '',           'they'   ]
 //[ 3, 'p',               'you all (formal, masc.)'],
 //[ 3, 'p',               'you all (formal, mixed.)'], ????
];

// "exports" is needed for our unit tests in mocha
// this fakes it up in case we're *not* in mocha
var exports;
if (typeof exports === "undefined"){
    exports = {};
} 
pronounData.findRow = function(english){
    var i;
    for (i = 0; i < this.length; ++i){
        if (this[i][3] === english){
            return this[i];
        }
    }
    throw("Error: no pronoun match for '" + english + "'");
};
exports.pronounData = pronounData;
