//定义一个全局变量，用来标识当前是哪一类上报事件信息的审核
var sr_eventCheck_url = "";

MainApp.controller('seisRegCtrls', [ '$scope', function($scope) {
	//地图上画点控件
	var pinfo_drawPoint;
	//要上报的事件的对象
	var pinfo_obiect = {};
	
	//震情管理模块页面初始化
	$scope.seisRegModuleInit = function(){
		
	};
	
	//震后灾情信息
	$scope.srDisasterEvent = function(){
		srDisEventFun();
	};
	
	//紧急事件信息
	$scope.srEmergEvent = function(){
		sr_eventCheck_url = urlConfig.emergencyCheck;//给标识赋值，当前是紧急事件的审核
		
		$("#sr_searchDiv img").off("click");//关闭对搜索按钮单击事件的监听
		$("#sr_delete").off("click");//关闭对删除按钮单击事件的监听
//		$("#sr_export").off("click");//关闭对导出按钮单击事件的监听
		
		//清除表格容器中的所有内容
		$("#srQResult").html("");
		//调用接口查询用户上报的紧急事件信息
		srEmergeResult("ALL");
		
		//根据用户输入的条件进行结果匹配
		$("#sr_searchDiv img").on("click",function(){
			var umessage =  $("#sr_searchDiv input").attr("value");
			if(umessage == ""){
				srEmergeResult("ALL");
			}
			else
			{
				srEmergeResult(umessage);
			}
			
		});
		
		//给删除按钮添加click事件，实现震后灾情数据的删除
		$("#sr_delete").on("click",function(){
			//获取到当前被选中的数据
			var s_data = $('#srTable').datagrid('getChecked');
			//调用删除方法进行数据删除
			srDeleteDataUtil(s_data,urlConfig.emergencyDel,"srTable");
		});
		
		//给紧急事件列表添加导出功能
		
		/*查询用户上报的紧急事件信息，并且在表格容器中进行展示*/
		function srEmergeResult(searchCondition){
			$.ajax({
				type:"post",
				url:PATH+urlConfig.emergencyQuery,
				data:{parameter:searchCondition},
				async:true,
				success:function(data){
					//创建表格在页面上进行显示
//					var table = "<table id='srTable'></table>";
					$("#srQResult").append("<form id='sereForm' method='post'><table id='srTable'></table></form>");
					$('#srTable').datagrid({    
					    data:data,
					    title:'紧急事件',
					    columns:[[    
					    	{field:'ck',checkbox:'true'}, 
					    	{field:'user_name',title:'上报人',width:100}, 
					    	{field:'name',title:'事件名称',width:150},   
					        {field:'time',title:'发生时间',width:130},    
					        {field:'x',title:'事件地点坐标经度',width:130},    
					        {field:'y',title:'事件地点坐标纬度',width:130},
					        {field:'address',title:'详细地址',width:200},
					        {field:'check',title:'审核状态',formatter:checkState,width:100,align:'center'},
					        {field:'img_url',title:'事件现场图片',formatter:pictureFormat,width:80,align:'center'},    
					        {field:'video_url',title:'事件现场视频',formatter:videoFormat,width:80,align:'center'},
					        {field:'audio_url',title:'事件现场音频',formatter:audioFormat,width:80,align:'center'},
					        {field:'description',title:'备注',width:200}
					    ]]    
					});
					
				}
				
			});
		}
		
		
	}
	//安置点信息
	$scope.srPlaceEvent = function(){
		sr_eventCheck_url = urlConfig.placeInfoCheck;//给标识赋值，当前是安置地那信息的审核
		
		$("#sr_searchDiv img").off("click");//关闭对搜索按钮单击事件的监听
		$("#sr_delete").off("click");//关闭对删除按钮单击事件的监听
//		$("#sr_export").off("click");//关闭对导出按钮单击事件的监听
		
		//清除表格容器中的所有内容
		$("#srQResult").html("");
		//调用接口查询用户上报的紧急事件信息
		srPlaceResult("ALL");
		
		//实现用户输入条件搜索的功能
		$("#sr_searchDiv img").on("click",function(){
			var umessage =  $("#sr_searchDiv input").attr("value");
			if(umessage == ""){
				srPlaceResult("ALL");
			}
			else
			{
				srPlaceResult(umessage);
			}
		});
		
		//给删除按钮添加click事件，实现震后灾情数据的删除
		$("#sr_delete").on("click",function(){
			//获取到当前被选中的数据
			var s_data = $('#srTable').datagrid('getChecked');
			//调用删除方法进行数据删除
			srDeleteDataUtil(s_data,urlConfig.placeInfoDel,"srTable");
		});
		
		/*查询用户上报的安置点信息，并且在表格容器中进行展示*/
		function srPlaceResult(searchCondition){
			$.ajax({
				type:"post",
				url:PATH+urlConfig.placeInfoQuery,
				data:{parameter:searchCondition},
				async:true,
				success:function(data){
					//创建表格在页面上进行显示
//					var table = "<table id='srTable'></table>";
					$("#srQResult").append("<form id='sereForm' method='post'><table id='srTable'></table></form>");
					$('#srTable').datagrid({    
					    data:data,
					    title:'紧急事件',
					    columns:[[    
					    	{field:'ck',checkbox:'true'}, 
					    	{field:'user_name',title:'上报人',width:100}, 
					    	{field:'name',title:'安置点名称',width:150},   
					        {field:'time',title:'发生时间',width:130},    
					        {field:'x',title:'安置地点坐标经度',width:130},    
					        {field:'y',title:'安置地点坐标纬度',width:130},
					        {field:'address',title:'详细地址',width:200},
					        {field:'total_num',title:'可容纳人数',width:100},    
					        {field:'real_num',title:'实际容纳人数',width:100},    
					        {field:'injured_num',title:'受伤人数',width:100},
					        {field:'material',title:'物资配备情况',width:200},
					        {field:'medical',title:'医疗配备情况',width:200},
					        {field:'check',title:'审核状态',formatter:checkState,width:100,align:'center'},
					        {field:'img_url',title:'事件现场图片',formatter:pictureFormat,width:80,align:'center'},    
					        {field:'video_url',title:'事件现场视频',formatter:videoFormat,width:80,align:'center'},
					        {field:'audio_url',title:'事件现场音频',formatter:audioFormat,width:80,align:'center'},
					        {field:'description',title:'备注',width:200}
					    ]]    
					});
					
				}
				
			});
		}
		
	}
	
	//救援状态信息
	$scope.srRescueState = function(){
		sr_eventCheck_url = urlConfig.macAnoReCheck;//给标识赋值，当前是救援状态信息的审核
		
		$("#sr_searchDiv img").off("click");//关闭对搜索按钮单击事件的监听
		$("#sr_delete").off("click");//关闭对删除按钮单击事件的监听
//		$("#sr_export").off("click");//关闭对导出按钮单击事件的监听
		
		//清除表格容器中的所有内容
		$("#srQResult").html("");
		//调用接口查询用户上报的紧急事件信息
		srRescueResult("ALL");
		
		//实现用户输入条件搜索的 功能
		$("#sr_searchDiv img").on("click",function(){
			var umessage =  $("#sr_searchDiv input").attr("value");
			if(umessage == ""){
				srRescueResult("ALL");
			}
			else
			{
				srRescueResult(umessage);
			}
		});
		
		//给删除按钮添加click事件，实现震后灾情数据的删除
		$("#sr_delete").on("click",function(){
			//获取到当前被选中的数据
			var s_data = $('#srTable').datagrid('getChecked');
			//调用删除方法进行数据删除
			srDeleteDataUtil(s_data,urlConfig.macAnoReDel,"srTable");
		});
		
		/*查询用户上报的救援状态信息，并且在表格容器中进行展示*/
		function srRescueResult(searchCondition){
			$.ajax({
				type:"post",
				url:PATH+urlConfig.macAnoReQuery,
				data:{parameter:searchCondition,type:"NULL"},
				async:true,
				success:function(data){
					//创建表格在页面上进行显示
					var screenWidth = $(window).width();
					var columnWidth = screenWidth*0.15;
//					var table = "<table id='srTable'></table>";
					$("#srQResult").append("<form id='sereForm' method='post'><table id='srTable'></table></form>");
					$('#srTable').datagrid({    
					    data:data,
					    title:'紧急事件',
					    columns:[[    
					    	{field:'ck',checkbox:'true'}, 
					    	{field:'user_name',title:'上报人',width:100}, 
					    	{field:'type',title:'类型',width:100},  
					    	{field:'name',title:'名称',width:150},   
					        {field:'time',title:'上报时间',width:130},    
					        {field:'xy',title:'坐标串',width:130},    
//					        {field:'y',title:'坐标纬度',width:130},
							{field:'dis_state',title:'救援状态',width:130},
					        {field:'address',title:'详细地址',width:200},
					        {field:'check',title:'审核状态',formatter:checkState,width:100,align:'center'},
					        {field:'img_url',title:'事件现场图片',formatter:pictureFormat,width:80,align:'center'},    
					        {field:'video_url',title:'事件现场视频',formatter:videoFormat,width:80,align:'center'},
					        {field:'audio_url',title:'事件现场音频',formatter:audioFormat,width:80,align:'center'},
					        {field:'description',title:'备注',width:200}
					    ]]    
					});
					
				}
				
			});
		}
		
	}
	
}])

