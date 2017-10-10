function alertInfoWinInit(content){
	$.messager.show({
				title:'信息提示',
				msg:content,
				showType:'fade',
				timeout:0,
				style:{
					right:'',
					bottom:''
				}
			});

}

/*
 * 带有确定和取消按钮的信息提示窗口
 * 	content：提示信息
 *  点击确定按钮时做的操作：sureFunction:
 *  点击取消按钮时做的操作：cancleFunction
 * 	
 */
function alertSureWinInit(content,sureFunction,cancleFunction){
	$.messager.confirm('提示信息', content, function(r){
		if (r){
		    sureFunction();
		}
		else
		{
			cancleFunction();
		}
	});

}


/*
 * 显示或者关闭正在加载提示窗口
 * showWin:显示或者关闭窗口，true代表显示，false代表关闭
 * */
function loadingWinInit(showWin){
	if(showWin){
		var loadingDiv = "<div id='loadingDiv' style='z-index:9000;background-color:#CCCCCC;opacity:0.5;width:100%;height:100%;position:absolute;top:0px;left:0px'>"+
				 		"<img id='loadingClose' src='jfinal-easyui/../static/images/close.png' style='position:absolute;top:0px;right:0px;cursor: pointer;'/>"+
				 		"<img src='jfinal-easyui/../static/images/loading.gif' style='position:absolute;top:49%;left:49%;opacity:1'/>"+
				 		"<span style='position:absolute;top:55%;left:46%;font-family: 微软雅黑;font-size:14px;opacity:1'>正在加载，请稍等...</span>"
					 +"</div>";
		
		$("body").append(loadingDiv);
		$("#loadingDiv #loadingClose").click(function(){
			//点击关闭按钮时，关闭提示页面
			$("#loadingDiv").remove();
		});
	}
	else
	{
		$("#loadingDiv").remove();
	}
}
