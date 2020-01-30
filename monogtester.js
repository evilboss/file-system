const config = require('./appConfig');
const {MongoClient} = require('mongodb');
const {MONGO_URL, MONGO_DB_NAME, PACIFIC_SERVICE_HOST} = process.env;

async function listDatabases(client) {
	databasesList = await client.db().admin().listDatabases();

	console.log("Databases:");
	databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function listCollections(client) {
	client.listCollections().toArray((err, collections) => {
		console.log("collections");
		console.log(collections, err);
	});

}


async function main() {
	console.log(`Mongo url ${MONGO_URL}/${MONGO_DB_NAME}`);
	console.log(`pacific service host ${PACIFIC_SERVICE_HOST}`);
	const client = new MongoClient(`${MONGO_URL}`, {useUnifiedTopology: true});

	try {
		// Connect to the MongoDB cluster
		await client.connect();

		// Make the appropriate DB calls
		await listCollections(client);

	} catch (e) {
		console.error('Error', e);

	} finally {
		await client.close();
	}
}

main().catch(console.error);
