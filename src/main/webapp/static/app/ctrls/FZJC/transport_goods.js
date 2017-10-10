/*
 * 物资运输模块
 * */
MainApp.controller('transGoodsCtrls', [ '$scope', function($scope) {
	
	$scope.transGoodsModuleInit = function(){
		
	}
	
}]);

/*
 * 物资运输模块初始化方法
 * */
var tg_save_features;
function transGoodsModule(){
	//第一步：在地图上叠加道路数据
//	var td_roadLayer = new SuperMap.Layer.TiledDynamicRESTLayer("公路分布",urlConfig.roadServerUrl,{transparent: true});
//	td_roadLayer.events.on({"layerInitialized":function(){
//		map.addLayers([td_roadLayer]);
//	}});
	
	$.ajax({
		type:"post",
		url:PATH + urlConfig.macAnoReQuery,
		data:{parameter:"ALL",eqId:"2",type:"1"},
		async:true,
		success:function(data){
			$("#transportGoods").html("");
			//第二步：查询结果上图
			//清除矢量图层
			closeInfoWin();
			vectorLayer.removeAllFeatures();
			//点要素
			var pointFeatures = [];
			//线要素
			var lineFeatures = [];
			//给feature设置样式
			$.each(data, function(i,item) {
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
				
				var tgtl_img_url = "";
				var tgState = item.dis_state;//救援状态
				if(resState == "准备救援"){
					//准备救援
					tgtl_img_url = fzjc_featureImgs.fzjcTGTL1;
				}else if(resState == "正在救援"){
					//正在救援
					tgtl_img_url = fzjc_featureImgs.fzjcTGTL2;
				}else{
					//完成救援
					tgtl_img_url = fzjc_featureImgs.fzjcTGTL3;
				}
				
				endPoint.style = {
					pointRadius: 4,
					graphic:true,
					externalGraphic:tgtl_img_url,
					graphicWidth:20,
					graphicHeight:25
				};
				endPoint.id = "rescueTeam_"+item.id;
				endPoint.type = "fuzc";
				pointFeatures.push(endPoint);
				
				//第三步：将查询结果以列表的方式添加到左侧面板
				var edresultListDiv = "<div class='tg_result_list tg_result_listN' id='tg_result_list_"+i+"'>"+item.name+"<br/>救援状态：<span>"+item.dis_state+"</span></div>";
				$("#transportGoods").append(edresultListDiv);
				//当面板上的查询结果被选中时，与地图上的feature做一个联动
				$("#tg_result_list_"+i).click(function(){
					//修改被选择列表的样式
					$(".tg_result_list").removeClass("tg_result_listY").addClass("tg_result_listN");
					$("#tg_result_list"+i).removeClass("tg_result_listN").addClass("tg_result_listY");
					
					//将当前的feature定位到屏幕的中心位置
					map.setCenter(new SuperMap.LonLat(endPoint.geometry.x, endPoint.geometry.y),4);
					//恢复前一个被选中的feature的样式
//					if(tg_save_features != undefined){
//						vectorLayer.removeFeatures([tg_save_features]);
//						tg_save_features.style = {
//							pointRadius: 4,
//							graphic:true,
//							externalGraphic:"jfinal-easyui/../static/images/featureIcon/commonImg.png",
//							graphicWidth:20,
//							graphicHeight:25
//						}
//						vectorLayer.addFeatures([tg_save_features]);
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
	$(".legendContent").append("<img src="+fzjc_featureImgs.fzjcTGTL1+"><span>准备救援</span><br/>");
	$(".legendContent").append("<img src="+fzjc_featureImgs.fzjcTGTL2+"><span>正在救援</span><br/>");
	$(".legendContent").append("<img src="+fzjc_featureImgs.fzjcTGTL3+"><span>完成救援</span><br/>");
	
	$("#legend").css("display","block");
}