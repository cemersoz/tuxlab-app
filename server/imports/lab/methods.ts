declare var Collections : any;
Meteor.methods({
  'prepareLab': function(labId : number){
     console.log("here");
     var t = require('../api/labExec.js');
     t.init(Meteor.userId(),labId,console.log);

  }
});

