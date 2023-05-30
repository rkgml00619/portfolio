/* 데스크탑 **************************************************************************/
const contsTitle = document.querySelector(".contTitleWrap .contsTitle");
const locationMenu = document.querySelector(".location > li:last-child > a");
const contsMenu = document.querySelectorAll(".contsWrap .contsMenu > li");


/* 모바일 ****************************************************************************/
const McontsMenu = document.querySelector(".contsWrap .contsMenuM > a");
const McontsSubMenu = document.querySelector(".contsWrap .contsMenuM .mobileMenu");
const McontsSubMenuList = document.querySelectorAll(".contsWrap .contsMenuM .mobileMenu > li");

// 모바일 메뉴 텍스트 변경될 태그
const McontsMenuTextTag = document.querySelector(".contsWrap .contsMenuM > a > span");

/* 공통 ******************************************************************************/
// 메뉴 텍스트 가져오기 위한 변수
let MenuListText = [];

if(pc.matches){
    // 메뉴 텍스트를 담는 함수
    MenuListText = [];    
    contsMenu.forEach(function(menuText, idx){
        MenuListText[idx] = menuText.querySelector("a").innerText;
    });
}
if(mobile.matches){
    // 메뉴 텍스트를 담는 함수
    MenuListText = [];
    McontsSubMenuList.forEach(function(menuText, idx){
        MenuListText[idx] = menuText.querySelector("a").innerText;
    });
}

/*************************************************************************************/

// 모바일 버튼 클릭 시 모바일 서브메뉴 등장 및 CSS 제어
McontsMenu.onclick = function(e){
    e.preventDefault();

    if(McontsMenu.classList.contains("on")){
        McontsMenu.classList.remove("on");
        McontsSubMenu.classList.remove("on");
        McontsSubMenu.style.height = "0px";
    }
    else {
        McontsMenu.classList.add("on");
        McontsSubMenu.classList.add("on");
        McontsSubMenu.style.height = McontsSubMenuList.length * 50 + "px";
    }
}

for(let i = 0; i < contsMenu.length; i++){ 
    // 데스크탑 메뉴 클릭 시   
    contsMenu[i].onclick = function(){
        menuTextChange(contsMenu, i);
    }
}

for(let i = 0; i < McontsSubMenuList.length; i++){ 
    // 모바일 서브 메뉴 클릭 시   
    McontsSubMenuList[i].onclick = function(){
        menuTextChange(McontsSubMenuList, i);
    }
}


/*리팩토링*****************************************************************************/

function menuTextChange(MenuItem, index){   
    // 해당하는 텍스트 값으로 변환 
    McontsMenuTextTag.innerText = MenuListText[index];
    locationMenu.innerText = MenuListText[index];
    contsTitle.innerText = MenuListText[index];

    // 해당하는 메뉴에 active 클래스 추가
    MenuItem.forEach(function(MsubMens){
        MsubMens.classList.remove("active");
    });
    MenuItem[index].classList.add("active");
}