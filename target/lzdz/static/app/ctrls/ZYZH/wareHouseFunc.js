//保存书签模块中某类数据的查询结果，用来进行图层的清除
var bookMarkersResultSave = {};

/*
 * 数据仓库模块和书签模块各种数据查询结果展示的方法
 * */
var wareHouseFunc = {
	/*
	 * 人口统计数据结果查询以及展示的方法
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	populResult:function(moduleLogo,isSelect){
		//显示查询窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			$("#otherContainerDiv").html("");//清除表格容器
			$("#searchDiv img").off("click");//关闭查询按钮的点击事件
			queryPopFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			queryPopFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		
		//没有选中时，删除当前数据在页面上的查询结果
		$(".datagrid:has(#popRestTab)").remove();
		var othConDivLen = $("#otherContainerDiv").children(".datagrid").length;
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		//当存放表格的div还有表格，则显示表格容器，隐藏地图容器；反之，隐藏表格容器，显示地图容器
		if(othConDivLen > 0){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","block");//隐藏地图容器
			$("#otherContainerDiv").css("display","none");//显示表格容器
		}
		
		//查询方法
		function queryPopFun(isSave,condition){
			loadingWinInit(true);
			$.ajax({
				type:"post",
				url:PATH + urlConfig.popQueryUrl,
				data:{parameter:condition},
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				async:true,
				success:function(result){
					//创建表格
					//获取浏览器的宽度
					var screenWidth = $(window).width();
					var columnWidth = screenWidth*0.15;
					var table = "<table id='popRestTab'></table>";
					$("#otherContainerDiv").append(table);
					//重新解析bodyContent DIV
					$.parser.parse($("#popRestTab"));
					$('#popRestTab').datagrid({    
					    data:result,
					    title:'人口统计',
					    columns:[[    
					        {field:'Name',title:'行政区',width:columnWidth},    
					        {field:'Total',title:'总人口',width:columnWidth},    
					        {field:'Family',title:'家庭户户数',width:columnWidth},
					        {field:'Resident',title:'户口在本地人口数',width:columnWidth}
					    ]]    
					});  
					loadingWinInit(false);
				}
				
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				if(inputMess == ""){
					queryPopFun(false,"ALL");
				}
				else
				{
					queryPopFun(false,inputMess);
				}
			});
		}
	},
	
	/*
	 *  经济统计数据结果查询以及展示的方法
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	economyResult:function(moduleLogo,isSelect){
		//显示查询窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			$("#otherContainerDiv").html("");//清除表格容器
			$("#searchDiv img").off("click");//关闭查询按钮的点击事件
			queryEcoFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			queryEcoFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		
		//没有选中时，删除当前数据在页面上的查询结果
		$(".datagrid:has(#ecoRestTab)").remove();
		var othConDivLen = $("#otherContainerDiv").children(".datagrid").length;
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		//当存放表格的div还有表格，则显示表格容器，隐藏地图容器；反之，隐藏表格容器，显示地图容器
		if(othConDivLen > 0){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","block");//隐藏地图容器
			$("#otherContainerDiv").css("display","none");//显示表格容器
		}
		
		function queryEcoFun(isSave,condition){
			loadingWinInit(true);
			$.ajax({
				type:"post",
				url:PATH + urlConfig.ecoQueryUrl,
				data:{parameter:condition},
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				async:true,
				success:function(result){
					//创建表格
					//获取浏览器的宽度
					var screenWidth = $(window).width();
					var columnWidth = screenWidth*0.1;
					var table = "<table id='ecoRestTab'></table>";
					$("#otherContainerDiv").append(table);
					//重新解析bodyContent DIV
					$.parser.parse($("#ecoRestTab"));
					$('#ecoRestTab').datagrid({    
					    data:result,   
					    title:'经济统计',
					    columns:[[    
					        {field:'Name',title:'行政区',width:columnWidth},    
					        {field:'GRP',title:'地区生产总值(单位:万元)',width:columnWidth},    
					        {field:'Industry_Value',title:'工业总产值(单位:万元)',width:columnWidth},
					        {field:'Agri_Value',title:'农业总产值(单位:万元)',width:columnWidth},
					        {field:'Service_Value',title:'第三产业总产值(单位:万元)',width:columnWidth},
					        {field:'Income',title:'财政收入(单位:万元)',width:columnWidth},
					        {field:'Outcome',title:'财政支出(单位:万元)',width:columnWidth},
					        {field:'Investment',title:'全社会固定资产投资总额(单位:万元)',width:columnWidth},
					        {field:'Imp_Exp',title:'外贸进出口总额(单位:万元)',width:columnWidth}
					    ]]    
					});  
					loadingWinInit(false);
				}
				
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				if(inputMess == ""){
					queryEcoFun(false,"ALL");
				}
				else
				{
					queryEcoFun(false,inputMess);
				}
			});
		}
	},
	
	/*
	 * 建筑物统计数据结果查询以及展示的方法
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	buildResult:function(moduleLogo,isSelect){
		//显示查询窗口
		$("#searchDiv").css("display","block");
		
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			//默认查询第一个
			buildConFun(moduleLogo,isSelect);
			
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			$("#otherContainerDiv").html("");//清除表格容器
			
			var buildDiv = "<div class='datagrid' id='buildDivs' style='border:none;box-shadow:none;background-color:#FFFFFF;overflow:hidden;'></div>";
			$("#otherContainerDiv").append(buildDiv);
			
			//给页面上添加单选按钮
			var radiosDiv = "<div id='radiosDiv'></div>";
			$("#buildDivs").append(radiosDiv);
			
			//设置单选按钮的值
			var radiosValue = [{"name":"房屋统计(按结构)","selectFun":"buildConFun()"},
								{"name":"房屋统计(按年代)","selectFun":"buildYearFun()"},
								{"name":"区县中城区房屋统计","selectFun":"buildCounFun()"},
								{"name":"区县中农村房屋统计","selectFun":"buildTownFun()"},
								{"name":"大型企业房屋统计","selectFun":"buildFirmFun()"}];
			
			$.each(radiosValue, function(i,item) {
				if(i == 0){
					$("#radiosDiv").append("<input name='radio' id='build_s"+i+"' type='radio' checked='checked'>&nbsp;"+item.name+"");
				}
				else
				{
					$("#radiosDiv").append("<input name='radio' id='build_s"+i+"' type='radio'>&nbsp;"+item.name+"");
				}
				$("#build_s"+i).click(function(){
					$("#buildDivs").children("table").remove();
					$("#buildDivs").children(".datagrid").remove();
					eval(item.selectFun);
				});
			});
			
			return;
		}
		
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			//默认查询第一个
			buildConFun(moduleLogo,isSelect);
			
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			
			var buildDiv = "<div class='datagrid' id='buildDivs' style='border:none;box-shadow:none;background-color:#FFFFFF;overflow:hidden;'></div>";
			$("#otherContainerDiv").append(buildDiv);
			
			//给页面上添加单选按钮
			var radiosDiv = "<div id='radiosDiv'></div>";
			$("#buildDivs").append(radiosDiv);
			//设置单选按钮的值
			var radiosValue = [{"name":"房屋统计(按结构)","selectFun":"buildConFun()"},
								{"name":"房屋统计(按年代)","selectFun":"buildYearFun()"},
								{"name":"区县中城区房屋统计","selectFun":"buildCounFun()"},
								{"name":"区县中农村房屋统计","selectFun":"buildTownFun()"},
								{"name":"大型企业房屋统计","selectFun":"buildFirmFun()"}];
			
			$.each(radiosValue, function(i,item) {
				if(i == 0){
					$("#radiosDiv").append("<input name='radio' id='build_s"+i+"' type='radio' checked='checked'>"+item.name+"");
				}
				else
				{
					$("#radiosDiv").append("<input name='radio' id='build_s"+i+"' type='radio'>"+item.name+"");
				}
				$("#build_s"+i).click(function(){
					$("#buildDivs").children("table").remove();
					$("#buildDivs").children(".datagrid").remove();
					eval(item.selectFun);
				});
			});
			return;
		}
		
		//没有选中时，删除当前数据在页面上的查询结果
		$("#buildDivs").remove();//删除当前结果
		var othConDivLen = $("#otherContainerDiv").children(".datagrid").length;
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		//当存放表格的div还有表格，则显示表格容器，隐藏地图容器；反之，隐藏表格容器，显示地图容器
		if(othConDivLen > 0){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","block");//隐藏地图容器
			$("#otherContainerDiv").css("display","none");//显示表格容器
		}
		
		/*房屋统计：按结构统计*/
		function buildConFun(){
			if(moduleLogo == "0"){
				$("#searchDiv img").off("click");//关闭查询按钮的点击事件
				queryBCFun(false,"ALL");
				//调用条件查询方法
				searchDataByCon();
				return;
			}
			//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
			if(isSelect == "checked"){
				queryBCFun(false,"ALL");
				//调用条件查询方法
				searchDataByCon();
				return;
			}
			
			function queryBCFun(isSave,condition){
				loadingWinInit(true);
				$.ajax({
					type:"post",
					url:PATH + urlConfig.builConUrl,
					data:{parameter:condition},
					contentType:"application/x-www-form-urlencoded;charset=UTF-8",
					async:true,
					success:function(result){
						//创建表格
						var centerHeigth = $("#otherContainerDiv").height();
						var tabelHeight = centerHeigth - 120;
						var columnWidth = 100;
						var table = "<table id='buildConTab' style='height:"+tabelHeight+"px;'></table>";
//						$("#otherContainerDiv").append(table);
						$("#buildDivs").append(table);
						//重新解析bodyContent DIV
						$.parser.parse($("#buildConTab"));
						$('#buildConTab').datagrid({    
						    data:result,
						    title:'房屋建筑统计',
						    columns:[[    
						        {field:'co_name',title:'区县名称',width:columnWidth}, 
						        {field:'name',title:'乡镇街道名称',width:columnWidth}, 
						        {field:'tot_area',title:'房屋总面积(单位：万平米)',width:columnWidth},    
						        {field:'average',title:'人均居住面积(单位:平米)',width:columnWidth},
						        {field:'hi_rise',title:'高层建筑面积(单位：万平米)',width:columnWidth},
						        {field:'hi_ri_price',title:'高层建筑单位面积平均造价(单位:元/平米)',width:columnWidth},
						        {field:'hi_ri_property',title:'高层建筑单位面积平均室内财产价值(单位:元/平米)',width:columnWidth},
						        {field:'rcframe',title:'多层钢筋混凝土房屋面积(单位：万平米)',width:columnWidth},
						        {field:'rcfr_price',title:'多层钢筋混凝土房屋单位面积平均造价(单位:元/平米)',width:columnWidth},
						        {field:'rcfr_property',title:'多层钢筋混凝土房屋单位面积平均室内财产价值(单位:元/平米)',width:columnWidth},
						        {field:'br_structure',title:'多层砌体房屋面积(单位：万平米)',width:columnWidth},
						        {field:'br_price',title:'多层砌体房屋单位面积平均造价(单位:元/平米)',width:columnWidth},
						        {field:'br_property',title:'多层砌体房屋单位面积平均室内财产价值(单位:元/平米)',width:columnWidth},
						        {field:'br_structure',title:'多层砌体房屋面积(单位：万平米)',width:columnWidth},
						        {field:'sin_area',title:'多层砌体房屋单位面积平均造价(单位:元/平米)',width:columnWidth},
						        {field:'Sin_price',title:'单层民宅平均造价(单位:元/平米)',width:columnWidth},
						        {field:'sin_property',title:'单层民宅平均室内财产价值(单位：万平米)',width:columnWidth},
						        {field:'oth_structure',title:'其他类别面积(单位:元/平米)',width:columnWidth},
						        {field:'oth_price',title:'其他类别单位面积平均造价(单位:元/平米)',width:columnWidth},
						        {field:'oth_property',title:'其他类别单位面积平均室内财产价值(单位：万平米)',width:columnWidth},
						        {field:'gas',title:'管道煤气天然气',width:columnWidth},
						        {field:'high_rise_pic',title:'高层建筑照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'rcframe_pic',title:'多层钢筋混凝土房屋照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'brick_structure_pic',title:'多层砌体房屋照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'single_building_pic',title:'单层民宅照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'other_structure_pic',title:'其他类型照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'intensity',title:'基本烈度',width:columnWidth}
						    ]]    
						});  
						loadingWinInit(false);	
					}
					
				});
			}
			
			//根据用户输入的条件进行结果查询
			function searchDataByCon(){
				//点击搜索按钮时，根据用户输入的条件进行搜索
				$("#searchDiv img").on("click",function(){
					var inputMess = $("#searchDiv input").attr("value");
					if(inputMess == ""){
						queryBCFun(false,"ALL");
					}
					else
					{
						queryBCFun(false,inputMess);
					}
				});
			}
		}
		
		/*房屋统计：按年代统计*/
		function buildYearFun(){
			if(moduleLogo == "0"){
				$("#searchDiv img").off("click");//关闭查询按钮的点击事件
				queryBYFun(false,"ALL");
				//调用条件查询方法
				searchDataByCon();
				return;
			}
			//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
			if(isSelect == "checked"){
				queryBYFun(false,"ALL");
				//调用条件查询方法
				searchDataByCon();
				return;
			}
			
			function queryBYFun(isSave,condition){
				loadingWinInit(true);
				$.ajax({
					type:"post",
					url:PATH + urlConfig.builYeaUrl,
					data:{parameter:condition},
					contentType:"application/x-www-form-urlencoded;charset=UTF-8",
					async:true,
					success:function(result){
						//创建表格
						var centerHeigth = $("#otherContainerDiv").height();
						var tabelHeight = centerHeigth - 120;
						var columnWidth = 100;
						var y_table = "<table id='buildYeaTable' style='height:"+tabelHeight+"px;'></table>";
//						$("#otherContainerDiv").append(y_table);
						$("#buildDivs").append(y_table);
						//重新解析bodyContent DIV
						$.parser.parse($("#buildYeaTable"));
						$('#buildYeaTable').datagrid({    
						    data:result,   
						    title:'房屋建筑统计',
						    columns:[[    
						        {field:'co_name',title:'区县名称',width:columnWidth}, 
						        {field:'name',title:'街道名称',width:columnWidth}, 
						        {field:'a79steel1',title:'79年以前钢混平房(单位：平米)',width:columnWidth},    
						        {field:'a79steel1_pic',title:'79年以前钢混平房照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a79steel2',title:'79年以前钢混2-6层(单位：平米)',width:columnWidth},
						        {field:'a79steel2_pic',title:'79年以前钢混2-6层照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a79steel7',title:'79年以前钢混7层以上(单位:平米)',width:columnWidth},
						        {field:'a79steel7_pic',title:'79年以前钢混7层以上照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a79brick1',title:'79年以前砖石平房(单位:平米)',width:columnWidth},
						        {field:'a79brick1_pic',title:'79年以前砖石平房照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a79brick2',title:'79年以前砖石2-6层(单位：平米)',width:columnWidth},
						        {field:'a79brick2_pic',title:'79年以前砖石2-6层照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a79brick7',title:'79年以前砖石7层以上(单位:平米)',width:columnWidth},
						        {field:'a79brick7_pic',title:'79年以前砖石7层以上照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a79wood1',title:'79年以前木竹草平房(单位:平米)',width:columnWidth},
						        {field:'a79wood1_pic',title:'79年以前木竹草平房照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a79wood2',title:'79年以前木竹草2-6层(单位：平米)',width:columnWidth},
						        {field:'a79wood2_pic',title:'79年以前木竹草2-6层照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a79wood7',title:'79年以前木竹草7层以上(单位:平米)',width:columnWidth},
						        {field:'a79wood7_pic',title:'79年以前木竹草7层以上照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a80steel1',title:'80-89年钢混平房(单位:平米)',width:columnWidth},
						        {field:'a80steel1_pic',title:'80-89年钢混平房照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a80steel2',title:'80-89年钢混2-6层(单位:平米)',width:columnWidth},
						        {field:'a80steel2_pic',title:'80-89年钢混2-6层照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a80steel7',title:'80-89年钢混7层以上(单位:平米)',width:columnWidth},
						        {field:'a80steel7_pic',title:'80-89年钢混7层以上照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a80brick1',title:'80-89年砖石平房(单位:平米)',width:columnWidth},
						        {field:'a80brick1_pic',title:'80-89年砖石平房照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a80brick2',title:'80-89年砖石2-6层(单位:平米)',width:columnWidth},
						        {field:'a80brick2_pic',title:'80-89年砖石2-6层照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a80brick7',title:'80-89年砖石7层以上(单位:平米)',width:columnWidth},
						        {field:'a80brick7_pic',title:'80-89年砖石7层以上照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a80wood1',title:'80-89年木竹草平房(单位:平米)',width:columnWidth},
						        {field:'a80wood1_pic',title:'80-89年木竹草平房照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a80wood2',title:'80-89年木竹草2-6层(单位:平米)',width:columnWidth},
						        {field:'a80wood2_pic',title:'80-89年木竹草2-6层照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a80wood7',title:'80-89年木竹草7层以上(单位:平米)',width:columnWidth},
						        {field:'a80wood7_pic',title:'80-89年木竹草7层以上照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a90steel1',title:'90年以后钢混平房(单位:平米)',width:columnWidth},
						        {field:'a90steel1_pic',title:'90年以后钢混平房照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a90steel2',title:'90年以后钢混2-6层(单位:平米)',width:columnWidth},
						        {field:'a90steel2_pic',title:'90年以后钢混2-6层照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a90steel7',title:'90年以后钢混7层以上(单位:平米)',width:columnWidth},
						        {field:'a90steel7_pic',title:'90年以后钢混7层以上照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a90brick1',title:'90年以后砖石平房(单位:平米)',width:columnWidth},
						        {field:'a90brick1_pic',title:'90年以后砖石平房照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a90brick2',title:'90年以后砖石2-6层(单位:平米)',width:columnWidth},
						        {field:'a90brick2_pic',title:'90年以后砖石2-6层照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a90brick7',title:'90年以后砖石7层以上',width:columnWidth},
						        {field:'a90brick7_pic',title:'90年以后砖石7层以上照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a90wood1',title:'90年以后木竹草平房(单位:平米)',width:columnWidth},
						        {field:'a90wood1_pic',title:'90年以后木竹草平房照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a90wood2',title:'90年以后木竹草2-6层(单位:平米)',width:columnWidth},
						        {field:'a90wood2_pic',title:'90年以后木竹草2-6层照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'a90wood7',title:'990年以后木竹草7层以上(单位:平米)',width:columnWidth},
						        {field:'a90wood7_pic',title:'90年以后木竹草7层以照片',formatter:buildConFormat,width:columnWidth,align:'center'},
						        {field:'intensity',title:'基本烈度',width:columnWidth},
						        {field:'gas',title:'管道煤气天然气',width:columnWidth}
						    ]]    
						});  
						loadingWinInit(false);
					}
					
				});
			}
			
			//根据用户输入的条件进行结果查询
			function searchDataByCon(){
				//点击搜索按钮时，根据用户输入的条件进行搜索
				$("#searchDiv img").on("click",function(){
					var inputMess = $("#searchDiv input").attr("value");
					if(inputMess == ""){
						queryBYFun(false,"ALL");
					}
					else
					{
						queryBYFun(false,inputMess);
					}
				});
			}
		}
		
		/*房屋统计：区县城区房屋统计*/
		function buildCounFun(){
			if(moduleLogo == "0"){
				$("#searchDiv img").off("click");//关闭查询按钮的点击事件
				queryCounFun(false,"ALL");
				//调用条件查询方法
				searchDataByCon();
				return;
			}
			//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
			if(isSelect == "checked"){
				queryCounFun(false,"ALL");
				//调用条件查询方法
				searchDataByCon();
				return;
			}
			
			function queryCounFun(isSave,condition){
				loadingWinInit(true);
				$.ajax({
					type:"post",
					url:PATH + urlConfig.builCounUrl,
					data:{parameter:condition},
					contentType:"application/x-www-form-urlencoded;charset=UTF-8",
					async:true,
					success:function(result){
						//创建表格
						var centerHeigth = $("#otherContainerDiv").height();
						var tabelHeight = centerHeigth - 120;
						var columnWidth = 100;
						var y_table = "<table id='buildCounTable' style='height:"+tabelHeight+"px;'></table>";
						$("#buildDivs").append(y_table);
//						$("#otherContainerDiv").append(y_table);
						//重新解析bodyContent DIV
						$.parser.parse($("#buildCounTable"));
						$('#buildCounTable').datagrid({    
						    data:result,   
						    title:'房屋建筑统计',
						    columns:[[    
						        {field:'co_name',title:'区县名称',width:columnWidth}, 
						        {field:'name',title:'街道名称',width:columnWidth}, 
						        {field:'rcfr_ratio',title:'多层钢筋混凝土占总建筑面积的比率',width:columnWidth},    
						        {field:'re_rcfr_ratio',title:'多层钢筋混凝土经抗震设计加固的比率',width:columnWidth},
						        {field:'br_ratio',title:'多层砌体占总建筑面积的比率',width:columnWidth},
						        {field:'re_br_ratio',title:'多层砌体经抗震设计加固的比率',width:columnWidth},
						        {field:'sin_ratio',title:'单层民宅占总建筑面积的比率',width:columnWidth},
						        {field:'re_sin_ratio',title:'单层民宅经抗震设计加固的比率',width:columnWidth},
						        {field:'oth_ratio',title:'其他类别占总建筑面积的比率',width:columnWidth},
						        {field:'bef_other_ratio',title:'其他类别1980年以前建造的比率',width:columnWidth},
						        {field:'dan_house_ratio',title:'危房占总建筑面积的比率',width:columnWidth},
						        {field:'dan_people_ratio',title:'危房居住人口占总人口的比率',width:columnWidth},
						        {field:'old_hou_ratio',title:'老旧房屋占总建筑面积的比率',width:columnWidth},
						        {field:'old_peo_ratio',title:'老旧房屋中居住的人口占总人口的比率',width:columnWidth},
						        {field:'intensity',title:'抗震设防烈度',width:columnWidth}
						    ]]    
						});  
						loadingWinInit(false);
					}
					
				});
			}
			
			//根据用户输入的条件进行结果查询
			function searchDataByCon(){
				//点击搜索按钮时，根据用户输入的条件进行搜索
				$("#searchDiv img").on("click",function(){
					var inputMess = $("#searchDiv input").attr("value");
					if(inputMess == ""){
						queryCounFun(false,"ALL");
					}
					else
					{
						queryCounFun(false,inputMess);
					}
				});
			}
		}
		
		
		/*房屋统计：大型企业房屋建筑*/
		function buildFirmFun(){
			if(moduleLogo == "0"){
				$("#searchDiv img").off("click");//关闭查询按钮的点击事件
				queryFirmFun(false,"ALL");
				//调用条件查询方法
				searchDataByCon();
				return;
			}
			//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
			if(isSelect == "checked"){
				queryFirmFun(false,"ALL");
				//调用条件查询方法
				searchDataByCon();
				return;
			}
			
			function queryFirmFun(isSave,condition){
				loadingWinInit(true);
				$.ajax({
					type:"post",
					url:PATH + urlConfig.builFirmUrl,
					data:{parameter:condition},
					contentType:"application/x-www-form-urlencoded;charset=UTF-8",
					async:true,
					success:function(result){
						//创建表格
						var centerHeigth = $("#otherContainerDiv").height();
						var tabelHeight = centerHeigth - 120;
						var columnWidth = 100;
						var y_table = "<table id='buildFirmTable' style='height:"+tabelHeight+"px;'></table>";
						$("#buildDivs").append(y_table);
//						$("#otherContainerDiv").append(y_table);
						//重新解析bodyContent DIV
						$.parser.parse($("#buildFirmTable"));
						$('#buildFirmTable').datagrid({    
						    data:result,    
						    title:'房屋建筑统计',
						    columns:[[    
						        {field:'location',title:'行政区',width:columnWidth}, 
						        {field:'name',title:'企业名称',width:columnWidth}, 
						        {field:'total_area',title:'房屋总面积(单位:万平方米)',width:columnWidth},    
						        {field:'average',title:'人均居住面积(单位:万平方米)',width:columnWidth},
						        {field:'high_rise',title:'高层建筑面积(单位:万平方米)',width:columnWidth},
						        {field:'high_rise_price',title:'高层建筑单位面积平均造价(单位:元/平米)',width:columnWidth},
						        {field:'high_rise_property',title:'高层建筑单位面积平均室内财产价值(单位:元/平米)',width:columnWidth},
						        {field:'rcframe',title:'多层钢筋混凝土房屋面积(单位:万平方米)',width:columnWidth},
						        {field:'rcframe_price',title:'多层钢筋混凝土房屋单位面积平均造价(单位:元/平米)',width:columnWidth},
						        {field:'rcframe_property',title:'多层钢筋混凝土房屋单位面积平均室内财产价值(单位:元/平米)',width:columnWidth},
						        {field:'brick_structure',title:'多层砌体房屋面积(单位:万平方米)',width:columnWidth},
						        {field:'brick_price',title:'多层砌体房屋单位面积平均造价(单位:元/平米)',width:columnWidth},
						        {field:'brick_property',title:'多层砌体房屋平均室内财产价值(单位:元/平米)',width:columnWidth},
						        {field:'factory',title:'单层及多层工业厂房面积(单位:万平方米)',width:columnWidth},
						        {field:'factory_price',title:'工业厂房平均造价(单位:元/平米)',width:columnWidth},
						        {field:'factory_property',title:'工业厂房平均室内财产价值(单位:元/平米)',width:columnWidth},
						        {field:'single_area',title:'单层民宅面积(单位:万平方米)',width:columnWidth},
						        {field:'single_price',title:'单层民宅平均造价(单位:元/平米)',width:columnWidth},
						        {field:'single_property',title:'单层民宅平均室内财产价值(单位:元/平米)',width:columnWidth},
						        {field:'intensity',title:'基本烈度',width:columnWidth}
						    ]]    
						});  
						loadingWinInit(false);
					}
					
				});
			}
			
			//根据用户输入的条件进行结果查询
			function searchDataByCon(){
				//点击搜索按钮时，根据用户输入的条件进行搜索
				$("#searchDiv img").on("click",function(){
					var inputMess = $("#searchDiv input").attr("value");
					if(inputMess == ""){
						queryFirmFun(false,"ALL");
					}
					else
					{
						queryFirmFun(false,inputMess);
					}
				});
			}
		}
		
		/*房屋统计：区县农村房屋统计*/
		function buildTownFun(){
			if(moduleLogo == "0"){
				$("#searchDiv img").off("click");//关闭查询按钮的点击事件
				queryTownFun(false,"ALL");
				//调用条件查询方法
				searchDataByCon();
				return;
			}
			//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
			if(isSelect == "checked"){
				queryTownFun(false,"ALL");
				//调用条件查询方法
				searchDataByCon();
				return;
			}
			
			function queryTownFun(isSave,condition){
				loadingWinInit(true);
				$.ajax({
					type:"post",
					url:PATH + urlConfig.builTownUrl,
					data:{parameter:condition},
					contentType:"application/x-www-form-urlencoded;charset=UTF-8",
					async:true,
					success:function(result){
						//创建表格
						var centerHeigth = $("#otherContainerDiv").height();
						var tabelHeight = centerHeigth - 120;
						var columnWidth = 100;
						var y_table = "<table id='buildTownTable' style='height:"+tabelHeight+"px;'></table>";
						$("#buildDivs").append(y_table);
//						$("#otherContainerDiv").append(y_table);
						//重新解析bodyContent DIV
						$.parser.parse($("#buildTownTable"));
						$('#buildTownTable').datagrid({    
						    data:result,   
						    title:'房屋建筑统计',
						    columns:[[
						        {field:'co_name',title:'区县名称',width:columnWidth}, 
						        {field:'name',title:'街道名称',width:columnWidth}, 
						        {field:'rcfr_ratio',title:'多层钢筋混凝土占总建筑面积的比率',width:columnWidth},    
						        {field:'re_rcfr_ratio',title:'多层钢筋混凝土经抗震设计加固的比率',width:columnWidth},
						        {field:'br_ratio',title:'多层砌体占总建筑面积的比率',width:columnWidth},
						        {field:'re_br_ratio',title:'多层砌体经抗震设计加固的比率',width:columnWidth},
						        {field:'sin_ratio',title:'单层民宅占总建筑面积的比率',width:columnWidth},
						        {field:'re_sin_ratio',title:'单层民宅经抗震设计加固的比率',width:columnWidth},
						        {field:'oth_ratio',title:'其他类别占总建筑面积的比率',width:columnWidth},
						        {field:'bef_oth_ratio',title:'其他类别1980年以前建造的比率',width:columnWidth},
						        {field:'dan_hou_ratio',title:'危房占总建筑面积的比率',width:columnWidth},
						        {field:'dan_peo_ratio',title:'危房居住人口占总人口的比率',width:columnWidth},
						        {field:'old_hou_ratio',title:'老旧房屋占总建筑面积的比率',width:columnWidth},
						        {field:'old_peo_ratio',title:'老旧房屋中居住的人口占总人口的比率',width:columnWidth},
						        {field:'sch_ratio',title:'学校建筑中老旧房屋占学校建筑总面积的比率',width:columnWidth},
						        {field:'intensity',title:'抗震设防烈度',width:columnWidth}
						    ]]    
						});  
						loadingWinInit(false);
					}
					
				});
			}
			
			//根据用户输入的条件进行结果查询
			function searchDataByCon(){
				//点击搜索按钮时，根据用户输入的条件进行搜索
				$("#searchDiv img").on("click",function(){
					var inputMess = $("#searchDiv input").attr("value");
					if(inputMess == ""){
						queryTownFun(false,"ALL");
					}
					else
					{
						queryTownFun(false,inputMess);
					}
				});
			}
		}
		
		//表格单元格式化的函数
		function buildConFormat(val,row){
			var reSpan = '<span style="color:red;cursor:pointer;" onclick="browsePicture('+val+')">查看</span>';
			return reSpan;
		}
	},
	
	/*
	 *  气候数据统计与展示的方法
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	climateResult:function(moduleLogo,isSelect){
		//显示查询窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			$("#otherContainerDiv").html("");//清除表格容器
			$("#searchDiv img").off("click");//关闭查询按钮的点击事件
			queryClimFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			queryClimFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		
		//没有选中时，删除当前数据在页面上的查询结果
		$(".datagrid:has(#CliTab)").remove();
		var othConDivLen = $("#otherContainerDiv").children(".datagrid").length;
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		//当存放表格的div还有表格，则显示表格容器，隐藏地图容器；反之，隐藏表格容器，显示地图容器
		if(othConDivLen > 0){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","block");//隐藏地图容器
			$("#otherContainerDiv").css("display","none");//显示表格容器
		}
		
		function queryClimFun(isSave,condition){
			loadingWinInit(true);
			$.ajax({
				type:"post",
				url:PATH + urlConfig.climateUrl,
				data:{parameter:condition},
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				async:true,
				success:function(result){
					//创建表格
					//获取浏览器的宽度
					var screenWidth = $(window).width();
					var columnWidth = screenWidth*0.1;
					var table = "<table id='CliTab'></table>";
					$("#otherContainerDiv").append(table);
					//重新解析bodyContent DIV
					$.parser.parse($("#CliTab"));
					$('#CliTab').datagrid({    
					    data:result,    
					    title:'气候',
					    columns:[[    
					        {field:'Name',title:'行政区',width:columnWidth},    
					        {field:'Month',title:'月份',width:columnWidth},    
					        {field:'Av_Prec',title:'平均降水量(单位：毫米)',width:columnWidth},
					        {field:'H_Prec',title:'最高降水量(单位：毫米)',width:columnWidth},
					        {field:'L_Prec',title:'最低降水量(单位:毫米)',width:columnWidth},
					        {field:'Av_Temp',title:'平均温度(单位:摄氏度)',width:columnWidth},
					        {field:'H_Temp',title:'最高温度(单位:摄氏度)',width:columnWidth},
					        {field:'L_Temp',title:'最低温度(单位:摄氏度)',width:columnWidth},
					        {field:'Av_Winddir',title:'平均风向',width:columnWidth},
					        {field:'Av_Windgrade',title:'平均风力(单位:级)',width:columnWidth}
					    ]]    
					});  
					loadingWinInit(false);
				}
				
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				if(inputMess == ""){
					queryClimFun(false,"ALL");
				}
				else
				{
					queryClimFun(false,inputMess);
				}
			});
		}
	},
	
	/*
	 *  行业救灾队伍数据统计与展示的方法
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	reliefTroopResult:function(moduleLogo,isSelect){
		//显示查询窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			$("#otherContainerDiv").html("");//清除表格容器
			$("#searchDiv img").off("click");//关闭查询按钮的点击事件
			queryRelTrFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			queryRelTrFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		
		//没有选中时，删除当前数据在页面上的查询结果
		$(".datagrid:has(#refTroTab)").remove();
		var othConDivLen = $("#otherContainerDiv").children(".datagrid").length;
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		//当存放表格的div还有表格，则显示表格容器，隐藏地图容器；反之，隐藏表格容器，显示地图容器
		if(othConDivLen > 0){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","block");//隐藏地图容器
			$("#otherContainerDiv").css("display","none");//显示表格容器
		}
		
		function queryRelTrFun(isSave,condition){
			loadingWinInit(true);
			$.ajax({
				type:"post",
				url:PATH + urlConfig.refTroUrl,
				data:{parameter:condition},
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				async:true,
				success:function(result){
					//创建表格
					//获取浏览器的宽度
					var screenWidth = $(window).width();
					var columnWidth = screenWidth*0.1;
					var table = "<table id='refTroTab'></table>";
					$("#otherContainerDiv").append(table);
					//重新解析bodyContent DIV
					$.parser.parse($("#refTroTab"));
					$('#refTroTab').datagrid({    
					    data:result,    
					    title:'行业救灾队伍',
					    columns:[[    
					        {field:'Location',title:'行政区',width:columnWidth},    
					        {field:'Name',title:'救灾力量名称',width:columnWidth},    
					        {field:'PostCode',title:'邮政编码',width:columnWidth},
					        {field:'Type',title:'力量种类',width:columnWidth},
					        {field:'Tel',title:'联系电话',width:columnWidth},
					        {field:'Scale',title:'救援队伍规模',width:columnWidth},
					        {field:'Motion_Mode',title:'机动方式',width:columnWidth},
					        {field:'Capability',title:'救援能力描述',width:columnWidth}
					    ]]    
					});  
					loadingWinInit(false);
					
				}
				
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				if(inputMess == ""){
					queryRelTrFun(false,"ALL");
				}
				else
				{
					queryRelTrFun(false,inputMess);
				}
			});
		}
	},
	
	/*
	 *  行政区医疗力量数据统计与展示的方法
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	medicalResult:function(moduleLogo,isSelect){
		//显示查询窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			$("#otherContainerDiv").html("");//清除表格容器
			$("#searchDiv img").off("click");//关闭查询按钮的点击事件
			queryMedcFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			queryMedcFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		
		//没有选中时，删除当前数据在页面上的查询结果
		$(".datagrid:has(#medcTab)").remove();
		var othConDivLen = $("#otherContainerDiv").children(".datagrid").length;
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		//当存放表格的div还有表格，则显示表格容器，隐藏地图容器；反之，隐藏表格容器，显示地图容器
		if(othConDivLen > 0){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","block");//隐藏地图容器
			$("#otherContainerDiv").css("display","none");//显示表格容器
		}
		
		function queryMedcFun(isSave,condition){
			loadingWinInit(true);
			$.ajax({
				type:"post",
				url:PATH + urlConfig.medcUrl,
				data:{parameter:condition},
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				async:true,
				success:function(result){
					//创建表格
					//获取浏览器的宽度
					var screenWidth = $(window).width();
					var columnWidth = screenWidth*0.1;
					var table = "<table id='medcTab'></table>";
					$("#otherContainerDiv").append(table);
					//重新解析bodyContent DIV
					$.parser.parse($("#medcTab"));
					$('#medcTab').datagrid({    
					    data:result,    
					    title:'行政区医疗力量',
					    columns:[[    
					        {field:'name',title:'行政区',width:columnWidth},    
					        {field:'hospital',title:'医院数量(单位：个)',width:columnWidth},    
					        {field:'bed',title:'病床数量(单位：床)',width:columnWidth},
					        {field:'ambulance',title:'急救车辆数量(单位:辆)',width:columnWidth},
					        {field:'plasma',title:'库存血浆量(单位:毫升)',width:columnWidth},
					        {field:'doctor',title:'医生数(单位:人)',width:columnWidth},
					        {field:'surgery_dct',title:'外科医生数(单位:人)',width:columnWidth},
					        {field:'orthopedist',title:'骨科医生数(单位:人)',width:columnWidth},
					        {field:'anesthetist',title:'麻醉科医生数(单位:人)',width:columnWidth}
					    ]]    
					});  
					loadingWinInit(false);
				}
				
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				if(inputMess == ""){
					queryMedcFun(false,"ALL");
				}
				else
				{
					queryMedcFun(false,inputMess);
				}
			});
		}
	},
	
	/*
	 *  救灾物资仓库明细数据统计与展示的方法
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	inventoryResult:function(moduleLogo,isSelect){
		//显示查询窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			$("#otherContainerDiv").html("");//清除表格容器
			$("#searchDiv img").off("click");//关闭查询按钮的点击事件
			queryinveFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			queryinveFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		
		$(".datagrid:has(#inveTab)").remove();
		var othConDivLen = $("#otherContainerDiv").children(".datagrid").length;
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		//当存放表格的div还有表格，则显示表格容器，隐藏地图容器；反之，隐藏表格容器，显示地图容器
		if(othConDivLen > 0){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","block");//隐藏地图容器
			$("#otherContainerDiv").css("display","none");//显示表格容器
		}
		
		function queryinveFun(isSave,condition){
			loadingWinInit(true);
			$.ajax({
				type:"post",
				url:PATH + urlConfig.inveUrl,
				data:{parameter:condition},
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				async:true,
				success:function(result){
					//创建表格
					//获取浏览器的宽度
					var screenWidth = $(window).width();
					var columnWidth = screenWidth*0.1;
					var table = "<table id='inveTab'></table>";
					$("#otherContainerDiv").append(table);
					//重新解析bodyContent DIV
					$.parser.parse($("#inveTab"));
					$('#inveTab').datagrid({    
					    data:result,  
					    title:'救灾物资仓库明细',
					    columns:[[    
					        {field:'name',title:'行政区',width:columnWidth},    
					        {field:'Goods_Name',title:'物资种类名称',width:columnWidth},    
					        {field:'Unit',title:'物资种类计量单位',width:columnWidth},
					        {field:'Quantity',title:'物资数量',width:columnWidth},
					        {field:'Note',title:'物资描述',width:columnWidth}
					    ]]    
					});  
					loadingWinInit(false);
					
				}
				
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				if(inputMess == ""){
					queryinveFun(false,"ALL");
				}
				else
				{
					queryinveFun(false,inputMess);
				}
			});
		}
	},
	
	/*
	 *  地震系统联系数据统计与展示的方法
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	nsbCommuResult:function(moduleLogo,isSelect){
		//显示查询窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			$("#otherContainerDiv").html("");//清除表格容器
			$("#searchDiv img").off("click");//关闭查询按钮的点击事件
			queryNsbComFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			queryNsbComFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		
		$(".datagrid:has(#nsbComTab)").remove();
		var othConDivLen = $("#otherContainerDiv").children(".datagrid").length;
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		//当存放表格的div还有表格，则显示表格容器，隐藏地图容器；反之，隐藏表格容器，显示地图容器
		if(othConDivLen > 0){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","block");//隐藏地图容器
			$("#otherContainerDiv").css("display","none");//显示表格容器
		}
		
		
		function queryNsbComFun(isSave,condition){
			loadingWinInit(true);
			$.ajax({
				type:"post",
				url:PATH + urlConfig.nsbcomUrl,
				data:{parameter:condition},
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				async:true,
				success:function(result){
					//创建表格
					//获取浏览器的宽度
					var screenWidth = $(window).width();
					var columnWidth = screenWidth*0.1;
					var table = "<table id='nsbComTab'></table>";
					$("#otherContainerDiv").append(table);
					//重新解析bodyContent DIV
					$.parser.parse($("#nsbComTab"));
					$('#nsbComTab').datagrid({    
					    data:result,    
					    title:'地震系统联系数据',
					    columns:[[    
					        {field:'Name',title:'单位名称',width:columnWidth},    
					        {field:'Address',title:'单位地址',width:columnWidth},    
					        {field:'PostCode',title:'邮政编码',width:columnWidth},
					        {field:'Tel1',title:'值班电话1',width:columnWidth},
					        {field:'Tel2',title:'值班电话2',width:columnWidth},
					        {field:'Linkman',title:'联系人',width:columnWidth},
					        {field:'Fax',title:'传真',width:columnWidth}
					    ]]    
					});  
					loadingWinInit(false);
					
				}
				
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				if(inputMess == ""){
					queryNsbComFun(false,"ALL");
				}
				else
				{
					queryNsbComFun(false,inputMess);
				}
			});
		}
	},
	
	
	/*
	 *  地方政府联系数据统计与展示的方法
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	govComResult:function(moduleLogo,isSelect){
		//显示查询窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			$("#otherContainerDiv").html("");//清除表格容器
			$("#searchDiv img").off("click");//关闭查询按钮的点击事件
			queryGovComFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			queryGovComFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		
		$(".datagrid:has(#govComTab)").remove();
		var othConDivLen = $("#otherContainerDiv").children(".datagrid").length;
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		//当存放表格的div还有表格，则显示表格容器，隐藏地图容器；反之，隐藏表格容器，显示地图容器
		if(othConDivLen > 0){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","block");//隐藏地图容器
			$("#otherContainerDiv").css("display","none");//显示表格容器
		}
		
		function queryGovComFun(isSave,condition){
			loadingWinInit(true);
			$.ajax({
				type:"post",
				url:PATH + urlConfig.govcomUrl,
				data:{parameter:condition},
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				async:true,
				success:function(result){
					//创建表格
					//获取浏览器的宽度
					var screenWidth = $(window).width();
					var columnWidth = screenWidth*0.1;
					var table = "<table id='govComTab'></table>";
					$("#otherContainerDiv").append(table);
					//重新解析bodyContent DIV
					$.parser.parse($("#govComTab"));
					$('#govComTab').datagrid({    
					    data:result,    
					    title:'地方政府联系数据',
					    columns:[[    
					        {field:'Name',title:'行政区',width:columnWidth},    
					        {field:'PostCode',title:'邮政编码',width:columnWidth},    
					        {field:'Tel1',title:'政府值班电话1',width:columnWidth},
					        {field:'Tel2',title:'政府值班电话2',width:columnWidth},
					        {field:'Linkman',title:'联系人姓名',width:columnWidth},
					        {field:'Fax',title:'传真',width:columnWidth}
					    ]]    
					});  
					loadingWinInit(false);
				}
				
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				if(inputMess == ""){
					queryGovComFun(false,"ALL");
				}
				else
				{
					queryGovComFun(false,inputMess);
				}
			});
		}
	},
	
	/*
	 *  地方抗震救灾指挥部联系数据表
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	locHeadResult:function(moduleLogo,isSelect){
		//显示查询窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			$("#otherContainerDiv").html("");//清除表格容器
			$("#searchDiv img").off("click");//关闭查询按钮的点击事件
			queryLocHeadFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			queryLocHeadFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		
		$(".datagrid:has(#locHeadTab)").remove();
		var othConDivLen = $("#otherContainerDiv").children(".datagrid").length;
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		//当存放表格的div还有表格，则显示表格容器，隐藏地图容器；反之，隐藏表格容器，显示地图容器
		if(othConDivLen > 0){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","block");//隐藏地图容器
			$("#otherContainerDiv").css("display","none");//显示表格容器
		}
		
		function queryLocHeadFun(isSave,condition){
			loadingWinInit(true);
			$.ajax({
				type:"post",
				url:PATH + urlConfig.locHeadUrl,
				data:{parameter:condition},
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				async:true,
				success:function(result){
					//创建表格
					//获取浏览器的宽度
					var screenWidth = $(window).width();
					var columnWidth = screenWidth*0.1;
					var table = "<table id='locHeadTab'></table>";
					$("#otherContainerDiv").append(table);
					//重新解析bodyContent DIV
					$.parser.parse($("#locHeadTab"));
					$('#locHeadTab').datagrid({    
					    data:result, 
					    title:'地方抗震救灾指挥部联系数据',
					    columns:[[    
					        {field:'Name',title:'行政区',width:columnWidth},    
					        {field:'PostCode',title:'邮政编码',width:columnWidth},    
					        {field:'Tel1',title:'值班电话1',width:columnWidth},
					        {field:'Tel2',title:'值班电话2',width:columnWidth},
					        {field:'Chief',title:'指挥长姓名',width:columnWidth},
					        {field:'Chief_Tel',title:'指挥长电话',width:columnWidth},
					        {field:'Chief_Mp',title:'指挥长手机',width:columnWidth},
					        {field:'Secretary_Tel',title:'秘书电话',width:columnWidth},
					        {field:'Secretary_Mp',title:'秘书手机',width:columnWidth},
					        {field:'Fax',title:'传真',width:columnWidth}
					    ]]    
					});  
					loadingWinInit(false);
					
				}
				
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				if(inputMess == ""){
					queryLocHeadFun(false,"ALL");
				}
				else
				{
					queryLocHeadFun(false,inputMess);
				}
			});
		}
	},
	
	
	/*
	 *  灾情速报网络数据表
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	localNetResult:function(moduleLogo,isSelect){
		//显示查询窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			$("#otherContainerDiv").html("");//清除表格容器
			$("#searchDiv img").off("click");//关闭查询按钮的点击事件
			queryLocalNetFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			queryLocalNetFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		
		$(".datagrid:has(#localNetTab)").remove();
		var othConDivLen = $("#otherContainerDiv").children(".datagrid").length;
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		//当存放表格的div还有表格，则显示表格容器，隐藏地图容器；反之，隐藏表格容器，显示地图容器
		if(othConDivLen > 0){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","block");//隐藏地图容器
			$("#otherContainerDiv").css("display","none");//显示表格容器
		}
		
		function queryLocalNetFun(isSave,condition){
			loadingWinInit(true);
			$.ajax({
				type:"post",
				url:PATH + urlConfig.localNet,
				data:{parameter:condition},
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				async:true,
				success:function(result){
					//创建表格
					//获取浏览器的宽度
					var screenWidth = $(window).width();
					var columnWidth = screenWidth*0.1;
					var table = "<table id='localNetTab'></table>";
					$("#otherContainerDiv").append(table);
					//重新解析bodyContent DIV
					$.parser.parse($("#localNetTab"));
					$('#localNetTab').datagrid({    
					    data:result,
					    title:'灾情速报网络数据',
					    columns:[[    
					        {field:'Name',title:'行政区',width:columnWidth},    
					        {field:'Unit_Name',title:'单位名称',width:columnWidth},    
					        {field:'PostCode',title:'邮政编码',width:columnWidth},
					        {field:'People_Name',title:'姓名',width:columnWidth},
					        {field:'Duty',title:'职务',width:columnWidth},
					        {field:'Office_Tel',title:'办公电话',width:columnWidth},
					        {field:'Home_Tel',title:'住宅电话',width:columnWidth},
					        {field:'Mp',title:'手机',width:columnWidth},
					        {field:'Note',title:'备注',width:columnWidth}
					    ]]    
					}); 
					loadingWinInit(false);
					
				}
				
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				if(inputMess == ""){
					queryLocalNetFun(false,"ALL");
				}
				else
				{
					queryLocalNetFun(false,inputMess);
				}
			});
		}
	},
	
	
	/*
	 *  军队与武装力量数据
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	troopCResult:function(moduleLogo,isSelect){
		//显示查询窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			$("#otherContainerDiv").html("");//清除表格容器
			$("#searchDiv img").off("click");//关闭查询按钮的点击事件
			queryTroopCFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
			queryTroopCFun(false,"ALL");
			//调用条件查询方法
			searchDataByCon();
			return;
		}
		
		$(".datagrid:has(#troopCTab)").remove();
		var othConDivLen = $("#otherContainerDiv").children(".datagrid").length;
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		//当存放表格的div还有表格，则显示表格容器，隐藏地图容器；反之，隐藏表格容器，显示地图容器
		if(othConDivLen > 0){
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","block");//隐藏地图容器
			$("#otherContainerDiv").css("display","none");//显示表格容器
		}
		
		function queryTroopCFun(isSave,condition){
			loadingWinInit(true);
			$.ajax({
				type:"post",
				url:PATH + urlConfig.troopcUrl,
				data:{parameter:condition},
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				async:true,
				success:function(result){
					//创建表格
					//获取浏览器的宽度
					var screenWidth = $(window).width();
					var columnWidth = screenWidth*0.1;
					var table = "<table id='troopCTab'></table>";
					$("#otherContainerDiv").append(table);
					//重新解析bodyContent DIV
					$.parser.parse($("#troopCTab"));
					$('#troopCTab').datagrid({    
					    data:result,    
					    title:'军队与武装力量',
					    columns:[[    
					        {field:'Name',title:'队伍名称',width:columnWidth},    
					        {field:'PostCode',title:'邮政编码',width:columnWidth},
					        {field:'Scale',title:'队伍规模',width:columnWidth},
					        {field:'Location',title:'驻地市县',width:columnWidth},
					        {field:'Tel_1',title:'值班电话1',width:columnWidth},
					        {field:'Tel_2',title:'值班电话2',width:columnWidth},
					        {field:'Fax',title:'传真',width:columnWidth}
					    ]]    
					}); 
					loadingWinInit(false);
					
				}
				
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				if(inputMess == ""){
					queryTroopCFun(false,"ALL");
				}
				else
				{
					queryTroopCFun(false,inputMess);
				}
			});
		}
	},
	
	
	/*
	 * 活动断裂分布
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	activeTectonicsResult:function(moduleLogo,isSelect){
		$("#searchDiv").css("display","none");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			queryATFun();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//查询当前数据的结果,并且进行保存
			queryATFun(true);
			return;
		}
		//如果当前数据没有被选中，从图层上移除该数据
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.atDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		function queryATFun(isSave){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.atDataSet,"",function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				var features = queryEventArgs.result.features;
				for(var i=0;i<features.length; i++){
					features[i].style = {
						strokeColor: "#660000",
				        strokeWidth: 1.5
//				        fillColor: "#FFAB3F",
//				        fillOpacity: "0.8"
					};
				}
				vectorLayer.addFeatures(features);
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					bookMarkersResultSave[urlConfig.atDataSet] = features;
				}
			});
		}
	},
	
	/*
	 * 地震动峰值加速度区划图
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	peakAccelMapResult:function(moduleLogo,isSelect){
		$("#searchDiv").css("display","none");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			queryPAMFun();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//查询当前数据的结果,并且进行保存
			queryPAMFun(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除该数据
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.pamDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		function queryPAMFun(isSave){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.pamDataSet,"",function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				$("#legend").css("display","block");
				$(".legendContent").html("");
				var features = queryEventArgs.result.features;
				for(var i=0; i<features.length; i++){
					var epa = features[i].attributes.EPA;
					if(epa == "0.15"){
						features[i].style = {
							strokeColor:"#FFD966",
							strokeWidth:2,
							fillColor:"#BEF901",
							fillOpacity:0.7
						};
					}
					else if(epa == "0.2")
					{
						features[i].style = {
							strokeColor:"#FFD966",
							strokeWidth:2,
							fillColor:"#ACE101",
							fillOpacity:0.7
						};
					}
					features[i].id = "peakAccel_"+features[i].attributes.SMID;
					var centerPoint = features[i].geometry.getCentroid();
					features[i].geometry.x = centerPoint.x;
					features[i].geometry.y = centerPoint.y;
				}
				//添加图例
				$(".legendContent").append("<canvas style='width:15px; height:15px; margin-right:10px; background-color:#BEF901'></canvas>"+"0.15g" + "<br/>");
				$(".legendContent").append("<canvas style='width:15px; height:15px; margin-right:10px; background-color:#ACE101'></canvas>"+"0.2g");
				
				vectorLayer.addFeatures(features);
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					bookMarkersResultSave[urlConfig.pamDataSet] = features;
				}
			});
		}
	},
	
	
	/*
	 * 地震动反应谱特征周期
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	chaPeriodResult:function(moduleLogo,isSelect){
		$("#searchDiv").css("display","none");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//隐藏图例
			$("#legend").css("display","none");
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//查询当前数据的结果
			queryCpFun();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//查询当前数据的结果,并且进行保存
			queryCpFun(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除该数据
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.chapDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var features = [];
		function queryCpFun(isSave){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.chapDataSet,"",function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				vectorLayer.removeFeatures(features);
				features = queryEventArgs.result.features;
				//显示图例
				$("#legend").css("display","block");
				$(".legendContent").html("");
				for(var i=0; i<features.length; i++){
					var tg = features[i].attributes.TG;
					if(tg == "0.45"){
						features[i].style = {
							strokeColor:"#FFD966",
							strokeWidth:2,
							fillColor:"#BEF901",
							fillOpacity:0.7
						};
					}
					//添加图例
					$(".legendContent").append("<canvas style='width:15px; height:15px; margin-right:10px; background-color:"+features[i].style.fillColor+"'></canvas>"+tg);
				}
				
				vectorLayer.addFeatures(features);
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					bookMarkersResultSave[urlConfig.cha_period] = features;
				}
			});
		}
	},
	
	
	/*
	 * 地区疏散场地分布图
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	evacuationSiteResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			queryESFun();
			$("#searchDiv img").off("click");
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//查询当前数据的结果,并且进行保存
			queryESFun(true);
			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除该数据
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.esDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var features = [];
		function queryESFun(isSave,sqlString){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.esDataSet,sqlString,function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				vectorLayer.removeFeatures(features);
				features = queryEventArgs.result.features;
				//给feature设置样式
				for (var i=0; i<features.length; i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:featureImgs.evacuSitFI,
						graphicWidth:48,
						graphicHeight:48
					};
					//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
					features[i].id = "evacuationSite_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
//				map.zoomTo(3);
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					if(bookMarkersResultSave[urlConfig.esDataSet] != undefined){
						vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.esDataSet]);
					}
					bookMarkersResultSave[urlConfig.esDataSet] = features;
				}
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(isSave){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				/*
				 * 生成sql查询语句
				*/
				var attrs = spaceDataAttrConfig.evacuationSite;//获取到可匹配的字段
				var sqlCon = "";
				for(var obj in attrs){
					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
				}
				sqlCon = sqlCon.slice(0,sqlCon.length-4);
				queryESFun(isSave,sqlCon);
			});
		}
	},
	
	/*
	 * 重大火灾、爆炸、有毒和放射危险源数据
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	dangerousSourceResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			queryDSFun();
			$("#searchDiv img").off("click");
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//查询当前数据的结果,并且进行保存
			queryDSFun(true);
			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除该数据
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.dsDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var features = [];
		function queryDSFun(isSave,sqlString){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.dsDataSet,sqlString,function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				vectorLayer.removeFeatures(features);
				features = queryEventArgs.result.features;
				//给feature设置样式
				for (var i=0; i<features.length; i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:featureImgs.dangSourFI,
						graphicWidth:20,
						graphicHeight:25
					};
					//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
					features[i].id = "dangerousSource_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					if(bookMarkersResultSave[urlConfig.dsDataSet] != undefined){
						vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.dsDataSet]);
					}
					bookMarkersResultSave[urlConfig.dsDataSet] = features;
				}
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(isSave){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				/*
				 * 生成sql查询语句
				*/
				var attrs = spaceDataAttrConfig.dangerousSource;//获取到可匹配的字段
				var sqlCon = "";
				for(var obj in attrs){
					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
				}
				sqlCon = sqlCon.slice(0,sqlCon.length-4);
				queryDSFun(isSave,sqlCon);
			});
		}
	},
	
	/*
	 * 地震地质灾害危险区分布
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	geologivalHarborResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			queryGHFun();
			$("#searchDiv img").off("click");
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//查询当前数据的结果,并且进行保存
			queryGHFun(true);
			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除该数据
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.ghDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var features = [];
		function queryGHFun(isSave,sqlString){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.ghDataSet,sqlString,function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				vectorLayer.removeFeatures(features);
				features = queryEventArgs.result.features;
				//给feature设置样式
				for (var i=0; i<features.length; i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:featureImgs.geoHarFI,
						graphicWidth:25,
						graphicHeight:30
					};
					//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
					features[i].id = "geologivalHarbor_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					if(bookMarkersResultSave[urlConfig.ghDataSet] != undefined){
						vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.ghDataSet]);
					}
					bookMarkersResultSave[urlConfig.ghDataSet] = features;
				}
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(isSave){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				/*
				 * 生成sql查询语句
				*/
				var attrs = spaceDataAttrConfig.geologivalHarbor;//获取到可匹配的字段
				var sqlCon = "";
				for(var obj in attrs){
					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
				}
				sqlCon = sqlCon.slice(0,sqlCon.length-4);
				queryGHFun(isSave,sqlCon);
			});
		}
		
	},
	
	/*
	 * 学校分布
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	schoolResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			querySLFun();
			$("#searchDiv img").off("click");
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//查询当前数据的结果,并且进行保存
			querySLFun(true);
			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除该数据
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.slDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var features = [];
		function querySLFun(isSave,sqlString){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.slDataSet,sqlString,function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				vectorLayer.removeFeatures(features);
				features = queryEventArgs.result.features;
				//给feature设置样式
				for (var i=0; i<features.length; i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:featureImgs.schoolFI,
						graphicWidth:30,
						graphicHeight:25
					};
					//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
					features[i].id = "schools_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					if(bookMarkersResultSave[urlConfig.slDataSet] != undefined){
						vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.slDataSet]);
					}
					bookMarkersResultSave[urlConfig.slDataSet] = features;
				}
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(isSave){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				/*
				 * 生成sql查询语句
				*/
				var attrs = spaceDataAttrConfig.schools;//获取到可匹配的字段
				var sqlCon = "";
				for(var obj in attrs){
					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
				}
				sqlCon = sqlCon.slice(0,sqlCon.length-4);
				querySLFun(isSave,sqlCon);
			});
		}
		
	},
	
	/*
	 * 旅游景点和国家自然保护区
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	tourismSpotResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			queryTSFun();
			$("#searchDiv img").off("click");
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//查询当前数据的结果,并且进行保存
			queryTSFun(true);
			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除该数据
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.tsDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var features = [];
		function queryTSFun(isSave,sqlString){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.tsDataSet,sqlString,function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				vectorLayer.removeFeatures(features);
				features = queryEventArgs.result.features;
				//给feature设置样式
				for (var i=0; i<features.length; i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:featureImgs.tourismFI,
						graphicWidth:48,
						graphicHeight:48
					};
					//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
					features[i].id = "tourismSpot_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					if(bookMarkersResultSave[urlConfig.tsDataSet] != undefined){
						vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.tsDataSet]);
					}
					bookMarkersResultSave[urlConfig.tsDataSet] = features;
				}
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(isSave){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				/*
				 * 生成sql查询语句
				*/
				var attrs = spaceDataAttrConfig.tourismSpot;//获取到可匹配的字段
				var sqlCon = "";
				for(var obj in attrs){
					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
				}
				sqlCon = sqlCon.slice(0,sqlCon.length-4);
				queryTSFun(isSave,sqlCon);
			});
		}
		
	},
	
	/*
	 * 文物保护单位
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	landMarkResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			queryLMFun();
			$("#searchDiv img").off("click");
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//查询当前数据的结果,并且进行保存
			queryLMFun(true);
			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除该数据
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.lmDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var features = [];
		function queryLMFun(isSave,sqlString){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.lmDataSet,sqlString,function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				vectorLayer.removeFeatures(features);
				features = queryEventArgs.result.features;
				//给feature设置样式
				for (var i=0; i<features.length; i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:featureImgs.landMarkFI,
						graphicWidth:32,
						graphicHeight:32
					};
					//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
					features[i].id = "landmark_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					if(bookMarkersResultSave[urlConfig.lmDataSet] != undefined){
						vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.lmDataSet]);
					}
					bookMarkersResultSave[urlConfig.lmDataSet] = features;
				}
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(isSave){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				/*
				 * 生成sql查询语句
				*/
				var attrs = spaceDataAttrConfig.landmark;//获取到可匹配的字段
				var sqlCon = "";
				for(var obj in attrs){
					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
				}
				sqlCon = sqlCon.slice(0,sqlCon.length-4);
				queryLMFun(isSave,sqlCon);
			});
		}
		
	},
	
	/*
	 * 重大目标
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	sigObjectiveResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			querySOFun();
			$("#searchDiv img").off("click");
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//查询当前数据的结果,并且进行保存
			querySOFun(true);
			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除该数据
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.soDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var features = [];
		function querySOFun(isSave,sqlString){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.soDataSet,sqlString,function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				vectorLayer.removeFeatures(features);
				features = queryEventArgs.result.features;
				//给feature设置样式
				for (var i=0; i<features.length; i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:featureImgs.sigObjFI,
						graphicWidth:32,
						graphicHeight:32
					};
					//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
					features[i].id = "sigObjective_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					if(bookMarkersResultSave[urlConfig.soDataSet] != undefined){
						vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.soDataSet]);
					}
					bookMarkersResultSave[urlConfig.soDataSet] = features;
				}
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(isSave){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				/*
				 * 生成sql查询语句
				*/
				var attrs = spaceDataAttrConfig.sigObjective;//获取到可匹配的字段
				var sqlCon = "";
				for(var obj in attrs){
					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
				}
				sqlCon = sqlCon.slice(0,sqlCon.length-4);
				querySOFun(isSave,sqlCon);
			});
		}
		
	},
	
	
	/*
	 * 专业救援队伍
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	profRescueResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			queryPRFun();
			$("#searchDiv img").off("click");
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//查询当前数据的结果,并且进行保存
			queryPRFun(true);
			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除该数据
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.prDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var features = [];
		function queryPRFun(isSave,sqlString){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.prDataSet,sqlString,function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				vectorLayer.removeFeatures(features);
				features = queryEventArgs.result.features;
				//给feature设置样式
				for (var i=0; i<features.length; i++) {
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
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					if(bookMarkersResultSave[urlConfig.prDataSet] != undefined){
						vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.prDataSet]);
					}
					bookMarkersResultSave[urlConfig.prDataSet] = features;
				}
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(isSave){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				/*
				 * 生成sql查询语句
				*/
				var attrs = spaceDataAttrConfig.professionalRescue;//获取到可匹配的字段
				var sqlCon = "";
				for(var obj in attrs){
					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
				}
				sqlCon = sqlCon.slice(0,sqlCon.length-4);
				queryPRFun(isSave,sqlCon);
			});
		}
		
	},
	
	/*
	 * 消防力量
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	firePowerResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			queryFPFun();
			$("#searchDiv img").off("click");
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//查询当前数据的结果,并且进行保存
			queryFPFun(true);
			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除该数据
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.fpDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var features = [];
		function queryFPFun(isSave,sqlString){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.fpDataSet,sqlString,function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				vectorLayer.removeFeatures(features);
				features = queryEventArgs.result.features;
				//给feature设置样式
				for (var i=0; i<features.length; i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:featureImgs.firePowerFI,
						graphicWidth:48,
						graphicHeight:48
					};
					//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
					features[i].id = "firePower_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					if(bookMarkersResultSave[urlConfig.fpDataSet] != undefined){
						vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.fpDataSet]);
					}
					bookMarkersResultSave[urlConfig.fpDataSet] = features;
				}
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(isSave){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				/*
				 * 生成sql查询语句
				*/
				var attrs = spaceDataAttrConfig.firePower;//获取到可匹配的字段
				var sqlCon = "";
				for(var obj in attrs){
					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
				}
				sqlCon = sqlCon.slice(0,sqlCon.length-4);
				queryFPFun(isSave,sqlCon);
			});
		}
		
	},
	
	/*
	 * 医院分布
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	hospitalResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			queryHFun();
			$("#searchDiv img").off("click");
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//查询当前数据的结果,并且进行保存
			queryHFun(true);
			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除该数据
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.hDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var features = [];
		function queryHFun(isSave,sqlString){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.hDataSet,sqlString,function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				vectorLayer.removeFeatures(features);
				features = queryEventArgs.result.features;
				//给feature设置样式
				for (var i=0; i<features.length; i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:featureImgs.hospitalFI,
						graphicWidth:32,
						graphicHeight:32
					};
					//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
					features[i].id = "hospital_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					if(bookMarkersResultSave[urlConfig.hDataSet] != undefined){
						vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.hDataSet]);
					}
					bookMarkersResultSave[urlConfig.hDataSet] = features;
				}
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(isSave){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				/*
				 * 生成sql查询语句
				*/
				var attrs = spaceDataAttrConfig.hospital;//获取到可匹配的字段
				var sqlCon = "";
				for(var obj in attrs){
					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
				}
				sqlCon = sqlCon.slice(0,sqlCon.length-4);
				queryHFun(isSave,sqlCon);
			});
		}
		
	},
	
	/*
	 * 物资储备仓库
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	storageResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			querySun();
			$("#searchDiv img").off("click");
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//查询当前数据的结果,并且进行保存
			querySun(true);
			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除所有要素
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.sDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var features = [];
		function querySun(isSave,sqlString){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.sDataSet,sqlString,function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				vectorLayer.removeFeatures(features);
				features = queryEventArgs.result.features;
				//给feature设置样式
				for (var i=0; i<features.length; i++) {
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
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					if(bookMarkersResultSave[urlConfig.sDataSet] != undefined){
						vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.sDataSet]);
					}
					bookMarkersResultSave[urlConfig.sDataSet] = features;
				}
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(isSave){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				/*
				 * 生成sql查询语句
				*/
				var attrs = spaceDataAttrConfig.storage;//获取到可匹配的字段
				var sqlCon = "";
				for(var obj in attrs){
					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
				}
				sqlCon = sqlCon.slice(0,sqlCon.length-4);
				querySun(isSave,sqlCon);
			});
		}
		
	},
	
	/*
	 * 地震台站
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	obserStaResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			querOSFun();
			$("#searchDiv img").off("click");
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			//查询当前数据的结果,并且进行保存
			querOSFun(true);
			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除所有要素
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.osDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var features = [];
		function querOSFun(isSave,sqlString){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.osDataSet,sqlString,function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				vectorLayer.removeFeatures(features);
				features = queryEventArgs.result.features;
				//给feature设置样式
				for (var i=0; i<features.length; i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:featureImgs.obserStaFI,
						graphicWidth:20,
						graphicHeight:25
					};
					//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
					features[i].id = "observationSta_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					if(bookMarkersResultSave[urlConfig.osDataSet] != undefined){
						vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.osDataSet]);
					}
					bookMarkersResultSave[urlConfig.osDataSet] = features;
				}
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(isSave){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				/*
				 * 生成sql查询语句
				*/
				var attrs = spaceDataAttrConfig.observationSta;//获取到可匹配的字段
				var sqlCon = "";
				for(var obj in attrs){
					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
				}
				sqlCon = sqlCon.slice(0,sqlCon.length-4);
				querOSFun(isSave,sqlCon);
			});
		}
		
	},
	
	/*
	 * 潜在震源区
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	potSourceResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			querpotSFun();
			$("#searchDiv img").off("click");
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			//查询当前数据的结果,并且进行保存
			querOSFun(true);
			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除所有要素
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.potsDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var features = [];
		function querpotSFun(isSave,sqlString){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.potsDataSet,sqlString,function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				vectorLayer.removeFeatures(features);
				features = queryEventArgs.result.features;
				//给feature设置样式
				for (var i=0; i<features.length; i++) {
//					features[i].style = {
//						pointRadius: 4,
//						graphic:true,
//						externalGraphic:"jfinal-easyui/../static/images/featureIcon/commonImg.png",
//						graphicWidth:20,
//						graphicHeight:25
//					};
					//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
					features[i].id = "potsSource_"+features[i].attributes.SMID;
					//给面数据设置一个中点
					var centerPoint = features[i].geometry.getCentroid();
					features[i].geometry.x = centerPoint.x;
					features[i].geometry.y = centerPoint.y;
				}
				vectorLayer.addFeatures(features);
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					if(bookMarkersResultSave[urlConfig.potsDataSet] != undefined){
						vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.potsDataSet]);
					}
					bookMarkersResultSave[urlConfig.potsDataSet] = features;
				}
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(isSave){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				/*
				 * 生成sql查询语句
				*/
				var attrs = spaceDataAttrConfig.potsSource;//获取到可匹配的字段
				var sqlCon = "";
				for(var obj in attrs){
					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
				}
				sqlCon = sqlCon.slice(0,sqlCon.length-4);
				querpotSFun(isSave,sqlCon);
			});
		}
		
	},
	
	/*
	 * 公路
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	roadResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","none");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			//清除公路图层
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			queryrFun();
//			$("#searchDiv img").off("click");
//			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			//查询当前数据的结果,并且进行保存
			queryrFun();
//			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除所有要素
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.roadDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var roadLayer;
		function queryrFun(){
//			loadingWinInit(true);
			//创建一个动态图层
			roadLayer = new SuperMap.Layer.TiledDynamicRESTLayer("公路分布",urlConfig.roadServerUrl,{transparent: true});
			//测试代码，用完之后删除
			roadLayer.events.on({"layerInitialized":addRoadLayer});
		}
		
		function addRoadLayer(){
			map.addLayers([roadLayer]);
		}
		//根据用户输入的条件进行结果查询
//		function searchDataByCon(isSave){
//			//点击搜索按钮时，根据用户输入的条件进行搜索
//			$("#searchDiv img").on("click",function(){
//				var inputMess = $("#searchDiv input").attr("value");
//				/*
//				 * 生成sql查询语句
//				*/
//				var attrs = spaceDataAttrConfig.roads;//获取到可匹配的字段
//				var sqlCon = "";
//				for(var obj in attrs){
//					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
//				}
//				sqlCon = sqlCon.slice(0,sqlCon.length-4);
//				queryrFun(isSave,sqlCon);
//			});
//		}
		
	},
	
	/*
	 * 铁路
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	railWayResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","none");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			querRWFun();
//			$("#searchDiv img").off("click");
//			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			//查询当前数据的结果,并且进行保存
			querRWFun();
//			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除所有要素
//		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.railWayDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var railWay;
		function querRWFun(isSave,sqlString){
			//创建一个动态图层
			railWay = new SuperMap.Layer.TiledDynamicRESTLayer("铁路分布",urlConfig.railWay,{transparent: true});
			//测试代码，用完之后删除
			railWay.events.on({"layerInitialized":addRailWayLayer});
		}
			
		function addRailWayLayer(){
			map.addLayers([railWay]);
		}
//			loadingWinInit(true);
//			querySpaceService.comSqlService(urlConfig.railWayDataSet,sqlString,function resultFunction(queryEventArgs){
//				loadingWinInit(false);
//				if(queryEventArgs.result == null || queryEventArgs == undefined){
//					return;
//				}
//				var features = queryEventArgs.result.features;
//				//给feature设置样式
//				for (var i=0; i<features.length; i++) {
//					//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
//					features[i].id = "potsSource_"+features[i].attributes.SMID;
//					//给面数据设置一个中点
//					features[i].geometry.x = "1";
//					features[i].geometry.y = "2";
//				}
//				vectorLayer.addFeatures(features);
//				/*
//				 * 如果是书签模块，需要将查询到的结果进行保存
//				 */
//				if(isSave){
//					if(bookMarkersResultSave[urlConfig.railWayDataSet] != undefined){
//						vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.railWayDataSet]);
//					}
//					bookMarkersResultSave[urlConfig.railWayDataSet] = features;
//				}
//			});
		
		
		//根据用户输入的条件进行结果查询
