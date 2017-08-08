contactApp.controller('UserController',['UserService', '$state','$rootScope', UserController]);

function UserController(UserService, $state, $rootScope){
  let vm = this;
  vm.isEditable = false;
  vm.phoneNumber = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
  vm.createUser = createUser;
  vm.findAllUsers = findAllUsers; 
  vm.editProfile = editProfile;
  vm.cancelEditProfile = cancelEditProfile
  vm.updateUser = updateUser
  
  findAllUsers();
  function createUser(){
    UserService.createUser(vm.user).then( 
        function(res){
          $state.go('login');
        },
        function(err){
           console.error(err);
        }); 
  }

   function findAllUsers(){
    UserService.findAllUsers().then( 
        function(users){
            if(users){
              vm.users = users;
            }
            else{
              vm.noUser = "No user details are here"
            } 
        },
        function(err){
           console.error(err);
        }); 
  }

  function editProfile(){
    vm.isEditable =true;
    vm.currentUser = angular.copy($rootScope.currentUser)
  }

  function cancelEditProfile(){
    vm.isEditable =false;
  }

  function updateUser(){
    console.log(vm.currentUser)
  }
}