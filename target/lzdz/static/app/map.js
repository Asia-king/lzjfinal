var map, layer,ilayer;
//定义测距、测面积图层
var measureLayer;
//创建一个矢量图层
var vectorbase,vectorLayer, vectorLayer1, vectorLayer2,vectorLayer3,vectorLayer4,circleLayer;
//创建一个Element图层
var elementLayer;
//创建一个聚合图层
var clusterLayer;
//创建一个道路图
var roadLayer;

var map;

var modifyFeature,dataAdded=false,polygonLayer,drawPolygon,cartoCssStr,editor,cartoContainer;

MainApp.controller('MapCtrls', [ '$scope', function($scope) {
	//中间区域地图容器
	$scope.mapControl=function(){
		var url = "http://10.249.20.103/app/api/superMap/smsSuperMapProxyHandler/proxy/services/ogc/wmts/1110";
//		var iurl="http://10.249.20.103/app/api/superMap/smsSuperMapProxyHandler/proxy/services/ogc/wmts/1111";
		var exchange=true;
		map = $scope.mapContainerInit();
		$scope.addMapInitLayer(map,url,exchange);
	}


	$scope.mapContainerInit=function(){
		//测距、测面积图层
		measureLayer = new SuperMap.Layer.Vector("量测层");
		//矢量图层

		var strategy = new SuperMap.Strategy.GeoText();
		strategy.style = {
			fontColor:"#FF7F00",
			fontWeight:"bolder",
			fontSize:"14px",
			fontSize:"14px",
			fill: true,
			fillColor: "#FFFFFF",
			fillOpacity: 1,
			stroke: true,
			strokeColor:"#8B7B8B"
		};
		vectorbase = new SuperMap.Layer.Vector("基础层",{ transparent: true, cacheEnabled: true }, { maxResolution: "auto" , useCanvas:false});
		vectorLayer = new SuperMap.Layer.Vector("烈度",{ transparent: true, cacheEnabled: true }, { maxResolution: "auto" , useCanvas:false});
		vectorLayer1 = new SuperMap.Layer.Vector("范围",{ transparent: true, cacheEnabled: true }, { maxResolution: "auto" , useCanvas:false});
		vectorLayer2 = new SuperMap.Layer.Vector("人口",{ transparent: true, cacheEnabled: true }, { maxResolution: "auto" , useCanvas:false});
		vectorLayer3 = new SuperMap.Layer.Vector("房屋",{ transparent: true, cacheEnabled: true }, { maxResolution: "auto" , useCanvas:false});
		vectorLayer4 = new SuperMap.Layer.Vector("生命线",{ transparent: true, cacheEnabled: true }, { maxResolution: "auto" , useCanvas:false});

		//vectorLayer.style = {
		//	strokeColor: "#E68900",
	     //   strokeWidth: 0.5,
	     //   fillColor: "#FFAB3F",
	     //   fillOpacity: "0.8"
		//};

		polygonLayer = new SuperMap.Layer.Vector("修正层");

		drawPolygon = new SuperMap.Control.DrawFeature(polygonLayer, SuperMap.Handler.Polygon);
		//矢量图层，专门用户做数据的缓冲区分析的时候绘制圆的图层，该图层至于vectorLayer图层之下
		circleLayer = new SuperMap.Layer.Vector("缓冲层");
		
		//element图层
		elementLayer = new SuperMap.Layer.Elements("elementLayer"); 
		
		//添加一个聚合图层
		clusterLayer = new SuperMap.Layer.ClusterLayer("聚合层",{"maxLevel":9});
		
		//添加一个道路图
		roadLayer = new SuperMap.Layer.TiledDynamicRESTLayer("路网层",urlConfig.roadServerUrl,{transparent: true});
		roadLayer.setVisibility(false);

		//矢量要素编辑控件
		modifyFeature=new SuperMap.Control.ModifyFeature(vectorLayer);
		
		//定义罗盘控件
		var pan=new SuperMap.Control.PanZoomBar({showCompass:true,showSlider:true});
		
		 map = new SuperMap.Map("mapContainerDiv",{
			controls: [
				new SuperMap.Control.LayerSwitcher(),
				//new SuperMap.Control.OverviewMap(),
	//      	new SuperMap.Control.ScaleLine(),
	         	pan,
	//			new SuperMap.Control.MousePosition(),
				drawPolygon,
				new SuperMap.Control.Navigation(
					{dragPanOptions: {
						enableKinetic: true
					}}
				),
				modifyFeature
			],
			allOverlays: true,
			 projection:"EPSG:3857"
		});

		map.events.on({"mousemove":$scope.getMousePositionPx,"mousedown":$scope.putMousePositionPx});
		$scope.setposition();
		$scope.addHandler(window,"resize",$scope.setposition);
		return map;
	}



	$scope.addMapInitLayer=function(map,url,exchange){
//		var layer,ilayer;

		//----------------兰州市地图服务-----------------------
		//地图时间戳\鉴权
		var date=new Date().getTime();
		 url+="?authKey=6L8SQDG0&timestamp="+date;
//		
		var bounds = new SuperMap.Bounds();
		bounds.extend(new SuperMap.LonLat(35239758.3070079, 3905994.23249645));
		bounds.extend(new SuperMap.LonLat(35515156.4044282, 4126236.3700037));
		bounds.toBBOX();
		var matrixIds = [];
		var levels = [];
		var resolutions = [304.6269659308826931969391338486504, 152.3134829654413465984695669243253, 76.15674148272067329923478346216263, 38.07837074152693821211739166583405, 19.03918537059686754355869589816429, 9.519592685298433771779347949082146, 4.759796342649216885889673974541073, 2.379898171324608442944836987270536, 1.189949085828905783972418428388003, 0.5949745429144528919862092141940016, 0.2974872712906248834931046723442657, 0.1487436356453124417465523361721329];
		for (var i = 0; i < resolutions.length; ++i) {
			matrixIds[i] = {
				identifier: i
			};
			levels.push(i);
		};
//		var url = "http://10.249.20.104:7001/services/ogc/wmts/1110";
//		cartoCssStr=document.getElementById("cartocssStr");
//		cartoCssStr.setAttribute("disabled",true);
//		var cartoCss=cartoCssStr.value;

		layer = new SuperMap.Layer.WMTS({
			name: "兰州市地图",
			url: url,
			layer: "1110",
			style: "default",
			matrixSet: "CustomCRS0Scale_1110",
			format: "image/png",
			resolutions: resolutions,
			matrixIds: matrixIds,
			opacity: 1,
			requestEncoding: "KVP",
			maxExtent: bounds,
			tileOrigin: new SuperMap.LonLat(35239758.3070079, 4126236.3700037)
		});
		//,{cacheEnabled:true},{useLocalStorage:true,cartoCss:cartoCss}
		//,PeopleResultLayer,HouseResultLayer,LifeLineResultLayer,EarthquackResultLayer
		map.addLayers([layer,vectorbase,roadLayer,measureLayer,circleLayer,vectorLayer1,vectorLayer2,vectorLayer3,vectorLayer4,vectorLayer,polygonLayer,clusterLayer]);
		//editor=new SuperMap.Control.TiledVectorLayerEditor({"layer":layer,"position":{"x":90,"y":536}});
		//editor.events.on({"cartocsschange":function(event){
		//	cartoCssStr.value=event.cartoCss;
		//}});
		//editor.activate();
        //
		//cartoContainer=document.getElementById("cartoContainer");
		//map.addControls([editor]);
		map.setCenter(new SuperMap.LonLat(35376004.98515761, 4018460.7566660233), 0);

		
		//矢量图层选择事件
		var selectFeature = new SuperMap.Control.SelectFeature(vectorLayer,{
			callbacks:{
				over:function(cf){ //点击兴趣点弹出信息窗口
					featureMouseOver(cf);
				},
				click:function(cf){
					var s_id = cf.id;
					var sdata = s_id.slice(0,s_id.indexOf("_"));
					if(sdata == "camera"){
						//显示视频查看窗口
						$("#look_at_camera").css("display","block");
						//调取视频，进行查看
						playControl(cf.attributes.ZX_ID);
					}
					
				},
				out:function(cf){ //点击空白处关闭信息窗口
					if(cf.type != "fuzc"){
						closeInfoWin();
					}
					
				}
			}
		});
		
		var selectCluster = new SuperMap.Control.SelectCluster(clusterLayer,{
			callbacks:{
				over:function(f){ //点击兴趣点弹出信息窗口
					closeInfoWin();
					if(!f.isCluster){ //当点击聚散点的时候不弹出信息窗口
						//创建弹窗的中心位置
						var lon = new SuperMap.LonLat(f.geometry.x,f.geometry.y);
						//获取要展示的信息
						var cf_id = f.attributes.id;//获取到feature的id，为了区分当前数据是哪一类数据
						var currentData = cf_id.slice(0,cf_id.indexOf("_"));//获取到当前结果是哪一类数据
						attributesData = spaceDataAttrConfig[currentData];//获取到当前要展示的属性
						showText = "";
						for(obj in attributesData){
							if(f.attributes[obj] != null && f.attributes[obj] != "" ){
								showText = showText + attributesData[obj] + "：&nbsp;" + f.attributes[obj] + "</br>";
							}
						}
						openInfoWin(lon,showText,'none');
					}
				},
				out:function(){ //点击空白处关闭信息窗口
					closeInfoWin();
				}
			}
		});
		
		clusterLayer.events.on({"moveend": function(e){//注册moveend事件，当缩放的时候关闭信息窗口
			if(e&& e.zoomChanged)closeInfoWin();
		}});
		
		map.addControl(selectFeature);
		map.addControl(selectCluster);
		map.addControl(new SuperMap.Control.MousePosition());
		selectFeature.activate();
		selectCluster.activate();
		
		//初始化地图上的工具控件
		mapToolInit();
	}


	$scope.getMousePositionPx=function (e)
	{
		var lonlat= map.getLonLatFromPixel(new SuperMap.Pixel(e.clientX,e.clientY));
		var newHtml= "x="+Math.floor(e.clientX)+"，"+"y="+Math.floor(e.clientY) + "经度:"+ lonlat.lon.toFixed(5) + "," + "纬度:"+
			lonlat.lat.toFixed(5);
		//document.getElementById("mousePositionDiv").innerHTML=newHtml;
		//$("#pre_pos_lon").val(" "+lonlat.lon.toFixed(5));
		//$("#pre_pos_lat").val(" "+lonlat.lat.toFixed(5));
		//获取鼠标坐标位置
		var lonLat = map.getLonLatFromPixel(e.xy);
		if (!lonLat) {
			return;
		}
//坐标转换
		lonLat.transform("EPSG:3857", "EPSG:4326" );

		var newHtml= "<r>位置坐标：<br>"+ "    经度:"+ lonLat.lon.toFixed(5) + "," + "    纬度:"+
			lonLat.lat.toFixed(5)+"<br>";
		document.getElementById("legend").innerHTML=newHtml;
	}
	$scope.putMousePositionPx=function (e)
	{
		var lonlat= map.getLonLatFromPixel(new SuperMap.Pixel(e.clientX,e.clientY));
		var newHtml= "<r>位置坐标：<br>"+ "    经度:"+ lonlat.lon.toFixed(5) + "<br>" + "    纬度:"+
			lonlat.lat.toFixed(5)+"<br>";
		$("#pre_pos_lon").val(lonlat.lon.toFixed(5));
		$("#pre_pos_lat").val(lonlat.lat.toFixed(5));
	}
	$scope.addHandler=function (element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		} else{
			element["on"+type] =handler;
		}
	}

	$scope.setposition=function (){
		var width= map.getSize().w;
		document.getElementById("legend").style.left=width/2-160+"px" ;
	}

	$scope.mapRemove=function(map,layer){
		map.removeLayer(layer);
	}
	
}]);

