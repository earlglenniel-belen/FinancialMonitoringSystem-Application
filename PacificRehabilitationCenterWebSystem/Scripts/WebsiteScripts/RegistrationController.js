app.controller("RegistrationController", function (PacificRehabilitationCenterWebSystemService, $scope, $filter) {

    $scope.userArray = [];

    var emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Capitalize First Letter of Name (https://medium.com/@ShariarHasan/capitalizing-strings-in-javascript-different-methods-21aed16dfbe3)
    function capitalizeName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }

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

    // REGISTER FUNCTION

    $scope.btnRegister = function () {

        // Condition #1: Fields are Empty
        if (!$scope.txtFirstName || !$scope.txtLastName || !$scope.txtEmail || !$scope.txtPassword
            || !$scope.txtConfirmPassword || !$scope.numContactNumber) {
            showError("Incomplete Form", "Please complete all fields.");

        // Condition #2: Email Not Valid (https://www.geeksforgeeks.org/javascript/how-to-validate-email-address-using-regexp-in-javascript/)
        } else if (!emailCheck.test($scope.txtEmail.trim().toLowerCase())) {
            showError("Invalid Email", "Email is not valid!");

        // Condition #3: Email Address Already Used
        } else if ($scope.userArray.some(function (user) { return user.Email === $scope.txtEmail.trim().toLowerCase(); })) {
            showError("Email Already Used", "Email address is already used!");

        // Condition #4: Password Validations (https://www.w3schools.com/howto/howto_js_password_validation.asp)

        // Condition #4.A: Password Too Short
        } else if ($scope.txtPassword.length < 8) {
            showError("Invalid Password", "Password must be at least 8 characters!");

        // Condition #4.B: Password Has No Letter
        } else if (!/[A-Za-z]/.test($scope.txtPassword)) {
            showError("Invalid Password", "Password must contain at least one letter!");

        // Condition #4.C: Password Has No Number
        } else if (!/\d/.test($scope.txtPassword)) {
            showError("Invalid Password", "Password must contain at least one number!");

        // Condition #5: Passwords Do Not Match
        } else if ($scope.txtPassword !== $scope.txtConfirmPassword) {
            showError("Passwords Do Not Match", "Passwords do not match!");

        // Condition #6: Contact Number Has Invalid Characters (Not Numbers)
        // https://www.w3schools.com/jsref/jsref_regexp_digit_non.asp
        } else if (/\D/.test($scope.numContactNumber)) {
            showError("Invalid Contact Number", "Contact number must contain digits only (no spaces or symbols)!");

        // Condition #7: Contact Number Not 10 Digits
        } else if ($scope.numContactNumber.length !== 10) {
            showError("Invalid Contact Number", "Contact number must be exactly 10 digits!");

        // Condition #8: Contact Number Already Used
        } else if ($scope.userArray.some(function (user) { return user.ContactNum === "+63 " + $scope.numContactNumber; })) {
            showError("Contact Number Already Used", "Contact number is already used!");

        // Condition #9: All Valid, Add User
        } else {
            $scope.userArray.push({
                FirstName: capitalizeName($scope.txtFirstName),
                LastName: capitalizeName($scope.txtLastName),
                Email: $scope.txtEmail.trim().toLowerCase(),
                Birthday: $scope.dateBirthday,
                ContactNum: "+63 " + $scope.numContactNumber
            });

            Swal.fire({
                title: "User Added",
                text: "You have been registered!",
                icon: "success",
                confirmButtonText: "Continue",
                confirmButtonColor: "#008C78",
                background: "#FFFFFF",
                color: "#252A30"
            });

            // Clear
            $scope.txtFirstName = "";
            $scope.txtLastName = "";
            $scope.txtEmail = "";
            $scope.txtPassword = "";
            $scope.txtConfirmPassword = "";
            $scope.dateBirthday = null;
            $scope.numContactNumber = "";
        }
    };

    // EDIT FUNCTION

    // Modal: Closed (Default)
    $scope.showEditModal = false;

    // Modal: Edit
    $scope.btnEdit = function (userIndex) {
        var editData = $scope.userArray[userIndex];

        $scope.editIndex = userIndex;
        $scope.txtEditFirstName = editData.FirstName;
        $scope.txtEditLastName = editData.LastName;
        $scope.txtEditEmail = editData.Email;
        $scope.dateEditBirthday = editData.Birthday;
        $scope.numEditContactNumber = editData.ContactNum.replace("+63 ", "");

        // Open Modal
        $scope.showEditModal = true;
    };

    // Modal: Cancel Edit
    $scope.btnCancelEdit = function () {
        $scope.showEditModal = false;
    };

    // Modal: Save Edit
    $scope.btnSaveEdit = function () {
        var editData = $scope.userArray[$scope.editIndex];

        // Condition #1: Fields are Empty
        if (!$scope.txtEditFirstName || !$scope.txtEditLastName || !$scope.txtEditEmail 
            || !$scope.dateEditBirthday || !$scope.numEditContactNumber) {
            showError("Incomplete Form", "Please complete all fields.");

        // Condition #2: Email Not Valid
        } else if (!emailCheck.test($scope.txtEditEmail.trim().toLowerCase())) {
            showError("Invalid Email", "Email is not valid!");

        // Condition #3: Email Address Already Used (by another user)
        } else if ($scope.userArray.some(function (user, index) {
            return index !== $scope.editIndex && user.Email === $scope.txtEditEmail.trim().toLowerCase();
        })) {
            showError("Email Already Used", "Email address is already used!");

        // Condition #4: Contact Number Has Invalid Characters
        } else if (/\D/.test($scope.numEditContactNumber)) {
            showError("Invalid Contact Number", "Contact number must contain digits only (no spaces or symbols)!");

        // Condition #5: Contact Number Not 10 Digits
        } else if ($scope.numEditContactNumber.length !== 10) {
            showError("Invalid Contact Number", "Contact number must be exactly 10 digits!");

        // Condition #6: Contact Number Already Used (by another user)
        } else if ($scope.userArray.some(function (user, index) {
            return index !== $scope.editIndex && user.ContactNum === "+63 " + $scope.numEditContactNumber;
        })) {
            showError("Contact Number Already Used", "Contact number is already used!");

        // Condition #7: No Changes
        } else if (editData.FirstName === capitalizeName($scope.txtEditFirstName) &&
            editData.LastName === capitalizeName($scope.txtEditLastName) &&
            editData.Email === $scope.txtEditEmail.trim().toLowerCase() &&
            editData.Birthday === $scope.dateEditBirthday &&
            editData.ContactNum === "+63 " + $scope.numEditContactNumber) {

            Swal.fire({
                title: "No Changes",
                text: "No changes found in the fields.",
                icon: "info",
                confirmButtonText: "Okay",
                confirmButtonColor: "#008C78",
                background: "#FFFFFF",
                color: "#252A30"
            });

        // Condition #8: All Valid, Save Changes
        } else {

            editData.FirstName = capitalizeName($scope.txtEditFirstName);
            editData.LastName = capitalizeName($scope.txtEditLastName);
            editData.Email = $scope.txtEditEmail.trim().toLowerCase();
            editData.Birthday = $scope.dateEditBirthday;
            editData.ContactNum = "+63 " + $scope.numEditContactNumber;

            // Close Modal
            $scope.btnCancelEdit();

            Swal.fire({
                title: "User Updated",
                text: "The record has been updated!",
                icon: "success",
                confirmButtonText: "Continue",
                confirmButtonColor: "#008C78",
                background: "#FFFFFF",
                color: "#252A30"
            });
        }
    };

    // DELETE FUNCTION

    $scope.btnDelete = function (userIndex) {

        Swal.fire({
            title: "Delete this record?",
            text: "You won't be able to undo this action.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            customClass: {
                confirmButton: "delete-confirm-button"
            },
            cancelButtonColor: "#757575",
            background: "#FFFFFF",
            color: "#252A30"
        }).then(function (result) {

            if (result.isConfirmed) {
                $scope.$applyAsync(function () {
                    $scope.userArray.splice(userIndex, 1);
                });
            }

        });
    };

});