//		function searchDataByCon(isSave){
//			//点击搜索按钮时，根据用户输入的条件进行搜索
//			$("#searchDiv img").on("click",function(){
//				var inputMess = $("#searchDiv input").attr("value");
//				/*
//				 * 生成sql查询语句
//				*/
//				var attrs = spaceDataAttrConfig.railWay;//获取到可匹配的字段
//				var sqlCon = "";
//				for(var obj in attrs){
//					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
//				}
//				sqlCon = sqlCon.slice(0,sqlCon.length-4);
//				querRWFun(isSave,sqlCon);
//			});
//		}
		
	},
	
	/*
	 * 桥梁
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	bridgeResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			querbridgeFun();
			$("#searchDiv img").off("click");
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			//查询当前数据的结果,并且进行保存
			querbridgeFun(true);
			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除所有要素
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.bridge1DataSet]);
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.bridge2DataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var features1 = [];
		var features2 = [];
		function querbridgeFun(isSave,sqlString){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.bridge1DataSet,sqlString,function resultFunction(queryEventArgs){
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				vectorLayer.removeFeatures(features1);
				features1 = queryEventArgs.result.features;
				//给feature设置样式
				for (var i=0; i<features1.length; i++) {
//					features[i].style = {
//						pointRadius: 4,
//						graphic:true,
//						externalGraphic:"jfinal-easyui/../static/images/featureIcon/commonImg.png",
//						graphicWidth:20,
//						graphicHeight:25
//					};
					//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
					features1[i].id = "bridge_"+features1[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features1);
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					if(bookMarkersResultSave[urlConfig.bridge1DataSet] != undefined){
						vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.bridge1DataSet]);
					}
					bookMarkersResultSave[urlConfig.bridge1DataSet] = features1;
				}
				
				//第二次查询，查询面
				querySpaceService.comSqlService(urlConfig.bridge2DataSet,sqlString,function resultFunction(queryEventArgs){
					if(queryEventArgs.result == null || queryEventArgs == undefined){
						return;
					}
					vectorLayer.removeFeatures(features2);
					features2 = queryEventArgs.result.features;
					//给feature设置样式
					for (var i=0; i<features2.length; i++) {
	//					features[i].style = {
	//						pointRadius: 4,
	//						graphic:true,
	//						externalGraphic:"jfinal-easyui/../static/images/featureIcon/commonImg.png",
	//						graphicWidth:20,
	//						graphicHeight:25
	//					};
						//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
						features2[i].id = "bridge_r"+features2[i].attributes.SMID;
						var centerPoint = features2[i].geometry.getCentroid();
						features2[i].geometry.x = centerPoint.x;
						features2[i].geometry.y = centerPoint.y;
					}
					vectorLayer.addFeatures(features2);
					/*
					 * 如果是书签模块，需要将查询到的结果进行保存
					 */
					if(isSave){
						if(bookMarkersResultSave[urlConfig.bridge2DataSet] != undefined){
							vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.bridge2DataSet]);
						}
						bookMarkersResultSave[urlConfig.bridge2DataSet] = features2;
					}
					
					loadingWinInit(false);
					
				});
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(isSave){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				/*
				 * 生成sql查询语句
				*/
				var attrs = spaceDataAttrConfig.bridge;//获取到可匹配的字段
				var sqlCon = "";
				for(var obj in attrs){
					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
				}
				sqlCon = sqlCon.slice(0,sqlCon.length-4);
				querbridgeFun(isSave,sqlCon);
			});
		}
		
	},
	
	/*
	 * 隧道
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	tunnelResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			quertunnelFun();
			$("#searchDiv img").off("click");
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			//查询当前数据的结果,并且进行保存
			quertunnelFun(true);
			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除所有要素
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.tunnelDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var features = [];
		function quertunnelFun(isSave,sqlString){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.tunnelDataSet,sqlString,function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				vectorLayer.removeFeatures(features);
				features = queryEventArgs.result.features;
				//给feature设置样式
				for (var i=0; i<features.length; i++) {
//					features[i].style = {
//						pointRadius: 4,
//						graphic:true,
//						externalGraphic:"jfinal-easyui/../static/images/featureIcon/commonImg.png",
//						graphicWidth:20,
//						graphicHeight:25
//					};
					//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
					features[i].id = "tunnels_"+features[i].attributes.SMID;
					var centerPoint = features[i].geometry.getCentroid();
					features[i].geometry.x = centerPoint.x;
					features[i].geometry.y = centerPoint.y;
				}
				vectorLayer.addFeatures(features);
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					if(bookMarkersResultSave[urlConfig.tunnelDataSet] != undefined){
						vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.tunnelDataSet]);
					}
					bookMarkersResultSave[urlConfig.tunnelDataSet] = features;
				}
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(isSave){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				/*
				 * 生成sql查询语句
				*/
				var attrs = spaceDataAttrConfig.tunnels;//获取到可匹配的字段
				var sqlCon = "";
				for(var obj in attrs){
					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
				}
				sqlCon = sqlCon.slice(0,sqlCon.length-4);
				quertunnelFun(isSave,sqlCon);
			});
		}
		
	},
	
	/*
	 * 交通管制点
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	entrancesResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			querentranFun();
			$("#searchDiv img").off("click");
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			//查询当前数据的结果,并且进行保存
			querentranFun(true);
			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除所有要素
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.heDataSet]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var features = [];
		function querentranFun(isSave,sqlString){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.heDataSet,sqlString,function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				vectorLayer.removeFeatures(features);
				features = queryEventArgs.result.features;
				//给feature设置样式
				for (var i=0; i<features.length; i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:featureImgs.entranceFI,
						graphicWidth:32,
						graphicHeight:32
					};
					//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
					features[i].id = "entrances_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					if(bookMarkersResultSave[urlConfig.heDataSet] != undefined){
						vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.heDataSet]);
					}
					bookMarkersResultSave[urlConfig.heDataSet] = features;
				}
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(isSave){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				/*
				 * 生成sql查询语句
				*/
				var attrs = spaceDataAttrConfig.entrances;//获取到可匹配的字段
				var sqlCon = "";
				for(var obj in attrs){
					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
				}
				sqlCon = sqlCon.slice(0,sqlCon.length-4);
				quertunnelFun(isSave,sqlCon);
			});
		}
		
	},
	
	/*
	 * 水库
	 * 	moduleLogo:标识是数据仓库模块还是书签模块，0代表数据仓库模块，1代表书签模块
	 * 	isSelect：标识在书签模块中，当前人口数据是否被选中，checked代表被选中
	 * */
	reserviorResult:function(moduleLogo,isSelect){
		//显示搜索窗口
		$("#searchDiv").css("display","block");
		//如果是数据仓库模块，则清除中间区域的所有内容，加载当前数据的查询结果
		if(moduleLogo == "0"){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			//清除矢量图层上的所有要素
			vectorLayer.removeAllFeatures();
			removeOneLayer("公路分布");
			removeOneLayer("铁路分布");
			//隐藏图例
			$("#legend").css("display","none");
			//查询当前数据的结果
			viorFun();
			$("#searchDiv img").off("click");
			searchDataByCon();
			return;
		}
		//如果是书签模块，选中时，不清页面上已有的数据直接进行叠加，没有选中时，删除当前数据在页面上的查询结果
		if(isSelect == "checked"){
			//查询当前数据的结果,并且进行保存
			viorFun(true);
			searchDataByCon(true);
			return;
		}
		
		//如果当前数据没有被选中，从图层上移除所有要素
		vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.reservior]);
		$("#searchDiv img").off("click");
		if($("#otherContainerDiv").children(".datagrid").length == 0 && vectorLayer.features.length == 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
			return;
		}
		if(vectorLayer.features.length > 0){
			$("#mapContainerDiv").css("display","block");//显示地图容器
			$("#otherContainerDiv").css("display","none");//隐藏表格容器
		}
		else
		{
			$("#mapContainerDiv").css("display","none");//隐藏地图容器
			$("#otherContainerDiv").css("display","block");//显示表格容器
		}
		
		//查询当前数据的结果
		var features = [];
		function viorFun(isSave,sqlString){
			loadingWinInit(true);
			querySpaceService.comSqlService(urlConfig.reservior,sqlString,function resultFunction(queryEventArgs){
				loadingWinInit(false);
				if(queryEventArgs.result == null || queryEventArgs == undefined){
					return;
				}
				vectorLayer.removeFeatures(features);
				features = queryEventArgs.result.features;
				//给feature设置样式
				for (var i=0; i<features.length; i++) {
					features[i].style = {
						pointRadius: 4,
						graphic:true,
						externalGraphic:featureImgs.reservior,
						graphicWidth:32,
						graphicHeight:32
					};
					//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
					features[i].id = "reservior_"+features[i].attributes.SMID;
				}
				vectorLayer.addFeatures(features);
				/*
				 * 如果是书签模块，需要将查询到的结果进行保存
				 */
				if(isSave){
					if(bookMarkersResultSave[urlConfig.reservior] != undefined){
						vectorLayer.removeFeatures(bookMarkersResultSave[urlConfig.reservior]);
					}
					bookMarkersResultSave[urlConfig.reservior] = features;
				}
			});
		}
		
		//根据用户输入的条件进行结果查询
		function searchDataByCon(isSave){
			//点击搜索按钮时，根据用户输入的条件进行搜索
			$("#searchDiv img").on("click",function(){
				var inputMess = $("#searchDiv input").attr("value");
				/*
				 * 生成sql查询语句
				*/
				var attrs = spaceDataAttrConfig.reservior;//获取到可匹配的字段
				var sqlCon = "";
				for(var obj in attrs){
					sqlCon = sqlCon + obj + " like '%"+ inputMess +"%' or ";
				}
				sqlCon = sqlCon.slice(0,sqlCon.length-4);
				quertunnelFun(isSave,sqlCon);
			});
		}
		
	}
	
	
	
	
		
};

