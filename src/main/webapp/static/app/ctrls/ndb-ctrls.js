MainApp.controller('NDBCtrls', [ '$scope','$http', function($scope,$http) {

	var init =true;
	var max=50;

	$scope.ndbnames=[];
	$scope.dbnames=[];

	var url=PATH+'/system/db/listColumn';
	$http.get(url).success( function(result) {
		$scope.dbnames=[{dbname:'DB.TABLE_SCHEMA',dbtname:'DB.TABLE_NAME',coluname:'DB.COLUMN_NAME',coluctype:'DB.COLUMN_TYPE',colutype:'DB.DATA_TYPE'}];
	});
	//var url=PATH+'/system/db/listcolumn';
	//$http.get(url).success( function(result) {
    //
	//});

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

	treeGrid = $('#treeGrid').treegrid({
		url : PATH+'/system/db/dbListColumn',
		//queryParams:{modelname:'dbtname'},
		idField : 'ORDINAL_POSITION',
		treeField : 'name',
		parentField : 'pid',
		fit : true,
		fitColumns : false,
		border : false,
		//frozenColumns : [ [ {
		//	title : '编号',
		//	field : 'ORDINAL_POSITION',
		//	width : 150,
		//	hidden : true
		//} ] ],
		columns:[[
			{
				title : 'id',
				field : 'ORDINAL_POSITION',
				width : 150,
				hidden : false
			},
			{
				field : 'COLUMN_NAME',
				title : '字段名',
				width : 150,
				hidden : false
			},
			{
				field : 'DATA_TYPE',
				title : '字段类型',
				width : 150,
				hidden : false
			},
			{
				field : 'COLUMN_TYPE',
				title : '真类型',
				width : 150,
				hidden : false
			},
			{
				field : 'TABLE_NAME',
				title : '表名',
				width : 150,
				hidden : false
			},
			{
				field : 'TABLE_SCHEMA',
				title : '库名',
				width : 150,
				hidden : false
			}
		]],
		onContextMenu : function(e, row) {
			e.preventDefault();
			$(this).treegrid('unselectAll');
			$(this).treegrid('select', row.ORDINAL_POSITION);
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
					$.post(PATH+'/system/db/delete', {
						id : node.id
					}, function(result) {
						if (result.code==200) {
							treeGrid.treegrid('reload');
							$('#layout_west_tree').tree('reload');
							$('#pid').combotree('reload');
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
			$('#pid').combotree('reload',PATH+'/system/db/tree?passId='+node.id);
			showDialog('#dlg','维护数据表');
			url=PATH+'/system/db/edit';
		}
	};

	$scope.addFun=function(id) {
		$('#fm').form('clear');
		if (id != undefined)treeGrid.treegrid('select', id);
		var node = treeGrid.treegrid('getSelected');
		if (node) {
			loadFrom('#fm',node);
		}
		showDialog('#dlg','添加资源');
		url=PATH+'/system/db/add';

	};
	$scope.createFun=function() {
		$('#fm').form('clear');
		showDialog('#dlg','创建数据表');
		url=PATH+'/system/db/createTable';
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

