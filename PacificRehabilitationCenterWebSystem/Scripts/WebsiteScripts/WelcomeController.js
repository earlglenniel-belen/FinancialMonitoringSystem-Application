app.controller("WelcomeController", function (PacificRehabilitationCenterWebSystemService, $scope) {

    $scope.welcomeMessage = function () {
        var getData = PacificRehabilitationCenterWebSystemService.openMessage();
        getData.then(function (message) {

            Swal.fire({
                title: message.data,
                text: "Providing quality rehabilitation services focused on improving every patient's health, independence, and quality of life. We are committed to delivering compassionate, personalized care throughout recovery.",
                theme: "material-ui",
                confirmButtonText: "Continue",
                confirmButtonColor: "#008C78",
                background: "#FFFFFF",
                color: "#252A30",
                imageUrl: "/Content/PRCLogo.png",
                imageWidth: 330,
                imageHeight: 300,
                padding: 30,
                imageAlt: "Pacific Rehabilitation Center logo"
            });

        });
    }

});