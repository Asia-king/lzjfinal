//---------------------数据仓库左侧面板数据配置--------------------
var basedata_classify = [
	{"code":"1000","pcode":"","text":"社会经济统计","state":"closed","children":[
		{"code":"1100","pcode":"1000","text":"人口统计","initResult":"populResult","children":[]},
		{"code":"1200","pcode":"1000","text":"经济统计","initResult":"economyResult","children":[]},
		{"code":"1300","pcode":"1000","text":"房屋统计","initResult":"buildResult","children":[]}
		]},
	{"code":"2000","pcode":"","text":"地震应急基础","state":"closed","children":[
		{"code":"2100","pcode":"2000","text":"活动断裂分布图","initResult":"activeTectonicsResult","children":[]},
		{"code":"2200","pcode":"2000","text":"地震动参数区划图","state":"closed","children":[
			{"code":"2201","pcode":"2200","text":"地震动峰值加速度区划图","initResult":"peakAccelMapResult","children":[]},
			{"code":"2202","pcode":"2200","text":"地震动反应谱特征周期区划图","initResult":"chaPeriodResult","children":[]}
//			{"code":"2203","pcode":"2200","text":"重大工程安全性评价数据","children":[]}
			]},
		{"code":"2300","pcode":"2000","text":"地震活动性数据","state":"closed","children":[
//			{"code":"2301","pcode":"2300","text":"地震带","children":[]},
			{"code":"2302","pcode":"2300","text":"潜在震源区分布图","initResult":"potSourceResult","children":[]}
			]},
		{"code":"2400","pcode":"2000","text":"地震台站分布信息","initResult":"obserStaResult","children":[]},
//		{"code":"2500","pcode":"2000","text":"地震现场应急与救援案例","children":[]},
//		{"code":"2600","pcode":"2000","text":"重点监视防御区域","children":[]},
		{"code":"2700","pcode":"2000","text":"城区疏散场地分布图","initResult":"evacuationSiteResult","children":[]}
		]},
	{"code":"3000","pcode":"","text":"影响灾害背景","state":"closed","children":[
		{"code":"3100","pcode":"3000","text":"重大工程目标","state":"closed","children":[
			{"code":"3101","pcode":"3100","text":"水库","initResult":"reserviorResult","children":[]},
			{"code":"3102","pcode":"3100","text":"机场","children":[]}
			]},
		{"code":"3200","pcode":"3000","text":"生命线系统","state":"closed","children":[
			{"code":"3201","pcode":"3200","text":"公路","initResult":"roadResult","children":[]},
			{"code":"3202","pcode":"3200","text":"铁路","initResult":"railWayResult","children":[]},
			{"code":"3203","pcode":"3200","text":"桥梁","initResult":"bridgeResult","children":[]},
			{"code":"3204","pcode":"3200","text":"隧道","initResult":"tunnelResult","children":[]},
			{"code":"3205","pcode":"3200","text":"交通管制点","initResult":"entrancesResult","children":[]},
			{"code":"3206","pcode":"3200","text":"大型油气管线","children":[]},
			{"code":"3207","pcode":"3200","text":"供电管线","children":[]},
			{"code":"3208","pcode":"3200","text":"供气管线","children":[]},
			{"code":"3209","pcode":"3200","text":"供水管线","children":[]},
			{"code":"3210","pcode":"3200","text":"供暖管线","children":[]},
			{"code":"3211","pcode":"3200","text":"通信管线","children":[]}
			]},
		{"code":"3300","pcode":"3000","text":"次生灾害源","state":"closed","children":[
			{"code":"3301","pcode":"3300","text":"重大火灾、爆炸、有毒和放射危险源","initResult":"dangerousSourceResult","children":[]},
			{"code":"3302","pcode":"3300","text":"悬河段分布","children":[]}
			]},
		{"code":"3400","pcode":"3000","text":"地震地质灾害危险区","initResult":"geologivalHarborResult","children":[]},
		{"code":"3500","pcode":"3000","text":"可能产生严重社会影响的目标","state":"closed","children":[
			{"code":"3501","pcode":"3500","text":"学校","initResult":"schoolResult","children":[]},
//			{"code":"3502","pcode":"3500","text":"侨乡","children":[]},
			{"code":"3503","pcode":"3500","text":"旅游景点和自然保护区","initResult":"tourismSpotResult","children":[]},
			{"code":"3504","pcode":"3500","text":"文物保护单位","initResult":"landMarkResult","children":[]},
//			{"code":"3505","pcode":"3500","text":"少数民族地区","children":[]},
//			{"code":"3506","pcode":"3500","text":"贫困县分布","children":[]},
			{"code":"3507","pcode":"3500","text":"重大目标","initResult":"sigObjectiveResult","children":[]}
//			{"code":"3507","pcode":"3500","text":"政府办公地","children":[]},
//			{"code":"3508","pcode":"3500","text":"外交驻地","children":[]},
//			{"code":"3509","pcode":"3500","text":"供水（水厂）","children":[]},
//			{"code":"3510","pcode":"3500","text":"电力（电力调度中心、变电站）","children":[]},
//			{"code":"3511","pcode":"3500","text":"金融机构、银行","children":[]},
//			{"code":"3512","pcode":"3500","text":"星级宾馆、饭店","children":[]},
//			{"code":"3513","pcode":"3500","text":"供气（大型储气设施地点、中心调压站","children":[]},
//			{"code":"3514","pcode":"3500","text":"科研机构","children":[]},
//			{"code":"3515","pcode":"3500","text":"新闻广播机构","children":[]},
//			{"code":"3516","pcode":"3500","text":"公众聚集场所","children":[]}
			]},
		{"code":"3600","pcode":"3000","text":"气候","initResult":"climateResult","children":[]}
//		{"code":"3700","pcode":"3000","text":"水文和环境","children":[]}
		]},
	{"code":"4000","pcode":"","text":"救灾资源及其通信联络","state":"closed","children":[
		{"code":"4100","pcode":"4000","text":"救灾队伍","state":"closed","children":[
			{"code":"4101","pcode":"4100","text":"专业救灾队伍","initResult":"profRescueResult","children":[]},
			{"code":"4102","pcode":"4100","text":"行业救灾队伍","initResult":"reliefTroopResult","children":[]},
			{"code":"4103","pcode":"4100","text":"消防力量","initResult":"firePowerResult","children":[]}
			]},
		{"code":"4200","pcode":"4000","text":"医疗救护力量","state":"closed","children":[
			{"code":"4201","pcode":"4200","text":"医院","initResult":"hospitalResult","children":[]},
			{"code":"4202","pcode":"4200","text":"行政区医疗力量","initResult":"medicalResult","children":[]}
			]},
		{"code":"4300","pcode":"4000","text":"物资储备","state":"closed","children":[
			{"code":"4301","pcode":"4300","text":"物资储备仓库","initResult":"storageResult","children":[]},
			{"code":"4302","pcode":"4300","text":"救灾物资仓库明细数据","initResult":"inventoryResult","children":[]}
			]},
		{"code":"4400","pcode":"4000","text":"震时紧急联络信息","state":"closed","children":[
			{"code":"4401","pcode":"4400","text":"地震系统联系数据","initResult":"nsbCommuResult","children":[]},
			{"code":"4402","pcode":"4400","text":"地方政府系统联系数据","initResult":"govComResult","children":[]},
			{"code":"4403","pcode":"4400","text":"地方抗震救灾指挥部联系数据","initResult":"locHeadResult","children":[]},
			{"code":"4404","pcode":"4400","text":"灾情速报网络数据","initResult":"localNetResult","children":[]},
			{"code":"4405","pcode":"4400","text":"军队与武装力量联系数据","initResult":"troopCResult","children":[]}
			]}
		]}
//	{"code":"5000","pcode":"","text":"地震现场观测","state":"closed","children":[
//		{"code":"5100","pcode":"5000","text":"地震台站分布","children":[]},
//		{"code":"5200","pcode":"5000","text":"地震活动序列","children":[]},
//		{"code":"5300","pcode":"5000","text":"强震动","children":[]}
//		]}
];

