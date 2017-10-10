package com.huayue.business.controller.nospace;

import java.io.IOException;

import com.alibaba.fastjson.JSONObject;
import com.huayue.business.model.nospace.DisStaReport;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.huayue.service.ZbusMQServer;
import com.jfinal.ext.route.ControllerBind;

/**
 * 救灾状态上报
 * @author CXL
 *
 */

@ControllerBind(controllerKey="/business/disstareport")
public class DisStaReportController extends Controller<DisStaReport>{
	/**
	 * 添加
	 * @throws InterruptedException 
	 * @throws IOException 
	 */
	public void add() throws IOException, InterruptedException{
		
		JSONObject json = new JSONObject();
		json.put("time", (Object)getPara("time"));
		json.put("userid", (Object)getPara("userId"));
		
		ZbusMQServer zmqs=new ZbusMQServer();
		zmqs.server(json, "MyMQ", 1);
		renderJson(DisStaReport.disStaReport.add((Object)getPara("eqId"), (Object)getPara("type"), (Object)getPara("name"), (Object)getPara("time"), (Object)getPara("xy"), (Object)getPara("address"), (Object)getPara("disState"), (Object)getPara("videoUrl"), (Object)getPara("audioUrl"), (Object)getPara("imgUrl"), (Object)getPara("remark"), (Object)getPara("userId"), (Object)getPara("userName")));
	}
	
	/**
	 * 查询
	 */
	public void querybyId(){
		renderJson(DisStaReport.disStaReport.querybyId((Object)getPara("para")));
	}
	/**
	 * 查询
	 */
	public void querybycolumn(){
		renderJson(DisStaReport.disStaReport.listbycolumn());
	}
	/**
	 * 查询
	 */
	public void querybycolumnuser(){
		renderJson(DisStaReport.disStaReport.listbycolumnuser((Object)getPara("userid")));
	}
	
	/**
	 * 查询
	 * @throws Exception 
	 */
	public void query() throws Exception{
//		String eqId = getPara("eqId");
		String type = getPara("type");
		String queryCon = " 1=1";
		if(type!=null){
			if(!(type.equals("NULL"))){
				queryCon = queryCon + " and type='"+type+"' ";
			}
		}
		renderJson(DisStaReport.disStaReport.query((Object)getPara("parameter"), queryCon));
	}
	
	/**
	 * 查询
	 * @throws Exception 
	 */
	public void queryall() throws Exception{
		renderJson(DisStaReport.disStaReport.query((Object)getPara("parameter")));
	}

	/**
	 * 修改审核状态
	 * @throws Exception
	 */
	public void updataByCheck() throws Exception{
		renderJson(DisStaReport.disStaReport.updataByCheck((Object)getPara("id"), (Object)getPara("check")));
	}
	
	/**
	 * 修改上报事件的信息
	 * @throws Exception
	 */
	public void updataMessage() throws Exception{
		renderJson(DisStaReport.disStaReport.updateMessage((Object)getPara("id"),(Object)getPara("eqId"), (Object)getPara("type"), (Object)getPara("name"), (Object)getPara("time"), (Object)getPara("xy"), (Object)getPara("address"), (Object)getPara("disState"), (Object)getPara("check"), (Object)getPara("state"), (Object)getPara("remark")));
	}
	/**
	 * 删除
	 * @throws Exception
	 */
	public void deleteByIds() throws Exception{
		renderJson(DisStaReport.disStaReport.deleteByIds((Object)getPara("ids")));
	}
	public void addDB()
	{
		renderJsonResult(getModel(DisStaReport.class,"DisStaReport").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DisStaReport.class,"DisStaReport").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DisStaReport.disStaReport.deleteBysId(getParaToInt("id")));
	}
}
