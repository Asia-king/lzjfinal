/*
 * 受灾群众安置模块
 * */
MainApp.controller('peoPlaceCtrls', [ '$scope', function($scope) {
	
	$scope.peoPlaceModuleInit = function(){
		/*安置点饱和度分析*/
		$("#ppa_a_statur").click(function(){
			
			//获取到要做分析的数据
			var xData = [];//x轴的数据
			var yData = [];//y轴的刻度值
			var datas = [];
			var selectData = $('.pp_result_select input:checked');
			if(selectData.length <= 0){
				alertInfoWinInit("请选择要分析的数据重新分析！");
				return;
			}
			for (var k=0; k<selectData.length;k++) {
				var data = JSON.parse(selectData[k].value);
				//计算饱和度的值
				var statur = data.real_num/data.total_num;
				data.statur = parseFloat(statur).toFixed(2);
				datas.push(data);
			}
			
			//对得到的数据从大到小进行排序
			sortFunction(datas,"statur");
			//获取到x轴和y轴的值
			for (var i=0; i<datas.length; i++) {
				xData.push(datas[i].name);
				yData.push(datas[i].statur);
			}
			
			/*创建柱状图*/
			$("#columnChart").css("display","block");
			$("#columnChart").html("");
			
			//添加关闭按钮
			$("#columnChart").append("<img src='jfinal-easyui/../static/images/close.png' style='position: absolute; right: 10px; top: 10px;z-index: 2; cursor:pointer;' />");
			$("#columnChart img").click(function(){
				$("#columnChart").css("display","none");
			});
			
			j.jqplot.diagram.base("columnChart", [yData], "", "", xData, "" ,"饱和度" ,yData[yData.length-1], 2);
			
		});
		
		
		/*安置点群众受伤比例*/
		$("#ppa_a_people").click(function(){
			//获取到要做分析的数据
			var xData = [];//x轴的数据
			var yData = [];//y轴的刻度值
			var datas = [];
			var selectData = $('.pp_result_select input:checked');
			for (var k=0; k<selectData.length;k++) {
				var data = JSON.parse(selectData[k].value);
				//伤亡比例
				var peoexpl = data.injured_num/data.real_num;
				data.peoexpl = parseFloat(peoexpl).toFixed(2);
				datas.push(data);
			}
			
			//对得到的数据从大到小进行排序
			sortFunction(datas,"peoexpl");
			//获取到x轴和y轴的值
			for (var i=0; i<datas.length; i++) {
				xData.push(datas[i].name);
				yData.push(datas[i].peoexpl);
			}
			
			/*创建柱状图*/
			$("#columnChart").css("display","block");
			$("#columnChart").html("");
			
			//添加关闭按钮
			$("#columnChart").append("<img src='jfinal-easyui/../static/images/close.png' style='position: absolute; right: 10px; top: 10px;z-index: 2; cursor:pointer;' />");
			$("#columnChart img").click(function(){
				$("#columnChart").css("display","none");
			});
			
			j.jqplot.diagram.base("columnChart", [yData], "", "", xData, "" ,"受伤比例" ,yData[yData.length-1], 2);
		});
	}
	
	/*
	 * 对一组数据从大到小进行排序
	 * areas:要进行排序的数组
	 * label：排序的字段
	 * */
	function sortFunction(areas,label){
		//对要统计的数据进行排序,从小到大
		var temp;
		for(var i=0; i<areas.length; i++)
		{
			var k = i;
			for(var s=i+1; s<areas.length;s++)
			{
				var area = areas[s];
				var area2 = areas[k];
				if((parseInt(area[label]))< (parseInt(area2[label])))
				k = s;
			}
			if (k != i)
			{
				temp =areas[i];
				areas[i] =areas[k];
				areas[k] =temp;
			}
		}
	}
	
	
}]);

/*
 * 受灾群众安置模块初始化方法:
 * 	查询用户上报的群众安置点，在页面左侧面板以列表的方式进行展示，同时将其添加到地图上
 * */
var pp_save_features;
function peoPlaceModule(){
	$.ajax({
		type:"post",
		url:PATH + urlConfig.placeInfoQuery,
		data:{parameter:"ALL",eqId:"2"},
		async:true,
		success:function(data){
			//给总个数框中写入内容
			$("#pp_total_info").html(data.length);
			
			$("#pp_result_div").html("");
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
					TOTAL_NUM:item.total_num,
					REAL_NUM:item.real_num,
					INJURED_NUM:item.injured_num,
					MATERIAL:item.material,
					MEDICAL:item.medical,
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
				f.id = "peoplePlace_"+item.id;
				f.type = "fuzc";
				features.push(f);
				
				//第二步：将查询结果以列表的方式添加到左侧面板
				var edresultListDiv = "<div>"+
						"<div class='pp_result_select'><input type='checkbox' value='"+JSON.stringify(item)+"' /></div>"+
						"<div class='pp_result_list pp_result_listN' id='pp_result_list_"+i+"'>"+item.name+"<br/>已容纳人数："+item.real_num+"人</div>"+
					"</div>";
				$("#pp_result_div").append(edresultListDiv);
				//当面板上的查询结果被选中时，与地图上的feature做一个联动
				$("#pp_result_list_"+i).click(function(){
					//修改被选择列表的样式
					$(".pp_result_list").removeClass("pp_result_listY").addClass("pp_result_listN");
					$("#pp_result_list_"+i).removeClass("pp_result_listN").addClass("pp_result_listY");
					
					//将当前的feature定位到屏幕的中心位置
					map.setCenter(new SuperMap.LonLat(item.x, item.y),4);
					
					//恢复前一个被选中的feature的样式
					if(pp_save_features != undefined){
						vectorLayer.removeFeatures([pp_save_features]);
						pp_save_features.style = {
							pointRadius: 4,
							graphic:true,
							externalGraphic:fzjc_featureImgs.fzjcFI,
							graphicWidth:44,
							graphicHeight:33
						}
						vectorLayer.addFeatures([pp_save_features]);
					}
					//修改当前被选中的feature的样式
					var cu_f = vectorLayer.getFeatureById("peoplePlace_"+item.id);
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
					pp_save_features = cu_f;//将当前被选中的feature保存下来，方便下次修改样式
					
				});
			}); 
			vectorLayer.addFeatures(features);//将构造的feature添加到地图上
			
		}
	});
}
