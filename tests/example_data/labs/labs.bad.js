/**
  Example Bad Labs
**/

// Import Labfiles
var fs = require('fs');
var labfile = [];
 //   var f = fs.readFileSync('./example_data/labs/lab.good.1.js', "utf8").toString();
// Export Labs
//
//changes lab.init
labfile[0] = 'var tuxlab = new lab();\ntuxlab.init = function(){}\ntuxlab.setup = function(){return env.init();\n}\ntuxlab.tasks = function(){\n  var s1 = function(env){\n    return env.start();\n  }\n  var v1 = function(env){\n    return env.start();\n  }\n  var s2 = function(env){\n    return env.start();\n  }\n  var v2 = function(env){\n    return env.start();\n  }\n  var s3 = function(env){\n    return env.start();\n  }\n  var v3 = function(env){\n    return env.start();\n  }\n  var s4 = function(env){\n    return env.start();\n  }\n  var v4 = function(env){\n    return env.start();\n  }\n  /* @task1 this is task 1 \n   tomato{}  \n   hi();\n    @onevar1\n   I\'m a cheesepuff\n   @othervar1\n  */\n  var task1 = tuxlab.newTask(\'TASK1\',\'MD1\',s1,v1)\n  /*\n@task2\nthis is task 2 \n   potato{}  \n   bye();\n    @onevar2\n   I\'m a cheesepuff\n   @anothervar2\n  */\n  var task2 = tuxlab.newTask(\'TASK2\',\'MD2\',s2,v2)\n  /*@task3 this is task 3\n   onion{}  \n   later();\n    @onevar3\n   I\'m a cheesepuff\n   @othervar3\n  */\n  var task3 = tuxlab.newTask(\'TASK3\',\'MD3\',s3,v3)\n  /*\n   @task4 this is task 4\n   turnip{}  \n   ello();\n    @onevar4\n   I\'m a cheesepuff\n   @othervar4\n  */\n  var task4 = tuxlab.newTask(\'TASK4\',\'MD4\',s4,v4)\n  return tuxlab.init()\n           .nextTask(task1)\n           .nextTask(task2)\n           .nextTask(task3)\n           .nextTask(task4);\n}\n//export modified tuxlab\nmodule.exports = tuxlab;\n';

//doesn't have lab.setup
labfile[1] = 'var tuxlab = new lab();\ntuxlab.tasks = function(){\n  var s1 = function(env){\n    return env.start();\n  }\n  var v1 = function(env){\n    return env.start();\n  }\n  var s2 = function(env){\n    return env.start();\n  }\n  var v2 = function(env){\n    return env.start();\n  }\n  var s3 = function(env){\n    return env.start();\n  }\n  var v3 = function(env){\n    return env.start();\n  }\n  var s4 = function(env){\n    return env.start();\n  }\n  var v4 = function(env){\n    return env.start();\n  }\n  /* @task1 this is task 1 \n   tomato{}  \n   hi();\n    @onevar1\n   I\'m a cheesepuff\n   @othervar1\n  */\n  var task1 = tuxlab.newTask(\'TASK1\',\'MD1\',s1,v1)\n  /*\n@task2\nthis is task 2 \n   potato{}  \n   bye();\n    @onevar2\n   I\'m a cheesepuff\n   @anothervar2\n  */\n  var task2 = tuxlab.newTask(\'TASK2\',\'MD2\',s2,v2)\n  /*@task3 this is task 3\n   onion{}  \n   later();\n    @onevar3\n   I\'m a cheesepuff\n   @othervar3\n  */\n  var task3 = tuxlab.newTask(\'TASK3\',\'MD3\',s3,v3)\n  /*\n   @task4 this is task 4\n   turnip{}  \n   ello();\n    @onevar4\n   I\'m a cheesepuff\n   @othervar4\n  */\n  var task4 = tuxlab.newTask(\'TASK4\',\'MD4\',s4,v4)\n  return tuxlab.init()\n           .nextTask(task1)\n           .nextTask(task2)\n           .nextTask(task3)\n           .nextTask(task4);\n}\n//export modified tuxlab\nmodule.exports = tuxlab;\n';

//doesn't compile
labfile[2] = 'var tuxlab = new lab();\ntuxlab.setup = function(){return env.init();\n}\ntuxlab.tasks = ction(){\n  var s1 = function(env){\n    return env.start();\n  }\n  var v1 = function(env){\n    return env.start();\n  }\n  var s2 = function(env){\n    return env.start();\n  }\n  var v2 = function(env){\n    return env.start();\n  }\n  var s3 = function(env){\n    return env.start();\n  }\n  var v3 = function(env){\n    return env.start();\n  }\n  var s4 = function(env){\n    return env.start();\n  }\n  var v4 = function(env){\n    return env.start();\n  }\n  /* @task1 this is task 1 \n   tomato{}  \n   hi();\n    @onevar1\n   I\'m a cheesepuff\n   @othervar1\n  */\n  var task1 = tuxlab.newTask(\'TASK1\',\'MD1\',s1,v1)\n  /*\n@task2\nthis is task 2 \n   potato{}  \n   bye();\n    @onevar2\n   I\'m a cheesepuff\n   @anothervar2\n  */\n  var task2 = tuxlab.newTask(\'TASK2\',\'MD2\',s2,v2)\n  /*@task3 this is task 3\n   onion{}  \n   later();\n    @onevar3\n   I\'m a cheesepuff\n   @othervar3\n  */\n  var task3 = tuxlab.newTask(\'TASK3\',\'MD3\',s3,v3)\n  /*\n   @task4 this is task 4\n   turnip{}  \n   ello();\n    @onevar4\n   I\'m a cheesepuff\n   @othervar4\n  */\n  var task4 = tuxlab.newTask(\'TASK4\',\'MD4\',s4,v4)\n  return tuxlab.init()\n           .nextTask(task1)\n           .nextTask(task2)\n           .nextTask(task3)\n           .nextTask(task4);\n}\n//export modified tuxlab\nmodule.exports = tuxlab;\n';
module.exports = [
  {
    _id: "4",
    course_id : "1",
    lab_name: "Getting Started with Git",
    updated: 1467995862937,
    hidden: false,
    disabled: false,
    file: labfile[0],
    tasks: [
      {
        _id: "1",
	name: "Git Clone",
        updated: 1467995862937,
        md: "##################"
      },
      {
        _id: "2",
	name: "Git Pull",
        updated: 1467995862937,
        md: "##################"
      }
    ]
  },
  {
    _id: "5",
    course_id: "1",
    lab_name: "More with Git",
    updated: 4,
    hidden: false,
    disabled: false,
    file: labfile[1],
    tasks: [
      {
        _id: "1",
	name: "Git add",
	updated:4,
	md: "#############"
      },
      {
        _id: "2",
	name: "Git commit",
	updated:4,
	md: "##########"
      },
      {
        _id: "3",
	name: "Git push",
	updated: 4,
	md: "#########"
      }
    ]
  },
  {
    _id: "6",
    course_id: "2",
    lab_name: "Introduction to Python",
    updated: 5,
    hidden: false,
    disabled: true,
    file: labfile[2],
    tasks: [
      {
        _id: "1",
	name: "Functions",
	updated: 5,
	md: "##########"
      },
      {
        _id: "2",
	name: "Values",
	updated:4,
	md: "#"
      }
    ]
  }
]
