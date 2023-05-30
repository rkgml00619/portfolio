// 슬라이드 전환될 대상
const mainSlideText = document.querySelectorAll(".section1 .titleWrap .titleBox");
const mainSlideImg = document.querySelector(".section1 .bgSlide");
let slideNum = 0;

// 하단 슬라이드 메뉴
const mainSlideContols = document.querySelectorAll(".section1 .controlsMenu > li");
// 마우스호버를 적용시킬 대상 (자동재생 컨트롤)
const controlWrap = document.querySelector(".section1 .controlsMenu");

// 모바일 하단 슬라이드 메뉴
const mainContolsM_left = document.querySelector(".section1 .controlsM .arrowWrap.left");
const mainContolsM_right = document.querySelector(".section1 .controlsM .arrowWrap.right");
const mainContolsM_wrap = document.querySelector(".section1 .controlsM .controlsWrap");

// 모바일 버튼 클릭 시 해당하는 컨텐츠 타이틀 삽입
const mainContolsM_title = document.querySelector(".section1 .controlsM .title");
const mainMobileText = ["국제관광지원", "국민관광지원", "관광산업지원", "디지털전환지원"];


/************************************************************************************/


// 자동 슬라이드 재생
let autoMainSlide = setInterval(function(){
    if(slideNum === mainSlideText.length - 1){
        slideNum = 0;
    }
    else{
        slideNum++;
    }
    mainSlideImg.style.marginLeft = (slideNum * -100) + "%"; 
    mainContolsM_title.innerText = mainMobileText[slideNum]; 
    slideMenuControl();
    slideTextControl();
}, 3000);

// 자동 슬라이드 멈춤, 재실행
autoSlideRepaly(controlWrap);

// 하단 컨트롤 메뉴 클릭 시 화면 변경
for(let i = 0; i < mainSlideContols.length; i++){
    mainSlideContols[i].onclick = function(){        
        slideNum = i;

        mainSlideImg.style.marginLeft = (slideNum * -100) + "%";
        slideMenuControl();
        slideTextControl();
    }
}

// 모바일 하단 좌측 메뉴 클릭 시
mainContolsM_left.onclick = function(){
    if(slideNum === 0){
        slideNum = mainSlideText.length - 1;
    }
    else{
        slideNum--;
    }
    mainSlideImg.style.marginLeft = (slideNum * -100) + "%";
    mainContolsM_title.innerText = mainMobileText[slideNum];
    slideTextControl();
}
// 모바일 하단 우측 메뉴 클릭 시
mainContolsM_right.onclick = function(){
    if(slideNum === mainSlideText.length - 1){
        slideNum = 0;
    }
    else{
        slideNum++;
    }
    mainSlideImg.style.marginLeft = (slideNum * -100) + "%";
    mainContolsM_title.innerText = mainMobileText[slideNum];
    slideTextControl();
}

// 모바일 마우스 호버 시 
autoSlideRepaly(mainContolsM_wrap);



/* 리팩토링 ********************************************************************************************/

// 하단 메뉴 컨트롤 버튼 제어
function slideMenuControl(){    
    mainSlideContols.forEach(function(slideMenu, idx){
        slideMenu.classList.remove("on");
    })
    mainSlideContols[slideNum].classList.add("on");
}

// 해당하는 슬라이드 텍스트 노출
function slideTextControl(){    
    mainSlideText.forEach(function(slideText, idx){
        slideText.classList.remove("on");
    });
    mainSlideText[slideNum].classList.add("on");
}


// 자동 슬라이드 멈춤, 재실행
function autoSlideRepaly(item){
    // 하단메뉴 마우스 올렸을 때 자동슬라이드 멈춤
    item.onmouseenter = function(){
        clearInterval(autoMainSlide);
    }
    // 하단메뉴 마우스 내렸을 때 자동슬라이드 재실행
    item.onmouseleave = function(){
        autoMainSlide = setInterval(function(){
            if(slideNum === mainSlideText.length - 1){
                slideNum = 0;
            }
            else{
                slideNum++;
            }
            mainSlideImg.style.marginLeft = (slideNum * -100) + "%";  
            slideMenuControl();
            slideTextControl();
        }, 3000);
    }
}

