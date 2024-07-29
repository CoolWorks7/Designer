// const fs = require('fs');

// function getDirectories(source) {
//     return fs.readdirSync(source, { withFileTypes: true })
//     .filter(dirent => dirent.isDirectory())
//     .map(dirent => dirent.name);
// }

function customError(error) {
    console.log(error);
}

// module.exports = {
//     getDirectories,
//     customError
// }