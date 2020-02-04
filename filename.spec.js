const {
	getFilename,
	getFileExtension,
	isSupported,
	generatefileName,
	renameFile,
	getFile,
	isDefaultFormats,
	isSupportedFileFormats,
	isSupportedArchive,
	isCSVFile
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
		it('should get generatefileName of a normal file', () => {
			expect(generatefileName('file.pdf', 'recliame4amazon')).toBe('recliame4amazon/file.pdf');
		});

		it('should get generatefileName of file with multiple dot file', () => {
			expect(generatefileName('sample.somedir.somefile.pdf', 'recliame4amazon')).toBe('recliame4amazon/sample.somedir.somefile.pdf');
		});
		it('should get generatefileName of file with multiple slashes file', () => {
			expect(generatefileName('sample/somedir/somefile.pdf', 'recliame4amazon')).toBe('recliame4amazon/sample_somedir_somefile.pdf');
		});

	});
	describe('getFile', () => {
		it('should getFile of a normal file', () => {
			expect(getFile('file.pdf', 'recliame4amazon')).toBe('file.pdf');
		});

		it('should get generatefileName of file with multiple dot file', () => {
			expect(getFile('sample.somedir.somefile.pdf', 'recliame4amazon')).toBe('sample.somedir.somefile.pdf');
		});
		it('should get generatefileName of file with multiple slashes file', () => {
			expect(getFile('sample/somedir/somefile.pdf', 'recliame4amazon')).toBe('somefile.pdf');
		});

	});
	describe('renameFile', () => {
		it('should getFile of a normal file', () => {
			expect(renameFile('file.pdf', 'recliame4amazon')).toBe('recliame4amazon/file.pdf');
		});

		it('should get generatefileName of file with multiple dot file', () => {
			expect(renameFile('sample.somedir.somefile.pdf', 'recliame4amazon')).toBe('recliame4amazon/sample.somedir.somefile.pdf');
		});
		it('should get generatefileName of file with multiple slashes file', () => {
			expect(renameFile('sample/somedir/somefile.pdf', 'recliame4amazon')).toBe('recliame4amazon/sample_somedir_somefile.pdf');
		});

	});
	describe('isDefaultFormats', () => {
		it('should tell if a file isDefaultFormats of a pdf file', () => {
			expect(isDefaultFormats('pdf')).toBe(true);
		});
		it('should tell if a file isDefaultFormats of a psd file', () => {
			expect(isDefaultFormats('psd')).toBe(true);
		});
		it('should tell if a file isDefaultFormats of a png file', () => {
			expect(isDefaultFormats('png')).toBe(true);
		});
		it('should tell if a file isDefaultFormats of a jpg file', () => {
			expect(isDefaultFormats('jpg')).toBe(true);
		});
		it('should tell if a file isDefaultFormats of a csv file', () => {
			expect(isDefaultFormats('csv')).toBe(false);
		});
	});
	describe('isSupportedFileFormats', () => {
		it('should tell if file is isSupportedFileFormats pdf file', () => {
			expect(isSupportedFileFormats('pdf')).toBe(true);
		});
		it('should tell if file is isSupportedFileFormats png file', () => {
			expect(isSupportedFileFormats('png')).toBe(true);
		});
		it('should tell if file is isSupportedFileFormats of a exe file', () => {
			expect(isSupportedFileFormats('exe')).toBe(false);
		});
	});

	describe('isSupportedArchive', () => {
		it('should tell if a zip file isSupportedArchive', () => {
			expect(isSupportedArchive('zip')).toBe(true);
		});
		it('should tell if a jar file isSupportedArchive', () => {
			expect(isSupportedArchive('jar')).toBe(true);
		});


	});


});
