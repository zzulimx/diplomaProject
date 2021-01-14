//主路由
module.exports= function (app) {
    app.get('/',function (req,res) {
         res.redirect('/app');
    });
    //分级路由
    app.use('/login',require('./login'));
};