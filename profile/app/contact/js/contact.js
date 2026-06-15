
if(sessionStorage.getItem("user") == null){
    window.location.replace("../../../index.html");
}
else{
  var current_user = sessionStorage.getItem("user");


//profil_pic...image code
function profile(){
    
 var user_email =  sessionStorage.getItem("user");
var img_url = localStorage.getItem(user_email+"image");
var profile_picture = document.getElementById("profile_pic");
profile_picture.style.backgroundImage = "url("+img_url+")";
       profile_picture.style.backgroundSize = "cover";
       profile_picture.style.backgroundPosition = "center";
}
profile();



    //open new contact box

var add_icone = document.getElementById("new_contact");
add_icone.onclick = function(){
 var bg = document.getElementById("contact_bg");
 bg.style.display = "block";
}

// close contact box coding
var close = document.getElementById("close");
close.onclick = function(){
  var bg =   document.getElementById("contact_bg");
    bg.style.display = "none";
}

// add contact in loacl storage
var add = document.getElementById("add");
add.onclick =  function(){
 var c_name = document.getElementById("c_name");
 var c_num = document.getElementById("c_num");
if(c_name.value != "" && c_num.value != ""){
    var new_contact = {name:c_name.value , number:c_num.value};
    var json_text = JSON.stringify(new_contact);
    localStorage.setItem(current_user+"_contact"+c_name.value,json_text);
}
else{
      var c_name = document.getElementById("c_name");
      var c_num = document.getElementById("c_num");
      var add = document.getElementById("add");


       c_name.style.border = "3px solid red";
       c_num.style.border = "3px solid red";
       add.style.background = "#dedbdc";  // fallback
        add.disabled = true;

       c_name,c_num.onclick = function(){
            c_num.value = "";
            c_num.style.border = "1px solid purple";
            c_num.style.borderLeft= "5px solid purple";


            add.style.backgroundColor="purple";
            add.disabled = false;
        }
        c_name.onclick = function() {
        c_name.value = "";
        c_name.style.border = "1px solid purple";
        c_name.style.borderLeft = "5px solid purple";

        add.style.backgroundColor = "purple";
        add.disabled = false;
};


    return false;

    
}
}
function all_contact(){
    var i;
    for(i=0; i<localStorage.length; i++)
    {
        var all_keys = localStorage.key(i);

        if (all_keys.match(sessionStorage.getItem("user")+"_contact"))
        {
            var json_text = localStorage.getItem(all_keys);
            var obj = JSON.parse(json_text);



            var contact_box= document.createElement("DIV");
            contact_box.setAttribute("id","contact");

            var name_p =document.createElement("p");
            name_p.setAttribute("class","contact_name");

            var name_i = document.createElement("I");
            name_i.setAttribute("class","fas fa-user");

            var tool = document.createElement("DIV");
            tool.setAttribute("id","tool");
            

            var edit_i = document.createElement("I");
            edit_i.setAttribute("class","fas fa-edit edit");

            var del_i = document.createElement("I");
            del_i.setAttribute("class","fas fa-trash del");

            var line = document.createElement("HR");
            line.setAttribute("color","purple");
            line.setAttribute("width","75%");
            line.setAttribute("size","1");



            var num_p = document.createElement("P");
            var num_i = document.createElement("I");
            num_i.setAttribute("class","fas fa-mobile-alt");
            

            name_p.appendChild(name_i);
            name_p.innerHTML += " "+obj.name;

            tool.appendChild(edit_i);
            tool.appendChild(del_i);

            num_p.appendChild(num_i);
            num_p.innerHTML += " "+obj.number;

            contact_box.appendChild(name_p);
            contact_box.appendChild(tool);
            contact_box.appendChild(line);
            contact_box.appendChild(num_p);

            var all_contact_box = document.getElementById("all_contact_box");

               all_contact_box.appendChild(contact_box);

            
        }
    }

} 
all_contact();

// searching coding

var search = document.getElementById("search");
search.oninput = function(){
    var all_contact_name = document.getElementsByClassName("contact_name");
    var i ;
    for(i=0 ; i<all_contact_name.length ; i++)
    {
         if(all_contact_name[i].innerHTML.toUpperCase().match(search.value.toUpperCase())){
            
            all_contact_name[i].parentElement.style.display="block";


         }
         else{
            all_contact_name[i].parentElement.style.display="none";

         }
    } 

}

// delet and edit coding
function del(){
    var del = document.getElementsByClassName("del");
var i;
for(i=0; i<del.length; i++ ){
    del[i].onclick = function()
  {
 var parent = this.parentElement.parentElement;
 var p_ele = parent.getElementsByClassName("contact_name")[0];
 var username = p_ele.innerHTML.replace('<i class="fas fa-user"></i>',"");
 

 localStorage.removeItem(current_user+"_contact"+username.trim());
//  alert("Delete your Contact");
 parent.className = " animate__animeted animate__bounceOut";
setTimeout(function(){
     parent.remove();
},1000);
  }

}
}
del();

function edit(){
    var edit = document.getElementsByClassName("edit");
    var i;
    for(i=0; i<edit.length ; i++){

        edit[i].onclick = function(){
        
     var parent =  this.parentElement.parentElement
           var para = parent.getElementsByTagName("P");
          var name = para[0].innerHTML.replace('<i class="fas fa-user"></i>',"").trim();
           var number = para[1].innerHTML.replace('<i class="fas fa-mobile-alt"></i>',"").trim();

           var c_name = document.getElementById("c_name");
           var C_num = document.getElementById("c_num");
           var new_contact = document.getElementById("new_contact");
           var add = document.getElementById("add");
           var tital = document.getElementById("tital");
           tital.innerHTML = "Edit Contact"; 

           add.innerHTML = "Update";
            new_contact.click();

           c_name.value = name;
           c_num.value = number;

           localStorage.removeItem(current_user+"_contact"+name);
           var close = document.getElementById("close");
           close.style.display = "none";


      
        }
    }
   


}
edit();

}





