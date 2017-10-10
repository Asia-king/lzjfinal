var measureControl;//距离测量
var measureControl2;//面积测量
var measureIndex=0; //当前进行量算次数
var preGeoLen;     //长度
var AllFeatures={}; //存储的绘制变量

var styleLine = {
    strokeWidth: 3,
    strokeLinecap: "round",
    strokeOpacity: 1,
    strokeColor: "#569cf1",
    strokeDashstyle: "solid"
},
stylePoint = {
    pointRadius: 4,
    graphicName: "square",
    fillColor: "white",
    fillOpacity: 1,
    strokeWidth: 1,
    strokeOpacity: 1,
    strokeColor: "#569cf1"
};
var sketchSymbolizers = {
    "Point": {
        pointRadius: 0,
        graphicName: "square",
        fillColor: "white",
        fillOpacity: 1,
        strokeWidth: 1,
        strokeOpacity: 1,
        strokeColor: "#333333"
    },
    "Line": {
        strokeWidth: 3,
        strokeLinecap: "round",
        strokeOpacity: 1,
        strokeColor: "#569cf1",
        strokeDashstyle: "dash"
    },
    "Polygon": {
        strokeWidth: 2,
        strokeOpacity: 1,
        strokeColor: "#569cf1",
        fillColor: "red",
        fillOpacity: 0.3
    }
};

var meatureTipDiv=
    "<div id='meatureTipDiv' style='font-size:13px;background-color:#fff;border:1px solid rgb(86,156,241);padding:2px;white-space:nowrap;font-family:Arial;position:absolute;z-index:2000;left:&LEFT;top:&TOP;'>"
    +"&CONTENT"
    +"</div>"
    
var startDiv = 
"<div style='position: absolute;font-size: 12px; font-family: Arial; white-space: nowrap; height: 17px; background-image: url(../modules/images/measureDis_box_bg.gif);'>"
+   "<div style='position: relative; display: inline; height: 17px; line-height: 140%; padding: 0px 2px; white-space: nowrap;'>起点</div>"
+   "<div style='position: absolute; top: 0px; left: -2px; background-image: url(../modules/images/measureDis_box_l.gif); width: 2px; height: 17px;'></div>"
+   "<div style='position: absolute; top: 0px; right: -2px; background-image: url(../modules/images/measureDis_box_r.gif); width: 2px; height: 17px;'></div>"
+"</div>";

var resultDiv = 
"<div style='position: absolute; z-index: 300; font-size: 12px; font-family: Arial; white-space: nowrap; height: 17px; background-image: url(../modules/images/measureDis_box_bg.gif);'>"
+   "<div style='position: relative; display: inline; height: 17px; line-height: 140%; padding: 0px 2px; white-space: nowrap;'><strong>"
+       "&DISTANCE</strong>" + " &UNIT" 
+   "</div>"
+   "<div style='position: absolute; top: 0px; left: -2px; background-image: url(../modules/images/measureDis_box_l.gif); width: 2px; height: 17px;'></div>"
+   "<div style='position: absolute; top: 0px; right: -2px; background-image: url(../modules/images/measureDis_box_r.gif); width: 2px; height: 17px;'></div>"
+"</div>";
    
var endDiv = 
 "<div style='position: absolute; z-index: 2100; border: 1px solid rgb(86, 156, 241); background-color: rgb(255, 255, 255); white-space: nowrap; font-size: 13px; padding: 2px; font-family: Arial;'>"
+   "<span style='margin: 0px 4px; float: left;'>"
+    "总长：<strong>" + "&DISTANCE" + "</strong>" + " " + "&UNIT" + "</span>"
+   "<img id=measureResultClose_" + "&MEATUREINDEX" +" hspace='0' src='jfinal-easyui/../static/images/close.png' style='width: 14px; height: 14px; cursor: pointer; position: relative; margin: 2px 2px -2px; display: inline-block;'>"
+ "</div>";
  
  
var measureLayer;
var measureMap;

