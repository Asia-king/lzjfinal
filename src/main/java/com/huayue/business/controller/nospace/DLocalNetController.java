package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.DLocalHeadquarters;
import com.huayue.business.model.nospace.DLocalNet;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 灾情速报网络数据表
 * 
 * @author CXL
 *
 */

@ControllerBind(controllerKey = "/business/dlocalnet")
public class DLocalNetController extends Controller<DLocalNet>{
	/**
	 * 查询数据
	 * parameter参数为null则查询所有数据
	 * parameter参数不为null则根据parameter参数为条件查询数据
	 * 返回json格式
	 */
	public void query() throws Exception{
		renderJson(DLocalNet.dLocalNet.query((Object)getPara("parameter")));
	}
	
	public void addDB()
	{
		renderJsonResult(getModel(DLocalNet.class,"DLocalNet").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DLocalNet.class,"DLocalNet").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DLocalNet.dLocalNet.deleteBysId(getParaToInt("id")));
	}
}
