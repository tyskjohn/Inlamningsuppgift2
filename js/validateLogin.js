$(function () {

    //login funktion
    if ($("#login-form").length) {
        var request = new XMLHttpRequest();
        request.onload = function () {
            if (this.readyState == 4 && this.status == 200) {
                var object = JSON.parse(this.response);

                $("#login-form").submit(function (event) {
                    event.preventDefault();

                    let username = $("#inputEmail").val();
                    let password = $("#inputPassword").val();

                    if (username === object.email && password === object.password) {
                        window.location.href = "index.html";
                    } else {
                        $("input").addClass("is-invalid");
                        // $("body").prepend(`<div id="alert-box"><div class="position-absolute w-100 alert alert-danger text-center" role="alert">Incorrect Username or password</div></div>`);
                        // $("#alert-box").fadeIn("fast").delay(3000).fadeOut("slow");
                    }
                });
            }
        };
        request.open("GET", "https://fe18.azurewebsites.net/api/user", true);
        request.send();
    };


    $("form input").blur(function () {
        validateFormElements($(this));
    });

    function validateFormElements(input) {
        let min = 2;

        // input type EMAIL
        if ($(input).data("id") === "email" && $(input).prop("required")) {
            validateEmail(input);
        }

        // input type PASSWORD
        if($(input).attr("type") === "password" && $(input).prop("required")) {
            
            min = 1;
            validateInputValue(input, `Must contain atleast ${min} characters`, min);
        }
    }

    //
    function validateInputValue(input, error, min = 1, max = 4096) {
        let invalidFeedbackId = "#" + $(input).attr("id") + "-invalid-feedback";
        let invalidFeedbackDefault = $(invalidFeedbackId).html();
        let invalidFeedback = error;

        if(!$(input).val()) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedbackDefault);
        } else if ($(input).val().length < min ) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedback);
        } else {
            isValid(input);
        }
    }

    // validerar om e-postadressen är gilitg med hjälp av regular expression, och skriver ut felmeddelande (värdet på variabeln invalidFeedback).
    function validateEmail(input) {
        let invalidFeedbackId = "#" + $(input).attr("id") + "-invalid-feedback";
        let invalidFeedbackDefault = $(invalidFeedbackId).html();
        let invalidFeedback = "The email address you entered is not valid";
        let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;

        if(!$(input).val()) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedbackDefault);
        } else if(!regex.test($(input).val() )) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedback);
        } else {
            isValid(input);
        }
    }

    // validerar lösenord
    function validatePassword(input, compareWith) {
        let min = 8;
        let invalidFeedbackId = input + "-invalid-feedback";
        let invalidFeedbackDefault = $(invalidFeedbackId).html();
        let invalidFeedback = "Password doesn't match each other";
        let result = ($(input).val() === $(compareWith).val()) ? true : false;

        if(!$(input).val()) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedbackDefault);

        } else if(!result) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedback);

        } else if($(input).val().length < min ) {
            validateInputValue(input, `Must contain atleast ${min} characters`, min);

        } else {
            isValid(input);
        }
    }

    // lägger till klassen is-valid och tar bort is-invalid
    function isValid(element, validClass = "is-valid", invalidClass= "is-invalid") {
        $(element).addClass(validClass);
        $(element).removeClass(invalidClass);
    }

    // lägger till klassen is-invalid och tar bort is-valid
    function isInvalid(element, validClass = "is-valid", invalidClass= "is-invalid") {
        $(element).addClass(invalidClass);
        $(element).removeClass(validClass);
    }

});