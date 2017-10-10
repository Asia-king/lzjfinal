package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.DClimate;
import com.huayue.business.model.nospace.DEconomy;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 国民经济统计表
 * 
 * @author CXL
 *
 */

@ControllerBind(controllerKey = "/business/deconomy")
public class DEconomyController extends Controller<DEconomy>{
	/**
	 * 查询数据
	 * parameter参数为null则查询所有数据
	 * parameter参数不为null则根据parameter参数为条件查询数据
	 * 返回json格式
	 */
	public void query() throws Exception{
		renderJson(DEconomy.dEconomy.query((Object)getPara("parameter")));
	}
	public void addDB()
	{
		renderJsonResult(getModel(DEconomy.class,"DEconomy").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DEconomy.class,"DEconomy").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DEconomy.dEconomy.deleteBysId(getParaToInt("id")));
	}
}