//---------------------专题地图左侧面板数据配置--------------------
var themeMap_data = [
//		{"code":"tmd001","name":"人口密度","initFun":"populationDensity()"},
//		{"code":"tmd002","name":"经济统计","initFun":""},
//		{"code":"tmd003","name":"建筑物","initFun":""},
//		{"code":"tmd004","name":"地震带","initFun":"tmSeismicBelt()"},
		{"code":"tmd005","name":"危险源分布","initFun":"tmDangerousSource()"},
		{"code":"tmd006","name":"学校","initFun":"tmSchool()"},
		{"code":"tmd007","name":"医院","initFun":"tmHospital()"},
		{"code":"tmd008","name":"地质灾害隐患点","initFun":"tmGeologicalHazard()"},
		{"code":"tmd009","name":"避险场所分布","initFun":"tmEvacuationSite()"},
		{"code":"tmd010","name":"重点目标","initFun":"tmSigObjective()"},
		{"code":"tmd011","name":"救灾物资储备点","initFun":"tmStorage()"},
		{"code":"tmd012","name":"交通管制点","initFun":"tmEntrances()"}
	];
	
//---------------------统计分析左侧面板数据配置--------------------
//dataBaseAttr是查询返回结果的属性
var analySta_data = [
	{"code":"asd100","name":"人口统计","queryUrl":urlConfig.popQueryUrl,"statCondition":[
		{"code":"asd101","name":"总人口(单位:人)","dataBaseAttr":"Total"},
		{"code":"asd102","name":"家庭户户数(单位:户)","dataBaseAttr":"Family"}
	]},
	{"code":"asd200","name":"国民经济统计","queryUrl":urlConfig.ecoQueryUrl,"statCondition":[
		{"code":"asd201","name":"地区生产总值(单位:万元)","dataBaseAttr":"GRP"},
		{"code":"asd202","name":"工业总产值(单位:万元)","dataBaseAttr":"Industry_Value"},
		{"code":"asd203","name":"农业总产值(单位:万元)","dataBaseAttr":"Agri_Value"},
		{"code":"asd204","name":"财政收入(单位:万元)","dataBaseAttr":"Income"},
		{"code":"asd205","name":"财政支出(单位:万元)","dataBaseAttr":"Outcome"},
		{"code":"asd206","name":"固定资产投资总额(单位:万元)","dataBaseAttr":"Investment"}
	]},
	{"code":"asd300","name":"行业救灾队伍","queryUrl":urlConfig.refTroCount,"statCondition":[
		{"code":"asd201","name":"数量","dataBaseAttr":"count"}
	]},
	{"code":"asd400","name":"行政区医疗力量","queryUrl":urlConfig.medcUrl,"statCondition":[
		{"code":"asd401","name":"医院数量(单位:个)","dataBaseAttr":"hospital"},
		{"code":"asd402","name":"病床数量(单位:床)","dataBaseAttr":"bed"},
		{"code":"asd401","name":"急救车数量(单位:辆)","dataBaseAttr":"ambulance"},
		{"code":"asd402","name":"医生数量(单位:人)","dataBaseAttr":"doctor"},
		{"code":"asd401","name":"外科医生数量(单位:人)","dataBaseAttr":"surgery_dct"},
		{"code":"asd402","name":"骨科医生数量(单位:人)","dataBaseAttr":"orthopedist"},
		{"code":"asd401","name":"麻醉科医生数量(单位:人)","dataBaseAttr":"anesthetist"},
		{"code":"asd402","name":"护理人员数量(单位:人)","dataBaseAttr":"nurse"}
	]},
	{"code":"asd500","name":"大型企业","queryUrl":urlConfig.medcUrl,"statCondition":[
		{"code":"asd501","name":"数量","dataBaseAttr":"count"}
	]},
	{"code":"asd600","name":"城区疏散场地","queryUrl":urlConfig.evacSiteCount,"statCondition":[
		{"code":"asd601","name":"数量","dataBaseAttr":"count"}
	]},
	{"code":"asd700","name":"地震地质灾害危险区","queryUrl":urlConfig.geoHazardCount,"statCondition":[
		{"code":"asd701","name":"数量","dataBaseAttr":"count"}
	]},
	{"code":"asd800","name":"危险源统计","queryUrl":urlConfig.danSourceCount,"statCondition":[
		{"code":"asd801","name":"数量","dataBaseAttr":"count"}
	]},
	{"code":"asd900","name":"重大目标","queryUrl":urlConfig.sigObjecCount,"statCondition":[
		{"code":"asd901","name":"数量","dataBaseAttr":"count"}
	]},
	{"code":"asd1000","name":"学校统计","queryUrl":urlConfig.schoolCount,"statCondition":[
		{"code":"asd1001","name":"数量","dataBaseAttr":"count"}
	]}
];

