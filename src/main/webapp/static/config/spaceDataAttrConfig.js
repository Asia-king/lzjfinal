/*
 * 空间数据属性英文字段和对应的中文名称,有两个作用
 * 1、档鼠标移至地图上的某个图标时，显示该图标所代表的对象的信息
 * 2、在对空间数据进行条件查询时，用来组织sql语句
 * */
var spaceDataAttrConfig = {
	//疏散场地的数据
	evacuationSite:{
		NAME:"名称：",
		LOCATION:"地址：",
		CLASS:"类别：",
		Area:"面积(单位：平方米)：",
		ACCOMMODATE:"容纳人数(单位：万)：",
		ALTITUDE:"海拔（单位：米）："
	},
	
	//重大火灾、爆炸、有毒和放射危险源属性表
	dangerousSource:{
		UNITNAME:"所属单位名称：",
		POSTCODE:"邮政编码：",
		LOCATION:"位置描述：",
		FEATURE:"危险品类别：",
		STORAGE:"危险源储量：",
		CAPACITY:"主要设备抗震能力：",
		INTENSITY:"危险品仓库的抗震能力：",
		FIRE:"消防员人数：",
		CROWD:"周围100m内有无人口密集场所："
	},
	
	//地震地质灾害危险区分布
	geologivalHarbor:{
		CLASS:"灾害类型：",
		NOTE:"描述："
	},
	
	//学校分布
	schools:{
		FULL_NAME:"所在区县：",
		UNITNAME:"学校名称：",
		POSTCODE:"邮政编码：",
		CLASS:"学校性质：",
		SCALE:"学校类型：",
		PLAYGROUND:"是否有室外操场：",
		TEACHER:"教师人数：",
		STUDENT:"学生人数：",
		NOTE:"校舍建筑质量描述："
	},
	
	//旅游景点和自然保护区
	tourismSpot:{
		NAME:"名称：",
		POSTCODE:"邮政编码：",
		TYPE:"备注："
	},
	
	//文物保护单位
	landmark:{
		NAME:"名称：",
		POSTCODE:"邮政编码：",
		LOCATION:"位置描述：",
		GRADE:"保护级别："
	},
	
	//重大目标
	sigObjective:{
		NAME:"名称：",
		POSTCODE:"邮政编码：",
		LOCATION:"位置描述：",
		NOTE:"备注："
	},
	
	//专业救灾队伍
	professionalRescue:{
		NAME:"名称：",
		POSTCODE:"邮政编码：",
		LOCATION:"所在行政区：",
		TYPE:"力量种类：",
		TEL:"联系方式：",
		SCALE:"队伍规模：",
		MOTION_MODE:"机动方式：",
		CAPABILITY:"救援能力描述：",
		NOTE:"备注："
	},
	
	//消防力量
	firePower:{
		NAME:"名称：",
		POSTCODE:"邮政编码：",
		LOCATION:"所在位置：",
		STAFF:"消防人数：",
		TEL:"联系方式：",
		FIRE_TRUCK:"消防车辆：",
		NOTE:"消防能力描述："
	},
	
	//医院分布
	hospital:{
		NAME:"名称：",
		POSTCODE:"邮政编码：",
		LOCATION:"所在位置：",
		TEL:"联系方式：",
		BED:"病床数量：",
		ORTHOPEDIST:"骨科医生数量：",
		TYPE:"医院类别：",
		GRADE:"医院等级：",
		AMBULANCE:"急救车数量：",
		PLASMA:"库存血浆量：",
		DOCTOR:"医生数量：",
		SURGERY_DCT:"外科医生数量：",
		MEMBERSHIP:"所属部门：",
		ANESTHETIST:"麻醉科医生数量：",
		NURSE:"护理人员数量：",
		DETAILGRADE:"等级："
	},
	
	//物资储备仓库
	storage:{
		NAME:"名称：",
		POSTCODE:"邮政编码：",
		LOCATION:"所在位置：",
		TEL:"联系方式：",
		NOTE:"备注："
	},
	
	//地震台站
	observationSta:{
		NAME:"名称：",
		SLEVEL:"级别：",
		CLASS:"类别：",
		BASEMENT:"台址和台基条件：",
		TEL:"联系方式：",
		FAX:"传真：",
		MP:"手机：",
		EMAIL:"电子邮件地址：",
		ITEM:"检测项目：",
		INSTRUMENT:"所用的主要仪器：",
		COMMENT_USER:"备注："
	},
	
	//交通管制点
	entrances:{
		NAME:"名称：",
		LOCATION:"所在位置描述："
	},
	
	//潜在震源区
	potsSource:{
		NAME:"名称：",
		MU:"震级上限：",
		DIR1:"第一破裂方向(单位：度)：",
		P_1:"第一破裂方向概率：",
		DIR2:"第二破裂方向(单位:度)：",
		P_2:"第二破裂方向概率：",
		F1:"4.0级~5.4级地震发生概率：",
		F2:"5.5级~5.9级地震发生概率：",
		F3:"6.0级~6.4级地震发生概率：",
		F4:"6.5级~6.9级地震发生概率：",
		F5:"7.0级~7.4级地震发生概率：",
		F6:"7.5级以上地震发生概率："
	},
	
	//地震动峰值加速度
	peakAccel:{
		EPA:"地震动峰值加速度："
	},
	
	//历史地震目录
	historyEarthquake:{
		EVENTDATE:"地震发生时间：",
		EVENTTIME:"地震发生时间：",
		LOCATION:"位置描述：",
		LONGITUDE:"经度：",
		LATITUDE:"纬度：",
		MAGNITUDE:"震级：",
		DEPTH:"震源深度(单位:千米)："
	},
	
	//公路
	roads:{
		NAME:"名称：",
		LENGTH:"长度(单位：千米)：",
		WIDTH:"宽度(单位：米)：",
		CAPACITY:"最大载重量(单位：吨)："
	},
	
	//铁路
	railWay:{
		NAME:"名称：",
		LENGTH:"长度(单位：千米)："
	},
	
	//桥梁
	bridge:{
		NAME:"名称：",
		LOCATION:"所在位置：",
		LENGTH:"长度(单位:米)：",	
		WIDTH:"宽度(单位：米)：",
		MAX_LOAD:"最大载重量(单位：吨)：",	
		INTENSITY:"抗震设防烈度：",	
		STRUCTURE:"桥梁结构类型：",	
		BUILDTIME:"建筑年代："
	},
	
	//隧道
	tunnels:{
		NAME:"名称：",
		LOCATION:"所在位置：",	
		LENGTH:"长度(单位:米)：",	
		WIDTH:"宽度(单位：米)：",
		HEINGT:"最大允许通过高度(单位:米)：",	
		DOUBLE_LINE:"是否是复线隧道：",	
		INTENSITY:"抗震设防烈度：",		
		BUILDTIME:"建筑年代："
	},
	
	//水库
	reservior:{
		NAME:"名称：",
		LOCATION:"所在位置：",	
		STATUS:"描述：",	
		DAM_HEIGHT:"坝高：",
		DESIGN_VOLUME:"设计库容：",	
		PERENNIAL_VOLUME:"常年需水量：",	
		MAX_LEVEL:"最高水位：",		
		DAM_STRUCTURE:"坝体结构：",
		INTENSITY:"坝体设防烈度：",
		BUILDTIME:"建设年代："
	},
	
	//异常上报
	abnormalReport:{
		ABNORMAL_NAME:"异常名称：",
		X:"经度：",
		Y:"纬度：",
		ABNORMAL_STATE:"异常状态：",
		ADDRESS:"地址：",
		TIME:"上报时间：",
		USERNAME:"上报人：",
		VERBALIZE:"描述："
	},
	
	//灾情分布
	disasterDistribute:{
		TIME:"发生时间：",
		X:"坐标经度：",
		Y:"坐标纬度：",
		ADDRESS:"详细地址：",
		ABNORMAL_NAME:"事件类型：",
		ABNORMAL_STATE:"",
		USERNAME:"上报人：",
		DESCRIPTION:"备注："
	},
	
	//紧急事件
	emergencyDisposal:{
		NAME:"名称：",
		TIME:"发生时间：",
		X:"坐标经度：",
		Y:"坐标纬度：",
		USERNAME:"上报人：",
		ADDRESS:"详细地址：",
		DESCRIPTION:"备注："
	},
	
	//受灾群众安置
	peoplePlace:{
		NAME:"名称：",
		TIME:"发生时间：",
		X:"坐标经度：",
		Y:"坐标纬度：",
		ADDRESS:"详细地址：",
		TOTAL_NUM:"可容纳人数：",
		REAL_NUM:"实际容纳人数：",
		INJURED_NUM:"受伤人数：",
		MATERIAL:"物资配备情况：",
		MEDICAL:"医疗配备情况：",
		USERNAME:"上报人：",
		DESCRIPTION:"备注："
	},
	
	//物资运输与救援队伍
	rescueTeam:{
		NAME:"名称：",
		TIME:"时间：",
		DIS_STATE:"状态：",
		USERNAME:"上报人：",
		X:"坐标经度：",
		Y:"坐标纬度：",
		ADDRESS:"详细地址：",
		DESCRIPTION:"备注："
	},
	
	//摄像头
	camera:{
		NAME:"位置："
	},
	
	callhelp:{
		TIME:"上报时间：",
		USERNAME:"用户：",
		X:"坐标经度：",
		Y:"坐标纬度："
	}
	
	
};

