namespace lab_exec {
  interface labExec{
    var env : any;
    var tuxlab : any;
    
    function fakeInit(user : string, labId : string, callback : (error : any, result : any) => any) : void
    function init(user : string, labId : string, callback : any) : void
    function parseTasks() : any
    function start(callback : any) : any
    function next(callback : any) : any
    function end(callback : any) : any

  }
  function labExec() : any
}
