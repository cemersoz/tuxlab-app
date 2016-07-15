"use strict";
/// <reference path="./checkLab.d.ts" />
module.exports = function(str){
  if(!str) { return false; } //check for file import
  var tux = eval(str);
  var tuxOrig = require('./tuxlab.js');
  if(((typeof tux != "undefined") && 
      (typeof tux.setup === 'function') &&  //check for instructor field types
      (typeof tux.tasks === 'function') &&
      (typeof tux.tasks() != 'undefined') &&
      (tux.init.toString() === tuxOrig.init.toString()) &&  //check for unchanged
      (tux.newTask.toString() === tuxOrig.newTask.toString()))){
    return null;
  }
  else{
    return tux.titleList;
  }
}
