"use strict";

var console = require('tracer').colorConsole();
var helpers = require('./helpers.js');

const phrases = [
	""
];

module.exports = {
	getRandomPhrase: function () {
		return getRandomPhrase();
	}
}

function getRandomPhrase() {
	return phrases[helpers.randomInt(0, phrases.length)]
}