//初始化震情管理模块的中间区域
function seisRegimeInit(){
	//清除表格容器中的所有内容
	$("#otherContainerDiv").html("");
	//显示表格容器，隐藏地图容器
	$("#otherContainerDiv").css("display","block");//显示表格容器
	$("#mapContainerDiv").css("display","none");//隐藏地图容器
	//创建一个装载搜索按钮、删除按钮以及导出按钮的div
	$("#otherContainerDiv").append("<div id='srOperatDiv'></div>");
	//创建搜索窗口
	var sr_searchDiv = "<div id='sr_searchDiv'><input type='text' /><img src='jfinal-easyui/../static/images/search.png' /></div>";
	$("#srOperatDiv").append(sr_searchDiv);
	//创建删除按钮
	$("#srOperatDiv").append("<button id='sr_delete'>删除</button>");
	//创建导出按钮
	$("#srOperatDiv").append("<button id='sr_export'>导出</button>");
	
	//因为这4类事件的数据放在同一个datagrid中，srTable，每次只是修改其中的数据内容，所以导出可以使用同一个方法
	$("#sr_export").on("click",function(){
		var fileds = $('#srTable').datagrid('getColumnFields');
		var headers = [];
		for (var i=0; i<fileds.length; i++) {
			var options = $('#srTable').datagrid('getColumnOption',fileds[i+1]);
			if(options != null){
				headers.push(options["title"]);
			}
		}
		//获取数据内容
		var content = [];
		var rows = $('#srTable').datagrid('getRows');
		$.each(rows, function(s,item) {
			var obj = new Object();
			for (var s=0; s<fileds.length; s++) {
				var label = fileds[s+1];
				if(label != undefined){
					obj[label] = item[label];
				}
			}
			content.push(obj);
		});
		
		headers = JSON.stringify(headers);
		content = JSON.stringify(content);
		var purl=PATH+urlConfig.systemSaveExcels;
	
		$.ajax({
			type:"post",
			url:PATH + urlConfig.systemSaveExcel,
			data:{content:content,headers:headers,name:""},
			async:false,
			success:function(data){
				$('#sereForm').form('submit',{url:purl});
			}
		});
	});
	
	//创建一个装载查询结果展示的div
	$("#srOperatDiv").append("<div id='srQResult'></div>");
	
	srDisEventFun();
}