var MeastureClass = {
	/*
	 * 距离测量
	 * _map:当前使用的地图
	 * _layer：进行测量的图层
	 * */
	meastureDistance:function(_map,_layer){
		if(measureControl2){
	    	measureControl2.deactivate();
	    }
		if(measureIndex > 0){
			clearMeasureResult(measureIndex);
		}
		measureIndex++;//量算次数的标识
		AllFeatures[measureIndex]={features:[],popup:[]};//存储每次量算时地图上标绘的所有元素
		
		measureMap = _map;
		measureLayer = _layer;
		//实例化Measure控件，进行距离测量
		measureControl=new SuperMap.Control.Measure(
	        SuperMap.Handler.Path, {
	            persist:false,
	            immediate:true,
	            geodesic: false,
	            handlerOptions: {
	                layerOptions: {
//	                    styleMap: styleMap
	                }
	            }
	        }
	     );
	     
	     //监听 measure 和 measurepartial 两个事件,量算完成时触发 measure事件，当点被添加到量算过程中时触发 measurepartial 
	     measureControl.events.on({
	        "measure": diatanceMeasureFun,
	        "measurepartial": diatancemeasurepartialFun
	    });
       
	    measureMap.addControl(measureControl);//测试
	    measureControl.activate();
	    
	},
	
	/*
	 * 面积测量
	 * _map:当前使用的地图
	 * _layer：进行测量的图层
	 * */
	meastureArea:function(_map,_layer){
		if(measureControl){
	    	measureControl.deactivate();
	    }
		if(measureIndex > 0){
			clearMeasureResult(measureIndex);
		}
		measureIndex++;//量算次数的标识
		AllFeatures[measureIndex]={features:[],popup:[]};//存储每次量算时地图上标绘的所有元素
		
		measureMap = _map;
		measureLayer = _layer;
		//实例化Measure控件，进行距离测量
		measureControl2=new SuperMap.Control.Measure(
	        SuperMap.Handler.Polygon, {
	            persist:true,
	            immediate:true,
	            geodesic: false,
	            handlerOptions: {
	                layerOptions: {
//	                    styleMap: styleMap
	                }
	            }
	        }
	     );
	     
	     //监听 measure 和 measurepartial 两个事件,量算完成时触发 measure事件，当点被添加到量算过程中时触发 measurepartial 
	     measureControl2.events.on({
	        "measure": areaMeasureFun,
	        "measurepartial": areaMeasurepartialFun
	    });
       
	    measureMap.addControl(measureControl2);//测试
	    measureControl2.activate();
	}
	
	
	
};

/*
 * 线量算完成时触发
 * */
function diatanceMeasureFun(event){
	measureControl.deactivate() ;
	//获取传入参数 event 的 geometry 信息
    var geometry = event.geometry;
    var endMeasurePoint = new SuperMap.Geometry.Point(geometry.components[geometry.components.length-1].x, geometry.components[geometry.components.length-1].y);
    var endPointGeo = geometry.components[geometry.components.length-1];
    //添加终点
    var endPointFeature = new SuperMap.Feature.Vector(endMeasurePoint, null, stylePoint);
    //将添加的点要素的id保存起来，用于后面的清除
    AllFeatures[measureIndex].features.push(endPointFeature);
    //将线的终点添加到图层上
    measureLayer.addFeatures(endPointFeature);
    //添加量算的线
    var lineFeature = new SuperMap.Feature.Vector(geometry, null, styleLine);
    //将添加的线要素的id保存起来，用于后面的清除
    AllFeatures[measureIndex].features.push(lineFeature);
    measureLayer.addFeatures(lineFeature);
    
    var popup = new SuperMap.Popup(
        'measureResultPopup',
        new SuperMap.LonLat(endPointGeo.x, endPointGeo.y),
        new SuperMap.Size(150,30),
        endDiv.replace("&DISTANCE",event.measure.toFixed(2)).replace("&UNIT",event.units).replace("&MEATUREINDEX", measureIndex),
        false
    );
    popup.backgroundColor = 'none';
    AllFeatures[measureIndex].popup.push(popup);
    measureMap.addPopup(popup);
    var meatureDom=document.getElementById("meatureTipDiv");
    if(meatureDom!=null&&meatureDom.nodeType===1)
        utilInterface.remove(document.getElementById("meatureTipDiv"));
	    utilInterface.addEvent(document.getElementById("measureResultClose_"+measureIndex),"click",function(){
	        clearMeasureResult(measureIndex);
	    });
    
}

