require('dotenv').config();
var keys = require('../keys');
SlackBot = require('slackbots');
axios = require('axios');
var db = require('../models');

module.exports = function(app) {
// Setup our slackbot with the app we created and their credentials
var bot = new SlackBot({
	token: process.env.SLACKBOT_TOKEN,
	name: 'work_meal'
});

var zamKey = keys.zomato;
var edaKey = keys.edamam;

// Error Handler
bot.on('error', function(error) {
	console.log('Uh-oh, slackBot error: ' + error);
});

// Start Handler - starts the slackbot
// Event = start - triggered when the bot is successfully connected to the Slack server
bot.on('start', function() {
	// this makes the emoji of the slackbot a pizza
	var params = {
		icon_emoji: ':pizza:'
	};
	// Post a message into specified slack channel
	bot.postMessageToChannel('slack-bot-for-meals', 'Would you like to cook or eat out for lunch today?', params);
});

// Mention Handler - someone mentions the app
bot.on('message', function(data) {
  var userInput = data.text;
	// If the bot sent the message, do nothing
	if (data.type !== 'message' || data.subtype === 'bot_message' || userInput == 'undefined') {
		return;
		// If the message calls out the work meal bot specifically, and says nothing else, respond
	} else if (data.text === '<@UFR15N7TQ>') {
		bot.postMessageToChannel('slack-bot-for-meals', 'Yes, how can I help you?', {
			slackbot: true,
			icon_emoji: ':question:'
		});
		// If a message was sent that has any other content and is not from the workbot, call the recipes API
	} else if (
		data.type === 'message' &&
		data.username != 'work_meal' &&
		data.text !== "undefined" &&
		data.channel === 'CFNLZH407'&&
		userInput === "cook"
	) {
		bot.postMessageToChannel("slack-bot-for-meals", "What do you want to cook?").then(function(data) {
			bot.on('message', function(data) {
				var userNewInput = data.text;
				  // If the bot sent the message, do nothing
				  if (data.type !== 'message' || data.subtype === 'bot_message' || userNewInput == 'undefined') {
					  return;
					  // If the message calls out the work meal bot specifically, and says nothing else, respond
				  } else if (
					  data.type === 'message' &&
					  data.username != 'work_meal' &&
					  data.text !== "undefined" &&
					  data.channel === 'CFNLZH407'
				  ) {
				  returnLunch(userNewInput);
					  // console.log('A message was sent that said: ' + userInput);
				} })
		  })
		// console.log('A message was sent that said: ' + userInput);
  } else if (
	data.type === 'message' &&
	data.username != 'work_meal' &&
	data.text !== "undefined" &&
	data.channel === 'CFNLZH407'&&
	userInput === "eat out"
  ){
	bot.postMessageToChannel("slack-bot-for-meals", "What do you want to grab?").then(function(data) {
		bot.on('message', function(data) {
			var userNewInput = data.text;
			  // If the bot sent the message, do nothing
			  if (data.type !== 'message' || data.subtype === 'bot_message' || userNewInput == 'undefined') {
				  return;
				  // If the message calls out the work meal bot specifically, and says nothing else, respond
			  } else if (
				  data.type === 'message' &&
				  data.username != 'work_meal' &&
				  data.text !== "undefined" &&
				  data.channel === 'CFNLZH407'
			  ) {
			  returnRestaurant(userNewInput);
				  // console.log('A message was sent that said: ' + userInput);
			} })
	  })
  }

	function returnRestaurant(userNewInput) {
		var apiInput = userNewInput.replace(/ /g, '+');
		var config = { headers: { 'user-key': zamKey } };
		// console.log(lat, lon)
		var URL =
			'https://developers.zomato.com/api/v2.1/search?q=' +
			apiInput +
			'&lat=40.809498&lon=-73.960154&radius=500%&sort=real_distance';

		axios
			.get(URL, config)
			.then(function(response) {
				var jsonData = response.data;
				var random1 = Math.floor(Math.random() * 10)
				var showData = [
					'Name: ' + jsonData.restaurants[random1].restaurant.name,
					'Location: ' + jsonData.restaurants[random1].restaurant.location.address,
					'Url to Restaurant: ' + jsonData.restaurants[random1].restaurant.url
				].join('\n\n');

				// create a new Restaurant
				db.Restaurant.create({
					restName: jsonData.restaurants[random1].restaurant.name,
					location: jsonData.restaurants[random1].restaurant.location.address,
					urlRest: jsonData.restaurants[random1].restaurant.url,
				  }).then(function(){
					  var params = {
						  icon_emoji: ':bread:'
					  };
					  bot.postMessageToChannel('slack-bot-for-meals', "Here's an idea: " + showData, params);
				  });
			})
			.catch(function(error) {
				console.log('Zomato API error: ' + error);
				bot.postMessageToChannel(
					'slack-bot-for-meals',
					"I'm sorry, I didn't get any results for that, could you be more specific?",
					{ slackbot: true, icon_emoji: ':question:' }
				);
			});
	}

	// Return a recipe
	function returnLunch(userNewInput) {
	console.log("cooking something!!");
	var random2 = Math.floor(Math.random() * 10);
	var apiInput = userNewInput.replace(/ /g, '+');
	console.log("you are cooking this:" + userNewInput);
		axios
			.get('https://api.edamam.com/search?q=' + apiInput + '&app_id=45d6973d&app_key=' + edaKey)
			.then(function(response) {
				var jsonData = response.data;

				var showData = [
					jsonData.q,
					'Title: ' + jsonData.hits[random2].recipe.label,
					'Image: ' + jsonData.hits[random2].recipe.image,
					'Url to Recipe: ' + jsonData.hits[random2].recipe.url
				].join('\n\n');

				// create a new Recipe
				db.Recipe.create({
					title: apiInput,
					imageURL: jsonData.hits[random2].recipe.image,
					recipeURL: jsonData.hits[random2].recipe.url
				  }).then(function(){
					  var params = {
						  icon_emoji: ':bread:'
					  };
					  bot.postMessageToChannel('slack-bot-for-meals', "Here's an idea: " + showData, params);
				  });

			})
			.catch(function(error) {
        console.log('Edamam API error: ' + error);
				bot.postMessageToChannel(
					'slack-bot-for-meals',
					"I'm sorry, I didn't get any results for that, could you be more specific?",
					{ slackbot: true, icon_emoji: ':question:' }
				);
			});      
	}
});
}