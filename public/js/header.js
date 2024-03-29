// 헤더의 배경 제어 및 서브메뉴 노출 제어
const headerWrap = document.querySelector("#header");

// 로그인 버튼 클릭 시
const loginBtns = document.querySelector("#header .joinWrap .login");
const loginView = document.querySelector("#header .joinDetail");
const loginViewClose = document.querySelector("#header .joinDetail .close");

// 태블릿 또는 모바일일 때 메뉴 변경
const mobileMenuWrap = document.querySelector("#header .headerConts_m");
const hamMenu = document.querySelector("#header .headerConts_m .hamMenu");
const CloseBtns = document.querySelector("#header .headerConts_m .close");

const mobileLoginBtns = document.querySelector("#header .headerConts_m .login");
const mobileLoginViews = document.querySelector("#header .headerConts_m .joinDetail");
const mobileLoginClose = document.querySelector("#header .headerConts_m .joinDetail .close");

const mobileMenu = document.querySelectorAll("#header .headerConts_m .gnbM .menuFold");
const mobileAllMenu = document.querySelectorAll("#header .headerConts_m .gnbM > li");
let mobileSubMenuList;

/******************************************************************************************************************************************/

window.addEventListener("load", function(){
    if(mainLink !== "/"){
        headerWrap.classList.remove("on");
    }
    else if(pc.matches){
        headerWrap.classList.add("on");
    }
    else {
        headerWrap.classList.remove("on");
    }
});

window.addEventListener("resize", function(){
    if(mainLink !== "/"){
        headerWrap.classList.remove("on");
    }
    else if(pc.matches){
        headerWrap.classList.add("on");
    }
    else {
        headerWrap.classList.remove("on");
    }
});


// header에 마우스 올렸을 때 클래스 제어
headerWrap.onmouseenter = function(){
    headerWrap.classList.add("show");
    headerWrap.classList.remove("on");
}
// header에 마우스 내렸을 때 클래스 제어
headerWrap.onmouseleave = function(){
    headerWrap.classList.remove("show");
    if(scTop == 0) {
        if(mainLink == "/"){
            headerWrap.classList.add("on");
        }
        else{            
            headerWrap.classList.remove("on");
        }
    }
}

// 모바일 또는 태블릿일 경우 header에 on 클래스제거
if(scTop == 0 && mobile.matches || tablet.matches){
    headerWrap.classList.remove("on");
}

// 모바일 햄버거 메뉴 클릭 시
hamMenu.onclick = function(e){
    e.preventDefault();

    mobileMenuWrap.classList.add("on");
}
// 모바일 클로즈 메뉴 클릭 시
CloseBtns.onclick = function(e){
    e.preventDefault();

    mobileMenuWrap.classList.remove("on");
}
// 모바일 메뉴 클릭 시 서브메뉴 나오도록 제어
for(let i = 0; i < mobileMenu.length; i++){
    mobileMenu[i].onclick = function(){        
        mobileSubMenuList = mobileMenu[i].querySelectorAll(".subGnb > li");
        mobileAllMenu.forEach(function(item){
            item.classList.add("off");
        });

        // 클릭한 메뉴에 on이 있는지 확인
        if(mobileMenu[i].classList.contains("on")){
            mobileMenu[i].classList.remove("on");
            mobileMenu[i].querySelector(".subGnb").style.height = "0";
        }
        else{
            const aleadyOn = document.querySelectorAll(".gnbM .menuFold.on");
            
            for(let i = 0; i < aleadyOn.length; i++){
                aleadyOn[i].classList.remove("on");
                aleadyOn[i].querySelector(".subGnb").style.height = "0";
            }

            // 선택한 것 메뉴만 클래스 추가
            mobileMenu[i].classList.add("on");

            // 태블릿일 때 서브메뉴 높이값
            if(tablet.matches && mobile.matches == false){
                mobileMenu[i].querySelector(".subGnb").style.height = (mobileSubMenuList.length * 70) + "px";
            }
            // 모바일일 때 서브메뉴 높이값
            else if(tablet.matches && mobile.matches){            
                mobileMenu[i].querySelector(".subGnb").style.height = (mobileSubMenuList.length * 57) + "px";
            }
        }
    }
}


// 로그인 버튼 클릭 시
loginBtns.onclick = function(e){
    e.preventDefault();
    loginView.style.height = "100vh";
    loginView.style.opacity = "1";
}
mobileLoginBtns.onclick = function(e){
    e.preventDefault();
    mobileLoginViews.style.height = "100vh";
    mobileLoginViews.style.opacity = "1";
}

loginViewClose.onclick = function(e){
    e.preventDefault();
    loginView.style.height = "0";
    loginView.style.opacity = "0";
}
mobileLoginClose.onclick = function(e){
    e.preventDefault();
    mobileLoginViews.style.height = "0";
    mobileLoginViews.style.opacity = "0";
}