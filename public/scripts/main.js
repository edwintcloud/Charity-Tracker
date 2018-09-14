$(document).ready(function() {
    $("#loginModal").on("hidden.bs.modal", function(e) {
        $("#loginForm").trigger("reset")
    })
})
function registerUser() {
    var formElements = document.getElementById("register-form").elements;
    var user = {};
    var formFilled = true,
        passwordsMatch = false;
    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].type != "submit") //we dont want to include the submit-buttom
            user[formElements[i].name] = formElements[i].value;
    }
    
    //==========FORM CHECKS==========
    for (var value in user) {
        if(user[value] == "")
            formFilled = false;
    }
    if(!formFilled) {
        alert("Something was left blank.. how did you do that?!?");
        return;
    }
    if(user['password'] == user['passwordConfirm']) {
        passwordsMatch = true;
    } else {
        alert("The passwords must match!");
        return;
    }

    axios.post("/users/new", user).then(function(response) {
        console.log(response)
    })
}