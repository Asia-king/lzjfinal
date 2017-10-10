/*
 * 地震前兆
 */
MainApp.controller("precursorCtrls", ["$scope", function($scope) {
	var earthquakePrecursor = $("#earthquakePrecursor");
	$scope.precursorInit = function() {
		$scope.pre_fist = precursor_data[0];
		$scope.pre_status = precursor_data[0].status;
		//除去数组中第一条数据
		precursor_data.shift();
		$scope.pre_data = precursor_data;
		
		
		$scope.statusFunc = function(code,status) {
			$(".pre_option").removeClass("pre_optionN").addClass("pre_optionY");
			$("#" + code).removeClass("pre_optionY").addClass("pre_optionN");
			$scope.pre_status = status;
			//"pd009"这个值与baseDataconfig文件中precursor_data的最后一个值想对应，不能随便修改
			if(code == "pd009"){
				//如果点击了其他异常，隐藏状态选择提示信息
				$("#pre_statu_mess").css("display","none");
			}
			else
			{
				$("#pre_statu_mess").css("display","block");
			}
		};
		$("#happenTime").click(function(){
			WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'});
		});
		$("#pre_search").click(function(){
			drawPoint = new SuperMap.Control.DrawFeature(measureLayer,SuperMap.Handler.Point,{multi:true});
			drawPoint.events.on({"featureadded":drawCompleted});
			map.addControl(drawPoint);
			drawPoint.activate();
		});
		function drawCompleted(drawGeometryArgs){
			drawPoint.deactivate();
			var geometry = drawGeometryArgs.feature.geometry;
			$("#x").attr("value",geometry.components[0].x);
			$("#y").attr("value",geometry.components[0].y);
		}
		$scope.report = function(){
			$.ajax({
				type:"post",
				url:PATH+urlConfig.abnormalReport,
				data:{
					time:$("#happenTime").attr("value"),
					x:$("#x").attr("value"),
					y:$("#y").attr("value"),
					address:$("#detailedAddress").attr("value"),
					state:"0",
					abnormalId:$(".pre_optionN").attr("id"),
					abnormalName:$(".pre_optionN").attr("name"),
					abnormalState:$(".pre_status input[type=checkbox]:checked").map(function(index, elem){return $(elem).val();}).get().join(","),
					description:$("#describe").attr("value"),
					userId:$scope.sys_userid,
					userName:$scope.sys_username
				},
				async:true,
				success:function(data){
					if(data){
						alertInfoWinInit("上报成功");
						$("#x").attr("value","");
						$("#y").attr("value","");
						$("#happenTime").attr("value","");
						$("#detailedAddress").attr("value","");
						$("#describe").attr("value","");
						$(".pre_status input[type=checkbox]").removeAttr("checked");
						preAll();
					}
				}
			});
		};
		
		$scope.epPreLoad = function(){
			$(".pre_option").removeClass("pre_optionN").addClass("pre_optionY");
			$("#" + precursor_data[0].code).removeClass("pre_optionY").addClass("pre_optionN");
		}
//		preAll();
	}
	
//		querySpaceService.comSqlService(urlConfig.abnormalReport,"",function resultFunction(queryEventArgs){
//			loadingWinInit(false);
//			if(queryEventArgs.result == null || queryEventArgs == undefined){
//				return;
//			}
//			var features = queryEventArgs.result.features;
//			var features = [];
//			//给feature设置样式
//			for (var i=0; i<features.length; i++) {
//				var f = new SuperMap.Feature.Vector();
//				f.geometry = new SuperMap.Geometry.Point(mapCulFearures[i].SMX, mapCulFearures[i].SMY);
//				f.attributes = {
//					ID:result[i].ID,
//					ZX_ID:result[i].ZX_ID,
//					NAME:result[i].NAME,
//					SMX:result[i].SMX,
//					SMY:result[i].SMY
//				};
//				features[i].id = "abnormalReport_"+features[i].attributes.SMID;
//				features.push(f);
//				//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
//			}
//			vectorLayer.addFeatures(features);
//		});
	
}]);