//全图
function fullmap() {
	map.setCenter(new SuperMap.LonLat( 35387224.6,3995305.27), 0);
	map.updateSize($("#bodyCenter").width(),$("#bodyCenter").height());
}

//地图清除的方法
function clearMap(){
	//清除矢量图层
	clearVrctorLayer(["measureLayer"]);
}

function removeOneLayer(layerName){
	var layers = map.getLayersByName(layerName);
	if(layers.length > 0){
		map.removeLayer(layers[0]);
	}
}

/*
 * 当feature上的mouseover事件被触发时所作的操作
 * cf:触发事件的feature
 * 
 * */
function featureMouseOver(cf){
	closeInfoWin();
	//创建弹窗的中心位置
	var lon = new SuperMap.LonLat(cf.geometry.x,cf.geometry.y);
	//获取要展示的信息
	var cf_id = cf.id;//获取到feature的id，为了区分当前数据是哪一类数据
	if(cf_id == "mapsearchfeature"){
		//当条件成立时，说明当前的这个feature是在地图查询功能中，用户输入的坐标直接添加到了地图上，他是没有其他附加要展示的信息，所以什么都不做
		return;
	}
	var currentData = cf_id.slice(0,cf_id.indexOf("_"));//获取到当前结果是哪一类数据
	attributesData = spaceDataAttrConfig[currentData];//获取到当前要展示的属性
	showText = "";
	if(attributesData != null && attributesData != undefined && attributesData != ""){
		for(obj in attributesData){
			if(cf.attributes[obj] != null && cf.attributes[obj] != "" ){
				showText = showText + attributesData[obj] + "&nbsp;" + cf.attributes[obj] + "</br>";
			}
		}
	}
	else
	{
		showText = "行政区：&nbsp;"+cf.attributes.NAME_1 + "<br />" + cf.attributes.countName + ":&nbsp;" +cf.attributes.count;
	}
	
	if(cf.type == "fuzc"){
		openInfoWin(lon,showText,'inline',cf.attributes.VIDEO_URL,cf.attributes.IMG_URL,cf.attributes.AUDIO_URL);
		return;
	}
	openInfoWin(lon,showText,'none');
}

