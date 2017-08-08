let contactApp = angular.module('contactApp', ['ui.router', 'ngResource','ngStorage','angular-jwt']);
contactApp.run(run);

 function run($rootScope, $http, $location, $localStorage, jwtHelper) { 
 	// keep user logged in after page refresh
    if ($localStorage.currentUser) {
        if(jwtHelper.isTokenExpired($localStorage.currentUser.token)){
            $rootScope.userName ="";
            $location.path('/login');
        }
         $http.defaults.headers.common.authorization = $localStorage.currentUser.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) { 
        if($localStorage.currentUser){
             $rootScope.userName = $localStorage.currentUser.firstName + " " + $localStorage.currentUser.lastName
             $rootScope.currentUser = {
                                        firstName :$localStorage.currentUser.firstName,
                                        lastName :$localStorage.currentUser.lastName,
                                        emailId :$localStorage.currentUser.emailId,
                                        contactNo :$localStorage.currentUser.contactNo || "Not Provided"
                                    }
        }
        let publicPages = ['/login', '/signUp'];
        let restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $rootScope.userName ="";
            $location.path('/login');
        }
    });

    $rootScope.logout = function() {
        // remove user from local storage and clear http auth header
        $localStorage.$reset();
        $http.defaults.headers.common.Authorization = '';
    }
}	