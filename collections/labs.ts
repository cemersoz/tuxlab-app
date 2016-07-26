import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Roles } from './users.ts';

declare var _ : any;

declare var validateLab : any;

export const labs : any = new Mongo.Collection('labs');

/**
  AUTHENTICATION
**/
labs.allow({
  insert: function (userId, doc : any) {
    return Roles.isGlobalAdministrator(userId);
  },
  update: function (userId, doc : any, fields : any) {
    return Roles.isAdministratorFor(doc._id, userId) || Roles.isInstructorFor(doc._id, userId);
  },
  remove: function(userId, doc : any) {
    return Roles.isGlobalAdministrator(userId);
  }
});

/* SCHEMA */
  declare var SimpleSchema: any;
  declare var Collections: any;
  declare var TuxLog: any;

  if (Meteor.isServer){
    Meteor.startup(function(){
      var taskSchema = new SimpleSchema({
        _id: {
          type: String
        },
        updated: {
          type: Number
        },
        name: {
          type: String
        },
        md: {
          type: String,
          defaultValue: ""
        }
      });
      var labSchema = new SimpleSchema({
        _id: {
          type: String
        },
        course_id: {
          type: String,
          /*regEx: SimpleSchema.RegEx.Id,*/
          custom: function() {
            let currentCourse = Collections.courses.findOne({ _id: this.value });
            let instructors = currentCourse.instructor_ids;

            // Check existence of course
            if(currentCourse === "undefined") {
              labSchema.addInvalidKeys([{name: "course_id", type: "nonexistantCourse"}]);
            }
            else{
              return;
            }
          }
        },
        lab_name: {
          type: String
        },
        updated: {
          type: Number,
          autoValue: function(){
            return Date.now();
          }
        },
        hidden:{
          type: Boolean,
          defaultValue: true
        },
        disabled:{
          type: Boolean,
          defaultValue: false
        },
        file: {
          type: String
        },
        tasks: {
          type: [taskSchema]
        }
      });
      (<any>labs).attachSchema(labSchema);
    });
  }

/* LAB VALIDATOR */
  if(Meteor.isServer){
  var validateLab : any = require('../server/imports/lab/checkLab.js');
    Meteor.startup(function(){
      var LabValidator = function(userid, doc, fieldNames?, modifier?, options?){
        if(!doc.course_id){ //check if lab object has a course_id
          TuxLog.log("warn",new Meteor.Error("lab object has no course_id"));
	  throw new Meteor.Error("lab object has no course_id");
	}
	else if(!doc.file){ //check if lab object has a file
	  TuxLog.log("warn",new Meteor.Error("lab object has no labfile"));
	  throw new Meteor.Error("lab object has no labfile");
	}/*
	else if(!Roles.isInstructorFor(doc.course_id,userid)){
	  TuxLog.log("warn",new Meteor.Error("This user is not an instructor for this course"));
	  throw new Meteor.Error("This user is not an instructor for this course");
	}*/
	else{ //lab object is valid,validating labfile
          var labfile = doc.file;
	  if(!validateLab(labfile)){
            TuxLog.log("warn",new Meteor.Error("labfile failed the validator"));
            throw new Meteor.Error("labfile failed the validator");
	  }
	  else{
            doc.updated = Date.now();
	    return true;
          }
	}
      }
      var updateValidator = function(){}/*
	if (typeof fieldNames === "
        if (typeof fieldNames === "undefined"){ 
          if(!(doc.course_id && doc.file && //check for lab fields
             Roles.isInstructorFor(doc.course_id,userid))){//check for instructor authorization
               throw new Meteor.Error("OH NO!");	
	     }
        	else{
		  return true;
      	    }
      	  }

        
      	else if(fieldNames.includes('tasks') && !fieldNames.includes('file')){
                return false;
      	}
      	else if(fieldNames.includes('file')){
      	  if(!((Roles.isInstructorFor(doc.course_id, userid)) && //check for instructor authorization
      		  validateLab(modifier.$set.file))){  //check for labfile errors
      	    return false;
      	  }
      	  else{
      	    if(modifier) {modifier.$set.updated = Date.now(); }
      	    doc.updated = Date.now();
      	  }
      	}*/
     
      labs.before.update(LabValidator);
      labs.before.insert(LabValidator);
    });
  }
/* INJECT LAB INTO COURSE */
  if(Meteor.isServer){
    Meteor.startup(function(){
      labs.after.insert(function(userid, doc){
        Collections.courses.update({_id:doc.course_id},{ $push : { 'labs' : doc._id}}, function(err, num){
          if(err){
            TuxLog.log('warn', err);
          }
        });
      });

      Meteor.publish('user-labs',function(){
        this.autorun(function(computation){
          let roles = (<any>(Meteor.users.findOne(this.userId))).roles;
          let courses = roles.student.map((a) =>{return a[0]});
          return (courses.map(function(courseId){return {course: courseId, labs: ((Collections.courses.findOne(courseId)).labs)}}));
	      });
      });
    });
  }

/**
  DATA PUBLICATION
**/
if(Meteor.isServer) {
  Meteor.startup(function() {

    // Publish labs collection
    Meteor.publish('labs', function() {
      this.autorun(function(computation) {

        // Check if userId exists
        if(typeof this.userId !== "undefined") {

          // Check if userId is indeed in the database
          let user = Meteor.users.findOne(this.userId);
          if(typeof user !== "undefined") {

            // Define roles of current user
            let roles = (<any>(user)).roles;
            if(typeof roles !== "undefined") {

              // Get student enrolled courseIds
              let studentCourses = (_.unzip(roles.student))[0];

              // Concatenate student enrolled courseIds with Instructor taught courseIds
              let course_ids = studentCourses.concat(roles.instructor);

              // Search Query
              return labs.find({
                course_id: {
                  $in: course_ids
                }
              });
            }
          }
        }
      });
    });
  });
}
