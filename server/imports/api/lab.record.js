var record = function(){}


//record variables for manipulating correct courseRecords object
record.prototype.user = null;
record.prototype.course = null;
record.prototype.lab = null;

/**record.setGrade, sets the grade for a specific lab,user pair
 * @param grade: int*int tuple i.e. [2,4] meaning 2/4 points granted
 */ 
record.prototype.setGrade = function(grade){
  
}
record.prototype.incrementGrade = function(){}
record.prototype.saveData = function(){}
module.exports = record;
