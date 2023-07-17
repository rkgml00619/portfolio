const express = require('express')
const app = express()
const port = 8080

const MongoClient = require('mongodb').MongoClient;


// 파일업로드 기능인 multer를 사용하기 위한 명령어들 불러들임
const multer  = require('multer')

app.set("view engine","ejs")
app.use(express.static('public'))

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

/* passport  passport-local  express-session 설치후 불러오기 > 로그인 검정 및 세션 생성에 필요한 기능 사용*/
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret :'secret', resave : false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session()); 


let db; //데이터베이스 연결을 위한 변수세팅(변수의 이름은 자유롭게 지어도 됨)

MongoClient.connect("mongodb+srv://rkgml00619:!!rkals1010@cluster0.dujoq6u.mongodb.net/?retryWrites=true&w=majority",function(err,result){
    //에러가 발생했을경우 메세지 출력(선택사항)
    if(err) { return console.log(err); }

    //위에서 만든 db변수에 최종연결 ()안에는 mongodb atlas 사이트에서 생성한 데이터베이스 이름
    db = result.db("portfolio1");

    //db연결이 제대로 됬다면 서버실행
    app.listen(port,function(){
        console.log("서버연결 성공");
    });
});

/* 로그인했을 때 검증하는 코드 */
passport.use(new LocalStrategy({
  usernameField:"memberId",
  passwordField:"memberPass",
  session:true,
  },      //해당 name값은 아래 매개변수에 저장
  function(memberId, memberPass, done) {
                  //회원정보 콜렉션에 저장된 아이디랑 입력한 아이디랑 같은지 체크                                 
    db.collection("users").findOne({ memberId:memberId }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      //비밀번호 체크 여기서 user는 db에 저장된 아이디의 비번값 (위의 function(err, "user")에서 받아온 값)
      if (memberPass == user.memberPass) {
          return done(null, user)
        } else {
          return done(null, false)
        }
    });
  }
));

//처음 로그인 했을 시 세션 생성 memberId는 데이터에 베이스에 로그인된 아이디
// 세션을 만들어주는 함수 : serializeUser
passport.serializeUser(function (user, done) {
  done(null, user.memberId)
});

//다른 페이지(서브페이지,게시판 페이지 등 로그인 상태를 계속 표기하기 위한 작업)
//로그인이 되어있는 상태인지 체크
// 세션의 user.memberId값을 가져오는 것
passport.deserializeUser(function (memberId, done) {
  //db의 값과 // 로그인했을 때 아이디 가 일치하면 로그인 유지
  db.collection('users').findOne({memberId:memberId }, function (err,result) {
      done(null, result);
  })
});

//파일 첨부 후 서버에 전달 할 때 multer library 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload') //업로드 폴더 지정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'))
    //영어가 아닌 다른 파일명 안깨지고 나오게 처리
  }
})

//upload는 위의 설정사항을 담은 변수(상수) 
const upload = multer({ storage: storage })


/********************************************
 경로설정
*****************************************/

// 메인페이지
app.get("/", (req, res)=>{
    db.collection("festival").find().sort({festivalCount: -1}).toArray((err, festivalResult)=> {
        db.collection("press").find().sort({pressCount: -1}).toArray((err, pressResult)=> {
            res.render("index.ejs", {login: req.user, festivalResult: festivalResult, pressResult: pressResult});
        })
    })
});


// 기관소개
app.get("/ceoGreet", (req, res)=>{
    res.render("introduction/ceoGreet.ejs", {login: req.user});
});
app.get("/innovationVision", (req, res)=>{
    res.render("introduction/innovationVision.ejs", {login: req.user});
});
app.get("/ethicNormOutline", (req, res)=>{
    res.render("introduction/ethicNormOutline.ejs", {login: req.user});
});
app.get("/directions", (req, res)=>{
    res.render("introduction/directions.ejs", {login: req.user});
});


// 주요사업
app.get("/business01", (req, res)=>{
    res.render("business/business01.ejs", {login: req.user});
});
app.get("/business02", (req, res)=>{
    res.render("business/business02.ejs", {login: req.user});
});
app.get("/business03", (req, res)=>{
    res.render("business/business03.ejs", {login: req.user});
});
app.get("/business04", (req, res)=>{
    res.render("business/business04.ejs", {login: req.user});
});


