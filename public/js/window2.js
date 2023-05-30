/* 데스크탑 **************************************************************************/

// 메인페이지 섹션구역
const section = document.querySelectorAll("#container > div");

// 헤더 배경색 및 글씨 색상 변경
const headerRoot = document.querySelector("#header");
// 헤더의 서브메뉴 제어
const headerSubMenu = document.querySelector("#header .headerConts");
const headerSubMenuBG = document.querySelector("#header .gnbBg");
let headerSubMenuHeight = 71;

// 접속한 경로가 index일 경우
const mainLink = window.location.pathname;

// 섹션2 오른쪽 콘텐츠 제어
let sectionTops;
const cont2Conts = document.querySelectorAll(".section2 .rightConts .conts");
// 섹션2 반응형으로 변경할 높이 값
let sec2Position = [100, 400, 1200]


/* 태블릿 및 모바일 ******************************************************************/

// 반응형 화면 사이즈 확인
const pc = matchMedia("screen and (min-width: 1201px)");
const tablet = matchMedia("screen and (max-width: 1200px)");
const mobile = matchMedia("screen and (max-width: 768px)");

// 반응형 헤더 - 햄버거 메뉴 클릭 시
const hamBtn = document.querySelector(".headerConts_m .hamGnb .hamMenu");
const closeBtn = document.querySelector(".headerConts_m .hamGnb .close");
const mobileMenu = document.querySelector("#header .headerConts_m");
const commonHead = document.querySelector(".headerConts_m .commonHead");

let foldState = false;

// 반응형 헤더 - 모바일 메뉴 클릭 시
const gnbMenuM = document.querySelectorAll(".mobileWrap .gnbM > li.menuFold");
const gnbMenuM_off = document.querySelectorAll(".mobileWrap .gnbM > li");
let subGnbList; // subGnb의 높이값을 설정하기 위한 변수

/************************************************************************************/

if(mainLink != "/index.html"){
    headerRoot.classList.add("on");
}

// 윈도우 로드 시 최초 1회
window.onload = function(){
    // 접속했을 때 PC 화면사이즈 일 때
    if(pc.matches){
        // console.log("데스크탑 리사이즈");
        sec2Position = [100, 400, 1200];
        headerSubMenuHeight = 71;
    }
    // 접속했을 때 태블릿 화면사이즈 일 때
    if(tablet.matches){
        // console.log("태블릿 로드");
        sec2Position = [0, 600, 1000];
        headerSubMenuHeight = 71;
    }
    if(mobile.matches){
        // console.log("모바일 로드");
        sec2Position = [0, 700, 1500];
        headerSubMenuHeight = 50;
    }
}

// 윈도우 리사이즈 시
window.onresize = function(){
    // 접속했을 때 태블릿 화면사이즈 일 때
    if(pc.matches){
        // console.log("데스크탑 리사이즈");
        sec2Position = [100, 400, 1200];
        headerSubMenuHeight = 71;
    }
    if(tablet.matches){
        // console.log("태블릿 리사이즈");
        sec2Position = [0, 600, 1000];
        headerSubMenuHeight = 71;
    }
    if(mobile.matches){
        // console.log("모바일 리사이즈");
        sec2Position = [0, 700, 1500];
        headerSubMenuHeight = 57;
        console.log(headerSubMenuHeight)
    }
}

