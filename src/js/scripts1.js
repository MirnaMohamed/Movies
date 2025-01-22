var username=document.getElementById("username");
var pUser=document.getElementById("pUser");
var email =document.getElementById("email");
var pEmail=document.getElementById("pEmail");
var pass =document.getElementById("pass");
var pPass=document.getElementById("pPass");
var confirm =document.getElementById("confirm");
var pcon=document.getElementById("pcon");
var msglogin=document.getElementById("msglogin");

var btn_reg =document.getElementById("regButton");

function isValidUsername(n){
    const usernameRegex=/^[A-za-z][A-za-z0-9.-_]{1,20}$/;
    if( usernameRegex.test(n)){
        console.log("done");
    pUser.innerText = "Valid username";
      pUser.style.color = "green";
      pUser.classList.remove("hidden");
      return 1;
    } else {
        pUser.innerText =
          " Must start with a letter and be 2-20 characters long.";
        pUser.style.color = "red";
        pUser.classList.remove("hidden"); // Show feedback
        return 0;
    }
}

function isValidEmail(n){

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailRegex.test(n)){
        pEmail.style.color="green";
        pEmail.classList.remove("hidden");
        pEmail.innerText="Valid email";
        return 1;
    }
    else{
        pEmail.style.color="red";
        pEmail.classList.remove("hidden");
        pEmail.innerText="Not valid email";
        return 0;
    }
}
function isValidpass(n){
    const passRegex=/^[A-za-z0-9.-_]{7,}$/;
    if( passRegex.test(n)){
       
        pPass.innerText = "Valid username";
        pPass.style.color = "green";
        pPass.classList.remove("hidden");
        return 1;
    } else {
        pPass.innerText =
          " Must  be 7 characters or more.";
          pPass.style.color = "red";
          pPass.classList.remove("hidden");
          return 0;
    }
}


username.addEventListener("input", 
    () => isValidUsername(username.value));

email.addEventListener("input", 
        () => isValidEmail(email.value));

pass.addEventListener("input", 
    () => isValidpass(pass.value));  

confirm.addEventListener("input",function(){
    pcon.classList.add("hidden");
})    

function checkPasswordsMatch(password, confirmPassword) {
    if (password === confirmPassword)return 1;
    return 0;
}
   

function emailExists(callback) {
    const myhttpg = new XMLHttpRequest();
    myhttpg.open("GET", "http://localhost:3000/users", true);
    myhttpg.send();

    myhttpg.addEventListener("readystatechange", () => {
        if (myhttpg.readyState === 4) {
            if (myhttpg.status === 200) {
                try {
                    if (!myhttpg.response) {
                        throw new Error("Empty response from server");
                    }

                    const users = JSON.parse(myhttpg.response);
                    if (!Array.isArray(users)) {
                        throw new Error("Invalid response format");
                    }

                    // Check if the email exists
                    for (let user of users) {
                        if (user.demail === email.value) {
                            pEmail.style.color = "red";
                            pEmail.classList.remove("hidden");
                            pEmail.innerText = "Email already exists";

                            msglogin.style.color = "red";
                            msglogin.classList.remove("hidden");
                            msglogin.innerText = "Email already exists. You can log in or change the email.";
                            callback(true);
                            return;
                        }
                    }

                    // Email does not exist
                    callback(false);
                } catch (error) {
                    console.error("Error processing response:", error);
                    alert("Error validating email. Please try again later.");
                    callback(true); // Assume failure to prevent registration
                }
            } else {
                console.error("Error fetching users:", myhttpg.status);
                alert("Server error. Unable to validate email. Please try again later.");
                callback(true); // Assume failure to prevent registration
            }
        }
    });
}


function registerUser() {
    const newUser = {
        dusername: username.value,
        demail: email.value,
        dpassword: pass.value,
    };

    const myhttp = new XMLHttpRequest();
    myhttp.open("POST", "http://localhost:3000/users", true);
    myhttp.setRequestHeader("Content-Type", "application/json");

    myhttp.send(JSON.stringify(newUser));

    myhttp.addEventListener("readystatechange", () => {
        if (myhttp.readyState === 4) {
            if (myhttp.status === 201) {
                alert("User registered successfully!");
            } else {
                console.error("Error registering user:", myhttp.responseText);
                alert("Failed to register user.");
            }
        }
    });
}

// Updated btn_reg Click Event
btn_reg.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent page refresh

    if (!checkPasswordsMatch(pass.value, confirm.value)) {
        pcon.style.color="red";
        pcon.classList.remove("hidden");
        pcon.innerText="Not match password ";
        alert("Passwords do not match!");
        return;
    }

   if ( !isValidUsername(username.value) ||
        !isValidEmail(email.value) ||
        !isValidpass(pass.value) ||
        !checkPasswordsMatch(pass.value, confirm.value)
    ) {
        alert("Please fill out all fields correctly.");
        return;
    }

    

    emailExists((exists) => {
        if (exists) {
            alert("Email already exists. you can login now or change email");
            return;
        }

        registerUser();
    });
});
