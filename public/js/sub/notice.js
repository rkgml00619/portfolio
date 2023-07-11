const newIcon = document.querySelectorAll("#notice .contsDetail .content1 .boardWrap .boardBot .list .title a span.new");
const uploadDate = document.querySelectorAll("#notice .contsDetail .content1 .boardWrap .boardBot .list td.date");

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let days = date.getDate();

let uploadDateValue = [];
let standard = Number(String(year) + ("0" + String(month)) + String(days));

for(let i = 0; i < uploadDate.length; i++){
    uploadDateValue[i] = uploadDate[i].innerText;

    uploadDateValue[i] = uploadDateValue[i].replace("-", "");
    uploadDateValue[i] = Number(uploadDateValue[i].replace("-", ""));

    console.log(uploadDateValue[i]);
    console.log(standard);
    console.log(standard - uploadDateValue[i]);

    if(standard - uploadDateValue[i] > 8){
        newIcon[i].style.display = "none";
    }
}