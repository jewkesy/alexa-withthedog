"use strict";

var console = require('tracer').colorConsole();
var helpers = require('./helpers.js');

module.exports = {
  buildSpeechletResponse: function (title, output, repromptText, shouldEndSession, showCard, cardText, cardType, cardImg, directives, displayText) {
    return buildSpeechletResponse(title, output, repromptText, shouldEndSession, showCard, cardText, cardType, cardImg, directives, displayText);
  },
  buildResponse: function (sessionAttributes, speechletResponse) {
    return buildResponse(sessionAttributes, speechletResponse);
  }
}

const _bgUrl = "https://s3-eu-west-1.amazonaws.com/popcornquiz/";
const _bgs = ["pq_1.jpg", "pq_2.jpg", "pq_3.jpg", "pq_11.jpg", "pq_12.jpg", "pq_13.jpg", "pq_14.jpg", "pq_15.jpg", "pq_31.jpg", "pq_32.jpg", "pq_33.jpg", "pq_34.jpg", "pq_35.jpg"];

function buildSpeechletResponse(title, output, repromptText, shouldEndSession, showCard, cardText, cardType, cardImg, directives, displayText) {

  if (showCard && typeof cardType == 'undefined') cardType = "Simple";  // Standard
  if (showCard && typeof cardText == 'undefined') cardText = output;
  // console.log(directives)
  // console.log(displayText)

  var rtfLogo = "";
  if (cardImg == 'N/A' || cardImg == "https://image.tmdb.org/t/p/w300_and_h450_bestv2null") {// "https://images-na.ssl-images-amazon.com/images/I/61zY0rrdNQL._SL210_QL95_.png", 'https://s3-eu-west-1.amazonaws.com/popcornquiz/pq_logo.png';  //https://s3-eu-west-1.amazonaws.com/popcornquiz/popcorn_l.png
    cardImg = "https://images-na.ssl-images-amazon.com/images/I/61zY0rrdNQL._SL210_QL95_.png";
    rtfLogo = "https://s3-eu-west-1.amazonaws.com/popcornquiz/pq_logo.png";
  } else {
    rtfLogo = cardImg;
  }

  if (cardImg && cardType == 'Standard') { cardImg = cardImg.replace("http://", "https://"); }

  var bgUrl = _bgUrl + _bgs[helpers.randomInt(0, _bgs.length)];

  var retVal = {
    outputSpeech: {
      type: "SSML", // PlainText or SSML
      ssml: "<speak>" + output + "</speak>"
      //  text: output
    },
    card: {
      type: cardType,
      title: title,
      content: cardText,
      text: cardText,
      image: {
        smallImageUrl: cardImg,
        largeImageUrl: cardImg
      }
    },
    reprompt: {
      outputSpeech: {
        type: "SSML", // PlainText or SSML
        ssml: "<speak>" + repromptText + "</speak>"
        //  text: repromptText
      }
    },
    directives: [{
      type: "Display.RenderTemplate",
      template: {
        type: "BodyTemplate3",
        token: "UserDefineable_3476",
        backButton: "HIDDEN", // VISIBLE
        backgroundImage: {
          contentDescription: "Textured background",
          sources: [
            {
              url: bgUrl
            }
          ]
        },
        title: title,
        image: {
          contentDescription: "Movie poster or actor photo",
          sources: [
            {
              url: rtfLogo
            }
          ]
        },
        textContent: {
          primaryText: {
              type: "RichText",
              text: displayText
          }
        }
      }
    }],
    shouldEndSession: shouldEndSession
  };
  
  if (!showCard) {
    delete retVal.card;
    delete retVal.directives;
  }

  if (!directives || !directives.Display) delete retVal.directives;
  console.debug(retVal)
  return retVal
}

function buildResponse(sessionAttributes, speechletResponse) {
  // console.log('buildReponse', speechletResponse);
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  };
}
