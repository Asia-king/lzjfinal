/*
 * 书签模块初始化
 * */
var bm_useId = "";
MainApp.controller('bookMarkCtrls', [ '$scope', function($scope) {
	bm_useId = $scope.sys_userid;
	$scope.bookMarkInit = function(){	
		//显示地图容器，隐藏表格容器
		$("#mapContainerDiv").css("display","block");//隐藏地图容器
		$("#otherContainerDiv").css("display","none");//显示表格容器
	//	clearMap();
		
		//查询用户的所有书签并且展示在页面上
		showUserMarkBook();
	//	var bookMarkDiv = "<div id='bookMarkDiv' class='easyui-accordion'></div>";
	//	$("#bodyContent").append(bookMarkDiv);
		//测试数据
//		var bookmarkTestData = [{"id":"100","name":"人口和经济","children":[{"id":"101","name":"人口统计数据","resultFun":""},{"id":"102","name":"经济统计数据","resultFun":""}]},
//								{"id":"200","name":"人口和经济","children":[{"id":"201","name":"人口统计数据","resultFun":""},{"id":"202","name":"经济统计数据","resultFun":""}]},
//								{"id":"300","name":"人口和经济","children":[{"id":"301","name":"人口统计数据","resultFun":""},{"id":"302","name":"经济统计数据","resultFun":""}]},
//								{"id":"400","name":"人口和经济","children":[{"id":"401","name":"人口统计数据","resultFun":""},{"id":"402","name":"经济统计数据","resultFun":""}]},
//								{"id":"500","name":"人口和经济","children":[{"id":"501","name":"人口统计数据","resultFun":""},{"id":"502","name":"经济统计数据","resultFun":""}]}];
		//清空和新建按钮
		var bm_button = "<button id='bm_clearMark'>清空</button><button id='bm_newMark'>新建</button>";
		$("#bookMarkDiv").append(bm_button);
		//按钮下面的分割线
		$("#bookMarkDiv").append("<hr />");
		//装载书签内容的div
		$("#bookMarkDiv").append("<div id='bm_contentDiv'></div>");
		
		/*
		 * 点击清空按钮时，所作的操作
		 */
		$("#bm_clearMark").click(function (){
			//弹出确认窗口
			alertSureWinInit("确认是否删除所有书签？",function clearSureFun(){
				//确认清空书签，调用后台方清空书签
				$.ajax({
					type:"post",
					url:PATH +urlConfig.bookMarkClear,
					contentType:"application/x-www-form-urlencoded;charset=UTF-8",
					data:{userId:bm_useId},
					async:true,
					success:function(data){
						//清空所有书签
						$("#bm_contentDiv").html("");
					}
				});
			},
		    function clearNotSureFun(){
				//如果用户选择了不删除，则什么都不做
			});
		});
		
		/*
		 * 点击新建按钮时，弹出新建书签窗口，新建书签
		 * */
		$("#bm_newMark").click(function (){
			showNewBookMark(false);
		});
		
	}
}]);

//查询当前用户的书签，并且展示在页面上
function showUserMarkBook(){
	$("#bm_contentDiv").html("");
	var bookMarkes = [];
	//查询该用户的所有书签
	$.ajax({
		type:"post",
		url:PATH + urlConfig.bookMarkQuery,
		data:{"userId":bm_useId},
		async:true,
		success:function(data){
			for (var i=0; i<data.length; i++) {
				var markContent = data[i].mark_content;
				markContent = markContent.slice(0,markContent.length-1);
				markContent = markContent + ",id:" + data[i].id + "}";
				var sd = eval("("+markContent+")");
				bookMarkes.push(sd);
			};
			//给div中添加书签
			$.each(bookMarkes, function(i,item) {
				$("#bm_contentDiv").append("<div class='bm_bookMarker' id='bm_bookMark"+item.id+"'>"+item.text+"</div>");
				//鼠标右键显示编辑、删除按钮
				$("#bm_bookMark"+item.id).on('contextmenu',function(e){
					e.preventDefault();//禁用浏览器鼠标右键功能
					editOrDelBookMark(e,item,"#bm_bookMark"+item.id,"");
				});
				
				//在页面上显示当前用户的书签
				$.each(item.children, function(j,childData) {
					$("#bm_contentDiv").append("<div class='bm_bookMarksCon'>"+"<input id='bm_cb"+childData.code+"' type='checkbox' /><span id='cb_children"+childData.code+i+j+"'>"+childData.text+"</span></div>");
					$("#bm_cb"+childData.code).click(function(){
						var cb_ischecked = $(this).attr("checked");
						//执行数据加载的方法，如果复选框是被选中的，则加载数据；如果没有被选中，并且数据存在，则删除数据
						eval(wareHouseFunc[childData.initResult]("1",cb_ischecked));
						
					});
					//给数据添加鼠标右键单击事件，对数据进行编辑和删除操作
					$("#cb_children"+childData.code+i+j).on('contextmenu',function(e){
						e.preventDefault();//禁用浏览器鼠标右键功能
						editOrDelBookMark(e,childData,"#cb_children"+childData.code+i+j,item);
		//				alert(childData.id)
					});
				});
				
			});
			
		}
	});
}

/*
 * 新建或者编辑书签
 * 	isEdit:是新建书签还是编辑书签，true代表编辑书签，false代表新建书签
 * 	item：被操作的对象，有可能是书签，也可能是书签位置
 * 	idSelector：被操作对象的ID选择器
 * 	parentItem：被操作对象的父节点，如果操作对象是书签位置，则该值为"",反之则为书签
 * */