/*
 * 线量算过程中触发
 * */
function diatancemeasurepartialFun(event){
//	utilInterface.removeEvent(document.getElementById(that.map.id),"mousemove",_fun);
	if(event.type != "click"){
		return;
	}
	//获取传入参数 event 的 geometry 信息
    var geometry = event.geometry;
    var measurePoint = new SuperMap.Geometry.Point(geometry.components[geometry.components.length-1].x, geometry.components[geometry.components.length-1].y);
    //获取实时量算结果
    var mousePositionGeo = geometry.components[geometry.components.length-1];
    var mousePositionPix = measureMap.getPixelFromLonLat(new SuperMap.LonLat(mousePositionGeo.x,mousePositionGeo.y));
    var meatureDom=document.getElementById("meatureTipDiv");
//  if(meatureDom!==null&&meatureDom.nodeType===1){
//      meatureDom.innerHTML='总长: <strong>' + event.measure.toFixed(2) + '</strong>' + ' ' + event.units + '<br>左键单击增加点，双击结束';
//      meatureDom.style.left=mousePositionPix.x+6-util.getOffset(document.getElementById(map.id)).x+"px";
//      meatureDom.style.top=mousePositionPix.y+10-util.getOffset(document.getElementById(map.id)).y+"px";
//  }else{   
//      utilInterface.appendChild(Dom,meatureTipDiv.replace("&LEFT",event.xy.x+6+"px").replace("&TOP",event.xy.y+10+"px").replace("&CONTENT",'总长: <strong>' + event.measure.toFixed(2) + '</strong>' + ' ' + event.units + '<br>左键单击增加点，双击结束'));
//  }
    //获取一段量算结果
    if(geometry.components[0].x == geometry.components[1].x && geometry.components[0].y == geometry.components[1].y){
        //添加起点
        measureFeature = new SuperMap.Feature.Vector(measurePoint, null, stylePoint);
        //将添加的点要素的id保存起来，用于后面的清除
        AllFeatures[measureIndex].features.push(measureFeature);
        measureLayer.addFeatures(measureFeature);
//      var popupPosition = mapVar.getLonLatFromPixel(new SuperMap.Pixel(mousePositionPix.x + 10, mousePositionPix.y -15));
        var popup = new SuperMap.Popup(
            'measureResultPopup',
            new SuperMap.LonLat(geometry.components[0].x, geometry.components[0].y),
            new SuperMap.Size(52,22),
            startDiv,
            false
        );
        popup.backgroundColor = 'none';
        measureMap.addPopup(popup);
        AllFeatures[measureIndex].popup.push(popup);
    }
    if(preGeoLen>1 && preGeoLen<geometry.components.length){
	    //添加量算过程中的点
	    measureFeature = new SuperMap.Feature.Vector(measurePoint, null, stylePoint);
	    //将添加的点要素的id保存起来，用于后面的清除
	    AllFeatures[measureIndex].features.push(measureFeature);
	    measureLayer.addFeatures(measureFeature);
	    //使用Popup显示量算结果
	    //var popupPosition = mapVar.getLonLatFromPixel(new SuperMap.Pixel(mousePositionPix.x + 10, mousePositionPix.y -15));
	    var popup = new SuperMap.Popup(
	        'measureResultPopup',
	        new SuperMap.LonLat(mousePositionGeo.x, mousePositionGeo.y),
	        new SuperMap.Size(80,22),
	        resultDiv.replace("&DISTANCE",event.measure.toFixed(2)).replace("&UNIT",event.units),
	        false
	    );
	    popup.backgroundColor = 'none';
	    measureMap.addPopup(popup);
	    //将popup保存起来，用于后面清除popup
	    AllFeatures[measureIndex].popup.push(popup);
	}
	preGeoLen = geometry.components.length;
}

