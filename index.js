const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

const port = 5000;

app.listen(port, ()=>{
    console.log("서버가 올바르게 연결되었습니다.");
});

app.get("/", (req, res)=>{
    res.render("index.ejs");
});
// 기관소개
app.get("/ceoGreet", (req, res)=>{
    res.render("introduction/ceoGreet.ejs");
});
app.get("/innovationVision", (req, res)=>{
    res.render("introduction/innovationVision.ejs");
});
app.get("/ethicNormOutline", (req, res)=>{
    res.render("introduction/ethicNormOutline.ejs");
});
app.get("/directions", (req, res)=>{
    res.render("introduction/directions.ejs");
});
// 주요사업
app.get("/business01", (req, res)=>{
    res.render("business/business01.ejs");
});
app.get("/business02", (req, res)=>{
    res.render("business/business02.ejs");
});
app.get("/business03", (req, res)=>{
    res.render("business/business03.ejs");
});
app.get("/business04", (req, res)=>{
    res.render("business/business04.ejs");
});
// 추천행사
app.get("/festival", (req, res)=>{
    res.render("festival/festival.ejs");
});
// 알림마당
app.get("/notice", (req, res)=>{
    res.render("notice/notice.ejs");
});
app.get("/press", (req, res)=>{
    res.render("press/press.ejs");
});
// 국민참여
app.get("/smart_inquiry", (req, res)=>{
    res.render("customer/smart_inquiry.ejs");
});

