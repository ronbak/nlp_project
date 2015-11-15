var fs = require('fs');
var lodash = require('lodash');
var stopWords = fs.readFileSync(__dirname + '/stopwords.js', 'utf-8');
var afinn = fs.readFileSync(__dirname + '/AFINN.json', 'utf-8');
afinn = JSON.parse(afinn);


var text = 'cool cool good, cool cool Happy birthday to you Happy, birthday to you Happy birthday Mr President Happy birthday to you Thanks, Mr President For all the things you\'ve done The battles that you\'ve won The way you deal with U.S. Steel And our problems by the ton We thank you so much Everybody, happy birthday';


var sentimentChecker = module.exports = function(text) {

  var tokenized = function(text) {
    var cleanedText = text.replace(/[^\w\s]/gi, '').toLowerCase();
    return cleanedText.split(/\s+/);
  };

  var returnValue = {};
  var tokens = tokenized(text);
  var words = [];
  returnValue.vNegTerms = {};
  returnValue.negTerms = {};
  returnValue.posTerms = {};
  returnValue.vPosTerms = {};
  var sentimentWords = [];
  returnValue.sentimentValue = 0;
  returnValue.sentiment = '';


  for(var i = 0; i < tokens.length; i++) {
    if(!lodash.contains(stopWords, tokens[i])) {
      sentimentWords.push(tokens[i]);
    }
  }

  var counter = 0;
  for(var i = 0; i < sentimentWords.length; i++) {

    if(afinn.hasOwnProperty(sentimentWords[i])) {
      returnValue.sentimentValue += afinn[sentimentWords[i]];
      counter++;

      if(afinn[sentimentWords[i]] === -5 || afinn[sentimentWords[i]] === -4) {
        if(returnValue.vNegTerms[sentimentWords[i]]) {
          returnValue.vNegTerms[sentimentWords[i]]++;
        }
        if(!returnValue.vNegTerms[sentimentWords[i]]) {
          returnValue.vNegTerms[sentimentWords[i]] = 1;
        }
      }
      if(afinn[sentimentWords[i]] === -3 || afinn[sentimentWords[i]] === -2 || afinn[sentimentWords[i]] === -1) {
        if(returnValue.negTerms[sentimentWords[i]]) {
          returnValue.negTerms[sentimentWords[i]]++;
        }
        if(!returnValue.negTerms[sentimentWords[i]]) {
          returnValue.negTerms[sentimentWords[i]] = 1;
        }
      }
      if(afinn[sentimentWords[i]] === 3 || afinn[sentimentWords[i]] === 2 || afinn[sentimentWords[i]] === 1) {
        if(returnValue.posTerms[sentimentWords[i]]) {
          returnValue.posTerms[sentimentWords[i]]++;
        }
        if(!returnValue.posTerms[sentimentWords[i]]) {
          returnValue.posTerms[sentimentWords[i]] = 1;
        }
      }
      if(afinn[sentimentWords[i]] === 4 || afinn[sentimentWords[i]] === 5) {
        if(returnValue.vPosTerms[sentimentWords[i]]) {
          returnValue.vPosTerms[sentimentWords[i]]++;
        }
        if(!returnValue.vPosTerms[sentimentWords[i]]) {
          returnValue.vPosTerms[sentimentWords[i]] = 1;
        }
      }
    }
  }

  returnValue.sentimentValue = returnValue.sentimentValue/counter;

  if(returnValue.sentimentValue <= -4) {
    returnValue.sentiment = 'Very Negative';
  }
  if(returnValue.sentimentValue > -4 && returnValue.sentimentValue < 0) {
    returnValue.sentiment = 'Mildly Negative';
  }
  if(returnValue.sentimentValue === 0 || isNaN(returnValue.sentimentValue)) {
    returnValue.sentiment = 'Neutral';
  }
  if(returnValue.sentimentValue > 0 && returnValue.sentimentValue < 4) {
    returnValue.sentiment = 'Mildly Positive';
  }
  if(returnValue.sentimentValue >= 4) {
    returnValue.sentiment = 'Very Positive';
  }
var vPosArray = [];
var posArray = [];
var negArray = [];
var vNegArray = [];

for (var key in returnValue.posTerms) {
  var value = returnValue.posTerms[key];
  posArray.push([key, value]);
}
  // returnValue.vPosTerms = lodash.mapValues(lodash.invert(lodash.invert(returnValue.vPosTerms)), parseInt);
  // returnValue.posTerms = lodash.mapValues(returnValue.posTerms);
  // returnValue.negTerms = lodash.mapValues(lodash.invert(lodash.invert(returnValue.negTerms)), parseInt);
  // returnValue.vNegTerms = lodash.mapValues(lodash.invert(lodash.invert(returnValue.vNegTerms)), parseInt);
console.log(posArray);
  return returnValue;
};

var returnValue = sentimentChecker(text);
console.log(returnValue);