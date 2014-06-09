var ATutorAPI = ATutorAPI || {};

(function (api, $) {
    $("#login-button").click(function (event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://localhost/ATutor/api/login/",
            data: {
                "username": $("#login").val(),
                "password": $("#password").val()
            },
            success: function (response) {
                response = JSON.parse(response);
                if (response.errorMessage) {
                    alert("Error: " + response.errorMessage);
                } else if (response.access_token) {
                    alert("Logged in. Access Token: " + response.access_token);
                }
            }
        });
    });
})(ATutorAPI, jQuery);