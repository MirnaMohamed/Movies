var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var Email = document.getElementById("Email");
var number = document.getElementById("number");
var message = document.getElementById("message");
var btn = document.getElementById("submit");
// const showCardBtn = document.getElementById("showCardBtn");
var closeCardBtn = document.getElementById("closeCardBtn");
var closeCardBtn2 = document.getElementById("closeCardBtn2");
var card = document.getElementById("card");
var emptyCard = document.getElementById("emptyCard");
var userNameSpan = document.getElementById("userName");
var fnameError = document.getElementById("fnameError");
var lnameError = document.getElementById("lnameError");
var emailError = document.getElementById("emailError");
var numberError = document.getElementById("numberError");
var namePattern = /^[A-Za-z]{2,15}/;
var numberPattern = /^\d{11,20}$/;
var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

fname.addEventListener("input", (e) => {
  let checkedName = e.target.value;

  if (namePattern.test(checkedName)) {
    fnameError.classList.add("hidden");
  } else {
    fnameError.classList.remove("hidden");
  }
});
lname.addEventListener("input", (e) => {
  let checkedName = e.target.value;

  if (namePattern.test(checkedName)) {
    lnameError.classList.add("hidden");
  } else {
    lnameError.classList.remove("hidden");
  }
});
Email.addEventListener("input", (e) => {
  let checkedName = e.target.value;

  if (emailPattern.test(checkedName)) {
    emailError.classList.add("hidden");
  } else {
    emailError.classList.remove("hidden");
  }
});
number.addEventListener("input", (e) => {
  let checkedName = e.target.value;

  if (numberPattern.test(checkedName)) {
    numberError.classList.add("hidden");
  } else {
    numberError.classList.remove("hidden");
  }
});
// if (namePattern.test()) {
//   fnameError.classList.remove("hidden");
// } else {
//   fnameError.classList.add("hidden");
// }
// if (lname.value.length < 3) {
//   lnameError.classList.remove("hidden");
// } else {
//   lnameError.classList.add("hidden");
// }

// Hide the card when the close button is clicked
closeCardBtn.addEventListener("click", () => {
  card.classList.add("hidden");
});
closeCardBtn2.addEventListener("click", () => {
  emptyCard.classList.add("hidden");
});

// when clicking outside the card content
card.addEventListener("click", (event) => {
  if (event.target === card) {
    card.classList.add("hidden");
  }
});
// when clicking outside the error card content

emptyCard.addEventListener("click", (event) => {
  if (event.target === emptyCard) {
    emptyCard.classList.add("hidden");
  }
});

function sendMail() {
  var params = {
    name: fname.value + " " + lname.value,
    email: Email.value,
    message: message.value,
  };
  const serviceID = "service_v6so2s8";
  const templateID = "template_sux2rbs";
  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      fname.value = "";
      lname.value = "";
      Email.value = "";
      number.value = "";
      message.value = "";
    })
    .catch((err) => console.log(err));
}
btn.addEventListener("click", function (e) {
  e.preventDefault();
  if (emailPattern.test(Email.value)) {
    sendMail();
    setTimeout(function () {
      card.classList.remove("hidden");
      userNameSpan.textContent = fname.value + " " + lname.value; // Dynamically set the user's name
    }, 1000); // Delay for 1 second (1000 milliseconds)
  } else {
    setTimeout(function () {
      emptyCard.classList.remove("hidden");
    }, 100);
  }
});
