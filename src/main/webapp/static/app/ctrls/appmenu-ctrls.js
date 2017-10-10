/**
 * Created by apple on 16/1/15.
 */
MainApp.controller('AppMenuCtrls', [ '$scope', function($scope) {

    $scope.goresapp=function(){
        //alert(PATH);
        location.replace(PATH+'/appres');
        //alert($scope.username);
    }
    $scope.goomeapp=function(){
        //alert(PATH);
        location.replace(PATH+'/appome');
        //alert($scope.username);
    }
    $scope.goeveapp=function(){
        //alert(PATH);
        location.replace(PATH+'/appeve');
        //alert($scope.username);
    }
    $scope.goeulapp=function(){
        //alert(PATH);
        location.replace(PATH+'/appeul');
        //alert($scope.username);
    }
    $scope.goauxapp=function(){
        //alert(PATH);
        location.replace(PATH+'/appaux');
        //alert($scope.username);
    }
    $scope.gosetapp=function(){
        //alert(PATH);
        location.replace(PATH+'/appset');
        //alert($scope.username);
    }
    
    //退出系统
    $scope.homelogout = function(){
    	location.replace(PATH+'/loginOut');
    }

} ]);