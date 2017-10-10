MainApp.controller('DBCtrls', [ '$scope','$http', function($scope,$http) {

	var init =true;
	var urlSet='AftDisReport-/system/db/listColumn-/system/db/addColumn-/system/db/editColumn-/system/db/deleteColumn';
	$scope.dbnames=[];
	$http.get(PATH+'/system/db/db').success( function(result) {
		urlSet = $scope.dbmmodulus;


		//alert(urlSet);{TABLE_CATALOG:def, IS_NULLABLE:YES, TABLE_NAME:aft_dis_report, TABLE_SCHEMA:earthquake, EXTRA:, COLUMN_NAME:abnormal_name, COLUMN_KEY:, CHARACTER_OCTET_LENGTH:150, NUMERIC_PRECISION:null, PRIVILEGES:select,insert,update,references, COLUMN_COMMENT:, DATETIME_PRECISION:null, COLLATION_NAME:utf8_general_ci, NUMERIC_SCALE:null, COLUMN_TYPE:varchar(50), ORDINAL_POSITION:13, CHARACTER_MAXIMUM_LENGTH:50, DATA_TYPE:varchar, CHARACTER_SET_NAME:utf8, COLUMN_DEFAULT:null}
			$scope.dbnames = [{
				dbname: ((urlSet.split('-'))[0]).toString()+'.TABLE_SCHEMA',
				dbtname: ((urlSet.split('-'))[0]).toString()+'.TABLE_NAME',
				coluname: ((urlSet.split('-'))[0]).toString()+'.COLUMN_NAME',
				ncoluname:((urlSet.split('-'))[0]).toString()+'.NCOLUMN_NAME',
				colutype: ((urlSet.split('-'))[0]).toString()+'.DATA_TYPE',
				colukey: ((urlSet.split('-'))[0]).toString()+'.COLUMN_KEY',
				coluextra: ((urlSet.split('-'))[0]).toString()+'.EXTRA',
				colucol: ((urlSet.split('-'))[0]).toString()+'.CHARACTER_OCTET_LENGTH',
				colunp: ((urlSet.split('-'))[0]).toString()+'.NUMERIC_PRECISION',
				coluprivileges: ((urlSet.split('-'))[0]).toString()+'.PRIVILEGES',
				colucname: ((urlSet.split('-'))[0]).toString()+'.COLLATION_NAME',
				coluctype: ((urlSet.split('-'))[0]).toString()+'.COLUMN_TYPE',
				colucml: ((urlSet.split('-'))[0]).toString()+'.CHARACTER_MAXIMUM_LENGTH',
				colucsn: ((urlSet.split('-'))[0]).toString()+'.CHARACTER_SET_NAME'
			}];
		treeGrid = $('#treeGrid').treegrid({
			url : PATH+(urlSet.split('-'))[1],
			//queryParams:{modelname:'',classname:''},
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
					field : 'COLUMN_KEY',
					title : '键描述',
					width : 150,
					hidden : false
				},
				{
					field : 'EXTRA',
					title : 'EXTRA',
					width : 150,
					hidden : false
				},
				{
					field : 'CHARACTER_OCTET_LENGTH',
					title : 'COL',
					width : 150,
					hidden : false
				},
				{
					field : 'NUMERIC_PRECISION',
					title : 'NUMPRE',
					width : 150,
					hidden : false
				},
				{
					field : 'PRIVILEGES',
					title : '权限',
					width : 150,
					hidden : false
				},
				{
					field : 'COLLATION_NAME',
					title : 'CNAME',
					width : 150,
					hidden : false
				},
				{
					field : 'COLUMN_TYPE',
					title : '类型',
					width : 150,
					hidden : false
				},
				{
					field : 'CHARACTER_MAXIMUM_LENGTH',
					title : '最大长度',
					width : 150,
					hidden : false
				},
				{
					field : 'CHARACTER_SET_NAME',
					title : '字符集',
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
	});



	//init
	$('#iconCls').combobox({
		data : $.iconData,
		formatter : function(v) {
			return $.formatString('<span class="{0}" style="display:inline-block;vertical-align:middle;width:16px;height:16px;"></span>{1}', v.value, v.value);
		}
	});

	//$('#pid').combotree({
	//	url : PATH+'/system/db/tree',
	//	parentField : 'pid',
	//	lines : true,
	//	panelHeight : 'auto'
	//});









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
				$.post(PATH+(urlSet.split('-'))[4], {
					id:node.ORDINAL_POSITION,
					columnName : node.COLUMN_NAME,
					tabelName:node.TABLE_NAME
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
		//$('#pid').combotree('reload',PATH+'/system/db/tree?passId='+node.id);
		showDialog('#dlg','数据表维护');
		url=PATH+(urlSet.split('-'))[3];
	}
};

$scope.addFun=function(id) {
	  $('#fm').form('clear');
	if (id != undefined)treeGrid.treegrid('select', id);
	var node = treeGrid.treegrid('getSelected');
	if (node) {
		loadFrom('#fm',node);
	}
	  showDialog('#dlg','数据表维护');
	  url=PATH+(urlSet.split('-'))[2];
	  
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

