const {
	getFilename,
	getFileExtension,
	isSupported,
	generatefileName,
	renameFile,
	getFile
} = require('./filename');
describe('filename', () => {
	describe('getfilename', () => {
		it('should get filename of normal file', () => {
			expect(getFilename('file.pdf')).toBe('file');
		});
		it('should get filename of file with multiple dots file', () => {
			expect(getFilename('file.sample.somefile.pdf')).toBe('file.sample.somefile');
		});

	});
	describe('getFileExtension', () => {
		it('should get getFileExtension of normal file', () => {
			expect(getFilename('file.pdf')).toBe('pdf');
		});
		it('should get filename of file with multiple dots file', () => {
			expect(getFilename('file.sample.somefile.pdf')).toBe('pdf');
		});

	});
	describe('isSupported', () => {


	});

});
