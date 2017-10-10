package com.huayue.business.controller.space;

import com.huayue.business.model.space.EvacuationSite;
import com.huayue.business.model.space.GeologicalHazard;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 地震地质灾害危险区分布属性表
 * @author CXL
 *
 */

@ControllerBind(controllerKey="/business/geologicalhazard")
public class GeologicalHazardController extends Controller<GeologicalHazard>{
	/**
	 * 统计
	 */
	public void count() throws Exception{
		renderJson(GeologicalHazard.geologicalHazard.count());
	}
	public void addDB()
	{
		renderJsonResult(getModel(GeologicalHazard.class,"GeologicalHazard").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(GeologicalHazard.class,"GeologicalHazard").update());
	}
	public void deleteDB()
	{
		renderJsonResult(GeologicalHazard.geologicalHazard.deleteBysId(getParaToInt("id")));
	}
}
