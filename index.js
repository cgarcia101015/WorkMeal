require("dotenv").config();

SlackBot = require("slackbots");
axios = require("axios");

// Setup our slackbot with the app we created and their credentials
var bot = new SlackBot({
  token: process.env.SLACKBOT_TOKEN,
  name: "work_meal"
});

// Error Handler
bot.on("error", function(error) {
  console.log("Uh-oh, slackBot error: " + error);
});

// Start Handler - starts the slackbot
// Event = start - triggered when the bot is successfully connected to the Slack server
bot.on("start", function() {
  // this makes the emoji of the slackbot a pizza
  var params = {
    icon_emoji: ":pizza:"
  };
  // Post a message into specified slack channel
  bot.postMessageToChannel("slack-bot-for-meals", "What would you like for lunch today?", params);
});

// Mention Handler - someone mentions the app 
bot.on("message", function(data) {
  var userInput = data.text;
  // If the bot sent the message, do nothing 
  if (data.type !== "message" || data.subtype === "bot_message" || userInput == "undefined") {
  return;
  // If the message calls out the work meal bot specifically, and says nothing else, respond
  } else if (data.text === "<@UFR15N7TQ>") {
    bot.postMessageToChannel("slack-bot-for-meals", "Yes, how can I help you?", { "slackbot":
    true, icon_emoji: ":question:"});
    // If a message was sent that has any other content and is not from the workbot, call the recipes API
  } else if (data.type === "message" && data.username != "work_meal" && data.text !== undefined && data.channel === "CFNLZH407") {
  // turn multiple word requests into string for recipe API to search
    var apiInput = userInput.replace(/ /g, "+");
    console.log("A message was sent that said: " + userInput);
    console.log("The API will search for: " + apiInput);
    returnLunch();
    returnRestaurant();
  }

function returnRestaurant() {
  var config = { headers: {"user-key" : "5d210cce31ec0d89636072c424a81717"}};
  var URL = "https://developers.zomato.com/api/v2.1/search?q=" + userInput;

  axios.get(URL, config).then(function(response) {
    var jsonData = response.data;
    var showData = [
      "Name: " + jsonData.restaurants[1].restaurant.name,
      "Location: " + jsonData.restaurants[1].restaurant.location.address,
      "Url to Restaurant: " + jsonData.restaurants[1].restaurant.url,
    ].join("\n\n");
    var params = {
            icon_emoji: ":bread:"
        };
    bot.postMessageToChannel("slack-bot-for-meals", "Here\'s an idea: " + showData, params);
}).catch(function (error) {
  console.log("Edamam API error: " + error);
  bot.postMessageToChannel("slack-bot-for-meals","I\'m sorry, I didn\'t get any results for that, could you be more specific?", { "slackbot": true, icon_emoji: ":question:"});
});
}
// Return a recipe 
function returnLunch() {
    axios.get("https://api.edamam.com/search?q=" + apiInput + "&app_id=45d6973d&app_key=a104dcac382786daa58cb39db2166cb2").then(function(response) {
        var jsonData = response.data;

        var showData = [
            jsonData.q,
          "Title: " + jsonData.hits[1].recipe.label,
          "Image: " + jsonData.hits[1].recipe.image,
          "Url to Recipe: " + jsonData.hits[1].recipe.url,
        ].join("\n\n");

        var params = {
            icon_emoji: ":bread:"
        };
        bot.postMessageToChannel("slack-bot-for-meals", "Here\'s an idea: " + showData, params);
}).catch(function (error) {
    console.log("Edamam API error: " + error);
    bot.postMessageToChannel("slack-bot-for-meals","I\'m sorry, I didn\'t get any results for that, could you be more specific?", { "slackbot": true, icon_emoji: ":question:"});
});
}

// function rude() {
//     bot.postMessageToChannel("slack-bot-for-meals", "Well that\'s rude.", { "slackbot": true, icon_emoji: ":neutral_face:"});
// }

});