const ghpages = require('gh-pages');

ghpages.publish('build', err => {
  if (err) {
    console.log(err);
  }
  console.log('Successfully deployed to GitHub Pages!');
});
