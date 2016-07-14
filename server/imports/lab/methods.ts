declare var Collections : any;
Meteor.methods({
  /**prepareLab: prepares a labExec object for the current user
   * takes the id of the lab and a callback as parameter
   * callback: (err,parseTasks,labExec)
   */
  'prepareLab': function(labId : number,callback : any){
     console.log("here");
     var lab = require('../api/labExec.js');
     lab.init(Meteor.userId(),labId,function(err,parsed){
       callback(err,parsed,lab);
     });
  },
  'tyLab': function(labId : number) : number{
    return 5;
  }
  }
});

