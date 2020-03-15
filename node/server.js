var express = require('express');//node的一个框架
var bodyParser = require('body-parser');//express的插件，数据整理
var http = require('http');//http对象，node内置对象
var path = require('path');//路径对象，node内置对象
var fs = require('fs');//文件对象; node内置对象
var mysql = require('mysql');//引入mysql
var moment = require('moment');//修改时间格式
var multipart = require('connect-multiparty');//文件上传的插件

var app = express();

//建立静态资源访问
app.use(express.static(path.join(__dirname,'src')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var pool = mysql.createPool({//建立连接池对象
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'yqz'
});

var hostname = 'http://localhost:8089';

function mysqlQuery(sql,callback){
  pool.getConnection((err,connection)=>{
    if(err){
      console.log(`数据库错误：${err}`);
    }
    else{
      connection.query(sql,(err,result)=>{
        connection.release();//释放连接
        if(typeof callback == 'function'){
          callback(result,err);
        }
      });
    }
  });
}

app.post('/post/news/add',(req,res) =>{
  var title = req.body.title;
  var content = req.body.content;
  //console.log(title,content)
  var createDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  mysqlQuery(`insert into yqz_news (title,content,createDate) value ("${title.replace(/\"/g,"\\\"")}","${content.replace(/\"/g,"\\\"")}","${createDate}")`,(result)=>{
    //console.log(result)
    if(result){
      res.json({ code: 0, msg: 'success', data: true });//给前端响应信息
    }
    else{
      res.json({ code: -1, msg: 'failed', data: false });//给前端响应信息
    }
  });
});

app.delete('/delete/news',(req,res) =>{
  var id = req.query.id;
  mysqlQuery(`delete from yqz_news where id=${id}`,(result)=>{
    //console.log(result);
    if(result){
      res.json({ code: 0, msg: 'success', data: true });//给前端响应信息
    }
    else{
      res.json({ code: -1, msg: 'failed', data: false });//给前端响应信息
    }
  })
});

app.put('/put/news',(req,res) =>{
  var id = req.body.id;
  var title = req.body.title;
  var content = req.body.content;
  var createDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  console.log(title,content,createDate)
  mysqlQuery(`update yqz_news set title="${title.replace(/\"/g,"\\\"")}",content="${content.replace(/\"/g,"\\\"")}",createDate="${createDate}" where id=${id}`,(result,err)=>{
    console.log(result,err);
    if(result){
      res.json({ code: 0, msg: 'success', data: true });//给前端响应信息
    }
    else{
      res.json({ code: -1, msg: 'failed', data: false });//给前端响应信息
    }
  })
});

//上传接口
var multipartMiddleware = multipart();
app.put('/put/news/img',multipartMiddleware,(req,res) =>{
  var id = req.body.id;
  var frontPath = req.files.file.path; //前端文件的地址
  var newPath = path.resolve(__dirname,'./src/upload',req.files.file.originalFilename);
  fs.readFile(frontPath, function (err, data) {
      if (err){
        res.json({ code: -1, msg: 'failed', data: false });
        return;
      };
      //console.log('File read!');

      // Write the file-写入后台的地址
      fs.writeFile(newPath, data, function (err) {//data是buffer缓冲区二进制数据
          if (err){
            res.json({ code: -1, msg: 'failed', data: false });
          }
          else{
            mysqlQuery(`update yqz_news set imgUrl="${'/upload/'+req.files.file.originalFilename}" where id=${id}`,(result,err)=>{
              console.log(result,err);
              if(result){
                res.json({ code: 0, msg: 'success', data: true });//给前端响应信息
              }
              else{
                res.json({ code: -1, msg: 'failed', data: false });//给前端响应信息
              }
            });
          }
      });

      // Delete the file临时文件地址
      fs.unlink(frontPath, function (err) {
          if (err) throw err;
          //console.log('File deleted!');
      });
  });
  
});


app.get('/get/contact',function(require,response){
  //console.log(typeof require.query,require.query);
  response.json({
    code: 0,//错误码
    msg: 'success',//错误消息
    data: {//响应数据
      address: '杭州下载区杭州下载区杭州下载区xxxx3-2-901',
      officeTel: '0571-8890Xxxxx',
      contactTel: '1360000000000',
      postcode: '310000',
      email: 'xxxxxxks@163.com',
    },
  });
});

app.get('/get/news',function(require,response){
  //console.log(typeof require.query,require.query);
  var page = require.query.page;
  //select * from 表名 limit 跳过的数据,取几条
  mysqlQuery(`select * from yqz_news limit ${(page-1)*10}, 10`,(result)=>{
    if(result){
      var data = result.map(item => { 
        return {
          id: item.id,
          title: item.title,
          createDate: item.createDate.getTime(),
          imgUrl: item.imgUrl == null ? null : hostname+item.imgUrl
        }
      });

      mysqlQuery(`select id from yqz_news`,(idArr)=>{
        if(idArr){
          var total = idArr.length
          response.json({
            code: 0,//错误码
            msg: 'success',//错误消息
            total,//数据总量
            page,//当前页是1,
            pageNum: 10,//每页是10个
            data,
          });
        }
        else{
          res.json({ code: -1, msg: 'failed', data: [] });//给前端响应信息
        }
      });
    }
    else{
      res.json({ code: -1, msg: 'failed', data: [] });//给前端响应信息
    }
  });
});


app.get('/get/news/detail',function(require,response){
  //console.log(typeof require.query,require.query);
  var id = require.query.id;
  mysqlQuery(`select * from yqz_news where id=${id}`,(result)=>{
    if(result){
      var data = result.map(item => { 
        return {
          id: item.id,
          title: item.title,
          createDate: item.createDate.getTime(),
          content: item.content,
          imgUrl: item.imgUrl == null ? null : hostname+item.imgUrl
        }
      })[0];
      response.json({
        code: 0,//错误码
        msg: 'success',//错误消息
        data,
      });
    }
    else{
      res.json({ code: -1, msg: 'failed', data: null });//给前端响应信息
    }
  });
});

app.get('/get/index/introduce',function(require,response){
  //console.log(typeof require.query,require.query);
  response.json({
    code: 0,//错误码
    msg: 'success',//错误消息
    data: {
      imgUrl: 'http://localhost:8089/upload/intr.jpg',
      description: '大余县xxxxxx公司城里于2002年9月，大余县xxxxxx公司城里于2002年9月，大余县xxxxxx公司城里于2002年9月，大余县xxxxxx公司城里于2002年9月，大余县xxxxxx公司城里于2002年9月，大余县xxxxxx公司城里于2002年9月，大余县xxxxxx公司城里于2002年9月，大余县xxxxxx公司城里于2002年9月，大余县xxxxxx公司城里于2002年9月大余县xxxxxx公司城里于2002年9月，大余县xxxxxx公司城里于2002年9月，大余县xxxxxx公司城里于2002年9月'
    },
  });
});

app.get('/get/index/products',function(require,response){
  //console.log(typeof require.query,require.query);
  response.json({
    code: 0,//错误码
    msg: 'success',//错误消息
    data: [
      { id: 1, title: '产品电器F0000001', createDate: 1583547371000, imgUrl: 'http://localhost:8089/upload/1.jpg'},
      { id: 2, title: '产品电器F0000002', createDate: 1583547371000, imgUrl: 'http://localhost:8089/upload/1.jpg'},
      { id: 3, title: '产品电器F0000002', createDate: 1583547371000, imgUrl: 'http://localhost:8089/upload/1.jpg'},
      { id: 4, title: '产品电器F0000002', createDate: 1583547371000, imgUrl: 'http://localhost:8089/upload/1.jpg'},
      { id: 5, title: '产品电器F0000002', createDate: 1583547371000, imgUrl: 'http://localhost:8089/upload/1.jpg'},
    ],
  });
});

app.get('/get/index/img/news',function(require,response){
  //console.log(typeof require.query,require.query);
  response.json({
    code: 0,//错误码
    msg: 'success',//错误消息
    data: [
      { id: 1, createDate: 1583547371000, imgUrl: 'http://localhost:8089/upload/1.jpg', title: 'news1'},
      { id: 2, createDate: 1583547371000, imgUrl: 'http://localhost:8089/upload/intr.jpg', title: 'news2'},
      { id: 3, createDate: 1583547371000, imgUrl: 'http://localhost:8089/upload/map.jpg', title: 'news3'},
    ],
  });
});

app.get('/get/index/news',function(require,response){
  //console.log(typeof require.query,require.query);
  response.json({
    code: 0,//错误码
    msg: 'success',//错误消息
    data: [
      { id: 1, createDate: 1583547371000, title: '的说法撒旦发射撒旦撒旦飒沓1'},
      { id: 2, createDate: 1583547371000, title: '的说法撒旦发射撒旦撒旦飒沓2'},
      { id: 3, createDate: 1583547371000, title: '的说法撒旦发射撒旦撒旦飒沓3'},
      { id: 4, createDate: 1583547371000, title: '的说法撒旦发射撒旦撒旦飒沓4'},
      { id: 5, createDate: 1583547371000, title: '的说法撒旦发射撒旦撒旦飒沓5'},
      { id: 6, createDate: 1583547371000, title: '的说法撒旦发射撒旦撒旦飒沓6'},
    ],
  });
});



http.createServer(app).listen(8089,function(){
  console.log('8089启动成功');
});
