/**
 * 将WGS-84坐标系转换为CGCS2000坐标
 */
function convertCoords(lon,lat){
//	var MajorSemiaxis = 6378137;//长半轴
//	var Oblateness = 0.00335281066474748;//扁率
//  var degree = 3;
    var daihao = 35;
    var a = 6378137;//椭球体长半轴
    var f = 0.00335281066474748;//扁率
    var b = a * (1 - f);//椭球体短半轴
    var e = Math.sqrt(1-Math.pow((b / a), 2));//第一偏心率
    var eq = Math.sqrt(Math.pow((a / b), 2) - 1);//第二偏心率
    var dh = 0;//带号
    var de = 3;//几度分带
    var FE;//东偏移
    var FN;//北偏移
    var L0 = 0;//中央经度
    var k0;//比例因子
    var PI = Math.PI;
   
    if (de == 6) {
        dh = daihao;
        L0 = (6 * dh - 3) * PI / 180;
    } else if (de == 3) {
        dh = daihao;
        L0 = (3 * dh) * PI / 180;
    }
    k0 = 1;
    FE = 500000 + dh * 1000000;
    FN = 0;
    
    var B;//纬度（弧度制）
    var L;//经度
    var T;
    var C;
    var A;
    var M;
    var N;
    var X;
    var Y;
    
    B = lat * PI / 180;
    L = lon * PI / 180;
    T = Math.pow(Math.tan(B), 2);
    C = Math.pow(eq, 2) * Math.pow(Math.cos(B), 2);
    A = (L - L0) * Math.cos(B);

    M = a * ((1 - Math.pow(e, 2) / 4 - 3 * Math.pow(e, 4) / 64 - 5 * Math.pow(e, 6) / 256) * B - (3 * Math.pow(e, 2) / 8 + 3 * Math.pow(e, 4) / 32 + 45 * Math.pow(e, 6) / 1024) * Math.sin(2 * B) + (15 * Math.pow(e, 4) / 256 + 45 * Math.pow(e, 6) / 1024) * Math.sin(4 * B) - (35 * Math.pow(e, 6) / 3072) * Math.sin(6 * B));
    N = a / Math.sqrt(1 - Math.pow(e, 2) * Math.pow(Math.sin(B), 2));
    Y = k0 * (M + N * Math.tan(B) * (Math.pow(A, 2) / 2 + (5 - T + 9 * C + 4 * Math.pow(C, 2)) * Math.pow(A, 4) / 24) + (61 - 58 * T + Math.pow(T, 2) + 270 * C - 330 * T * C) * Math.pow(A, 6) / 720);
    X = FE + k0 * N * (A + (1 - T + C) * Math.pow(A, 3) / 6 + (5 - 18 * T + Math.pow(T, 2) + 14 * C - 58 * T * C) * Math.pow(A, 5) / 120);
    var coords_GaussKruger = new Object;
    coords_GaussKruger.lon = X;
    coords_GaussKruger.lat = Y;
    return coords_GaussKruger;
}
