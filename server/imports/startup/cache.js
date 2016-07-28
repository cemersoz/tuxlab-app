/*
  Creates Session and Lab Caches
*/
var NodeCache = require('node-cache');
var Session = require('../api/lab.session.js');

// Lab Cache
  LabCache = new NodeCache({
    stdTTL: nconf.get('labvm_idle_timeout'),
    useClones: false,
    errorOnMissing: false
  });

// Session Cache
  SessionCache = {};
  var etcd_sessions_url = "/tuxlab/sessions";

  // Create Memory Cache
  SessionCache._NodeCache = new NodeCache({
    stdTTL: nconf.get('labvm_idle_timeout'),
    useClones: false,
    errorOnMissing: false
  })

  // Create ETCD Cache
  async.series([
    function(callback){
      etcd.mkdir('tuxlab', function(err){
        if(err && err.errorCode !== 105 && err.errorCode !== 102)
          callback(err);
      });
    },
    function(callback){
      etcd.mkdir('tuxlab/sessions', function(err){
        if(err && err.errorCode !== 105 && err.errorCode !== 102)
          callback(err);
      });
    }
  ], function(err){
    if(err){
      TuxLog.log('warn', err);
    }
  });

  /*
    Gets a session from the local memory cache or ETCD
  */
  SessionCache.get = function(userid, labid, callback){
    SessionCache._NodeCache.get(userid+'#'+labid, function(err, value){
      if(err){
        TuxLog.log('warn', "SessionCache NodeCache Error.");
        callback(err,null);
      }
      else if(value !== undefined){
        callback(null,value);
      }
      else{
        callback(null,null);
        etcd.get('/tuxlab/sessions/'+userid+'/'+labid, function(err, value){
          if(err){
	    TuxLog.log("warn",err);
	    callback(err,null);
	  }
	  else{
            var session = new Session();
	    session.fromJson(value,function(err,res){
	      if(err){
	        callback(err,null);
	      }
	      else{
	        callback(null,session);
	      }
	    });
	  }
        });
      }
    });
  }

  /*
    Adds a Session from the Cache
    userid - user of session
    labid - lab user opens
    session - session object to be stored
    callback(success) - returns boolean if success
  */
  SessionCache.add = function(userid, labid, session){
    async.series([
      function(cb){
        SessionCache._NodeCache.set(userid+'#'+labid, session, function(err, success){
          if(err){
            TuxLog.log("warn",err);
            cb(true);
          }
          else{
            TuxLog.log("warn","1");
            cb(false);
          }
        });
      },
      function(cb){
        etcd.mkdir('tuxlab/sessions/'+userid, function(err){
          if(err && err.errorCode !== 105){
            cb(err);
          }
          else{
            TuxLog.log("warn","2");
            cb(null);
          }
        });
      },
      function(cb){
        //TODO @cemersoz to_data method
         
        var json = {
	  taskNo: session.lab.taskNo,
	  taskUpdates: session.taskUpdates,
	  pass: session.pass,
	  user:session.user,
	  userId: userid,
	  labId: labid,
	  courseId: session.courseId
	};
        etcd.set('tuxlab/sessions/'+userid+'/'+labid, json, function(err){
          cb(err);
        });
      }
    ], function(err){
      if(err){
        TuxLog.log('warn',err);
      }
      TuxLog.log("warn","Dome");
    });
  }

  /*
    Renews Session Variables in the Cache
  */
  SessionCache.renew = function(userid, labid, callback){
    SessionCache.ttl(userid + '#' + labid, nconf.get('labvm_idle_timeout'), callback);
  }

  /*
    Removes a Session from the Cache
  */
  SessionCache.remove = function(userid, labid, callback){
    SessionCache.del(userid + "#" + labid, callback);
  }

  /*
    Handle Expiration
    Delete from ETCD
  */
  SessionCache._NodeCache.on("del", function(key, value){
    //TODO @cemersoz handle expiration of local machine things
  });
