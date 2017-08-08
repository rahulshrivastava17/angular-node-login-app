 contactApp.factory('AuthenticateService',['$resource', AuthenticateService]);

function AuthenticateService($resource, $base64){

    let LoginResource = $resource("http://localhost:3000/api/login");
    let serviceObject = {}

    serviceObject.loginUser = function (credentials, callback){
        return LoginResource.save({}, {emailId: credentials.emailId, password: credentials.password}).$promise; 
    }
    return serviceObject;  
}