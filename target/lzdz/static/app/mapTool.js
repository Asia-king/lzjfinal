function mapToolInit(){
	//创建工具按钮最外层的div
	var tools = "<div id='tools'></div>";
	$("#mapContainerDiv").append(tools);
	//地图搜索
	var mapSearch = "<div id='mt_search' class='tool'><img src='jfinal-easyui/../static/images/mapTools/map_tool_search.png'/><span>搜索</span></div>";
	$("#tools").append(mapSearch);
	//测距
	var distance = "<div id='distance' class='tool'><img src='jfinal-easyui/../static/images/mapTools/map_tool_distance.png'/><span>测距</span></div>";
	$("#tools").append(distance);
	//测面积
	var area = "<div id='area' class='tool'><img src='jfinal-easyui/../static/images/mapTools/map_tool_area.png'/><span>测面积</span></div>";
	$("#tools").append(area);
	//全幅
	var full = "<div id='full' class='tool'><img src='jfinal-easyui/../static/images/mapTools/map_tool_full.png'/><span>全幅</span></div>";
	$("#tools").append(full);
	//清除
	var clear = "<div id='clear' class='tool'><img src='jfinal-easyui/../static/images/mapTools/map_tool_clear.png'/><span>清除</span></div>";
	$("#tools").append(clear);

	//点击地图搜索按钮时出现的搜索窗口
	var mtSearchWin = "<div id='mt_search_win'><input id='mt_search_info' value='输入坐标(格式：x,y)、地点名称' /><img src='jfinal-easyui/../static/images/mapTools/mt_search_button.png'/></div>";
	$("#tools").append(mtSearchWin);

	$("#distance").click(function(){
		MeastureClass.meastureDistance(map,measureLayer);
	});

	$("#area").click(function(){
		MeastureClass.meastureArea(map,measureLayer);
	});

	$("#full").click(function(){
		fullmap();
	});

	$("#clear").click(function(){
		clearMap();
	});

	$("#mt_search").toggle(
		function(){
			$("#mt_search_win").show();
		},
		function(){
			$("#mt_search_win").hide();
		}
	);

	$("#mt_search_info").focus(function(){
		var infoMess = $("#mt_search_info").attr("value");
		if(infoMess == "输入坐标(格式：x,y)、地点名称"){
			$("#mt_search_info").attr("value","");
			$("#mt_search_info").css("color","#0E0E0E");
		}
	});

	$("#mt_search_info").blur(function(){
		var infoMess2 = $("#mt_search_info").attr("value");
		if(infoMess2 == ""){
			$("#mt_search_info").attr("value","输入坐标(格式：x,y)、地点名称");
			$("#mt_search_info").css("color","#BFBFBF");
		}
	});

	//给搜索按钮给一个监听
	$("#mt_search_win img").click(function(){
		var searchInfo = $("#mt_search_info").attr("value");
		/*
		 * 用户输入有两种情况，1、某一位置的坐标 2、地点的名称
		 * 	第一种情况：将用户输入的WGS-84坐标转换成兰州市地图的坐标系CGCS2000，并且将该位置标注在地图上
		 * 	第二种情况：
		 * 	        1、在地名地址库中进行模糊匹配，然后将结果在地图上标注点位
		 * 			2、匹配兰州市行政区名称，在地图上标会出行政区的边界
		 * */
		//第一步：判断用户输入的经纬度坐标还是地名地址名称，坐标默认的格式是"x,y"
		if(searchInfo.indexOf(",") == -1){//判断用户输入的字符中是否有","(英文的逗号)
			//如果返回的匹配结果是"-1",说明用户输入的字符中不包含","，由此判断用户输入的不是坐标
			matchCharacters(searchInfo);//调用匹配行政区以及地名地址的方法
		}
		else
		{
			//使用","为分隔符，分割出x和y,分别判断这两个变量是否是double型
			var si_split = searchInfo.split(",");
			var x = si_split[0].replace(/(^\s*)|(\s*$)/g, "");//去除字符串的左右空格
			var y = si_split[1].replace(/(^\s*)|(\s*$)/g, "");//去除字符串的左右空格
			if(checkRate(x) && checkRate(y)){
				//首先对坐标进行一个转换
				var conCoords = convertCoords(x,y);
				//说明是坐标，在地名地址库中做匹配，如果存在直接上图，显示相关信息，如果不存在，上图但是不显示相关信息
				var check_sql = "FIELD_SMX = '"+conCoords.lon+"' and FIELD_SMY = '"+conCoords.lat+"'";
				querySpaceService.comSqlService(urlConfig.placeAddress,check_sql,function checkResult(checkResults){
					var check_features = checkResults.result.features;
					//清除地图上地图查询的结果
					vectorLayer.removeFeatures(mapTool_saveFeatures);
					mapTool_saveFeatures = [];//重置保存查询结果的数组
					if(check_features.length > 0){
						check_features[0].style = {
							pointRadius: 4,
							graphic:true,
							externalGraphic:mapSearchResultImg,
							graphicWidth:48,
							graphicHeight:48
						};
						check_features[0].id = "placeAddress_0";
						mapTool_saveFeatures.push(check_features[0]);
						vectorLayer.addFeatures(check_features);
						map.setCenter(new SuperMap.LonLat(conCoords.lon,conCoords.lat));
						return;
					}

					//如果没有查询到结果，直接上图
					var mt_f = new SuperMap.Feature.Vector();
					mt_f.geometry = new SuperMap.Geometry.Point(conCoords.lon,conCoords.lat);
					mt_f.style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:mapSearchResultImg,
						graphicWidth:48,
						graphicHeight:48
					};
					mt_f.id = "mapsearchfeature";
					mapTool_saveFeatures.push(mt_f);
					vectorLayer.addFeatures([mt_f]);
					map.setCenter(new SuperMap.LonLat(conCoords.lon,conCoords.lat));
				});
			}
			else
			{
				//用户输入的不是坐标
				matchCharacters(searchInfo);//调用匹配行政区以及地名地址的方法
			}

		}
	});
}

