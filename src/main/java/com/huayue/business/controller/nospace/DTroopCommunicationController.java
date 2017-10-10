package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.DStoInventory;
import com.huayue.business.model.nospace.DTroopCommunication;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 军队与武装力量联系数据表
 * 
 * @author CXL
 *
 */

@ControllerBind(controllerKey = "/business/dtroopcommunication")
public class DTroopCommunicationController extends Controller<DTroopCommunication>{
	/**
	 * 查询数据
	 * parameter参数为null则查询所有数据
	 * parameter参数不为null则根据parameter参数为条件查询数据
	 * 返回json格式
	 */
	public void query() throws Exception{
		renderJson(DTroopCommunication.dTroopCommunication.query((Object)getPara("parameter")));
	}
	public void addDB()
	{
		renderJsonResult(getModel(DTroopCommunication.class,"DTroopCommunication").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DTroopCommunication.class,"DTroopCommunication").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DTroopCommunication.dTroopCommunication.deleteBysId(getParaToInt("id")));
	}
}
