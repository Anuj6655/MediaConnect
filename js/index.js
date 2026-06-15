var login_btn = document.getElementById("login_link");
var signup_btn = document.getElementById("signup_link");


login_btn.onclick = function(){
    document.getElementById("login").style.display = "block";
    document.getElementById("signup").style.display = "none";
}
signup_btn.onclick = function(){
    document.getElementById("signup").style.display = "block";
    document.getElementById("login").style.display = "none";
}