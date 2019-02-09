console.log('keys loaded');
require('dotenv');

const theKeys = {
	slackBot: process.env.SLACKBOT_TOKEN,
	zomato: process.env.ZOMATO_USER_KEY,
	edamam: process.env.REACT_APP_APP_KEY,
	firebase: process.env.FIREBASE_KEY,
	mapquest: process.env.KEY_MAPQUEST
};

module.exports = theKeys;
