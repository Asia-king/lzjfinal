package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.DEconomy;
import com.huayue.business.model.nospace.DEmePlan;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 地震应急法规与预案数据表
 * 
 * @author CXL
 *
 */

@ControllerBind(controllerKey = "/business/demeplan")
public class DEmePlanController extends Controller<DEmePlan>{
	/**
	 * 查询数据
	 * parameter参数为null则查询所有数据
	 * parameter参数不为null则根据parameter参数为条件查询数据
	 * 返回json格式
	 */
	public void query() throws Exception{
		renderJson(DEmePlan.dEmePlan.query((Object)getPara("parameter")));
	}
	public void addDB()
	{
		renderJsonResult(getModel(DEmePlan.class,"DEmePlan").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DEmePlan.class,"DEmePlan").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DEmePlan.dEmePlan.deleteBysId(getParaToInt("id")));
	}
}
