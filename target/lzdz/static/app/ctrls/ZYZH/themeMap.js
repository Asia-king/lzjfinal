MainApp.controller('themeMapCtrls', [ '$scope', function($scope) {
	//专题图页面初始化
	$scope.themeMapModuleInit = function(){
		var selectDiv = "";
		//从配置文件中获取到专题图模块左侧面板展示需要的数据
		$.each(themeMap_data, function(i,item) {
			//给span设置不同的ID，方便控制样式
			var spanId = "";
			if(item.name.length > 4){
				spanId = "spanHalf";
			}
			else
			{
				spanId = "spanFull";
			}
			selectDiv = "<div id='"+ item.code +"' class='tm_selectDiv tm_selectDivN' name='off'><label id="+spanId+">"+item.name+"</label></div>";
			$("#themeMap").append(selectDiv);
			//给div设置click事件
			var sd = "#"+item.code;
			$("#"+item.code).click(function(){
				var tm_classify = $("#"+item.code).attr("name");
				
				//清理图层
				vectorLayer.removeAllFeatures();
				removeOneLayer("兰州市人口点密度专题图");
					
				//隐藏图例窗口
				$("#legend").css("display","none");
				//判断当前项是选中的还是没有被选中，如果是选中的，调用该项的初始化方法，如果没有被选中，清理图层
				if(tm_classify == "on"){
					$("#"+item.code).attr("name","off");
					//切换背景图片
					$("#"+item.code).removeClass("tm_selectDivY").addClass("tm_selectDivN");
//					$("#"+item.code).css("background-image","url(jfinal-easyui/../static/images/tm_noSelect.png)");
				}
				else
				{
					$(".tm_selectDiv").attr("name","off");
					$("#"+item.code).attr("name","on");
					//切换背景图片
					$(".tm_selectDiv").removeClass("tm_selectDivY").addClass("tm_selectDivN");
					$("#"+item.code).removeClass("tm_selectDivN").addClass("tm_selectDivY");
//					$(".tm_selectDiv").css("background-image","url(jfinal-easyui/../static/images/tm_noSelect.png)");
//					$("#"+item.code).css("background-image","url(jfinal-easyui/../static/images/tm_select.png)");
					eval(item.initFun);
				}
			});
		});
		
		//人口密度专题图
		function populationDensity(){
			loadingWinInit(true);
			var themeLayer;
			removeOneLayer("兰州市人口点密度专题图");
			var themeService = new SuperMap.REST.ThemeService(urlConfig.iserverMapUrl, {eventListeners:{"processCompleted": popDensityThemeResult, "processFailed": popThemeFailed}}),
            dotStyle = new SuperMap.REST.ServerStyle({
                markerSize: 3,
                markerSymbolID: 12,
                fillForeColor:new SuperMap.REST.ServerColor(255,0,0),
                lineColor:new SuperMap.REST.ServerColor(255,0,0)
            }),
            themeDotDensity = new SuperMap.REST.ThemeDotDensity({
                dotExpression: "POP_END",
                value: 5,
                style: dotStyle
            }),
            themeParameters = new SuperMap.REST.ThemeParameters({
                themes: [themeDotDensity],
                datasetNames: [urlConfig.popDensity],
                dataSourceNames: [urlConfig.iserverDataSource]
            });
            themeService.processAsync(themeParameters);
		}
		function popDensityThemeResult(themeEventArgs) {
            if(themeEventArgs.result.resourceInfo.id) {
                themeLayer = new SuperMap.Layer.TiledDynamicRESTLayer("兰州市人口点密度专题图", urlConfig.iserverMapUrl, {cacheEnabled: false, transparent: true,layersID: themeEventArgs.result.resourceInfo.id}, {"maxResolution":"auto"});
                themeLayer.events.on({"layerInitialized": addPopThemelayer});
            }
        }
        function addPopThemelayer() {
            map.addLayer(themeLayer);
            loadingWinInit(false);
        }
        
        function popThemeFailed(serviceFailedEventArgs){
        	
        }
		//经济统计专题图
		
		//建筑物专题图
		
		//地震带
		function tmSeismicBelt(){
			vectorLayer.removeAllFeatures();
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.sbDataSet,"",function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				var features = queryEventArgs.result.features;
				vectorLayer.addFeatures(features);
			});
		}
		
		//危险源分布,分了四类数据，有数据表中CLASS字段区分，0,1,2,3,4
		function tmDangerousSource(){
			vectorLayer.removeAllFeatures();
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.dsDataSet,"",function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				var features = queryEventArgs.result.features;
				var fClassify = dataDifferAttrClassify.dangerousSource;
				for (var i=0; i<features.length;i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:fClassify[features[i].attributes.CLASS].img,
						graphicWidth:34,
						graphicHeight:38
					};
					features[i].id = "dangerousSource_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
				
				//创建图例
				tmCreateLegend("危险源性质：",fClassify);
			});
		}
		
		//医院
		function tmHospital(){
			vectorLayer.removeAllFeatures();
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.hDataSet,"",function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				var features = queryEventArgs.result.features;
				var fClassify = dataDifferAttrClassify.hospital;
				for (var i=0; i<features.length;i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:fClassify,
						graphicWidth:34,
						graphicHeight:38
					};
					features[i].id = "hospital_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
			});
		}
		
		//学校
		function tmSchool(){
			vectorLayer.removeAllFeatures();
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.slDataSet,"",function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				var features = queryEventArgs.result.features;
				var f_classify = dataDifferAttrClassify.school;
				for (var i=0; i<features.length;i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:f_classify[features[i].attributes.CLASS_1].img,
						graphicWidth:34,
						graphicHeight:38
					};
					features[i].id = "schools_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
				//创建图例
				tmCreateLegend("学校性质：",f_classify);
			});
			
		}
		
		//地质灾害隐患点
		function tmGeologicalHazard(){
			vectorLayer.removeAllFeatures();
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.ghDataSet,"",function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				var features = queryEventArgs.result.features;
				var fClassify = dataDifferAttrClassify.geologicalHazard;
				for (var i=0; i<features.length;i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:fClassify[features[i].attributes.CLASS].img,
						graphicWidth:34,
						graphicHeight:38
					};
					features[i].id = "geologivalHarbor_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
				//创建图例
				tmCreateLegend("地质灾害隐患点性质：",fClassify);
			});
		}
		
		//避险场所分布
		function tmEvacuationSite(){
			vectorLayer.removeAllFeatures();
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.esDataSet,"",function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				var features = queryEventArgs.result.features;
				var fClassify = dataDifferAttrClassify.evacuationSite;
				for (var i=0; i<features.length;i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:fClassify[features[i].attributes.CLASS_1].img,
						graphicWidth:34,
						graphicHeight:38
					};
					features[i].id = "evacuationSite_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
				//创建图例
				tmCreateLegend("避险场所性质：",fClassify);
			});
		}
		
		//重点目标
		function tmSigObjective(){
			vectorLayer.removeAllFeatures();
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.soDataSet,"",function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				var features = queryEventArgs.result.features;
				var fClassify = dataDifferAttrClassify.sigObjective;
				for (var i=0; i<features.length;i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:fClassify[features[i].attributes.FEATURE].img,
						graphicWidth:34,
						graphicHeight:38
					};
					features[i].id = "sigObjective_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
				//创建图例
				tmCreateLegend("重点目标性质：",fClassify);
			});
		}
		
		//救灾物资储备点
		function tmStorage(){
			vectorLayer.removeAllFeatures();
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.sDataSet,"",function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				var features = queryEventArgs.result.features;
				var fClassify = dataDifferAttrClassify.storage;
				for (var i=0; i<features.length;i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:fClassify,
						graphicWidth:34,
						graphicHeight:38
					};
					features[i].id = "storage_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
			});
		}
		
		//交通管制点
		function tmEntrances(){
			vectorLayer.removeAllFeatures();
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.heDataSet,"",function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				var features = queryEventArgs.result.features;
				var fClassify = dataDifferAttrClassify.entrances;
				for (var i=0; i<features.length;i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:fClassify,
						graphicWidth:37,
						graphicHeight:38
					};
					features[i].id = "entrances_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
			});
		}
		
		
		//制作专题图模块的图例
		function tmCreateLegend(l_title,classify){
			//创建图例
			$("#legend").css("display","block");
			$(".legendContent").html("");
			$("#legendTitle").html("");
			for (var obj in classify) {
				var con = classify[obj];
				var legendCon = "<img src='"+con.img+"'/><span>"+con.name+"</span><br/>"
				$(".legendContent").append(legendCon);
			}
		}
	}
}]);