var infowin;
/*
 * lonlat:地图上显示弹窗的位置
 * text:弹窗中显示的内容
 * display:弹窗中的三个按钮display的值
 * videoUrl:点击视频按钮时，视频的url地址
 * picUrl:点击图片按钮时，图片的url
 * audioUrl：点击音频按钮时，存放音频的url
 * 
 * */
function openInfoWin(lonlat,text,display,videoUrl,picUrl,audioUrl){
	var lonlatString = lonlat.lon + "," + lonlat.lat;
//	var center = feature.geometry;
	var popup = new SuperMap.Popup(
	"chicken",
	lonlat,
	null,
	"<div id='popWinDiv'>"+
		"<div id='popWinButton' style='display:"+display+";'>"+
			"<button id='pop_video' style='margin-left:5px;background-color:#F0F0EE;font-size:12px;border:1px solid #E8E8E8;border-radius:5px;box-shadow:2px 2px 2px #E8E8E8;' onclick='playVideo(\""+videoUrl+"\")'>视频</button>"+
			"<button id='pop_pic' style='margin-left:5px;background-color:#F0F0EE;font-size:12px;border:1px solid #E8E8E8;border-radius:5px;box-shadow:2px 2px 2px #E8E8E8;' onclick='browsePicture(\""+picUrl+"\")'>图片</button>"+
			"<button id='pop_audio' style='margin-left:5px;background-color:#F0F0EE;font-size:12px;border:1px solid #E8E8E8;border-radius:5px;box-shadow:2px 2px 2px #E8E8E8;' onclick='playAudio(\""+audioUrl+"\")'>音频</button>"+
			"<button id='pop_rtv' style='margin-left:5px;background-color:#F0F0EE;font-size:12px;border:1px solid #E8E8E8;border-radius:5px;box-shadow:2px 2px 2px #E8E8E8;' onclick='playRTV(\""+lonlatString+"\")'>实时视频</button>"+
		"</div>"
		+"<div id='popWin_content' style='line-height:25px; font-size:12px;font-family:微软雅黑;'>"+text+"</div>"
	+"</div>",
	true,
	null
	);
	popup.setBorder("solid 1px #D7D7D7");
//	popup.setBackgroundColor("#D7D7D7");
	popup.autoSize = true;
	popup.maxSize = new SuperMap.Size(400,800);
	infowin = popup;
	map.addPopup(popup);
}

