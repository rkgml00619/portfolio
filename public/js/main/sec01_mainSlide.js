/* 공통사항 **************************************************************************/

// 슬라이드 전환될 대상
const mainSlideText = document.querySelectorAll(".section1 .titleWrap .titleBox");
const mainSlideImg = document.querySelector(".section1 .bgSlide ");
let slideNum = 0;

/* PC 및 태블릿 **********************************************************************/

// 하단 슬라이드 메뉴
const mainSlideContols = document.querySelectorAll(".section1 .controlsMenu > li");
// 마우스호버를 적용시킬 대상 (자동재생 컨트롤)
const controlWrap = document.querySelector(".section1 .controlsMenu");

/* 모바일 ***************************************************************************/

// 모바일 하단 슬라이드 메뉴
const mainContolsM_left = document.querySelector(".section1 .controlsM .arrowWrap.left");
const mainContolsM_right = document.querySelector(".section1 .controlsM .arrowWrap.right");

// 모바일 버튼 클릭 시 해당하는 컨텐츠 타이틀 삽입
const mainContolsM_title = document.querySelector(".section1 .controlsM .title");
const mainMobileText = ["국제관광지원", "국민관광지원", "관광산업지원", "디지털전환지원"];


/************************************************************************************/

// 슬라이드 자동 실행
let autoMainSlide = setInterval(function(){
    if(slideNum === mainSlideContols.length - 1) {
        slideNum = 0;
    }
    else {
        slideNum++;
    }

    menuChange(slideNum);
    slideMove(slideNum);
}, 3000);

// 슬라이드 자동실행 멈춤, 재실행
// 자동실행 멈춤
controlWrap.onmouseenter = function(){
    clearInterval(autoMainSlide);
}
// 자동실행 재실행
controlWrap.onmouseleave = function(){
    autoMainSlide = setIntervalSlide();
}

// 하단 메뉴 버튼 클릭 시 슬라이드 이동
for(let i = 0; i < mainSlideContols.length; i++){

    mainSlideContols[i].onclick = function(){
        slideNum = i;
        
        menuChange(i);
        slideMove(i);
    }
    
}

// 모바일 하단 메뉴버튼 클릭 시 슬라이드 이동
mainContolsM_left.onclick = function(){
    if(slideNum === 0){
        slideNum = mainMobileText.length - 1;
    }
    else {
        slideNum--;
    }
    slideMove(slideNum);
    mainContolsM_title.innerText = mainMobileText[slideNum];
    // 모바일 슬라이드 자동실행 멈춤
    clearInterval(autoMainSlide);
    menuChange(slideNum);;
}
mainContolsM_right.onclick = function(){
    if(slideNum === mainMobileText.length - 1){
        slideNum = 0;
    }
    else {
        slideNum++;
    }
    slideMove(slideNum);
    mainContolsM_title.innerText = mainMobileText[slideNum];
    // 모바일 슬라이드 자동실행 멈춤
    clearInterval(autoMainSlide);
    menuChange(slideNum);
}


/*********************************************************************************/

// 화면 움직임 리팩토링
function slideMove(moveCount){
    mainSlideImg.style.marginLeft = (moveCount * -100) + "%";
}

// 메뉴 활성화/비활성화 리팩토링
function menuChange(changeCount){
    mainSlideContols.forEach(function(control, idx){
        control.classList.remove("on");
    });
    mainSlideContols[changeCount].classList.add("on");
    
    mainSlideText.forEach(function(text, idx){
        text.classList.remove("on");
    });
    mainSlideText[changeCount].classList.add("on");
}


function setIntervalSlide(){
    setInterval(function(){
        if(slideNum === mainSlideContols.length - 1) {
            slideNum = 0;
        }
        else {
            slideNum++;
        }
    
        menuChange(slideNum);
        slideMove(slideNum);
    }, 3000);
}