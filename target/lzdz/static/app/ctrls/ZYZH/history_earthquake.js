/*
 * 历史地震模块
 * 	历史地震的数据来源有两个：1、历史地震表中的数据 2、系统中上报的历史地震，这个数据的信息要比1中的信息多
 * */
MainApp.controller('historiEarthquakeCtrls', [ '$scope', function($scope) {
	$scope.historiEarthModuleInit = function(){
		
	};
	
}]);

function initHistorEar(){
	//注，在完成地震触发功能后，这里首先查询地震目录表中的数据，查询条件：状态为0并且为真实地震的数据，然后在查询数据库中的历史地震表
	//查询历史地震数据
	searchHistoryEarchquake("SMID>0 order by SMID desc");
	//显示查询窗口
	$("#searchDiv").css("display","block");
	$("#searchDiv img").on("click",function(){
		var inputMess = $("#searchDiv input").attr("value");
		var sqlCon = "";
		if(inputMess != ""){
			var attrs = spaceDataAttrConfig.historyEarthquake;//获取到可匹配的字段
			for(var obj in attrs){
				sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
			}
			sqlCon = sqlCon.slice(0,sqlCon.length-4);
		}
		else
		{
			sqlCon = "SMID>0";
		}
		
		sqlCon = sqlCon + " order by SMID desc";
		searchHistoryEarchquake(sqlCon);
		
	});
	
}

function searchHistoryEarchquake(sqlString){
	loadingWinInit(true);
	//查询历史地震数据
	querySpaceService.comSqlService(urlConfig.historyEarth,sqlString,function resultFunction(queryEventArgs){
		if(queryEventArgs.result == null || queryEventArgs == undefined){
			return;
		}
		//清除图层和左侧列表
		clusterLayer.removeAllFeatures();
		$("#historiEarthquake").html("");
		var features = queryEventArgs.result.features;
		//给feature设置样式
		$.each(features, function(i,item) {
			features[i].style = {
				pointRadius: 4,
				graphic:true,
				externalGraphic:historyEarthquake,
				graphicWidth:32,
				graphicHeight:32
			};
			//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果,在聚合图层这个ID在缩放的时候会被重新付值，所以将这个表示字段加载feature的attributes属性中
			features[i].attributes.id = "historyEarthquake_"+item.attributes.SMID;
			
			//创建左侧列表
			var labelDiv = $("#historiEarthquake").append("<div class='he_labelDiv' id='he_"+item.attributes.SMID+"'>"+item.attributes.EVENTDATE+"&nbsp;"+item.attributes.EVENTTIME+"</div>");
			$("#he_"+item.attributes.SMID).click(function(){
				//获取到当前页面上的feature
				//var currF = clusterLayer.getFeaturesByAttribute("SMID",item.attributes.SMID);
				//弹出信息显示窗口
				closeInfoWin();
				var lon = new SuperMap.LonLat(item.geometry.x,item.geometry.y);
				//将地图缩放到最大级别，并且重新定位中心点
				map.zoomToScale(9);
				map.setCenter(lon);
				//获取要展示的信息
				var cf_id = item.attributes.id;//获取到feature的id，为了区分当前数据是哪一类数据
				var currentData = cf_id.slice(0,cf_id.indexOf("_"));//获取到当前结果是哪一类数据
				attributesData = spaceDataAttrConfig[currentData];//获取到当前要展示的属性
				showText = "";
				for(obj in attributesData){
					if(item.attributes[obj] != null && item.attributes[obj] != "" ){
						showText = showText + attributesData[obj] + "：&nbsp;" + item.attributes[obj] + "</br>";
					}
				}
				openInfoWin(lon,showText);
			});
		});
		
		clusterLayer.addFeatures(features);
		loadingWinInit(false);
	});
	
}