//浏览房屋建筑照片的方法
/*function browseBuildPicture(content){
	//content是照片的url地址，调用照片查看器查看图片
//			alert(content);
	//显示放置图片的div
	$("#pictureBroses").css("display","block");
	$("#pictureBroses div").remove();
	
	var testPicData = [
		'jfinal-easyui/../static/images/myFocusTestImg/1a.jpg',
		'jfinal-easyui/../static/images/myFocusTestImg/2a.jpg',
		'jfinal-easyui/../static/images/myFocusTestImg/3a.jpg',
		'jfinal-easyui/../static/images/myFocusTestImg/4a.jpg',
		'jfinal-easyui/../static/images/myFocusTestImg/5a.jpg',
		'jfinal-easyui/../static/images/myFocusTestImg/1a.jpg'
	];
	
	$("#pictureBroses").append("<div id='myFocus'></div>");
	//这里class='pic'中的pic是不能被改变的
	$("#myFocus").append("<div class='loading'><img src='jfinal-easyui/../static/images/myFocusTestImg/loading.gif' alt='请稍候...' /></div>"+
				  "<div class='pic'>"+
				  	"<ul id='myFocusContent'></ul>"+
				  "</div>");
	
	for (var i=0; i<testPicData.length; i++) {
		$("#myFocusContent").append("<li><img src="+testPicData[i]+" /></li>");
	}
	
	myFocus.set({
		id:'myFocus',//ID
		pattern:'mF_pithy_tb'
	});
}*/