// 윈도우 스크롤 시
window.onscroll = function(){
    let scTop = window.scrollY;
    
    if(mainLink == "/index.html"){        
        sectionTops = [
            section[0].offsetTop, section[1].offsetTop, section[2].offsetTop, section[3].offsetTop
        ];
    }

    // 스크롤 시 헤더영역 변경
    if(scTop > 0){        
        headerRoot.classList.add("on");
        // 데스크탑 헤더 영역
        header.onmouseenter = function(){
            headerSubMenu.classList.add("on");
            headerSubMenuBG.classList.add("on");
        }
        header.onmouseleave = function(){
            if(mainLink == "/index.html"){
                headerRoot.classList.add("on");  
            }
            headerSubMenuBG.classList.remove("on"); 
            headerSubMenu.classList.remove("on");
        }
        // 모바일 및 태블릿 헤더 영역
        hamBtn.onclick = function(e){
            e.preventDefault();
            commonHead.style.background = "#fff";
            headerRoot.classList.add("on");
            mobileMenu.classList.add("on");
        }
        closeBtn.onclick = function(e){
            e.preventDefault();
            setTimeout(function(){      
                commonHead.style.background = "transparent";
            }, 500);
            mobileMenu.classList.remove("on");
        }
    }
    else {
        if(mainLink != "/index.html"){
            headerRoot.classList.add("on");
        }
        if(mainLink == "/index.html"){
            headerRoot.classList.remove("on");
        }        
        // 데스크탑 헤더 영역
        header.onmouseenter = function(){
            headerRoot.classList.add("on");
            headerSubMenu.classList.add("on");
            headerSubMenuBG.classList.add("on");
        }
        header.onmouseleave = function(){
            if(mainLink == "/index.html"){
                headerRoot.classList.remove("on");  
            }            
            headerSubMenu.classList.remove("on");
            headerSubMenuBG.classList.remove("on"); 
        }
        // 모바일 및 태블릿 헤더 영역
        hamBtn.onclick = function(e){
            e.preventDefault();
            commonHead.style.background = "#fff";
            headerRoot.classList.add("on");
            mobileMenu.classList.add("on");
        }
        closeBtn.onclick = function(e){
            e.preventDefault();
            setTimeout(function(){      
                commonHead.style.background = "transparent";
                headerRoot.classList.remove("on");
            }, 500);
            mobileMenu.classList.remove("on");
        }
    }
    
    if(mainLink == "/index.html") {        
        // 두번째 섹션 스크롤 시 오른쪽 컨텐츠 나타났다가 사라짐  
        sec2Conts(0, 1, sectionTops[1] - sec2Position[0]);
        sec2Conts(2, 3, sectionTops[1] + sec2Position[1]);
        sec2Conts(4, 5, sectionTops[1] + sec2Position[2]);

        function sec2Conts(cont1, cont2, screenPosition){
            if(scTop >= screenPosition){
                cont2Conts[cont1].classList.add("on");
                cont2Conts[cont2].classList.add("on");
            }
            else if(scTop < screenPosition){
                cont2Conts[cont1].classList.remove("on");
                cont2Conts[cont2].classList.remove("on");
            }
        }  
    }  
}

// 모바일 메뉴의 메뉴들을 클릭하면 클래스 제어
for(let i = 0; i < gnbMenuM.length; i++){
    gnbMenuM[i].onclick = function(){
        // 클릭한 버튼의 서브메뉴의 갯수
        subGnbList = gnbMenuM[i].querySelectorAll(".subGnb > li");

        if(gnbMenuM[i].classList.contains("on")){
            gnbMenuM[i].classList.remove("on");
            gnbMenuM_off.forEach(function(menuOff){
                menuOff.classList.remove("off");
            });
            gnbMenuM[i].querySelector(".subGnb").style.height = "0px";
        }
        else {
            const gnbMenuOn = document.querySelectorAll(".mobileWrap .gnbM > li.menuFold.on");

            for(let j = 0; j < gnbMenuOn.length; j++){
                gnbMenuOn[j].classList.remove("on");
                gnbMenuM_off.forEach(function(menuOff){
                    menuOff.classList.remove("off");
                });
                gnbMenuOn[j].querySelector(".subGnb").style.height = "0px";
            }

            gnbMenuM[i].classList.add("on");
            gnbMenuM[i].querySelector(".subGnb").style.height = subGnbList.length * headerSubMenuHeight + "px";
            gnbMenuM_off.forEach(function(menuOff){
                menuOff.classList.add("off");
            });
        }
    }
}


/*헤더영역 제어************************************************************************/

// 데스크탑 헤더 영역
header.onmouseenter = function(){
    headerRoot.classList.add("on");
    headerSubMenu.classList.add("on");
    headerSubMenuBG.classList.add("on");
}
header.onmouseleave = function(){
    if(mainLink == "/index.html"){
        headerRoot.classList.remove("on");  
    }
    headerSubMenu.classList.remove("on");
    headerSubMenuBG.classList.remove("on"); 
}

// 모바일 및 태블릿 헤더 영역
hamBtn.onclick = function(e){
    e.preventDefault();
    commonHead.style.background = "#fff";
    headerRoot.classList.add("on");
    mobileMenu.classList.add("on");
}
closeBtn.onclick = function(e){
    e.preventDefault();
    setTimeout(function(){        
        headerRoot.classList.remove("on");
        commonHead.style.background = "transparent";
    }, 500);
    mobileMenu.classList.remove("on");

    // 서브메뉴가 닫히면 서브메뉴들에 달려있던 클래스들 전부 초기화
    gnbMenuM.forEach(function(menus, idx){
        menus.classList.remove("on");
        menus.classList.remove("off"); 
        gnbMenuM_link.classList.remove("off");           
    });
}