//震后灾情模块中间区域初始化方法
function srDisEventFun(){
	$("#seism_radio").attr("checked","checked");
	
	sr_eventCheck_url = urlConfig.earthDisDelCheck;//给标识赋值，当前是震后灾情信息的审核
	
	$("#sr_searchDiv img").off("click");//关闭对搜索按钮单击事件的监听
	$("#sr_delete").off("click");//关闭对删除按钮单击事件的监听
//	$("#sr_export").off("click");//关闭对导出按钮单击事件的监听
	
	//清除放置结果的div中的内容
	$("#srQResult").html("");
	//调用接口查询用户上报的震后灾情信息，在表格容器中进行展示
	srDisasterResult("ALL");
	
	//实现用户输入条件搜索的功能
	$("#sr_searchDiv img").on("click",function(){
		var umessage = $("#sr_searchDiv input").attr("value");
		if(umessage == ""){
			srDisasterResult("ALL");
		}
		else
		{
			srDisasterResult(umessage);
		}
	});
	
	//给删除按钮添加click事件，实现震后灾情数据的删除
	$("#sr_delete").on("click",function(){
		//获取到当前被选中的数据
		var s_data = $('#srTable').datagrid('getChecked');
		//调用删除方法进行数据删除
		srDeleteDataUtil(s_data,urlConfig.earthDisDel,"srTable");
	});
	
	/*查询用户上报的震后灾情信息，并且在表格容器中进行展示*/
	function srDisasterResult(searchCondition){
		$.ajax({
			type:"post",
			url:PATH+urlConfig.earthDisAuery,
			data:{parameter:searchCondition,eventCode:"NULL"},
			async:true,
			success:function(data){
				//创建表格在页面上进行显示
				var screenWidth = $(window).width();
				var columnWidth = screenWidth*0.15;
//				var table = "<table id='srTable'></table>";
				$("#srQResult").append("<form id='sereForm' method='post'><table id='srTable'></table></form>");
				$('#srTable').datagrid({    
				    data:data,
				    title:'震后灾情',
				    columns:[[    
				    	{field:'ck',checkbox:'true'},  
				    	{field:'user_name',title:'上报人',width:100}, 
				        {field:'time',title:'发生时间',width:130},    
				        {field:'x',title:'事件地点坐标经度',width:130},    
				        {field:'y',title:'事件地点坐标纬度',width:130},
				        {field:'address',title:'详细地址',width:200},
				        {field:'abnormal_name',title:'事件类型',width:100},
				        {field:'abnormal_state',title:'详细信息',width:200},
				        {field:'check',title:'审核状态',formatter:checkState,width:100,align:'center'},
				        {field:'img_url',title:'事件现场图片',formatter:pictureFormat,width:80,align:'center'},    
				        {field:'video_url',title:'事件现场视频',formatter:videoFormat,width:80,align:'center'},
				        {field:'audio_url',title:'事件现场音频',formatter:audioFormat,width:80,align:'center'},
				        {field:'description',title:'备注',width:200}
				    ]]    
				});
			}
			
		});
	}
}

