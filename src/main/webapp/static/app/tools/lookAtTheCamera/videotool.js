var timedelay=100;
function addElementDiv(obj,idvalue,value) {
    var parent = document.getElementById(obj);

    //添加 div
    var div = document.createElement("div");

    //设置 div 属性，如 id
    div.setAttribute("id", idvalue);

    div.innerHTML = value;
    parent.appendChild(div);
}
function addElementLi(obj,idvalue,value) {
    var ul = document.getElementById(obj);

    //添加 li
    var li = document.createElement("li");

    //设置 li 属性，如 id
    li.setAttribute("id", idvalue);

    li.innerHTML = value;
    ul.appendChild(li);
}


function addElementImg(obj) {
    var ul = document.getElementById(obj);

    //添加 li
    var li = document.createElement("li");

    //添加 img
    var img = document.createElement("img");

    //设置 img 属性，如 id
    img.setAttribute("id", "newImg");

    //设置 img 图片地址
    img.src = "/images/prod.jpg";

    li.appendChild(img);
    ul.appendChild(li);
}

//普通全屏设置,IE不兼容
function requestFullScreen(element) {
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
    if (requestMethod) {
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

//单屏全屏
function fullOneRegion(){
    //var height=window.screen.height
    //var width=window.screen.width
    var height=window.screen.availHeight
    var width=window.screen.availWidth
    var o=document.getElementById('one');//获得元素
    o.style.height=height;
    o.style.width=width;
    o.style.top=0;
    o.style.left=0;
    var oo=document.getElementById('VissCtrlImpl101');//获得元素
    oo.style.height=height;
    oo.style.width=width;
    oo.style.top=0;
    oo.style.left=0;
}

function exitFullOneRegion(){
    var o=document.getElementById('one');//获得元素
    o.style.height=276;
    o.style.width=486;
    o.style.top=400;
    o.style.left=500;
    var oo=document.getElementById('VissCtrlImpl101');//获得元素
    oo.style.height=270;
    oo.style.width=480;
}

//4ping全屏
function fullFourRegion(){
    var height=window.screen.availHeight
    var width=window.screen.availWidth
    var o=document.getElementById('four');//获得元素
    o.style.height=height;
    o.style.width=width;
    o.style.top=0;
    o.style.left=0;
    var o1=document.getElementById('VissCtrlImpl401');//获得元素
    o1.style.height=height*0.5;
    o1.style.width=width*0.5;
    o1.style.top=0;
    o1.style.left=0;
    var o2=document.getElementById('VissCtrlImpl402');//获得元素
    o2.style.height=height*0.5;
    o2.style.width=width*0.5;
    o2.style.top=0;
    o2.style.left=width*0.33;
    var o3=document.getElementById('VissCtrlImpl403');//获得元素
    o3.style.height=height*0.5;
    o3.style.width=width*0.5;
    o3.style.top=height*0.33;
    o3.style.left=0;
    var o4=document.getElementById('VissCtrlImpl404');//获得元素
    o4.style.height=height*0.5;
    o4.style.width=width*0.5;
    o4.style.top=height*0.33;
    o4.style.left=width*0.33;
}
//4屏全屏退出
function exitFullFourRegion(){
    var o=document.getElementById('four');//获得元素
    o.style.height=276;
    o.style.width=486;
    o.style.top=400;
    o.style.left=500;
    var o1=document.getElementById('VissCtrlImpl401');//获得元素
    o1.style.height=135;
    o1.style.width=240;
    o1.style.top=0;
    o1.style.left=0;
    var o2=document.getElementById('VissCtrlImpl402');//获得元素
    o2.style.height=135;
    o2.style.width=240;
    o2.style.top=0;
    o2.style.left=0;
    var o3=document.getElementById('VissCtrlImpl403');//获得元素
    o3.style.height=135;
    o3.style.width=240;
    o3.style.top=0;
    o3.style.left=0;
    var o4=document.getElementById('VissCtrlImpl404');//获得元素
    o4.style.height=135;
    o4.style.width=240;
    o4.style.top=0;
    o4.style.left=0;
}
//9屏全屏
function fullNineRegion(){
    var height=window.screen.availHeight
    var width=window.screen.availWidth
    var o=document.getElementById('nine');//获得元素
    o.style.height=height;
    o.style.width=width;
    o.style.top=0;
    o.style.left=0;
    var o1=document.getElementById('VissCtrlImpl901');//获得元素
    o1.style.height=height/3;
    o1.style.width=width/3;
    o1.style.top=0;
    o1.style.left=0;
    var o2=document.getElementById('VissCtrlImpl902');//获得元素
    o2.style.height=height/3;
    o2.style.width=width/3;
    o2.style.top=0;
    o2.style.left=width*0.22;
    var o3=document.getElementById('VissCtrlImpl903');//获得元素
    o3.style.height=height/3;
    o3.style.width=width/3;
    o3.style.top=0;
    o3.style.left=width*0.44;
    var o4=document.getElementById('VissCtrlImpl904');//获得元素
    o4.style.height=height/3;
    o4.style.width=width/3;
    o4.style.top=height*0.22;
    o4.style.left=0;
    var o5=document.getElementById('VissCtrlImpl905');//获得元素
    o5.style.height=height/3;
    o5.style.width=width/3;
    o5.style.top=height*0.22;
    o5.style.left=width*0.22;
    var o6=document.getElementById('VissCtrlImpl906');//获得元素
    o6.style.height=height/3;
    o6.style.width=width/3;
    o6.style.top=height*0.22;
    o6.style.left=width*0.44;
    var o7=document.getElementById('VissCtrlImpl907');//获得元素
    o7.style.height=height/3;
    o7.style.width=width/3;
    o7.style.top=height*0.44;
    o7.style.left=0;
    var o8=document.getElementById('VissCtrlImpl908');//获得元素
    o8.style.height=height/3;
    o8.style.width=width/3;
    o8.style.top=height*0.44;
    o8.style.left=width*0.22;
    var o9=document.getElementById('VissCtrlImpl909');//获得元素
    o9.style.height=height/3;
    o9.style.width=width/3;
    o9.style.top=height*0.44;
    o9.style.left=width*0.44;
}
//9屏全屏退出
function exitFullNineRegion(){
    var o=document.getElementById('nine');//获得元素
    o.style.height=276;
    o.style.width=486;
    o.style.top=400;
    o.style.left=500;
    var o1=document.getElementById('VissCtrlImpl901');//获得元素
    o1.style.height=90;
    o1.style.width=160;
    o1.style.top=0;
    o1.style.left=0;
    var o2=document.getElementById('VissCtrlImpl902');//获得元素
    o2.style.height=90;
    o2.style.width=160;
    o2.style.top=0;
    o2.style.left=0;
    var o3=document.getElementById('VissCtrlImpl903');//获得元素
    o3.style.height=90;
    o3.style.width=160;
    o3.style.top=0;
    o3.style.left=0;
    var o4=document.getElementById('VissCtrlImpl904');//获得元素
    o4.style.height=90;
    o4.style.width=160;
    o4.style.top=0;
    o4.style.left=0;
    var o5=document.getElementById('VissCtrlImpl905');//获得元素
    o5.style.height=90;
    o5.style.width=160;
    o5.style.top=0;
    o5.style.left=0;
    var o6=document.getElementById('VissCtrlImpl906');//获得元素
    o6.style.height=90;
    o6.style.width=160;
    o6.style.top=0;
    o6.style.left=0;
    var o7=document.getElementById('VissCtrlImpl907');//获得元素
    o7.style.height=90;
    o7.style.width=160;
    o7.style.top=0;
    o7.style.left=0;
    var o8=document.getElementById('VissCtrlImpl908');//获得元素
    o8.style.height=90;
    o8.style.width=160;
    o8.style.top=0;
    o8.style.left=0;
    var o9=document.getElementById('VissCtrlImpl909');//获得元素
    o9.style.height=90;
    o9.style.width=160;
    o9.style.top=0;
    o9.style.left=0;
}
//添加单视频播放布局
function addOneRegion(){
    addElementLiVideo("videoRegion","one","<div id=\"one\" class=\"float-box1\" > <object id=\"VissCtrlImpl101\" classid=\"CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA\"width=\"480\" height=\"270\" style=\"margin-left:3px;margin-top: 3px;\"> </object> </div>","90909090");
}
//添加4画面布局
function addFourRegion(){
    addElementLiVideo("videoRegion","four","<div id=\"four\" class=\"float-box4\" > <object id=\"VissCtrlImpl401\"classid=\"CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA\" CODEBASE=\"http://192.168.1.114:8199/viss/ocx.exe\" width=\"240\" height=\"135\" style=\"position:absolute;margin-left:3px;margin-top: 3px;\"> </object> <object id=\"VissCtrlImpl402\"classid=\"CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA\"width=\"240\" height=\"135\" style=\"position:absolute;margin-left:243px;margin-top: 3px;\"> </object> <object id=\"VissCtrlImpl403\" classid=\"CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA\" width=\"240\" height=\"135\" style=\"position:absolute;margin-left:3px;margin-top: 138px;\"> </object> <object id=\"VissCtrlImpl404\" classid=\"CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA\" width=\"240\" height=\"135\" style=\"position:absolute;margin-left:243px;margin-top: 138px;\"> </object></div>","90909090");
}
//添加9画面布局
function addNineRegion(){
    addElementLiVideo("videoRegion","nine","<div id=\"nine\" class=\"float-box9\" > <object id=\"VissCtrlImpl901\"classid=\"CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA\" CODEBASE=\"http://192.168.1.114:8199/viss/ocx.exe\" width=\"160\" height=\"90\" style=\"position:absolute;margin-left:3px;margin-top: 3px;\"> </object> <object id=\"VissCtrlImpl902\"classid=\"CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA\"width=\"160\" height=\"90\" style=\"position:absolute;margin-left:163px;margin-top: 3px;\"> </object>  <object id=\"VissCtrlImpl903\" classid=\"CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA\" width=\"160\" height=\"90\" style=\"position:absolute;margin-left:323px;margin-top: 3px;\"> </object>  <object id=\"VissCtrlImpl904\" classid=\"CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA\" width=\"160\" height=\"90\" style=\"position:absolute;margin-left:3px;margin-top: 93px;\"> </object> <object id=\"VissCtrlImpl905\"classid=\"CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA\"width=\"160\" height=\"90\" style=\"position:absolute;margin-left:163px;margin-top: 93px;\"> </object>  <object id=\"VissCtrlImpl906\" classid=\"CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA\" width=\"160\" height=\"90\" style=\"position:absolute;margin-left:323px;margin-top: 93px;\"> </object>  <object id=\"VissCtrlImpl907\" classid=\"CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA\" width=\"160\" height=\"90\" style=\"position:absolute;margin-left:3px;margin-top: 183px;\"> </object> <object id=\"VissCtrlImpl908\" classid=\"CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA\" width=\"160\" height=\"90\" style=\"position:absolute;margin-left:163px;margin-top: 183px;\"> </object> <object id=\"VissCtrlImpl909\" classid=\"CLSID:3C1AAF0C-BE65-443b-A859-B826F400F3EA\" width=\"160\" height=\"90\" style=\"position:absolute;margin-left:323px;margin-top: 183px;\"> </object></div>","90909090");
}
//添加电视墙控制布局
//function addTvWRegion(){
//  var tvr="<div id=\"TvWallCtrol\" class=\"float-boxtv\"  > <div id=\"R1ID\" class=\"ctrlp\"  title=\"上墙操作区\"> <div><IMG  id=\"RegionId\" ondblclick=\"TvRScan(0)\" onclick=\"SecRegion(1)\" class=\"setregion\" title=\"全屏\" src=\"/CityManage/jsp/images/icon/mp0.png\" ></div> </div> <div id=\"R4ID\" class=\"ctrlp\" style=\"display:none \" title=\"上墙操作区\"> <div><IMG  id=\"Region14Id\" ondblclick=\"TvRScan(0)\" onclick=\"SecRegion(1)\" class=\"setregion4\" title=\"1/4\" src=\"/CityManage/jsp/images/icon/mp0.png\" > <IMG  id=\"Region24Id\" ondblclick=\"TvRScan(1)\" onclick=\"SecRegion(2)\" class=\"setregion4\" title=\"2/4\" src=\"/CityManage/jsp/images/icon/mp0.png\" > </div> <div><IMG  id=\"Region34Id\" ondblclick=\"TvRScan(2)\" onclick=\"SecRegion(3)\" class=\"setregion4\" title=\"3/4\" src=\"/CityManage/jsp/images/icon/mp0.png\" > <IMG  id=\"Region44Id\"  ondblclick=\"TvRScan(3)\" onclick=\"SecRegion(4)\" class=\"setregion4\" title=\"4/4\" src=\"/CityManage/jsp/images/icon/mp0.png\" ></div> </div> <div id=\"R16ID\" class=\"ctrlp\" style=\"display:none \" title=\"上墙操作区\"> <div><IMG  id=\"Region116Id\" ondblclick=\"TvRScan(0)\" onclick=\"SecRegion(1)\" class=\"setregion16\" title=\"1/16\" src=\"/CityManage/jsp/images/icon/mp0.png\" > <IMG  id=\"Region216Id\"ondblclick=\"TvRScan(1)\" onclick=\"SecRegion(2)\" class=\"setregion16\" title=\"2/16\" src=\"/CityManage/jsp/images/icon/mp0.png\" > <IMG  id=\"Region316Id\"ondblclick=\"TvRScan(2)\"  onclick=\"SecRegion(3)\" class=\"setregion16\" title=\"3/16\" src=\"/CityManage/jsp/images/icon/mp0.png\" > <IMG  id=\"Region416Id\" ondblclick=\"TvRScan(3)\" onclick=\"SecRegion(4)\" class=\"setregion16\" title=\"4/16\" src=\"/CityManage/jsp/images/icon/mp0.png\" > </div> <div><IMG  id=\"Region516Id\" ondblclick=\"TvRScan(4)\" onclick=\"SecRegion(5)\" class=\"setregion16\" title=\"5/16\" src=\"/CityManage/jsp/images/icon/mp0.png\" > <IMG  id=\"Region616Id\"ondblclick=\"TvRScan(5)\" onclick=\"SecRegion(6)\" class=\"setregion16\" title=\"6/16\" src=\"/CityManage/jsp/images/icon/mp0.png\" > <IMG  id=\"Region716Id\"ondblclick=\"TvRScan(6)\"  onclick=\"SecRegion(7)\" class=\"setregion16\" title=\"7/16\" src=\"/CityManage/jsp/images/icon/mp0.png\" > <IMG  id=\"Region816Id\" ondblclick=\"TvRScan(7)\" onclick=\"SecRegion(8)\" class=\"setregion16\" title=\"8/16\" src=\"/CityManage/jsp/images/icon/mp0.png\" > </div> <div><IMG  id=\"Region916Id\" ondblclick=\"TvRScan(8)\" onclick=\"SecRegion(9)\" class=\"setregion16\" title=\"9/16\" src=\"/CityManage/jsp/images/icon/mp0.png\" > <IMG  id=\"Region1016Id\" ondblclick=\"TvRScan(9)\" onclick=\"SecRegion(10)\" class=\"setregion16\" title=\"10/16\" src=\"/CityManage/jsp/images/icon/mp0.png\" > <IMG  id=\"Region1116Id\" ondblclick=\"TvRScan(10)\" onclick=\"SecRegion(11)\" class=\"setregion16\" title=\"11/16\" src=\"/CityManage/jsp/images/icon/mp0.png\" > <IMG  id=\"Region1216Id\" ondblclick=\"TvRScan(11)\" onclick=\"SecRegion(12)\" class=\"setregion16\" title=\"12/16\" src=\"/CityManage/jsp/images/icon/mp0.png\" > </div> <div><IMG  id=\"Region1316Id\" ondblclick=\"TvRScan(12)\" onclick=\"SecRegion(13)\" class=\"setregion16\" title=\"13/16\" src=\"/CityManage/jsp/images/icon/mp0.png\" > <IMG  id=\"Region1416Id\" ondblclick=\"TvRScan(13)\" onclick=\"SecRegion(14)\" class=\"setregion16\" title=\"14/16\" src=\"/CityManage/jsp/images/icon/mp0.png\" > <IMG  id=\"Region1516Id\" ondblclick=\"TvRScan(14)\" onclick=\"SecRegion(15)\" class=\"setregion16\" title=\"15/16\" src=\"/CityManage/jsp/images/icon/mp0.png\" > <IMG  id=\"Region1616Id\" ondblclick=\"TvRScan(15)\" onclick=\"SecRegion(16)\" class=\"setregion16\" title=\"16/16\" src=\"/CityManage/jsp/images/icon/mp0.png\" > </div> </div> <div><SELECT id=QResList class=\"tvresourcecss\" style=\"display:none;\" onmouseout=\"QRRScanClose()\" onclick=\"DeleteTvResource()\" multiple=\"multiple\" size=\"1\"  name=qres  title=\"资源列表\"></SELECT></div><div class=\"ctrlbutton\" title=\"电视墙设置区\"> <div><IMG  id=\"setRegion1Id\" class=\"buttonsize\" style=\"margin-top: 0px\" title=\"全屏\" src=\"/CityManage/jsp/images/icon/mpt1.png\" onclick=\"RegionCtrol(1)\"  > </div> <div><IMG  id=\"setRegion4Id\" class=\"buttonsize\" style=\"margin-top: 55px\" onclick=\"RegionCtrol(4)\"title=\"4屏\" src=\"/CityManage/jsp/images/icon/mpt4.png\" > </div> <div><IMG  id=\"setRegion16Id\" class=\"buttonsize\" style=\"margin-top: 110px\" onclick=\"RegionCtrol(16)\"title=\"16屏\" src=\"/CityManage/jsp/images/icon/mpt16.png\" > </div> <div><input  id=\"GetLoopIntervaId\" class=\"buttonsize\" style=\"margin-top: 167px;width: 45px;height: 16px;text-align: center\"  onclick=GetTvWallLoopInterval();  title=\"获取轮询值\"> </div> <div><input  id=\"SetLoopIntervaId\" class=\"buttonsize\" style=\"margin-top: 195px;width: 45px;height: 16px;text-align: center\"  onclick=SetTvWallLoopInterval();   title=\"设置轮询值\"> </div> </div> <div class=\"ctrlp\"  title=\"电视墙设置区\"> <div><SELECT id=TVQListID multiple=\"multiple\" size=\"1\" class=\"Tvseclectcss\" style=\"margin-left: 1px\" name=qlist ondblclick=\"GetTvWallList()\" onchange=\"TvWSeclectChange()\" title=\"双击获取电视墙列表\"></SELECT></div><div><SELECT id=TVListID multiple=\"multiple\" size=\"1\" class=\"Tvseclectcss\" style=\"margin-left: 162px\" name=tvlist title=\"电视机选择\"></SELECT></div></div> </div>"
//  addElementLiVideo("videoRegion","TvWallCtrol",tvr,"90909090");
//}
//添加录像控制布局
//function addRecordRegion(){
//var vfile="<div id=\"RecordFile\"  class=\"float-boxvf\" style=\"position:absolute;FLOAT: left; PADDING-BOTTOM: 0px; MARGIN: auto;margin-top:0px;background-color:#dfdfdf;border-color: #1E90FF;border-width:1px;border-radius:5px;width:345px;height:180px;\" > <div> <div><SELECT id=PRList multiple=\"multiple\" size=\"1\" style=\"position:absolute;margin-left:5px;margin-top:5px;border-color: #1E90FF;border-width:1px;border-radius:5px;background-color: #ffffff;width: 300px;height:100px;font-size: 12px;\"  onchange=\"PlayRecordFile()\" name=qres  title=\"平台录像\"></SELECT></div> <div><SELECT id=MRList multiple=\"multiple\" size=\"1\" style=\"position:absolute;margin-left:5px;margin-top:105px;border-color: #1E90FF;border-width:1px;border-radius:5px;background-color: #ffffff;width: 300px;height:70px;font-size: 12px;\" onchange=\"PlayVsRecordFile()\"  name=qres  title=\"前端录像\"></SELECT></div> </div> <div id=\"dateTime\" onclick=\"event.cancelBubble=true\" style=\"position:absolute;width:103px;height:103px;margin-left:150px;margin-top: -5px;border-color: #1E90FF;border-width:1px;border-radius:5px;background-color: #dfdfdf;visibility:hidden\"> <input  id=\"bgntime\" type=\"text\" name=\"bgntime\" style=\"margin-left:1px;width:155px;height:10px;text-align: center;font-size: 9px;border-color: #fff;border-width:1px;\" /> <table class=\"cal_table\" border=\"0\"> <tr> <td> <script>var c = new CalendarCalendar('c');document.write(c); </script> </td> </tr> <tr> <td valign='top' align='center'> <script>var m = new CalendarMinute('m');document.write(m); </script> </td> </tr> </table> </div> <div class=\"ctrlp\" style=\"position:absolute;margin-left: 315px;margin-top: 4px\" title=\"录像查询区\"> <div><IMG  id=\"StartTimeID\" style=\"margin-top:1px;width: 20px;height: 20px;border-color: #1E90FF;border-width:10px;border-radius:5px;\" title=\"起始时间\" src=\"/CityManage/jsp/images/icon/st.png\"  onmouseover=\"showCal(bgntime)\" onclick=\"GetStartTime()\"> </div> <div><IMG  id=\"EndTimeID\" style=\"margin-top:1px;width: 20px;height: 20px;border-color: #1E90FF;border-width:10px;border-radius:5px;\"  title=\"截止时间\" src=\"/CityManage/jsp/images/icon/et.png\" onmouseover=\"showCal(bgntime)\" onclick=\"GetEndTime()\" > </div> <div><IMG  id=\"RSelectID\" style=\"margin-top:1px;width: 20px;height: 20px;border-color: #1E90FF;border-width:10px;border-radius:5px;\" title=\"前端/平台\" src=\"/CityManage/jsp/images/icon/sr.png\" name=\"sr\"  onclick=\"RecordSelect()\"   > </div> <div><IMG  id=\"Find\" style=\"margin-top:1px;width: 20px;height: 20px;border-color: #1E90FF;border-width:10px;border-radius:5px;\"  title=\"查询\" src=\"/CityManage/jsp/images/icon/search.png\" onclick=QueryRecord() > </div> <div><input type=\"text\" id=\"PlayPerid\" style=\"margin-top:1px;width: 18px;height:18px;border-color: #1E90FF;border-width:1px;border-radius:5px;\" ondblclick=\"SetPlayPercent()\"   name=pp title=\"播放百分比\"> </div> <div><IMG id=\"PPCtrl\"style=\"margin-top:1px;width: 20px;height: 20px;border-color: #1E90FF;border-width:10px;border-radius:5px;\" onclick=\"PlayPauseCtrl()\" src=\"/CityManage/jsp/images/icon/pause.png\"  name=pl title=\"暂停/播放\"> </div> <div><IMG id=\"Exitid\"style=\"margin-top:1px;width: 20px;height: 20px;border-color: #1E90FF;border-width:10px;border-radius:5px;\" onclick=\"RecordRegionClose()\" src=\"/CityManage/jsp/images/icon/EXIT.png\"  name=pl title=\"退出\"> </div> </div> </div>";
//  addElementLiVideo("box"," vfile",vfile,"90909090");
//}
//添加实时视频控制布局
//function addVideoCtrolRegion(){
//var vctl="<div id=\"VideoCtr\" class=\"float-boxctr\" > <div class=\"ctrlp\" title=\"云台控制\" style=\"margin-top: 4px;display:''\"> <IMG id=\"VLeftUID\" class=\"YTCtrl6\" onmouseup=VideoControl(0x05,0x01,\"VLeftUID\",\"/CityManage/jsp/images/icon/cc.png\"); onmousedown=VideoControl(0x18,0x01,\"VLeftUID\",\"/CityManage/jsp/images/icon/cc1.png\");   src=\"/CityManage/jsp/images/icon/cc.png\" style=\"position:absolute;clip: rect(0px,28px,28px,0px)\" value=左上 name=control> <IMG id=\"VUpID\" class=\"YTCtrl6\" onmouseup=VideoControl(0x01,0x01,\"VUpID\",\"/CityManage/jsp/images/icon/cc.png\"); onmousedown=VideoControl(0x18,0x01,\"VUpID\",\"/CityManage/jsp/images/icon/cc1.png\"); src=\"/CityManage/jsp/images/icon/cc.png\" style=\"position:absolute;clip: rect(0px,48px,28px,24px)\" value=向上 name=control> <IMG id=\"VRightUID\" class=\"YTCtrl6\" onmouseup=VideoControl(0x06,0x01,\"VRightUID\",\"/CityManage/jsp/images/icon/cc.png\"); onmousedown=VideoControl(0x18,0x01,\"VRightUID\",\"/CityManage/jsp/images/icon/cc1.png\"); src=\"/CityManage/jsp/images/icon/cc.png\"style=\"position:absolute;clip: rect(0px,72px,28px,48px)\" value=右上 name=control> <IMG id=\"VLeftID\" class=\"YTCtrl6\" onmouseup=VideoControl(0x03,0x01,\"VLeftID\",\"/CityManage/jsp/images/icon/cc.png\"); onmousedown=VideoControl(0x18,0x01,\"VLeftID\",\"/CityManage/jsp/images/icon/cc1.png\"); src=\"/CityManage/jsp/images/icon/cc.png\" style=\"position:absolute;clip: rect(28px,28px,45px,0px)\"value=向左 name=control> <IMG id=\"VCenterID\"class=\"YTCtrl6\" src=\"/CityManage/jsp/images/icon/cc.png\" style=\"position:absolute;clip: rect(28px,48px,45px,24px)\"value=中 name=control> <IMG id=\"VRightID\"class=\"YTCtrl6\" onmouseup=VideoControl(0x04,0x01,\"VRightID\",\"/CityManage/jsp/images/icon/cc.png\"); onmousedown=VideoControl(0x18,0x01,\"VRightID\",\"/CityManage/jsp/images/icon/cc1.png\"); src=\"/CityManage/jsp/images/icon/cc.png\" style=\"position:absolute;clip: rect(28px,72px,45px,48px)\"value=向右 name=control> <IMG id=\"VLeftDID\" class=\"YTCtrl6\" onmouseup=VideoControl(0x07,0x01,\"VLeftDID\",\"/CityManage/jsp/images/icon/cc.png\"); onmousedown=VideoControl(0x18,0x01,\"VLeftDID\",\"/CityManage/jsp/images/icon/cc1.png\"); src=\"/CityManage/jsp/images/icon/cc.png\" style=\"position:absolute;clip: rect(45px,28px,72px,0px)\"value=左下 name=control> <IMG id=\"VDownID\" class=\"YTCtrl6\" onmouseup=VideoControl(0x02,0x01,\"VDownID\",\"/CityManage/jsp/images/icon/cc.png\"); onmousedown=VideoControl(0x18,0x01,\"VDownID\",\"/CityManage/jsp/images/icon/cc1.png\"); src=\"/CityManage/jsp/images/icon/cc.png\" style=\"position:absolute;clip: rect(45px,48px,72px,24px)\"value=向下 name=control> <IMG id=\"VRightDID\"  class=\"YTCtrl6\" onmouseup=VideoControl(0x08,0x01,\"VRightDID\",\"/CityManage/jsp/images/icon/cc.png\"); onmousedown=VideoControl(0x18,0x01,\"VRightDID\",\"/CityManage/jsp/images/icon/cc1.png\"); src=\"/CityManage/jsp/images/icon/cc.png\" style=\"position:absolute;clip: rect(45px,72px,72px,48px)\"value=右下 name=control> </div> <div class=\"ctrlp\" style=\"margin-left: 84px;margin-top: 16px\"> <div><INPUT class=\"YTCtrl1\" name=recordfilePath value=\"C:\Users\apple\Desktop\recordvideo\" style=\"display: none\"></div> <div><IMG id=\"RecordID\" class=\"YTCtrl4\" onclick=RecordControl() src=\"/CityManage/jsp/images/icon/v0.png\"  name=startvideo title=\"录像控制\" ></div> </div> <div class=\"ctrlp\" style=\"margin-left: 143px;margin-top: 16px\"> <div><INPUT class=\"YTCtrl1\" name=snapfilePath value=\"C:\Users\apple\Desktop\snappicture.jpg\" style=\"display: none\"></div> <div><IMG id=\"SnapID\"class=\"YTCtrl4\" onmousedown=SnapControl() onmouseup=\"SnapBack()\" src=\"/CityManage/jsp/images/icon/c0.png\"  name=snapd title=\"抓拍\"></div> </div> <div class=\"ctrlp\" style=\"margin-left: 205px;margin-top: 4px;\"> <div> <IMG  ID=\"SpeedIDX\" class=\"YTCtrl2\" onmouseup=VideoControl(0x0D,0x02,\"SpeedIDX\",\"/CityManage/jsp/images/icon/i0.png\"); onmousedown=VideoControl(0x18,0x02,\"SpeedIDX\",\"/CityManage/jsp/images/icon/i1.png\"); src=\"/CityManage/jsp/images/icon/i0.png\" title=\"速度缩小\" name=control> <IMG ID=\"SpeedID\" class=\"YTCtrl3\" onmouseup=VideoControl(0x0C,0x18,\"SpeedID\",\"/CityManage/jsp/images/icon/sd0.png\"); onmousedown=BackgroudChange(\"SpeedID\",\"/CityManage/jsp/images/icon/sd1.png\"); src=\"/CityManage/jsp/images/icon/sd0.png\" title=\"云台速度\" name=control> <IMG ID=\"SpeedIDD\"class=\"YTCtrl2\" onmouseup=VideoControl(0x0E,0x02,\"SpeedIDD\",\"/CityManage/jsp/images/icon/m0.png\"); onmousedown=VideoControl(0x18,0x02,\"SpeedIDD\",\"/CityManage/jsp/images/icon/m1.png\"); src=\"/CityManage/jsp/images/icon/m0.png\" title=\"速度增大\" name=control> </div> <div> <IMG  ID=\"FocalDIDX\" class=\"YTCtrl2\" onmouseup=VideoControl(0x0D,0x02,\"FocalDIDX\",\"/CityManage/jsp/images/icon/i0.png\"); onmousedown=VideoControl(0x18,0x02,\"FocalDIDX\",\"/CityManage/jsp/images/icon/i1.png\"); src=\"/CityManage/jsp/images/icon/i0.png\" title=\"焦距缩小\" name=control> <IMG ID=\"FocalDID\" class=\"YTCtrl3\" onmouseup=VideoControl(0x0C,0x18,\"FocalDID\",\"/CityManage/jsp/images/icon/jj0.png\"); onmousedown=BackgroudChange(\"FocalDID\",\"/CityManage/jsp/images/icon/jj1.png\"); src=\"/CityManage/jsp/images/icon/jj0.png\" title=\"自动调焦\" name=control> <IMG ID=\"FocalDIDD\"class=\"YTCtrl2\" onmouseup=VideoControl(0x0E,0x02,\"FocalDIDD\",\"/CityManage/jsp/images/icon/m0.png\"); onmousedown=VideoControl(0x18,0x02,\"FocalDIDD\",\"/CityManage/jsp/images/icon/m1.png\"); src=\"/CityManage/jsp/images/icon/m0.png\" title=\"焦距增大\" name=control> </div> <div> <IMG ID=\"FocusIDX\" class=\"YTCtrl2\" onmouseup=VideoControl(0x09,0x02,\"FocusIDX\",\"/CityManage/jsp/images/icon/i0.png\"); onmousedown=VideoControl(0x18,0x02,\"FocusIDX\",\"/CityManage/jsp/images/icon/i1.png\"); src=\"/CityManage/jsp/images/icon/i0.png\" title=\"焦点调近\" name=control> <IMG id=\"WipeID\" class=\"YTCtrl3\" onclick=WipeSC(); src=\"/CityManage/jsp/images/icon/jd0.png\" name=wipestop title=\"擦拭启动、停止\"> <IMG ID=\"FocusIDD\" class=\"YTCtrl2\" onmouseup=VideoControl(0x0A,0x02,\"FocusIDD\",\"/CityManage/jsp/images/icon/m0.png\"); onmousedown=VideoControl(0x18,0x02,\"FocusIDD\",\"/CityManage/jsp/images/icon/m1.png\"); src=\"/CityManage/jsp/images/icon/m0.png\" title=\"焦点调远\" name=control> </div> <div> <IMG ID=\"IRISIDX\" class=\"YTCtrl2\" onmouseup=VideoControl(0x13,0x01,\"IRISIDX\",\"/CityManage/jsp/images/icon/i0.png\"); onmousedown=VideoControl(0x18,0x10,\"IRISIDX\",\"/CityManage/jsp/images/icon/i1.png\"); src=\"/CityManage/jsp/images/icon/i0.png\" title=\"光圈减小\" name=control> <IMG ID=\"IRISID\" class=\"YTCtrl3\"onmouseup=VideoControl(0x11,0x18,\"IRISID\",\"/CityManage/jsp/images/icon/gq0.png\"); onmousedown=BackgroudChange(\"IRISID\",\"/CityManage/jsp/images/icon/gq1.png\"); src=\"/CityManage/jsp/images/icon/gq0.png\" title=\"光圈自动调节\" name=control> <IMG ID=\"IRISIDD\" class=\"YTCtrl2\" onmouseup=VideoControl(0x12,0x01,\"IRISIDD\",\"/CityManage/jsp/images/icon/m0.png\"); onmousedown=VideoControl(0x18,0x01,\"IRISIDD\",\"/CityManage/jsp/images/icon/m1.png\"); src=\"/CityManage/jsp/images/icon/m0.png\" title=\"光圈增大\" name=control> </div> </div> </div>"
//  addElementLiVideo("box","VideoCtr",vctl,"90909090");
//}

//添加视频布局标签
function addElementLiVideo(obj,idvalue,value) {
    var ul = document.getElementById(obj);

    //添加 li
    var div = document.createElement("div");

    //设置 li 属性，如 id
    div.setAttribute("id", idvalue);

    div.innerHTML = value;
    ul.appendChild(div);
}
//初始化ocx控件
function initElementLiVideo(){
    try{VissCtrlImpl101.CreateInstance();}catch (err) {}
    try{VissCtrlImpl401.CreateInstance();}catch (err) {}
    try{VissCtrlImpl402.CreateInstance();}catch (err) {}
    try{VissCtrlImpl403.CreateInstance();}catch (err) {}
    try{VissCtrlImpl404.CreateInstance();}catch (err) {}
    try{VissCtrlImpl901.CreateInstance();}catch (err) {}
    try{VissCtrlImpl902.CreateInstance();}catch (err) {}
    try{VissCtrlImpl903.CreateInstance();}catch (err) {}
    try{VissCtrlImpl904.CreateInstance();}catch (err) {}
    try{VissCtrlImpl905.CreateInstance();}catch (err) {}
    try{VissCtrlImpl906.CreateInstance();}catch (err) {}
    try{VissCtrlImpl907.CreateInstance();}catch (err) {}
    try{VissCtrlImpl908.CreateInstance();}catch (err) {}
    try{VissCtrlImpl909.CreateInstance();}catch (err) {}
}
//结束ocx控件
function endElementLiVideo(){
    try{VissCtrlImpl101.DestroyInstance();}catch (err) {}
    try{VissCtrlImpl401.DestroyInstance();}catch (err) {}
    try{VissCtrlImpl402.DestroyInstance();}catch (err) {}
    try{VissCtrlImpl403.DestroyInstance();}catch (err) {}
    try{VissCtrlImpl404.DestroyInstance();}catch (err) {}
    try{VissCtrlImpl901.DestroyInstance();}catch (err) {}
    try{VissCtrlImpl902.DestroyInstance();}catch (err) {}
    try{VissCtrlImpl903.DestroyInstance();}catch (err) {}
    try{VissCtrlImpl904.DestroyInstance();}catch (err) {}
    try{VissCtrlImpl905.DestroyInstance();}catch (err) {}
    try{VissCtrlImpl906.DestroyInstance();}catch (err) {}
    try{VissCtrlImpl907.DestroyInstance();}catch (err) {}
    try{VissCtrlImpl908.DestroyInstance();}catch (err) {}
    try{VissCtrlImpl909.DestroyInstance();}catch (err) {}
}
//登录视频平台
function Init(ccsIP,ccsPort,ccsURI,username,passwd ) {
//	loadingWinInitIndex(true);
    VissCtrlImpl.CreateInstance();
    try {
        VissCtrlImpl.Login(ccsIP, ccsPort, ccsURI, username, passwd);
        alert("登录成功");
    }
    catch (err) {
        alert("登录失败 " + err.description);
    }
//  loadingWinInitIndex(false);
}
//退出登录
function Exit(){
    try {
        VissCtrlImpl.Logout();
        VissCtrlImpl.DestroyInstance();
    }
    catch (err) {
        //alert("登录失败 " + err.description);
    }
}
//按照分屏关闭视频
function stopVideoMode(mode){
    if(mode==1){try{VissCtrlImpl101.StopLiveVideo();}catch (err) {}}
    else if(mode==4){
    try{VissCtrlImpl401.StopLiveVideo();}catch (err) {}
    try{VissCtrlImpl402.StopLiveVideo();}catch (err) {}
    try{VissCtrlImpl403.StopLiveVideo();}catch (err) {}
    try{VissCtrlImpl404.StopLiveVideo();}catch (err) {}
    }else if(mode==9){
    try{VissCtrlImpl901.StopLiveVideo();}catch (err) {}
    try{VissCtrlImpl902.StopLiveVideo();}catch (err) {}
    try{VissCtrlImpl903.StopLiveVideo();}catch (err) {}
    try{VissCtrlImpl904.StopLiveVideo();}catch (err) {}
    try{VissCtrlImpl905.StopLiveVideo();}catch (err) {}
    try{VissCtrlImpl906.StopLiveVideo();}catch (err) {}
    try{VissCtrlImpl907.StopLiveVideo();}catch (err) {}
    try{VissCtrlImpl908.StopLiveVideo();}catch (err) {}
    try{VissCtrlImpl909.StopLiveVideo();}catch (err) {}
    }else{
        try{VissCtrlImpl101.StopLiveVideo();}catch (err) {}
        try{VissCtrlImpl401.StopLiveVideo();}catch (err) {}
        try{VissCtrlImpl402.StopLiveVideo();}catch (err) {}
        try{VissCtrlImpl403.StopLiveVideo();}catch (err) {}
        try{VissCtrlImpl404.StopLiveVideo();}catch (err) {}
        try{VissCtrlImpl901.StopLiveVideo();}catch (err) {}
        try{VissCtrlImpl902.StopLiveVideo();}catch (err) {}
        try{VissCtrlImpl903.StopLiveVideo();}catch (err) {}
        try{VissCtrlImpl904.StopLiveVideo();}catch (err) {}
        try{VissCtrlImpl905.StopLiveVideo();}catch (err) {}
        try{VissCtrlImpl906.StopLiveVideo();}catch (err) {}
        try{VissCtrlImpl907.StopLiveVideo();}catch (err) {}
        try{VissCtrlImpl908.StopLiveVideo();}catch (err) {}
        try{VissCtrlImpl909.StopLiveVideo();}catch (err) {}
    }
}

//按照屏块关闭视频
function stopVideoEvery (mode,every){
    if(mode==1){VissCtrlImpl101.StopLiveVideo();}
    else if(mode==4){
        if(every==1){VissCtrlImpl401.StopLiveVideo();}
    else if(every==2){VissCtrlImpl402.StopLiveVideo();}
    else if(every==3){VissCtrlImpl403.StopLiveVideo();}
    else if(every==4){VissCtrlImpl404.StopLiveVideo();}}
    else if(mode==9){
        if(every==1){VissCtrlImpl901.StopLiveVideo();}
    else if(every==2){VissCtrlImpl902.StopLiveVideo();}
    else if(every==3){VissCtrlImpl903.StopLiveVideo();}
    else if(every==4){VissCtrlImpl904.StopLiveVideo();}
    else if(every==5){VissCtrlImpl905.StopLiveVideo();}
    else if(every==6){VissCtrlImpl906.StopLiveVideo();}
    else if(every==7){VissCtrlImpl907.StopLiveVideo();}
    else if(every==8){VissCtrlImpl908.StopLiveVideo();}
    else if(every==9){VissCtrlImpl909.StopLiveVideo();}}

}

//开始视频
function startVideo(cameraID,playobj,mode){
//	alert("C:"+cameraID+"p:"+playobj+"M:"+mode);
    if(mode==1){window.setTimeout(function(){VissCtrlImpl101.StartLiveVideo(cameraID, 0);},timedelay);}
    else if(mode==4){
        if(playobj==1){
        window.setTimeout(function(){VissCtrlImpl401.StartLiveVideo(cameraID, 0);},timedelay);
    }else if(playobj==2){
        window.setTimeout(function(){VissCtrlImpl402.StartLiveVideo(cameraID, 0);},timedelay);
    }else if(playobj==3){
        window.setTimeout(function(){VissCtrlImpl403.StartLiveVideo(cameraID, 0);},timedelay);
    }else if(playobj==4){
        window.setTimeout(function(){VissCtrlImpl404.StartLiveVideo(cameraID, 0);},timedelay);
    }}
    else if(mode==9){
        if(playobj==1){
        window.setTimeout(function(){VissCtrlImpl901.StartLiveVideo(cameraID, 0);},timedelay);
    }else if(playobj==2){
        window.setTimeout(function(){VissCtrlImpl902.StartLiveVideo(cameraID, 0);},timedelay);
    }else if(playobj==3){
        window.setTimeout(function(){VissCtrlImpl903.StartLiveVideo(cameraID, 0);},timedelay);
    }else if(playobj==4){
        window.setTimeout(function(){VissCtrlImpl904.StartLiveVideo(cameraID, 0);},timedelay);
    }else if(playobj==5){
        window.setTimeout(function(){VissCtrlImpl905.StartLiveVideo(cameraID, 0);},timedelay);
    }else if(playobj==6){
        window.setTimeout(function(){VissCtrlImpl906.StartLiveVideo(cameraID, 0);},timedelay);
    }else if(playobj==7){
        window.setTimeout(function(){VissCtrlImpl907.StartLiveVideo(cameraID, 0);},timedelay);
    }else if(playobj==8){
        window.setTimeout(function(){VissCtrlImpl908.StartLiveVideo(cameraID, 0);},timedelay);
    }else if(playobj==9){
        window.setTimeout(function(){VissCtrlImpl909.StartLiveVideo(cameraID, 0);},timedelay);
    }}

}


//控制分屏切换
function videoModeExchange(oldmode,mode){
    stopVideoMode(oldmode);
    if(mode==1){
        try{document.getElementById("one").style.display="";}catch (err) {}
        try{document.getElementById("four").style.display="none";}catch (err) {}
        try{document.getElementById("nine").style.display="none";}catch (err) {}
    }else if(mode==4){
        try{document.getElementById("one").style.display="none";}catch (err) {}
        try{document.getElementById("four").style.display="";}catch (err) {}
        try{document.getElementById("nine").style.display="none";}catch (err) {}
    }else if(mode==9){
        try{document.getElementById("one").style.display="none";}catch (err) {}
        try{document.getElementById("four").style.display="none";}catch (err) {}
        try{document.getElementById("nine").style.display="";}catch (err) {}
    }else{
        try{document.getElementById("one").style.display="none";}catch (err) {}
        try{document.getElementById("four").style.display="none";}catch (err) {}
        try{document.getElementById("nine").style.display="none";}catch (err) {}
    }
}

//ocx控件登陆
//Init("10.246.0.3","5060","10.246.0.3","Sroot","HY215gis");
//hidenVideoRegion();
