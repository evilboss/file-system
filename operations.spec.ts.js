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
		it('Should be fileOperations.convert', () => {
			expect(fileOperations.convert()).toMatchObject(getOperation('extract'));
		});
		it('Should be fileOperations.dontConvert', () => {
			expect(fileOperations.dontConvert()).toMatchObject(getOperation('dontConvert'));
		});
		it('Should be fileOperations.uploadToFurtherProcessing', () => {
			expect(fileOperations.uploadToFurtherProcessing()).toMatchObject(getOperation('uploadToFurtherProcessing'));
		});
		it('Should be fileOperations.unsupported', () => {
			expect(fileOperations.uploadToFurtherProcessing()).toMatchObject(getOperation('unsupported'));
		});
	});

});
