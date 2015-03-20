
module.exports = function(project){
  'use strict';

  const spawn = require('child_process').spawn;
  const path = require('path');
  const whichLocal = require('npm-which')(path.resolve(__dirname, '..'));
  const whichCwd   = require('npm-which')(process.cwd());
  const pm2Path = (function(){
    let _pm2Path;
    try{
      _pm2Path = whichLocal.sync('pm2');
    } catch(err){
      _pm2Path = whichCwd.sync('pm2');
    }
    return _pm2Path;
  })();

  const tasks = new Map([
    ['start',  ['start', './server/app.js', '--name', project.name] ],
    ['stop',   ['stop',   project.name] ],
    ['reload', ['reload', project.name] ],
    ['delete', ['delete', project.name] ],
    ['list',   ['list'] ],
    ['logs',   ['logs'] ],
    ['monit',  ['monit'] ],
  ]);

  const param = process.argv;
  if(param.length < 5){ throw 'dame desu yo'}
  const type = param[4];

  if( tasks.has(type) ){
    const pm2 = spawn(pm2Path, tasks.get(type), {
      stdio: [
	process.stdin,
	process.stdout,
	process.stderr,
      ],
    });
    pm2.on('exit', function(data){
    })
  } else {
    throw 'server type none.';
  }

};

