const fmenuWrap = document.querySelector("#footer .fmenu_m");
const fmenuBtn = document.querySelector("#footer .fmenu_m > .menuBtn");
const fmenuList = document.querySelector("#footer .fmenu_m > .menu_m");


fmenuBtn.onclick = function(e){
    e.preventDefault();

    if(fmenuWrap.classList.contains("on")){
        fmenuWrap.classList.remove("on");
        fmenuBtn.querySelector("span").innerText = "keyboard_arrow_down";
    }
    else {
        fmenuWrap.classList.add("on");
        fmenuBtn.querySelector("span").innerText = "keyboard_arrow_up";
    }
}