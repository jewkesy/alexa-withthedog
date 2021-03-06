"use strict"

var console = require('tracer').colorConsole();
var echo = require('./echo.js');
var helpers = require('./helpers.js');

module.exports = {
  sayWoof: function (uri, session, callback) {
    return sayWoof(uri, session, callback);
  }
}

const _sounds = ["01_squeak_01.mp3", "02_squeak_01.mp3", "03_squeak_02.mp3", "04_squeak_07.mp3", "05_squeak_09.mp3", "06_squeak_01.mp3", "07_squeak_12.mp3", "08_squeak_01.mp3", "10_squeak_01.mp3", "11_squeak_01.mp3", "12_squeak_10.mp3"];

function sayWoof(uri, session, callback) {

  var sfx = "";

  for (var i = 0; i < 5; i++) {
    var url = uri + _sounds[helpers.randomInt(0, _sounds.length)];
    sfx += "<audio src='" + url + "' />";
    if (Math.random() >= 0.3) sfx += echo.getRandomPhrase(session.locale);
  }

  var speech_1 = sfx;

  var sfx = "";

  for (var i = 0; i < 5; i++) {
    var url = uri + _sounds[helpers.randomInt(0, _sounds.length)];
    sfx += "<audio src='" + url + "' />";
    if (Math.random() >= 0.3) sfx += echo.getRandomPhrase(session.locale);
  }

  var speech_2 = sfx;

  var retVal = {
    title: "Play with the dog",
    say: speech_1,
    repromptText: speech_2
  }
  return callback(null, retVal);
}