//图片浏览
function pictureFormat(val,row){
	var reSpan = '<span style="color:red;cursor:pointer;" onclick="browsePicture('+val+')">查看</span>';
	return reSpan;
}
	
//视频播放
function videoFormat(val,row){
	var reSpan = '<span style="color:red;cursor:pointer;" onclick="playVideo('+val+')">查看</span>';
	return reSpan;
}

//音频播放
function audioFormat(val,row){
	var reSpan = '<span style="color:red;cursor:pointer;" onclick="playAudio('+val+')">查看</span>';
	return reSpan;
}

//审核状态
function checkState(val,row,index){
	//val有3个值，0：代表未审核 1:代表审核通过  2：代表审核未通过
	var respan = '';
	//未审核
	if(val == "0"){
		respan = "<span style='color:red;cursor:pointer;' onclick='checkFunc("+index+")'>审核</span>";
//			respan = '<span style="color:red;cursor:pointer;" onclick="checkFunc('+"val"+')">审核</span>';
	}
	else if(val == "2"){
		respan = "<span style='color:red;cursor:pointer;' onclick='checkFunc("+index+")'>审核不通过</span>";
	}
	else//已审核
	{
		respan = '<span style="color:#4E5055;">已审核</span>';
	}
	return respan;
}
	
//事件审核
function checkFunc(index){
	var dg_option = $("#srTable").datagrid('options');//获取到当前表格的属性
	var dg_colomn = dg_option.columns;//获取到当前表格列的属性 dg_colomn[0]是真正的属性数组对象
	var coloum_data = $("#srTable").datagrid('getRows');//获取到所有列的数据
	//创建当前这条数据的审核面板
	srDataCheckPanel(dg_colomn[0],coloum_data[index],index);
}

//浏览照片、查看视频和音频的方法
//function browsePicture(content,operateType){
//	//content是照片的url地址，调用照片查看器查看图片
//	
//	
//	if(operateType == "0"){//图片
//		//显示放置图片的div
//		$("#pictureBroses").css("display","block");
//		$("#pictureBroses div").remove();
//		
//		var testPicData = [
//			'jfinal-easyui/../static/images/myFocusTestImg/1a.jpg',
//			'jfinal-easyui/../static/images/myFocusTestImg/2a.jpg',
//			'jfinal-easyui/../static/images/myFocusTestImg/3a.jpg',
//			'jfinal-easyui/../static/images/myFocusTestImg/4a.jpg',
//			'jfinal-easyui/../static/images/myFocusTestImg/5a.jpg',
//			'jfinal-easyui/../static/images/myFocusTestImg/1a.jpg'
//		];
//		
//		$("#pictureBroses").append("<div id='myFocus'></div>");
//		//这里class='pic'中的pic是不能被改变的
//		$("#myFocus").append("<div class='loading'><img src='jfinal-easyui/../static/images/myFocusTestImg/loading.gif' alt='请稍候...' /></div>"+
//					  "<div class='pic'>"+
//					  	"<ul id='myFocusContent'></ul>"+
//					  "</div>");
//		
//		for (var i=0; i<testPicData.length; i++) {
//			$("#myFocusContent").append("<li><img src="+testPicData[i]+" /></li>");
//		}
//		
//		myFocus.set({
//			id:'myFocus',//ID
//			pattern:'mF_pithy_tb'
//		});
//		
//	}
//	else if(operateType == "1")//视频
//	{
//		$("#myvideos").html("");
//		$("#myvideos").append("<source src='jfinal-easyui/../static/images/myFocusTestImg/testvideo.mp4' type='video/mp4'>");
//		$("#videoControl").css("display","block");
//		$("#myvideos").play();
//	}
//	else if(operateType == "2")//视频
//	{
//		alert("2");
//	}
//}