// festival 
app.get("/festival", (req, res)=>{
    db.collection("festival").find().toArray((err, total)=>{
        let totalData = total.length;
        let pageNumber = (req.query.page == null) ? 1 : Number(req.query.page);
        let perpage = 9;
        let blockCount = 5;
        let blockNum = Math.ceil(pageNumber / blockCount);
        let blockStart = ((blockNum - 1) * blockCount) + 1;
        let blockEnd = blockStart + blockCount - 1;
        let totalPaging = Math.ceil(totalData / perpage);

        if(blockEnd > totalPaging){
            blockEnd = totalPaging;
        }

        let totalBlock = Math.ceil(totalPaging / blockCount);
        let startFrom = (pageNumber - 1) * perpage;

        db.collection("festival").find().sort({festivalCount: -1}).skip(startFrom).limit(perpage).toArray((err, result)=>{
            res.render("festival/festival.ejs", {
                login: req.user, 
                data: result,
                totalData : totalData,
                totalPaging : totalPaging,
                blockStart : blockStart,
                blockEnd : blockEnd,
                blockNum : blockNum,
                totalBlock : totalBlock,
                pageNumber : pageNumber,
                inputTxt: ""
            });
        })
    })
});
// festival 상세페이지
app.get("/festival/detail/:festivalCount", (req, res)=>{
    db.collection("festival").findOne({festivalCount: Number(req.params.festivalCount)}, (err, result)=>{
        res.render("festival/festival_detail.ejs", {login: req.user, data: result});
    })
});
// festival 등록
app.get("/festival/register", (req, res)=>{
    res.render("festival/festival_edit.ejs", {login: req.user});
});
// festival 등록 데이터
const festivalImgUpload = upload.fields([{name: "thumbImg"}, {name: "detailImg"}]);
app.post("/festivalData", festivalImgUpload, (req, res)=>{
    let festivalThumbImgs = [];
    let festivalDetailImgs = [];

    for(let i = 0; i < req.files["thumbImg"].length; i++){
        festivalThumbImgs[i] = req.files["thumbImg"][i].filename;
    }
    for(let i = 0; i < req.files["detailImg"].length; i++){
        festivalDetailImgs[i] = req.files["detailImg"][i].filename;
    }

    db.collection("count").findOne({title: "festival"}, (err, festivalNum)=>{
        db.collection("festival").insertOne({
            festivalCount: festivalNum.festivalCount,
            location: req.body.location,
            writer: req.body.writer,
            festivalStartDate: req.body.festivalStartDate,
            festivalLastDate: req.body.festivalLastDate,
            festivalStartTime: req.body.festivalStartTime,
            festivalLastTime: req.body.festivalLastTime,
            thumbImg: festivalThumbImgs,
            detailImg: festivalDetailImgs,
            title: req.body.title,
            textArea: req.body.textArea,
        }, (err, result)=>{
            db.collection("count").updateOne({title: "festival"}, {$inc: {festivalCount: 1}}, (err, result)=> {
                res.redirect(`/festival/detail/${festivalNum.festivalCount}`)
            })
        })
    })
});
// festival 게시물 삭제 요청
app.get("/festival/detail/delete/:festivalCount", (req, res)=>{
    db.collection("festival").deleteOne({festivalCount: Number(req.params.festivalCount)}, (err, result)=>{
      res.redirect("/festival")
    })
})
// festival 게시물 검색 기능
app.get("/festivalSearch", (req, res)=>{
    let check = [
        {$search: {
            index: "festivalSearch", 
            text: {query: req.query.festivalSearch, path: req.query.findSelectValue}}
        },
        {$sort: {festivalCount: -1}}
    ];

    db.collection("festival").aggregate(check).toArray((err, total)=>{

        let totalData = total.length;
        let pageNumber = (req.query.page == null) ? 1 : Number(req.query.page);
        let perpage = 9;
        let blockCount = 5;
        let blockNum = Math.ceil(pageNumber / blockCount);
        let blockStart = ((blockNum - 1) * blockCount) + 1;
        let blockEnd = blockStart + blockCount - 1;
        let totalPaging = Math.ceil(totalData / perpage);
        
        if(blockEnd > totalPaging){
            blockEnd = totalPaging;
        }
        
        let totalBlock = Math.ceil(totalPaging / blockCount);
        let startFrom = (pageNumber - 1) * perpage;

        db.collection("festival").aggregate(check).sort({festivalCount: -1}).skip(startFrom).limit(perpage).toArray((err, result)=>{
            res.render("festival/festival.ejs", {
                login: req.user, 
                data: result, 
                inputTxt: req.query.festivalSearch,
                totalData : totalData,
                totalPaging : totalPaging,
                blockStart : blockStart,
                blockEnd : blockEnd,
                blockNum : blockNum,
                totalBlock : totalBlock,
                pageNumber : pageNumber 
            })
        })
    })
})


