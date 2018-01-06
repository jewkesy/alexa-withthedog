"use strict";

var en = require('./echo_EN.js');
var de = require('./echo_DE.js');
var ja = require('./echo_JA.js');

module.exports = {
	getRandomPhrase: function (locale) {
		if (locale == "de-DE") return de.getRandomPhrase();
		if (locale == "ja-JA") return dja.getRandomPhrase();
		return en.getRandomPhrase();
	}
}