/*数据删除方法
 * resultData:要删除的数据对象
 * serviceUrl：删除接口的url
 * tableId：当前被操作的easyui的table的id
 * */
function srDeleteDataUtil(resultData,serviceUrl,tableId){
	if(resultData.length <= 0){
		alertInfoWinInit("请选择要删除的数据！");
		return;
	}
	loadingWinInit(true);
	var srids = "";//取出每条数据的id，并且拼成一个字符串，每个id之间用逗号隔开
	var dataIndex = [];//要删除数据的行的index值
	for (var i=0; i<resultData.length; i++) {
		srids = srids + resultData[i].id + ",";
		dataIndex[resultData.length-1-i] = $('#'+tableId).datagrid('getRowIndex',resultData[i]);
	}
	srids = srids.slice(0,srids.length-1);
	
	//调用删除方法对数据进行删除
	$.ajax({
		type:"post",
		url:PATH+serviceUrl,
		data:{ids:srids},
		async:true,
		success:function(data){
			if(data){
				//如果数据库删除成功，在页面上的表格中删除这一行
				for (var j=0; j<dataIndex.length; j++) {
					$('#'+tableId).datagrid('deleteRow',dataIndex[j]);
				}
				loadingWinInit(false);
				alertInfoWinInit("删除成功");
			}
			
		}
		
	});
	
}

/*
 * 创建当前某条数据的审核面板
 * 	columnOption:当前列的属性列表
 * 	c_data:当前列的数据
 *  index:当前这条数据在datagrid表格中的索引值
 * */
function srDataCheckPanel(columnOption,c_data,index){
	var dataCheckDivIsExist = $("#srDataCheckDiv").length;
	if(dataCheckDivIsExist > 0){
		return;
	}
	//创建一个div
	$("body").append("<div id='srDataCheckDiv'></div>");
	//给div添加一个关闭按钮
	$("#srDataCheckDiv").append("<img id='sr_check_close' src='jfinal-easyui/../static/images/close.png' />");
	
	$("#srDataCheckDiv").append("<div id='srCheckTitle'>事件信息审核</div>");//面板名称
	$("#srDataCheckDiv").append("<div id='srCheckCon'></div>");//审核内容
	$("#srDataCheckDiv").append("<div id='srCheckButt'></div>");//审核按钮
	
	//从对象中去掉一些不需要展示的字段
	c_data.check = "";
	c_data.img_url = "";
	c_data.video_url = "";
	c_data.audio_url = "";
	
	
	
	//添加审核内容
	for (var i=0; i<columnOption.length; i++) {
		if(c_data[columnOption[i].field] != undefined && c_data[columnOption[i].field] != ""){
			$("#srCheckCon").append("<span>"+columnOption[i].title +":&nbsp;&nbsp;"+c_data[columnOption[i].field]+"</span><br/>");
		}
	}
	
	//添加按钮
	$("#srCheckButt").append("<button id='check_adopt'>通过</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id='check_no'>不通过</button>");//审核按钮
	
	//给通过按钮添加点击事件
	$("#srCheckButt #check_adopt").click(function(){
		loadingWinInit(true);
		//如果通过调用后台方法修改数据库中check字段的值，修改成功之后修改页面上的显示状态,同时关闭页面
		//注意：check有3个状态，0：未审核 ；1：审核通过 2：审核不通过
		$.ajax({
			type:"post",
			url:PATH+sr_eventCheck_url,
			data:{id:c_data.id,check:"1"},
			async:true,
			success:function(data){
				loadingWinInit(false);
				if(data){
					$("#srTable").datagrid('updateRow',{
						index: index,
						row: {
							check: '已审核',
						}
					});
					$("#srDataCheckDiv").remove();
				}
			}
		});
		
	});
	//给不通过按钮添加点击事件
	$("#srCheckButt #check_no").click(function(){
		//如果审核不通过修改页面上的显示内容为审核不通过，关闭审核页面
		$.ajax({
			type:"post",
			url:PATH+sr_eventCheck_url,
			data:{id:c_data.id,check:"2"},
			async:true,
			success:function(data){
				loadingWinInit(false);
				if(data){
					$("#srTable").datagrid('updateRow',{
						index: index,
						row: {
							check:'2',
						}
					});
					$("#srTable").datagrid('refreshRow',index);
					$("#srDataCheckDiv").remove();
				}
			}
		});
		
	});
	
	//添加页面关闭功能
	$("#srDataCheckDiv #sr_check_close").click(function(){
		$("#srDataCheckDiv").remove();
	});
	
}
