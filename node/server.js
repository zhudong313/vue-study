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
  if(page == 1){
    response.json({
      code: 0,//错误码
      msg: 'success',//错误消息
      total: 59,//数据总量
      page: 1,//当前页是1,
      pageNum: 10,//每页是10个
      data: [
        { id: 1, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0001', createDate: 1583547371000 },
        { id: 2, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0002', createDate: 1583547371000 },
        { id: 3, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0003', createDate: 1583547371000 },
        { id: 4, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0004', createDate: 1583547371000 },
        { id: 5, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0005', createDate: 1583547371000 },
        { id: 6, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0006', createDate: 1583547371000 },
        { id: 7, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0007', createDate: 1583547371000 },
        { id: 8, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0008', createDate: 1583547371000 },
        { id: 9, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0009', createDate: 1583547371000 },
        { id: 10, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0010', createDate: 1583547371000 },
      ],
    });
  }else if(page == 2){
    response.json({
      code: 0,//错误码
      msg: 'success',//错误消息
      total: 59,//数据总量
      page: 2,//当前页是1,
      pageNum: 10,//每页是10个
      data: [
        { id: 11, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0011', createDate: 1583547371000 },
        { id: 12, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0012', createDate: 1583547371000 },
        { id: 13, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0013', createDate: 1583547371000 },
        { id: 14, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0014', createDate: 1583547371000 },
        { id: 15, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0015', createDate: 1583547371000 },
        { id: 16, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0016', createDate: 1583547371000 },
        { id: 17, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0017', createDate: 1583547371000 },
        { id: 18, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0018', createDate: 1583547371000 },
        { id: 19, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0019', createDate: 1583547371000 },
        { id: 20, title: '江西大于xxxxx深加工产业基地江西大于xxxxx深加工产业基地江西大于0020', createDate: 1583547371000 },
      ],
    });
  }
});


app.get('/get/news/detail',function(require,response){
  //console.log(typeof require.query,require.query);
  if(require.query.id == 1){
    response.json({
      code: 0,//错误码
      msg: 'success',//错误消息
      data: {//响应数据
        title: '公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介',
        createDate: 1583547371000,
        content: `<p>江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介。</p>
              <p>江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介。</p>
              <p>江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介。</p>
              <p>江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介。</p>
              <p>江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介，江西大余县公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介。</p>`
      },
    });
  }
  else{
    response.json({
      code: 0,//错误码
      msg: 'success',//错误消息
      data: {//响应数据
        title: '其他其他其他其他其他其他其他其他',
        createDate: 1583547371000,
        content: `<p>其他其他其他其他其他其他其他其他其他其他其他其他</p>
              <p>其他其他其他其他其他其他其他</p>
              <p>其他其他其他其他其他</p>
              <p>其他其他其他其他其他其他其他</p>
              <p>其他其他其他</p>`
      },
    });
  }
});

http.createServer(app).listen(8088,function(){
  console.log('8088启动成功');
});
