MainApp.controller('DBMCtrls', [ '$scope','$http', function($scope,$http) {

	var init =true;
	var urlSet='aftDisReportListColumnName-aftDisReportList-AftDisReport-/business/aftdisreport/adds-/business/aftdisreport/edit-/business/aftdisreport/delete';
	$scope.names=[];
	$scope.dbid=[];
	$http.get(PATH+'/system/db/db').success( function(r) {
		urlSet=$scope.dbmmodulus;
		//alert(urlSet);
		var url=PATH+'/system/db/'+((urlSet.split('-'))[0]).toString();
		$http.get(url).success( function(result) {
			var array =[];
			var columns=[];
			var names=[];
			for(var i=0;i<result.length;i++){
				array.push({field : result[i].toString(),title : result[i].toString(),width : 100,hidden : false});
				if(i>0){
					var val=((urlSet.split('-'))[2]).toString()+'.'+result[i].toString();
					$scope.names.push({Name:result[i].toString(),Value:val});
				} else{
					$scope.dbid.push({Name:((urlSet.split('-'))[2]).toString()+'.'+result[i].toString()});
				}
			}
			columns.push(array);
			treeGrid = $('#treeGrid').treegrid({
				url : PATH+'/system/db/'+(urlSet.split('-'))[1],
				//queryParams:{modelname:'',classname:''},
				idField : 'id',
				treeField : 'name',
				parentField : 'pid',
				fit : true,
				fitColumns : false,
				border : false,
				columns:columns,
				onContextMenu : function(e, row) {
					e.preventDefault();
					$(this).treegrid('unselectAll');
					$(this).treegrid('select', row.id);
					$('#menu').menu('show', {
						left : e.pageX,
						top : e.pageY
					});
				},
				onLoadSuccess : function() {
					if(init)$(this).datagrid({toolbar : '#toolbar'});
					init=false;
					parent.$.messager.progress('close');
					$(this).treegrid('tooltip');
				},onBeforeLoad:function(){

				}
			});



		});
	});
	//init
	$('#iconCls').combobox({
		data : $.iconData,
		formatter : function(v) {
			return $.formatString('<span class="{0}" style="display:inline-block;vertical-align:middle;width:16px;height:16px;"></span>{1}', v.value, v.value);
		}
	});

	$('#pid').combotree({
		url : PATH+'/system/db/tree',
		parentField : 'pid',
		lines : true,
		panelHeight : 'auto'
	});
	//$.post(PATH+'/system/db/'+(urlSet.split('-'))[0], {
    //
	//	},
	//	function(result) {
	//		var array =[];
	//		var columns=[];
	//		var names=[];
    //
	//		for(var i=0;i<result.length;i++){
	//			array.push({field : result[i].toString(),title : result[i].toString(),width : 100,hidden : false});
	//		}
	//		columns.push(array);
	//		treeGrid = $('#treeGrid').treegrid({
	//			url : PATH+'/system/db/'+(urlSet.split('-'))[1],
	//			//queryParams:{modelname:'',classname:''},
	//			idField : 'id',
	//			treeField : 'name',
	//			parentField : 'pid',
	//			fit : true,
	//			fitColumns : false,
	//			border : false,
	//			columns:columns,
	//			onContextMenu : function(e, row) {
	//				e.preventDefault();
	//				$(this).treegrid('unselectAll');
	//				$(this).treegrid('select', row.id);
	//				$('#menu').menu('show', {
	//					left : e.pageX,
	//					top : e.pageY
	//				});
	//			},
	//			onLoadSuccess : function() {
	//				if(init)$(this).datagrid({toolbar : '#toolbar'});
	//				init=false;
	//				parent.$.messager.progress('close');
	//				$(this).treegrid('tooltip');
	//			},onBeforeLoad:function(){
    //
	//			}
	//		});
	//	},
	//	'JSON');







	$scope.deleteFun=function(id) {
		if (id != undefined)treeGrid.treegrid('select', id);
		var node = treeGrid.treegrid('getSelected');
		if (node) {
			parent.$.messager.confirm('询问', '您是否要删除当前资源？', function(b) {
				if (b) {
					parent.$.messager.progress({
						title : '提示',
						text : '数据处理中，请稍后....'
					});
					$.post(PATH+(urlSet.split('-'))[5], {
						id : node.id
					}, function(result) {
						if (result.code==200) {
							treeGrid.treegrid('reload');
							$('#layout_west_tree').tree('reload');
							//$('#pid').combotree('reload');
						}
						parent.$.messager.progress('close');
					}, 'JSON');
				}
			});
		}
	};

	$scope.editFun=function(id) {
		if (id != undefined)treeGrid.treegrid('select', id);

		var node = treeGrid.treegrid('getSelected');
		if (node) {
			loadFrom('#fm',node);
			if(node.des)$('#des').text(node.des);
			//$('#pid').combotree('reload',PATH+'/business/aftdisreport/tree?passId='+node.id);
			showDialog('#dlg','数据维护');
			url=PATH+(urlSet.split('-'))[4];
			alert(url);
		}
	};

	$scope.addFun=function() {
		$('#fm').form('clear');
		showDialog('#dlg','数据维护');
		url=PATH+(urlSet.split('-'))[3];
		alert(url);
	};

	$scope.submit=function(){

		$('#fm').form('submit',{
			url: url,
			success: function(result){
				result= $.parseJSON(result);
				if(result.code==200){
					$('#dlg').dialog('close');
					treeGrid.treegrid('reload');
					$('#layout_west_tree').tree('reload');
					//$('#pid').combotree('reload');
				}
				else {
					$.messager.alert('提示',result.msg);
				}
			}
		});
	};


} ]);

