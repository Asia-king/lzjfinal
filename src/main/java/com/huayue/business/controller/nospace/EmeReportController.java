package com.huayue.business.controller.nospace;

import com.alibaba.fastjson.JSONObject;
import com.huayue.business.model.nospace.EmeReport;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.huayue.service.ZbusMQServer;
import com.jfinal.ext.route.ControllerBind;

/**
 * 紧急事件上报表
 * @author CXL
 *
 */

@ControllerBind(controllerKey="/business/emereport")
public class EmeReportController extends Controller<EmeReport>{
	/**
	 * 添加
	 */
	public void add() throws Exception{
		JSONObject json = new JSONObject();
		json.put("time", (Object)getPara("time"));
		json.put("userid", (Object)getPara("userId"));
		
		ZbusMQServer zmqs=new ZbusMQServer();
		zmqs.server(json, "MyMQ", 1);
		renderJson(EmeReport.emeReport.add((Object)getPara("eqId"), (Object)getPara("time"), (Object)getPara("x"), (Object)getPara("y"), (Object)getPara("address"), (Object)getPara("description"), (Object)getPara("imgUrl"), (Object)getPara("videoUrl"), (Object)getPara("audioUrl"), (Object)getPara("name"), (Object)getPara("userId"), (Object)getPara("userName")));
	}
	
	/**
	 * 查询
	 */
	public void querybyId(){
		renderJson(EmeReport.emeReport.querybyId((Object)getPara("para")));
	}
	/**
	 * 查询
	 */
	public void querybycolumn(){
		renderJson(EmeReport.emeReport.listbycolumn());
	}
	/**
	 * 查询
	 */
	public void querybycolumnuser(){
		renderJson(EmeReport.emeReport.listbycolumnuser((Object)getPara("userid")));
	}
	/**
	 * 查询
	 */
	public void queryall() throws Exception{
		renderJson(EmeReport.emeReport.query((Object)getPara("parameter")));
	}
	/**
	 * 查询
	 */
	public void query() throws Exception{
//		String eqId = getPara("eqId");
//		renderJson(EmeReport.emeReport.query((Object)getPara("parameter"), "eq_id="+eqId));
		renderJson(EmeReport.emeReport.query((Object)getPara("parameter"), " 1=1"));
	}
	
	/**
	 * 根据用户名称进行查询
	 * @throws Exception
	 */
	public void queryByUser() throws Exception{
		String eqId = getPara("eqId");
		String userId = getPara("userId");
//		String queryCon = "eq_id=" + eqId + " and user_id='"+userId+"' ";
		String queryCon = " user_id='"+userId+"'";
		renderJson(EmeReport.emeReport.query("ALL",queryCon));
	}
	/**
	 * 修改审核状态
	 * @throws Exception
	 */
	public void updataByCheck() throws Exception{
		renderJson(EmeReport.emeReport.updataByCheck((Object)getPara("id"), (Object)getPara("check")));
	}
	
	
	/**
	 * 修改上报事件的信息
	 * @throws Exception
	 */
	public void updataMessage() throws Exception{
		renderJson(EmeReport.emeReport.updataMessage((Object)getPara("id"), (Object)getPara("time"), (Object)getPara("x"), (Object)getPara("y"), (Object)getPara("address"), (Object)getPara("description"), (Object)getPara("name")));
	}
	
	/**
	 * 删除
	 * @throws Exception
	 */
	public void deleteByIds() throws Exception{
		renderJson(EmeReport.emeReport.deleteByIds((Object)getPara("ids")));
	}
	
	public void addDB()
	{
		renderJsonResult(getModel(EmeReport.class,"EmeReport").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(EmeReport.class,"EmeReport").update());
	}
	public void deleteDB()
	{
		renderJsonResult(EmeReport.emeReport.deleteBysId(getParaToInt("id")));
	}
}