//-----------------------异常速报左侧面板数据配置-------------------------------
var precursor_data = [
	{"code":"pd001","name":"地下水异常","status":[
		{"name":"发浑"},{"name":"冒泡"},{"name":"翻花"},{"name":"升温"},{"name":"变色"},{"name":"变味"},{"name":"水位突升、突降"},{"name":"泉源突然枯竭或涌出"},{"name":"井孔变形"}
	]},
	{"code":"pd002","name":"动物异常","status":[
		{"name":"冬蛇出洞"},{"name":"鱼跃水面"},{"name":"猪牛跳圈"},{"name":"鸡飞狗跳"}
	]},
	{"code":"pd003","name":"植物异常","status":[
		{"name":"反季节开花"},{"name":"反季节结果"},{"name":"突然再生"},{"name":"突然死亡"}
	]},
	{"code":"pd004","name":"地声异常","status":[
		{"name":"有如炮响雷鸣声"},{"name":"有如重车行驶声"},{"name":"有如大风鼓荡声"}
	]},
	{"code":"pd005","name":"地声异常","status":[
		{"name":"有如炮响雷鸣声"},{"name":"有如重车行驶声"},{"name":"有如大风鼓荡声"}
	]},
	{"code":"pd006","name":"地震云异常","status":[
		{"name":"出现地震云"}
	]},
	{"code":"pd007","name":"气象异常","status":[
		{"name":"天气闷热"},{"name":"久旱不雨"},{"name":"阴雨绵绵"},{"name":"黄雾四散"},{"name":"六月飞雪、冰雹"},{"name":"怪风狂起"}
	]},
	{"code":"pd008","name":"电磁异常","status":[
		{"name":"电视机失灵"},{"name":"收音机失灵"},{"name":"日光灯自然"}
	]},
	{"code":"pd009","name":"其他异常","status":""}
];


