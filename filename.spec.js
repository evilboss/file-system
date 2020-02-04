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
			expect(getFileExtension('file.pdf')).toBe('pdf');
		});
		it('should get filename of file with multiple dots file', () => {
			expect(getFileExtension('file.sample.somefile.pdf')).toBe('pdf');
		});

	});
	describe('isSupported', () => {


	});
	describe('generatefileName', () => {
		it('should get generatefileName of file with multiple dot file', () => {
			expect(generatefileName('sample.somedir.somefile.pdf','recliame4amazon')).toBe('recliame4amazon/sample.somedir.somefile.pdf');
		});
		it('should get generatefileName of file with multiple slashes file', () => {
			expect(generatefileName('sample/somedir/somefile.pdf','recliame4amazon')).toBe('recliame4amazon/sample_somedir_somefile.pdf');
		});




	});


});
