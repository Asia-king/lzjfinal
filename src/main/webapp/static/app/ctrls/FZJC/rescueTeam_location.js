/*
 * 救援队伍定位模块
 * */
MainApp.controller('resTeamLocCtrls', [ '$scope', function($scope) {
	
	$scope.resTeamLocModuleInit = function(){
		
	}
	
}]);

/*
 * 救援队伍定位模块初始化方法
 * 	请求参数中type是0，代表查询的是救援队伍的数据
 * */
var rl_save_features;
function resTeamLocModule(){
	$.ajax({
		type:"post",
		url:PATH + urlConfig.macAnoReQuery,
		data:{parameter:"ALL",eqId:"2",type:"0"},
		async:true,
		success:function(data){
			$("#rescueTeamLocation").html("");
			//第一步：结果上图
			//清除矢量图层
			closeInfoWin();
			vectorLayer.removeAllFeatures();
			//将查询到的结果上图
			var pointFeatures = [];
			var lineFeatures = [];
			//给feature设置样式
			$.each(data, function(i,item) {
				/*有两部操作，第一步：取到坐标串，绘制一条线；第二部，取到最后一个坐标，绘制坐标点*/
				//分解坐标
				var xy = item.xy;//多个坐标之间使用":"进行分割，每个坐标的xy之间使用","进行分割
				var xys = xy.split(":");//以":"对字符串进行分割
				var pointArr = [];//存储坐标串的数组
				var endPoint = new SuperMap.Feature.Vector();//最后一个坐标点
				for (var k=0; k<xys.length; k++) {
					//以","对字符串进行分割
					var splitXY = xys[k].split(",");
					pointArr.push(new SuperMap.Geometry.Point(splitXY[0], splitXY[1]));
					
					if(k == (xys.length-1)){
						endPoint.geometry = new SuperMap.Geometry.Point(splitXY[0], splitXY[1]);
					}
				}
				//构造线
				var lineString = new SuperMap.Geometry.LineString(pointArr);
				var linecVector = new SuperMap.Feature.Vector(lineString);
				linecVector.style={
					strokeColor:"#E92B00",
					strokeWidth:2
				}
				lineFeatures.push(linecVector);
				//构造点
				endPoint.attributes = {
					NAME:item.name,
					X:endPoint.geometry.x,
					Y:endPoint.geometry.y,
					ADDRESS:item.address,
					TIME:item.time,
					DIS_STATE:item.dis_state,
					DESCRIPTION:item.description,
					USERNAME:item.user_name,
					IMG_URL:item.img_url,
					VIDEO_URL:item.video_url,
					AUDIO_URL:item.audio_url
				};
				var rtl_img_url = "";
				var resState = item.dis_state;//救援状态
				if(resState == "准备救援"){
					//准备救援
					rtl_img_url = fzjc_featureImgs.fzjcRTL1;
				}else if(resState == "正在救援"){
					//正在救援
					rtl_img_url = fzjc_featureImgs.fzjcRTL2;
				}else{
					//完成救援
					rtl_img_url = fzjc_featureImgs.fzjcRTL3;
				}
				endPoint.style = {
					pointRadius: 4,
					graphic:true,
					externalGraphic:rtl_img_url,
					graphicWidth:20,
					graphicHeight:25
				};
				endPoint.id = "rescueTeam_"+item.id;
				endPoint.type = "fuzc";
				pointFeatures.push(endPoint);
				
				//第二步：将查询结果以列表的方式添加到左侧面板
				var edresultListDiv = "<div class='rl_result_list rl_result_listN' id='rl_result_list_"+i+"'>"+item.name+"<br/>救援状态：<span>"+item.dis_state+"</span></div>";
				$("#rescueTeamLocation").append(edresultListDiv);
				//当面板上的查询结果被选中时，与地图上的feature做一个联动
				$("#rl_result_list_"+i).click(function(){
					//修改被选择列表的样式
					$(".rl_result_list").removeClass("rl_result_listY").addClass("rl_result_listN");
					$("#rl_result_list"+i).removeClass("rl_result_listN").addClass("rl_result_listY");
					
					//将当前的feature定位到屏幕的中心位置
					map.setCenter(new SuperMap.LonLat(endPoint.geometry.x, endPoint.geometry.y),4);
					
					//恢复前一个被选中的feature的样式
//					if(rl_save_features != undefined){
//						vectorLayer.removeFeatures([rl_save_features]);
//						rl_save_features.style = {
//							pointRadius: 4,
//							graphic:true,
//							externalGraphic:"jfinal-easyui/../static/images/featureIcon/commonImg.png",
//							graphicWidth:20,
//							graphicHeight:25
//						}
//						vectorLayer.addFeatures([rl_save_features]);
//					}
					//修改当前被选中的feature的样式
//					var cu_f = vectorLayer.getFeatureById("rescueTeam_"+item.id);
//					vectorLayer.removeFeatures([cu_f]);
//					cu_f.style = {
//						pointRadius: 4,
//						graphic:true,
//						externalGraphic:"jfinal-easyui/../static/images/featureIcon/cluster_select.png",
//						graphicWidth:30,
//						graphicHeight:35
//					};
//					vectorLayer.addFeatures([cu_f]);
					//在地图上展示feature的信息
//					featureMouseOver(cu_f);
					featureMouseOver(endPoint);
//					rl_save_features = cu_f;//将当前被选中的feature保存下来，方便下次修改样式
				});
			}); 
			vectorLayer.addFeatures(pointFeatures);//将构造的点添加到地图上
			vectorLayer.addFeatures(lineFeatures);//将构造的线添加到地图上
		}
	});
	
	//制作图例
	$(".legendContent").html("");
	$(".legendContent").append("<img src="+fzjc_featureImgs.fzjcRTL1+"><span>准备救援</span><br/>");
	$(".legendContent").append("<img src="+fzjc_featureImgs.fzjcRTL2+"><span>正在救援</span><br/>");
	$(".legendContent").append("<img src="+fzjc_featureImgs.fzjcRTL3+"><span>完成救援</span><br/>");
	
	$("#legend").css("display","block");
}