/*
 * 面量算完成时触发
 * */
function areaMeasureFun(event){
	measureControl2.deactivate() ;
	//获取传入参数 event 的 geometry 信息
    var geometry = event.geometry;
    var components = geometry.components[0].components;
    var endMeasurePoint = new SuperMap.Geometry.Point(components[components.length-2].x,components[components.length-2].y);
    //var endPointGeo = geometry.components[geometry.components.length-1];
    //添加终点
    var endPointFeature = new SuperMap.Feature.Vector(endMeasurePoint, null, stylePoint);
    //将添加的点要素的id保存起来，用于后面的清除
    AllFeatures[measureIndex].features.push(endPointFeature);
    measureLayer.addFeatures(endPointFeature);
    //添加量算的线
    var lineFeature = new SuperMap.Feature.Vector(geometry, null, sketchSymbolizers.Polygon);
    //将添加的线要素的id保存起来，用于后面的清除
    AllFeatures[measureIndex].features.push(lineFeature);
    measureLayer.addFeatures(lineFeature);
    if(event.units == 'm'){
    	event.units = '平方米';
    }else if(event.units == 'km'){
    	event.units = '平方公里';
    }else{
    	event.units = '平方米';
    }
    var popup = new SuperMap.Popup(
        'measureResultPopup',
        new SuperMap.LonLat(endMeasurePoint.x, endMeasurePoint.y),
        new SuperMap.Size(250,54),
        endDiv.replace("总长","总面积").replace("&DISTANCE",event.measure.toFixed(2)).replace("&UNIT",event.units).replace("&MEATUREINDEX", measureIndex),
        false
    );
    popup.backgroundColor = 'none';
    measureMap.addPopup(popup);
    AllFeatures[measureIndex].popup.push(popup);
    var meatureDom=document.getElementById("meatureTipDiv");
    if(meatureDom!=null&&meatureDom.nodeType===1)
        utilInterface.remove(document.getElementById("meatureTipDiv"));
    	utilInterface.addEvent(document.getElementById("measureResultClose_"+measureIndex),"click",function(){
        clearMeasureResult(measureIndex);
    });
}

/*
 * 面量算过程中触发
 * */
function areaMeasurepartialFun(event){
	if(event.type != "click"){
		return;
	}
	var geometry = event.geometry;
    var components=geometry.components[0];
    var mousePositionGeo=components.components[components.components.length-1];
    var mousePositionPix = measureMap.getPixelFromLonLat(new SuperMap.LonLat(mousePositionGeo.x,mousePositionGeo.y));
    var meatureDom=document.getElementById("meatureTipDiv");
    if(event.units == 'm'){
    	event.units = '平方米';
    }else if(event.units == 'km'){
    	event.units = '平方公里';
    }else{
    	event.units = '平方米';
    }
//  if(meatureDom!==null&&meatureDom.nodeType===1){
//      meatureDom.innerHTML='总面积: <strong>' + event.measure.toFixed(2) + '</strong>' + ' ' + event.units + '<br>左键单击增加点，双击结束';
//      meatureDom.style.left=mousePositionPix.x+6+"px";
//      meatureDom.style.top=mousePositionPix.y+10+"px";
//  }else{
//      utilInterface.appendChild(Dom,meatureTipDiv.replace("&LEFT",event.xy.x+6+"px").replace("&TOP",event.xy.y+10+"px").replace("&CONTENT",'总面积: <strong>' + event.measure.toFixed(2) + '</strong>' + ' ' + event.units + '<br>左键单击增加点，双击结束'));
//  }
}

/*
 * 清除测距、测面积时添加到地图上的要素
 */
function clearMeasureResult(index){
	if(Object.prototype.toString.call(index)!="[object Number]"&&index<1){
        return;
    }
    measureLayer.removeFeatures(AllFeatures[index].features);
    for(var i=0;i<AllFeatures[index].popup.length;i++){
         measureMap.removePopup(AllFeatures[index].popup[i]);
    }
    measureIndex--;
}

