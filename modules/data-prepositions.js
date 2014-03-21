
var prepositionData = [
 [ 'on',          'na',    'locative' ],
 [ 'onto',        'na',    'accusative' ],
 [ 'above',       'nad',   'instrumental' ],
 [ 'to',          'nad',   'accusative' ],
 [ 'behind',      'za',    'instrumental' ],
 [ 'in front of', 'przed', 'instrumental' ],
 [ 'through',     'przez', 'accusative' ],
 [ 'under',       'pod',    'instrumental' ],
 [ 'with',        'z',      'instrumental' ],
 [ 'from',        'z',      'genitive' ],
 [ 'from',        'od',     'genitive' ],
 [ 'to',          'do',     'genitive' ],
 [ 'without',     'bez',    'genitive' ],
 [ 'between',     'między', 'instrumental' ], 
 [ 'next to',     'obok',   'genitive' ],
 [ 'in',          'w',      'locative' ],
 [ 'about (concerning)',    'o',  'locative' ],
 [ 'next to (hard by)',     'przy', 'locative' ],
 [ 'before (chronologically)', 'przed', 'instrumental' ],
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