//---------------------震情速报子系统中震后灾情模块以及辅助决策子系统中灾情分布模块的左侧面板数据配置--------------------
var earthquakeDisaster_data = [
		{"code":"dd001","name":"震感","initFunc":"felt"},
		{"code":"dd002","name":"建筑物破坏","initFunc":"buildingDamage"},
		{"code":"dd003","name":"人员伤亡","initFunc":"casualties"},
		{"code":"dd004","name":"生命线系统破坏","initFunc":"lifelineSystemFail"},
		{"code":"dd005","name":"地质灾害","initFunc":"geologicHazards"},
		{"code":"dd006","name":"次生灾害","initFunc":"secondaryDisaster"},
		{"code":"dd007","name":"社会影响","initFunc":"socialInfluence"},
		{"code":"dd008","name":"其他灾害","initFunc":"otherDisasters"}
	];
	
//----------------------辅助决策子系统中辅助功能（资源分布、评估结果、 路径分析）中的数据配置 ---------------------------------------
var assistDec_sourseAttri = [
	{"name":"医院分布","dataset":urlConfig.hDataSet,"featureId":"hospital","picUrl":"jfinal-easyui/../static/images/featureIcon/yy.png"},
	{"name":"消防力量分布","dataset":urlConfig.fpDataSet,"featureId":"firePower","picUrl":"jfinal-easyui/../static/images/featureIcon/xfll.png"},
	{"name":"城区疏散场地分布","dataset":urlConfig.esDataSet,"featureId":"evacuationSite","picUrl":"jfinal-easyui/../static/images/featureIcon/sscd.png"},
	{"name":"专业救援队伍分布","dataset":urlConfig.prDataSet,"featureId":"professionalRescue","picUrl":"jfinal-easyui/../static/images/zyjydw/commonImg.png"},
	{"name":"物资储备仓库分布","dataset":urlConfig.sDataSet,"featureId":"storage","picUrl":"jfinal-easyui/../static/images/featureIcon/ck.png"}
];

var eval_sourseAttri = [
	{"name":"地震范围","featureId":"earthquckResultId"},
	{"name":"人口损失","featureId":"peopleResultId"},
	{"name":"房屋损毁","featureId":"houseResultId"},
	{"name":"生命线损毁","featureId":"lifelineResultId"},
];

