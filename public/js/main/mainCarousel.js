const carouselBtnLeft = document.querySelector(".section4 .carouselBtns span.left");
const carouselBtnRight = document.querySelector(".section4 .carouselBtns span.right");

const carouselBtns = document.querySelector(".section4 .carouselBtns");
const carouselBtnPause = document.querySelector(".section4 .carouselBtns .pause");
const carouselBtnPlay = document.querySelector(".section4 .carouselBtns .play");

const carouselBtnText = document.querySelector(".section4 .carouselBtns .carouselNum > span");

const carouselWrap = document.querySelector(".section4 .carouselWrap");
let carouselList = document.querySelectorAll(".section4 .carouselWrap .carouselConts");

let current = 0;

// 자동재생
let autoCarousel = setInterval(function(){  
    carouselList = document.querySelectorAll(".section4 .carouselWrap .carouselConts");  
    carouselWrap.style.marginLeft = "-200%";
    changeCarousel_left();
    carouselWrap.style.transition = "all 0.5s";
}, 2000);

// 버튼에 마우스호버 시 자동재생 멈춤, 재실행
carouselBtns.onmouseenter = function(){
    clearInterval(autoCarousel);
}
carouselBtns.onmouseleave = function(){
    autoCarousel = setInterval(function(){  
        carouselList = document.querySelectorAll(".section4 .carouselWrap .carouselConts");  
        carouselWrap.style.marginLeft = "-200%";
        changeCarousel_left();
        carouselWrap.style.transition = "all 0.5s";
    }, 2000);
}

// 재생, 멈춤 버튼 제어
carouselBtnPause.onclick = function(){    
    carouselBtnPause.classList.add("hide");
    carouselBtnPlay.classList.remove("hide");

    clearInterval(autoCarousel);
}
carouselBtnPlay.onclick = function(){
    carouselBtnPause.classList.remove("hide");
    carouselBtnPlay.classList.add("hide");

    autoCarousel = setInterval(function(){  
        carouselList = document.querySelectorAll(".section4 .carouselWrap .carouselConts");  
        carouselWrap.style.marginLeft = "-200%";
        changeCarousel_left();
        carouselWrap.style.transition = "all 0.5s";
    }, 2000);
}


// 좌우 버튼 클릭 시 캐러셀 이동
carouselBtnLeft.onclick = function(){
    carouselList = document.querySelectorAll(".section4 .carouselWrap .carouselConts");
    
    carouselWrap.style.marginLeft = "-200%";
    changeCarousel_left();
    carouselWrap.style.transition = "all 0.5s";
}
carouselBtnRight.onclick = function(){
    carouselList = document.querySelectorAll(".section4 .carouselWrap .carouselConts");
    
    carouselWrap.style.marginLeft = "0";
    changeCarousel_right();
    carouselWrap.style.transition = "all 0.5s";
}



/* 리팩토링 *************************************************************************/

// 좌측 버튼 클릭 시 바로 적용될 대상들
function changeCarousel_left(){
    setTimeout(function(){
        carouselWrap.append(carouselList[0]);
        carouselWrap.style.marginLeft = "-100%";
        carouselWrap.style.transition = "all 0s";
        
        if(current === carouselList.length - 1){
            current = 0;
        }
        else{
            current++;
        }
        carouselBtnText.innerText = "0" + (current + 1);
    }, 500);    
}
// 우측 버튼 클릭 시 바로 적용될 대상들
function changeCarousel_right(){
    setTimeout(function(){
        carouselWrap.prepend(carouselList[carouselList.length-1]);
        carouselWrap.style.marginLeft = "-100%";
        carouselWrap.style.transition = "all 0s";
        
        if(current === carouselList.length - 1){
            current = 0;
        }
        else{
            current++;
        }
        carouselBtnText.innerText = "0" + (current + 1);
    }, 500);    
}