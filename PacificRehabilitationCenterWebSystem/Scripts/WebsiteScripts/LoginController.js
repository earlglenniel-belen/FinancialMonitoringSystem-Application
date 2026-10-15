app.controller("LoginController", function (PacificRehabilitationCenterWebSystemService, $scope) {

    // Function: Error Message
    function showError(title, text) {
        Swal.fire({
            title: title,
            text: text,
            icon: "error",
            theme: "material-ui",
            confirmButtonText: "Try Again",
            confirmButtonColor: "#008C78",
            background: "#FFFFFF",
            color: "#252A30"
        });
    }

    // Button #1: Submit
    $scope.btnSubmit = function () {

        let emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Condition #1: Both Fields are Empty
        if (!$scope.txtEmail && !$scope.txtPassword) {
            showError("Incomplete Form", "Both fields are empty!");

        // Condition #2: Email is Empty
        } else if (!$scope.txtEmail) {
            showError("Email Required", "Email is empty!");

        // Condition #3: Password is Empty
        } else if (!$scope.txtPassword) {
            showError("Password Required", "Password is empty!");

        // Condition #4: Email Validation (https://www.geeksforgeeks.org/javascript/how-to-validate-email-address-using-regexp-in-javascript/)
        } else if (!emailCheck.test($scope.txtEmail)) {
            showError("Invalid Email", "Email is not valid!");

        // Condition #5: Invalid Credentials
        } else if ($scope.txtEmail === "egbelen@email.com" && $scope.txtPassword !== "password") {
            showError("Invalid User Credentials", "Please check your password.");

        // Condition #6: Correct Password (No Database Validation)
        } else if ($scope.txtEmail === "egbelen@email.com" && $scope.txtPassword === "password") {

            Swal.fire({
                title: "Welcome, Earl!",
                text: "You have successfully logged in.",
                icon: "success",
                theme: "material-ui",
                confirmButtonText: "Continue",
                confirmButtonColor: "#008C78",
                background: "#FFFFFF",
                color: "#252A30"
            }).then(function (result) {
                if (result.isConfirmed) {
                    window.location.href = "/MainPages/Index";
                }
            });

            // Condition #7: No User Found
        } else {
            showError("User Not Found", "No account was found with that email address.");
        }

    };

    // Button #2: Clear
    $scope.btnClear = function () {

        $scope.txtEmail = "";
        $scope.txtPassword = "";

    };

});