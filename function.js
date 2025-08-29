function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

$(document).ready(function () {

    // 👇 Allow only numbers and max 10 digits
    $("#phone").on("input", function () {
        this.value = this.value.replace(/\D/g, ""); // remove non-digits
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10); // trim to 10 digits
        }
    });

    // 👇 Show/Hide Password toggle
    $(".toggle-password").on("click", function () {
        let pwField = $("#pw");
        let confirmField = $("#confirmpw");

        if (pwField.attr("type") === "password") {
            pwField.attr("type", "text");
            confirmField.attr("type", "text");
            $(".toggle-password").text("Hide"); // change all buttons text
        } else {
            pwField.attr("type", "password");
            confirmField.attr("type", "password");
            $(".toggle-password").text("Show");
        }
    });

    // 👇 Validation on submit
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

        // Validate email format
        if (!isEmail($('#email').val())) {
            errormsg += "<p>Email ID is not valid</p>";
        }

        // ✅ Phone validation (must be exactly 10 digits now)
        let phoneVal = $('#phone').val();
        if (phoneVal.length !== 10) {
            errormsg += "<p>Phone Number must be exactly 10 digits</p>";
        }

        // Validate password match
        if ($('#pw').val() !== $('#confirmpw').val()) {
            errormsg += "<p>Passwords do not match</p>";
        }

        // Final output
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
