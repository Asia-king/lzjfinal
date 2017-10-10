package com.huayue.business.controller.nospace;

import com.alibaba.fastjson.JSONObject;
import com.huayue.business.model.nospace.AftDisReport;
import com.huayue.business.model.nospace.EmeReport;
import com.huayue.business.model.nospace.SitSituReport;
import com.huayue.common.Consts;
import com.huayue.common.FileController;
import com.huayue.common.UrlConfig;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.huayue.service.ZbusMQServer;
import com.huayue.service.ZbusRPCMQServer;
import com.huayue.shiro.ShiroCache;
import com.huayue.shiro.ShiroInterceptor;
import com.huayue.system.model.Res;
import com.huayue.system.model.Role;
import com.jfinal.ext.route.ControllerBind;

/**
 * 震后灾情上报表
 * @author CXL
 *
 */

@ControllerBind(controllerKey="/business/aftdisreport", viewPath = UrlConfig.SYSTEM)
public class AftDisReportController extends Controller<AftDisReport>{
	/**
	 * 添加
	 */
	public void add() throws Exception{

		JSONObject json = new JSONObject();
		json.put("time", (Object)getPara("time"));
		json.put("userid", (Object)getPara("userId"));
		
		//ZbusMQServer zmqs=new ZbusMQServer();
//		zmqs.server(json, "MyMQ", 1);
		Object object = (Object)getPara("abnormalId");
		renderJson(AftDisReport.aftDisReport.add((Object)getPara("eqId"), (Object)getPara("time"), (Object)getPara("x"), (Object)getPara("y"),(Object)getPara("description"), (Object)getPara("address"), (Object)getPara("imgUrl"), (Object)getPara("videoUrl"), (Object)getPara("audioUrl"), (Object)getPara("abnormalId"),(Object)getPara("abnormalState"), (Object)getPara("abnormalName"), (Object)getPara("userId"), (Object)getPara("userName")));
	}
	
	/**
	 * 查询
	 */
	public void querybycolumn(){
		renderJson(AftDisReport.aftDisReport.listbycolumn());
	}
	/**
	 * 查询
	 */
	public void querybycolumnuser(){
		renderJson(AftDisReport.aftDisReport.listbycolumnuser((Object)getPara("userid")));
	}
	/**
	 * 查询
	 * @throws Exception
	 */
	public void querybyId() throws Exception{
		renderJson(AftDisReport.aftDisReport.querybyId((Object)getPara("para")));
	}
	
	/**
	 * 查询
	 */
	public void queryall() throws Exception{
		renderJson(AftDisReport.aftDisReport.query((Object)getPara("parameter")));
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
		renderJson(AftDisReport.aftDisReport.query("ALL",queryCon));
	}
	
	/**
	 * 查询
	 * @throws Exception
	 */
	public void query() throws Exception{
//		String eqId = getPara("eqId");
		String eventType = getPara("eventCode");
		String queryCon = "1=1";
		
		if(!eventType.equals("NULL")){
			queryCon = queryCon + " and abnormal_id='"+eventType+"'";
		}
		renderJson(AftDisReport.aftDisReport.query((Object)getPara("parameter"),queryCon));
	}
	/**
	 * 上报事件信息修改的方法
	 * @throws Exception
	 */
	public void updataMessage() throws Exception{
		renderJson(AftDisReport.aftDisReport.updataEventMessage((Object)getPara("id"),(Object)getPara("time"), (Object)getPara("x"), (Object)getPara("y"),(Object)getPara("description"), (Object)getPara("address"),(Object)getPara("abnormalId"),(Object)getPara("abnormalState"), (Object)getPara("abnormalName")));
	}
	/**
	 * 修改审核状态
	 * @throws Exception
	 */
	public void updataByCheck() throws Exception{
		renderJson(AftDisReport.aftDisReport.updataByCheck((Object)getPara("id"), (Object)getPara("check")));
	}

	/**
	 * 删除
	 * @throws Exception
	 */
	public void deleteByIds() throws Exception{
		renderJson(AftDisReport.aftDisReport.deleteByIds((Object)getPara("ids")));
	}
	
	public void adds()
	{
		renderJsonResult(getModel(AftDisReport.class,"AftDisReport").save());
	}
	public void edit()
	{
		renderJsonResult(getModel(AftDisReport.class,"AftDisReport").update());
	}
	public void delete()
	{
		renderJsonResult(AftDisReport.aftDisReport.deleteBysId(getParaToInt("id")));
	}
	
}
