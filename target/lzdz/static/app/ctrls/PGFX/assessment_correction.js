/*
 * 评估修正模块
 */
MainApp.controller("asseCorreCtrls", ["$scope", function($scope) {
	$scope.asseCorreModuleInit=function(){
		initOption();
	}
	function addFeature(serverURL){
		var check_sql = "SMID > 0";
		querySpaceService.comSqlService(serverURL,check_sql,function checkResult(checkResults){
			var features, result = checkResults.result.features;
			vectorLayer.addFeatures(result);
		});
	}

	$("#selectAreaid").click(function(){
		getOption();
	})

	$("#sec_earth_para_button").click(function(){
		$("#pre_ana_process").empty();
		addElementDiv("pre_ana_process","范围修正开始...")
		fixArrage();
		addElementDiv("pre_ana_process","...")
		addElementDiv("pre_ana_process","房屋修正开始...")
		fixHouse();
		addElementDiv("pre_ana_process","...")
		addElementDiv("pre_ana_process","人口修正开始...")
		fixPoeple();
		addElementDiv("pre_ana_process","...")
		addElementDiv("pre_ana_process","生命线修正开始...")
		fixLifeline();
		addElementDiv("pre_ana_process","...")
	})
	$("#sec_earth_map_button").click(function(){
		draw_polygon();
	})
	$("#sec_earth_clear_button").click(function(){
		clearFeatures();
	})
	function initOption(){
		//根据id查找对象，
			$.ajax({
				type: "post",
				url: PATH + urlConfig.popQueryUrl,
				data: {parameter: "ALL"},
				contentType: "application/x-www-form-urlencoded;charset=UTF-8",
				async: true,
				success: function (result) {
					$("#selectAreaid").empty();
					var selectVF=document.getElementById("selectAreaid");
					for (var i = 0; i < result.length; i++) {
						if (result[i].town_id != null) {
							var newOption = document.createElement("option");
							newOption.value =result[i].town_id;
							newOption.text=result[i].Name;
							selectVF.add(newOption);
						} else {
							var newOption = document.createElement("option");
							newOption.value =result[i].county_id;
							newOption.text=result[i].Name;
							selectVF.add(newOption);
						}

					}

				}
			})

		//添加一个选项
		//obj.add(new Option("文本","值"));    //这个只能在IE中有效

	}
	function getOption(){
		var selectCamera = document.getElementById("selectAreaid");
		var selectedIndex = selectCamera.selectedIndex;
		selectCamera.options(selectedIndex).value;
		alert(selectCamera.options(selectedIndex).text)

	}
	function fixArrage(){
		var check_sql = "SMID > 0";
		querySpaceService.comSqlService(urlConfig.streetLine,check_sql,function checkResult(checkResults){
			var check_features = checkResults.result.features;
			//清除地图上地图查询的结果
			//vectorLayer.removeFeatures(mapTool_saveFeatures);
			//mapTool_saveFeatures = [];//重置保存查询结果的数组
			if(check_features.length > 0){
				check_features[0].style = {
					fillColor:"red",
					strokeColor:"#C1FFC1",
					fillOpacity:0.5
				};
				check_features[0].id = "placeAddress_0";
				//mapTool_saveFeatures.push(check_features[0]);
				vectorLayer.addFeatures(check_features);
				//map.setCenter(new SuperMap.LonLat(x,y));
				return;
			}
		});
	}

	function fixPoeple(){
		var check_sql = "SMID > 0";
		querySpaceService.comSqlService(urlConfig.popDensity,check_sql,function checkResult(checkResults){
			var check_features = checkResults.result.features;
			//清除地图上地图查询的结果
			if(check_features.length > 0) {
				for(var i=0;i<check_features.length;i++){
					var r=0.7*check_features[i].attributes.POP_END/100;
					check_features[i].style = {
						fillColor: "red",
						strokeColor: "#C1FFC1",
						fillOpacity: r
					};
					check_features[i].id = "placeAddress_0";
					vectorLayer.addFeatures(check_features[i]);
				}
				return;
			}
		});
	}

	function fixHouse(){
		$.ajax({
			type:"post",
			url:PATH + urlConfig.builConUrl,
			data:{parameter:"ALL"},
			contentType:"application/x-www-form-urlencoded;charset=UTF-8",
			async:true,
			success:function(result){

			}
		})
	}

	function fixLifeline(){
		var check_sql = "SMID > 0";
		querySpaceService.comSqlService(urlConfig.roadDataSet,check_sql,function checkResult(checkResults){
			var features = checkResults.result.features;
			//给feature设置样式
			for (var i=0; i<features.length; i++) {
				//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
				features[i].id = "tunnels_"+features[i].attributes.SMID;
				var centerPoint = features[i].geometry.getCentroid();
				features[i].geometry.x = centerPoint.x;
				features[i].geometry.y = centerPoint.y;
			}
			vectorLayer.addFeatures(features);
		});
		querySpaceService.comSqlService(urlConfig.railWayDataSet,check_sql,function checkResult(checkResults){
			var features = checkResults.result.features;
			//给feature设置样式
			for (var i=0; i<features.length; i++) {
				//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
				features[i].id = "tunnels_"+features[i].attributes.SMID;
				var centerPoint = features[i].geometry.getCentroid();
				features[i].geometry.x = centerPoint.x;
				features[i].geometry.y = centerPoint.y;
			}
			vectorLayer.addFeatures(features);
		});
		querySpaceService.comSqlService(urlConfig.bridge1DataSet,check_sql,function checkResult(checkResults){
			var features = checkResults.result.features;
			//给feature设置样式
			for (var i=0; i<features.length; i++) {
				//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
				features[i].id = "tunnels_"+features[i].attributes.SMID;
				var centerPoint = features[i].geometry.getCentroid();
				features[i].geometry.x = centerPoint.x;
				features[i].geometry.y = centerPoint.y;
			}
			vectorLayer.addFeatures(features);
		});
		querySpaceService.comSqlService(urlConfig.bridge2DataSet,check_sql,function checkResult(checkResults){
			var features = checkResults.result.features;
			//给feature设置样式
			for (var i=0; i<features.length; i++) {
				//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
				features[i].id = "tunnels_"+features[i].attributes.SMID;
				var centerPoint = features[i].geometry.getCentroid();
				features[i].geometry.x = centerPoint.x;
				features[i].geometry.y = centerPoint.y;
			}
			vectorLayer.addFeatures(features);
		});
		querySpaceService.comSqlService(urlConfig.tunnelDataSet,check_sql,function checkResult(checkResults){
			var features = checkResults.result.features;
			//给feature设置样式
			for (var i=0; i<features.length; i++) {
				//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
				features[i].id = "tunnels_"+features[i].attributes.SMID;
				var centerPoint = features[i].geometry.getCentroid();
				features[i].geometry.x = centerPoint.x;
				features[i].geometry.y = centerPoint.y;
			}
			vectorLayer.addFeatures(features);
		});
	}
	
}]);



