// 헤더에서 메뉴 이름들을 가져오기 위한 상수
const headerMenus_1depth = document.querySelectorAll("#header .gnb > li > a");
const headerMenus = document.querySelectorAll("#header .gnb > li");

// 헤더에서 가져온 텍스트들을 변수에 넣음
const menuText_intro = headerMenus[0].querySelectorAll(".subGnb > li a");
const menuText_business = headerMenus[1].querySelectorAll(".subGnb > li a");

// 텍스트 및 링크를 실제로 삽입할 container 내의 메뉴 대상
const subMenusLI = document.querySelectorAll(".contsWrap .contsMenu > li");
const subMenus = document.querySelectorAll(".contsWrap .contsMenu > li a");
const headerList = [menuText_intro, menuText_business];

// 접속한 페이지를 확인하기 위한 대상
const subLink = window.location.pathname;
const subLinkFull = window.location;

// 모바일일 경우
const m_subMenu = document.querySelector(".contsWrap .contsMenuM");
const m_subMenuBtn = document.querySelector(".contsMenuM > a");
const m_subMenuWrap = document.querySelector(".contsWrap .contsMenuM .mobileMenu")
const m_subMenuList = document.querySelectorAll(".contsMenuM > .mobileMenu a");

let pageCount = 0;

// location
const locationMenus = document.querySelectorAll(".contentsWrap .location > li > a");



// 주요사업 페이지일 경우 contsmenu의 링크와 텍스트 변경
if(subLink.includes("business")){
    contsMenuControl(1);
    locationMenus[1].innerText = "주요사업";
    locationMenus[1].setAttribute("href", "/business01");
}
// 주요사업 페이지가 아닐 경우(기관소개) contsmenu의 링크와 텍스트 변경
else if(subLink.includes("business") !== true){
    contsMenuControl(0);
    locationMenus[1].innerText = "기관소개";
    locationMenus[1].setAttribute("href", "/ceoGreet");
}

// 모바일 서브메뉴 클릭 시 서브메뉴 나타남
m_subMenuBtn.onclick = function(e){
    e.preventDefault();

    if(m_subMenu.classList.contains("on")){
        m_subMenu.classList.remove("on");
        m_subMenuWrap.style.height = "0px";
    }
    else {
        m_subMenu.classList.add("on");
        m_subMenuWrap.style.height = m_subMenuList.length * 50 + "px";
    }
}

// 로케이션 메뉴 제어
locationMenus[0].innerText = "HOME";
locationMenus[0].setAttribute("href", "/");



/***************************************************************************************************************/

function contsMenuControl(NUM){
    for(let i = 0; i < headerList[1].length; i++){
        // PC 및 태블릿 contsmenu
        subMenus[i].innerText = headerList[NUM][i].innerText;
        subMenus[i].setAttribute("href", headerList[NUM][i].href);
        // 모바일 contsmenu
        m_subMenuList[i].innerText = headerList[NUM][i].innerText;
        m_subMenuList[i].setAttribute("href", headerList[NUM][i].href);

        // 링크가 같으면 해당하는 a태그에 active 추가
        if(subLinkFull.href === headerList[NUM][i].href){
            subMenus[i].classList.add("active");
            m_subMenuList[i].classList.add("active");
            m_subMenuBtn.querySelector(".btnText").innerText = headerList[NUM][i].innerText;

            // 로케이션 메뉴 제어
            locationMenus[2].innerText = headerList[NUM][i].innerText;
            locationMenus[2].setAttribute("href", headerList[NUM][i].href);
        }
    }
}