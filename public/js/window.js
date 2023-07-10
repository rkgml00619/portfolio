const festivalList = document.querySelectorAll(".section2 .rightConts .conts");
const sections = document.querySelectorAll("#container > div");
let sectionTop = [];
let scTop = 0;
const mainLink = window.location.pathname;
// 반응형 화면 사이즈 확인
const pc = matchMedia("screen and (min-width: 1201px)");
const tablet = matchMedia("screen and (max-width: 1200px)");
const mobile = matchMedia("screen and (max-width: 768px)");

sections.forEach(function(section, idx){
    sectionTop[idx] = section.offsetTop;
});

window.onscroll = function(){
    scTop = window.scrollY;

    // header 색상 제어
    if(scTop <= 0){
        if(mainLink === "/"){
            if(!mobile.matches || !tablet.matches){
                headerWrap.classList.add("on");
            }
            else {
                headerWrap.classList.remove("on");
            }
        }
        else{
            headerWrap.classList.remove("on");
        }
    }
    else if(scTop > 0 && mobile.matches || tablet.matches){
        headerWrap.classList.remove("on");
    }
    else {
        headerWrap.classList.remove("on");
    }
    

    // 메인페이지 섹션2(추천행사) 오른쪽 리스트 노출
    for(let i = 0; i < festivalList.length; i++){
        if(scTop >= sectionTop[1] + (i * 100 + i * 100)){
            festivalList[i].classList.add("on");
        }
        else{
            festivalList[i].classList.remove("on");
        }
    }
}

window.onresize = function(){
    // 모바일 또는 태블릿일 경우 header에 on 클래스 삭제
    if(scTop == 0 && mobile.matches || tablet.matches){
        headerWrap.classList.remove("on");
    }
}

window.onload = function(){
    // 모바일 또는 태블릿일 경우 header에 on 클래스 삭제
    if(scTop == 0 && mobile.matches || tablet.matches){
        headerWrap.classList.remove("on");
    }
}