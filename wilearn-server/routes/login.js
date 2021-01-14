//引入快速构建框架
const express = require('express');
//引入路由
const router = express.Router();
//登录页
router.get('/',function (req,res,next) {
    res.render('login');
});
//导出路由接口
module.exports=router;