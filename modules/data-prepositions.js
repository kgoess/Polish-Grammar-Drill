
var prepositionData = [
 [ 'on',    'na',  'locative' ],
 [ 'onto',  'na',  'accusative' ],
 [ 'above', 'nad', 'instrumental' ],
 [ 'behind', 'za', 'instrumental' ],
 [ 'in front of', 'przed', 'instrumental' ],
 [ 'through', 'przez', 'accusative' ],
 [ 'before (chronologically)', 'przed', 'instrumental' ],
 [ 'under',         'pod', 'instrumental' ],
 [ 'with',          'z', 'instrumental' ],
 [ 'from, out of',  'z',   'genitive' ],
 [ 'from, away from', 'od', 'genitive' ],
 [ 'to',            'do', 'genitive' ],
 [ 'without',       'bez', 'genitive' ],
 // needs two nouns[ 'between',       'między', 'instrumental' ], 
 [ 'about (concerning)', 'o', 'locative' ],
 [ 'next to (hard by)', 'przy', 'locative' ],
 [ 'next to', 'obok', 'genitive' ],
 [ 'in',       'w',   'locative' ],
];

// "exports" is needed for our unit tests in mocha
// this fakes it up in case we're *not* in mocha
var exports;
if (typeof exports === "undefined"){
    exports = {};
} 
prepositionData.findRow = function(english){
    var i;
    for (i = 0; i < this.length; ++i){
       if (this[i][0] === english){
       return this[i];
       }
    }
    throw("Error: no preposition match for '" + english + "'");
};
exports.prepositionData = prepositionData;
