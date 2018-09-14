$(document).ready(function() {
    resetRegisterFields()
    $("#loginModal").on("hidden.bs.modal", function(e) {
        $("#loginForm").trigger("reset")
        $("#loginInfo").hide()
        $("#loginInfo").text("")
    })
    
    //Below is code for registration form validation
    
})
function resetRegisterFields() {
    $("#registerFormPassword").removeClass("is-invalid")
    $("#registerFormConfirmPassword").removeClass("is-invalid")
    $("#registerFormConfirmPasswordInfo").text("")
    $("#registerFormEmail").removeClass("is-invalid")
    $("#registerFormEmailInfo").text("")
}

$('input').bind('input propertychange', function() {
    comparePasswords()
});

function usersLogin() {
    let formElements = document.getElementById("loginForm").elements;
    var user = {};
    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].type != "submit") //we dont want to include the submit-buttom
            user[formElements[i].name] = formElements[i].value;
    }
    
    axios.post("/users/login", user).then(function(res) {
        if(res.data.reason) {
            $("#loginPassword").val("")
            $("#loginInfo").text(res.data.reason)
            $("#loginInfo").show()
        } else {
            $("#loginInfo").hide()
            window.location.replace("/")
        }
    }).catch(e => { console.log(e) })
}

function usersRegister() {
    let formElements = document.getElementById("registerForm").elements;
    var user = {};
    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].type != "submit") //we dont want to include the submit-buttom
            user[formElements[i].name] = formElements[i].value;
    }
    
    if(user['password'] != user['passwordConfirm']) {
        $("#registerFormPassword").val("")
        $("#registerFormConfirmPassword").val("")
        $("#registerFormPassword").addClass("is-invalid")
        $("#registerFormConfirmPassword").addClass("is-invalid")
        $("#registerFormConfirmPasswordInfo").text("Passwords must match!")
        return 
    }

    axios.post("/users/new", user).then(function(res) {
        if(res.data.reason) {
            $("#registerFormEmail").addClass("is-invalid")
            $("#registerFormEmailInfo").text(res.data.reason)
        } else {
            window.location.replace("/")
        }
    }).catch(e => { console.log(e) })
}