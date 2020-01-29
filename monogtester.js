const config = require('./appConfig');
const {MongoClient} = require('mongodb');
const {MONGNO_URL} = process.env;

async function listDatabases(client) {
	databasesList = await client.db().admin().listDatabases();

	console.log("Databases:");
	databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


async function main() {
	const client = new MongoClient(MONGNO_URL);

	try {
		// Connect to the MongoDB cluster
		await client.connect();

		// Make the appropriate DB calls
		await listDatabases(client);

	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}

main().catch(console.error);