//删除地图上的自定义信息框
function closeInfoWin(){
	if(infowin){
		try{
			infowin.hide();
			infowin.destroy();
		}
		catch(e){
			
		}
	}
}

//地图清除的方法
function clearMap(){
	//清除矢量图层
	if(measureLayer){
		measureLayer.removeAllFeatures();
	}
	if(vectorLayer){
		//vectorLayer.removeAllFeatures();
	}
	//清除地图上弹出的信息窗口
	closeInfoWin();
	//清除测距、测面积
	if(measureIndex > 0){
		clearMeasureResult(measureIndex);
	}
}

/*
 * 以中点和半径构造一个圆30,256,360,360
 * 	origin:圆的中点，new SuperMap.Geometry.Point(-120,-50)
 * 	r:半径
 * 	radius：30；
 * 	sides：256
 *  angel：360
 * */
function createCircleFunc(origin, radius, sides,r,angel){
	var rR = r*Math.PI/(180*sides);
	var rotatedAngle, x, y;
	var points = [];
	for(var i=0; i<sides; ++i) {
		rotatedAngle = rR*i;
		x = origin.x + (radius * Math.cos(rotatedAngle));
		y = origin.y + (radius * Math.sin(rotatedAngle));
		points.push(new SuperMap.Geometry.Point(x, y));
	}
	rotatedAngle = r*Math.PI/180;
	x = origin.x + (radius * Math.cos(rotatedAngle));
	y = origin.y + (radius * Math.sin(rotatedAngle));
	points.push(new SuperMap.Geometry.Point(x, y));
	
	var ring = new SuperMap.Geometry.LinearRing(points);//一个特殊的封闭线串
	//围绕中心点旋转集合图形，angel旋转角的度数  origin：旋转中心点
	ring.rotate(parseFloat(angel),origin);
	var geo = new SuperMap.Geometry.Collection([ring]);
	geo.origin = origin;
	geo.radius = radius;
	geo.r = r;
	geo.angel = angel;
	geo.sides = sides;
	geo.polygonType = "Curve";
	
	var circleVector= new SuperMap.Feature.Vector(geo);
	circleVector.id = "circles";
	
	circleVector.style={
		strokeColor:"#CAFF70",
		fillColor:"#C6E2FF",
		strokeWidth:2,
		fillOpacity:0.3
	};
	
	circleLayer.removeAllFeatures();
	circleLayer.addFeatures([circleVector]);
}

