/**
  Tests Meteor DB Schema
**/

// Dependencies
var async = require('async');
var potato = 4;
var labs = require('./example_data/labs/labs.js');
var courses = require('./example_data/courses/courses.js');
/**
  Insert Example Data for Testing
**/
describe('Database Schema', function(){
  var server = meteor();

  // Clean Database
  it('should potato',function(){
    expect(potato==4).to.be.true
  });
  it('should be clean', function(){
    return server.execute(function(){

      // Delete All Collections
      for(var index in Collections){
        Collections[index].remove({});
      }

    });
  });

  // Create Example Course
  it('should include courses', function(){
    expect(typeof async.map == 'function').to.be.true
    return server.execute(function(courses){
      // Create Courses
      expect(typeof _.map == 'function').to.be.true;
       async.map(courses, function(course, callback){
        Collections.courses.insert(course, callback);
      }, function(err, results){
        expect(err).to.be.null;
      });

    },[courses]);
  });

  // Create Example Labs
  it('should include labs', function(){
    return server.execute(function(labs){

      Collections.courses.insert(labs[0],function(err,result){expect(err).to.be.null});
      // Create Labs
 /*     async.map(labs, function(lab, callback){
        Collections.courses.insert(lab, callback);
      }, function(err, results){
        expect(err).to.be.null;
      });*/

    },[labs]);
  });

  
});
