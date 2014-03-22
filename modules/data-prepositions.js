
var prepositionData = [
// english        polish   gov'ing case     quality
 [ 'on',          'na',    'locative',      null ],
 [ 'onto',        'na',    'accusative',    'motion' ],
 [ 'above',       'nad',   'instrumental',  null ],
 [ 'to',          'nad',   'accusative',    'motion' ],
 [ 'behind',      'za',    'instrumental',  null ],
 [ 'in front of', 'przed', 'instrumental',  null ],
 [ 'through',     'przez', 'accusative',    'motion' ],
 [ 'under',       'pod',    'instrumental', null ],
 [ 'with',        'z',      'instrumental', 'combination' ],
 [ 'from',        'z',      'genitive',     'motion' ], // actually requires a 'place' if być:
                                                        // jestem z kalifornii
 [ 'from',        'od',     'genitive',     'motion' ],
 [ 'to',          'do',     'genitive',     'motion' ],
 [ 'without',     'bez',    'genitive',     'combination' ], // herbata bez cukru
// [ 'between',     'między', 'instrumental', 'motion' ], 
 [ 'next to',     'obok',   'genitive',     null ],
 [ 'in',          'w',      'locative',     null ],
 [ 'about (concerning)',    'o',  'locative', 'relation' ],
 [ 'next to (hard by)',     'przy', 'locative', null ],
// [ 'before (chronologically)', 'przed', 'instrumental', null ], //requires an event
];

// "exports" is needed for our unit tests in mocha
// this fakes it up in case we're *not* in mocha
var exports;
if (typeof exports === "undefined"){
    exports = {};
} 
prepositionData.findRow = function(polish_plus_case){
    var splitStr = polish_plus_case.split('+');
    var polishPreposition = splitStr[0];
    var governingCase = splitStr[1];
    var i;
    for (i = 0; i < this.length; ++i){
       if (this[i][1] === polishPreposition && 
           this[i][2] == governingCase ){
          return this[i];
        }
    }
    throw("Error: no preposition match for '" + english + "'");
};
exports.prepositionData = prepositionData;
