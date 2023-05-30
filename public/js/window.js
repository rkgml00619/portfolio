const festivalList = document.querySelectorAll(".section2 .rightConts .conts");
const sections = document.querySelectorAll("#container > div");
let sectionTop = [];
let scTop = 0;
const mainLink = window.location.pathname;

sections.forEach(function(section, idx){
    sectionTop[idx] = section.offsetTop;
});

window.onscroll = function(){
    scTop = window.scrollY;

    // header 색상 제어
    if(scTop == 0){
        if(mainLink == "/index.html"){
            headerWrap.classList.add("on");
        }
        else{            
            headerWrap.classList.remove("on");
        }
    }
    else if(scTop > 0 || mobile || tablet){
        headerWrap.classList.remove("on");
    }
    else if(scTop <= 0 || !mobile || !tablet){
        headerWrap.classList.add("on");
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