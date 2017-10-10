/*
 * 紧急处置模块
 * */
MainApp.controller('emergDispCtrls', [ '$scope', function($scope) {
	
	$scope.emergDispModuleInit = function(){
		$("#ba_close").click(function(){
			$("#bufferAnalysis").css("display","none");
		});
		
	}
	
}]);

/*
 * 初始化紧急处置模块的方法
 * 	一共有两个操作：1、查询用户上报的紧急事件，在左侧面板中以列表的形式进行展现，同时在地图上进行标注
 * 			  2、监听新上报的事件，弹出消息提示窗口，并且将新的事件添加到列表和地图上；点击消息提示窗口时，页面跳转到紧急事件页面，这里是需要权限绑定的
 * 				也就是说，该用户如果拥有紧急处置模块的权限，则显示消息窗口，如果没有，则不进行显示
 * 			  3、叠加所有的评估分析结果
 * 			  4、当用户点击某一事件时，缓冲区分析该事件100米范围内的资源
 * 			  5、图例
 * */

var current_click_feature;

var ed_item_x = "";
var ed_item_y = "";
var ed_save_features;
function emergDisModule(){
	//1、查询数据库中上报的所有事件,添加左侧列表并且自地图上进行标注
	$.ajax({
		type:"post",
		url:PATH + urlConfig.emergencyQuery,
		data:{parameter:"ALL",eqId:"1"},
		async:true,
		success:function(data){
			$("#emergencyDisposal").html("");
			//第一步：结果上图
			//清除矢量图层
			closeInfoWin();
			vectorLayer.removeAllFeatures();
			//将查询到的结果上图
			var features = [];
			//给feature设置样式
			$.each(data, function(i,item) {
				//构造feature，并且将其添加到地图上
				var f = new SuperMap.Feature.Vector();
				f.geometry = new SuperMap.Geometry.Point(item.x, item.y);
				f.attributes = {
					NAME:item.name,
					X:item.x,
					Y:item.y,
					ADDRESS:item.address,
					TIME:item.time,
					DESCRIPTION:item.description,
					IMG_URL:item.img_url,
					USERNAME:item.user_name,
					VIDEO_URL:item.video_url,
					AUDIO_URL:item.audio_url
				};
				f.style = {
					pointRadius: 4,
					graphic:true,
					externalGraphic:fzjc_featureImgs.fzjcFI,
					graphicWidth:44,
					graphicHeight:33
				};
				f.id = "emergencyDisposal_"+item.id;
				f.type = "fuzc";
				features.push(f);
				
				//第二步：将查询结果以列表的方式添加到左侧面板
				var edresultListDiv = "<div class='ed_result_list ed_result_listN' id='ed_result_list_"+i+"'>"+item.name+"<br/>"+item.time+"</div>";
				$("#emergencyDisposal").append(edresultListDiv);
				//当面板上的查询结果被选中时，与地图上的feature做一个联动
				$("#ed_result_list_"+i).click(function(){
					//切换被选中的item的样式
					$(".ed_result_list").removeClass("ed_result_listY").addClass("ed_result_listN");
					$("#ed_result_list_"+i).removeClass("ed_result_listN").addClass("ed_result_listY");
					
					//设置缓冲的默认距离
					$("#ba_input").attr("value","1");
					
					//将当前的feature定位到屏幕的中心位置
					map.setCenter(new SuperMap.LonLat(item.x, item.y),4);
					
					//恢复前一个被选中的feature的样式
					if(ed_save_features != undefined){
						vectorLayer.removeFeatures([ed_save_features]);
						ed_save_features.style = {
							pointRadius: 4,
							graphic:true,
							externalGraphic:fzjc_featureImgs.fzjcFI,
							graphicWidth:44,
							graphicHeight:33
						}
						vectorLayer.addFeatures([ed_save_features]);
					}
					//修改当前被选中的feature的样式
					var cu_f = vectorLayer.getFeatureById("emergencyDisposal_"+item.id);
					vectorLayer.removeFeatures([cu_f]);
					cu_f.style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:fzjc_featureImgs.fzjcFS,
						graphicWidth:30,
						graphicHeight:35
					};
					vectorLayer.addFeatures([cu_f]);
					//在地图上展示feature的信息
					featureMouseOver(cu_f);
					ed_save_features = cu_f;//将当前被选中的feature保存下来，方便下次修改样式
					
					//修改当前坐标的值，方便做缓冲区分析
//					ed_item_x = item.x;
//					ed_item_y = item.y;

					current_click_feature = cu_f;
					
					$("#ba_sureButton").off("click");
					//缓冲区分析
					$("#ba_sureButton").on("click",function(){
						//获取到当前用户输入的缓冲距离
						var ed_distance = $("#ba_input").attr("value") + "000";
						edBufferAnalysis(current_click_feature,ed_distance);
					});
					
				});
			}); 
			vectorLayer.addFeatures(features);//将构造的feature添加到地图上
			
		}
	});
	
	//2、监听紧急事件上报，显示消息弹窗
	
	//3、叠加所有评估结果
	
	//5、图例
	$("#legend").css("display","block");
	$(".legendContent").html("");
	$("#legendTitle").html("");
	//医院
	$(".legendContent").append("<img src='"+featureImgs.schoolFI+"'/><span>医院</span><br/>");
	//消防力量
	$(".legendContent").append("<img src='"+featureImgs.firePowerFI+"'/><span>消防力量</span><br/>");
	//疏散场地
	$(".legendContent").append("<img src='"+featureImgs.evacuSitFI+"'/><span>疏散场地</span><br/>");
	//专业救援队伍
	$(".legendContent").append("<img src='"+featureImgs.profeRescFI+"'/><span>专业救援队伍</span><br/>");
	//物资仓库
	$(".legendContent").append("<img src='"+featureImgs.storageFI+"'/><span>物资仓库</span><br/>");
	
	$("#ad_b_anaRes").css("display","none");
	$("#ad_b_sour").css("display","none");
	$("#ad_b_rout").css("display","block");
}

