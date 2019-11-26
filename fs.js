const fs = require('fs');


fs.readdir('./storage/', (err, files) => {
    console.log(files);
});
