"use strict";

var console = require('tracer').colorConsole();
var helpers = require('./helpers.js');

const phrases = [
	"Who's a good doggy!", "Who's a good dog", "Good dog", "sit", "stay", "go fetch!", "where's your toy", "Go find your toy", "walkies!"
];

module.exports = {
	getRandomPhrase: function () {
		return getRandomPhrase();
	}
}

function getRandomPhrase() {
	return '<prosody pitch="x-high">' + phrases[helpers.randomInt(0, phrases.length)] + '</prosody>';
}
