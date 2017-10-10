package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.DCityRatio;
import com.huayue.business.model.nospace.DClimate;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 气候数据表
 * 
 * @author CXL
 *
 */

@ControllerBind(controllerKey = "/business/dclimate")
public class DClimateController extends Controller<DClimate>{
	/**
	 * 查询数据
	 * parameter参数为null则查询所有数据
	 * parameter参数不为null则根据parameter参数为条件查询数据
	 * 返回json格式
	 */
	public void query() throws Exception{
		renderJson(DClimate.dClimate.query((Object)getPara("parameter")));
	}
	public void addDB()
	{
		renderJsonResult(getModel(DClimate.class,"DClimate").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DClimate.class,"DClimate").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DClimate.dClimate.deleteBysId(getParaToInt("id")));
	}
}
