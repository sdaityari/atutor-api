var ATutorAPI = ATutorAPI || {};

(function (api, $) {

    var constants = {
        "urls" : {
            "base" : "http://localhost/ATutor/",
            "login" : "api/login/"
        }, "selectors" : {
            "login" : $("#login"),
            "password" : $("#password"),
            "loginButton" : $("#login-button")
        }
    }, accessToken;

    constants.selectors.loginButton.click(function (event) {
        // Prevent form submit
        event.preventDefault();

        $.ajax({
            type: "POST",
            url: constants.urls.base + constants.urls.login,
            data: {
                "username": constants.selectors.login.val(),
                "password": constants.selectors.password.val()
            },
            success: function (response) {
                response = JSON.parse(response);
                if (response.errorMessage) {
                    // Assuming some error occurred
                    alert("Error: " + response.errorMessage);
                } else if (response.access_token) {
                    // On successful login
                    accessToken = response.access_token;
                    alert("Logged in successfully.");
                }
            }
        });
    });
})(ATutorAPI, jQuery);