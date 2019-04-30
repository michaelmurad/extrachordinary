// const fs = require('fs');

// fs.copyFile('public/index.html', 'dist/index.html', err => {
//   if (err) throw err;
//   console.log('public/index.html was copied to dist/index.html');
// });

// fs.copyFile('public/styles.css', 'dist/styles.css', err => {
//   if (err) throw err;
//   console.log('public/styles.css was copied to dist/styles.css');
// });

const ncp = require('ncp').ncp;

ncp.limit = 16;

const source = 'public';
const destination = 'dist';

ncp(source, destination, err => {
  if (err) {
    return console.error(err);
  }
  console.log('done!');
});
