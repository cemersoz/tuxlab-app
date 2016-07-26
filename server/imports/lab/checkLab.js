"use strict";
var lab = require('./lab.js');
var orig = new lab();

/// <reference path="./checkLab.d.ts" />
module.exports = function(str){

  if(!str) {
    TuxLog.log("warn", "labfile is null");
    return false; 
  } //check for file import
  else{
    try{
      var tux = eval(str);
      if(typeof tux == undefined || typeof tux == null){ //check for lab object
        throw new Error("tux is undefined/null");
      }
      
      else if(typeof tux.setup != 'function'){
        throw new Error("setup is not a function");
      }

      else if(typeof tux.tasks != 'function'){
        throw new Error("tasks is not a function");
      }
      
      else if(tux.init.toString() != orig.init.toString()){
        throw new Error("lab file changes init function");
      }

      else if(tux.newTask.toString() != orig.newTask.toString()){
        throw new Error("lab file changes newTask function");
      }

      else{
        return true;
      }
    }

    catch(e){
      TuxLog.log("warn",e);
      return false;
    }
  }
}
