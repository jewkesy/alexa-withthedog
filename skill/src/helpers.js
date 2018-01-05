"use strict";

var console = require('tracer').colorConsole();

module.exports = {
  prepQuestionForSSML: function (text) {
    return prepQuestionForSSML(text);
  },
  formatForRTF: function (text) {
    return formatForRTF(text);
  },
	buildNaturalLangList: function (items, finalWord, emphasis) {
		return buildNaturalLangList(items, finalWord, emphasis);
	},
	randomInt: function (low, high) {
		return randomInt(low, high);
	},
	shuffle: function (arr) {
		return shuffle(arr);
	},
	cleanseCharacterText: function (character) {
		return cleanseCharacterText(character);
	},
  probability: function (n) {
    return !!n && Math.random() <= n;
  },
  shuffleAndTrim: function (t, num) {

// TODO merge, shuffle then trim

// characters: [
// "Junger Ellerkamp",
// "Zirkusdirektor, Himmler, Himmler-Puppenspieler, Hitler",
// "Mörder aus „M“, Göring-Puppenspieler, Alter Ellerkamp, SS-Mann, Fremdenverkehrsdirektor",
// "Hitlers Kammerdiener, Goebbels-Puppenspieler, SS-Mann"
// ]
    t = shuffle(t);
    return t.slice(0, num);
  }
}

function formatForRTF(text) {

  text = replaceAll(text, "<emphasis level=\"reduced\">", "");
  text = replaceAll(text, "</emphasis>", "");
  text = replaceAll(text, "\n", "<br/>");
  return text;
}

function prepQuestionForSSML(text) {
  // console.log(text);
  text = replaceAll(text, "True or False. True or false", "True or False.");
  text = replaceAll(text, ":", " ");
  text = replaceAll(text, "&#039;", "'");
  text = replaceAll(text, "&ouml;", "ö");
  text = replaceAll(text, "&uuml;", "ü");
  text = replaceAll(text, "&Aring;", "Å");
  text = replaceAll(text, "&eacute;", "é");
  text = replaceAll(text, "&Eacute;", "É");
  text = replaceAll(text, "&sup2;", "2");

  text = replaceAll(text, "&ldquo;", "&quot;");
  text = replaceAll(text, "&rdquo;", "&quot;");

  text = replaceAll(text, "??", "?");
  text = replaceAll(text, ". . ", ". ");
  text = replaceAll(text, ".. ", ". ");
  text = replaceAll(text, "!. ", "! ");
  text = replaceAll(text, " & ", " &amp; ");
  text = replaceAll(text, "$", "");

  text = replaceAll(text, "\'", "&apos;");

  text = replaceAll(text, "Det.", "Detective ");

  text = replaceAll(text, "Se7en", "Seven");  
  // console.log(text);
  return text;
}

function cleanseCharacterText(character) {
// console.log(character)  
  character = replaceAll(character, "undefined", "");
  character = replaceAll(character, "(uncredited)", "");
	character = replaceAll(character, "(voice)", "");
  character = replaceAll(character, "(voix)", "");
	character = replaceAll(character, "(Voice)", "");
  character = replaceAll(character, "( voice )", "");
	character = replaceAll(character, "Herself", "");
	character = replaceAll(character, "Himself", "");
	character = replaceAll(character, "Self", "");
	character = replaceAll(character, "(archive footage)", "");
	character = replaceAll(character, "Interviewee", "");
  character = replaceAll(character, "(co-director)", "");
  character = replaceAll(character, "(singing)", "");
// console.log(character)
	return character.trim();
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function buildNaturalLangList(items, finalWord, emphasis) {
  var output = '';
  for (var i = 0; i < items.length; i++) {
    if(i === 0) {
      output += items[i].trim();
    } else if (i < items.length - 1) {
      output += ', ' + items[i].trim();
    } else {
      output += ' ' + finalWord + ' ' + items[i].trim();
    }
  }

  output = cleanseCharacterText(prepQuestionForSSML(output));

  if (emphasis) return "<emphasis level=\"reduced\">" + output + "</emphasis>"

  return output;
}

function randomInt(low, high) {
  return Math.floor(Math.random() * high);
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function daydiff(first, second) {
  return Math.round((second-first)/(1000*60*60*24));
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
