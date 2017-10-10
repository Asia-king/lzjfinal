package com.huayue.business.controller.nospace;

import com.alibaba.fastjson.JSONObject;
import com.huayue.business.model.nospace.CallHelpReport;
import com.huayue.business.model.nospace.EarthquakeList;
import com.huayue.common.UrlConfig;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.huayue.service.ZbusMQServer;
import com.jfinal.ext.route.ControllerBind;

@ControllerBind(controllerKey="/business/callhelpreport", viewPath = UrlConfig.SYSTEM)
public class CallHelpReportController extends Controller<CallHelpReport> {
	/**
	 * 添加
	 */
	public void add() throws Exception{

		JSONObject json = new JSONObject();
		json.put("time", (Object)getPara("time"));
		json.put("userid", (Object)getPara("userId"));
		
		ZbusMQServer zmqs=new ZbusMQServer();
//		zmqs.server(json, "MyMQ", 1);
		renderJson(CallHelpReport.callHelpReport.add((Object)getPara("eqId"), (Object)getPara("time"), (Object)getPara("x"), (Object)getPara("y"), (Object)getPara("imgUrl"), (Object)getPara("videoUrl"), (Object)getPara("audioUrl"),(Object)getPara("userId"), (Object)getPara("userName")));
	}
	
	
	/**
	 * 查询所有数据
	 */
	public void queryAll(){
		renderJson(CallHelpReport.callHelpReport.list());
	}
}