/**
 *打印地图，支持ie9及以上，chrome，firefox等.
 *请注意相关css,js文件是否存在.
 *Parameters:
 *id <String>  id 为map div的id
 */
function createPrintMap(id){
	var broz = SuperMap.Browser.name;
	if(broz == 'msie' && parseInt(SuperMap.Browser.version) < 9){
		alert("ie9版本以下部分打印功能不支持");
		return;
	}
	var printWindow = window.open("");
	var strInnerHTML = document.getElementById(id).innerHTML;

	var strHeader = "<!DOCTYPE html><html><head><META HTTP-EQUIV='pragma' CONTENT='no-cache'><META HTTP-EQUIV='Cache-Control' CONTENT='no-cache, must-revalidate'><META HTTP-EQUIV='expires' CONTENT='Wed, 26 Feb 1997 08:21:57 GMT'><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' /><meta name='apple-mobile-web-app-capable' content='yes' /><title>地图打印</title>";
	var strCSS = "<link href='/jfinal-easyui/static/app/supermap/theme/default/sm.css' rel='stylesheet' /><link href='/jfinal-easyui/static/app/supermap/theme/default/sm-responsive.css' rel='stylesheet' /><link href='/jfinal-easyui/static/app/supermap/theme/default/style.css' rel='stylesheet'><link href='/jfinal-easyui/static/app/supermap/theme/default/sm-doc.css' rel='stylesheet' />";
	var strScript = "<script src='/jfinal-easyui/static/app/supermap/jquery.js'><\/script><script type = 'text/javascript'>" + "\n" + "function printDiv(){$('.newuiPrint').css({'display':'none'});window.print();$('.newuiPrint').css({'display':'block'});}<\/script>";
	var strBody = "</head><body><div class='print-header'><div class='superD'><h3>地图</h3></div><div id='"+id+"' >" +strInnerHTML + "</div><div id='superft'><div class='printClose'>" + "<span class='newuiPrint' onclick = 'printDiv()'></span></div></div></div></body></html>";

	var strHTML = strHeader + strCSS + strScript + strBody;
	printWindow.document.write(strHTML);
	printWindow.document.close();
	function onloadHTML(){
		var strDOM = printWindow.document.getElementById(id).children[0].children;
		for(var i = 0, length = strDOM.length; i < length ; i++){
			var idStr = strDOM[i].id;
			if(idStr.indexOf("SuperMap.Control.ScaleLine") == -1 && idStr.indexOf("SuperMap.Map") == -1){
				strCss = strDOM[i].style.cssText;
				strCss = strCss + "display: none;";
				strDOM[i].style.cssText = strCss;
			}
		}

		var canvasPrint = printWindow.document.getElementsByTagName("canvas");
		var canvasMap = document.getElementsByTagName("canvas");
		for(var i = 0,length = canvasPrint.length;i< length;i++){
			pasteCanvas(canvasMap[i],canvasPrint[i]);
		}
	}
	if (broz == 'firefox') {
		printWindow.onload = onloadHTML;
	} else if (broz == 'safari'||broz == 'chrome'||broz == 'msie') {
		window.setTimeout(onloadHTML,50);
	}
}

