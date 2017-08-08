 contactApp.factory('UserService',['$resource', '$localStorage', UserService]);

function UserService($resource,  $localStorage){

    let serviceObject = {}
    let User = $resource("http://localhost:3000/api/users");

    serviceObject.createUser = function (user, callback){
        return User.save({}, user).$promise; //this promise will be fulfilled when the response is retrieved for this call
    }

    serviceObject.updateUser = function (user, callback){
        return User.save({}, user).$promise; 
    }

    serviceObject.findAllUsers = function (){ 
        return User.query().$promise;
    }

    serviceObject.deleteUser = function (user, callback){
        return UserResource.save({}, user).$promise; 
    }

    serviceObject.findById = function(id){
    	User.get().$promice;
    }

    return serviceObject;  
}