function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

$(document).ready(function () {
    $('form').submit(function (event) {
        event.preventDefault(); // Prevent form from reloading the page

        let errormsg = '';
        let missingField = '';

        // Clear previous messages
        $('#error').html('').hide();
        $('#success').html('').hide();

        // Check for empty fields
        if (!$('#email').val()) {
            missingField += "<p>Email ID is not filled</p>";
        }
        if (!$('#phone').val()) {
            missingField += "<p>Phone Number is not filled</p>";
        }
        if (!$('#pw').val()) {
            missingField += "<p>Password is not filled</p>";
        }
        if (!$('#confirmpw').val()) {
            missingField += "<p>Confirm Password is not filled</p>";
        }

        if (missingField !== '') {
            $('#error').html(missingField).show();
            return;
        }

        // Validate format
        if (!isEmail($('#email').val())) {
            errormsg += "<p>Email ID is not valid</p>";
        }
        if (!$.isNumeric($('#phone').val())) {
            errormsg += "<p>Phone Number is not valid</p>";
        }
        if ($('#pw').val() !== $('#confirmpw').val()) {
            errormsg += "<p>Passwords do not match</p>";
        }

        if (errormsg === '') {
            $('#success').html('<p style="color: green;">You are registered successfully.</p>').show();
            $('#error').hide();

            // Optional: Reset form fields
            $('form')[0].reset();
        } else {
            $('#error').html(errormsg).show();
            $('#success').hide();
        }
    });
});
