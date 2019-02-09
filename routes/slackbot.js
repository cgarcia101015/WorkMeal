require('dotenv').config();
var keys = require('../keys.js');
SlackBot = require('slackbots');
axios = require('axios');
var NodeGeocoder = require('node-geocoder');

module.exports = function(app) {
	// Setup our slackbot with the app we created and their credentials
	var bot = new SlackBot({
		token: process.env.SLACKBOT_TOKEN,
		name: 'work_meal'
	});

	var zamKey = keys.zomato;
	var edaKey = keys.edamam;
	var firKey = keys.firebase;
	var mapKey = keys.mapquest;

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
			data.text !== undefined &&
			data.channel === 'CFNLZH407'
		) {
			// chooseOne();
			console.log(userInput);
			// turn multiple word requests into string for recipe API to search
			// var apiInput = userInput.replace(/ /g, '+');
			// console.log('A message was sent that said: ' + userInput);
			// console.log('The API will search for: ' + apiInput);
		}

		function findLocation(callback) {
			var options = {
				provider: 'mapquest',

				// Optional depending on the providers
				httpAdapter: 'https', // Default
				apiKey: mapKey, // for Mapquest, OpenCage, Google Premier
				formatter: null // 'gpx', 'string', ...
			};
			var geocoder = NodeGeocoder(options);

			//Using callback
			geocoder.geocode('10467', function(err, res) {
				var geoLat = res[0].latitude;
				var geoLon = res[0].longitude;
				// console.log('Latitude: ' + geoLat);
				// console.log('Longitude: ' + geoLon);
				callback({ lat: geoLat, lon: geoLon });
				// return {lat: geoLat,lon: geoLon};
			});
		}

		var newUserInput = chooseOne();

		function chooseOne() {
			// var apiInput = userInput.replace(/ /g, "+");
			if (userInput === 'cook') {
				// console.log('The user choose to: ' + userInput);
				bot.postMessageToChannel('slack-bot-for-meals', 'What do you want to cook?');
				if (userInput) {
					bot.on('message', function(choice) {
						var userChoice = choice.text;
						console.log('This is the userInput: ' + userChoice);
						// console.log(userInput);
						// console.log(data);
						// returnLunch(userChoice);
					});
				}
			} else if (userInput === 'eat out') {
				bot.postMessageToChannel('slack-bot-for-meals', 'What do you want to grab?');
				if (userInput) {
					bot.on('message', function(choice) {
					var userChoice = choice.text;
					console.log('The user choose to: ' + userInput);

				});
				  findLocation(returnRestaurant);
			
			}
	};

		function returnRestaurant({ lat, lon }) {
			var userInput = data.text;
			var apiInput = userInput.replace(/ /g, '+');
			var config = { headers: { 'user-key': zamKey } };
			console.log(lat, lon);
			var URL =
				'https://developers.zomato.com/api/v2.1/search?q=' +
				apiInput +
				'&lat=' +
				lat +
				'&lon=' +
				lon +
				'&radius=100%&sort=real_distance';

			axios
				.get(URL, config)
				.then(function(response) {
					var jsonData = response.data;
					var showData = [
						'Name: ' + jsonData.restaurants[1].restaurant.name,
						'Location: ' + jsonData.restaurants[1].restaurant.location.address,
						'Url to Restaurant: ' + jsonData.restaurants[1].restaurant.url
					].join('\n\n');
					// console.log(response);
					// console.log(zomato);
					var params = {
						icon_emoji: ':bread:'
					};
					bot.postMessageToChannel('slack-bot-for-meals', "Here's an idea: " + showData, params);
				})
				.catch(function(error) {
					console.log('Zomato API error: ' + error);
					bot.postMessageToChannel(
						"I'm sorry, I didn't get any results for that, could you be more specific?",
						{ slackbot: true, icon_emoji: ':question:' }
					);
				});
		}

		// Return a recipe
		function returnLunch(data) {
			var userParam = data;
			var apiInput = userParam.replace(/ /g, '+');
			// console.log('sdfsdfhsdfhsudhfsudhfsdf');
			// console.log(apiInput);
			axios
				.get('https://api.edamam.com/search?q=' + apiInput + '&app_id=45d6973d&app_key=' + edaKey)
				.then(function(response) {
					var jsonData = response.data;

					var showData = [
						jsonData.q,
						'Title: ' + jsonData.hits[1].recipe.label,
						'Image: ' + jsonData.hits[1].recipe.image,
						'Url to Recipe: ' + jsonData.hits[1].recipe.url
					].join('\n\n');

					var params = {
						icon_emoji: ':bread:'
					};
					bot.postMessageToChannel('slack-bot-for-meals', "Here's an idea: " + showData, params);
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

		// function rude() {
		//     bot.postMessageToChannel("slack-bot-for-meals", "Well that\'s rude.", { "slackbot": true, icon_emoji: ":neutral_face:"});
		// }
	
	)};
