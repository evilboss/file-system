function delay() {
	return new Promise(resolve => setTimeout(resolve, 3000));
}

async function delayedLog(item) {
	// notice that we can await a function
	// that returns a promise
	await delay();
	console.log(item);
}

async function process(item) {

	await delayedLog(item);
	return Promise.resolve('done');
}

async function processArray(array) {
	for (const item of array) {
		await delayedLog(item);
	}
	console.log('Done!');
}


processArray([1, 2, 3, 4]);
/*
for (const item of [1, 2, 3]) {
	process(item).then(result => {
		console.log(result)
	});
}
*/


