const {getOperation, fileOperations} = require('./operations');
describe('operations', () => {
	describe('getOperation', () => {
		it('Should be getOperation', () => {
			expect(getOperation('extract')).toMatchObject(fileOperations('extract'));
		});

	});

});
