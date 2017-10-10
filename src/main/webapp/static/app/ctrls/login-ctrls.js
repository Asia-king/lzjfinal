var expo,modu;
MainApp.controller('LoginCtrls', [ '$scope', function($scope) {
	expo=$scope.exponent;
	modu=$scope.modulus;
	$scope.go=function(){
		var k = RSAUtils.getKeyPair( $scope.exponent,'',$scope.modulus);
		var k2 = "name=" + $scope.username + "&pwd=" + $scope.pwd;
		//alert(k2);
		//alert($scope.exponent);
		//alert($scope.modulus);
		$scope.key= RSAUtils.encryptedString(k, k2);
		//alert($scope.key);
		return true;
	};
	//alert(expo);
	//alert(modu);

} ]);

function login(username,passwd){
	
	var k = RSAUtils.getKeyPair(expo,'',modu);
	var k2 = "name=" + username + "&pwd=" + passwd;
	var key=RSAUtils.encryptedString(k, k2);
	AndroidWebView.Login(key);
}