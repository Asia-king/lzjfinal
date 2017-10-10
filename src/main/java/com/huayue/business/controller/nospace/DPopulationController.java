package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.DPopDensity;
import com.huayue.business.model.nospace.DPopulation;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 人口统计
 * 
 * @author CXL
 *
 */

@ControllerBind(controllerKey = "/business/dpopulation")
public class DPopulationController extends Controller<DPopulation>{
	/**
	 * 查询数据
	 * parameter参数为null则查询所有数据
	 * parameter参数不为null则根据parameter参数为条件查询数据
	 * 返回json格式
	 */
	public void query() throws Exception{
		renderJson(DPopulation.dPopulation.query((Object)getPara("parameter")));
	}
	public void addDB()
	{
		renderJsonResult(getModel(DPopulation.class,"DPopulation").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DPopulation.class,"DPopulation").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DPopulation.dPopulation.deleteBysId(getParaToInt("id")));
	}
}