/*
 * 根据用户输入的信息，匹配出结果，有两种结果
 * 		1、首先匹配行政区划库，如果匹配到结果，在地图上绘制出该行政区的边界
 * 		2、如果在行政区划库中没有匹配到数据，在地名地址库中进行匹配，并且将结果标注到地图上
 * */
var mapTool_saveFeatures = [];//定义一个变量，存放地图查询查询出来的结果，方便在地图上做清除操作，这是一个全局变量
function matchCharacters(value){
	loadingWinInit(true);
	//首先根据用户输入的信息，查询行政区划库
	var ad_di_sql = "FULL_NAME like '%"+value+"%'";
	querySpaceService.comSqlService(urlConfig.countyLine,ad_di_sql,function resultFunction(queryEventArgs){
		//判断结果是否存在，如果不存在，在街道行政区库中进行匹配
		var r_features = queryEventArgs.result.features;
		if(r_features.length > 0){
			//说明有查询结果
			loadingWinInit(false);
			mapToolMapSearch(r_features,2);
			return;
		};

		//没有查询结果，在街道中继续进行匹配
		querySpaceService.comSqlService(urlConfig.streetLine,ad_di_sql,function streetFunction(streetEventArgs){
			//判断结果是否存在，如果不存在，地名地址库中进行匹配
			var st_features = streetEventArgs.result.features;
			if(st_features.length > 0){
				//说明有查询结果
				loadingWinInit(false);
				mapToolMapSearch(st_features,7);
				return;
			};

			var place_address_sql = "ADDNAME like '%"+value+"%' or DMMCXX like '%"+value+"%'";
			//如果没有查询结果，在地名地址库中继续进行匹配
			querySpaceService.comSqlService(urlConfig.placeAddress,place_address_sql,function placeAndAddFun(pdEventArgs){
				//判断结果是否存在，如果不存在，进行提示
				var pd_features = pdEventArgs.result.features;
				loadingWinInit(false);
				if(pd_features.length > 0){
					//说明有查询结果
					//清除地图上地图查询的结果
					vectorLayer.removeFeatures(mapTool_saveFeatures);
					mapTool_saveFeatures = [];//重置保存查询结果的数组

					for (var i=0; i<pd_features.length; i++) {
						pd_features[i].style = {
							pointRadius: 4,
							graphic:true,
							externalGraphic:mapSearchResultImg,
							graphicWidth:48,
							graphicHeight:48
						};
						pd_features[i].id = "placeAddress_"+ i;
						mapTool_saveFeatures.push(pd_features[i]);
					}
					vectorLayer.addFeatures(pd_features);
					map.zoomTo(2);
					return;
				};
				alertInfoWinInit("未找到相关地点，请输入其它地址");
			});

		});

	});
}

function mapToolMapSearch(r_features,level){
	//清除地图上地图查询的结果
	vectorLayer.removeFeatures(mapTool_saveFeatures);
	mapTool_saveFeatures = [];//重置保存查询结果的数组
	//将查询结果上图
	r_features[0].style = {
		strokeColor:"#F66E08",
		strokeWidth:5,
		fill:false
	};
//	r_features[0].id = "admin_division";
	var centerPoint = r_features[0].geometry.getCentroid();
	map.setCenter(new SuperMap.LonLat(centerPoint.x, centerPoint.y),level);
	vectorLayer.addFeatures(r_features);
	//将该结果进行保存，方便后续进行地图清除操作
	mapTool_saveFeatures.push(r_features[0]);
}

//判断一个变量中是否全部是数字
function checkRate(value)
{
	var re = /^[0-9]+.?[0-9]*$/;
	if (!re.test(value))
	{
		return false;
	}
	return true;
}