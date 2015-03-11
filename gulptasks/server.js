"use strict";

// Project Information
var project = require('../package.json');
var personal = require('../personalSettings.json');

module.exports = function(gulp){

  var pm2 = require('pm2');

  var serverFunc = {
    connect: function(){
      return new Promise(function(resolve, reject){
        pm2.connect(function(err){
          if(err){ reject('pm2 connect error'); }
          else   { resolve('pm2 connecting');   }
        });
      });
    },
    start: function(value){
      console.log(value);
      return new Promise(function(resolve, reject){
        pm2.start('server/app.js', {name: project.name}, function(err, proc){
          if (err){ reject('express-server start error'); }
          else    { resolve('express-server starting');   }
        });
      });
    },
    stop: function(value){
      console.log(value);
      return new Promise(function(resolve, reject){
        pm2.stop(project.name, function(err, proc){
          if (err){ reject('express-server stop error'); }
          else    { resolve('express-server stopping');  }
        });
      });
    },
    reload: function(value){
      console.log(value);
      return new Promise(function(resolve, reject){
        pm2.reload(project.name, function(err, proc){
          if (err){ reject('express-server reload error'); }
          else    { resolve('express-server reloading');   }
        });
      });
    },
    delete: function(value){
      console.log(value);
      return new Promise(function(resolve, reject){
        pm2.delete(project.name, function(err, proc){
          if (err){ reject('express-server delete error'); }
          else    { resolve('express-server deleting');    }
        });
      });
    },
    error: function(error){
      return 'ERROR: ' + error;
    },
    disconnect: function(value){
      console.log(value);
      pm2.disconnect(function(){
        console.log('pm2 disconnected');
      });
    },
  };

  gulp.task('server', function(){
    const param = process.argv;
    if(param.length < 5){ throw 'dame desu yo'}
    const type = param[4];
    if( serverFunc[type] != undefined ){
      serverFunc.connect().then(serverFunc[type])
        .catch(serverFunc.error)
        .then(serverFunc.disconnect);
    } else {
      throw 'server type none.';
    }
  });

};

