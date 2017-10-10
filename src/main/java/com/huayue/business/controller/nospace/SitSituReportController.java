package com.huayue.business.controller.nospace;

import com.alibaba.fastjson.JSONObject;
import com.huayue.business.model.nospace.SitSituReport;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.huayue.service.ZbusMQServer;
import com.jfinal.ext.route.ControllerBind;

/**
 * 安置点灾情上报表
 * @author CXL
 *
 */

@ControllerBind(controllerKey="/business/sitsitureport")
public class SitSituReportController extends Controller<SitSituReport>{
	/**
	 * 添加
	 */
	public void add() throws Exception{
		JSONObject json = new JSONObject();
		json.put("time", (Object)getPara("time"));
		json.put("userid", (Object)getPara("userId"));
		
		ZbusMQServer zmqs=new ZbusMQServer();
		zmqs.server(json, "MyMQ", 1);
		renderJson(SitSituReport.sitSituReport.add((Object)getPara("eqId"), (Object)getPara("name"), (Object)getPara("time"), (Object)getPara("x"), (Object)getPara("y"), (Object)getPara("address"), (Object)getPara("totalNum"), (Object)getPara("realNum"), (Object)getPara("injuredNum"), (Object)getPara("material"), (Object)getPara("medical"), (Object)getPara("videoUrl"), (Object)getPara("audioUrl"), (Object)getPara("imgUrl"), (Object)getPara("userId"), (Object)getPara("userName"), (Object)getPara("description")));
	}
	/**
	 * 查询
	 */
	public void querybycolumn(){
		renderJson(SitSituReport.sitSituReport.listbycolumn());
	}
	/**
	 * 查询
	 */
	public void querybycolumnuser(){
		renderJson(SitSituReport.sitSituReport.listbycolumnuser((Object)getPara("userid")));
	}
	/**
	 * 查询
	 */
	public void querybyId(){
		renderJson(SitSituReport.sitSituReport.querybyId((Object)getPara("para")));
	}
	/**
	 * 查询
	 */
	public void queryall() throws Exception{
		renderJson(SitSituReport.sitSituReport.query((Object)getPara("parameter")));
	}
	
	/**
	 * 查询
	 */
	public void query() throws Exception{
		String eqId = getPara("eqId");
//		renderJson(SitSituReport.sitSituReport.query((Object)getPara("parameter"),"eq_id=" + eqId));
		renderJson(SitSituReport.sitSituReport.query((Object)getPara("parameter")," 1=1"));
	}
	
	/**
	 * 根据用户名称进行查询
	 * @throws Exception
	 */
	public void queryByUser() throws Exception{
		String eqId = getPara("eqId");
		String userId = getPara("userId");
//		String queryCon = "eq_id=" + eqId + " and user_id='"+userId+"' ";
		String queryCon = "user_id='"+userId+"'";
		renderJson(SitSituReport.sitSituReport.query("ALL",queryCon));
	}
	/**
	 * 修改审核状态
	 * @throws Exception
	 */
	public void updataByCheck() throws Exception{
		renderJson(SitSituReport.sitSituReport.updataByCheck((Object)getPara("id"), (Object)getPara("check")));
	}
	
	/**
	 * 修改上报事件的信息
	 * @throws Exception
	 */
	public void updataMessage() throws Exception{
		renderJson(SitSituReport.sitSituReport.updateMessage((Object)getPara("id"), (Object)getPara("name"), (Object)getPara("time"), (Object)getPara("x"), (Object)getPara("y"), (Object)getPara("address"), (Object)getPara("totalNum"), (Object)getPara("realNum"), (Object)getPara("injuredNum"), (Object)getPara("material"), (Object)getPara("medical"),(Object)getPara("description")));
	}
	/**
	 * 删除
	 * @throws Exception
	 */
	public void deleteByIds() throws Exception{
		renderJson(SitSituReport.sitSituReport.deleteByIds((Object)getPara("ids")));
	}
	public void addDB()
	{
		renderJsonResult(getModel(SitSituReport.class,"SitSituReport").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(SitSituReport.class,"SitSituReport").update());
	}
	public void deleteDB()
	{
		renderJsonResult(SitSituReport.sitSituReport.deleteBysId(getParaToInt("id")));
	}
}
