package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.DMedical;
import com.huayue.business.model.nospace.DNsbCommunication;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 地震系统联系数据表
 * 
 * @author CXL
 *
 */

@ControllerBind(controllerKey = "/business/dnsbcommunication")
public class DNsbCommunicationController extends Controller<DNsbCommunication>{
	/**
	 * 查询数据
	 * parameter参数为null则查询所有数据
	 * parameter参数不为null则根据parameter参数为条件查询数据
	 * 返回json格式
	 */
	public void query() throws Exception{
		renderJson(DNsbCommunication.dNsbCommunication.query((Object)getPara("parameter")));
	}
	
	public void addDB()
	{
		renderJsonResult(getModel(DNsbCommunication.class,"DNsbCommunication").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DNsbCommunication.class,"DNsbCommunication").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DNsbCommunication.dNsbCommunication.deleteBysId(getParaToInt("id")));
	}
}
