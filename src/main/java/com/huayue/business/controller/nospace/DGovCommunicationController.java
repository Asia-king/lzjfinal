package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.DEmePlan;
import com.huayue.business.model.nospace.DGovCommunication;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 地方政府系统联系数据表
 * 
 * @author CXL
 *
 */

@ControllerBind(controllerKey = "/business/dgovcommunication")
public class DGovCommunicationController extends Controller<DGovCommunication>{
	/**
	 * 查询数据
	 * parameter参数为null则查询所有数据
	 * parameter参数不为null则根据parameter参数为条件查询数据
	 * 返回json格式
	 */
	public void query() throws Exception{
		renderJson(DGovCommunication.dGovCommunication.query((Object)getPara("parameter")));
	}
	public void addDB()
	{
		renderJsonResult(getModel(DGovCommunication.class,"DGovCommunication").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DGovCommunication.class,"DGovCommunication").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DGovCommunication.dGovCommunication.deleteBysId(getParaToInt("id")));
	}
}
