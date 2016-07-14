declare module 'labExec' {
  export function labExec() : any
  export function init(user: number, courseId: string, labId: number) : any
  export function parseTasks() : any
  export function start(callback : any) : any
  export function next(callback : any) : any
  export function end(callback : any) : any
}
