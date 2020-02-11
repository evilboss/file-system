// @ts-nocheck
const {getOperation, fileOperations} = require('./operations');
describe('operations', () => {
	describe('getOperation', () => {
		it('Should be getOperation extract', () => {
			// @ts-ignore
      expect(getOperation('extract')).toMatchObject(fileOperations.extract());
		});
		it('Should be getOperation convert', () => {
			// @ts-ignore
      expect(getOperation('convert')).toMatchObject(fileOperations.convert());
		});
		it('Should be getOperation dontConvert', () => {
			// @ts-ignore
      expect(getOperation('dontConvert')).toMatchObject(fileOperations.dontConvert());
		});
		it('Should be getOperation uploadToFurtherProcessing', () => {
			// @ts-ignore
      expect(getOperation('uploadToFurtherProcessing')).toMatchObject(fileOperations.uploadToFurtherProcessing());
		});
		it('Should be getOperation unsupported', () => {
			// @ts-ignore
      expect(getOperation('unsupported')).toMatchObject(fileOperations.unsupported());
		});

	});
	describe('fileOperations', () => {
		it('Should be fileOperations.extract', () => {
			// @ts-ignore
      expect(fileOperations.extract()).toMatchObject(getOperation('extract'));
		});
		it('Should be fileOperations.convert', () => {
			// @ts-ignore
      expect(fileOperations.convert()).toMatchObject(getOperation('convert'));
		});
		it('Should be fileOperations.dontConvert', () => {
			// @ts-ignore
      expect(fileOperations.dontConvert()).toMatchObject(getOperation('dontConvert'));
		});
		it('Should be fileOperations.uploadToFurtherProcessing', () => {
			// @ts-ignore
      expect(fileOperations.uploadToFurtherProcessing()).toMatchObject(getOperation('uploadToFurtherProcessing'));
		});
		it('Should be fileOperations.unsupported', () => {
			// @ts-ignore
      expect(fileOperations.uploadToFurtherProcessing()).toMatchObject(getOperation('unsupported'));
		});
	});

});
