var express = require('express');//node的一个框架
var bodyParser = require('body-parser');//express的插件，数据整理
var http = require('http');//http对象，node内置对象
var path = require('path');//路径对象，node内置对象

var app = express();

//建立静态资源访问
app.use(express.static(path.join(__dirname,'src')));

app.use(bodyParser());//使用此插件

app.get('/get/contact',function(require,response){
  //console.log(typeof require.query,require.query);
  response.json({
    address: '杭州下载区杭州下载区杭州下载区xxxx3-2-901',
    officeTel: '0571-8890Xxxxx',
    contactTel: '1360000000000',
    postcode: '310000',
    email: 'xxxxxxks@163.com',
  });
});

http.createServer(app).listen(8088,function(){
  console.log('8088启动成功');
});
