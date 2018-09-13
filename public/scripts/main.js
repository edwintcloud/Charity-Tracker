$(document).ready(function() {
    $('#loginModal').on('hidden.bs.modal', function() {
        $('#loginModalEmail').val('')
        $('#loginModalPassword').val('')
        
    })
})
function registerUser() {
    alert('User was created (not really)')
}