var currentUserName = "";
var	currentUserId = "";
MainApp.controller('IndexCtrls', [ '$scope','$cookieStore', function($scope,$cookieStore) {
	var pevaresult=[];
	$scope.$on("PEVAResult",function (event, msg) {//接收到来自子childCtr1的信息后再广播给所有子controller
		//console.log("parent", msg);
		//alert("A:"+msg.length);
		pevaresult.push(msg);
		$scope.$broadcast("PEVAResultFromParrent", msg);//给所有子controller广播
	});
	$scope.load=function(){

		$('#tab_p').panel({
			border:false,
			isonCls:'anchor',
			tools : [ {
				iconCls : 'database_refresh',
				handler : function() {
					$('#layout_west_tree').tree('reload');
				}}, {
				iconCls : 'resultset_next',
				handler : function() {
					var node = $('#layout_west_tree').tree('getSelected');
					if (node) {
						$('#layout_west_tree').tree('expandAll', node.target);
					} else {
						$('#layout_west_tree').tree('expandAll');
					}}},{
				iconCls : 'resultset_previous',
				handler : function() {
					var node = $('#layout_west_tree').tree('getSelected');
					if (node) {
						$('#layout_west_tree').tree('collapseAll', node.target);
					} else {
						$('#layout_west_tree').tree('collapseAll');
					}}} ]
		});



		$scope.index_layout = $('#index_layout').layout({
			fit : true
		});
//		$scope.index_layout.layout('collapse', 'south');
//		$scope.index_layout.layout('collapse', 'east');


		$scope.index_tabs = $('#index_tabs').tabs({
			fit : true,
			border : false,
			onContextMenu : function(e, title) {
				e.preventDefault();
				$scope.index_tabsMenu.menu('show', {
					left : e.pageX,
					top : e.pageY
				}).data('tabTitle', title);
			},
			tools : [ {
				iconCls : 'database_refresh',
				handler : function() {
					var href = $scope.index_tabs.tabs('getSelected').panel('options').href;
					if (href) {/*说明tab是以href方式引入的目标页面*/
						var index = $scope.index_tabs.tabs('getTabIndex', $scope.index_tabs.tabs('getSelected'));
						$scope.index_tabs.tabs('getTab', index).panel('refresh');
					} else {/*说明tab是以content方式引入的目标页面*/
						var panel = $scope.index_tabs.tabs('getSelected').panel('panel');
						var frame = panel.find('iframe');
						try {
							if (frame.length > 0) {
								for ( var i = 0; i < frame.length; i++) {
									frame[i].contentWindow.document.write('');
									frame[i].contentWindow.close();
									frame[i].src = frame[i].src;
								}
								if (navigator.userAgent.indexOf("MSIE") > 0) {// IE特有回收内存方法
									try {
										CollectGarbage();
									} catch (e) {
									}
								}
							}
						} catch (e) {
						}
					}
				}
			}, {
				iconCls : 'delete',
				handler : function() {
					var index = $scope.index_tabs.tabs('getTabIndex', $scope.index_tabs.tabs('getSelected'));
					var tab = $scope.index_tabs.tabs('getTab', index);
					if (tab.panel('options').closable) {
						$scope.index_tabs.tabs('close', index);
					} else {
						$.messager.alert('提示', '[' + tab.panel('options').title + ']不可以被关闭！', 'error');
					}
				}
			} ]
		});


		$scope.index_tabsMenu = $('#index_tabsMenu').menu({
			onClick : function(item) {
				var curTabTitle = $(this).data('tabTitle');
				var type = $(item.target).attr('title');

				if (type === 'refresh') {
					$scope.index_tabs.tabs('getTab', curTabTitle).panel('refresh');
					return;
				}

				if (type === 'close') {
					var t = $scope.index_tabs.tabs('getTab', curTabTitle);
					if (t.panel('options').closable) {
						$scope.index_tabs.tabs('close', curTabTitle);
					}
					return;
				}

				var allTabs = $scope.index_tabs.tabs('tabs');
				var closeTabsTitle = [];

				$.each(allTabs, function() {
					var opt = $(this).panel('options');
					if (opt.closable && opt.title != curTabTitle && type === 'closeOther') {
						closeTabsTitle.push(opt.title);
					} else if (opt.closable && type === 'closeAll') {
						closeTabsTitle.push(opt.title);
					}
				});

				for ( var i = 0; i < closeTabsTitle.length; i++) {
					$scope.index_tabs.tabs('close', closeTabsTitle[i]);
				}
			}
		});
	};


	//获取当前啊日期
	var myDate = new Date();
	var cmonth = myDate.getMonth();
	cmonth = parseInt(cmonth)+1;
	var weeks = ["日","一","二","三","四","五","六"];
	var cweek = weeks[myDate.getDay()];
	$scope.currentDate = myDate.getFullYear()+"年" + cmonth.toString() + "月" + myDate.getDate() + "日" + "   星期"+cweek+"  !";

	//设置放置地图的div的宽度和高度
	var winH = $(window).height();
	var winW = $(window).width();
	$("#mapContainerDiv").width(winW-250);
	$("#mapContainerDiv").height(winH-80);

	//给图片浏览窗口的关闭按钮添加一个click事件
	$("#myFocusClose").click(function(){
		$("#pictureBroses").css("display","none");
	});

	//给音、视频播放窗口添加一个click事件
	$("#myvideosClose").click(function(){
		$("#videoControl").css("display","none");
		//停止视频播放
		//$("#myvideos").pause();
		document.getElementById('myvideos').pause();
	});

	//摄像头实时视频窗口关闭按钮
	$("#look_at_camera #lac_close").click(function(){
		$("#look_at_camera").css("display","none");
	});

	//资源分布按钮点击事件
	$("#ad_b_sour").toggle(
		function(){
			$("#ad_content").html("");
			//获取到要显示的数据
			$.each(assistDec_sourseAttri, function(s,item) {
				var checkbox = "<input id='ad_b_sour"+s+"' type='checkbox'/>"+item.name+"<br/>";
				$("#ad_content").append(checkbox);
				$("#ad_b_sour"+s).on("click",function(){
					var ad_ischecked = $(this).attr("checked");
					if(ad_ischecked == "checked"){
						sdbQuery(item);
					}
					else
					{
						//如果当前数据未被选中，清除地图上的查询结果
						var currfeatures = vectorLayer.features;
						var delFeatures = [];
						for (var k=0; k<currfeatures.length; k++) {
							var fId = currfeatures[k].id;
							if(fId.slice(0,fId.indexOf("_")) == item.featureId){
								delFeatures.push(currfeatures[k]);
							}
						}
						vectorLayer.removeFeatures(delFeatures);

						var tet = vectorLayer.features;
					}
				});
			});
			$("#ad_content").show(500);
		},
		function(){
			$("#ad_content").hide(500);
		}
	);
	$("#MNEvent").on("click",function(){

	})
	$("#ZSEvent").on("click",function(){

	})

	//$("#ad_b_anaRes").toggle(
	//	function(){
	//		$("#ad_content").html("");
	//		//获取到要显示的数据
	//		$.each(eval_sourseAttri, function(s,item) {
	//			var checkbox = "<input id='ad_b_anaRes"+s+"' type='checkbox'/>"+item.name+"<br/>";
	//			$("#ad_content").append(checkbox);
	//			$("#ad_b_anaRes"+s).on("click",function(){
	//				var ad_ischecked = $(this).attr("checked");
	//				if(ad_ischecked == "checked"){
	//					//alert(item.name);
	//					if(item.name=="地震范围"){
	//						//alert(1)
	//						//var xx = $cookieStore.get("pevalarrresult");
	//						//alert(xx.length);
	//					}else if(item.name=="人口损失"){
	//						PeopleResultLayer.setVisibility(true);
	//					}else if(item.name=="生命线损失"){
	//						LifeLineResultLayer.setVisibility(true);
	//					}else if(item.name=="房屋损失"){
	//						HouseResultLayer.setVisibility(true);
	//					}
    //
	//				}
	//			});
	//		});
	//		$("#ad_content").show(500);
	//	},
	//	function(){
	//		$("#ad_content").hide(500);
	//	}
	//);

	//查询结果
	function sdbQuery(item){
		//如果当前数据被选中，查询结果并且在地图上进行叠加
		loadingWinInit(true);
		querySpaceService.comSqlService(item.dataset,"",function resultFunction(queryEventArgs){
			loadingWinInit(false);
			if(queryEventArgs.result == null || queryEventArgs == undefined){
				return;
			}
			vectorLayer.removeFeatures(features);
			var features = queryEventArgs.result.features;
			//给feature设置样式
			for (var i=0; i<features.length; i++) {
				features[i].style = {
					pointRadius: 4,
					graphic:true,
					externalGraphic:item.picUrl,
					graphicWidth:32,
					graphicHeight:32
				};
				//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
				features[i].id = item.featureId+"_"+features[i].attributes.SMID;
			}
			vectorLayer.addFeatures(features);
		});
	}

	//控制系统图标\名称
	$scope.sysNameIcon=function(){
		//从配置文件解析参数todo

		//加载系统名称\图标
		var sysn='兰州市地震应急指挥技术系统';
		var sysi='jfinal-easyui/../static/images/logo.png' ;
		var sysni="<div id='btn_sysname'><img id='btn_sysicon' src='"+sysi+"'/>&nbsp;"+sysn+"<span id='sys_childname'></span></div>";
		$('#sys_name_icon_id').append(sysni);
	}
	$scope.addElementCDiv=function(obj,idvalue,dis) {
		var parent = document.getElementById(obj);

		//添加 div
		var div = document.createElement("div");
		if(dis != ''){
			div.setAttribute('style',"display: "+ dis +";");
		}

		//设置 div 属性，如 id
		div.setAttribute("id", idvalue);
		parent.appendChild(div);
	}
	//动态加载模块
	$scope.addElementDiv=function(obj,idvalue,name,src,title,dis,style,classTitle){
		var parent = document.getElementById(obj);

		//添加 div
//		var img = document.createElement("img");
		//设置 div 属性，如 id
//		img.setAttribute("id", idvalue);
//		img.setAttribute('name',name);
//		img.setAttribute('src',src);
//		img.setAttribute('display',dis);
//		img.setAttribute('title',title);
//		img.setAttribute('style',style);
//		parent.appendChild(img);

		var div = document.createElement("label");
		div.setAttribute("id",idvalue);
		if(dis != ''){
			div.setAttribute('style',"display: "+ dis +";");
		}
		div.setAttribute('class',classTitle);
		div.innerHTML=title;
		parent.appendChild(div);

	}
//系统模块\功能初始化,默认需要系统模块全部显示,第一个模块的功能全部显示
	$scope.sysMobuleInit=function(){
		var pid,moduleid,src,title,dis='',name, style;
		//从系统模块配置解析模块及模块配置参数,Todo

		//加载模块
		style='width:60px;height:60px';//图标布局大小
		moduleid='RESBagID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='资源整合';
		dis='none';
		pid='sys_modules_id';
		name='on';//模块名
		$scope.addElementDiv(pid,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='earthQuakeOmenID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='地震前兆';
		dis='none';
		pid='sys_modules_id';
		$scope.addElementDiv(pid,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='eventNowReportingID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='震情速报';
		dis='none';
		pid='sys_modules_id';
		$scope.addElementDiv(pid,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='evalAnalysisID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='评估分析';
		dis='none';
		pid='sys_modules_id';
		$scope.addElementDiv(pid,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='AUXDecisionID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='辅助决策';
		dis='none';
		pid='sys_modules_id';
		$scope.addElementDiv(pid,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='SYSManageID';//模块id
		src='jfinal-easyui/../static/images/a.jpg';//模块图标
		title='运维管理';//模块标题
		dis='none';//模块是否显示,none不显示,block显示
		pid='sys_modules_id';//父容器名称
		$scope.addElementDiv(pid,moduleid,name,src,title,dis,style,"sys_module_parent");

		//------------------------资源整合子系统模块加载---------------------------------
		var cdiv='RESDOID';
		dis='inline';
		pid='sys_modules_id';
		$scope.addElementCDiv(pid,cdiv,dis);

		moduleid='RES_dataBagID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='数据仓库';
		dis='';
		pid=cdiv;
		style='width:60px;height:60px';
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='RES_bookBagID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='书签';
		dis='';
		pid=cdiv;
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='RES_StaticsID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='统计分析';
		dis='';
		pid=cdiv;
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='RES_themeDataID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='专题图';
		dis='';
		pid=cdiv;
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='RES_historyEventID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='历史地震';
		dis='';
		pid=cdiv;
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

		//------------------------地震前兆子系统模块加载---------------------------------
		cdiv='OMENDOID';
		dis='none';
		pid='sys_modules_id';
		$scope.addElementCDiv(pid,cdiv,dis);

		moduleid='omen_eventID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='宏观异常速报';
		dis='';
		pid=cdiv;
		style='width:60px;height:60px';
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

//	moduleid='omen_analysisID';
//	src='jfinal-easyui/../static/images/a.jpg';
//	title='集中分析';
//	dis='block';
//	pid='sys_modules_do_id';
//	style='width:60px;height:20px';
//	$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style);

		//------------------------评估分析子系统模块加载---------------------------------
		cdiv='EVAANAID';
		dis='none';
		pid='sys_modules_id';
		$scope.addElementCDiv(pid,cdiv,dis);

		moduleid='preEvaAnaID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='预评估';
		dis='';
		pid=cdiv;
		style='width:60px;height:60px';
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='repeatEvaAnaID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='评估修正';
		dis='';
		pid=cdiv;
		style='width:60px;height:60px';
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='evaAnaReportID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='评估报告';
		dis='';
		pid=cdiv;
		style='width:60px;height:60px';
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

		//------------------------震情速报子系统模块加载---------------------------------
		cdiv='ZQSBID';
		dis='none';
		pid='sys_modules_id';
		$scope.addElementCDiv(pid,cdiv,dis);

		moduleid='ZHZQID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='震后灾情';
		dis='';
		pid=cdiv;
		style='width:60px;height:60px';
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='JJSJID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='紧急事件';
		dis='';
		pid=cdiv;
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='AZDXXID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='安置点信息';
		dis='';
		pid=cdiv;
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='ZQGLID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='震情管理';
		dis='';
		pid=cdiv;
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

		//------------------------辅助决策子系统模块加载---------------------------------
		cdiv='FZJCID';
		dis='none';
		pid="sys_modules_id";
		$scope.addElementCDiv(pid,cdiv,dis);

		moduleid='ZQFBID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='灾情分布';
		dis='';
		pid=cdiv;
		style='width:60px;height:60px';
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='JJCZID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='紧急处置';
		dis='';
		pid=cdiv;
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='SZQZAZID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='受灾群众安置';
		dis='';
		pid=cdiv;
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='JYDWDWID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='救援队伍定位';
		dis='';
		pid=cdiv;
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='WZYSID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='物资运输';
		dis='';
		pid=cdiv;
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

		moduleid='YJYAID';
		src='jfinal-easyui/../static/images/a.jpg';
		title='应急预案';
		dis='';
		pid=cdiv;
		$scope.addElementDiv(cdiv,moduleid,name,src,title,dis,style,"sys_module_parent");

	}
//系统模块\功能加载控制,完成系统模块功能导航操作
	$scope.sysMobuleLoad=function(){
		$("#RESBagID").css("background-color","#0099CC");
		$("#RES_dataBagID").css("background-color","#0099CC");
		vectorLayer.setVisibility(true);
		clusterLayer.setVisibility(false);
		document.getElementById('RESDOID').style.display='none';
		document.getElementById('OMENDOID').style.display='none';
		document.getElementById('EVAANAID').style.display='none';
		document.getElementById('FZJCID').style.display='none';
		document.getElementById('ZQSBID').style.display='none';



		//------------------逻辑控制：资源整合子系统---------------------------------
		var RESB='RESBagID';
		if($scope.appname=='res'){
			
			//添加子系统名称
			$("#sys_childname").html("——资源整合子系统");
			
			clearPages();

			$("#RESDOID").css("display","inline");//资源整合
			$("#OMENDOID").css("display","none");//地震前兆
			$("#EVAANAID").css("display","none");//评估分析
			$("#ZQSBID").css("display","none");//震情速报
			$("#FZJCID").css("display","none");//辅助决策
			//修改背景色
//		$("#RESBagID").css("background-color","#0099CC");//资源整合按钮
			$("#RES_dataBagID").css("background-color","#0099CC");//数据仓库按钮
//		$("#earthQuakeOmenID").css("background-color","#0052A3");//地震前兆按钮
//		$("#eventNowReportingID").css("background-color","#0052A3");//震情速报
//		$("#evalAnalysisID").css("background-color","#0052A3");//评估分析
//		$("#AUXDecisionID").css("background-color","#0052A3");//辅助决策
			//显示数据仓库模块
			$("#dataWareHouse").css("display","block");
			$("#earthquakeDisaster").css("display","none");//震后灾情
			$("#bookMarkDiv").css("display","none");//书签
			$("#analysisStatic").css("display","none");//统计分析
			$("#themeMap").css("display","none");//专题图
			$("#historiEarthquake").css("display","none");//历史地震
			$("#earthquakePrecursor").css("display","none");//地震前兆
			$("#emergency").css("display","none");//紧急事件
			$("#placeInformation").css("display","none");//安置点信息
			$("#seismicRegime").css("display","none");//震情管理
			$("#preEvaluation").css("display","none");//预评估
			$("#asseCorrection").css("display","none");//评估修正
			$("#asseReport").css("display","none");//评估报告
			$("#disasterDistribute").css("display","none");//灾情分布
			$("#emergencyDisposal").css("display","none");//紧急处置
			$("#peoplePlace").css("display","none");//受灾群众安置
			$("#transportGoods").css("display","none");//物资运输
			$("#contingencyPlan").css("display","none");//应急预案

			vectorLayer.setVisibility(true);
			clusterLayer.setVisibility(false);

		}


		//------------------地震前兆---------------------------------
		var earthQ='earthQuakeOmenID';
		if($scope.appname=='ome'){
			
			//添加子系统名称
			$("#sys_childname").html("——地震前兆子系统");
			
			clearPages();
			preAll();

			$("#RESDOID").css("display","none");//资源整合
			$("#OMENDOID").css("display","inline");//地震前兆
			$("#EVAANAID").css("display","none");//评估分析
			$("#ZQSBID").css("display","none");//震情速报
			$("#FZJCID").css("display","none");//辅助决策

			$("#omen_eventID").css("display","none");
			//修改背景色
//		$("#RESBagID").css("background-color","#0052A3");//资源整合按钮
			$("#omen_eventID").css("background-color","#0099CC");//宏观异常速报
//		$("#earthQuakeOmenID").css("background-color","#0099CC");//地震前兆
//		$("#eventNowReportingID").css("background-color","#0052A3");//震情速报
//		$("#evalAnalysisID").css("background-color","#0052A3");//统计分析
//		$("#AUXDecisionID").css("background-color","#0052A3");//辅助决策
			//显示宏观异常速报模块
			$("#earthquakeDisaster").css("display","none");//震后灾情
			$("#dataWareHouse").css("display","none");
			$("#bookMarkDiv").css("display","none");//书签
			$("#analysisStatic").css("display","none");//统计分析
			$("#themeMap").css("display","none");//专题图
			$("#historiEarthquake").css("display","none");//历史地震
			$("#earthquakePrecursor").css("display","block");//地震前兆
			$("#emergency").css("display","none");//紧急事件
			$("#placeInformation").css("display","none");//安置点信息
			$("#seismicRegime").css("display","none");//震情管理
			$("#preEvaluation").css("display","none");//预评估
			$("#asseCorrection").css("display","none");//评估修正
			$("#asseReport").css("display","none");//评估报告
			$("#disasterDistribute").css("display","none");//灾情分布
			$("#emergencyDisposal").css("display","none");//紧急处置
			$("#peoplePlace").css("display","none");//受灾群众安置
			$("#transportGoods").css("display","none");//物资运输
			$("#contingencyPlan").css("display","none");//应急预案
		}
		//------------------评估分析--------------------------------
		var evalA='evalAnalysisID';
		if($scope.appname=='eul'){
			
			//添加子系统名称
			$("#sys_childname").html("——评估分析子系统");
			
			clearPages();
			$("#RESDOID").css("display","none");//资源整合
			$("#OMENDOID").css("display","none");//地震前兆
			$("#EVAANAID").css("display","inline");//评估分析
			$("#ZQSBID").css("display","none");//震情速报
			$("#FZJCID").css("display","none");//辅助决策
			//修改背景色
//		$("#RESBagID").css("background-color","#0052A3");//资源整合按钮
//		$("#ZQFBID").css("background-color","#0052A3");//灾情分布
//		$("#eventNowReportingID").css("background-color","#0099CC");//灾情分布
//		$("#earthQuakeOmenID").css("background-color","#0052A3");//地震前兆
//		$("#eventNowReportingID").css("background-color","#0052A3");//震情速报
//		$("#evalAnalysisID").css("background-color","#0052A3");//统计分析
//		$("#AUXDecisionID").css("background-color","#0099CC");//辅助决策
			$("#preEvaAnaID").css("background-color","#0099CC");

			//显示启动评估模块
			$("#disasterDistribute").css("display","none");//灾情分布
			$("#earthquakeDisaster").css("display","none");//震后灾情
			$("#dataWareHouse").css("display","none");
			$("#bookMarkDiv").css("display","none");//书签
			$("#analysisStatic").css("display","none");//统计分析
			$("#themeMap").css("display","none");//专题图
			$("#historiEarthquake").css("display","none");//历史地震
			$("#earthquakePrecursor").css("display","none");//地震前兆
			$("#emergency").css("display","none");//紧急事件
			$("#placeInformation").css("display","none");//安置点信息
			$("#seismicRegime").css("display","none");//震情管理
			$("#preEvaluation").css("display","block");//预评估
			$("#asseCorrection").css("display","none");//评估修正
			$("#asseReport").css("display","none");//评估报告
			$("#emergencyDisposal").css("display","none");//紧急处置
			$("#peoplePlace").css("display","none");//受灾群众安置
			$("#transportGoods").css("display","none");//物资运输
			$("#contingencyPlan").css("display","none");//应急预案

			vectorLayer.setVisibility(true);
			clusterLayer.setVisibility(false);
		}

		//------------------震情速报--------------------------------
		var eventN='eventNowReportingID';
		if($scope.appname=='eve'){
			
			//添加子系统名称
			$("#sys_childname").html("——震情速报子系统");
			
			clearPages();

			$("#RESDOID").css("display","none");//资源整合
			$("#OMENDOID").css("display","none");//地震前兆
			$("#EVAANAID").css("display","none");//评估分析
			$("#ZQSBID").css("display","inline");//震情速报
			$("#FZJCID").css("display","none");//辅助决策
			//修改背景色
//		$("#RESBagID").css("background-color","#0052A3");//资源整合按钮
			$("#ZHZQID").css("background-color","#0099CC");//震后灾情
//		$("#earthQuakeOmenID").css("background-color","#0052A3");//地震前兆
//		$("#eventNowReportingID").css("background-color","#0099CC");//震情速报
//		$("#evalAnalysisID").css("background-color","#0052A3");//统计分析
//		$("#AUXDecisionID").css("background-color","#0052A3");//辅助决策

			//震情速报子系统中各模块按钮的背景色切换

			//显示震后灾情模块
			$("#earthquakeDisaster").css("display","block");//震后灾情
			$("#dataWareHouse").css("display","none");
			$("#bookMarkDiv").css("display","none");//书签
			$("#analysisStatic").css("display","none");//统计分析
			$("#themeMap").css("display","none");//专题图
			$("#historiEarthquake").css("display","none");//历史地震
			$("#earthquakePrecursor").css("display","none");//地震前兆
			$("#emergency").css("display","none");//紧急事件
			$("#placeInformation").css("display","none");//安置点信息
			$("#seismicRegime").css("display","none");//震情管理
			$("#preEvaluation").css("display","none");//预评估
			$("#asseCorrection").css("display","none");//评估修正
			$("#asseReport").css("display","none");//评估报告
			$("#disasterDistribute").css("display","none");//灾情分布
			$("#emergencyDisposal").css("display","none");//紧急处置
			$("#peoplePlace").css("display","none");//受灾群众安置
			$("#transportGoods").css("display","none");//物资运输
			$("#contingencyPlan").css("display","none");//应急预案

			vectorLayer.setVisibility(true);
			clusterLayer.setVisibility(false);
		}


		//------------------评估分析--------------------------------
//		var evalA='evalAnalysisID';
//		if($scope.appname=='eul'){
//			clearPages();
//			$("#RESDOID").css("display","none");//资源整合
//			$("#OMENDOID").css("display","none");//地震前兆
//			$("#EVAANAID").css("display","inline");//评估分析
//			$("#ZQSBID").css("display","none");//震情速报
//			$("#FZJCID").css("display","none");//辅助决策
//			//修改背景色
//			$("#RESBagID").css("background-color","#0052A3");//资源整合按钮
//			$("#ZQFBID").css("background-color","#0099CC");//灾情分布
//			$("#earthQuakeOmenID").css("background-color","#0052A3");//地震前兆
//			$("#eventNowReportingID").css("background-color","#0052A3");//震情速报
//			$("#evalAnalysisID").css("background-color","#0052A3");//统计分析
//			$("#AUXDecisionID").css("background-color","#0099CC");//辅助决策
//
//			//显示灾情分布模块
//			$("#disasterDistribute").css("display","block");//灾情分布
//			$("#earthquakeDisaster").css("display","none");//震后灾情
//			$("#dataWareHouse").css("display","none");
//			$("#bookMarkDiv").css("display","none");//书签
//			$("#analysisStatic").css("display","none");//统计分析
//			$("#themeMap").css("display","none");//专题图
//			$("#historiEarthquake").css("display","none");//历史地震
//			$("#earthquakePrecursor").css("display","none");//地震前兆
//			$("#emergency").css("display","none");//紧急事件
//			$("#placeInformation").css("display","none");//安置点信息
//			$("#seismicRegime").css("display","none");//震情管理
//			$("#emergencyDisposal").css("display","none");//紧急处置
//			$("#peoplePlace").css("display","none");//受灾群众安置
//			$("#transportGoods").css("display","none");//物资运输
//			$("#contingencyPlan").css("display","none");//应急预案
//
//			vectorLayer.setVisibility(true);
//			clusterLayer.setVisibility(false);
//		}

		//------------------辅助决策--------------------------------
		var auxD='AUXDecisionID';
		if($scope.appname=='aux'){
			//ocx控件登陆
//			Init("10.246.0.3","5060","10.246.0.3","Sroot","HY215gis");
			//添加子系统名称
			$("#sys_childname").html("——辅助决策子系统");
			
			clearPages();
			$("#assistDecDiv").css("display","block");
			$(".ad_button_class").css("display","inline");
			
			queryCallhelpReport();

			$("#RESDOID").css("display","none");//资源整合
			$("#OMENDOID").css("display","none");//地震前兆
			$("#EVAANAID").css("display","none");//评估分析
			$("#ZQSBID").css("display","none");//震情速报
			$("#FZJCID").css("display","inline");//辅助决策
			//修改背景色
//			$("#RESBagID").css("background-color","#0052A3");//资源整合按钮
			$("#ZQFBID").css("background-color","#0099CC");//灾情分布
//			$("#earthQuakeOmenID").css("background-color","#0052A3");//地震前兆
//			$("#eventNowReportingID").css("background-color","#0052A3");//震情速报
//			$("#evalAnalysisID").css("background-color","#0052A3");//统计分析
//			$("#AUXDecisionID").css("background-color","#0099CC");//辅助决策

			//显示灾情分布模块
			$("#disasterDistribute").css("display","block");//灾情分布
			$("#earthquakeDisaster").css("display","none");//震后灾情
			$("#dataWareHouse").css("display","none");
			$("#bookMarkDiv").css("display","none");//书签
			$("#analysisStatic").css("display","none");//统计分析
			$("#themeMap").css("display","none");//专题图
			$("#historiEarthquake").css("display","none");//历史地震
			$("#earthquakePrecursor").css("display","none");//地震前兆
			$("#emergency").css("display","none");//紧急事件
			$("#placeInformation").css("display","none");//安置点信息
			$("#seismicRegime").css("display","none");//震情管理
			$("#preEvaluation").css("display","none");//预评估
			$("#asseCorrection").css("display","none");//评估修正
			$("#asseReport").css("display","none");//评估报告
			$("#emergencyDisposal").css("display","none");//紧急处置
			$("#peoplePlace").css("display","none");//受灾群众安置
			$("#transportGoods").css("display","none");//物资运输
			$("#contingencyPlan").css("display","none");//应急预案

			vectorLayer.setVisibility(true);
			clusterLayer.setVisibility(false);
		}
		if($scope.appname=='set'){
			clearPages();
			$("#RESDOID").css("display","none");//资源整合
			$("#OMENDOID").css("display","none");//地震前兆
			$("#EVAANAID").css("display","none");//评估分析
			$("#ZQSBID").css("display","none");//震情速报
			$("#FZJCID").css("display","none");//辅助决策

			$("#p_tab").css("display","block");
			$("#index_tabs").css("display","block");
			$("#dataWareHouse").css("display","none");


		}



		//数据仓库
		var RESDB='RES_dataBagID';
		var moduleset=$scope.childapp;
		var dd = document.getElementById(RESDB);
		if((moduleset.split('-'))[0]=='resdatabag') {
			document.getElementById(RESDB).style.display='';
			document.getElementById(RESDB).onclick=function(){
				clearPages();
				//设置vertorLayer图层显示，clusterLayer图层隐藏
				vectorLayer.setVisibility(true);
				clusterLayer.setVisibility(false);


				//显示数据仓库模块，并且隐藏其他模块
				$("#dataWareHouse").css("display","block");
				$("#bookMarkDiv").css("display","none");//书签
				$("#analysisStatic").css("display","none");//统计分析
				$("#themeMap").css("display","none");//专题图
				$("#historiEarthquake").css("display","none");//历史地震
				$("#earthquakePrecursor").css("display","none");//地震前兆
				$("#earthquakeDisaster").css("display","none");//震后灾情
				$("#emergency").css("display","none");//紧急事件
				$("#placeInformation").css("display","none");//安置点信息
				$("#seismicRegime").css("display","none");//震情管理
				$("#preEvaluation").css("display","none");//预评估
				$("#asseCorrection").css("display","none");//评估修正
				$("#asseReport").css("display","none");//评估报告
				$("#disasterDistribute").css("display","none");//灾情分布
				$("#emergencyDisposal").css("display","none");//紧急处置
				$("#peoplePlace").css("display","none");//受灾群众安置
				$("#transportGoods").css("display","none");//物资运输
				$("#contingencyPlan").css("display","none");//应急预案

				//修改图标的背景颜色
				$("#RES_dataBagID").css("background-color","#0099CC");
				$("#RES_bookBagID").css("background-color","#0052A3");//书签
				$("#RES_StaticsID").css("background-color","#0052A3");//统计分析
				$("#RES_themeDataID").css("background-color","#0052A3");//专题图
				$("#RES_historyEventID").css("background-color","#0052A3");//历史地震
			}
		}else{
			document.getElementById(RESDB).style.display='none';
		}

		//书签
		var RESBB='RES_bookBagID';
		if((moduleset.split('-'))[1]=='resbookmark') {
			document.getElementById(RESBB).style.display='';
			document.getElementById(RESBB).onclick=function(){
				clearPages();
				$("#bm_contentDiv input").removeAttr("checked");
				//设置vertorLayer图层显示，clusterLayer图层隐藏
				vectorLayer.setVisibility(true);
				clusterLayer.setVisibility(false);

				//显示数据仓库模块，并且隐藏其他模块
				$("#dataWareHouse").css("display","none");
				$("#bookMarkDiv").css("display","block");//书签
				$("#analysisStatic").css("display","none");//统计分析
				$("#themeMap").css("display","none");//专题图
				$("#historiEarthquake").css("display","none");//历史地震
				$("#earthquakePrecursor").css("display","none");//地震前兆
				$("#earthquakeDisaster").css("display","none");//震后灾情
				$("#emergency").css("display","none");//紧急事件
				$("#placeInformation").css("display","none");//安置点信息
				$("#seismicRegime").css("display","none");//震情管理
				$("#preEvaluation").css("display","none");//预评估
				$("#asseCorrection").css("display","none");//评估修正
				$("#asseReport").css("display","none");//评估报告
				$("#disasterDistribute").css("display","none");//灾情分布
				$("#emergencyDisposal").css("display","none");//紧急处置
				$("#peoplePlace").css("display","none");//受灾群众安置
				$("#transportGoods").css("display","none");//物资运输
				$("#contingencyPlan").css("display","none");//应急预案

				//修改图标的背景颜色
				$("#RES_dataBagID").css("background-color","#0052A3");
				$("#RES_bookBagID").css("background-color","#0099CC");//书签
				$("#RES_StaticsID").css("background-color","#0052A3");//统计分析
				$("#RES_themeDataID").css("background-color","#0052A3");//专题图
				$("#RES_historyEventID").css("background-color","#0052A3");//历史地震
			}
		}else{
			document.getElementById(RESBB).style.display='none';
		}

		//统计分析
		var RESS='RES_StaticsID';
		if((moduleset.split('-'))[2]=='resstatics') {
			document.getElementById(RESS).style.display='';
			document.getElementById(RESS).onclick=function(){
				//设置vertorLayer图层显示，clusterLayer图层隐藏
				vectorLayer.setVisibility(true);
				clusterLayer.setVisibility(false);
				clearPages();
				//判断如果当前存在单选按钮，将单选按钮重置
				$("#as_objAnaCon input").removeAttr("checked");

				$("#dataWareHouse").css("display","none");
				$("#bookMarkDiv").css("display","none");//书签
				$("#analysisStatic").css("display","block");//统计分析
				$("#themeMap").css("display","none");//专题图
				$("#historiEarthquake").css("display","none");//历史地震
				$("#earthquakePrecursor").css("display","none");//地震前兆
				$("#earthquakeDisaster").css("display","none");//震后灾情
				$("#emergency").css("display","none");//紧急事件
				$("#placeInformation").css("display","none");//安置点信息
				$("#seismicRegime").css("display","none");//震情管理
				$("#preEvaluation").css("display","none");//预评估
				$("#asseCorrection").css("display","none");//评估修正
				$("#asseReport").css("display","none");//评估报告
				$("#disasterDistribute").css("display","none");//灾情分布
				$("#emergencyDisposal").css("display","none");//紧急处置
				$("#peoplePlace").css("display","none");//受灾群众安置
				$("#transportGoods").css("display","none");//物资运输
				$("#contingencyPlan").css("display","none");//应急预案

				//修改图标的背景颜色
				$("#RES_dataBagID").css("background-color","#0052A3");
				$("#RES_bookBagID").css("background-color","#0052A3");//书签
				$("#RES_StaticsID").css("background-color","#0099CC");//统计分析
				$("#RES_themeDataID").css("background-color","#0052A3");//专题图
				$("#RES_historyEventID").css("background-color","#0052A3");//历史地震
			}
		}else{
			document.getElementById(RESS).style.display='none';
		}

		//专题图
		var RESTD='RES_themeDataID';
		if((moduleset.split('-'))[3]=='restheme') {
			document.getElementById(RESTD).style.display='';
			document.getElementById(RESTD).onclick=function(){
				//设置vertorLayer图层显示，clusterLayer图层隐藏
				vectorLayer.setVisibility(true);
				clusterLayer.setVisibility(false);
				clearPages();

				//显示数据仓库模块，并且隐藏其他模块
				$("#dataWareHouse").css("display","none");
				$("#bookMarkDiv").css("display","none");//书签
				$("#analysisStatic").css("display","none");//统计分析
				$("#themeMap").css("display","block");//专题图
				$("#historiEarthquake").css("display","none");//历史地震
				$("#earthquakePrecursor").css("display","none");//地震前兆
				$("#earthquakeDisaster").css("display","none");//震后灾情
				$("#emergency").css("display","none");//紧急事件
				$("#placeInformation").css("display","none");//安置点信息
				$("#seismicRegime").css("display","none");//震情管理
				$("#preEvaluation").css("display","none");//预评估
				$("#asseCorrection").css("display","none");//评估修正
				$("#asseReport").css("display","none");//评估报告
				$("#disasterDistribute").css("display","none");//灾情分布
				$("#emergencyDisposal").css("display","none");//紧急处置
				$("#peoplePlace").css("display","none");//受灾群众安置
				$("#transportGoods").css("display","none");//物资运输
				$("#contingencyPlan").css("display","none");//应急预案

				//修改图标的背景颜色
				$("#RES_dataBagID").css("background-color","#0052A3");
				$("#RES_bookBagID").css("background-color","#0052A3");//书签
				$("#RES_StaticsID").css("background-color","#0052A3");//统计分析
				$("#RES_themeDataID").css("background-color","#0099CC");//专题图
				$("#RES_historyEventID").css("background-color","#0052A3");//历史地震
			}
		}else{
			document.getElementById(RESTD).style.display='none';
		}
		//历史地震
		var RESHE='RES_historyEventID';
		if((moduleset.split('-'))[4]=='reshistory') {
			document.getElementById(RESHE).style.display='';
			document.getElementById(RESHE).onclick=function(){
				//设置clusterLayer图层显示，vertorLayer图层隐藏
				vectorLayer.setVisibility(false);
				clusterLayer.setVisibility(true);
				clearPages();
				initHistorEar();

				//显示数据仓库模块，并且隐藏其他模块
				$("#dataWareHouse").css("display","none");
				$("#bookMarkDiv").css("display","none");//书签
				$("#analysisStatic").css("display","none");//统计分析
				$("#themeMap").css("display","none");//专题图
				$("#historiEarthquake").css("display","block");//历史地震
				$("#earthquakePrecursor").css("display","none");//地震前兆
				$("#earthquakeDisaster").css("display","none");//震后灾情
				$("#emergency").css("display","none");//紧急事件
				$("#placeInformation").css("display","none");//安置点信息
				$("#seismicRegime").css("display","none");//震情管理
				$("#preEvaluation").css("display","none");//预评估
				$("#asseCorrection").css("display","none");//评估修正
				$("#asseReport").css("display","none");//评估报告
				$("#disasterDistribute").css("display","none");//灾情分布
				$("#emergencyDisposal").css("display","none");//紧急处置
				$("#peoplePlace").css("display","none");//受灾群众安置
				$("#transportGoods").css("display","none");//物资运输
				$("#contingencyPlan").css("display","none");//应急预案

				//修改图标的背景颜色
				$("#RES_dataBagID").css("background-color","#0052A3");
				$("#RES_bookBagID").css("background-color","#0052A3");//书签
				$("#RES_StaticsID").css("background-color","#0052A3");//统计分析
				$("#RES_themeDataID").css("background-color","#0052A3");//专题图
				$("#RES_historyEventID").css("background-color","#0099CC");//历史地震
			}
		}else{
			document.getElementById(RESHE).style.display='none';
		}

		//地震前兆
		var RESOME='OMENDOID';

		if((moduleset.split('-'))[0]=='resreport') {
			document.getElementById(RESOME).style.display='';
			document.getElementById(RESOME).onclick=function(){
				clearPages();
				preAll();

				//显示数据仓库模块，并且隐藏其他模块
				$("#dataWareHouse").css("display","none");
				$("#bookMarkDiv").css("display","none");//书签
				$("#analysisStatic").css("display","none");//统计分析
				$("#themeMap").css("display","none");//专题图
				$("#historiEarthquake").css("display","none");//历史地震
				$("#earthquakePrecursor").css("display","block");//地震前兆
				$("#earthquakeDisaster").css("display","none");//震后灾情
				$("#emergency").css("display","none");//紧急事件
				$("#placeInformation").css("display","none");//安置点信息
				$("#seismicRegime").css("display","none");//震情管理
				$("#preEvaluation").css("display","none");//预评估
				$("#asseCorrection").css("display","none");//评估修正
				$("#asseReport").css("display","none");//评估报告
				$("#disasterDistribute").css("display","none");//灾情分布
				$("#emergencyDisposal").css("display","none");//紧急处置
				$("#peoplePlace").css("display","none");//受灾群众安置
				$("#transportGoods").css("display","none");//物资运输
				$("#contingencyPlan").css("display","none");//应急预案

				$("#OMENDOID").css("background-color","#0099CC");//历史地震
			}
		}else{
			document.getElementById(RESOME).style.display='none';
		}

		//震后灾情
		var RESZHZ='ZHZQID';
		if((moduleset.split('-'))[0]=='eveearthquack') {
			document.getElementById(RESZHZ).style.display='';
			document.getElementById(RESZHZ).onclick=function(){
				clearPages();
				$("#dataWareHouse").css("display","none");
				$("#bookMarkDiv").css("display","none");//书签
				$("#analysisStatic").css("display","none");//统计分析
				$("#themeMap").css("display","none");//专题图
				$("#historiEarthquake").css("display","none");//历史地震
				$("#earthquakePrecursor").css("display","none");//地震前兆
				$("#earthquakeDisaster").css("display","block");//震后灾情
				$("#emergency").css("display","none");//紧急事件
				$("#placeInformation").css("display","none");//安置点信息
				$("#seismicRegime").css("display","none");//震情管理
				$("#preEvaluation").css("display","none");//预评估
				$("#asseCorrection").css("display","none");//评估修正
				$("#asseReport").css("display","none");//评估报告
				$("#disasterDistribute").css("display","none");//灾情分布
				$("#emergencyDisposal").css("display","none");//紧急处置
				$("#peoplePlace").css("display","none");//受灾群众安置
				$("#transportGoods").css("display","none");//物资运输
				$("#contingencyPlan").css("display","none");//应急预案

				//修改图标的背景颜色
				$("#ZHZQID").css("background-color","#0099CC");
				$("#JJSJID").css("background-color","#0052A3");
				$("#AZDXXID").css("background-color","#0052A3");
				$("#ZQGLID").css("background-color","#0052A3");
			}
		}else{
			document.getElementById(RESZHZ).style.display='none';
		}

		//紧急事件
		var RESJJS='JJSJID';
		if((moduleset.split('-'))[1]=='eveemerge') {
			document.getElementById(RESJJS).style.display='';
			document.getElementById(RESJJS).onclick=function(){
				clearPages();

				$("#dataWareHouse").css("display","none");
				$("#bookMarkDiv").css("display","none");//书签
				$("#analysisStatic").css("display","none");//统计分析
				$("#themeMap").css("display","none");//专题图
				$("#historiEarthquake").css("display","none");//历史地震
				$("#earthquakePrecursor").css("display","none");//地震前兆
				$("#earthquakeDisaster").css("display","none");//震后灾情
				$("#emergency").css("display","block");//紧急事件
				$("#placeInformation").css("display","none");//安置点信息
				$("#seismicRegime").css("display","none");//震情管理
				$("#preEvaluation").css("display","none");//预评估
				$("#asseCorrection").css("display","none");//评估修正
				$("#asseReport").css("display","none");//评估报告
				$("#disasterDistribute").css("display","none");//灾情分布
				$("#emergencyDisposal").css("display","none");//紧急处置
				$("#peoplePlace").css("display","none");//受灾群众安置
				$("#transportGoods").css("display","none");//物资运输
				$("#contingencyPlan").css("display","none");//应急预案

				//修改图标的背景颜色
				$("#ZHZQID").css("background-color","#0052A3");
				$("#JJSJID").css("background-color","#0099CC");
				$("#AZDXXID").css("background-color","#0052A3");
				$("#ZQGLID").css("background-color","#0052A3");
			}
		}else{
			document.getElementById(RESJJS).style.display='none';
		}

		//安置点信息
		var RESDBAZD='AZDXXID';
		if((moduleset.split('-'))[2]=='evesettle') {
			document.getElementById(RESDBAZD).style.display='';
			document.getElementById(RESDBAZD).onclick=function(){
				clearPages();

				$("#dataWareHouse").css("display","none");
				$("#bookMarkDiv").css("display","none");//书签
				$("#analysisStatic").css("display","none");//统计分析
				$("#themeMap").css("display","none");//专题图
				$("#historiEarthquake").css("display","none");//历史地震
				$("#earthquakePrecursor").css("display","none");//地震前兆
				$("#earthquakeDisaster").css("display","none");//震后灾情
				$("#emergency").css("display","none");//紧急事件
				$("#placeInformation").css("display","block");//安置点信息
				$("#seismicRegime").css("display","none");//震情管理
				$("#preEvaluation").css("display","none");//预评估
				$("#asseCorrection").css("display","none");//评估修正
				$("#asseReport").css("display","none");//评估报告
				$("#disasterDistribute").css("display","none");//灾情分布
				$("#emergencyDisposal").css("display","none");//紧急处置
				$("#peoplePlace").css("display","none");//受灾群众安置
				$("#transportGoods").css("display","none");//物资运输
				$("#contingencyPlan").css("display","none");//应急预案

				//修改图标的背景颜色
				$("#ZHZQID").css("background-color","#0052A3");
				$("#JJSJID").css("background-color","#0052A3");
				$("#AZDXXID").css("background-color","#0099CC");
				$("#ZQGLID").css("background-color","#0052A3");
			}
		}else{
			document.getElementById(RESDBAZD).style.display='none';
		}

		//震情管理
		var RESZQG='ZQGLID';
		if((moduleset.split('-'))[3]=='evemanage') {
			document.getElementById(RESZQG).style.display='';
			document.getElementById(RESZQG).onclick=function(){
				clearPages();
				seisRegimeInit();

				$("#dataWareHouse").css("display","none");
				$("#bookMarkDiv").css("display","none");//书签
				$("#analysisStatic").css("display","none");//统计分析
				$("#themeMap").css("display","none");//专题图
				$("#historiEarthquake").css("display","none");//历史地震
				$("#earthquakePrecursor").css("display","none");//地震前兆
				$("#earthquakeDisaster").css("display","none");//震后灾情
				$("#emergency").css("display","none");//紧急事件
				$("#placeInformation").css("display","none");//安置点信息
				$("#seismicRegime").css("display","block");//震情管理
				$("#preEvaluation").css("display","none");//预评估
				$("#asseCorrection").css("display","none");//评估修正
				$("#asseReport").css("display","none");//评估报告
				$("#disasterDistribute").css("display","none");//灾情分布
				$("#emergencyDisposal").css("display","none");//紧急处置
				$("#peoplePlace").css("display","none");//受灾群众安置
				$("#transportGoods").css("display","none");//物资运输
				$("#contingencyPlan").css("display","none");//应急预案

				//修改图标的背景颜色
				$("#ZHZQID").css("background-color","#0052A3");
				$("#JJSJID").css("background-color","#0052A3");
				$("#AZDXXID").css("background-color","#0052A3");
				$("#ZQGLID").css("background-color","#0099CC");
			}
		}else{
			document.getElementById(RESZQG).style.display='none';
		}

		//预评估
		var YPG='preEvaAnaID';
		if((moduleset.split('-'))[0]=='preeul') {
			document.getElementById(YPG).style.display='';
			document.getElementById(YPG).onclick=function(){
				//clearPages();

				$("#dataWareHouse").css("display","none");
				$("#bookMarkDiv").css("display","none");//书签
				$("#analysisStatic").css("display","none");//统计分析
				$("#themeMap").css("display","none");//专题图
				$("#historiEarthquake").css("display","none");//历史地震
				$("#earthquakePrecursor").css("display","none");//地震前兆
				$("#earthquakeDisaster").css("display","none");//震后灾情
				$("#emergency").css("display","none");//紧急事件
				$("#placeInformation").css("display","none");//安置点信息
				$("#seismicRegime").css("display","none");//震情管理
				$("#preEvaluation").css("display","block");//预评估
				$("#asseCorrection").css("display","none");//评估修正
				$("#asseReport").css("display","none");//评估报告
				$("#disasterDistribute").css("display","none");//灾情分布
				$("#emergencyDisposal").css("display","none");//紧急处置
				$("#peoplePlace").css("display","none");//受灾群众安置
				$("#transportGoods").css("display","none");//物资运输
				$("#contingencyPlan").css("display","none");//应急预案

				//修改图标的背景颜色
				$("#preEvaAnaID").css("background-color","#0099CC");
				$("#repeatEvaAnaID").css("background-color","#0052A3");
				$("#evaAnaReportID").css("background-color","#0052A3");
			}
		}else{
			document.getElementById(YPG).style.display='none';
		}

		//评估修正
		var PGXZ='repeatEvaAnaID';
		if((moduleset.split('-'))[1]=='seceul') {
			document.getElementById(PGXZ).style.display='';
			document.getElementById(PGXZ).onclick=function(){

				//clearPages();
				$("#dataWareHouse").css("display","none");
				$("#bookMarkDiv").css("display","none");//书签
				$("#analysisStatic").css("display","none");//统计分析
				$("#themeMap").css("display","none");//专题图
				$("#historiEarthquake").css("display","none");//历史地震
				$("#earthquakePrecursor").css("display","none");//地震前兆
				$("#earthquakeDisaster").css("display","none");//震后灾情
				$("#emergency").css("display","none");//紧急事件
				$("#placeInformation").css("display","none");//安置点信息
				$("#seismicRegime").css("display","none");//震情管理
				$("#preEvaluation").css("display","none");//预评估
				$("#asseCorrection").css("display","block");//评估修正
				$("#asseReport").css("display","none");//评估报告
				$("#disasterDistribute").css("display","none");//灾情分布
				$("#emergencyDisposal").css("display","none");//紧急处置
				$("#peoplePlace").css("display","none");//受灾群众安置
				$("#transportGoods").css("display","none");//物资运输
				$("#contingencyPlan").css("display","none");//应急预案

				//修改图标的背景颜色
				$("#preEvaAnaID").css("background-color","#0052A3");
				$("#repeatEvaAnaID").css("background-color","#0099CC");
				$("#evaAnaReportID").css("background-color","#0052A3");
			}
		}else{
			document.getElementById(PGXZ).style.display='none';
		}

		//评估报告
		var PGBG='evaAnaReportID';
		if((moduleset.split('-'))[2]=='reporteul') {
			document.getElementById(PGBG).style.display='';
			document.getElementById(PGBG).onclick=function(){

				//clearPages();
				//assReportModuleInit();
				$("#dataWareHouse").css("display","none");
				$("#bookMarkDiv").css("display","none");//书签
				$("#analysisStatic").css("display","none");//统计分析
				$("#themeMap").css("display","none");//专题图
				$("#historiEarthquake").css("display","none");//历史地震
				$("#earthquakePrecursor").css("display","none");//地震前兆
				$("#earthquakeDisaster").css("display","none");//震后灾情
				$("#emergency").css("display","none");//紧急事件
				$("#placeInformation").css("display","none");//安置点信息
				$("#seismicRegime").css("display","none");//震情管理
				$("#preEvaluation").css("display","none");//预评估
				$("#asseCorrection").css("display","none");//评估修正
				$("#asseReport").css("display","block");//评估报告
				$("#disasterDistribute").css("display","none");//灾情分布
				$("#emergencyDisposal").css("display","none");//紧急处置
				$("#peoplePlace").css("display","none");//受灾群众安置
				$("#transportGoods").css("display","none");//物资运输
				$("#contingencyPlan").css("display","none");//应急预案

				//修改图标的背景颜色
				$("#preEvaAnaID").css("background-color","#0052A3");
				$("#repeatEvaAnaID").css("background-color","#0052A3");
				$("#evaAnaReportID").css("background-color","#0099CC");
			}
		}else{
			document.getElementById(PGBG).style.display='none';
		}

		//灾情分布
		var RESZQF='ZQFBID';
		if((moduleset.split('-'))[0]=='auxspread') {
			document.getElementById(RESZQF).style.display='';
			document.getElementById(RESZQF).onclick=function(){
				clearPages();
				
				queryCallhelpReport();
				
				var disAccor = $("#disasterDistribute").accordion('getSelected');
				if(disAccor != null){
					$("#disasterDistribute").accordion('getSelected').panel('collapse');//关闭当前展开的面板
				}
				$("#assistDecDiv").css("display","block");
				$(".ad_button_class").css("display","inline");

				$("#dataWareHouse").css("display","none");
				$("#bookMarkDiv").css("display","none");//书签
				$("#analysisStatic").css("display","none");//统计分析
				$("#themeMap").css("display","none");//专题图
				$("#historiEarthquake").css("display","none");//历史地震
				$("#earthquakePrecursor").css("display","none");//地震前兆
				$("#earthquakeDisaster").css("display","none");//震后灾情
				$("#emergency").css("display","none");//紧急事件
				$("#placeInformation").css("display","none");//安置点信息
				$("#seismicRegime").css("display","none");//震情管理
				$("#preEvaluation").css("display","none");//预评估
				$("#asseCorrection").css("display","none");//评估修正
				$("#asseReport").css("display","none");//评估报告
				$("#disasterDistribute").css("display","block");//灾情分布
				$("#emergencyDisposal").css("display","none");//紧急处置
				$("#peoplePlace").css("display","none");//受灾群众安置
				$("#transportGoods").css("display","none");//物资运输
				$("#contingencyPlan").css("display","none");//应急预案

				//修改图标的背景颜色
				$("#ZQFBID").css("background-color","#0099CC");
				$("#JJCZID").css("background-color","#0052A3");
				$("#SZQZAZID").css("background-color","#0052A3");
				$("#JYDWDWID").css("background-color","#0052A3");
				$("#WZYSID").css("background-color","#0052A3");
				$("#YJYAID").css("background-color","#0052A3");
			}
		}else{
			document.getElementById(RESZQF).style.display='none';
		}

		//紧急处置
		var RESCZI='JJCZID';
		if((moduleset.split('-'))[1]=='auxemergedeal') {
			document.getElementById(RESCZI).style.display='';
			document.getElementById(RESCZI).onclick=function(){
				clearPages();
				emergDisModule();
				queryCallhelpReport();
				
				$("#assistDecDiv").css("display","block");

				$("#dataWareHouse").css("display","none");
				$("#bookMarkDiv").css("display","none");//书签
				$("#analysisStatic").css("display","none");//统计分析
				$("#themeMap").css("display","none");//专题图
				$("#historiEarthquake").css("display","none");//历史地震
				$("#earthquakePrecursor").css("display","none");//地震前兆
				$("#earthquakeDisaster").css("display","none");//震后灾情
				$("#emergency").css("display","none");//紧急事件
				$("#placeInformation").css("display","none");//安置点信息
				$("#seismicRegime").css("display","none");//震情管理
				$("#preEvaluation").css("display","none");//预评估
				$("#asseCorrection").css("display","none");//评估修正
				$("#asseReport").css("display","none");//评估报告
				$("#disasterDistribute").css("display","none");//灾情分布
				$("#emergencyDisposal").css("display","block");//紧急处置
				$("#peoplePlace").css("display","none");//受灾群众安置
				$("#transportGoods").css("display","none");//物资运输
				$("#contingencyPlan").css("display","none");//应急预案

				//修改图标的背景颜色
				$("#ZQFBID").css("background-color","#0052A3");
				$("#JJCZID").css("background-color","#0099CC");
				$("#SZQZAZID").css("background-color","#0052A3");
				$("#JYDWDWID").css("background-color","#0052A3");
				$("#WZYSID").css("background-color","#0052A3");
				$("#YJYAID").css("background-color","#0052A3");
			}
		}else{
			document.getElementById(RESCZI).style.display='none';
		}

		//受灾群众安置
		var RESZQZ='SZQZAZID';
		if((moduleset.split('-'))[2]=='auxsettle') {
			document.getElementById(RESZQZ).style.display='';
			document.getElementById(RESZQZ).onclick=function(){
				clearPages();
				peoPlaceModule();
				queryCallhelpReport();
				
				$("#assistDecDiv").css("display","block");
				$(".ad_button_class").css("display","inline");
				$("#people_place_analy").css("display","block");

				$("#dataWareHouse").css("display","none");
				$("#bookMarkDiv").css("display","none");//书签
				$("#analysisStatic").css("display","none");//统计分析
				$("#themeMap").css("display","none");//专题图
				$("#historiEarthquake").css("display","none");//历史地震
				$("#earthquakePrecursor").css("display","none");//地震前兆
				$("#earthquakeDisaster").css("display","none");//震后灾情
				$("#emergency").css("display","none");//紧急事件
				$("#placeInformation").css("display","none");//安置点信息
				$("#seismicRegime").css("display","none");//震情管理
				$("#preEvaluation").css("display","none");//预评估
				$("#asseCorrection").css("display","none");//评估修正
				$("#asseReport").css("display","none");//评估报告
				$("#disasterDistribute").css("display","none");//灾情分布
				$("#emergencyDisposal").css("display","none");//紧急处置
				$("#peoplePlace").css("display","block");//受灾群众安置
				$("#rescueTeamLocation").css("display","none");//救援队伍定位
				$("#transportGoods").css("display","none");//物资运输
				$("#contingencyPlan").css("display","none");//应急预案

				//修改图标的背景颜色
				$("#ZQFBID").css("background-color","#0052A3");
				$("#JJCZID").css("background-color","#0052A3");
				$("#SZQZAZID").css("background-color","#0099CC");
				$("#JYDWDWID").css("background-color","#0052A3");
				$("#WZYSID").css("background-color","#0052A3");
				$("#YJYAID").css("background-color","#0052A3");
			}
		}else{
			document.getElementById(RESZQZ).style.display='none';
		}

		//救援队伍定位
		var RESJYD='JYDWDWID';
		if((moduleset.split('-'))[3]=='auxworkers') {
			document.getElementById(RESJYD).style.display='';
			document.getElementById(RESJYD).onclick=function(){
				clearPages();
				resTeamLocModule();
				queryCallhelpReport();

				$("#dataWareHouse").css("display","none");
				$("#bookMarkDiv").css("display","none");//书签
				$("#analysisStatic").css("display","none");//统计分析
				$("#themeMap").css("display","none");//专题图
				$("#historiEarthquake").css("display","none");//历史地震
				$("#earthquakePrecursor").css("display","none");//地震前兆
				$("#earthquakeDisaster").css("display","none");//震后灾情
				$("#emergency").css("display","none");//紧急事件
				$("#placeInformation").css("display","none");//安置点信息
				$("#seismicRegime").css("display","none");//震情管理
				$("#preEvaluation").css("display","none");//预评估
				$("#asseCorrection").css("display","none");//评估修正
				$("#asseReport").css("display","none");//评估报告
				$("#disasterDistribute").css("display","none");//灾情分布
				$("#emergencyDisposal").css("display","none");//紧急处置
				$("#peoplePlace").css("display","none");//受灾群众安置
				$("#rescueTeamLocation").css("display","block");//救援队伍定位
				$("#transportGoods").css("display","none");//物资运输
				$("#contingencyPlan").css("display","none");//应急预案

				//修改图标的背景颜色
				$("#ZQFBID").css("background-color","#0052A3");
				$("#JJCZID").css("background-color","#0052A3");
				$("#SZQZAZID").css("background-color","#0052A3");
				$("#JYDWDWID").css("background-color","#0099CC");
				$("#WZYSID").css("background-color","#0052A3");
				$("#YJYAID").css("background-color","#0052A3");
			}
		}else{
			document.getElementById(RESJYD).style.display='none';
		}

		//物资运输
		var RESWZY='WZYSID';
		if((moduleset.split('-'))[4]=='auxsomethings') {
			document.getElementById(RESWZY).style.display='';
			document.getElementById(RESWZY).onclick=function(){
				clearPages();
				transGoodsModule();
				roadLayer.setVisibility(true);
				queryCallhelpReport();

				$("#dataWareHouse").css("display","none");
				$("#bookMarkDiv").css("display","none");//书签
				$("#analysisStatic").css("display","none");//统计分析
				$("#themeMap").css("display","none");//专题图
				$("#historiEarthquake").css("display","none");//历史地震
				$("#earthquakePrecursor").css("display","none");//地震前兆
				$("#earthquakeDisaster").css("display","none");//震后灾情
				$("#emergency").css("display","none");//紧急事件
				$("#placeInformation").css("display","none");//安置点信息
				$("#seismicRegime").css("display","none");//震情管理
				$("#preEvaluation").css("display","none");//预评估
				$("#asseCorrection").css("display","none");//评估修正
				$("#asseReport").css("display","none");//评估报告
				$("#disasterDistribute").css("display","none");//灾情分布
				$("#emergencyDisposal").css("display","none");//紧急处置
				$("#peoplePlace").css("display","none");//受灾群众安置
				$("#rescueTeamLocation").css("display","none");//救援队伍定位
				$("#transportGoods").css("display","block");//物资运输
				$("#contingencyPlan").css("display","none");//应急预案

				//修改图标的背景颜色
				$("#ZQFBID").css("background-color","#0052A3");
				$("#JJCZID").css("background-color","#0052A3");
				$("#SZQZAZID").css("background-color","#0052A3");
				$("#JYDWDWID").css("background-color","#0052A3");
				$("#WZYSID").css("background-color","#0099CC");
				$("#YJYAID").css("background-color","#0052A3");
			}
		}else{
			document.getElementById(RESWZY).style.display='none';
		}

		//应急预案
		var RESYAI='YJYAID';
		if((moduleset.split('-'))[5]=='auxcontingencyplan') {
			document.getElementById(RESYAI).style.display='';
			document.getElementById(RESYAI).onclick=function(){
				clearPages();

				//显示数据仓库模块，并且隐藏其他模块
				$("#dataWareHouse").css("display","none");
				$("#bookMarkDiv").css("display","none");//书签
				$("#analysisStatic").css("display","none");//统计分析
				$("#themeMap").css("display","none");//专题图
				$("#historiEarthquake").css("display","none");//历史地震
				$("#earthquakePrecursor").css("display","none");//地震前兆
				$("#earthquakeDisaster").css("display","none");//震后灾情
				$("#emergency").css("display","none");//紧急事件
				$("#placeInformation").css("display","none");//安置点信息
				$("#seismicRegime").css("display","none");//震情管理
				$("#preEvaluation").css("display","none");//预评估
				$("#asseCorrection").css("display","none");//评估修正
				$("#asseReport").css("display","none");//评估报告
				$("#disasterDistribute").css("display","none");//灾情分布
				$("#emergencyDisposal").css("display","none");//紧急处置
				$("#peoplePlace").css("display","none");//受灾群众安置
				$("#rescueTeamLocation").css("display","none");//救援队伍定位
				$("#transportGoods").css("display","none");//物资运输
				$("#contingencyPlan").css("display","block");//应急预案

				//修改图标的背景颜色
				$("#ZQFBID").css("background-color","#0052A3");
				$("#JJCZID").css("background-color","#0052A3");
				$("#SZQZAZID").css("background-color","#0052A3");
				$("#JYDWDWID").css("background-color","#0052A3");
				$("#WZYSID").css("background-color","#0052A3");
				$("#YJYAID").css("background-color","#0099CC");
			}
		}else{
			document.getElementById(RESYAI).style.display='none';
		}


	}
	$scope.init_north=function(){
		$('#btn_skin').menubutton({
			iconCls: 'cog',
			menu: '#layout_north_pfMenu'
		});

		$('#btn_logout').menubutton({
			iconCls: 'cog',
			menu: '#layout_north_zxMenu'
		});

		/**
		 * 更换EasyUI主题的方法
		 */
		$scope.changeThemeFun=function(themeName) {

			if ($.cookie('easyuiThemeName')) {

				$('#layout_north_pfMenu').menu(
					'setIcon',
					{
						target : $('#layout_north_pfMenu div[title='
							+ $.cookie('easyuiThemeName') + ']')[0],
						iconCls : 'emptyIcon'
					});
			}


			$('#layout_north_pfMenu').menu('setIcon', {
				target : $('#layout_north_pfMenu div[title=' + themeName + ']')[0],
				iconCls : 'tick'
			});
			var $easyuiTheme = $('#easyuiTheme');
			var url = $easyuiTheme.attr('href');
			var href = url.substring(0, url.indexOf('themes')) + 'themes/'
				+ themeName + '/easyui.css';
			$easyuiTheme.attr('href', href);

			var $iframe = $('iframe');
			if ($iframe.length > 0) {
				for ( var i = 0; i < $iframe.length; i++) {
					var ifr = $iframe[i];
					try {
						$(ifr).contents().find('#easyuiTheme').attr('href', href);
					} catch (e) {
						try {
							ifr.contentWindow.document
								.getElementById('easyuiTheme').href = href;
						} catch (e) {
						}
					}
				}
			}

			$.cookie('easyuiThemeName', themeName, {
				expires : 7
			});

		};

		$scope.logout=function() {
			location.replace(PATH+'/loginOut');
		}
		$scope.toppage=function() {
			var p=PATH+'/toppage';
			location.replace(p);
		}
	};


	$scope.init_east= function(){

		$('#layout_east_calendar').calendar({
			fit : true,
			current : new Date(),
			border : false,
			onSelect : function(date) {
				$(this).calendar('moveTo', new Date());
			}
		} );

		$('#layout_east_onlinePanel').panel({
			tools : [ {
				iconCls : 'database_refresh',
				handler : function() {

				}
			} ]
		});
	}

	$scope.init_west=function(){

		// 加入 url tree
		var layout_west_tree_url = PATH+'/system/res/tree';

		$('#layout_west_tree').tree({
			url : layout_west_tree_url,
			parentField : 'pid',
			lines : true,
			onClick : function(node) {
				if (node.attributes && node.attributes.url) {
					var url;
					if (node.attributes.url.indexOf('/') == 0) {/*如果url第一位字符是"/"，那么代表打开的是本地的资源*/
						url = PATH+ node.attributes.url;
						if (url.indexOf('/druid') == -1 &&url.indexOf('/monitoring') == -1&&url.indexOf('/error') == -1) {/*如果不是druid相关的控制器连接，那么进行遮罩层屏蔽*/
							parent.$.messager.progress({
								title : '提示',
								text : '数据处理中，请稍后....'
							});
						}

					} else {/*打开跨域资源*/
						url = node.attributes.url;
					}
					addTab({
						url : url,
						title : node.text,
						iconCls : node.iconCls
					});
				}
			},
			onBeforeLoad : function(node, param) {

				if (layout_west_tree_url) {//只有刷新页面才会执行这个方法
					parent.$.messager.progress({
						title : '提示',
						text : '数据处理中，请稍后....'
					});
				}
			},
			onLoadSuccess : function(node, data) {

				parent.$.messager.progress('close');
			}
		});

		function addTab(params) {

			var iframe = '<iframe src="' + params.url + '" frameborder="0" style="border:0;width:100%;height:98%;" ></iframe>';

			// if http url  jia js close
			if(params.url&&params.url.indexOf('http') == 0){
				iframe = '<iframe src="' + params.url + '" frameborder="0" style="border:0;width:100%;height:98%;" security="restricted" sandbox="" ></iframe>';
			}

			var t = $('#index_tabs');
			var opts = {
				title : params.title,
				closable : true,
				iconCls : params.iconCls,
				content : iframe,
				border : false,
				fit : true
			};
			if (t.tabs('exists', opts.title)) {
				t.tabs('close', opts.title);
				t.tabs('add', opts);
			} else {
				t.tabs('add', opts);
			}

			//parent.$.messager.progress('close');
		}

	};
	function assReportModuleInit(){
		//显示webOffice显示区域
		$("#mapContainerDiv").css("display","none");
		$("#webOffice").css("display","block");
		//document.all.WebOffice1.LoadOriginalFile(PATH+"/static/file/pgtemp.docx", "doc");
	}

} ]);

/*
 * 将所有页面恢复到最初始的状态
 * */
function clearPages(){
	//清除测距图层
	measureLayer.removeAllFeatures();
	//清除矢量图层
	vectorLayer.removeAllFeatures();
	circleLayer.removeAllFeatures();
	//显示地图容器
	$("#mapContainerDiv").css("display","block");
	//隐藏表格容器
	$("#otherContainerDiv").css("display","none");
	//清除表格容器
	$("#otherContainerDiv").html("");
	//隐藏webOffice控件容器
	$("#webOffice").css("display","none");
	//隐藏图例区域
	$("#legend").css("display","none");
	//清除图例内容
	$(".legendContent").html("");
	//隐藏装载柱状图的区域
	$("#columnChart").css("display","none");
	//清除装载柱状图的区域
	$("#columnChart").html("");
	//隐藏装载折线图的区域
	$("#lineChart").css("display","none");
	//清除装载折线图的区域
	$("#lineChart").html("");
	//隐藏搜索框
	$("#searchDiv").css("display","none");
	//删除“人口密度专题图”
	removeOneLayer("兰州市人口点密度专题图");
	removeOneLayer("公路分布");
	removeOneLayer("铁路分布");
	clusterLayer.removeAllFeatures();
	//关闭查询按钮的点击功能
	$("#searchDiv img").off("click");
	//隐藏宏观异常速报查询结果列表的展示区域
	$("#pre_list").css("display","none");
	//图片浏览窗口
	$("#pictureBroses").css("display","none");
	//视频、音频浏览窗口
	$("#videos").css("display","none");
	//关闭地图上的弹窗
	closeInfoWin();
	//隐藏辅助决策中辅助功能的按钮
	$(".ad_button_class").css("display","none");
	$("#assistDecDiv").css("display","none");
	//隐藏缓冲区分析窗口
	$("#bufferAnalysis").css("display","none");
	//资源整合子系统受灾群众安置模块安置点分析功能的位置
	$("#people_place_analy").css("display","none");
	//隐藏道路图层
	roadLayer.setVisibility(false);
	//隐藏实时视频查看窗口
	$("#look_at_camera").css("display","none");
}

function queryCallhelpReport(){
	//查询所有一键呼救的数据,然后在地图上进行展示
	$.ajax({
		type:"post",
		url:PATH+urlConfig.callHeplReportQuery,
		async:true,
		success:function(data){
			loadingWinInit(false);
			//将查询到的结果上图
			var features = [];
			//给feature设置样式
			$.each(data, function(i,item) {
				var f = new SuperMap.Feature.Vector();
				f.geometry = new SuperMap.Geometry.Point(item.x, item.y);
				f.attributes = {
					X:item.x,
					Y:item.y,
					TIME:item.time,
					USERNAME:item.user_name,
					IMG_URL:item.img_url,
					VIDEO_URL:item.video_url,
					AUDIO_URL:item.audio_url
				};
				f.style = {
					pointRadius: 4,
					graphic:true,
					externalGraphic:fzjc_featureImgs.callheplreport,
					graphicWidth:48,
					graphicHeight:48
				};
				f.id = "callhelp_"+item.id;
				features.push(f);
			}); 
			vectorLayer.addFeatures(features);//将构造的feature添加到地图上
		}
		
	});
}

var PeopleResultLayer;

var HouseResultLayer;

var LifeLineResultLayer;

var EarthquackResultLayer=[];

