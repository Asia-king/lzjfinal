/*
 * 预评估模块
 */

MainApp.controller("preEvalCtrls", ["$scope","$cookieStore", function($scope,$cookieStore) {
	var pointVector,ellipseVector=[];
	var dldarray=[];
	var du=["O","Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ","Ⅷ","Ⅸ","Ⅹ","Ⅺ","Ⅻ","XⅢ"];
	var ddu=[];
	ddu["O"]=0;
	ddu["Ⅰ"]=1;
	ddu["Ⅱ"]=2;
	ddu["Ⅲ"]=3;
	ddu["Ⅳ"]=4;
	ddu["Ⅴ"]=5;
	ddu["Ⅵ"]=6;
	ddu["Ⅶ"]=7;
	ddu["Ⅷ"]=8;
	ddu["Ⅸ"]=9;
	ddu["Ⅹ"]=10;
	ddu["Ⅺ"]=11;
	ddu["Ⅻ"]=12;
	ddu["XⅢ"]=13;

	var countyname=["城关区","七里河区","安宁区","西固区","红古区","榆中县","皋兰县","永登县"];

	var peor=[];
	var sum=1;
	var househir=[];
	var housercr=[];
	var housebrr=[];
	var houseotr=[];
	//初始化
	$scope.preEvalModuleInit = function() {
		$scope.loaddld(urlConfig.dld);
		$scope.loadpop();
		$scope.queryBCF();
		addElementDiv("pre_ana_process","加载区域图...")
		addregion(urlConfig.earthquakeregion);
		addElementDiv("pre_ana_process","加载重力异常...")
		addFeature(urlConfig.bgzlyc);
		addElementDiv("pre_ana_process","加载莫霍面...")
		addFeature(urlConfig.mhmshfb);
		addElementDiv("pre_ana_process","加载峰值加速度...")
		addFeature(urlConfig.fzjsd);
		addElementDiv("pre_ana_process","加载反应谱特征...")
		addFeature(urlConfig.fyptzzq);
		addElementDiv("pre_ana_process","加载烈度区划...")
		addFeature(urlConfig.dzldqh);
		addElementDiv("pre_ana_process","加载等震线...")
		addFeature(urlConfig.zhdzx);
		addElementDiv("pre_ana_process","加载断裂带...")
		addFeature(urlConfig.dld);
		//$scope.center(parseFloat(35389249.87343),parseFloat(3992960.8477953393));
		//$scope.compu(parseFloat(6.5),parseFloat(35389249.87343),parseFloat(3992960.8477953393),20);
	}
	function addElementDiv(obj,title) {
		var parent = document.getElementById(obj);

		//添加 div
		var div = document.createElement("div");
		div.innerHTML=title;
		parent.appendChild(div);
	}
	function addFeature(serverURL){
		var check_sql = "SMID > 0";
		querySpaceService.comSqlService(serverURL,check_sql,function checkResult(checkResults){
			var features, result = checkResults.result.features;
			vectorbase.addFeatures(result);
		});
	}

	function addregion(serverURL){
		var check_sql = "SMID > 0";
		querySpaceService.comSqlService(serverURL,check_sql,function checkResult(checkResults){
			var features, result = checkResults.result.features;
			for(var i=0;i<result.length;i++){
				result[i].style = {
					label:result[i].attributes.省名+result[i].attributes.县市名,
					fillColor: "#D6E3F1",
					strokeColor: "#4192c9",
				};
			}
			vectorbase.addFeatures(result);
		});
	}

	$scope.loaddld=function(serverURL){
		var check_sql = "SMID > 0";
		querySpaceService.comSqlService(serverURL,check_sql,function checkResult(checkResults) {
			dldarray = checkResults.result.features;
		})
	}
	$scope.loadpop=function(){
		var check_sql = "SMID > 0";
		querySpaceService.comSqlService(urlConfig.popDensity,check_sql,function checkResult(checkResults){
			var check_featurespop = checkResults.result.features;
			//清除地图上地图查询的结果
			if(check_featurespop.length > 0) {
				for(var i=0;i<check_featurespop.length;i++){
					peor[check_featurespop[i].attributes.COUNTY_ID]=parseFloat(check_featurespop[i].attributes.POP_DENSITY);
					sum+=parseFloat(check_featurespop[i].attributes.POP_DENSITY);
					//alert(peor[check_featurespop[i].attributes.COUNTY_ID]+":"+sum);
				}
			}
		})
	}

	$scope.queryBCF=function(){
		$.ajax({
			type:"post",
			url:PATH + urlConfig.builConUrl,
			data:{parameter:"ALL"},
			contentType:"application/x-www-form-urlencoded;charset=UTF-8",
			async:true,
			success:function(result){
				var housesum=[];
				var househi=[];
				var houserc=[];
				var housebr=[];
				var houseot=[];
				for(var i=0;i<result.length;i++){
					housesum[result[i].co_name]=0;
					househi[result[i].co_name]=0;
					houserc[result[i].co_name]=0;
					housebr[result[i].co_name]=0;
				}
				for(var i=0;i<result.length;i++){
					//alert(result[i].co_name+":"+result[i].tot_area+":"+result[i].hi_rise+":"+result[i].rcframe+":"+result[i].br_structure);
					if(result[i].tot_area==null){
						result[i].tot_area=1;
					}
					if(result[i].hi_rise==null){
						result[i].hi_rise=1;
					}
					if(result[i].rcframe==null){
						result[i].rcframe=1;
					}
					if(result[i].br_structure==null){
						result[i].br_structure=1;
					}
					//alert(result[i].co_name+":"+result[i].tot_area+":"+result[i].hi_rise+":"+result[i].rcframe+":"+result[i].br_structure);

					if(result[i].name!=null){
						housesum[result[i].co_name]=parseInt(housesum[result[i].co_name])+parseInt(result[i].tot_area)
						househi[result[i].co_name]=parseInt(househi[result[i].co_name])+parseInt(result[i].tot_area);
						houserc[result[i].co_name]=parseInt(houserc[result[i].co_name])+parseInt(result[i].tot_area);
						housebr[result[i].co_name]=parseInt(housebr[result[i].co_name])+parseInt(result[i].tot_area);
					}else{
						housesum[result[i].co_name]=parseInt(result[i].tot_area);
						househi[result[i].co_name]=parseInt(result[i].hi_rise);
						houserc[result[i].co_name]=parseInt(result[i].rcframe);
						housebr[result[i].co_name]=parseInt(result[i].br_structure);
					}
				}
				for(var i=0;i<countyname.length;i++){
					househir[countyname[i]]=househi[countyname[i]]/housesum[countyname[i]];
					housercr[countyname[i]]=houserc[countyname[i]]/housesum[countyname[i]];
					housebrr[countyname[i]]=housebr[countyname[i]]/housesum[countyname[i]];
					houseotr[countyname[i]]=(housesum[countyname[i]]-housebr[countyname[i]]-houserc[countyname[i]]-househi[countyname[i]])/housesum[countyname[i]];
					//alert(countyname[i]+":"+househir[countyname[i]]+":"+housercr[countyname[i]]+":"+housebrr[countyname[i]]+":"+houseotr[countyname[i]]);
				}
			}
		})
	}

//启动评估
	$("#pre_earth_ana_button").click(function(){
		var dval=$("#pre_e_earth_level").attr("value");
		var lon=$("#pre_pos_lon").attr("value");
		var lat=$("#pre_pos_lat").attr("value");
		var deepth=$("#pre_e_earth_deepth").attr("value");

		$("#pre_ana_process").empty();
		addElementDiv("pre_ana_process","范围评估开始了...")
		compuArrageCounty(parseFloat(lon),parseFloat(lat));
		addElementDiv("pre_ana_process","...")
		addElementDiv("pre_ana_process","房屋评估开始...")
		//compuHouse();
		addElementDiv("pre_ana_process","...")
		addElementDiv("pre_ana_process","人口评估开始...")
		//compuPoepleStreet();
		$scope.compuPoeple(parseFloat(lon),parseFloat(lat));
		addElementDiv("pre_ana_process","...")
		addElementDiv("pre_ana_process","生命线评估开始...")
		compuLifeline(parseFloat(lon),parseFloat(lat));
		addElementDiv("pre_ana_process","...")
		//alert(parseFloat(dval)+":"+parseFloat(lon)+":"+parseFloat(lat));
		//$scope.center(parseFloat(lon)-76000.0000,parseFloat(lat)+33000.0000);
		//$scope.compu(parseFloat(dval),parseFloat(lon)-76000.0000,parseFloat(lat)+33000.0000,deepth);
		$scope.center(parseFloat(lon),parseFloat(lat));
		$scope.compu(parseFloat(dval),parseFloat(lon),parseFloat(lat),deepth);

	})

	$("#pre_earth_reset_button").click(function(){
		vectorLayer4.removeAllFeatures();
		vectorLayer3.removeAllFeatures();
		vectorLayer2.removeAllFeatures();
		vectorLayer1.removeAllFeatures();
		vectorLayer.removeAllFeatures();
	})


	//烈度评估
	function compuangle(jd,wd){
		//var check_sql = "SMID > 0";
		//querySpaceService.comSqlService(serverURL,check_sql,function checkResult(checkResults){
			//var features, result = checkResults.result.features;
			var result=dldarray;
		//alert(result.length);
		//alert("J:"+jd+",W:"+wd);
			if(result.length > 0){
				var angle=-20;
				var mind=99999999999999;
				for(var i=0;i<result.length;i++) {
					//alert(result[i].attributes.NAME);
					//alert(result[i].geometry.getVertices(true)[0].x+":"+result[i].geometry.getVertices(true)[0].y+";"+result[i].geometry.getVertices(true)[1].x+":"+result[i].geometry.getVertices(true)[1].y);
					var A=result[i].geometry.getVertices(true)[1].x-result[i].geometry.getVertices(true)[0].x;
					var B=result[i].geometry.getVertices(true)[0].y-result[i].geometry.getVertices(true)[1].y;
					var c1=result[i].geometry.getVertices(true)[0].y*result[i].geometry.getVertices(true)[1].x;
					var c2=result[i].geometry.getVertices(true)[0].x*result[i].geometry.getVertices(true)[1].y;
					var c3=result[i].geometry.getVertices(true)[0].x*result[i].geometry.getVertices(true)[0].y;
					var C=c1+c2-2*c3;
					var AA=Math.pow(A,2);
					var BB=Math.pow(B,2);
					var base=Math.sqrt(AA+BB);
					var CA=(result[i].geometry.getVertices(true)[1].x+result[i].geometry.getVertices(true)[0].x)/2;
					var CB=(result[i].geometry.getVertices(true)[0].y+result[i].geometry.getVertices(true)[1].y)/2;
					var CL=Math.sqrt(Math.pow(jd-CA,2)+Math.pow(wd-CB,2));
					//alert("J:"+jd+",W:"+wd);
					var d=Math.abs(A*jd+B*wd-C)/base;
					var aa=Math.atan(-B/A)*180/Math.PI;
					//alert(result[i].attributes.NAME+"-d:"+d+",aa:"+aa);
					if(mind>CL){
						mind=CL;
						angle=aa;
					}
				}
				return angle;
			}
		//});
		return -20;
	}
	$scope.center= function(jd,wd){
		vectorLayer.removeFeatures(pointVector);
		var point= new SuperMap.Geometry.Point(jd,wd);
		pointVector = new SuperMap.Feature.Vector(point);
		pointVector.style={
			fillColor:"blue",
			strokeColor:"green",
			pointRadius:6
		};
		vectorLayer.addFeatures([pointVector]);

		map.setCenter(new SuperMap.LonLat(jd,wd),5);
	}

	$scope.compu= function(dval,jd,wd,deepth){
		//显示地图范围
		//map.setCenter(new SuperMap.setCenter(jd,wd), 0);
		vectorLayer.removeFeatures(ellipseVector);

		ellipseVector=[];

		var num=0;
		if(deepth<20){
			dval+=(20-deepth)*0.125;
		}else if(deepth>20){
			dval-=(deepth-20)*0.125;
		}
		var rot=compuangle(jd,wd);
		//alert(rot);
		for(var i=5;i<14;i++){


			var Rl=Math.pow(Math.E,(4.864+1.464*dval-i)/1.783)-22;
			var Rs=Math.pow(Math.E,(3.032+1.321*dval-i)/1.343)-9;
			//var Rl=Math.pow(Math.E,(5.643+1.538*dval-i)/2.109)-25;
			//var Rs=Math.pow(Math.E,(2.941+1.363*dval-i)/1.494)-7;
			if(Rl>0&&Rs>0&&Rs<400){

				//alert(Rl+":"+Rs);
				var points=createEllipse(jd,wd,Rl*1000,Rs*1000);
				var linearRings = new SuperMap.Geometry.LinearRing(points),
					region = new SuperMap.Geometry.Polygon([linearRings]);
				var point= new SuperMap.Geometry.Point(jd,wd);
				region.rotate(rot,point);
				ellipseVector[num]= new SuperMap.Feature.Vector(region);


				ellipseVector[num].style={
					label:du[i],
					labelXOffset:2*Rl,
					labelYOffset:-2*Rs,
					fontColor:"#F7FD27",
					fillColor:"red",
					strokeColor:"#FDFD17",
					fillOpacity:0.8*i/13,
					labelSelect:"true",
				};

				vectorLayer.addFeatures([ellipseVector[num]]);
				//EarthquackResultLayer.addFeatures([ellipseVector[num]]);
				//EarthquackResultLayer.addFeatures([geotextFeature[num]]);
				num++;
				map.setCenter(new SuperMap.LonLat(jd,wd),0);
			}
		}
		//vectorLayer.display(false);
        //
		//alert(ellipseVector.length);
		$scope.$emit("PEVAResult", ellipseVector);//将信息传递给父controller
		$cookieStore.put("pevalarrresult", dval+":"+jd+":"+wd+":"+deepth);

		//EarthquackResultLayer.setVisibility(false);
	}

	function createEllipse(x,y,a,b){
		var step = (a > b) ? 1 / a : 1 / b,points=[];
		//step是等于1除以长轴值a和b中的较大者
		//i每次循环增加1/step，表示度数的增加
		//这样可以使得每次循环所绘制的路径（弧线）接近1像素
		for (var i = 0; i < 2 * Math.PI; i += step)
		{
			//参数方程为x = a * cos(i), y = b * sin(i)，
			//参数为i，表示度数（弧度）
			var point=new SuperMap.Geometry.Point(x+a*Math.cos(i),y+b*Math.sin(i));
			points.push(point);
		}
		return points;
	}

	//范围评估
	//按区县
	function compuArrageCounty(jd,wd){
		var check_sql = "SMID > 0";
		vectorLayer1.removeAllFeatures();
		var point= new SuperMap.Geometry.Point(jd,wd);
		querySpaceService.comSqlService(urlConfig.countyLine,check_sql,function checkResult(checkResults1){
				var check_features1 = checkResults1.result.features;
				//清除地图上地图查询的结果
				//vectorLayer.removeFeatures(mapTool_saveFeatures);
				//mapTool_saveFeatures = [];//重置保存查询结果的数组
				//alert(check_features.length);
				if(check_features1.length > 0){
					var JL=[],SUMJL=0;
					for(var i=0;i<check_features1.length;i++) {
						var geometrycentoid=check_features1[i].geometry.getCentroid();
						var x=geometrycentoid.x,y=geometrycentoid.y;
						//alert((jd-x)+":"+(wd-y));
						var juli=Math.sqrt(Math.pow(jd-x,2)+Math.pow(wd-y,2));
						JL[check_features1[i].attributes.COUNTY_ID]=juli;
						SUMJL+=juli;
						//alert(juli);
					}
					for(var i=0;i<check_features1.length;i++) {

						check_features1[i].id = "placeAddress_"+i;


						var geometrycentoid=check_features1[i].geometry.getCentroid();



						//alert(geometrycentoid);
						var Y=false,j=ellipseVector.length-1;
						var tmp=j+1;
						//alert("度区:"+tmp);
						while(!Y&&j>=0){
							//var bounds=ellipseVector[j].geometry.getBounds();
							//alert(bounds);
							var Y=ellipseVector[j].geometry.intersects(geometrycentoid);
							//alert(ellipseVector[j].geometry.distanceTo(geometrycentoid));
							j--;
						}
						j++;
						var YC=check_features1[i].geometry.intersects(point);

						//alert(ellipseVector[j].style.label);
						//alert("Y:"+Y+","+j+"YC:"+YC);
						var r1= JL[check_features1[i].attributes.COUNTY_ID]/SUMJL;
						var rr1=1/(r1*100);
						//rr1*=0.3;
						var r3=0;
						if(YC==true){
							r3=ddu[ellipseVector[ellipseVector.length-1].style.label]/13;
						}else{
							r3=ddu[ellipseVector[j].style.label]/13;
						}
						var r=rr1*r3*10;
						//alert("震中距:"+rr1+",烈度:"+r3+",权:"+r);
						check_features1[i].style = {
							fillColor: "red",
							strokeColor: "#C1FFC1",
							fillOpacity: r
						};
						vectorLayer1.addFeatures(check_features1[i]);
						//map.setCenter(new SuperMap.LonLat(x,y));
					}

					return;
				}
		});

	}
	//按街道
	function compuArrageStreet(jd,wd){
		var check_sql = "SMID > 0";
		querySpaceService.comSqlService(urlConfig.streetLine,check_sql,function checkResult(checkResults){
			var check_features = checkResults.result.features;
			//清除地图上地图查询的结果
			//vectorLayer.removeFeatures(mapTool_saveFeatures);
			//mapTool_saveFeatures = [];//重置保存查询结果的数组
			//alert(check_features.length);
			if(check_features.length > 0){
				for(var i=0;i<check_features.length;i++) {
					check_features[i].style = {
						fillColor: "red",
						strokeColor: "#C1FFC1",
						fillOpacity: 0.5
					};
					check_features[i].id = "placeAddress_"+i;
					//mapTool_saveFeatures.push(check_features[0]);
					vectorLayer.addFeatures(check_features);
					//map.setCenter(new SuperMap.LonLat(x,y));

				}
				return;
			}
		});
	}


	//人口评估
	//按区县
	$scope.compuPoeple=function(jd,wd){
		var check_sql = "SMID > 0";
		vectorLayer2.removeAllFeatures();
		var point= new SuperMap.Geometry.Point(jd,wd);
		querySpaceService.comSqlService(urlConfig.countyLine,check_sql,function checkResult(checkResults1){
			var check_features1 = checkResults1.result.features;
			//清除地图上地图查询的结果
			//vectorLayer.removeFeatures(mapTool_saveFeatures);
			//mapTool_saveFeatures = [];//重置保存查询结果的数组
			//alert(check_features.length);
			if(check_features1.length > 0){
				var JL=[],SUMJL=0;
				for(var i=0;i<check_features1.length;i++) {
					var geometrycentoid=check_features1[i].geometry.getCentroid();
					var x=geometrycentoid.x,y=geometrycentoid.y;
					//alert((jd-x)+":"+(wd-y));
					var juli=Math.sqrt(Math.pow(jd-x,2)+Math.pow(wd-y,2));
					JL[check_features1[i].attributes.COUNTY_ID]=juli;
					SUMJL+=juli;
					//alert(juli);
				}
				for(var i=0;i<check_features1.length;i++) {

					check_features1[i].id = "placeAddress_"+i;
					//alert(check_features1[i].attributes.NAME_1);
					//alert(check_features[i].geometry.getArea());
					//alert("B:"+peor[check_features[i].attributes.COUNTY_ID]);
					var r0=peor[check_features1[i].attributes.COUNTY_ID]/sum;
					//r0*=0.2;


					var geometrycentoid=check_features1[i].geometry.getCentroid();



					//alert(geometrycentoid);
					var Y=false,j=ellipseVector.length-1;
					var tmp=j+1;
					//alert("度区:"+tmp);
					while(!Y&&j>=0){
						//var bounds=ellipseVector[j].geometry.getBounds();
						//alert(bounds);
						var Y=ellipseVector[j].geometry.intersects(geometrycentoid);
						//alert(ellipseVector[j].geometry.distanceTo(geometrycentoid));
						j--;
					}
					j++;
					var YC=check_features1[i].geometry.intersects(point);

					//alert(ellipseVector[j].style.label);
					//alert("Y:"+Y+","+j+"YC:"+YC);
					var r1= JL[check_features1[i].attributes.COUNTY_ID]/SUMJL;
					var rr1=1/(r1*100);
					//rr1*=0.3;
					var r3=0;
					if(YC==true){
						r3=ddu[ellipseVector[ellipseVector.length-1].style.label]/13;
					}else{
						r3=ddu[ellipseVector[j].style.label]/13;
					}
					//r3*=0.5;
					var r=r0*rr1*r3*100;
					//alert("人密:"+r0+",震中距:"+rr1+",烈度:"+r3+",权:"+r);
					check_features1[i].style = {
						fillColor: "red",
						strokeColor: "#C1FFC1",
						fillOpacity: r
					};
					vectorLayer2.addFeatures(check_features1[i]);
					//map.setCenter(new SuperMap.LonLat(x,y));
				}

				return;
			}
		});
	}
	//按街道
	//街道级面积数据不全
	function compuPoepleStreet(jd,wd){
		var check_sql = "SMID > 0";
		var peor=[];
		querySpaceService.comSqlService(urlConfig.streetLine,check_sql,function checkResult(checkResults){
			var check_features = checkResults.result.features;
			if(check_features.length > 0){
				for(var i=0;i<check_features.length;i++) {
					peor[check_features[i].attributes.STREET_ID]=check_features[i].geometry.getArea();
				}
				$.ajax({
					type:"post",
					url:PATH + urlConfig.popQueryUrl,
					data:{parameter:"ALL"},
					contentType:"application/x-www-form-urlencoded;charset=UTF-8",
					async:true,
					success:function(result){
						for(var i=0;i<result.length;i++){
							if(result[i].town_id!=null){
								alert(result[i].Total);
								alert(peor[result[i].town_id]);
							}
						}

					}
				})
			}
		});
	}

	//房屋评估
	function compuHouse(jd,wd){
		var check_sql = "SMID > 0";
		var A7=[
			[0.88,0.12,0,0,0],
			[0.75,0.23,0.02,0,0],
			[0.55,0.3,0.103,0.015,0.002],
			[0.35,0.305,0.255,0.075,0.015],
			[0.15,0.205,0.405,0.165,0.075]
		];
		var B7=[
			[0.6929,0.2491,0.0462,0.0106,0.0012],
			[0.6724,0.2171,0.0765,0.028,0.0069],
			[0.5328,0.2333,0.144,0.0667,0.0232],
			[0.3365,0.2341,0.2222,0.1367,0.0704],
			[0.1096,0.1614,0.2553,0.2667,0.211]
		];
		var B8=[
			[0.7673,0.2954,0.0298,0.0067,0.0008],
			[0.7754,0.1564,0.0464,0.0172,0.0046],
			[0.6835,0.1721,0.09,0.0398,0.0146],
			[0.5318,0.191,0.1524,0.0822,0.0426],
			[0.28,0.1952,0.2195,0.1764,0.1289]
		];
		var C=[
			[0.49,0.2715,0.1505,0.0676,0.0182],
			[0.28,0.2129,0.2207,0.2027,0.0836],
			[0.12,0.1633,0.2309,0.3022,0.1228],
			[0.08,0.1053,0.1766,0.2608,0.3767],
			[0.022,0.0481,0.1191,0.1721,0.6384]
		];
		var D=[
			[0.075,0.165,0.405,0.205,0.15],
			[0.015,0.075,0.255,0.305,0.35],
			[0.002,0.015,0.103,0.33,0.55],
			[0,0,0.02,0.23,0.75],
			[0,0,0,0.12,0.88]
		];
		var check_sql = "SMID > 0";
		vectorLayer3.removeAllFeatures();
		var point= new SuperMap.Geometry.Point(jd,wd);
		querySpaceService.comSqlService(urlConfig.countyLine,check_sql,function checkResult(checkResults1){
			var check_features1 = checkResults1.result.features;
			//清除地图上地图查询的结果
			//vectorLayer.removeFeatures(mapTool_saveFeatures);
			//mapTool_saveFeatures = [];//重置保存查询结果的数组
			//alert(check_features.length);
			if(check_features1.length > 0){
				var JL=[],SUMJL=0;
				for(var i=0;i<check_features1.length;i++) {
					var geometrycentoid=check_features1[i].geometry.getCentroid();
					var x=geometrycentoid.x,y=geometrycentoid.y;
					//alert((jd-x)+":"+(wd-y));
					var juli=Math.sqrt(Math.pow(jd-x,2)+Math.pow(wd-y,2));
					JL[check_features1[i].attributes.COUNTY_ID]=juli;
					SUMJL+=juli;
					//alert(juli);
				}
				for(var i=0;i<check_features1.length;i++) {

					check_features1[i].id = "placeAddress_"+i;
					var geometrycentoid=check_features1[i].geometry.getCentroid();

					//alert(geometrycentoid);
					var Y=false,j=ellipseVector.length-1;
					var tmp=j+1;
					//alert("度区:"+tmp);
					while(!Y&&j>=0){
						//var bounds=ellipseVector[j].geometry.getBounds();
						//alert(bounds);
						var Y=ellipseVector[j].geometry.intersects(geometrycentoid);
						//alert(ellipseVector[j].geometry.distanceTo(geometrycentoid));
						j--;
					}
					j++;
					var YC=check_features1[i].geometry.intersects(point);

					//alert(ellipseVector[j].style.label);
					//alert("Y:"+Y+","+j+"YC:"+YC);
					var r1= JL[check_features1[i].attributes.COUNTY_ID]/SUMJL;
					var rr1=1/(r1*100);
					//rr1*=0.3;
					var r3=0;
					if(YC==true){
						r3=ddu[ellipseVector[ellipseVector.length-1].style.label];
					}else{
						r3=ddu[ellipseVector[j].style.label];
					}
					if(r3>5){

					}
					var r=rr1*r3*10;
					alert("结构:"+",震中距:"+rr1+",烈度:"+r3+",权:"+r);
					check_features1[i].style = {
						fillColor: "red",
						strokeColor: "#C1FFC1",
						fillOpacity: r
					};
					vectorLayer3.addFeatures(check_features1[i]);
					//map.setCenter(new SuperMap.LonLat(x,y));
				}
				return;
			}
		});


	}
	//生命线评估
	function compuLifeline(jd,wd){
		var check_sql = "SMID > 0";
		vectorLayer4.removeAllFeatures();
		querySpaceService.comSqlService(urlConfig.roadDataSet,check_sql,function checkResult(checkResults){
			var features = checkResults.result.features;
			//给feature设置样式
			for (var i=0; i<features.length; i++) {
				//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
				features[i].id = "tunnels_"+features[i].attributes.SMID;
				var centerPoint = features[i].geometry.getCentroid();
				features[i].geometry.x = centerPoint.x;
				features[i].geometry.y = centerPoint.y;
			}
			vectorLayer4.addFeatures(features);
		});
		querySpaceService.comSqlService(urlConfig.railWayDataSet,check_sql,function checkResult(checkResults){
			var features = checkResults.result.features;
			//给feature设置样式
			for (var i=0; i<features.length; i++) {
				//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
				features[i].id = "tunnels_"+features[i].attributes.SMID;
				var centerPoint = features[i].geometry.getCentroid();
				features[i].geometry.x = centerPoint.x;
				features[i].geometry.y = centerPoint.y;
			}
			vectorLayer4.addFeatures(features);
		});
		querySpaceService.comSqlService(urlConfig.bridge1DataSet,check_sql,function checkResult(checkResults){
			var features = checkResults.result.features;
			//给feature设置样式
			for (var i=0; i<features.length; i++) {
				//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
				features[i].id = "tunnels_"+features[i].attributes.SMID;
				var centerPoint = features[i].geometry.getCentroid();
				features[i].geometry.x = centerPoint.x;
				features[i].geometry.y = centerPoint.y;
			}
			vectorLayer4.addFeatures(features);
		});
		querySpaceService.comSqlService(urlConfig.bridge2DataSet,check_sql,function checkResult(checkResults){
			var features = checkResults.result.features;
			//给feature设置样式
			for (var i=0; i<features.length; i++) {
				//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
				features[i].id = "tunnels_"+features[i].attributes.SMID;
				var centerPoint = features[i].geometry.getCentroid();
				features[i].geometry.x = centerPoint.x;
				features[i].geometry.y = centerPoint.y;
			}
			vectorLayer4.addFeatures(features);
		});
		querySpaceService.comSqlService(urlConfig.tunnelDataSet,check_sql,function checkResult(checkResults){
			var features = checkResults.result.features;
			//给feature设置样式
			for (var i=0; i<features.length; i++) {
				//设置这个标识evacuationSite_是为了区分当前的feature是哪一类数据的结果
				features[i].id = "tunnels_"+features[i].attributes.SMID;
				var centerPoint = features[i].geometry.getCentroid();
				features[i].geometry.x = centerPoint.x;
				features[i].geometry.y = centerPoint.y;
			}
			vectorLayer4.addFeatures(features);
		});
	}

}]);



