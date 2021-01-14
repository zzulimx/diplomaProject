const config = require('config-lite');
const Mongolass = require('mongolass');
const mongolass = new Mongolass();
mongolass.connect(config.mongodb);


//
// //创建学生集合
//
// exports.Student= mongolass.model('Student',{
//     name:{type:'string'},  //姓名
//     studentId:{type:'string'},  //学号
//     shift:{type:'string'},   //班级
//     chosen:{type:'string'},  //意向选择
//     phone:{type:'string'},  //手机号
//     qqNum:{type:'string'}, //qq号
//     createdAt: { type: Mongolass.Types.Date, default: Date.now } //时间
// });
//
// exports.Student.index({studentId: 1}).exec();