/*
 * 震后灾情速报
 */
MainApp.controller('earthquakeDisasterCtrls', [ '$scope', function($scope) {
	
	var ed_event_type = "";//上报事件的事件类型编码
	var ed_type_name = "";//上报事件的事件类型名称
	var ed_type_status = "";//上报事件的事件状态
	
	var ed_submitObject = {};//要上报事件的事件对象
	
	var ed_update_event_id = "";
	
	var isUpdate = false;//标识当前的操作是添加还是修改操作，方便在点击提交按钮的时候做一个区分
	
	var ed_drawPoint; //在地图上画点控件对象
	
	$scope.eqDisModuleInit = function(){
		//查询当前用户上报的震后灾情事件，如果审核已经通过，则不能对事件进行修改和删除，反之，可以对事件进行修改和删除
		edSearchEventFun();
		
		//查询地震目录，在页面上进行展示
		$.ajax({
			type:"post",
			url:PATH+urlConfig.earthquakeListQuery,
			async:true,
			success:function(data){
				$('#ed_eq_list').combobox({    
				    data:data,    
				    valueField:'id',    
				    textField:'name'   
				}); 
				
				$('#ed_eq_list').combobox('select', data[0].id);
			}
			
		});
		
		
		//获取上报信息的类型并且在页面上进行展示
		$.each(earthquakeDisaster_data, function(i,item) {
			//给span设置不同的ID，方便控制样式
			var spanId = "";
			if(item.name.length > 4){
				spanId = "ed_spanHalf";
			}
			else
			{
				spanId = "ed_spanFull";
			}
			selectDiv = "<div id='ed_"+ item.code +"' class='ed_selectDiv ed_selectDivN' name='off'><label id="+spanId+">"+item.name+"</label></div>";
			$("#ed_type").append(selectDiv);
			//给div设置click事件
			$("#ed_"+item.code).click(function(){
				var tm_classify = $("#ed_"+item.code).attr("name");
				//判断当前项是选中的还是没有被选中，如果是选中的，调用该项的初始化方法，如果没有被选中，清理图层
				if(tm_classify == "on"){
					$("#ed_"+item.code).attr("name","off");
					//切换背景图片
					$("#ed_"+item.code).removeClass("ed_selectDivY").addClass("ed_selectDivN");
//					$("#ed_"+item.code).css("background-image","url(jfinal-easyui/../static/images/tm_noSelect.png)");
				}
				else
				{
					$(".ed_selectDiv").attr("name","off");
					$("#ed_"+item.code).attr("name","on");
					//切换背景图片
					$(".ed_selectDiv").removeClass("ed_selectDivY").addClass("ed_selectDivN");
					$("#ed_"+item.code).removeClass("ed_selectDivN").addClass("ed_selectDivY");
//					$(".ed_selectDiv").css("background-image","url(jfinal-easyui/../static/images/tm_noSelect.png)");
//					$("#ed_"+item.code).css("background-image","url(jfinal-easyui/../static/images/tm_select.png)");
					
					ed_event_type = item.code;//获取到被点击对象的编码
					ed_type_name = item.name;//获取到被点击对象的名称
					
					ed_submitObject = {};//重置上报的事件对象
					
					$("#ed_submit_button").off("click");//关闭提交按钮的点击事件
					
					//重置输入框的值
					$("#ed_lat").attr("value","");
					$("#ed_lon").attr("value","");
					$("#ed_eventAddress").attr("value","");
					$("#ed_eventTime").attr("value","");
					$("#ed_eventDesc").attr("value","");
					
					//执行方法
					eval(item.initFunc+"()");
				}
			});
			
		});
		
		//初始化页面展示
		ed_event_type = earthquakeDisaster_data[0].code;//获取到被点击对象的编码
		ed_type_name = earthquakeDisaster_data[0].name;//获取到被点击对象的名称
		felt();
		$("#ed_"+earthquakeDisaster_data[0].code).removeClass("ed_selectDivN").addClass("ed_selectDivY");
		
		//给地图上选点按钮添加click事件
		$("#ed_latLonGet").click(function(){
			//创建一个地图画点控件
			ed_drawPoint = new SuperMap.Control.DrawFeature(measureLayer,SuperMap.Handler.Point,{multi:true});
			ed_drawPoint.events.on({"featureadded":ed_drawCompleted});
			map.addControl(ed_drawPoint);
			ed_drawPoint.activate();
		});
		
		function ed_drawCompleted(drawGeometryArgs){
			ed_drawPoint.deactivate();
			var ed_g = drawGeometryArgs.feature.geometry;
			var ed_gp = ed_g.components[0];
			//给input输入框填写数据
			$("#ed_lat").attr("value",ed_gp.x);
			$("#ed_lon").attr("value",ed_gp.y);
		}
		
	}
	
	//震感
	function felt(abnormalState){
		//清空装载事件类型状态的div：ed_type_status
		$("#ed_type_status").html("");
		var felt_data = [{"name":"主观震感","children":[
											{"name":"无震感"},
											{"name":"轻微有地动"},
											{"name":"地动持续一会儿"},
											{"name":"有明显地动"},
											{"name":"地动山摇，地面站立不稳"}]},
						{"name":"客观震感","children":[
											{"name":"砖房完好"},
											{"name":"土木房完好"},
											{"name":"砖房部分倒塌"},
											{"name":"土木房部分倒塌"},
											{"name":"砖房一片废墟"},
											{"name":"土木房一片废墟"}]}];
		
		$("#ed_type_status").append("请选择地震发生时您的感受:<br />");
		$.each(felt_data[0].children, function(i,item) {
			$("#ed_type_status").append("<input id='ed_subFelt' type='radio' name='subFeltRadio' value='"+item.name+"' style='margin-left:15px;margin-top:auto;' />&nbsp;"+item.name+"<br />");
		});
		$("#ed_type_status").append("请选择发生地震时您看到房屋破坏的景象:<br />");
		$.each(felt_data[1].children, function(j,index) {
			$("#ed_type_status").append("<input id='ed_objFelt' type='radio' name='objFeltRadio' value='"+index.name+"' style='margin-left:15px;margin-top:auto;' />&nbsp;"+index.name+"<br />");
		});
		
		if(abnormalState != "" && abnormalState != null){
			//表示现在该事件处于修改状态，在页面上显示默认信息
			var selectData = abnormalState.split(";")
			var dataValue1 = selectData[0].split("：");
			var dataValue2 = selectData[1].split("：");
			//主观震感的选项
			$("#ed_subFelt[value="+dataValue1[1]+"]").attr("checked","checked");
			//客观震感的选项
			$("#ed_objFelt[value="+dataValue2[1]+"]").attr("checked","checked");
		}
		
		//给提交按钮设置点击事件
		$("#ed_submit_button").on("click",function(){
			//获取到页面上填写的基本信息
			var returnValue = edGetBaseMessage();
			if(returnValue == null){
				return;
			}
			//主观震感中获取到用户选择的信息
			var ed_subFelt = $('#ed_subFelt:checked').attr("value");
			//客观震感中获取到用户选择的信息
			var ed_objFelt = $('#ed_objFelt:checked').attr("value");
			ed_submitObject.abnormalState = "主观震感：" + ed_subFelt + ";客观震感：" + ed_objFelt;
			//向后台提交请求，对用户输入的信息进行添加
			edAddEventFun();
		});
	}
	
	//建筑物破坏
	function buildingDamage(abnormalState){
		//清空装载事件类型状态的div：ed_type_status
		$("#ed_type_status").html("");
		//破坏程度数据
		var damage_data = [{"name":"破坏程度","children":[{"name":"基本完好"},{"name":"轻微破坏"},{"name":"中等破坏"},{"name":"严重破坏"},{"name":"倒塌"}]}];
		
		$("#ed_type_status").append("建筑物名称:&nbsp;<input type='text' id='build_name' style='width:140px' /><br />");
		$("#ed_type_status").append("破坏程度:&nbsp;<br />");
		$.each(damage_data[0].children, function(i,item) {
			$("#ed_type_status").append("<input type='radio' id='ed_buildDaRadio' name='buildDamage' value='"+item.name+"' style='margin-left:15px;margin-top:auto;' />&nbsp;"+item.name+"<br />");
		});
		$("#ed_type_status").append("破坏面积:&nbsp;<input id='ed_buildDaArea' type='text' style='width:150px' /><br />");
		$("#ed_type_status").append("经济损失:&nbsp;<input id='ed_buildDamEco' type='text' style='width:150px' /><br />");
		
		if(abnormalState != "" && abnormalState != null){
			//表示现在该事件处于修改状态，在页面上显示默认信息
			var selectData = abnormalState.split(";")
			var dataValue1 = selectData[0].split("：");//建筑物名称
			var dataValue2 = selectData[1].split("：");//破坏程度
			var dataValue3 = selectData[2].split("：");//破坏面积
			var dataValue4 = selectData[3].split("：");//经济损失
			
			//建筑物名称
			$("#build_name").attr("value",dataValue1[1]);
			//破坏程度
			$("#ed_buildDaRadio[value="+dataValue2[1]+"]").attr("checked","checked");
			//破坏面积
			$("#ed_buildDaArea").attr("value",dataValue3[1]);
			//造成经济损失
			$("#ed_buildDamEco").attr("value",dataValue4[1]);
		}
		
		//给提交按钮设置点击事件
		$("#ed_submit_button").on("click",function(){
			//获取到页面上填写的基本信息
			var returnValue = edGetBaseMessage();
			if(returnValue == null){
				return;
			}
			//获取到建筑物名称
			var ed_buildName = $('#build_name').attr("value");
			if(ed_buildName == "" || ed_buildName == null){
				alertInfoWinInit("请填写建筑物名称")
				return;
			}
			//获取到建筑物破坏程度信息
			var ed_buildDamDeg = $('#ed_buildDaRadio:checked').attr("value");
			//获取到建筑物的破坏面积信息
			var ed_buildDamArea = $("#ed_buildDaArea").attr("value");
			//获取到建筑物毁坏造成的经济损失
			var ed_buildDamEco = $("#ed_buildDamEco").attr("value");
			
			var ed_abmormalState = "";
			ed_abmormalState = ed_abmormalState + "建筑物名称：" + ed_buildName + ";";
			ed_abmormalState = ed_abmormalState + "破坏程度：" + ed_buildDamDeg + ";";
			ed_abmormalState = ed_abmormalState + "破坏面积：" + ed_buildDamArea + ";";
			ed_abmormalState = ed_abmormalState + "造成经济损失：" + ed_buildDamEco;
			
			ed_submitObject.abnormalState = ed_abmormalState;
			//向后台提交请求，对用户输入的信息进行添加
			edAddEventFun();
		});
	}
	
	//人员伤亡
	function casualties(abnormalState){
		//清空装载事件类型状态的div：ed_type_status
		$("#ed_type_status").html("");
		
		$("#ed_type_status").append("受伤人数：&nbsp;<input id='c_injur' type='text' style='margin-top:auto;width:140px'/><br />");
		$("#ed_type_status").append("重伤人数：&nbsp;<input id='c_seriousInjuries' type='text' style='margin-top:auto;width:140px' /><br />");
		$("#ed_type_status").append("受困人数：&nbsp;<input id='c_trapped' type='text' style='margin-top:auto;width:140px'/><br />");
		$("#ed_type_status").append("死亡人数：&nbsp;<input id='c_dead' type='text' style='margin-top:auto;width:140px'/><br />");
		$("#ed_type_status").append("失去住所人数：&nbsp;<input id='c_lossResidence' type='text' style='margin-top:auto;width:120px' /><br />");
		
		if(abnormalState != "" && abnormalState != null){
			//表示现在该事件处于修改状态，在页面上显示默认信息
			var selectData = abnormalState.split(";")
			var dataValue1 = selectData[0].split("：");//受伤人数
			var dataValue2 = selectData[1].split("：");//重伤人数
			var dataValue3 = selectData[2].split("：");//受控人数
			var dataValue4 = selectData[3].split("：");//市区住所人数
			var dataValue5 = selectData[4].split("：");//死亡人数
			
			//受伤人数
			$("#c_injur").attr("value",dataValue1[1]);
			//重伤人数
			$("#c_seriousInjuries").attr("value",dataValue2[1]);
			//受困人数
			$("#c_trapped").attr("value",dataValue3[1]);
			//失去住所人数
			$("#c_lossResidence").attr("value",dataValue4[1]);
			//死亡人数
			$("#c_dead").attr("value",dataValue5[1]);
		}
		
		//给提交按钮设置点击事件
		$("#ed_submit_button").on("click",function(){
			//获取到页面上填写的基本信息
			var returnValue = edGetBaseMessage();
			if(returnValue == null){
				return;
			}
			
			//获取受伤人数
			var c_injur = $('#c_injur').attr("value");
			//获取重伤人数
			var c_seriousInjuries = $('#c_seriousInjuries').attr("value");
			//受困人数
			var c_trapped = $("#c_trapped").attr("value");
			//失去住所人数
			var c_lossResidence = $("#c_lossResidence").attr("value");
			//死亡人数
			var c_dead = $("#c_dead").attr("value");
			
			var ed_abnormalState = "";
			ed_abnormalState = ed_abnormalState + "受伤人数：" + c_injur + ";";
			ed_abnormalState = ed_abnormalState + "重伤人数：" + c_seriousInjuries + ";";
			ed_abnormalState = ed_abnormalState + "受困人数：" + c_trapped + ";";
			ed_abnormalState = ed_abnormalState + "失去住所人数：" + c_lossResidence + ";";
			ed_abnormalState = ed_abnormalState + "死亡人数：" + c_dead + ";";
			
			ed_submitObject.abnormalState = ed_abnormalState.slice(0,ed_abnormalState.length-1);;
			//向后台提交请求，对用户输入的信息进行添加
			edAddEventFun();
		});
	}
	
	//生命线系统破坏
	function lifelineSystemFail(abnormalState){
		//清空装载事件类型状态的div：ed_type_status
		$("#ed_type_status").html("");
		
		//生命线系统类型数据
		var lifeline_data = [{"name":"公路"},{"name":"桥梁"},{"name":"铁路"},{"name":"水道"},{"name":"隧道"},{"name":"大型油气管线"}];
		
		$("#ed_type_status").append("名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:&nbsp;<input id='lls_name' type='text' style='width:150px'/><br />");
		$("#ed_type_status").append("类型选择:<br />");
		$.each(lifeline_data, function(i,item) {
			$("#ed_type_status").append("<input id='lls_type' type='radio' name='lifeLine' value='"+item.name+"' style='margin-left:15px;margin-top:auto;' />&nbsp;"+item.name+"<br />");
		});
		
		$("#ed_type_status").append("破坏状况:<br />");
		$("#ed_type_status").append("<input id='lls_dam' type='radio' name='lifeLine2' value='中断' style='margin-left:15px;margin-top:auto;' />&nbsp;中断<br />");
		$("#ed_type_status").append("<input id='lls_dam' type='radio' name='lifeLine2' value='通行' style='margin-left:15px;margin-top:auto;' />&nbsp;通行<br />");
		
		if(abnormalState != "" && abnormalState != null){
			//表示现在该事件处于修改状态，在页面上显示默认信息
			var selectData = abnormalState.split(";")
			var dataValue1 = selectData[0].split("：");//名称
			var dataValue2 = selectData[1].split("：");//类型选择
			var dataValue3 = selectData[2].split("：");//破坏状况
			
			$("#lls_name").attr("value",dataValue1[1]);
			$("#lls_type[value="+dataValue2[1]+"]").attr("checked","checked");
			$("#lls_dam[value="+dataValue3[1]+"]").attr("checked","checked");
		}
		
		$("#ed_submit_button").on("click",function(){
			//获取到页面上填写的基本信息
			var returnValue = edGetBaseMessage();
			if(returnValue == null){
				return;
			}
			//获取生命线名称
			var lls_name = $("#lls_name").attr("value");
			//获取生命线类型
			var lls_type = $('#lls_type:checked').attr("value");
			//获取生命线破坏状况
			var lls_dam = $('#lls_dam:checked').attr("value");
			
			var ed_abnormalState = "";
			ed_abnormalState = ed_abnormalState + "名称：" + lls_name +";";
			ed_abnormalState = ed_abnormalState + "生命线类型：" + lls_type +";";
			ed_abnormalState = ed_abnormalState + "破坏状况：" + lls_dam;
			ed_submitObject.abnormalState = ed_abnormalState;
			//向后台提交请求，对用户输入的信息进行添加
			edAddEventFun();
		});
		
	}
	
	//地质灾害
	function geologicHazards(abnormalState){
		//清空装载事件类型状态的div：ed_type_status
		$("#ed_type_status").html("");
		
		var geologicHaz = [{"name":"崩塌"},{"name":"滑坡"},{"name":"泥石流"},{"name":"堰塞湖"},{"name":"沙土液化"},{"name":"软土震陷和不均匀沉陷"}];
		
		$("#ed_type_status").append("类型选择:<br />");
		$.each(geologicHaz, function(i,item) {
			$("#ed_type_status").append("<input id='gh_type' type='radio' name='geologicHaz' value='"+item.name+"' style='margin-left:15px;margin-top:auto;' />&nbsp;"+item.name+"<br />");
		});
		$("#ed_type_status").append("危害程度:<br />");
		$("#ed_type_status").append("<input id='gh_dam' type='radio' name='geologicHaz2' style='margin-left:15px;margin-top:auto;' value='造成人员伤亡' />&nbsp;造成人员伤亡<br />");
		$("#ed_type_status").append("<input id='gh_dam' type='radio' name='geologicHaz2' style='margin-left:15px;margin-top:auto;' value='造成交通中断' />&nbsp;造成交通中断<br />");
		$("#ed_type_status").append("<input id='gh_dam' type='radio' name='geologicHaz2' style='margin-left:15px;margin-top:auto;' value='造成人员伤亡并且交通中断' />&nbsp;造成人员伤亡并且交通中断<br />");
		
		if(abnormalState != "" && abnormalState != null){
			//表示现在该事件处于修改状态，在页面上显示默认信息
			var selectData = abnormalState.split(";")
			var dataValue1 = selectData[0].split("：");//类型选择
			var dataValue2 = selectData[1].split("：");//危害程度
			
			$("#gh_type[value="+dataValue1[1]+"]").attr("checked","checked");
			$("#gh_dam[value="+dataValue2[1]+"]").attr("checked","checked");
		}
		
		$("#ed_submit_button").on("click",function(){
			//获取到页面上填写的基本信息
			var returnValue = edGetBaseMessage();
			if(returnValue == null){
				return;
			}
			//获取地质灾害类型
			var gh_type = $('#gh_type:checked').attr("value");
			//危害程度
			var gh_dam = $('#gh_dam:checked').attr("value");
			
			var ed_abnormalState = "";
			ed_abnormalState = ed_abnormalState + "灾害类型：" + gh_type +";";
			ed_abnormalState = ed_abnormalState + "危害程度：" + gh_dam;
			ed_submitObject.abnormalState = ed_abnormalState;
			//向后台提交请求，对用户输入的信息进行添加
			edAddEventFun();
		});
		
	}
	
	//次生灾害
	function secondaryDisaster(abnormalState){
		//清空装载事件类型状态的div：ed_type_status
		$("#ed_type_status").html("");
		var secondDisa = [{"name":"火灾"},{"name":"爆炸"},{"name":"有毒和放射泄露"},{"name":"水库"}];
		
		$("#ed_type_status").append("类型选择:<br />");
		$.each(secondDisa, function(i,item) {
			$("#ed_type_status").append("<input id='sd_type' type='radio' name='secondDisa' value='"+item.name+"' style='margin-left:15px;margin-top:auto;' />&nbsp;"+item.name+"<br />");
		});
		$("#ed_type_status").append("危害程度:<br />");
		$("#ed_type_status").append("<input id='sd_dam' type='radio' name='secondDisa2' style='margin-left:15px;margin-top:auto;' value='造成人员伤亡'  />&nbsp;造成人员伤亡<br />");
		$("#ed_type_status").append("<input id='sd_dam' type='radio' name='secondDisa2' style='margin-left:15px;margin-top:auto;' value='建筑物倒塌' />&nbsp;建筑物倒塌<br />");
		$("#ed_type_status").append("<input id='sd_dam' type='radio' name='secondDisa2' style='margin-left:15px;margin-top:auto;' value='交通中断' />&nbsp;交通中断<br />");
		
		if(abnormalState != "" && abnormalState != null){
			//表示现在该事件处于修改状态，在页面上显示默认信息
			var selectData = abnormalState.split(";")
			var dataValue1 = selectData[0].split("：");//类型选择
			var dataValue2 = selectData[1].split("：");//危害程度
			
			$("#sd_type[value="+dataValue1[1]+"]").attr("checked","checked");
			$("#sd_dam[value="+dataValue2[1]+"]").attr("checked","checked");
		}
		
		$("#ed_submit_button").on("click",function(){
			//获取到页面上填写的基本信息
			var returnValue = edGetBaseMessage();
			if(returnValue == null){
				return;
			}
			//获取次生灾害类型
			var sd_type = $('#sd_type:checked').attr("value");
			//危害程度
			var sd_dam = $('#sd_dam:checked').attr("value");
			
			var ed_abnormalState = "";
			ed_abnormalState = ed_abnormalState + "次生灾害类型：" + sd_type +";";
			ed_abnormalState = ed_abnormalState + "危害程度：" + sd_dam;
			ed_submitObject.abnormalState = ed_abnormalState;
			//向后台提交请求，对用户输入的信息进行添加
			edAddEventFun();
		});
		
	}
	
	//社会影响
	function socialInfluence(abnormalState){
		//清空装载事件类型状态的div：ed_type_status
		$("#ed_type_status").html("");
		
		//破坏程度数据
		var socialInfl = [{"code":"sitype_001","name":"通讯","children":[{"name":"所有通讯正常"},{"name":"通讯不畅，手机很难拨通"},{"name":"固定电话很难拨通"}]},
						   {"code":"sitype_002","name":"供水","children":[{"name":"有饮用水"},{"name":"饮用水短缺"}]},
						   {"code":"sitype_003","name":"供电","children":[{"name":"电力供应中断"},{"name":"电力供应部分中断"},{"name":"电力供应正常"}]},
						   {"code":"sitype_004","name":"供气","children":[{"name":"天然气供应中断"},{"name":"天然气供应正常"}]},
						   {"code":"sitype_005","name":"社会治安","children":[{"name":"治安良好"},{"name":"有盗抢事件"},{"name":"盗抢事件严重"}]},
						   {"code":"sitype_006","name":"疫情","children":[{"name":"无流行性疾病蔓延"},{"name":"有流行性疾病正在蔓延"}]}];
		
		$.each(socialInfl, function(i,item) {
			$("#ed_type_status").append("<input id='"+item.code+"' class='si_type' type='checkbox' name='socialInflCheck' style='margin-left:5px;margin-top:auto;' value='"+item.name+"' />&nbsp;"+item.name+"<br />");
			$.each(item.children, function(j,index) {
				$("#ed_type_status").append("<input class='si_type_value' id='c_"+item.code+"' type='radio' name='"+item.code+"' style='margin-left:15px;margin-top:auto;' value='"+index.name+"' />&nbsp;"+index.name+"<br />");
			});
		});
		
		if(abnormalState != "" && abnormalState != null){
			//表示现在该事件处于修改状态，在页面上显示默认信息
			var selectData = abnormalState.split(";")
			for (var k=0; k<selectData.length; k++) {
				var dataValue = selectData[k].split("：");
				$(".si_type[value="+dataValue[0]+"]").attr("checked","checked");
				$(".si_type_value[value="+dataValue[1]+"]").attr("checked","checked");
			}
		}
		
		$("#ed_submit_button").on("click",function(){
			//获取到页面上填写的基本信息
			var returnValue = edGetBaseMessage();
			if(returnValue == null){
				return;
			}
			//获取到用户选中的数据
			var abnormal_state = "";
			var si_types = $('.si_type:checked');
			for (var i=0; i<si_types.length; i++) {
				var type_value = si_types[i].value;
				var dam_value = $('#c_'+si_types[i].id+':checked').attr("value");
				if(dam_value != ""){
					abnormal_state = abnormal_state + type_value + "：" + dam_value + ";"
				}
			}
			abnormal_state = abnormal_state.slice(0,abnormal_state.length-1);
			ed_submitObject.abnormalState = abnormal_state;
			//向后台提交请求，对用户输入的信息进行添加
			edAddEventFun();
		});
		
	}
	
	//其他灾害
	function otherDisasters(){
		//清空装载事件类型状态的div：ed_type_status
		$("#ed_type_status").html("");
		ed_submitObject.abnormalState = "";
		//向后台提交请求，对用户输入的信息进行添加
		edAddEventFun();
	}
	
	/*
	 * 获取页面上通用的，共同的信息
	 * */
	function edGetBaseMessage(){
		//获取经纬度，并且判断其是否为空
		var ed_x = $("#ed_lat").attr("value");
		var ed_y = $("#ed_lon").attr("value");
		if(ed_x == "" || ed_x == null){
			alertInfoWinInit("请填写或者在地图上选取坐标经度");
			return null;
		}
		if(ed_y == "" || ed_y == null){
			alertInfoWinInit("请填写或者在地图上选取坐标纬度");
			return null;
		}
		//获取发生事件的详细地址描述
		var ed_e_address = $("#ed_eventAddress").attr("value");
		if(ed_e_address == "" || ed_e_address == null){
			alertInfoWinInit("请填写详细地址信息");
			return null;
		}
		//获取事件的发生时间，如果为空，则默认当前时间
		ed_submitObject.time = $("#ed_eventTime").attr("value");
		//获取对事件的描述信息
		ed_submitObject.description = $("#ed_eventDesc").attr("value");
		ed_submitObject.address = ed_e_address;
		ed_submitObject.x = ed_x;
		ed_submitObject.y = ed_y;
		//获取到当前事件的事件类型以及名称
		ed_submitObject.abnormalId = ed_event_type;
		ed_submitObject.abnormalName = ed_type_name;
		//用户id和用户名
		ed_submitObject.userId = $scope.sys_userid;
		ed_submitObject.userName = $scope.sys_username;
		//当前地震编码
		ed_submitObject.eqId = $('#ed_eq_list').combobox('getValue');
		
		return true;
	}
	
	//新增事件
	$scope.edEventAdd = function(){
		//显示添加事件信息填写面板，隐藏事件列表
		$("#ed_event_list_div").css("display","none");
		$("#ed_addEventDiv").css("display","block");
		//设置当前的操作为添加
		isUpdate = false;
	}
	
	//返回按钮所作的操作
	$scope.edAddEvReturn = function(){
		$("#ed_event_list_div").css("display","block");
		$("#ed_addEventDiv").css("display","none");
	}
	
	/*
	 * 上报或者修改事件的方法
	 * */
	function edAddEventFun(){
		//当前是修改操作
		if(isUpdate){
			ed_submitObject.id = ed_update_event_id;
			$.ajax({
				type:"post",
				url:PATH + urlConfig.earthDisUpMessage,
				data:ed_submitObject,
				async:true,
				success:function(data){
					alertInfoWinInit("修改成功！");
					//上报成功之后，删除地图上的画点控件
					if(ed_drawPoint != undefined){
						map.removeControl(ed_drawPoint);
					}
					//刷新事件列表
					edSearchEventFun();
				}
			});
		}
		else
		{
			//当前是添加操作
			$.ajax({
				type:"post",
				url:PATH + urlConfig.earthDisaster,
				data:ed_submitObject,
				async:true,
				success:function(data){
					alertInfoWinInit("上报成功");
					//上报成功之后，删除地图上的画点控件
					if(ed_drawPoint != undefined){
						map.removeControl(ed_drawPoint);
					}
					//刷新事件列表
					edSearchEventFun();
				}
			});
		}
		
	}
	
	function edSearchEventFun(){
		$("#ed_event_lists").html("");
		var parma = new Object();
//		parma.eqId = "2";//当前地震编码
		parma.userId = $scope.sys_userid;//当前用户
		$.ajax({
			type:"post",
			url:PATH + urlConfig.earthDisQueryByU,
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
					var listDiv = "<div class='ad_evnet_list'>"+
						"<div>事件描述：&nbsp;<span>"+itemData.abnormal_name+","+itemData.abnormal_state+"</span></div>"+
						"<div>上报时间：&nbsp;<span>"+itemData.time+"</span></div>"+
						"<div>审核状态：&nbsp;<span>"+check+"</span>"+
						"<button id='ed_list_up"+itemData.id+"' style='display:"+budisplay+"'>修改</button><button id='ed_list_del"+itemData.id+"' style='display:"+budisplay+"'>删除</button></div>"+
						"<hr/>"
					+"</div>";
					$("#ed_event_lists").append(listDiv);
					//当事件的审核状态为审核未通过和待审核时，显示修改和删除按钮，对事件进行删除或者修改
					$("#ed_list_up"+itemData.id).click(function(){
						$("#ed_submit_button").off("click");//关闭提交按钮的点击事件
						isUpdate = true;//代表当前的操作是信息修改
						//点击修改按钮时，显示信息填写面板，将当前的数据默认进行填写
						$("#ed_event_list_div").css("display","none");
						$("#ed_addEventDiv").css("display","block");
						//进行信息填写
						//首先根据abnormal_id在earthquakeDisaster_data中找到该条数据
						for(var s=0; s<earthquakeDisaster_data.length; s++){
							if(earthquakeDisaster_data[s].code == itemData.abnormal_id){
								//修改背景，并且调用展示事件状态的方法
								$("#ed_"+itemData.abnormal_id).attr("name","on");
								$(".ed_selectDiv").removeClass("ed_selectDivY").addClass("ed_selectDivN");
								$("#ed_"+itemData.abnormal_id).removeClass("ed_selectDivN").addClass("ed_selectDivY");
								//调用方法，展示事件状态
								eval(earthquakeDisaster_data[s].initFunc+"(itemData.abnormal_state)");
							}
						}
						//填写其他信息
						$("#ed_lat").attr("value",itemData.x);
						$("#ed_lon").attr("value",itemData.y);
						$("#ed_eventAddress").attr("value",itemData.address);
						$("#ed_eventTime").attr("value",itemData.time);
						$("#ed_eventDesc").attr("value",itemData.description);
						
						ed_event_type = itemData.abnormal_id;
						ed_type_name = itemData.abnormal_name;
						
						
					});
					
					$("#ed_list_del"+itemData.id).click(function(){
						$.ajax({
							type:"post",
							url:PATH+urlConfig.earthDisDel,
							data:{ids:itemData.id},
							async:true,
							success:function(data){
								alertInfoWinInit("删除成功");
								//刷新列表
								edSearchEventFun();
							}
							
						});
					});
					
				});
			}
		});
	}
	
}]);