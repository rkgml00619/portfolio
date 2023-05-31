
const loadBtn = document.querySelector(".load_more");
const boxList = document.querySelectorAll("#ceoGreet .listWrap > .list");

// 박스가 전부 on이 되었을 때 제어하기 위한 변수
let boxListOn;

// 처음 보여질 갯수값
let startIndex = 8;
// 증가될 숫자값
let increaseNum = 4;


// 화면사이즈에 따라 변경될 값 세팅
if(pc.matches){
    startIndex = 8;
    increaseNum = 4;
}
else if(tablet.matches && !mobile.matches){
    startIndex = 6;
    increaseNum = 3;
}
else if(tablet.matches && mobile.matches){
    startIndex = 3;
    increaseNum = 3;
}


// 리사이즈되었을 때를 위해 on 클래스 전부 제거 후
boxList.forEach(function(list){
    list.classList.remove("on");
});
// 지정된 갯수만큼 on 클래스 추가
for(let i = 0; i < startIndex; i++){    
    boxList[i].classList.add("on");
    boxListOn = document.querySelectorAll("#ceoGreet .listWrap > .list.on");
}

loadBtn.addEventListener("click",function(){
    for(let i = startIndex; i < startIndex + increaseNum; i++){
        if(boxListOn.length < boxList.length){
            boxList[i].classList.add("on");
            boxListOn = document.querySelectorAll("#ceoGreet .listWrap > .list.on");
        }
    }

    startIndex = startIndex + increaseNum;

    if(boxListOn.length >= boxList.length){
        loadBtn.style.display = "none";
        startIndex = boxList.length; 
    }
});

