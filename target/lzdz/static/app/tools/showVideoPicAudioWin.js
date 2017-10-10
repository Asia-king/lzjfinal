/*
 * 浏览照片的方法
 * */
function browsePicture(content){
	//content是照片的url地址，调用照片查看器查看图片
	var picData = content.split(";");
	//显示放置图片的div
	$("#pictureBroses").css("display","block");
	$("#pictureBroses div").remove();
	
//	var testPicData = [
//		'E:/workspace/earthquake0.7.0/jfinal-easyui/src/main/webapp/static/images/myFocusTestImg/1a.jpg',
//		'E:/workspace/earthquake0.7.0/jfinal-easyui/src/main/webapp/static/images/myFocusTestImg/2a.jpg',
//		'E:/workspace/earthquake0.7.0/jfinal-easyui/src/main/webapp/static/images/myFocusTestImg/3a.jpg',
//		'E:/workspace/earthquake0.7.0/jfinal-easyui/src/main/webapp/static/images/myFocusTestImg/4a.jpg',
//		'E:/workspace/earthquake0.7.0/jfinal-easyui/src/main/webapp/static/images/myFocusTestImg/5a.jpg',
//		'jfinal-easyui/../static/images/myFocusTestImg/1a.jpg'
//	];
	
	$("#pictureBroses").append("<div id='myFocus'></div>");
	//这里class='pic'中的pic是不能被改变的
	$("#myFocus").append("<div class='loading'><img src='jfinal-easyui/../static/images/myFocusTestImg/loading.gif' alt='请稍候...' /></div>"+
				  "<div class='pic'>"+
				  	"<ul id='myFocusContent'></ul>"+
				  "</div>");
	
	for (var i=0; i<picData.length; i++) {
		if(picData[i] != "" && picData[i] != null && picData[i] != "null"){
			var src = "jfinal-easyui/../static/uploadFile/" + picData[i];
			$("#myFocusContent").append("<li><img style='width:100%;height:100%' src="+src+" /></li>");
		}
		
	}
	
	
	myFocus.set({
		id:'myFocus',//ID
		pattern:'mF_pithy_tb'
	});
}

/*
 * 播放视频的方法
 * */
function playVideo(content){
	var videoData = content.split(";");
	$("#myvideos").remove();
	$("#myaudios").remove();
//	$("#myvideos").append("<source src='jfinal-easyui/../static/uploadFile/"+videoData[0]+"' type='video/mp4'>");
//	$("#myvideos").append("<source src='jfinal-easyui/../static/uploadFile/"+videoData[0]+"' type='video/3gp'>");
//	$("#videoControl").append("<video id='myvideoss' src='jfinal-easyui/../static/uploadFile/"+videoData[0]+"' controls preload='auto' width='500px' height='300px'></video>");
	$("#videoControl").append("<video id='myvideos' controls preload='auto' style='width:500px; height:300px;'>"
			+"<source src='jfinal-easyui/../static/uploadFile/"+videoData[0]+"' type='video/mp4'>"
			+"</video>");
	$("#videoControl").css("display","block");
//	$("#myvideos").play();
	document.getElementById('myvideos').play();
}

/*
 * 播放音频的方法
 * */
function playAudio(content){
	var audioData = content.split(";");
//	alert(content);
	$("#myvideos").remove();
	$("#myaudios").remove();
//	$("#myvideos").append("<source src='jfinal-easyui/../static/uploadFile/"+audioData[0]+"' type='audio/mp4'>");
//	$("#myvideos").append("<source src='jfinal-easyui/../static/uploadFile/"+audioData[0]+"' type='video/mp3'>");
	$("#videoControl").append("<audio id='myaudios' controls preload='auto' style='width:500px; height:300px;'>" 
						+"<source src='jfinal-easyui/../static/uploadFile/"+audioData[0]+"' type='audio/mp3'>"
						+"</audio>");
	
	$("#videoControl").css("display","block");
	$("#myvideos").play();
}
