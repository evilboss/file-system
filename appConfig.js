const path = require('path');

if (!process.env.NODE_ENV) {
	require('dotenv').config({path: path.join(__dirname, '.env.local')});


}
console.log('loading env', process.env.NODE_ENV);
const appConfig = (() => {

	if (!process.env.NODE_ENV) {
		require('dotenv').config({path: path.join(__dirname, '.env.local')});


	}

})();


module.exports = appConfig;

