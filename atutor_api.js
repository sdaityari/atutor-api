var ATutorAPI = ATutorAPI || {};

var ATutorData = localStorage.getItem("ATutorData") || {};

(function (api, data, $) {

    var constants = {
        "urls" : {
            "base" : "http://localhost/ATutor/",
            "login" : "api/login/"
        }, "selectors" : {
            "login" : $("#login"),
            "password" : $("#password"),
            "loginButton" : $("#login-button")
        }, "accessLevels" : {
            "1": "ADMIN_ACCESS_LEVEL",
            "2": "INSTRUCTOR_ACCESS_LEVEL",
            "3": "STUDENT_ACCESS_LEVEL",
            "4": "TOKEN_ACCESS_LEVEL",
            "5": "PUBLIC_ACCESS_LEVEL"
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
                console.log(response);
                if (response.errorMessage) {
                    // Assuming some error occurred
                    alert("Error: " + response.errorMessage);
                } else if (response.access_token) {
                    // On successful login
                    console.log(response);
                    data.accessToken = response.access_token;
                    data.memberID = response.member_id;
                    data.accessLevel = response.access_level;

                    // Setting item in localStorage
                    localStorage.setItem("ATutorData", data);

                    // Show some URLs
                    showUrls(response.access_level);
                }
            }
        });
    });

    var showUrls = function(accessLevel) {
        var selectorsToShow = {
                "ADMIN_ACCESS_LEVEL" : ".admin",
                "INSTRUCTOR_ACCESS_LEVEL" : ".instructor",
                "STUDENT_ACCESS_LEVEL" : ".student"
            }, accessLevel = constants.accessLevels[accessLevel];
            console.log(selectorsToShow[accessLevel]);
            $(selectorsToShow[accessLevel]).show();

    }

})(ATutorAPI, ATutorData, jQuery);
