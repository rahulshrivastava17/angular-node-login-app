contactApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise('/login');

		$stateProvider.state('login',{
			url:'/login',
	            templateUrl: 'partials/login.html',
	            controller: 'MainController as vm'
		})

		.state('signUp',{
			url:'/signUp',
            templateUrl: 'partials/admin/create_user.html',
            controller: 'UserController as vm'     
		})

		.state('profile',{
			url:'/profile',
            templateUrl: 'partials/profile.html',
            controller: 'UserController as vm'
		})

		.state('profile.userProfile',{
			url:'/userProfile',
            templateUrl: 'partials/user_profile.html',
            controller: 'UserController as vm'
		})

		.state('profile.changePassword',{
			url:'/changePassword',
            templateUrl: 'partials/change_password.html',
            controller: 'UserController as vm'
		})

		.state('profile.editProfile',{
			url:'/editProfile',
            templateUrl: 'partials/edit_profile.html',
            controller: 'UserController as vm'
		})

		.state('updateUser',{
			url:'/updateUser',
            templateUrl: 'partials/admin/create_user.html',
            controller: 'UserController as vm'     
		})

		.state('userList',{
			url:'/userList',
            templateUrl: 'partials/admin/user_list.html',
            controller: 'UserController as vm'
		})

}]);