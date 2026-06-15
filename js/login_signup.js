
/* start of signup form js */
var signup_frm = document.getElementById("signup_frm");

signup_frm.onsubmit = function() {
   

    var name =  document.getElementById("username").value;
    var email = document.getElementById("signup_email").value;
    var phone = document.getElementById("signup_phone").value;
    var password = document.getElementById("signup_password").value;

    var user_object_data = {
        username: name,
        email: email,
        phone: phone,
        password: password
    };

    var user_text_data = JSON.stringify(user_object_data);

    if (name !== "" && email !== "" && phone !== "" && password !== "") {
        localStorage.setItem(document.getElementById("signup_email").value, user_text_data);
       var signup_btn = document.getElementById("signup_btn");

    // Correct way: use quotes for CSS values
    signup_btn.style.background = "#108dc7";  // fallback
    signup_btn.style.background = "-webkit-linear-gradient(to right, #ef8e38, #108dc7)";
    signup_btn.style.background = "linear-gradient(to right, #ef8e38, #108dc7)";
    
    signup_btn.innerHTML = "Signup Successful";
    
  setTimeout(function() {
   signup_btn.style.background = "#3E5151";  // fallback
   signup_btn.style.background = "-webkit-linear-gradient(to right, #DECBA4, #3E5151)";
   signup_btn.style.background = "linear-gradient(to right, #DECBA4, #3E5151)";
    signup_btn.innerHTML = "Sign Up";
    signup_frm.reset();

}, 3000);

        
  

    return false;   
    } 
};
 
/* end of signup form js */

/* start of email validation js */
var email_input = document.getElementById("signup_email")
email_input.onchange = function(){
    var signup_btn = document.getElementById("signup_btn");

    if(localStorage.getItem(document.getElementById("signup_email").value) !== null){
        document.getElementById("email_notice").style.display = "block";
        email_input.style.borderBottom = "1px solid red";
        signup_btn.style.background = "#dedbdc";  // fallback
        signup_btn.disabled = true;

        email_input.onclick = function(){
            email_input.value = "";
            email_input.style.borderBottom = "1px solid #080808";
            document.getElementById("email_notice").style.display = "none";
            signup_btn.style.background = "#3E5151";  // fallback
            signup_btn.style.background = "-webkit-linear-gradient(to right, #DECBA4, #3E5151)";
            signup_btn.style.background = "linear-gradient(to right, #DECBA4, #3E5151)";
            signup_btn.disabled = false;
        }


    }

}
/* end of email validation js */


/* start of login coding */
 var login_frm = document.getElementById("login_frm");
 login_frm.onsubmit = function() {

    var email = document.getElementById("login_email").value;
    var password = document.getElementById("login_password").value;

    if(localStorage.getItem(email) == null){
        alert("Email id not found..");

 }
    else{
        var text_data = localStorage.getItem(email);
        var obj_data = JSON.parse(text_data);
        var correct_password = obj_data.password;
        var correct_email = obj_data.email;

        if(email == correct_email ){
           if(password == correct_password){
         
           sessionStorage.setItem("user", email);
           window.location.replace("profile/profile.html");

           }
              else{
                alert("Incorrect password..");
        }
       
    }

 }
 return false;
 }
