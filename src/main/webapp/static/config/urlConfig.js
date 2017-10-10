var urlConfig = {
	//地图的url
	mapUrl: "http://192.168.1.236:8090/iserver/services/map-earthquake/rest/maps/earthquakeregion",
	//iserver数据服务地址
	iserverUrl:"http://192.168.1.236:8090/iserver/services/data-earthquake/rest/data",
	//iserver人口密度地图服务地址
	iserverMapUrl:"http://192.168.1.236:8090/iserver/services/map-earthquake/rest/maps/pop_density",
	//iserver公路的服务地址
	roadServerUrl:"http://192.168.1.236:8090/iserver/services/map-earthquake/rest/maps/road",
	//iserver铁路的服务地址
	railWay:"http://192.168.1.236:8090/iserver/services/map-earthquake/rest/maps/railway",
	////地图的url
	//mapUrl:"http://10.249.20.103/app/api/superMap/smsSuperMapProxyHandler/proxy/services/ogc/wmts/1110",
	////iserver数据服务地址
	//iserverUrl:"http://10.246.2.6:8090/iserver/services/data-earthquake/rest/data",
	////地市级地图
	//provinceMap:"http://10.246.2.6:8090/iserver/services/map-earthquake/rest/maps/dijishi_map",
	////iserver人口密度地图服务地址
	//iserverMapUrl:"http://10.246.2.6:8090/iserver/services/map-earthquake/rest/maps/pop_density",
	////iserver公路的服务地址
	//roadServerUrl:"http://110.246.2.6:8090/iserver/services/map-earthquake/rest/maps/road",
	////iserver铁路的服务地址
	//railWay:"http://10.246.2.6:8090/iserver/services/map-earthquake/rest/maps/railway",
	//iserver数据源名称
	iserverDataSource:"earthquakesp",
	//后台接口服务地址
	yserverUrl:"",


	/*
	 * iserver中发布的各个服务的数据集以及数据源名称
	 */
	earthquakeregion:"county_code_adjust",
	countyLine:"county_line",//区县行政区边界
	streetLine:"street_line",//街道行政区边界
	placeAddress:"address",//地名地址库
	atDataSet:"fault",//地震活动断裂服务的数据集名称
	pamDataSet:"peak_acc",//地震动峰值加速度区划图服务的数据集名称
	chapDataSet:"cha_period",//地震动反应谱特征周期区划图的数据集名称
	esDataSet:"Evacuation_site",//城区疏散场地分布图
	dsDataSet:"dangerous_source",//重大火灾、爆炸、有毒和放射危险源数据
	ghDataSet:"geological_hazard",//地震地质灾害危险区分布
	slDataSet:"school",//学校分布
	tsDataSet:"tourism_spot",//旅游景点和自然保护区
	lmDataSet:"landmark",//文物保护单位
	soDataSet:"sig_objective",//重大目标
	prDataSet:"relief_troop1",//专业救援队伍
	fpDataSet:"fire_power",//消防力量
	hDataSet:"hospital",//医院分布
	sDataSet:"storage",//物资储备仓库
	osDataSet:"observation_sta",//地震台站
	sbDataSet:"seismic_belt",//地震带
	heDataSet:"Hi_entrances",//交通管制点
	popDensity:"pop_density",//人口密度
	potsDataSet:"potential_source",//潜在震源区
	areaDataSet:"county_code",//区县行政区
	historyEarth:"strong_catalog",//历史地震数据的数据集名称
	roadDataSet:"road",//公路
	railWayDataSet:"railway",//铁路
	bridge1DataSet:"bridge1",//桥梁，点
	bridge2DataSet:"bridge2",//桥梁，面
	tunnelDataSet:"tunnel",//隧道
	reservior:"reservior",//水库
	zhdzx:"dzzhdzx",//综合等着线
	dzldqh:"dizhenliedu",//地震烈度区划
	mhmshfb:"mhmsdfbt",//莫霍面深度分布
	bgzlyc:"bgzlyct",//布格重力异常
	fzjsd:"peak_acc",//峰值加速度
	fyptzzq:"cha_period",//反应谱特镇周期
	dld:"fault",//地震断裂带

	/*
	 * 后台各个接口的地址
	 * */
	popQueryUrl:"/business/dpopulation/query",//人口统计查询接口url
	ecoQueryUrl:"/business/deconomy/query",//经济统计查询接口url
	builConUrl:"/business/dbuicity1/query",//房屋统计（按结构）查询接url
	builYeaUrl:"/business/dbuicity2/query",//房屋统计（按年代）查询接口url
	builCounUrl:"/business/dcityratio/query",//区县中城区房屋统计
	builTownUrl:"/business/drurratio/query",//区县中农村房屋统计
	builFirmUrl:"/business/dbuifirm/query",//大型企业房屋统计
	climateUrl:"/business/dclimate/query",//气候数据查询
	refTroUrl:"/business/drelieftroop2/query",//行业救灾队伍
	medcUrl:"/business/dmedical/query",//行政区医疗力量
	inveUrl:"/business/dstoinventory/query",//救灾物资仓库明细数据查询
	nsbcomUrl:"/business/dnsbcommunication/query",//地震系统联系数据
	govcomUrl:"/business/dgovcommunication/query",//地方政府联系数据
	locHeadUrl:"/business/dlocalheadquarters/query",//地方抗震救灾指挥部联系数据查询
	localNet:"/business/dlocalnet/query",//灾情速报网络数据查询
	troopcUrl:"/business/dtroopcommunication/query",//军队与武装力量

	refTroCount:"/business/drelieftroop2/count",//统计行业救灾队伍数量请求的url
	danSourceCount:"/business/dangeroussource/count",//行政区危险源数量统计
	evacSiteCount:"/business/evacuationsite/count",//行政区疏散场地数量统计
	geoHazardCount:"/business/geologicalhazard/count",//行政区地址灾害危险区数量统计
	sigObjecCount:"/business/sigobjective/count",//行政区重大目标数量统计
	schoolCount:"/business/school/count",//行政区学校数量统计
	enterpCount:"/business/enterprisecode/count",//行政区大型企业数量统计

	bookMarkQuery:"/business/bookmark/query",//书签查询接口url
	bookMarkAdd:"/business/bookmark/add",//添加书签接口url
	bookMarkUpdate:"/business/bookmark/updata",//修改书签的接口的url
	bookMarkClear:"/business/bookmark/delete",//清空书签的url
	bookMarkDel:"/business/bookmark/deleteId",//根据书签ID删除书签

	abnormalReport:"/business/macanoreports/add",//web端异常速报添加接口
	reportquery:"/business/macanoreports/query",//web端上报列表
	reportDelete:"/business/macanoreports/deleteByIds",//web端上报删除

	earthDisaster:"/business/aftdisreport/add",//震后灾情事件上报接口
	earthDisAuery:"/business/aftdisreport/query",//震后灾情上报事件查询
	earthDisQueryByU:"/business/aftdisreport/queryByUser",//根据用户id查询震后灾情上报事件
	earthDisDel:"/business/aftdisreport/deleteByIds",//震后灾情上报事件删除接口
	earthDisDelCheck:"/business/aftdisreport/updataByCheck",//震后灾情上报事件信息审核接口url
	earthDisUpMessage:"/business/aftdisreport/updataMessage",//修改上报事件信息的方法

	emergency:"/business/emereport/add",//紧急事件上报接口
	emergencyQuery:"/business/emereport/query",//紧急事件上报事件查询
	emerQueryByUser:"/business/emereport/queryByUser",//根据用户名进行查询
	emergencyDel:"/business/emereport/deleteByIds",//紧急事件上报事件删除接口
	emergencyCheck:"/business/emereport/updataByCheck",//紧急事件上报灾情审核接口的url
	emerUpdata:"/business/emereport/updataMessage",//修改紧急上报事件的信息

	palceInfo:"/business/sitsitureport/add",//安置点相关信息上报
	placeInfoQuery:"/business/sitsitureport/query",//安置点上报事件查询
	placeInfoQueryByU:"/business/sitsitureport/queryByUser",//根据用户查询事件
	placeInfoDel:"/business/sitsitureport/deleteByIds",//安置点上报事件删除
	placeInfoCheck:"/business/sitsitureport/updataByCheck",//安置点上报事件审核接口的url
	placeInfoUpdata:"/business/sitsitureport/updataMessage",//修改上报事件信息

	macAnoReQuery:"/business/disstareport/query",//救援状态上报事件查询
	macAnoReDel:"/business/disstareport/deleteByIds",//救援状态上报事件删除
	macAnoReCheck:"/business/disstareport/updataByCheck",//救援状态上报事件信息审核接口url

	emegenPlanQuery:"/business/demeplan/query",//应急预案查询

	systemSaveExcel:"/system/excel/saveExcel",//将datagrid表格中的数据导出到Excel中,用ajax的方式提交请求
	systemSaveExcels:"/system/excel/saveExcels",//将datagrid表格中的数据导出到Excel中,用form表单提交方式
		
	earthquakeListQuery:"/business/earthquakeList/queryAll",
	callHeplReportQuery:"/business/callhelpreport/queryAll"
	
};
