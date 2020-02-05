const items = ['a', 'b', 'c'];

const logItem = item => new Promise((resolve, reject) => {
	process.nextTick(() => {
		console.log(item);
		resolve();
	})
});
const forEachPromise = (items, fn, context) => {
	return items.reduce((promise, item) => promise.then(() => fn(item, context)), Promise.resolve());
}
forEachPromise(items, logItem).then((done) => {
	console.log('done');
});

