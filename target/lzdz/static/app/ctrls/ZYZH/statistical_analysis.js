/*资源整合子系统统计分析模块*/
MainApp.controller('analyStaCtrls', [ '$scope', function($scope) {
	//设置8组样式，颜色由浅到深
	var regionStyle = [
		{
			strokeColor:"#FFD966",
			strokeWidth:2,
			fillColor:"#E6FE98",
			fillOpacity:0.7
		},
		{
			strokeColor:"#FFD966",
			strokeWidth:2,
			fillColor:"#DBFE6A",
			fillOpacity:0.7
		},
		{
			strokeColor:"#FFD966",
			strokeWidth:2,
			fillColor:"#BEF901",
			fillOpacity:0.7
		},
		{
			strokeColor:"#FFD966",
			strokeWidth:2,
			fillColor:"#B5ED01",
			fillOpacity:0.7
		},
		{
			strokeColor:"#FFD966",
			strokeWidth:2,
			fillColor:"#ACE101",
			fillOpacity:0.7
		},
		{
			strokeColor:"#FFD966",
			strokeWidth:2,
			fillColor:"#95C301",
			fillOpacity:0.7
		},
		{
			strokeColor:"#FFD966",
			strokeWidth:2,
			fillColor:"#72A00C",
			fillOpacity:0.7
		},
		{
			strokeColor:"#FFD966",
			strokeWidth:2,
			fillColor:"#5E840A",
			fillOpacity:0.7
		}
	];
	
	//如果用户选中的是网格，则什么都不做
	$scope.showAnaSta = function(){
		$("#as_analyObj").css("display","none");
		$("#as_hr").css("display","none");
		$("#as_objAnaCon").css("display","none");
	}
	
	$scope.showAreaAnaSta = function(){
		$("#as_analyObj").css("display","block");
		$("#as_hr").css("display","block");
		$("#as_objAnaCon").css("display","block");
	}
	
	var areas = [];
	$scope.analyStaModuleInit = function(){
		//查询行政区划边界数据,并对查询出的数据做重构
		querySpaceService.comSqlService(urlConfig.areaDataSet,"",function(results){
			//获取到feature
			areas = results.result.features;
			
		});
		
		//设置装载柱状图和折线图的div的宽度
		$("#lineChart").css("width",($(window).width())*0.3);
		$("#columnChart").css("width",($(window).width())*0.3);
		
		//进行页面数据初始化
		$("#as_OjbData").combobox({
			data:analySta_data,
			valueField:'code',    
    		textField:'name',
    		onSelect:function(record){
    			//当下拉框中的某一个对象被选中时，修改页面上统计分析条件区域的展示数据
    			$("#as_objAnaCon").html("");//清除存放统计条件的div
    			//重新添加数据
    			var statCon = record.statCondition;
    			$.each(statCon, function(i,item) {
    				$("#as_objAnaCon").append("<input id="+item.code+" type='radio' name='as_anaConRadio' />"+item.name + "<br /><br />");
    				//给单选按钮添加click事件
    				$("#"+item.code).click(function(){
    					//执行统计方法
    					analyStaticFun(record.queryUrl,item.dataBaseAttr,item.name);
    				});
    			});
    		}
		});
		
		//将页面重置到原始状态
		analyStaInitFun();
	}
	
	/*
	 * 统计分析方法
	 * 	queryUrl:当前统计对象的统计查询方法的url
	 * 	attrs：被统计对象的统计条件值
	 * 	textName:被统计对象的统计条件名称
	 * */
	function analyStaticFun(queryUrl,attrs,textName){
		loadingWinInit(true);
		//对统计的数据进行查询统计
		$.ajax({
			type:"post",
			url:PATH + queryUrl,
			data:{parameter:"ALL"},
			async:true,
			success:function(results){
				loadingWinInit(false);
				/*
				 * 将查询出的结果合并到行政区划数据中,目前的查询结果又两种
				 * 	1、结果形式：[{county_id:"","属性名":""},{county_id:"","属性名":""}] ,他们的共同点：行政区划数据中的COUNTY_ID与当前查询结果的county_id是相同的
				 *  2、结果形式：[{"行政区编码":"数量"}]，共同点：行政区划的COUNTY_ID与键值对的健是相同的
				 * */
				if(results[0] == undefined){
					for (var i1=0; i1<areas.length; i1++) {
						for (var obj in results) {
							if(areas[i1].attributes.COUNTY_ID == obj){
								areas[i1].attributes["count"] = results[obj];
								areas[i1].attributes["countName"] = textName;
							}
						}
					}
				}
				else
				{
					for (var i=0; i<areas.length; i++) {
						for (var z=0; z<results.length; z++) {
							if(areas[i].attributes.COUNTY_ID == results[z].county_id){
								areas[i].attributes["count"] = results[z][attrs];
								areas[i].attributes["countName"] = textName;
							}
						}
					}
				}
				//制作等级颜色图
				createGradeChart();
				//显示柱状图和折线图
				$("#lineChart").css("display","block");
				$("#columnChart").css("display","block");
				
				$("#lineChart").html("");
				$("#columnChart").html("");
				
				//添加关闭按钮
				$("#lineChart").append("<img src="+closeImg1+" style='position: absolute; right: 10px; top: 10px;z-index: 2; cursor:pointer;' />");
				$("#columnChart").append("<img src="+closeImg1+" style='position: absolute; right: 10px; top: 10px;z-index: 2; cursor:pointer;' />");
				
				//点击关闭按钮时，关闭装载柱状图和折线图的div
				$("#lineChart img").click(function(){
					$("#lineChart").css("display","none");
				});
				$("#columnChart img").click(function(){
					$("#columnChart").css("display","none");
				});
				
				var data = [];
//				var data_max = 30; //Y轴最大刻度
				var line_title = [" "]; //曲线名称
				var y_label = ""; //Y轴标题
				var x_label = ""; //X轴标题
				var x = []; //定义X轴刻度值
				var title = " "; //统计图标标题
				getChartData(x,data);
				j.jqplot.diagram.base("lineChart", [data], "", "", x, x_label, y_label,data[7], 1);
				j.jqplot.diagram.base("columnChart", [data], "", "", x, x_label, y_label,data[7], 2);
				
			}
		});
	}
	
	/*
	 * 制作等级颜色图
	 * */
	function createGradeChart(){
		//对要统计的数据进行排序,从小到大
		var temp;
		for(var i=0; i<areas.length; i++)
		{
			var k = i;
			for(var s=i+1; s<areas.length;s++)
			{
				if((parseInt(areas[s].attributes.count))< (parseInt(areas[k].attributes.count)))
				k = s;
			}
			if (k != i)
			{
				temp =areas[i];
				areas[i] =areas[k];
				areas[k] =temp;
			}
		}
		
		$("#legend").css("display","block");//显示图例窗口
		$(".legendContent").html("");//清除图例中的内容
		vectorLayer.removeAllFeatures();//清除矢量图层
		//给feature设置样式，并且添加到地图上
		for (var x=0; x<areas.length; x++) {
			areas[x].style = regionStyle[x];
			//设置一个中点，用于显示feature的信息
			var centerPoint = areas[x].geometry.getCentroid();
			areas[x].geometry.x = centerPoint.x;
			areas[x].geometry.y = centerPoint.y;
			
			//--------设置图例------
			$(".legendContent").append("<canvas style='background-color:"+regionStyle[x].fillColor+"'></canvas>"+areas[x].attributes.count+"<br />");
		}
		vectorLayer.addFeatures(areas);
		
	}
	
	function getChartData(x_data,y_data){
		for (var i=0; i<areas.length; i++) {
			x_data.push(areas[i].attributes.NAME_1);
			y_data.push(areas[i].attributes.count);
		}
	}
	
	/*
	 * 将页面重置到原始状态的方法
	 * */
	function analyStaInitFun(){
		//默认选中下拉框的第一条数据
		$("#as_OjbData").combobox("setText",analySta_data[0].name);
		//默认显示第一条数据的统计条件
		$.each(analySta_data[0].statCondition, function(i,item) {
			$("#as_objAnaCon").append("<input id="+item.code+" type='radio' name='as_anaConRadio' />"+item.name + "<br /><br />");
			$("#"+item.code).click(function(){
				//执行统计方法
				analyStaticFun(analySta_data[0].queryUrl,item.dataBaseAttr,item.name);
			});
			
		});
	}
	
}]);

