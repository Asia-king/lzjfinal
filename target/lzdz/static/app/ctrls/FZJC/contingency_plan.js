/*
 * 应急预案模块
 * */
MainApp.controller('contPlanCtrls', [ '$scope', function($scope) {
	
	
	$scope.contPlanModuleInit = function(){
		//查询数据库中的所有应急预案数据，并且将其添加到对应的结构下面
		queryEmePlan("ALL","NULL","NULL");
		
	}
	
	//模糊查询
	$scope.cpSearchButtClick = function(){
		var infoMess = $("#cp_searchDiv input").attr("value");
		$("#con_plan_tree").tree("search",infoMess);
	}
	
	//查询结果返回按钮
	$scope.cpReturnButtClick = function(){
		$("#con_plan_tree").tree("search","");
	}
	
	/*
	 * 应急预案查询接口
	 * 	param:如果为"ALL"，则根据后面两个参数进行条件查询，如果为用户输入的某一个字符，则进行模糊查询，后面两个参数不起作用
	 * 	townId：区县编码，如果不需要这个查询条件，则将参数的值设为"NULL"
	 * 	type:数据的分类，代表是学校、医院等，如果不需这个查询条件，则将参数值设为"NULL"
	 * 	
	 * */
	function queryEmePlan(param,townId,type){
		$.ajax({
			type:"post",
			url:PATH+urlConfig.emegenPlanQuery,
			data:{parameter:param,townId:townId,type:type},
			async:true,
			success:function(data){
				var tree_data = contigencyPlan_data;
				//将查询到的数据按照相应的条件添加到tree的结构中
				getEmePlanData(tree_data,data);
				
				cpCreateTree(tree_data);
			}
		});
	}
	
	/*
	 * 构造tree，并且在左侧面板进行显示
	 * */
	function cpCreateTree(treeData){
		//获取左侧面板数据，构造树
		var treeul = "<ul id='con_plan_tree' class='easyui-tree'></ul>";
		$("#contingencyPlan").append(treeul);
		//给tree赋值
		$("#con_plan_tree").tree({
			lines:true,
			animate:true,
			data:treeData,
			onSelect:function(node){
				//当选择到最底层的时候，取出当前数据文档，并且做文档展示
				if(node.children == undefined || node.children.length == 0){
					//获取当前文档在服务器上的存储路径，并在页面上打开该文档
					$("#webOffice").css("display","block");//显示webOffice控件容器
					$("#mapContainerDiv").css("display","none");//隐藏地图容器
					//打开文档
					document.all.WebOffice1.LoadOriginalFile("E:/workspace/earthquake0.2.0/jfinal-easyui/src/main/webapp/static/app/tools/webofficeT/image/tmp1.doc", "doc");
				}
			}
		});
	}
	
	/*
	 * 根据配置文件中的结构，使用递归的方式，将数据库中的应急预案添加到结构中，作为tree的数据源
	 * arrayList:参加递归运算的数组
	 * 
	 * */
	function getEmePlanData(arrayList,dataSource){
		for(var i=0; i < arrayList.length; i++)
		{
			var childNode = arrayList[i];
			if(childNode.children == undefined || childNode.children.length == 0)
			{
				var countyId = childNode.countyId;
				var type = childNode.type;
				var children = [];
				for (var j=0; j<dataSource.length; j++) {
					if(countyId == dataSource[j].county_id && type == dataSource[j].class){
						dataSource[j].text = dataSource[j].UnitName;
						children.push(dataSource[j]);
					}
				}
				childNode.children = children;
			}
			else
			{	
				getEmePlanData(childNode.children,dataSource);
			}
		}

	}
		
}]);