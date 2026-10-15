app.service("PacificRehabilitationCenterWebSystemService", function ($http) {

    this.openMessage = function () {
        return $http.get("/MainPages/WelcomeMessage");
    }

});