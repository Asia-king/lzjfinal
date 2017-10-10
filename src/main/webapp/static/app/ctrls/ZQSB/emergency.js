/*
 * 紧急事件信息上报
 * */
MainApp.controller('emergencyCtrls', [ '$scope', function($scope) {
	//地图上画点控件
	var emer_drawPoint;
	//要上报的事件的对象
	var emer_obiect = {};
	
	var isUpdate = false;//当前是处于添加状态还是修改状态
	
	$scope.emergencyModuleInit = function(){
		//查询当前用户上报的紧急事件，如果审核已经通过，则不能对事件进行修改和删除，反之，可以对事件进行修改和删除
		emeSearchEventFun();
		
		//紧急事件添加和上报事件的修改方法
		emerAddUpEventFun();
		
		//查询地震目录，在页面上进行展示
		$.ajax({
			type:"post",
			url:PATH+urlConfig.earthquakeListQuery,
			async:true,
			success:function(data){
				$('#emer_eq_list').combobox({    
				    data:data,    
				    valueField:'id',    
				    textField:'name'   
				}); 
				
				$('#emer_eq_list').combobox('select', data[0].id);
			}
			
		});
		
		//给画点按钮添加点击事件
		$("#emer_latLonGet").click(function(){
			//创建一个地图画点控件
			emer_drawPoint = new SuperMap.Control.DrawFeature(measureLayer,SuperMap.Handler.Point,{multi:true});
			emer_drawPoint.events.on({"featureadded":ed_drawCompleted});
			map.addControl(emer_drawPoint);
			emer_drawPoint.activate();
		});
		
		function ed_drawCompleted(drawGeometryArgs){
			emer_drawPoint.deactivate();
			var emer_g = drawGeometryArgs.feature.geometry;
			var emer_gp = emer_g.components[0];
			//给input输入框填写数据
			$("#emer_lat").attr("value",emer_gp.x);
			$("#emer_lon").attr("value",emer_gp.y);
		}
	}
	
	//新增事件
	$scope.eme_addEventButt = function(){
		emeRecuvaFun();
		//显示添加事件信息填写面板，隐藏事件列表
		$("#eme_event_list_div").css("display","none");
		$("#eme_addEventDiv").css("display","block");
		//设置当前的操作为添加
		isUpdate = false;
	}
	
	//返回按钮所作的操作
	$scope.emerListReturn = function(){
		$("#eme_event_list_div").css("display","block");
		$("#eme_addEventDiv").css("display","none");
	}
	
	function emerAddUpEventFun(){
		//给提交按钮添加监听事件
		$("#emer_submit").click(function(){
			//获取事件名称,并判空
			var emer_name = $("#emer_eName").attr("value");
			if(emer_name == "" || emer_name == null){
				alertInfoWinInit("请输入事件名称");
				return;
			}
			//获取经纬度坐标，并判空
			var emer_lat = $("#emer_lat").attr("value");
			var emer_lon = $("#emer_lon").attr("value");
			if(emer_lat == "" || emer_lat == null || emer_lon == null || emer_lon == ""){
				alertInfoWinInit("请填写或者在地图上选择坐标");
				return;
			}
			//获取事件的发生时间，如果为空，则默认为当前时间
			var emer_time = $("#emer_eTime").attr("value");
			//获取详细地址，并判空
			var emer_adsress = $("#emer_eAddress").attr("value");
			if(emer_adsress == null || emer_adsress == ""){
				alertInfoWinInit("请填写详细地址");
				return;
			}
			//获取描述信息
			var emer_desc = $("#emer_describe").attr("value");
			
			emer_obiect.eqId = $('#emer_eq_list').combobox('getValue');//地震编码
			emer_obiect.state = "0";
			emer_obiect.check = "0";
			emer_obiect.userId = $scope.sys_userid;
			emer_obiect.userName = $scope.sys_username;
			emer_obiect.name = emer_name;
			emer_obiect.x = emer_lat;
			emer_obiect.y = emer_lon;
			emer_obiect.time = emer_time;
			emer_obiect.address = emer_adsress;
			emer_obiect.description = emer_desc;
			
			if(isUpdate){
				//执行修改操作
				$.ajax({
					type:"post",
					url:PATH + urlConfig.emerUpdata,
					data:emer_obiect,
					async:true,
					success:function(){
						alertInfoWinInit("信息修改成功");
						//事件上报成功，删除地图上的画点控件
						if(emer_drawPoint != undefined){
							map.removeControl(emer_drawPoint);
						}
						//刷新列表
						emeSearchEventFun();
					}
				});
			}
			else
			{
				//执行添加操作
				$.ajax({
					type:"post",
					url:PATH + urlConfig.emergency,
					data:emer_obiect,
					async:true,
					success:function(){
						alertInfoWinInit("上报成功");
						//事件上报成功，删除地图上的画点控件
						if(emer_drawPoint != undefined){
							map.removeControl(emer_drawPoint);
						}
						//刷新列表
						emeSearchEventFun();
						emeRecuvaFun();
					}
				});
			}
			
		});
	}
	
	//查询当前用户上报的紧急事件,以列表的方式进行展示
	function emeSearchEventFun(){
		$("#eme_event_lists").html("");
		var parma = new Object();
//		parma.eqId = "1";//当前地震编码
		parma.userId = $scope.sys_userid;//当前用户
		$.ajax({
			type:"post",
			url:PATH + urlConfig.emerQueryByUser,
			data:parma,
			async:true,
			success:function(data){
				$.each(data, function(k,itemData) {
					var check = itemData.check;
					var budisplay = "inline";
					if(check == "0"){
						check = "未审核";
					}else if(check == "1"){
						check = "已审核";
						budisplay = "none";
					}else{
						check = "审核未通过";
					}
					var listDiv = "<div class='eme_evnet_list'>"+
						"<div>事件描述：&nbsp;<span>"+itemData.name+"</span></div>"+
						"<div>上报时间：&nbsp;<span>"+itemData.time+"</span></div>"+
						"<div>审核状态：&nbsp;<span>"+check+"</span>"+
						"<button id='eme_list_up"+itemData.id+"' style='display:"+budisplay+"'>修改</button><button id='eme_list_del"+itemData.id+"' style='display:"+budisplay+"'>删除</button></div>"+
						"<hr/>"
					+"</div>";
					$("#eme_event_lists").append(listDiv);
					//当事件的审核状态为审核未通过和待审核时，显示修改和删除按钮，对事件进行删除或者修改
					$("#eme_list_up"+itemData.id).click(function(){
						isUpdate = true;//代表当前的操作是信息修改
						//点击修改按钮时，显示信息填写面板，将当前的数据默认进行填写
						$("#eme_event_list_div").css("display","none");
						$("#eme_addEventDiv").css("display","block");
						//进行信息填写
						$("#emer_eName").attr("value",itemData.name);
						$("#emer_lat").attr("value",itemData.x);
						$("#emer_lon").attr("value",itemData.y);
						$("#emer_eAddress").attr("value",itemData.address);
						$("#emer_eTime").attr("value",itemData.time);
						$("#emer_describe").attr("value",itemData.description);
						
						emer_obiect.id = itemData.id;
					});
					
					$("#eme_list_del"+itemData.id).click(function(){
						$.ajax({
							type:"post",
							url:PATH+urlConfig.emergencyDel,
							data:{ids:itemData.id},
							async:true,
							success:function(data){
								alertInfoWinInit("删除成功");
								//刷新列表
								emeSearchEventFun();
							}
							
						});
					});
					
				});
			}
		});
	}
	
	function emeRecuvaFun(){
		$("#emer_eName").attr("value","");
		$("#emer_lat").attr("value","");
		$("#emer_lon").attr("value","");
		$("#emer_eAddress").attr("value","");
		$("#emer_eTime").attr("value","");
		$("#emer_describe").attr("value","");
	}
	
}])