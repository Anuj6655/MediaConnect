if(sessionStorage.getItem("user") == null){
    window.location.replace("../../../index.html");
}
else{
var current_user = sessionStorage.getItem("user")

var video = document.getElementById("video_player");
var play_btn =document.getElementById("play_btn");

play_btn.onclick =function()
{
     if(play_btn.className == "fa-solid fa-circle-play"){

        video.play();
        play_btn.className = "fa-solid fa-circle-pause";


     }
     else if(play_btn.className == "fa-solid fa-circle-pause"){
        video.pause();
        play_btn.className = "fa-solid fa-circle-play";
        
     }      

}
//progress bar coding

video.ontimeupdate = function(){
    var c_duration = video.currentTime;
    var t_duration = video.duration;
    var p_bar = document.getElementById("progress_bar");
    var v_timing = document.getElementById("v_timing");
   var sec =  parseInt(c_duration - parseInt(c_duration/60)*60);
   var t_sec=  parseInt(t_duration - parseInt(t_duration/60)*60);



    v_timing.innerHTML = parseInt(c_duration/60)+":"+sec+" / "+parseInt(t_duration/60)+":"+t_sec;

    var slider_per = c_duration*100/t_duration;

     p_bar.style.width = slider_per+"%";

     if(t_duration == c_duration){
        
        play_btn.className = "fa-solid fa-circle-play";

     }
}

//opea and close add video box
 

var open_video_box_btn = document.getElementById("open_video_box_btn");
open_video_box_btn.onclick = function(){
    var add_video_box = document.getElementById("add_video_box");
    if(open_video_box_btn.className == "fa-solid fa-circle-plus"){

        
        add_video_box.style.display="block";
        open_video_box_btn.className = "fa-solid fa-circle-xmark"


    }
    else if(open_video_box_btn.className == "fa-solid fa-circle-xmark"){
         add_video_box.style.display="none";
        open_video_box_btn.className = "fa-solid fa-circle-plus"
    }
    

}

// add video in local storage

var add_video_btn = document.getElementById("add_video_btn");
    add_video_btn.onclick = function(){
        var v_name = document.getElementById("video_name");
        var v_link = document.getElementById("video_link");
        if(v_name.value != "" && v_link.value != ""){
          var v_obj = {name:v_name.value,link:v_link.value};
          var v_text = JSON.stringify(v_obj);
          localStorage.setItem(current_user+"video"+v_name.value,v_text);
          
          



        }
        

  

    }


//fetch all videos from local storage

function load_video(){
var i;
for(i=0 ;i<localStorage.length ; i++){
   var all_keys = localStorage.key(i);

   if(all_keys.match(sessionStorage.getItem("user")+"video")){
     var v_data = localStorage.getItem(all_keys);
     var video_obj =  JSON.parse(v_data);



     var div = document.createElement("DIV");
     div.setAttribute("id", "main_video_box");

     var p = document.createElement("P");
     p.setAttribute("id", "playlist_video_name");
     p.className = "p_v_name";
     p.innerText = video_obj.name;

     var b = document.createElement("BUTTON");
     b.setAttribute("id", "video_play_btn");
     b.setAttribute("type", "button");
     b.className = "v_play_btn";
     b.setAttribute("url",video_obj.link)
     b.innerText = "Play";

     var deleteBtn = document.createElement("BUTTON");
     deleteBtn.setAttribute("type", "button");
     deleteBtn.setAttribute("id", "video_delete_btn");
     deleteBtn.className = "delete_btn";
     deleteBtn.innerText = "Delete";
     
     // Append children
     div.appendChild(p);
     div.appendChild(b);
     div.appendChild(deleteBtn);

     var all_v = document.getElementById("bottom");

     all_v.appendChild(div);
     
     

   }
}

}
load_video()

// onclickvideo  play button coding

function play_video(){

var all_v_play_btn = document.getElementsByClassName("v_play_btn");

var i;
for(i=0; i<all_v_play_btn.length ; i++){
    all_v_play_btn[i].onclick = function(){

        clear();

        var v_url = this.getAttribute("url");
        
        var video_src = document.getElementById("video_src");
        video_src.setAttribute("src",v_url);
       
        video.load();
         video.play();

         play_btn.className = "fa-solid fa-circle-pause";

         this.innerHTML= "Playing.."

         
         



    }

}


   

}
play_video();

function clear(){
    var all_v_play_btn = document.getElementsByClassName("v_play_btn");
    var i;
    for(i=0 ; i<all_v_play_btn.length; i++){
        all_v_play_btn[i].innerHTML = "Play";

    }

}


// next btn coding
 function next_btn(){
  var next_btn = document.getElementById("right_btn")
  next_btn.onclick = function(){
   var all_play_btn = document.getElementsByClassName("v_play_btn");
   var i;
   for(i=0 ; i <all_play_btn.length ; i++){
    if(all_play_btn[i].innerHTML == "Playing.."){

        var next_element = all_play_btn[i].parentElement.nextSibling;
        var next_play_btn = next_element.getElementsByClassName("v_play_btn")[0];

        next_play_btn.click();

        return false;


    }

   }

  }

 
 }
 next_btn();


 // previous btn coding
 function previous_btn(){
  var previous_btn = document.getElementById("left_btn");
  previous_btn.onclick = function(){
   var all_play_btn = document.getElementsByClassName("v_play_btn");
   var i;
   for(i=0 ; i <all_play_btn.length ; i++){
    if(all_play_btn[i].innerHTML == "Playing.."){
        
        var previous_element = all_play_btn[i].parentElement.previousSibling;
        var previous_play_btn = previous_element.getElementsByClassName("v_play_btn")[0];

        previous_play_btn.click();

        return false;


    }
   }
  }
 }
 previous_btn();



// delete button coding

 function dele(){
    var del = document.getElementsByClassName("delete_btn");
    var i;
    for(i=0; i<del.length; i++ ){
        del[i].onclick = function(){
            var parent = this.parentElement;
            var p_name = parent.getElementsByTagName("P")[0].innerHTML;

            localStorage.removeItem(current_user+"video"+p_name.trim());
            
             parent.className = " animate__animeted animate__bounceOut";
setTimeout(function(){
     parent.remove();
},1000);

        }

    }
    
 }
 dele();


//volume btn coding

//  function volume(){
//     var volume_icon = document.getElementById("volume");
//     volume_icon.onclick = function(){
  
//         var vol_control = document.getElementById("vol_control");

//          if(vol_control.style.display == "none"){
//             vol_control.style.display ="block";
//             vol_control.oninput=function(){
                
//                 video.volume = this.value;
//             }

//          }
//          else{
//             vol_control.style.display ="none";

//          }
         

//     }


//  }
//  volume();

//and

function volume(){
    var volume_icon = document.getElementById("volume");
    var vol_control = document.getElementById("vol_control");

    volume_icon.onclick = function(e){
        e.stopPropagation(); // icon click pe document click trigger na ho
        if(vol_control.style.display === "none" || vol_control.style.display === ""){
            vol_control.style.display = "block";
            vol_control.oninput = function(){
                video.volume = this.value;
            }
        } 
        else {
            vol_control.style.display = "none";
        }
    }

    // agar bahar click hua to hide kar do
    document.addEventListener("click", function(e){
        if(!vol_control.contains(e.target) && e.target !== volume_icon){
            vol_control.style.display = "none";
        }
    });
}
volume();



 


 //progress bar coding



 var progress_box =document.getElementById("progress_box");
 progress_box.onclick = function(event){
      

      var per = event.offsetX/this.offsetWidth;
      video.currentTime = per*video.duration;
      var play_btn = document.getElementById("play_btn")
      play_btn.className = "fa-solid fa-circle-pause";
      video.play();
   
 }



 // full screen coding

 var full_screen = document.getElementById("full_screen");
 full_screen.onclick = function(){

    video.requestFullscreen();

 }


 // video speed coding

 function speed(){
    var speed_icon = document.getElementById("speed_icon");
    var speed_control = document.getElementById("speed_control");

    // icon click → toggle
    speed_icon.onclick = function(e){
        e.stopPropagation();
        if(speed_control.style.display === "none" || speed_control.style.display === ""){
            speed_control.style.display = "block";
            speed_control.oninput = function(){
                video.playbackRate = this.value;
            }
        } else {
            speed_control.style.display = "none";
        }
    }

    // bahar click → hide
    document.addEventListener("click", function(e){
        if(!speed_control.contains(e.target) && e.target !== speed_icon){
            speed_control.style.display = "none";
        }
    });
}
speed();



 //search box coding

 var search = document.getElementById("search");
 search.oninput = function()
{
 var p_v_name = document.getElementsByClassName("p_v_name");
  
  var i ;
    for(i=0 ; i<p_v_name.length ; i++)
    {
         if(p_v_name[i].innerHTML.toUpperCase().match(search.value.toUpperCase())){
            
            p_v_name[i].parentElement.style.display="block";


         }
         else{
            p_v_name[i].parentElement.style.display="none";

         }
    }
}












}



