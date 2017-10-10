/*
 * 评估报告模块
 */
MainApp.controller("asseRepoCtrls", ["$scope", function($scope) {
	$scope.asseRepoModuleInit = function() {
		
	}

	$("#export_report_button").click(function(){
			ExpHtmlToWord("mapContainerDiv");
		})
	$("#print_report_button").click(function(){
		//mapToImg1(map);
		createPrintMap("mapContainerDiv");
		})

	function  ExpHtmlToWord(eDiv)
	 {
		 alert("a");
		 var  oWD  =   new  ActiveXObject( " Word.Application " );
		 var  oDC  =  oWD.Documents.Add( "" , 0 , 1 );
		    var  oRange  = oDC.Range( 0 , 1 );
		    var  sel  =  document.body.createTextRange();
		   sel.moveToElementText(eDiv);
		   sel.select();
		   sel.execCommand( " Copy " );
		   oRange.Paste();
		   oWD.Application.Visible  =   true ;
	 }


}]);


