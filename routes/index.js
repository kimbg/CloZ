const express = require('express');
const router = express.Router();
const loginRouter = require('./login');
const dbModel = require('../model/modelTest.js');

//multer는 사용하는 폴더마다 선언하는걸로..
const multer = require('multer');
const storage_ = multer.diskStorage({
    destination : (req,file,cb) => cb(null,'images'),
    filename    : (req,file,cb) => cb(null,Date.now() + '-' + file.originalname)
})
const upload = multer({storage : storage_})

let user = {
    name : "bk",
    age : 21
}

let data = [
    {title : 'cat1', comment : "cat1 is very good movie"},
    {title : 'cat2', comment : "cat1 is very so so movie"},
    {title : 'cat3', comment : "cat1 is very bad movie"},
]
// -----------------------위는 테스트 데이터

router.use('/login',loginRouter);

router.get('/register',(req,res) => {
    res.render('register');
})

router.get('/success',(req,res) => {
    res.render('mainPage');
})

router.get('/fail',(req,res) => {
    res.render('failPage');
})

// multer는 모듈화가 안되는듯하다..
router.post('/multer',upload.single('singleImage'),(req,res) => {
    console.log(req.file);
    console.log("이미지 받음");
})



router.get('/multer',(req,res) => {
    res.render('multerTest');
})



router.get('/',(req,res) => {

    console.log(dbModel.selectFnc1("select * from user"));
    console.log("------");
    console.log(dbModel.sayHelloFnc("bk"));

    res.render('test',{user : user,cats : data});    
})

module.exports = router;