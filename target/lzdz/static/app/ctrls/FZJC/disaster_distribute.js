/*
 * 辅助决策子系统灾情分布模块
 * */
MainApp.controller('disDistriCtrls', [ '$scope', function($scope) {
	//初始化该模块的方法
	$scope.disDistriModuleInit = function(){
		//注意：这里需要调用评估分析的结果，在地图上进行展示
		
		//初始化左侧面板
//		$scope.dd_item_data = earthquakeDisaster_data;//获取左侧面板数据
		
		$('#disasterDistribute').accordion({
			onSelect:function(title,index){
				//当当前面板被选中的时候，查询数据，并且将数据添加到面板中
				currenAccorQuery(earthquakeDisaster_data[index].code,"#"+earthquakeDisaster_data[index].code);
			}
		});
		
		var screenHeight = $(window).height();
		//添加面板
		$.each(earthquakeDisaster_data, function(i,item) {
			//给accordion添加面板
			$('#disasterDistribute').accordion('add', {
				id:item.code,
				title: item.name,
				height:parseInt(screenHeight)*0.5,
				selected:false
			});
			
		});
		//重新解析bodyContent DIV
//		$.parser.parse($("#disasterDistribute"));
		
		/*
		 * 当用户选择了某一条数据时所作的操作,有两个操作：1、将查询结果上图展示 2、将查询结果以列表的方式添加到accordion面板中
		 * 	code：当前事件的编码
		 * 	selectorId:被选中面板的id选择器
		 * */
		function currenAccorQuery(code,selectorId){
			loadingWinInit(true);
			//调用后台接口查询当前选中数据的结果
			$.ajax({
				type:"post",
				url:PATH+urlConfig.earthDisAuery,
				data:{parameter:"ALL",eqId:"2",eventCode:code},
				async:true,
				success:function(data){
					loadingWinInit(false);
					$(selectorId).html("");
					//第一步：结果上图
					//清除矢量图层
					closeInfoWin();
					vectorLayer.removeAllFeatures();
					//将查询到的结果上图
					var features = [];
					//给feature设置样式
					$.each(data, function(i,item) {
						var f = new SuperMap.Feature.Vector();
						f.geometry = new SuperMap.Geometry.Point(item.x, item.y);
						var infoMessage = item.abnormal_state;
						infoMessage = infoMessage.replace(/;/g,"<br/>");
						
						f.attributes = {
							ABNORMAL_ID:item.abnormal_id,
							ABNORMAL_NAME:item.abnormal_name,
							X:item.x,
							Y:item.y,
							ABNORMAL_STATE:infoMessage,
							ADDRESS:item.address,
							TIME:item.time,
							DESCRIPTION:item.description,
							USERNAME:item.user_name,
							IMG_URL:item.img_url,
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
						f.id = "disasterDistribute_"+item.id;
						f.type = "fuzc";
						features.push(f);
						
						//第二步：将查询结果以列表的方式添加到accordion面板
						var resultListDiv = "<div class='dd_result_list' id='dd_result_list_"+i+"'>"+item.time+"<br/>"+item.address+"</div>";
						$(selectorId).append(resultListDiv);
						//当面板上的查询结果被选中时，与地图上的feature做一个联动
						$(selectorId+" #dd_result_list_"+i).click(function(){
							//将当前的feature定位到屏幕的中心位置
							map.setCenter(new SuperMap.LonLat(item.x, item.y),4);
							//在地图上展示feature的信息
							featureMouseOver(f);
						});
					}); 
					vectorLayer.addFeatures(features);//将构造的feature添加到地图上
				}
				
			});
			
		}
		
		
		
	};
	
}]);
/*
 * 当面板上的查询结果被选中时，与地图上的feature做一个联动
 * */
function ddResultListClick(f){
	//将当前的feature定位到屏幕的中心位置
	alert("success")
	//在地图上展示feature的信息
//	featureMouseOver(cf);
}
