$(document).ready(function() {
    $("#loginModal").on("hidden.bs.modal", function(e) {
        $("#loginForm").trigger("reset")
        $("#loginInfo").hide()
        $("#loginInfo").text("")
    })
})

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
    let formElements = document.getElementById("loginForm").elements;
    var user = {};
    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].type != "submit") //we dont want to include the submit-buttom
            user[formElements[i].name] = formElements[i].value;
    }
    
    axios.post("/users/login", user).then(function(res) {
        if(res.data.reason) {
            $("#loginInfo").text(res.data.reason)
            $("#loginInfo").show()
            setTimeout(function() {
                $("#loginInfo").hide()
                $("#loginInfo").text("")
            }, 3500)
        } else {
            $("#loginInfo").hide()
            window.location.replace("/")
        }
    }).catch(e => { console.log(e) })
}