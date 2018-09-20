$(document).ready(function() {
    //check what page we are on and set navbar accordingly
    $(document).ready(function() {
        $('li a.active').removeClass('active');
        $('a[href="' + location.pathname + '"]').closest('li').addClass('active'); 
    })
    
    resetRegisterFields()
    $("#loginModal").on("hidden.bs.modal", function(e) {
        $("#loginForm").trigger("reset")
        $("#loginInfo").hide()
        $("#loginInfo").text("")
    })
    
    $("#charityNavLink").ready(function() {
        let name = sessionStorage.getItem("name")
        $("#charityNavLink").text(name)
    })
})

function resetRegisterFields() {
    $("#registerFormPassword").removeClass("is-invalid")
    $("#registerFormConfirmPassword").removeClass("is-invalid")
    $("#registerFormConfirmPasswordInfo").text("")
    $("#registerFormEmail").removeClass("is-invalid")
    $("#registerFormEmailInfo").text("")
}

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
            location.reload()
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

function usersLogout() {
    axios.post("/users/logout").then(function(res) {
        location.reload()
    }).catch(e => { console.log(e) })
}

function addCharity() {
    
    let userId = document.getElementById("userLabel").getAttribute("user-id");
    let name = $("#addCharityName").val()
    let amount = $("#addCharityAmount").val()
    let charity = { name, amount, userId }
    
    axios.post("/users/" + userId + "/charities/new", charity).then(function(res) {
        window.location.replace("/")
    }).catch(e => { console.log(e) })
}

function deleteCharity(index) {
    
    let userId = document.getElementById("userLabel").getAttribute("user-id");
    let charityId = document.getElementById(index).getAttribute("charity-id");
    
    axios.delete("/users/" + userId + "/charities/" + charityId).then(function(res) {
        window.location.replace("/")
    }).catch(e => { console.log(e) })
}

function updateCharity(index) {
    
    let userId = document.getElementById("userLabel").getAttribute("user-id");
    let charityId = document.getElementById(index).getAttribute("charity-id");
    let name = $("#" + index + "-name").text()
    let amount = $("#" + index + "-amount").val()
    let charity = { name, amount, userId }
    
    if(amount <= 0) {
        alert('Invalid Input')
        window.location.replace("/")
        return
    }
    
    axios.put("/users/" + userId + "/charities/" + charityId, charity).then(function(res) {
        window.location.replace("/")
    }).catch(e => { console.log(e) })
}

function navigateOrganization(ein) {
    let id = $("#charityListId").val()
    let name = $("#charityListName").val()
    sessionStorage.setItem("name", name)
    window.location.replace("/charities/" + id + "/organizations/" + ein)
}