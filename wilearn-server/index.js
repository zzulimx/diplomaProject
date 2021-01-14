const path = require('path');
const express = require('express');
const cors = require('cors');  //跨域模块
const config = require('config-lite')(__dirname);
const routes = require('./routes');
const pkg = require('./package');

//使用express快速构建框架
var app = express();
//解决跨域
app.use(cors());



/*
    *前后端分离
 */
//设置模板引擎
//注册html模板引擎
app.engine('html', require('ejs').__express);
//将模板引擎改为html
//注意是view不是views
app.set('view engine', 'html');
//设置模板根目录
app.set('views',path.join(__dirname,'webapps'));
//设置静态文件目录
app.use(express.static(path.join(__dirname,'webapps/static')));
//处理表单及文件上传的中间件
app.use(require('express-formidable')({
    uploadDir:path.join(__dirname,'webapps/static/img'), //上传文件目录
    keepExtensions:true// 保留文件后缀
}));

//路由
routes(app);

//监听端口，启动程序
app.listen(config.port,function () {
    console.log(`${pkg.name} listening on port ${config.port}`  );
});
