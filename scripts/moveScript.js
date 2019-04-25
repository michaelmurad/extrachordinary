const fs = require('fs');

fs.readFile('dist/index.html', (err) => {
  if (err) {
    return fs.copyFile('public/index.html', 'dist/index.html', (err) => {
      if (err) throw err;
      console.log('source.txt was copied to destination.txt');
    });
  };
  fs.unlink('dist/index.html', (err) => {
    if (err) throw err;
    console.log('path/file.txt was deleted');
  });
  
  fs.copyFile('public/index.html', 'dist/index.html', (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
  });
});

fs.readFile('dist/styles.css', (err) => {
  if (err) {
    return fs.copyFile('public/styles.css', 'dist/styles.css', (err) => {
      if (err) throw err;
      console.log('source.txt was copied to destination.txt');
    });
  };
  fs.unlink('dist/styles.css', (err) => {
    if (err) throw err;
    console.log('path/file.txt was deleted');
  });
  
  fs.copyFile('public/styles.css', 'dist/styles.css', (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
  });
});

