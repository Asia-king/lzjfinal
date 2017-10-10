package com.huayue.business.controller.nospace;

import com.alibaba.fastjson.JSONObject;
import com.huayue.business.model.nospace.MacAnoReports;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.huayue.service.ZbusMQServer;
import com.jfinal.ext.route.ControllerBind;

/**
 * 宏观异常上报表
 * @author CXL
 *
 */

@ControllerBind(controllerKey="/business/macanoreports")
public class MacAnoReportsController extends Controller<MacAnoReports>{
	/**
	 * 添加
	 */
	public void add() throws Exception{
		JSONObject json = new JSONObject();
		json.put("time", (Object)getPara("time"));
		json.put("userid", (Object)getPara("userId"));
		
		ZbusMQServer zmqs=new ZbusMQServer();
//		zmqs.server(json, "MyMQ", 1);
		renderJson(MacAnoReports.macAnoReports.add(getPara("time"), getPara("x"), getPara("y"), getPara("address"), (Object)getPara("imgUrl"), (Object)getPara("videoUrl"), (Object)getPara("audioUrl"), (Object)getPara("abnormalId"), (Object)getPara("abnormalName"), (Object)getPara("abnormalState"), (Object)getPara("description"), (Object)getPara("userId"), (Object)getPara("userName")));	
	}
	
	/**
	 * 查询
	 */
	public void querybycolumn(){
		renderJson(MacAnoReports.macAnoReports.listbycolumn());
	}
	/**
	 * 查询
	 */
	public void querybycolumnuser(){
		renderJson(MacAnoReports.macAnoReports.listbycolumnuser((Object)getPara("userid")));
	}
	
	/**
	 * 查询
	 */
	public void querybyId(){
		renderJson(MacAnoReports.macAnoReports.querybyId((Object)getPara("para")));
	}
	/**
	 * 查询
	 */
	public void queryall() throws Exception{
		renderJson(MacAnoReports.macAnoReports.query((Object)getPara("parameter")));
	}
	/**
	 * 查询
	 */
	public void query() throws Exception{
		renderJson(MacAnoReports.macAnoReports.query((Object)getPara("parameter"),"NULL"));
	}
	/**
	 * 删除
	 * @throws Exception
	 */
	public void deleteByIds() throws Exception{
		renderJson(MacAnoReports.macAnoReports.deleteByIds((Object)getPara("ids")));
	}
	
	public void addDB()
	{
		renderJsonResult(getModel(MacAnoReports.class,"MacAnoReports").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(MacAnoReports.class,"MacAnoReports").update());
	}
	public void deleteDB()
	{
		renderJsonResult(MacAnoReports.macAnoReports.deleteBysId(getParaToInt("id")));
	}
	
	
}
