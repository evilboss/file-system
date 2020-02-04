const {getOperation, fileOperations} = require('./operations');
describe('operations', () => {
	describe('getOperation', () => {
		it('Should be getOperation extract', () => {
			expect(getOperation('extract')).toMatchObject(fileOperations.extract());
		});
		it('Should be getOperation convert', () => {
			expect(getOperation('convert')).toMatchObject(fileOperations.convert());
		});
		it('Should be getOperation dontConvert', () => {
			expect(getOperation('dontConvert')).toMatchObject(fileOperations.dontConvert());
		});
		it('Should be getOperation uploadToFurtherProcessing', () => {
			expect(getOperation('uploadToFurtherProcessing')).toMatchObject(fileOperations.uploadToFurtherProcessing());
		});

	});
	describe('fileOperations', () => {
		it('Should be fileOperations.extract', () => {
			expect(fileOperations.extract()).toMatchObject(getOperation('extract'));
		});
		it('Should be fileOperations.convert', () => {
			expect(fileOperations.convert()).toMatchObject(getOperation('convert'));
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
