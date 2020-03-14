export function parseDate(time){
  var curDate = new Date();
  curDate.setTime(time);
  var year = curDate.getFullYear();
  var month = curDate.getMonth() + 1;
  var date = curDate.getDate();
  var hours = curDate.getHours();
  var minutes = curDate.getMinutes();
  var seconds = curDate.getSeconds();
  return year+'-'+month+'-'+date + ' '+hours+':'+minutes+':'+seconds;
};