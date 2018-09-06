const ghpages = require('gh-pages');
const path = require('path');
const shell = require("shelljs");
const fs = require('fs');



if (process.argv.length > 0) {
  for (let j = 2; j < process.argv.length; j++) {
    const type = process.argv[j];
    if (fs.readdirSync(`./dist`) && fs.readdirSync(`./dist/public/client/dist`)) {
      build(type);
    } else {
      console.error(`ERROR: ${type} has empty dist `);
    }
  }
} else {
  console.error('ERROR: add deploy type [all, c, s]')
}


function build(type) {
  ghpages.clean();
  switch (type) {
    case 'client':
    case 'server':
      shell.exec(`cp ./package.json ./dist`);
      shell.exec(`cp ./Procfile ./dist`);
      deploy(type)
      break;
    default:
      console.error(`ERROR: build type ${type} not found`);
      break;
  }
}


function deploy(type) {
  ghpages.publish(path.join(__dirname, `dist`), {
    repo: `https://git.heroku.com/shelter-app-${type}.git`,
    branch: 'master',
  }, function (err) {
    if (err) {
      console.error(`${type}: ${err}`);
    } else {
      console.log(`https://shelter-app-server.herokuapp.com/}: DEPLOY END SUCCESS!`);
    }
  });
}