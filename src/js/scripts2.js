let email =document.getElementById("email");
let password =document.getElementById("password");
let btn ;
let msg =document.getElementById("msg");

let username="";
if(location.href.includes("login")){
    btn=document.getElementById("btn");
btn.addEventListener("click",function(event){
    event.preventDefault(); 
    let myhttp = new XMLHttpRequest();
myhttp.open("GET", "http://localhost:3000/users",true);
myhttp.send();
//console.log(myhttp);

myhttp.addEventListener("readystatechange", () => {
if(myhttp.readyState==4){
  // console.log(myhttp.readyState);
    let x=JSON.parse(myhttp.response);
  
    let flag=0;
    for(let i=0;i<x.length;i++){
        if(x[i].dpassword == password.value && x[i].demail == email.value ){
            flag=1;
        }

    }
    if(!flag){
        msg.innerHTML="invalid email and password ";
        msg.style.color="red";
        msg.classList.remove("hidden");
    }

    else{
        /////////////////////////////////////////
        console.log("done");

        console.log(username);
        localStorage.setItem("username", username);
        window.location.replace("index.html");

        ///////////////////////////////////////
    }
}

})
})
}