// notice
app.get("/notice", (req, res)=>{
    db.collection("notice").find().toArray((err, total)=>{
        let totalData = total.length;
        let pageNumber = (req.query.page == null) ? 1 : Number(req.query.page);
        let perpage = 6;
        let blockCount = 5;
        let blockNum = Math.ceil(pageNumber / blockCount);
        let blockStart = ((blockNum - 1) * blockCount) + 1;
        let blockEnd = blockStart + blockCount - 1;
        let totalPaging = Math.ceil(totalData / perpage);

        if(blockEnd > totalPaging){
            blockEnd = totalPaging;
        }

        let totalBlock = Math.ceil(totalPaging / blockCount);
        let startFrom = (pageNumber - 1) * perpage;

        db.collection("notice").find().sort({noticeCount: -1}).skip(startFrom).limit(perpage).toArray((err, result)=>{
            res.render("notice/notice.ejs", {
                login: req.user, 
                data: result,
                totalData : totalData,
                totalPaging : totalPaging,
                blockStart : blockStart,
                blockEnd : blockEnd,
                blockNum : blockNum,
                totalBlock : totalBlock,
                pageNumber : pageNumber 
            });
        })
    })
});
// notice 등록
app.get("/notice/register", (req, res)=>{
    res.render("notice/notice_edit.ejs", {login: req.user});
});
// notice 등록 데이터
const noticeImgUpload = upload.fields([{name: "addFiles"}]);
app.post("/noticeData", noticeImgUpload, (req, res)=>{
    let noticeFiles = [];      

    if(req.files["addFiles"].length > 0){
        for(let i = 0; i < req.files["addFiles"].length; i++){
            noticeFiles[i] = req.files["addFiles"][i].filename;
        }
    }
    db.collection("count").findOne({title: "notice"}, (err, noticeNum)=>{ 
        db.collection("notice").insertOne({
            noticeCount: noticeNum.noticeCount,
            department: req.body.department,
            writer: req.body.writer,
            writeDate: req.body.writeDate,
            addFiles: noticeFiles,
            title: req.body.title,
            textArea: req.body.textArea,
        }, (err, result)=>{
            db.collection("count").updateOne({title: "notice"}, {$inc: {noticeCount: 1}}, (err, result)=> {
                res.redirect(`/notice/detail/${noticeNum.noticeCount}`)
            })
        })
    })
});
// notice 상세
app.get("/notice/detail/:noticeCount", (req, res)=>{
    db.collection("notice").findOne({noticeCount: Number(req.params.noticeCount)}, (err, result)=>{
        res.render("notice/notice_detail.ejs", {login: req.user, data: result});
    })
});
// notice 게시물 삭제 요청
app.get("/notice/detail/delete/:noticeCount", (req, res)=>{
    db.collection("notice").deleteOne({noticeCount: Number(req.params.noticeCount)}, (err, result)=>{
      res.redirect("/notice")
    })
})


