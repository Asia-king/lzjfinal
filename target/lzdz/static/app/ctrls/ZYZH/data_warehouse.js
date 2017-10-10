/*
 * 数据仓库模块初始化
 * */
MainApp.controller('dataWareHouseCtrls', [ '$scope', function($scope) {
	$scope.dataWareHouseInit = function(){	
		
		//	clearMap();
		
	//	var leftDiv = "<div id='dataWareHouse'></div>";
	//	$("#bodyContent").append(leftDiv);
	//}
	//$(function(){
	//	var leftDiv = "<div id='dataWareHouse' class='easyui-accordion'></div>";
	//	$("#bodyContent").append(leftDiv);
		//获取到父级div的高度，为后面给子div设置高度做准备
		var screenHeight = $(window).height();
		//添加面板
		$.each(basedata_classify, function(i,item) {
			//给accordion添加面板
			$('#dataWareHouse').accordion('add', {
				id:item.code,
				title: item.text,
				height:parseInt(screenHeight)*0.6
			});
//			var panelDiv = "<div id="+item.code+" title="+item.text+"></div>";
//			$("#dataWareHouse").append(panelDiv);
			//设置面板高度
//			$("#"+item.code).css("height",parseInt(panelHeight)*0.75);
			//给每个面板添加树控件
			var treeul = "<ul id="+item.code+" class='easyui-tree'></ul>";
			$("#"+item.code).append(treeul);
			//给tree赋值
			$("#"+item.code).tree({
				lines:true,
				animate:true,
				data:item.children,
				onSelect:function(node){
					//当选择到最底层的节点时，进行该节点的数据展示，与地图区域进行交互
					if(node.children.length == 0){
						closeInfoWin();
						//初始化查询结果展示的方法
						eval(wareHouseFunc[node.initResult]("0"));
					}
				},
				onContextMenu:function(e,node){
					e.preventDefault();//禁用浏览器鼠标右键功能
					dwh_mouseRightClick(e,node);
				}
			});
			
		});
		//设置第一个面板选中
		$('#dataWareHouse').accordion({
			selected:1
		});
		//重新解析bodyContent DIV
		$.parser.parse($("#dataWareHouse"));
	//})
		
		
	}
	
	/*
	 * 加载查询框的方法
	 * */
	function addSearchDiv(){
		
	}
	
	/*
	 * 用户点击鼠标右键，展示添加到书签菜单，点击"添加到菜单"按钮显示添加书签的页面
	 * */
	function dwh_mouseRightClick(event,node){
		var mouseRightDiv = "<div id='dwh_mouseRightDiv' style='width:80px; background-color: #F2F2F2; cursor: pointer; border: 0.5px solid #AAAAAA;box-shadow: 2px 2px 2px #ABABAB; z-index:1255;position: absolute; text-align:center; left:"+event.pageX+"px;top:"+event.pageY+"px;'>"+
								"<div id='dwh_addToBook'>添加到书签</div>"+
							"</div>";
		$("body").append(mouseRightDiv);
		//用户点击了“添加到书签”按钮，弹出添加书签的窗口，同时删除鼠标右键菜单
		$("#dwh_addToBook").click(function(){
			//删除右键菜单
			$("#dwh_mouseRightDiv").remove();
			//显示添加书签的窗口
			var bookmarkDiv = "<div id='bookmarkDiv' style='width:350px;height:125px;z-index:1255;font-family:微软雅黑; color:787878; border: 0.5px solid #AAAAAA;box-shadow: 2px 2px 2px #ABABAB;background-color: #FFFFFF;position: absolute; left:40%;top:40%'>"+
									"<div id='bookmarkTitle' style='height:30px;width:349px;border-bottom: 0.5px solid #E2E2E2;font-size:14px; background-color:#F3F3F3'>添加到书签<img src="+closeImg1+" style='position:absolute;right:1px;cursor: pointer;'/></div>"+
									"<div id='bookmarkContent' style='width:300px;position:relative;top:25px;left:45px;font-size:12px'>"+
//										"<span>名称：</span><input id='bookMarkName' type='text' style='border:0.5px solid #95B8E7; width:150px;border-radius:5px;'/></br>"+
										"<span>位置：</span><input id='bookMarkPosition' style='width:165px;border:1px solid #E2E2E2'/>&nbsp;&nbsp;"+
										"<button id='addNewPosition' style='border: 0.5px solid #95B8E7;background-color: #FFFFFF;cursor: pointer;font-size:12px'>新建位置</button>"
									+"</div>"
									+"<button id='bookmarkSureButt' style='position: absolute;right:5px;bottom:5px;border: 0.5px solid #AAAAAA;background-color: #FFFFFF;cursor: pointer;border-radius:5px;'>确定</burron>"
							+"</div>";
			$("body").append(bookmarkDiv);
			//查询当前已经存在的书签的位置
			var selectBookMaker;//被选中的书签
			$.ajax({
				type:"post",
				url:PATH + urlConfig.bookMarkQuery,
				data:{"userId":$scope.sys_userid},
				async:true,
				success:function(data){
					var newData = [];
					for (var i=0; i<data.length; i++) {
						var markContent = data[i].mark_content;
						markContent = markContent.slice(0,markContent.length-1);
						markContent = markContent + ",id:" + data[i].id + "}";
						var sd = eval("("+markContent+")");
						newData.push(sd);
					};
					$('#bookMarkPosition').combobox({ 
						data:newData,
					    valueField:'id',    
					    textField:'text',
					    panelHeight:'auto',
					    onSelect:function(record){
							selectBookMaker = record;
						}
					});
					//重新解析bodyContent DIV
//					$.parser.parse($("#bodyContent"));
				}
			});
			
			//当用户点击“新建位置”按钮时，在select输入框中显示信息
			$("#addNewPosition").click(function(){
				$('#bookMarkPosition').combobox("setText","请输入要添加的位置");
			});
			//点击书签的关闭按钮，删除添加书签的窗口
			$("#bookmarkTitle img").click(function(){
				$("#bookmarkDiv").remove();
			});
			//点击书签的确定按钮,进行书签添加，并且关闭书签添加窗口
			$("#bookmarkSureButt").click(function(){
				//获取到选中的标签名称
//				var addBookMarkTitle = $("#bookMarkName").attr("value");
				/*获取到用户选中的书签位置位置,selectBookMaker是已经存在并且被选中的，
				 *addBookMarkPos是新添加的位置，这两个是二者择一的，二者中不为空的则是书签要添加的位置，注：在添加书签的时候后台必须做去重操作
				 */
				var addBookMarkPos = $("#bookMarkPosition").combobox("getText");
				//获取到当前要添加的数据
				var addBookMakerData = node;
				//提交ajax请求
				var addData;
				if(addBookMarkPos == ""){
					alertInfoWinInit("请选择或者填写书签位置。");
					return;
				}
				if(selectBookMaker ==  undefined || selectBookMaker == "" || selectBookMaker == null){
					//说明用户要新建位置
					addData = {"text":addBookMarkPos,"children":[addBookMakerData]};
//					alert(JSON.stringify(datasss))
					addData = JSON.stringify(addData);
//					addData = "{'text':$addBookMarkPos,'children':$addBookMakerData}";
//					alert(addData);
//					addData = "{text:"+addBookMarkPos+",children:"+addBookMakerData+"}";
//					addData = "{" + addData + "}";
//					addData = eval('(' + addData + ')');
//					var addDataStr = JSON.stringify(addData);
					$.ajax({
						type:"post",
						url:PATH +urlConfig.bookMarkAdd,
						contentType:"application/x-www-form-urlencoded;charset=UTF-8",
						dataType:'json',
						data:{userId:$scope.sys_userid,markContent:addData},
						async:true,
						success:function(data){
							alertInfoWinInit("添加成功！");
							showUserMarkBook();
							//关闭添加书签窗口
							$("#bookmarkDiv").remove();
						}
					});
				}
				else
				{
					//说明用户选择的是已经存在的位置,调用修改方法
					var bookMarkId = selectBookMaker.id;//获取到当前标签的ID
					selectBookMaker.children.push(addBookMakerData);
					selectBookMaker = JSON.stringify(selectBookMaker);//将Json转换为字符串
					//执行update方法
					$.ajax({
						type:"post",
						url:PATH +urlConfig.bookMarkUpdate,
						contentType:"application/x-www-form-urlencoded;charset=UTF-8",
						data:{id:bookMarkId,markContent:selectBookMaker},
						async:true,
						success:function(data){
							alertInfoWinInit("修改成功！");
							showUserMarkBook();
							//关闭添加书签窗口
							$("#bookmarkDiv").remove();
						}
					});
				}
				
			});
		});
	}
}]);


