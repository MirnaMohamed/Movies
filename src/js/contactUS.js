var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var Email = document.getElementById("Email");
var number = document.getElementById("number");
var message = document.getElementById("message");
var btn = document.getElementById("submit");
btn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(fname.value);
  console.log(lname.value);
  console.log(Email.value);
  console.log(number.value);
  console.log(message.value);
});