/*
 * 缓冲区分析：
 * 	ed_x：要进行缓冲区分析点的x坐标
 * 	ed_y：要进行缓冲区分析的点的y坐标
 * 	dis：要缓冲的距离
 * */
var ed_bufferResult = [];
function edBufferAnalysis(cf,dis){
	$("#bufferAnalysis").css("display","block");//显示缓冲区分析窗口
	//清除图层上缓冲分析出的结果
	for (var i=0; i<ed_bufferResult.length; i++) {
		vectorLayer.removeFeatures(ed_bufferResult[i]);
	}
	
	//进行缓冲区分析
//	var geo = new SuperMap.Geometry.Point(ed_x, ed_y);
	var geo = cf.geometry;
	
	var centerPoint = new SuperMap.Geometry.Point(geo.x, geo.y);
	createCircleFunc(centerPoint,parseInt(dis),256,360,360);
	
	//对医院数据做缓冲区分析
	loadingWinInit(true);
	querySpaceService.bufferQuery(geo,dis,urlConfig.slDataSet,function(BufferAnalystEventArgs1){
		var result1 = BufferAnalystEventArgs1.result;
		if (result1 && result1.features) {
		    var features = result1.features;
		    for (i=0, len=features.length; i<len; i++) {
		    	features[i].style = {
					pointRadius: 4,
					graphic:true,
					externalGraphic:featureImgs.schoolFI,
					graphicWidth:32,
					graphicHeight:32
				};
				//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
				features[i].id = "schools_"+features[i].attributes.SMID;
		    }
		    vectorLayer.addFeatures(features);
		    ed_bufferResult.push(features);
		}
		
		//对消防力量缓冲区分析
		querySpaceService.bufferQuery(geo,dis,urlConfig.fpDataSet,function(BufferAnalystEventArgs2){
			var result2 = BufferAnalystEventArgs2.result;
			if (result2 && result2.features) {
			    var features = result2.features;
			    for (i=0, len=features.length; i<len; i++) {
			    	features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:featureImgs.firePowerFI,
						graphicWidth:32,
						graphicHeight:32
					};
					//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
					features[i].id = "firePower_"+features[i].attributes.SMID;
			    }
			    vectorLayer.addFeatures(features);
			    ed_bufferResult.push(features);
			}
			
			//对疏散场地分布数据做缓冲区分析
			querySpaceService.bufferQuery(geo,dis,urlConfig.esDataSet,function(BufferAnalystEventArgs3){
				var result3 = BufferAnalystEventArgs3.result;
				if (result3 && result3.features) {
				    var features = result3.features;
				    for (i=0, len=features.length; i<len; i++) {
				    	features[i].style = {
							pointRadius: 4,
							graphic:true,
							externalGraphic:featureImgs.evacuSiteFI,
							graphicWidth:32,
							graphicHeight:32
						};
						//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
						features[i].id = "evacuationSite_"+features[i].attributes.SMID;
				    }
				    vectorLayer.addFeatures(features);
				    ed_bufferResult.push(features);
				}
				
				//对救援队伍数据做缓冲区分析
				querySpaceService.bufferQuery(geo,dis,urlConfig.prDataSet,function(BufferAnalystEventArgs4){
					var result4 = BufferAnalystEventArgs4.result;
					if (result4 && result4.features) {
					    var features = result4.features;
					    for (i=0, len=features.length; i<len; i++) {
					    	features[i].style = {
								pointRadius: 4,
								graphic:true,
								externalGraphic:featureImgs.profeRescFI,
								graphicWidth:32,
								graphicHeight:32
							};
							//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
							features[i].id = "professionalRescue_"+features[i].attributes.SMID;
					    }
					    vectorLayer.addFeatures(features);
					    ed_bufferResult.push(features);
					}
					
					//对物资储备仓库做缓冲区分析
					querySpaceService.bufferQuery(geo,dis,urlConfig.sDataSet,function(BufferAnalystEventArgs5){
						var result5 = BufferAnalystEventArgs5.result;
						if (result5 && result5.features) {
						    var features = result5.features;
						    if(features.length <= 0 && result1.features.length <= 0 && result2.features.length <= 0 && result3.features.length <= 0 && result4.features.length <= 0){
						    	alertInfoWinInit("没有查询到结果");
						    }
						    for (i=0, len=features.length; i<len; i++) {
						    	features[i].style = {
									pointRadius: 4,
									graphic:true,
									externalGraphic:featureImgs.storageFI,
									graphicWidth:32,
									graphicHeight:32
								};
								//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
								features[i].id = "storage_"+features[i].attributes.SMID;
						    }
						    vectorLayer.addFeatures(features);
						    ed_bufferResult.push(features);
						}
						loadingWinInit(false);
					});
					
				});
				
			});
			
		});
		
	});
	
	
	
	
	
	
	
	
	
}
