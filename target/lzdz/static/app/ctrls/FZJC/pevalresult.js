/**
 * Created by apple on 16/5/31.
 */
MainApp.controller("PEVAResultCtrls", ["$scope", function($scope) {


    $scope.pevalR=[];
    var pointVector,ellipseVector=[];

    var du=["O","Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ","Ⅷ","Ⅸ","Ⅹ","Ⅺ","Ⅻ","XⅢ"];
    $("#ad_b_anaRes").click(function(){
        $scope.addpevalresult();
    })
    $scope.$on("PEVAResultFromParrent",function (event, msg) { //监听来自父controller的信息
        //console.log("childCtr2", msg);
        //alert("D:"+msg.length);
        //for(var i=0;i<msg.length;i++){
        //    alert(msg[i].style.label)
        //}
        $scope.pevalR=msg;
        //alert("T:"+$scope.pevalR.length);
    });
    $scope.addpevalresult=function(){
        //alert($cookieStore.get("pevalarrresult"));
        $scope.center(parseFloat(35411029.42613),parseFloat(4016783.72892));
        $scope.compu(parseFloat(5.6),parseFloat(35411029.42613),parseFloat(4016783.72892),15);
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
                region.rotate(-20,point);
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
}]);