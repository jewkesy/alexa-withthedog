"use strict";

var withthedog =   require('./withthedog.js');
var skillHelper = require('./skillHelper.js');
var console =     require('tracer').colorConsole();

var AWS_URI =  process.env.AWS_URI    || process.argv[2];
var ALEXA_APP_ID =  process.env.ALEXA_APP_ID    || process.argv[3];

exports.handler = function (event, context) {
  try {

    if (event.session.new) {
      onSessionStarted({requestId: event.request.requestId}, event.session);
    }

    if (event.request.type === "LaunchRequest") {
      onLaunch(event.request, event.session, function callback(sessionAttributes, speechletResponse) {
        context.succeed(skillHelper.buildResponse(sessionAttributes, speechletResponse));
      });
    } else if (event.request.type === "IntentRequest") {
      onIntent(event.request, event.session, function callback(sessionAttributes, speechletResponse) {
        context.succeed(skillHelper.buildResponse(sessionAttributes, speechletResponse));
      });
    } else if (event.request.type === "SessionEndedRequest") {
      onSessionEnded(event.request, event.session);
      context.succeed();
    }
  } catch (e) {
    // console.log(e)
    context.fail("Exception: " + e);
  }
};

function onSessionStarted(sessionStartedRequest, session) { // Called when the session starts.
  console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId + ", sessionId=" + session.sessionId);
}

function onSessionEnded(sessionEndedRequest, session) { // Called when the user ends the session. Is not called when the app returns shouldEndSession=true.
  console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId + ", sessionId=" + session.sessionId);
}

function onLaunch(launchRequest, session, callback) { // Called when the user launches the app without specifying what they want.
  console.log("onLaunch requestId=" + launchRequest.requestId + ", sessionId=" + session.sessionId);
  sayWoof(session.user.userId, callback);
}

function onIntent(intentRequest, session, callback) { // Called when the user specifies an intent for this application.
  console.log(intentRequest, session.attributes);

  var intent = intentRequest.intent, intentName = intentRequest.intent.name;

  var sessionAttributes = session.attributes;
  
  switch(intentName) {
    case "AMAZON.StopIntent":
    case "CancelIntent":
      return stop(intentName, session, callback);
    case "AMAZON.HelpIntent":
      return processHelp(intentName, session, callback);
    case "AMAZON.YesIntent":
    case "AMAZON.NoIntent":
      if ( JSON.stringify(session.attributes) === JSON.stringify({})) return sayWoof(session.user.userId, callback);
      return processAnswer(intentName, session, callback);
    case "LaunchIntent":
      return sayWoof(session.user.userId, callback);
    default:
      console.log(intentName);
      return invalidAnswer(intentName, session, callback);
  }
}

function stop(intent, session, callback) {
  var sessionAttributes = session.attributes;
  sessionAttributes = {};
  var text = "Walkies!";
  // sessionAttributes.intent = intent;
  callback(sessionAttributes, skillHelper.buildSpeechletResponse(text, text, "", true, false));
}

function invalidAnswer(intent, session, callback) {
  return sayWoof(session.user.userId, callback);

  var sessionAttributes = session.attributes;
  sessionAttributes.intent = intent;

  var title = "Invalid Answer";
  var questiontext = "Sorry, that was not a valid answer. You can say yes or no.";

  var speechlet = skillHelper.buildSpeechletResponse(title, questiontext, sessionAttributes.repromptText, false, false);
  // console.log(speechlet)
  callback(sessionAttributes, speechlet);
}

function processHelp(intent, session, callback) {
  var sessionAttributes = session.attributes;
  sessionAttributes.intent = intent;
  
  var text = "I'll keep playing with your dog until you tell me to stop";
  var title = "Help";
  
  var speechlet = skillHelper.buildSpeechletResponse(title, text, sessionAttributes.repromptText, false, false);
  callback(sessionAttributes, speechlet);
}

function processAnswer(input, session, callback) {

  switch (input) {
    case "AMAZON.YesIntent":
      return sayWoof(session.user.userId, callback);
    case "AMAZON.NoIntent":
      return stop(input, session, callback);
    default:
      return invalidAnswer(input, session, callback);
  }
}

function sayWoof(userId, callback) {
  withthedog.sayWoof(AWS_URI, function(err, woof) {
    if (err) {
      var t = "There was a problem reaching Amazon. Please try again in a few moments";
      var speechlet = skillHelper.buildSpeechletResponse("", t, "", true, false);
      return callback(err, speechlet);
    }

    var sessionAttributes = { shouldEndSession: false };
    var speechlet = skillHelper.buildSpeechletResponse(woof.title, woof.say, woof.repromptText, false);
    return callback(sessionAttributes, speechlet);
  });
}