const selBtn = document.querySelector("#festival .contsDetail .content1 .boardWrap .boardTop .searchForm .selWrap .findBtn .findSelBtn");
const findSelect = document.querySelector("#festival .contsDetail .content1 .boardWrap .boardTop .searchForm .selWrap .findSelect");
const findSelInput = document.querySelector("#festival .contsDetail .content1 .boardWrap .boardTop .searchForm .selWrap #findSelectValue");

selBtn.onclick = function(e){
    e.preventDefault();

    if(findSelect.classList.contains("on")){
        findSelect.classList.remove("on");
    }
    else {
        findSelect.classList.add("on");
    }
}

for(let i = 0; i < findSelect.querySelectorAll("li").length; i++){
    findSelect.querySelectorAll("li")[i].onclick = function(){
        selBtn.innerText = findSelect.querySelectorAll("li")[i].innerText;
        findSelInput.value = findSelect.querySelectorAll("li")[i].getAttribute("data-findValue");
        findSelect.classList.remove("on");

        console.log(findSelInput.value);
    }
}