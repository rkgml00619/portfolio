const joinForm = document.querySelector("#join .contsDetail #userForm");
const submitBtn = document.querySelector("#userForm .boardBtns .submitBtn");
const cancelBtn = document.querySelector("#userForm .boardBtns .cancelBtn");
const memberId = document.querySelector("#userForm .formWrap > div #memberId");
const memberPass = document.querySelector("#userForm .formWrap > div #memberPass");
const passCheck = document.querySelector("#userForm .formWrap > div #passCheck");
const userName = document.querySelector("#userForm .formWrap > div #name");
const userPhone = document.querySelector("#userForm .formWrap > div #phone");
const userEmail = document.querySelector("#userForm .formWrap > div #email");
const agreement = document.querySelector("#userForm .agreeCheck #agree");

let idCrossCheck = false;

let allValid = {
    idValid: false,
    passValid: false,
    nameValid: false,
    telValid: false,
    emailValid: false,
    checkBoxValid: false,
}

joinForm.onsubmit = function(e){
    // 정규표현식 체크 조건들
    const checkId = /^[\w]{4,}[\d]{1,}$/;
    const checkPass = /^[\@\_\$\!\-]{1,}[\w]{2,}[\d]{1,}$/;
    const checkName = /^[가-힣]{2,4}$/;
    const checkTel = /^(01)-\d{4}-\d{4}|\d{11}$/;
    const checkEmail = /^[\w]+\@[a-z]+\.[a-z\.]{2,5}$/;

    // 아이디 체크
    if(checkId.test(memberId.value)){
        allValid.idValid = true;

        memberId.classList.remove("err");
        memberId.parentElement.parentElement.querySelector(".message").classList.remove("err");
        memberId.classList.add("ok");
        memberId.parentElement.parentElement.querySelector(".message").classList.add("ok");
        memberId.parentElement.parentElement.querySelector(".message").innerText = memberId.value + "는 사용가능한 아이디 입니다.";
    }
    else {
        allValid.idValid = false;
        memberId.classList.add("err");
        memberId.parentElement.parentElement.querySelector(".message").classList.add("err");
        memberId.parentElement.parentElement.querySelector(".message").innerText = "영문 + 숫자 조합 5글자 이상 사용가능 합니다.";
    }

    // 비밀번호 체크
    if(checkPass.test(memberPass.value)){
        if(passCheck.value === memberPass.value){
            allValid.passValid = true;
            
            memberPass.classList.remove("err");
            memberPass.parentElement.parentElement.querySelector(".message").classList.remove("err");
            memberPass.classList.add("ok");
            memberPass.parentElement.parentElement.querySelector(".message").classList.add("ok");
            memberPass.parentElement.parentElement.querySelector(".message").innerText ="";

            passCheck.classList.remove("err");
            passCheck.parentElement.parentElement.querySelector(".message").classList.remove("err");
            passCheck.classList.add("ok");
            passCheck.parentElement.parentElement.querySelector(".message").classList.add("ok");
            passCheck.parentElement.parentElement.querySelector(".message").innerText ="";
        }
        else {
            allValid.passValid = false;
            passCheck.classList.add("err");
            passCheck.parentElement.parentElement.querySelector(".message").classList.add("err");
            passCheck.parentElement.parentElement.querySelector(".message").innerText = "비밀번호를 다시 확인해주세요.";
        }
    }
    else {
        if(passCheck.value === memberPass.value){
            allValid.passValid = false;
            
            memberPass.classList.add("err");
            memberPass.parentElement.parentElement.querySelector(".message").classList.add("err");
            memberPass.parentElement.parentElement.querySelector(".message").innerText = "특수기호 (@, $, !)를 포함한 5자리 이상 영문 + 숫자조합";
        }
        else {
            allValid.passValid = false;
            passCheck.classList.add("err");
            passCheck.parentElement.parentElement.querySelector(".message").classList.add("err");
            passCheck.parentElement.parentElement.querySelector(".message").innerText = "비밀번호를 다시 확인해주세요.";
        }
    }

    // 이름체크
    if(checkName.test(userName.value)){
        allValid.nameValid = true;

        userName.classList.remove("err");
        userName.classList.add("ok");
        userName.parentElement.parentElement.querySelector(".message").innerText = "";
        userName.parentElement.parentElement.querySelector(".message").classList.remove("err");
    }
    else {
        allValid.nameValid = false;

        userName.classList.add("err");
        userName.parentElement.parentElement.querySelector(".message").innerText = "이름을 올바르게 입력해주세요.";
        userName.parentElement.parentElement.querySelector(".message").classList.add("err");
    }

    // 전화번호 체크
    if(checkTel.test(userPhone.value)){
        allValid.telValid = true;

        userPhone.classList.remove("err");
        userPhone.classList.add("ok");
        userPhone.parentElement.parentElement.querySelector(".message").innerText = "";
    }
    else {
        allValid.telValid = false;

        userPhone.classList.add("err");
        userPhone.parentElement.parentElement.querySelector(".message").innerText = "전화번호를 올바르게 입력해주세요.";
        userPhone.parentElement.parentElement.querySelector(".message").classList.add("err");
    }

    // 이메일 체크
    if(checkEmail.test(userEmail.value)){
        allValid.emailValid = true;

        userEmail.classList.remove("err");
        userEmail.classList.add("ok");
        userEmail.parentElement.parentElement.querySelector(".message").innerText = "";
    }
    else {
        allValid.emailValid = false;

        userEmail.classList.add("err");
        userEmail.parentElement.parentElement.querySelector(".message").innerText = "이메일을 올바르게 입력해주세요.";
        userEmail.parentElement.parentElement.querySelector(".message").classList.add("err");
    }


    // 이용약관 동의체크 
    const agreementChecked = document.querySelector("#userForm .agreeCheck #agree:checked");

    if(agreementChecked){
        allValid.checkBoxValid = true;
        
        agreement.classList.remove("err");
        agreement.parentElement.parentElement.querySelector(".message").innerText = "";
        agreement.parentElement.parentElement.querySelector(".message").classList.remove("err");
    }
    else {
        allValid.checkBoxValid = false;
        
        agreement.classList.add("err");
        agreement.parentElement.parentElement.querySelector(".message").innerText = "필수 약관에 동의해주세요.";
        agreement.parentElement.parentElement.querySelector(".message").classList.add("err");
    }

    let submitConfirm = window.confirm("입력하신 회원정보를 등록하시겠습니까?");

    if(submitConfirm){
        // 입력된 값이 전부 true면 데이터값 넘김
        if(allValid.idValid && allValid.passValid && allValid.nameValid && allValid.telValid && allValid.emailValid && allValid.checkBoxValid){
            joinForm.setAttribute("action","/joinData");
            
            e.submit();  
        }
        else {
            alert("입력하신 회원정보를 확인해주세요.");
            e.preventDefault();
        }   
    }
    else {
        alert("회원가입이 취소되었습니다.");
        e.preventDefault();
    }
}

memberId.addEventListener("blur",(e)=>{
    // 아이디 중복체크
    joinForm.setAttribute("action","/joinCheck");

    axios.post('/joinCheck', {
        //작명    // 인풋태그값
        memberId: memberId.value
    })
    .then(function (response) {
        memberId.classList.add("err");
        memberId.parentElement.parentElement.querySelector(".message").classList.add("err");
        memberId.parentElement.parentElement.querySelector(".message").innerText = response.data.user.memberId + "는 중복된 아이디 입니다.";
    })
    .catch(function (error) {
        memberId.classList.remove("err");
        memberId.parentElement.parentElement.querySelector(".message").classList.remove("err");
        memberId.parentElement.parentElement.querySelector(".message").innerText = "";
    });
});


cancelBtn.onclick = function(e){
    let cancelConfirm = window.confirm("회원가입을 취소하시겠습니까?");
    if(cancelConfirm){
        alert("회원가입이 취소되었습니다.");
        history.back();
    }
    else {
        e.preventDefault();
        alert("회원가입을 계속 진행해주세요.");
    }
}