function showNewBookMark(isEdit,item,idSelector,parentItem){
	//弹出新建书签窗口
	var new_bookmark = "<div id='new_bookmarkDiv' style='width:350px;height:130px;z-index:1255;font-family:微软雅黑; color:787878; border: 0.5px solid #AAAAAA;box-shadow: 2px 2px 2px #ABABAB;background-color: #FFFFFF;position: absolute; left:40%;top:40%'>"+
							"<div id='new_bookmarkTitle' style='height:30px;width:349px;border-bottom: 0.5px solid #E2E2E2;font-size:14px; background-color:#F3F3F3'>书签<img src="+closeImg1+" style='position:absolute;right:1px;cursor: pointer;'/></div>"+
							"<div id='new_bookmarkContent' style='width:300px;position:relative;top:25px;left:45px;font-size:12px;cursor:pointer'>"+
								"<span>名称：</span><input id='new_bookMarkName' type='text' style='border:0.5px solid #95B8E7; width:150px;border-radius:5px '/></br></br>"
							+"</div>"
							+"<button id='new_bookmarkSureButt' style='position: absolute;right:5px;bottom:5px;border: 0.5px solid #AAAAAA;background-color: #FFFFFF;cursor: pointer;'>确定</burron>"
					+"</div>";
	$("body").append(new_bookmark);
	
	//点击书签的关闭按钮，删除添加书签的窗口
	$("#new_bookmarkTitle img").click(function(){
		$("#new_bookmarkDiv").remove();
	});
	
	//点击书签的确定按钮,进行书签编辑或者添加
	$("#new_bookmarkSureButt").click(function(){
		var bookMarkName = $("#new_bookMarkName").attr("value");
		var markCon = "";
		if(isEdit){
			//执行编辑操作
			if(parentItem == ""){
				//编辑的是书签位置
				item.text = bookMarkName;
				markCon = item;
			}
			else
			{
				//编辑的是书签
				for (var i=0; i<parentItem.children.length; i++) {
					if(item.code == parentItem.children[i].code){
						parentItem.children[i].text = bookMarkName;
						markCon = parentItem;
						break;
					}
				}
			}
			
			var markId = markCon.id;
			markCon = JSON.stringify(markCon);
			//调用修改方法进行修改
			$.ajax({
				type:"post",
				url:PATH +urlConfig.bookMarkUpdate,
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				data:{id:markId,markContent:markCon},
				async:true,
				success:function(data){
					alertInfoWinInit("操作成功！");
					//修改页面上的内容
					$(idSelector).html(bookMarkName);
					//关闭添加书签窗口
					$("#new_bookmarkDiv").remove();
				}
			});
		}
		else{
			//执行添加操作
			var addDa = {"text":bookMarkName,"children":[]};
			addDa = JSON.stringify(addDa);
			$.ajax({
				type:"post",
				url:PATH +urlConfig.bookMarkAdd,
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				dataType:'json',
				data:{userId:bm_useId,markContent:addDa},
				async:true,
				success:function(data){
					alertInfoWinInit("操作成功！");
					showUserMarkBook();
					//关闭添加书签窗口
					$("#new_bookmarkDiv").remove();
				}
			});
		}
	
	});
}

/*
 * 显示右键编辑或者删除按钮   
 * */
function editOrDelBookMark(e,item,idSelector,parentItem){
	$("#dwh_mouseRightDiv").remove();
	var bm_rightClick = "<div id='dwh_mouseRightDiv' style='width:50px; background-color: #F2F2F2; cursor: pointer; border: 0.5px solid #AAAAAA;box-shadow: 2px 2px 2px #ABABAB; z-index:1255;position: absolute; text-align:center; left:"+e.pageX+"px;top:"+e.pageY+"px;'>"+
							"<div id='bm_editbm' style='border-bottom:1px solid #AAAAAA'>编辑</div>"+
							"<div id='bm_deletebm'>删除</div>"+
						"</div>";
	$("body").append(bm_rightClick);
	//选择编辑按钮所作的操作
	$("#bm_editbm").click(function(){
		//删除右键菜单
		$("#dwh_mouseRightDiv").remove();
		//显示书签编辑窗口，对书签进行编辑
		showNewBookMark(true,item,idSelector,parentItem);
	});
	
	//选择删除按钮所作的操作
	$("#bm_deletebm").click(function(){
		//删除右键菜单
		$("#dwh_mouseRightDiv").remove();
		alertSureWinInit("确认是否删除所有书签？",function clearSureFun(){
			//点击确认按钮，删除选中的书签
			if(parentItem == ""){
				//删除的是书签位置,执行删除方法
				$.ajax({
					type:"post",
					url:PATH +urlConfig.bookMarkDel,
					contentType:"application/x-www-form-urlencoded;charset=UTF-8",
					dataType:'json',
					data:{id:item.id},
					async:true,
					success:function(data){
						alertInfoWinInit("操作成功！");
						showUserMarkBook();
					}
				});
			}
			else
			{
				var markCons = "";
				//删除的是书签（执行书签的update方法）
				for (var i=0; i<parentItem.children.length; i++) {
					if(item.code == parentItem.children[i].code){
						parentItem.children.splice(i,1);
						markCons = parentItem;
						break;
					}
				}
				
				var markId = parentItem.id;
				markCons = JSON.stringify(markCons);
				//调用修改方法进行修改
				$.ajax({
					type:"post",
					url:PATH +urlConfig.bookMarkUpdate,
					contentType:"application/x-www-form-urlencoded;charset=UTF-8",
					data:{id:markId,markContent:markCons},
					async:true,
					success:function(data){
						alertInfoWinInit("操作成功！");
						//修改页面上的内容
						$(idSelector).parent().remove();
					}
				});
			}
			
		},
	    function clearNotSureFun(){
			//如果用户选择了不删除，则什么都不做
		});
	});
	
}
