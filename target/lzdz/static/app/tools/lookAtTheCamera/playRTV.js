/*
 * 缓冲区查询摄像头，并且调用ocx控件播放摄像头的实时视频
 * 	该接口在map.js中进行了使用，在popUp弹窗中有一个"实时视频"按钮，在点击按钮的时候进行了调用
 * lonlat_lon：x坐标
 * lonlat_lat：y坐标
 * */
var cameraFeatures = [];//定义一个数组，存储查询到的camera数据
function playRTV(lonlat_lon,lonlat_lat){
	var geomerty = new SuperMap.Geometry.Point(lonlat_lon,lonlat_lat);
	//第一步，获取缓冲距离
	$("#bufferAnalysis").css("display","block");
	$("#ba_sureButton").off("click");
	$("#ba_sureButton").on("click",function(){
		loadingWinInit(true);
		//获取到当前用户输入的缓冲距离
		var ed_distance = $("#ba_input").attr("value") + "000";
		
		createCircleFunc(geomerty,parseInt(ed_distance),256,360,360);
		
		//第二步，做摄像头缓冲区分析，使用的是25服务器上，经过摄像头同步工作的摄像头数据
		var getFeatureParameter, getFeatureService;
	    getFeatureParameter = new SuperMap.REST.GetFeaturesByBufferParameters({
	        bufferDistance:ed_distance,
	        //attributeFilter: "SMID > 0",
	        datasetNames: ["vpdatasource:Camera"],
	        returnContent:true,
	        geometry: geomerty
	    });
	    getFeatureService = new SuperMap.REST.GetFeaturesByBufferService("http://10.246.0.25:8090/iserver/services/data-vpws_cg/rest/data", {
	        eventListeners: {
	            "processCompleted": cameraProcessCompleted,
	            "processFailed": cameraProcessFailed
	        }
	    });
	    getFeatureService.processAsync(getFeatureParameter);
			
		});
	
}

function cameraProcessCompleted(bufferCameraAnalystEventArgs){
	loadingWinInit(false);
	var result = bufferCameraAnalystEventArgs.result;
	if (result && result.features) {
	    var features = result.features;
	    //清除上一次的查询结果
	    vectorLayer.removeFeatures(cameraFeatures);
	    if(features.length <= 0){
	    	return;
	    }
	    for (i=0, len=features.length; i<len; i++) {
  	    	features[i].style = {
				pointRadius: 4,
				graphic:true,
				externalGraphic:"jfinal-easyui/../static/images/camera/camera_online.png",
				graphicWidth:25,
				graphicHeight:30
			};
//	    	if(features[i].STATE == "1"){
//	    		features[i].style = {
//	    			pointRadius: 4,
//	    			graphic:true,
//	    			externalGraphic:"/CityManage/jsp/img/camera_online.png",
//	    			graphicWidth:25,
//	    			graphicHeight:30
//	    		};
//	    	}
//	    	else
//	    	{
//	    		features[i].style = {
//	    			pointRadius: 4,
//	    			graphic:true,
//	    			externalGraphic:"/CityManage/jsp/img/camera_offLine.png",
//	    			graphicWidth:25,
//	    			graphicHeight:30
//	    		};
//	    	}
			features[i].id = "camera_"+i;
  	    }
	    cameraFeatures = features;
  	    vectorLayer.addFeatures(features);
	}
}

function cameraProcessFailed(){
	
}
