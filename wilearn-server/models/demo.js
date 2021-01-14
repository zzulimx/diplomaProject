const Demo = require('../lib/mongo').Student;


module.exports = {

    //创建新的报名人员
    addStudent: function addStudent(student) {
        return Demo.create(student).exec();
    },
//    查找某个报名人员信息
    getStudentBystudentId: function getStudent(studentId) {
        return Demo
            .findOne({studentId:studentId})
            .exec()
    },
//    查找所有报名人员信息
    getAllStudent: function getAllStudent() {
        return Demo
            .find()
            .sort({_id:-1})
            .exec()
    }
};