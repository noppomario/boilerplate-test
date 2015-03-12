// Project Information
const project = require('../package.json');
const personal = require('../personalSettings.json');

module.exports = function(gulp){
  'use strict';

  const pm2 = require('pm2');

  const connect = function(){
    return new Promise(function(resolve, reject){
      pm2.connect(function(err){
        if(err){ reject('pm2 connect error'); }
        else   { resolve('pm2 connecting');   }
      });
    });
  };

  const emitError = function(error){
      return 'ERROR: ' + error;
  };

  const disconnect = function(value){
    console.log(value);
    pm2.disconnect(function(){
      console.log('pm2 disconnected');
    });
  };

  const tasks = new Map([
    ['stop', {
      resolve: 'express server stop ... success',
      reject:  'express server stop ... failure',
    }],
    ['reload', {
      resolve: 'express server reload ... success',
      reject:  'express server reload ... failure',
    }],
    [ 'delete', {
      resolve: 'express server delete ... success',
      reject:  'express server delete ... failure',
    }],
  ]);

  const getTask = function(type){
    if(type === 'start'){
      return function(value){
        console.log(value);
        return new Promise(function(resolve, reject){
          pm2.start('server/app.js', {name: project.name}, function(err, proc){
            if (err){ reject('express-server start error'); }
            else    { resolve('express-server starting');   }
          });
        });
      };
    } else if ( tasks.has(type) ) {
      return function(value){
        console.log(value);
        return new Promise(function(resolve, reject){
          pm2[type](project.name, function(err, proc){
            if (err){ reject( tasks.get(type).reject);  }
            else    { resolve(tasks.get(type).resolve); }
          });
        });
      };
    }
  };

  gulp.task('server', function(){
    const param = process.argv;
    if(param.length < 5){ throw 'dame desu yo'}
    const type = param[4];

    const task = getTask(type);

    if( task == undefined ){
      throw 'server type none.';
    }

    connect().then(task).catch(emitError).then(disconnect);
  });

};

