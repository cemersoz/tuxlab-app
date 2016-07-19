import { Component } from '@angular/core'
import { Meteor } from 'meteor/meteor';

/***
  SCHEMA
***/
declare var SimpleSchema: any;
declare var nconf: any;

if (Meteor.isServer){
  Meteor.startup(function(){
    var profileSchema = new SimpleSchema({
      first_name: {
        type: String
      },
      last_name: {
        type: String
      },
      nickname: {
        type: String,
        unique: true
      },
      school: {
        type: String,
        defaultValue: nconf.get('domain_school')
      },
      email: {
        type: String
      },
      picture: {
        type: String
      }
    });
    var roleSchema = new SimpleSchema({
      administrator: {
        type: [String],
        defaultValue: []
      },
      instructor: {
        type: [String],
        defaultValue: []
      },
      student: {
        type: [{
          type: [String],
          maxCount: 2,
          minCount: 2
        }],
        defaultValue: []
      }
    });
    var userSchema = new SimpleSchema({
      services: {
        type: Object,
        optional: true,
        blackbox: true
      },
      profile: {
        type: profileSchema
      },
      roles: {
        type: roleSchema
      }
    });
    (<any> Meteor.users).attachSchema(userSchema);
  });
}

/***
  INTERFACE
**/

  /***
    USER ROLES
  ***/
  export class Roles {

    /*
      Determines if user is logged in
    */
    static isLoggedIn(){
      let user : any = Meteor.user();

      return (typeof user !== 'undefined' && <any> user.roles !== 'undefined');
    }

    /*
      Determines if the user is a student in a particular course
    */
    static isStudentFor(courseid : string, userid? : number){
      let user : any = (typeof userid !== "undefined") ? Meteor.users.findOne(userid) : Meteor.user();

      if(this.isLoggedIn() && typeof user.roles.student === "array"){
        for (var i = 0; i < user.roles.student.length; i++){
          if (user.roles.student[i][0] === courseid) {
            return true;
          }
        }
        return false;
      }
      else{
        return false;
      }
    }

    /*
      Determines if the user is an instructor for a particular course
    */
    static isInstructorFor(courseid : string, userid? : number){
      let user : any = (typeof userid !== "undefined") ? Meteor.users.findOne(userid) : Meteor.user();
      return (this.isLoggedIn() && typeof user.roles.instructor === "array" && user.roles.instructor.contains(courseid));
    }

    /*
      Determines if the user is an administrator for a course
    */
    static isAdministratorFor(courseid : string, userid? : number){
      let user : any = (typeof userid !== "undefined") ? Meteor.users.findOne(userid) : Meteor.user();
      return (this.isLoggedIn() && typeof user.roles.administrator === "array" && (user.roles.administrator.contains('global') || user.roles.administrator.contains(courseid)));
    }

    /*
      Determines if the user is a global administrator
    */
    static isGlobalAdministrator(userid? : number){
      let user : any = (typeof userid !== "undefined") ? Meteor.users.findOne(userid) : Meteor.user();
      return (this.isLoggedIn() && typeof user.roles.administrator === "array" && user.roles.administrator.contains('global'));
    }
  };
