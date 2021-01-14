const express = require('express');
const router = express.Router();
const StudentModel = require('../models/demo');
//报名页
router.get('/',function (req,res,next) {
    res.render('students');
});
router.get('/lists',function (req,res,next) {
    let pageName =parseInt(req.query.pageName) ;
    let currPage = parseInt(req.query.currPage);

    StudentModel.getAllStudent()
        .then(function (students) {
            let start=0;
            let end=0;
            start = (currPage-1)*pageName;
            end = start+pageName;
            let tmp = students.slice(start,end);
            let articleData ={
                code:0,
                msg:"",
                count:students.length,
                data:tmp
            };
            res.json(articleData);
        })
        .catch(next);

});
module.exports=router;