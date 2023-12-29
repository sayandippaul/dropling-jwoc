


const pass_field = document.querySelector('.pass-key');
const showBtn = document.querySelector('.show');
showBtn.addEventListener('click', function(){
 if(pass_field.type === "password"){
   pass_field.type = "text";
   showBtn.textContent = "HIDE";
   showBtn.style.color = "#3498db";
 }else{
   pass_field.type = "password";
   showBtn.textContent = "SHOW";
   showBtn.style.color = "#222";
 }
});

function showotpfield(name,pass,email,dp,otp){
let otpgivenbyuser = prompt("Please enter  otp sent to mail", "XXXX");
// {{!-- let otpgivenbyuser=document.getElementById("").value; --}}
if(otp==otpgivenbyuser){




      var ds = { name:name,pass:pass,email:email,dp:dp };
console.log(ds);

fetch(url+"/registernew", {
method: "POST",
headers: {
Accept: "application/json",
"Content-Type": "application/json",
"Access-Control-Allow-Headers": "Content-Type",
"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
"Access-Control-Allow-Origin": "*",
},
body: JSON.stringify(ds),
})

.then((res) => res.json())
.then((data) => {
console.log(data);
if(data!=null){

alert("welcome "+data.username);
localStorage.setItem("username",data.username);
localStorage.setItem("email",data.email);
localStorage.setItem("about",data.about);
localStorage.setItem("userid",data.userid);
localStorage.setItem("dp",data.dp);

localStorage.setItem("scrollvalue",1);
localStorage.setItem("soundvalue",1);
window.location.replace("contact");
}
else{
alert("email already exists");
window.location.replace("login");
}

})
.catch((err) => console.log(err));

}
else {

if(otpgivenbyuser==null){

showotpfield(name,pass,email,dp,otp); 
}
else{
alert("Wrong Otp Entered");
      }

}

}
function sendmail(name,email,otp) {
      var user = { name:name,email:email,otp:otp };

fetch(url+"/sendmailreg", {
method: "POST",
headers: {
 Accept: "application/json",
 "Content-Type": "application/json",
 "Access-Control-Allow-Headers": "Content-Type",
 "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
 "Access-Control-Allow-Origin": "*",
},
body: JSON.stringify(user),
})
.then((res) => res.json())
.then((data) => { })
.catch((err) => console.log(err));
}

function submitd(){
   event.preventDefault();
   var name=document.getElementById("name").value;
   var email=document.getElementById("email").value;
   var pass=document.getElementById("pass").value;


let otp = Math.floor((Math.random() * 10000) + 1); 
sendmail(name,email,otp);
showotpfield(name,pass,email,dp,otp); 
}

function isloggedin(){
var l=localStorage.getItem("userid");
if(l==undefined || l=="null" || l==0){

}
else{
window.location.replace("contact");
}
} 
isloggedin();   



var dp=1;

var totaldp=30;
function showalldp(){
var alldp="";

for(var i=1;i<=totaldp;i++){
alldp=alldp+`
<img onclick="setdp(`+i+`)" id="dp`+i+`" src="dp/dp`+i+`.png" alt="dp/`+i+`.png">

`;
}
document.getElementById("showdp").innerHTML=alldp;

for(var i=2;i<=totaldp;i++){
document.getElementById("dp"+i).style.borderColor="white";
}
document.getElementById("dp"+1).style.borderColor="yellow";

}
showalldp();

function setdp(a){
dp=a;

for(var i=1;i<=6;i++){

document.getElementById("dp"+i).style.borderColor="white";
}
document.getElementById("dp"+a).style.borderColor="Yellow";

}



function setCookie() {
document.cookie = 'g_state = {"i_l":0}' ;
}
setCookie();


function handleCredentialResponse(response){
 console.log(response);
 if(response.credential){
   let jwt=response.credential;
   let user=JSON.parse(atob(jwt.split(".")[1]));
   console.log(user.email)
   document.getElementById("email").value=user.email;
   document.getElementById("name").value=user.given_name;

 }
}

function init(){
setCookie();

 google.accounts.id.initialize({
   client_id:"31628992962-m5n46j7rb9to747vgnufnn0ks2clb3je.apps.googleusercontent.com",
   auto_select:false,
   callback:handleCredentialResponse
 })
 google.accounts.id.prompt()

}



