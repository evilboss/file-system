const fruitBasket = {
	apple: 27,
	grape: 0,
	pear: 14
};



const sleep = ms => {
	return new Promise(resolve => setTimeout(resolve, ms))
};

const getNumFruit = fruit => {
	return sleep(1000).then(v => fruitBasket[fruit])
};
const control = async _ => {
	console.log('Start');

	const numApples = await getNumFruit('apple');
	console.log(numApples);

	const numGrapes = await getNumFruit('grape');
	console.log(numGrapes);

	const numPears = await getNumFruit('pear');
	console.log(numPears);

	console.log('End')
};

control();
const fruitsToGet = ['apple', 'grape', 'pear'];
const forLoop = async _ => {
	console.log('Start');

	for (let index = 0; index < fruitsToGet.length; index++) {
		const fruit = fruitsToGet[index];
		const numFruit = await getNumFruit(fruit);
		console.log(numFruit)
	}

	console.log('End')
};

const forEachLoop = _ => {
	console.log('Start');

	fruitsToGet.forEach(fruit => {
		// Send a promise for each fruit
	});

	console.log('End')
};

forLoop();
