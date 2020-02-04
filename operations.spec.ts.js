const {getOperation, fileOperations} = require('./operations');
describe('operations', () => {
	describe('getOperation', () => {
		it('Should be getOperation', () => {
			expect(getOperation('extract')).toMatchObject(fileOperations('extract'));
		});

	});
	describe('fileOperations', () => {
		it('Should be fileOperations.extract', () => {
			expect(fileOperations.extract()).toMatchObject(getOperation('extract'));
		});

	});

});
