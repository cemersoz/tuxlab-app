/**
  Example Labs
**/

// Import Labfiles
var fs = require('fs');
var labfile = [];
 //   var f = fs.readFileSync('./example_data/labs/lab.good.1.js', "utf8").toString();
labfile[0] = 'var tuxlab = new lab();\n\ntuxlab.setup = function(env){\n return env.init();\n}\ntuxlab.tasks = function(){\n  var s1 = function(env){\n    return env.start();\n  }\n  var v1 = function(env){\n    return env.start();\n  }\n  var s2 = function(env){\n    return env.start();\n  }\n  var v2 = function(env){\n    return env.start();\n  }\n  var s3 = function(env){\n    return env.start();\n  }\n  var v3 = function(env){\n    return env.start();\n  }\n  var s4 = function(env){\n    return env.start();\n  }\n  var v4 = function(env){\n    return env.start();\n  }\n  /* @task1 this is task 1 \n   tomato{}  \n   hi();\n    @onevar1\n   I\'m a cheesepuff\n   @othervar1\n  */\n  var task1 = tuxlab.newTask(\'TASK1\',\'MD1\',s1,v1)\n  /*\n@task2\nthis is task 2 \n   potato{}  \n   bye();\n    @onevar2\n   I\'m a cheesepuff\n   @anothervar2\n  */\n  var task2 = tuxlab.newTask(\'TASK2\',\'MD2\',s2,v2)\n  /*@task3 this is task 3\n   onion{}  \n   later();\n    @onevar3\n   I\'m a cheesepuff\n   @othervar3\n  */\n  var task3 = tuxlab.newTask(\'TASK3\',\'MD3\',s3,v3)\n  /*\n   @task4 this is task 4\n   turnip{}  \n   ello();\n    @onevar4\n   I\'m a cheesepuff\n   @othervar4\n  */\n  var task4 = tuxlab.newTask(\'TASK4\',\'MD4\',s4,v4)\n  return tuxlab.init()\n           .nextTask(task1)\n           .nextTask(task2)\n           .nextTask(task3)\n           .nextTask(task4);\n}\n//export modified tuxlab\nmodule.exports = tuxlab;\n';
// Export Labs
module.exports = [
  {
    _id: "1",
    course_id : "1",
    lab_name: "Getting Started with Git",
    file: "##########",
    tasks: [
      {
        _id: "1",
        updated: 1467995862937,
        name: "Git Clone",
        md: "##################"
      },
      {
        _id: "2",
        updated: 1467995862937,
        name: "Git Pull",
        md: "##################"
      }
    ]
  }
]