//----------------------辅助决策子系统中应急预案模块左侧面板数据配置(注意："id"字段和"type"字段的值是与数据库一致的，不能随意改动)identify表示当前数据时树的那一层级--------------------------------------------
var contigencyPlan_data = [
	{"id":"620100","text":"兰州市","children":[
		{"countyId":"620100","text":"直属单位","type":"01","state":"closed"},
		{"text":"区县","type":"02","state":"closed","children":[
			{"id":"620102","text":"城关区","state":"closed","children":[
				{"countyId":"620102","text":"直属单位","type":"01","state":"closed"},
				{"countyId":"620102","text":"乡镇街道","type":"02","state":"closed"},
				{"countyId":"620102","text":"企业","type":"03","state":"closed"},
				{"countyId":"620102","text":"医院","type":"04","state":"closed"},
				{"countyId":"620102","text":"学校","type":"05","state":"closed"}
			]},
			{"id":"620103","text":"七里河区","state":"closed","children":[
				{"countyId":"620103","text":"直属单位","type":"01","state":"closed"},
				{"countyId":"620103","text":"乡镇街道","type":"02","state":"closed"},
				{"countyId":"620103","text":"企业","type":"03","state":"closed"},
				{"countyId":"620103","text":"医院","type":"04","state":"closed"},
				{"countyId":"620103","text":"学校","type":"05","state":"closed"}
			]},
			{"id":"620104","text":"西固区","state":"closed","children":[
				{"countyId":"620104","text":"直属单位","type":"01","state":"closed"},
				{"countyId":"620104","text":"乡镇街道","type":"02","state":"closed"},
				{"countyId":"620104","text":"企业","type":"03","state":"closed"},
				{"countyId":"620104","text":"医院","type":"04","state":"closed"},
				{"countyId":"620104","text":"学校","type":"05","state":"closed"}
			]},
			{"id":"620105","text":"安宁区","state":"closed","children":[
				{"countyId":"620105","text":"直属单位","type":"01","state":"closed"},
				{"countyId":"620105","text":"乡镇街道","type":"02","state":"closed"},
				{"countyId":"620105","text":"企业","type":"03","state":"closed"},
				{"countyId":"620105","text":"医院","type":"04","state":"closed"},
				{"countyId":"620105","text":"学校","type":"05","state":"closed"}
			]},
			{"id":"620111","text":"红古区","state":"closed","children":[
				{"countyId":"620111","text":"直属单位","type":"01","state":"closed"},
				{"countyId":"620111","text":"乡镇街道","type":"02","state":"closed"},
				{"countyId":"620111","text":"企业","type":"03","state":"closed"},
				{"countyId":"620111","text":"医院","type":"04","state":"closed"},
				{"countyId":"620111","text":"学校","type":"05","state":"closed"}
			]},
			{"id":"620121","text":"永登县","state":"closed","children":[
				{"countyId":"620121","text":"直属单位","type":"01","state":"closed"},
				{"countyId":"620121","text":"乡镇街道","type":"02","state":"closed"},
				{"countyId":"620121","text":"企业","type":"03","state":"closed"},
				{"countyId":"620121","text":"医院","type":"04","state":"closed"},
				{"countyId":"620121","text":"学校","type":"05","state":"closed"}
			]},
			{"id":"620122","text":"皋兰县","state":"closed","children":[
				{"countyId":"620122","text":"直属单位","type":"01","state":"closed"},
				{"countyId":"620122","text":"乡镇街道","type":"02","state":"closed"},
				{"countyId":"620122","text":"企业","type":"03","state":"closed"},
				{"countyId":"620122","text":"医院","type":"04","state":"closed"},
				{"countyId":"620122","text":"学校","type":"05","state":"closed"}
			]},
			{"id":"620123","text":"榆中县","state":"closed","children":[
				{"countyId":"620123","text":"直属单位","type":"01","state":"closed"},
				{"countyId":"620123","text":"乡镇街道","type":"02","state":"closed"},
				{"countyId":"620123","text":"企业","type":"03","state":"closed"},
				{"countyId":"620123","text":"医院","type":"04","state":"closed"},
				{"countyId":"620123","text":"学校","type":"05","state":"closed"}
			]}
		]},
		{"countyId":"620100","text":"企业","type":"03","state":"closed"},
		{"countyId":"620100","text":"医院","type":"04","state":"closed"},
		{"countyId":"620100","text":"学校","type":"05","state":"closed"}
	]}
	
];