// press
app.get("/press", (req, res)=>{
    db.collection("press").find().toArray((err, total)=>{
        let totalData = total.length;
        let pageNumber = (req.query.page == null) ? 1 : Number(req.query.page);
        let perpage = 6;
        let blockCount = 5;
        let blockNum = Math.ceil(pageNumber / blockCount);
        let blockStart = ((blockNum - 1) * blockCount) + 1;
        let blockEnd = blockStart + blockCount - 1;
        let totalPaging = Math.ceil(totalData / perpage);

        if(blockEnd > totalPaging){
            blockEnd = totalPaging;
        }

        let totalBlock = Math.ceil(totalPaging / blockCount);
        let startFrom = (pageNumber - 1) * perpage;

        db.collection("press").find().sort({pressCount: -1}).skip(startFrom).limit(perpage).toArray((err, result)=>{
            res.render("press/press.ejs", {
                login: req.user, 
                data: result,
                totalData : totalData,
                totalPaging : totalPaging,
                blockStart : blockStart,
                blockEnd : blockEnd,
                blockNum : blockNum,
                totalBlock : totalBlock,
                pageNumber : pageNumber 
            });
        })
    })
});
// press 상세
app.get("/press/detail/:pressCount", (req, res)=>{
    db.collection("press").findOne({pressCount: Number(req.params.pressCount)}, (err,result)=> {
        res.render("press/press_detail.ejs", {login: req.user, data: result});
    })
});
// press 등록
app.get("/press/register", (req, res)=>{
    res.render("press/press_edit.ejs", {login: req.user});
});
// press 등록 데이터
const pressImgUpload = upload.fields([{name: "thumbImg"}, {name: "detailImg"}]);
app.post("/pressData", pressImgUpload, (req, res)=>{
    let pressThumbImgs = [];
    let pressDetailImgs = [];

    for(let i = 0; i < req.files["thumbImg"].length; i++){
        pressThumbImgs[i] = req.files["thumbImg"][i].filename;
    }
    for(let i = 0; i < req.files["detailImg"].length; i++){
        pressDetailImgs[i] = req.files["detailImg"][i].filename;
    }

    db.collection("count").findOne({title: "press"}, (err, pressNum)=>{
        db.collection("press").insertOne({
            pressCount: pressNum.pressCount,
            department: req.body.department,
            writer: req.body.writer,
            writeDate: req.body.writeDate,
            thumbImg: pressThumbImgs,
            detailImg: pressDetailImgs,
            title: req.body.title,
            textArea: req.body.textArea,
        }, (err, result)=>{
            db.collection("count").updateOne({title: "press"}, {$inc: {pressCount: 1}}, (err, result)=> {
                res.redirect(`/press/detail/${pressNum.pressCount}`)
            })
        })
    })
});
// press 게시물 삭제 요청
app.get("/press/detail/delete/:pressCount", (req, res)=>{
    db.collection("press").deleteOne({pressCount: Number(req.params.pressCount)}, (err, result)=>{
      res.redirect("/press")
    })
})


// 회원가입
app.get("/join", (req, res)=>{
    res.render("join/join.ejs", {login: req.user});
});
//중복아이디 체크
app.post("/joinCheck",(req,res)=>{
    db.collection("users").findOne({memberId: req.body.memberId}, (err, user)=>{
        res.send({user:user})
    })
})
// db에 회원가입 데이터 저장
app.post("/joinData", (req, res)=>{
    db.collection("users").findOne({memberId: req.body.memberId}, (err, user)=>{        
        db.collection("count").findOne({title: "회원"}, (err, result)=>{
            db.collection("users").insertOne({
                userCount: result.userCount,
                memberId: req.body.memberId,
                memberPass: req.body.memberPass,
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
            }, (err, result)=>{
                db.collection("count").updateOne({title: "회원"}, {$inc: {userCount: 1}}, (err)=>{
                    res.send("<script> alert('회원가입 완료'); location.href ='/' </script>")
                })
            })
        })
    
    })
});

// 로그인 처리 요청 경로
app.post("/loginData", passport.authenticate('local', {failureRedirect : '/'}), (req, res)=>{
    // 로그인 처리 요청 경로에서 이전 경로에 대한
    if (req.body.referer && (req.body.referer !== undefined && req.body.referer.slice(-6) !== "/login")) {
      res.redirect(req.body.referer);
    } else {
        res.send(`<script>
        window.location = document.referrer;
      </script>`);
    }
})
// 로그아웃 처리 요청 경로
app.get("/logout", (req, res)=>{
    req.logout(()=>{
      // 로그아웃 시 이전 경로로 돌아가기
      res.send(`<script>
        window.location = document.referrer;
      </script>`);
    })
})

