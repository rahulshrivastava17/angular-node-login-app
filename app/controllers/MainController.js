contactApp.controller('MainController',['AuthenticateService', '$resource', '$http', '$rootScope', '$state',
    '$localStorage', MainController]);

function MainController(AuthenticateService, $resource, $http, $rootScope, $state, $localStorage){
	let vm = this;
	vm.login = login;
   
	function login(){
        var credentials =  {"emailId":vm.credentials.emailId,"password":vm.credentials.password}
		AuthenticateService.loginUser(credentials).then(
        function(res){
           // login successful if there's a token in the response
            if (res.token) {
                // store username and token in local storage to keep user logged in between page refreshes
                $localStorage.currentUser = {firstName: res.firstName, lastName: res.lastName, contactNo: res.contactNo, 
                                            emailId: res.emailId, token: res.token};
                 $state.go('profile.userProfile');
            }
             else {
                vm.error = 'Username or password is incorrect';
                vm.loading = false;
            }
        },
        function(err){
           console.error("err "+err);
        }); 
	}

    // function logout() {
    //     // remove user from local storage and clear http auth header
    //     $localStorage.$reset();
    //     $http.defaults.headers.common.Authorization = '';
    // }
}