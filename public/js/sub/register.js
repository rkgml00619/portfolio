if(mainLink.includes("notice") || mainLink.includes("press")){
    const writeDate = document.querySelector(".contsDetail .content1 .boardConts form .formWrap > div input#writeDate");
    
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
    writeDate.value = year + "-" + ("0" + month) + "-" + day;
}


if(mainLink.includes("festival")){
    const festivalDate = document.querySelectorAll("#festival_edit .contsDetail .content1 .boardConts form .formWrap > div input[type='date'");

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    
    festivalDate.forEach(function(dateInput){
        dateInput.value = year + "-" + ("0" + month) + "-" + "01";
    });
}