function preAll(){
	$.ajax({
		type:"post",
		url:PATH+urlConfig.reportquery,
		data:{parameter:"ALL"},
		async:true,
		success:function(data){
			//清除矢量图层
			vectorLayer.removeAllFeatures();
			$("#pre_list").css("display","block");
			$("#pre_All").datagrid({
				data:data,
			    title:'上报列表',
			    columns:[[ 
			    	{field:'ck',checkbox:'true'}, 
			    	{field:'user_name',title:'上报人',width:50}, 
//			        {field:'abnormal_id',title:'异常编码'},    
			        {field:'abnormal_name',title:'异常名称',width:150},
			        {field:'x',title:'经度',width:130},
			        {field:'y',title:'纬度',width:130},
			        {field:'abnormal_state',title:'异常状态',width:200},
			        {field:'address',title:'地址',width:200},
			        {field:'time',title:'上报时间',width:130},
			        {field:'img_url',title:'图片',formatter:prpictureFormat,width:60,align:'center'},
			        {field:'video_url',title:'视频',formatter:prvideoFormat,width:60,align:'center'},
			        {field:'audio_url',title:'音频',formatter:praudioFormat,width:60,align:'center'},
			        {field:'verbalize',title:'备注',width:200},
			    ]]    
			});
			var features = [];
			//给feature设置样式
			for (var i=0; i<data.length; i++) {
				var f = new SuperMap.Feature.Vector();
				f.geometry = new SuperMap.Geometry.Point(data[i].x, data[i].y);
				f.attributes = {
					ABNORMAL_ID:data[i].abnormal_id,
					ABNORMAL_NAME:data[i].abnormal_name,
					X:data[i].x,
					Y:data[i].y,
					ABNORMAL_STATE:data[i].abnormal_state,
					ADDRESS:data[i].address,
					TIME:data[i].time,
					VERBALIZE:data[i].verbalize,
					IMG_URL:data[i].img_url,
					VIDEO_URL:data[i].video_url,
					AUDIO_URL:data[i].audio_url,
					USERNAME:data[i].user_name
				};
				f.style = {
					pointRadius: 4,
					graphic:true,
					externalGraphic:zhzqFI,
					graphicWidth:44,
					graphicHeight:33
				};
				f.id = "abnormalReport_"+i;
				features.push(f);
				//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
			}
			vectorLayer.addFeatures(features);
		}
	});
};

/*
 * 上报事件删除
 * */
$("#pre_delete").on("click", function() {
	var data = $("#pre_All").datagrid("getChecked");
	var ids = "";
	$.each(data, function(i, n) {
		ids += (n.id + ",");
	});
	ids = ids.slice(0, ids.length - 1);
	$.ajax({
		type: "post",
		url: PATH + urlConfig.reportDelete,
		data: {
			"ids": ids
		},
		async: true,
		success: function(data) {
			if (data) {
				alertInfoWinInit("删除成功！");
				preAll();
			}
		}
	});
});

/*
 * 上报事件导出Excel
 * */
$("#pre_save").on("click",function(){
	var fileds = $('#pre_All').datagrid('getColumnFields');
	var headers = [];
	for (var i=0; i<fileds.length; i++) {
		var options = $('#pre_All').datagrid('getColumnOption',fileds[i+1]);
		if(options != null){
			headers.push(options["title"]);
		}
	}
	//获取数据内容
	var content = [];
	var rows = $('#pre_All').datagrid('getRows');
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
			$('#preAllForm').form('submit',{url:purl});
		}
	});
});

//图片浏览
function prpictureFormat(val,row){
	var reSpan = '<span id="p_'+row.id+'" style="color:red;cursor:pointer;" onclick="browsePicture(\''+val+'\')">查看</span>';
	return reSpan;
}
	
//视频播放
function prvideoFormat(val,row){
	var reSpan = '<span style="color:red;cursor:pointer;" onclick="playVideo(\''+val+'\')">查看</span>';
	return reSpan;
}

//音频播放
function praudioFormat(val,row){
	var reSpan = '<span style="color:red;cursor:pointer;" onclick="playAudio(\''+val+'\')">查看</span>';
	return reSpan;
}