function edit_feature(){
	deactiveAll();
	modifyFeature.activate();
}
function deactiveAll(){
	modifyFeature.deactivate();
}

//移除图层要素
function clearFeatures(){
	deactiveAll();
	dataAdded=false;
	vectorLayer.removeAllFeatures();
	vectorLayer1.removeAllFeatures();
	vectorLayer2.removeAllFeatures();
	vectorLayer3.removeAllFeatures();
	vectorLayer4.removeAllFeatures();
}

function addmodifyData(){
	if(!dataAdded){
		var point_features=[];
		var points=[];
		//面数据
		//35376004.98515761, 4018460.7566660233
		var polygon_data=[[35364405,4021460.76],[35364405,4008460.7566660233],[35391004,4008460.7566660233],[35391004,4021460.76]];

		for(var i= 0,len=polygon_data.length;i<len;i++){
			var point = new SuperMap.Geometry.Point(polygon_data[i][0],polygon_data[i][1]);
			points.push(point);
		}
		var linearRing=new SuperMap.Geometry.LinearRing(points);
		var polygon=new SuperMap.Geometry.Polygon([linearRing]);
		var polygon_feature=new SuperMap.Feature.Vector(polygon);
		point_features.push(polygon_feature);
		vectorLayer.addFeatures(point_features);

		dataAdded=true;
	}else{
		alert("数据已加载。");
	}
	edit_feature();
}

function mapToImg1(map){
	MapToImg&&MapToImg.excute(map);
}

function draw_polygon(){
	polygondeactiveAll();
	drawPolygon.activate();
}
function polygondeactiveAll(){
	drawPolygon.deactivate();

}
function polygonclearFeatures(){
	polygondeactiveAll();
	polygonLayer.removeAllFeatures();
}