var featureImgComm = "jfinal-easyui/../static/images/";
//关闭按钮（方形的）
var closeImg1 = featureImgComm + "close.png";
//关闭按钮（圆形的）
var closeImg2 = featureImgComm + "close.png";
//历史地震图标
var historyEarthquake = featureImgComm + "featureIcon/flag_red.png";
var mapSearchResultImg = featureImgComm + "map_search.png";
/*
 * 在专题图模块中
 * 1、当某一个空间数据有多种类型时，在地图上展示的时候需要不同的图标，这里做的就是某一个数据不同类型的图标
 * 2、某一类数据的图标
 * */
var dataDifferAttrClassify = {
	//危险源数据，有四类,分别对应数据库中CLASS字段的五个值1（易燃易爆）,2（剧毒）,3（腐蚀）,4（放射性）,5（其他）
	dangerousSource:{
		1:{
			img:featureImgComm+"marker/A.png",
			name:"易燃易爆"
		},
		2:{
			img:featureImgComm+"marker/B.png",
			name:"剧毒"
		},
		3:{
			img:featureImgComm+"marker/C.png",
			name:"腐蚀"
		},
		4:{
			img:featureImgComm+"marker/D.png",
			name:"放射性"
		},
		5:{
			img:featureImgComm+"marker/E.png",
			name:"其他"
		}
	},
	
	//医院
	hospital:featureImgComm+"marker/cluster2.png",
	
	//学校,分类对应数据表中的字段CLASS_1,有五个值，分别是：1（小学），2（中学），3（高校），4（幼儿园），5（一贯制（九年、十二年））
	school:{
		1:{
			img:featureImgComm+"marker/A.png",
			name:"小学"
		},
		2:{
			img:featureImgComm+"marker/B.png",
			name:"中学"
		},
		3:{
			img:featureImgComm+"marker/C.png",
			name:"高校"
		},
		4:{
			img:featureImgComm+"marker/D.png",
			name:"幼儿园"
		},
		5:{
			img:featureImgComm+"marker/E.png",
			name:"一贯制（九年、十二年）"
		}
	},
	
	//地址灾害隐患点,分别对应数据表中的字段CLASS_1，有6个值，1（滑坡），2（斜坡），3（地面塌陷），4（崩塌），5（泥石流），6(洪水)
	geologicalHazard:{
		1:{
			img:featureImgComm+"marker/A.png",
			name:"滑坡"
		},
		2:{
			img:featureImgComm+"marker/B.png",
			name:"斜坡"
		},
		3:{
			img:featureImgComm+"marker/C.png",
			name:"地面坍塌"
		},
		4:{
			img:featureImgComm+"marker/D.png",
			name:"崩塌"
		},
		5:{
			img:featureImgComm+"marker/E.png",
			name:"泥石流"
		},
		6:{
			img:featureImgComm+"marker/F.png",
			name:"洪水"
		}
	},
	
	//城区疏散场地，分别对应数据表中的字段Class_1，有5个值1（体育场），2（公园），3（广场），4（操场），5（绿地）
	evacuationSite:{
		1:{
			img:featureImgComm+"marker/A.png",
			name:"体育场"
		},
		2:{
			img:featureImgComm+"marker/B.png",
			name:"公园"
		},
		3:{
			img:featureImgComm+"marker/C.png",
			name:"广场"
		},
		4:{
			img:featureImgComm+"marker/D.png",
			name:"操场"
		},
		5:{
			img:featureImgComm+"marker/E.png",
			name:"绿地"
		}
	},
	
	//重点目标，对应数据表中FEATURE字段，1（文物保护区），2（政府办公地），3（酒店餐馆），4（银行金库），5（新闻广播机构），6（电力），7（水厂），8（石油燃气），9（工业厂区）
	sigObjective:{
		1:{
			img:featureImgComm+"marker/A.png",
			name:"文物保护区"
		},
		2:{
			img:featureImgComm+"marker/B.png",
			name:"政府办公地"
		},
		3:{
			img:featureImgComm+"marker/C.png",
			name:"酒店餐馆"
		},
		4:{
			img:featureImgComm+"marker/D.png",
			name:"银行金库"
		},
		5:{
			img:featureImgComm+"marker/E.png",
			name:"新闻广播机构"
		},
		6:{
			img:featureImgComm+"marker/F.png",
			name:"电力"
		},
		7:{
			img:featureImgComm+"marker/G.png",
			name:"水厂"
		},
		8:{
			img:featureImgComm+"marker/H.png",
			name:"石油燃气"
		},
		9:{
			img:featureImgComm+"marker/I.png",
			name:"工业厂区"
		}
	},
	
	//物资储备仓库
	storage:featureImgComm+"marker/cluster1.png",
	
	//交通管制点
	entrances:featureImgComm+"marker/cluster3.png"
};

