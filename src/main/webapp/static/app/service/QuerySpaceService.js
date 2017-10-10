/*
 * 实现所有空间服务的查询
 * */
var querySpaceService = {
	/*
	 * 实现基础的服务查询，查询方式是sql查询
	 * 	dataSets:要查询的服务的数据集名称
	 * 	resultFunc:查询结果回调函数
	 *  attrFilter:查询结果过滤条件
	 * */
	comSqlService:function(dataSets,attrFilter,resultFunc){
		 var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
        getFeatureParam = new SuperMap.REST.FilterParameter({
            name: dataSets+"@"+urlConfig.iserverDataSource,
            attributeFilter: attrFilter
        });
        getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
            queryParameter: getFeatureParam,
            datasetNames:[urlConfig.iserverDataSource+":"+dataSets],
            toIndex:-1
        });
        getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(urlConfig.iserverUrl, {
            eventListeners: {"processCompleted": resultFunc, "processFailed": querySpaceFailed}});
        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
	},
	
	/*
	 * 缓冲区分析:
	 * 	sourceGeo:做缓冲区分析的几何对象
	 * 	bufferDistance：缓冲距离
	 * 	dataSets：数据集名称
	 * 	bufferQueryCompleted：缓冲结果处理方法
	 * */
	bufferQuery:function(sourceGeo,bufferDistance,dataSets,bufferQueryCompleted){
		var getFeatureParameter, getFeatureService;
	    getFeatureParameter = new SuperMap.REST.GetFeaturesByBufferParameters({
	        bufferDistance: bufferDistance,
	        //attributeFilter: "SMID > 0",
	        datasetNames: [urlConfig.iserverDataSource+":"+dataSets],
	        returnContent:true,
	        geometry: sourceGeo
	    });
	    getFeatureService = new SuperMap.REST.GetFeaturesByBufferService(urlConfig.iserverUrl, {
	        eventListeners: {
	            "processCompleted": bufferQueryCompleted,
	            "processFailed": querySpaceFailed
	        }
	    });
	    getFeatureService.processAsync(getFeatureParameter);
	}
};

function querySpaceFailed(e){
	alert(e.error.errorMsg);
}
