/*
 * 安置点信息上报
 * */
MainApp.controller('placeInfoCtrls', [ '$scope', function($scope) {
	//地图上画点控件
	var pinfo_drawPoint;
	//要上报的事件的对象
	var pinfo_obiect = {};
	
	var isUpdata = false;
	
	$scope.placeInfoModuleInit = function(){
		//查询当前用户上报的事件，如果审核已经通过，则不能对事件进行修改和删除，反之，可以对事件进行修改和删除
		piSearchEventFun();
		
		//添加或者修改时间
		addOrUpPlaceInfo();
		
		//查询地震目录，在页面上进行展示
		$.ajax({
			type:"post",
			url:PATH+urlConfig.earthquakeListQuery,
			async:true,
			success:function(data){
				$('#pinfo_eq_list').combobox({    
				    data:data,    
				    valueField:'id',    
				    textField:'name'   
				}); 
				
				$('#pinfo_eq_list').combobox('select', data[0].id);
			}
			
		});
		
		
		//给画点按钮添加点击事件
		$("#pinfo_latLonGet").click(function(){
			//创建一个地图画点控件
			pinfo_drawPoint = new SuperMap.Control.DrawFeature(measureLayer,SuperMap.Handler.Point,{multi:true});
			pinfo_drawPoint.events.on({"featureadded":pinfo_drawCompleted});
			map.addControl(pinfo_drawPoint);
			pinfo_drawPoint.activate();
		});
		
		function pinfo_drawCompleted(drawGeometryArgs){
			pinfo_drawPoint.deactivate();
			var pinfo_g = drawGeometryArgs.feature.geometry;
			var pinfo_gp = pinfo_g.components[0];
			//给input输入框填写数据
			$("#pinfo_lat").attr("value",pinfo_gp.x);
			$("#pinfo_lon").attr("value",pinfo_gp.y);
		}
	}
	
	//新增事件
	$scope.pi_addEventButt = function(){
		recuvaFunctio();
		//显示添加事件信息填写面板，隐藏事件列表
		$("#pi_list_div").css("display","none");
		$("#pi_addEventDiv").css("display","block");
		//设置当前的操作为添加
		isUpdate = false;
	}
	
	//返回按钮所作的操作
	$scope.placeInfoReturn = function(){
		$("#pi_list_div").css("display","block");
		$("#pi_addEventDiv").css("display","none");
	}
	
	function addOrUpPlaceInfo(){
		$("#pinfo_submit").click(function(){
			//获取安置点名称,并判空
			var pinfo_name = $("#pinfo_name").attr("value");
			if(pinfo_name == "" || pinfo_name == null){
				alertInfoWinInit("请输入事件名称");
				return;
			}
			//获取经纬度坐标，并判空
			var pinfo_lat = $("#pinfo_lat").attr("value");
			var pinfo_lon = $("#pinfo_lon").attr("value");
			if(pinfo_lat == "" || pinfo_lat == null || pinfo_lon == null || pinfo_lon == ""){
				alertInfoWinInit("请填写或者在地图上选择坐标");
				return;
			}
			//获取上报的时间，如果为空，则默认为当前时间
			var pinfo_time = $("#pinfo_time").attr("value");
			//获取详细地址，并判空
			var pinfo_adsress = $("#pinfo_address").attr("value");
			if(pinfo_adsress == null || pinfo_adsress == ""){
				alertInfoWinInit("请填写详细地址");
				return;
			}
			//获取安置点可容纳人数
			var pinfo_accommodate = $("#pinfo_accommodate").attr("value");
			//获取安置点实际容纳人数
			var pinfo_realAcco = $("#pinfo_realAcco").attr("value");
			//获取安置点受伤的人数
			var pinfo_dams = $("#pinfo_dams").attr("value");
			//物资配备情况
			var pinfo_materialEqu = $("#pinfo_materialEqu").attr("value");
			//医疗配备请款
			var pinfo_medicalEqu = $("#pinfo_medicalEqu").attr("value");
			//获取描述信息
			var pinfo_desc = $("#pinfo_describe").attr("value");
			
			pinfo_obiect.name = pinfo_name;
			pinfo_obiect.x = pinfo_lat;
			pinfo_obiect.y = pinfo_lon;
			pinfo_obiect.time = pinfo_time;
			pinfo_obiect.address = pinfo_adsress;
			pinfo_obiect.totalNum = pinfo_accommodate;
			pinfo_obiect.realNum = pinfo_realAcco;
			pinfo_obiect.injuredNum = pinfo_dams;
			pinfo_obiect.material = pinfo_materialEqu;
			pinfo_obiect.medical = pinfo_medicalEqu;
			pinfo_obiect.description = pinfo_desc;
			pinfo_obiect.eqId = $('#pinfo_eq_list').combobox('getValue');;//当前地震编码
			pinfo_obiect.userId = $scope.sys_userid;//上报用户的用户id
			pinfo_obiect.userName = $scope.sys_username;//上报用户的用户名
			
			if(isUpdate){
				//执行修改操作
				$.ajax({
					type:"post",
					url:PATH + urlConfig.placeInfoUpdata,
					data:pinfo_obiect,
					async:true,
					success:function(){
						alertInfoWinInit("信息修改成功");
						//事件上报成功，删除地图上的画点控件
						if(pinfo_drawPoint != undefined){
							map.removeControl(pinfo_drawPoint);
						}
						//刷新列表
						piSearchEventFun();
					}
				});
			}
			else
			{
				//执行添加操作
				$.ajax({
					type:"post",
					url:PATH + urlConfig.palceInfo,
					async:true,
					data:pinfo_obiect,
					success:function(){
						alertInfoWinInit("上报成功");
						//事件上报成功，删除地图上的画点控件
						if(pinfo_drawPoint != undefined){
							map.removeControl(pinfo_drawPoint);
						}
						piSearchEventFun();
						recuvaFunctio();
					}
				});
			}
			
		});
	}
	
	function recuvaFunctio(){
		$("#pinfo_name").attr("value","");
		$("#pinfo_lat").attr("value","");
		$("#pinfo_lon").attr("value","");
		$("#pinfo_address").attr("value","");
		$("#pinfo_time").attr("value","");
		$("#pinfo_accommodate").attr("value","");
		$("#pinfo_realAcco").attr("value","");
		$("#pinfo_materialEqu").attr("value","");
		$("#pinfo_medicalEqu").attr("value","");
		$("#pinfo_dams").attr("value","");
		$("#emer_describe").attr("value","");
	}
	
	function piSearchEventFun(){
		$("#pi_lists").html("");
		var parma = new Object();
//		parma.eqId = "2";//当前地震编码
		parma.userId = $scope.sys_userid;//当前用户
		$.ajax({
			type:"post",
			url:PATH + urlConfig.placeInfoQueryByU,
			data:parma,
			async:true,
			success:function(data){
				$.each(data, function(k,itemData) {
					ed_update_event_id = itemData.id;
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
					var listDiv = "<div class='pi_evnet_list'>"+
						"<div>事件描述：&nbsp;<span>"+itemData.name+"</span></div>"+
						"<div>上报时间：&nbsp;<span>"+itemData.time+"</span></div>"+
						"<div>审核状态：&nbsp;<span>"+check+"</span>"+
						"<button id='pi_list_up"+itemData.id+"' style='display:"+budisplay+"'>修改</button><button id='pi_list_del"+itemData.id+"' style='display:"+budisplay+"'>删除</button></div>"+
						"<hr/>"
					+"</div>";
					$("#pi_lists").append(listDiv);
					//当事件的审核状态为审核未通过和待审核时，显示修改和删除按钮，对事件进行删除或者修改
					$("#pi_list_up"+itemData.id).click(function(){
						isUpdate = true;//代表当前的操作是信息修改
						//点击修改按钮时，显示信息填写面板，将当前的数据默认进行填写
						$("#pi_list_div").css("display","none");
						$("#pi_addEventDiv").css("display","block");
						//进行信息填写
						$("#pinfo_name").attr("value",itemData.name);
						$("#pinfo_lat").attr("value",itemData.x);
						$("#pinfo_lon").attr("value",itemData.y);
						$("#pinfo_address").attr("value",itemData.address);
						$("#pinfo_time").attr("value",itemData.time);
						$("#pinfo_accommodate").attr("value",itemData.total_num);
						$("#pinfo_realAcco").attr("value",itemData.real_num);
						$("#pinfo_materialEqu").attr("value",itemData.material);
						$("#pinfo_medicalEqu").attr("value",itemData.medical);
						$("#pinfo_dams").attr("value",itemData.injured_num);
						$("#emer_describe").attr("value",itemData.description);
						
						pinfo_obiect.id = itemData.id;
					});
					
					$("#pi_list_del"+itemData.id).click(function(){
						$.ajax({
							type:"post",
							url:PATH+urlConfig.placeInfoDel,
							data:{ids:itemData.id},
							async:true,
							success:function(data){
								alertInfoWinInit("删除成功");
								//刷新列表
								piSearchEventFun();
							}
							
						});
					});
					
				});
			}
		});
	}
	
}]);
