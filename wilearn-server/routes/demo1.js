const express = require('express');
const router = express.Router();
const StudentModel = require('../models/demo');

//报名页
router.get('/',function (req,res,next) {
  res.render('app');
});
//提交注册
router.post('/signup',function (req,res,next) {
 
     let name =req.fields.name;
     let  studentId = req.fields.studentId;
     let shift=req.fields.shift;
     let chosen = req.fields.chosen;
     let phone =req.fields.phone;
     let qqNum = req.fields.qqNum;
     //创建学生实例
     let student={
         name:name
         ,studentId:studentId
         ,shift:shift
         ,chosen:chosen
         ,phone:phone
         ,qqNum:qqNum
     };
    //添加进数据库
    StudentModel.addStudent(student)
        .then(function (result) {
            student = result.ops[0];
            return res.json(200);
        })
        .catch(function (e) {
            console.log(e);
            return res.json(404)
        })
});
module.exports=router;