/*
 * 数据仓库中feature图标样式的url
 * */
var featureImgs = {
	//地震台站
	obserStaFI:featureImgComm+"featureIcon/dztz.png",
	//城区疏散场地
	evacuSitFI:featureImgComm+"featureIcon/sscd.png",
	//交通管制点
	entranceFI:featureImgComm+"featureIcon/jtgzd.png",
	//重大火灾、爆炸、有毒和放射危险源
	dangSourFI:featureImgComm+"featureIcon/hbwxy.png",
	//地震地质灾害危险区
	geoHarFI:featureImgComm+"featureIcon/dzzhwxq.png",
	//学校
	schoolFI:featureImgComm+"featureIcon/school.png",
	//旅游景点和自然保护区
	tourismFI:featureImgComm+"featureIcon/lyjd.png",
	//文物保护单位
	landMarkFI:featureImgComm+"featureIcon/wwbhdw.png",
	//重大目标
	sigObjFI:featureImgComm+"featureIcon/zdmb.png",
	//消防力量
	firePowerFI:featureImgComm+"featureIcon/xfll.png",
	//专业救援队伍
	profeRescFI:featureImgComm+"featureIcon/zyjydw.png",
	//医院
	hospitalFI:featureImgComm+"featureIcon/yy.png",
	//物资仓库
	storageFI:featureImgComm+"featureIcon/ck.png",
	//水库
	reservior:featureImgComm + "featureIcon/sk.png"
};
/*
 *震后灾情
 * */
var zhzqFI = featureImgComm + "marker/marker.png";
/*
 * 辅助决策中Feature图标的样式
 * */
var fzjc_featureImgs = {
	//未被选中时的样式
	fzjcFI:featureImgComm + "marker/marker.png",
	//被选中时的样式
	fzjcFS:featureImgComm + "featureIcon/cluster_select.png",
	//救援队伍的三个状态
	fzjcRTL1:featureImgComm + "fzjc/team-blue.png",//准备救援
	fzjcRTL2:featureImgComm + "fzjc/team-red.png",//正在救援
	fzjcRTL3:featureImgComm + "fzjc/team-green.png",//完成救援
	//物资运输车的三个状态
	fzjcTGTL1:featureImgComm + "fzjc/che-blue.png",//准备救援
	fzjcTGTL2:featureImgComm + "fzjc/che-red.png",//正在救援
	fzjcTGTL3:featureImgComm + "fzjc/che-green.png",//完成救援
	callheplreport:featureImgComm+"yjhj.png"
	
}
