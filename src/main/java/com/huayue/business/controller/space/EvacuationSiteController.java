package com.huayue.business.controller.space;

import com.huayue.business.model.space.DangerousSource;
import com.huayue.business.model.space.EvacuationSite;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 城区疏散场地
 * @author CXL
 *
 */

@ControllerBind(controllerKey="/business/evacuationsite")
public class EvacuationSiteController extends Controller<EvacuationSite>{
	/**
	 * 统计
	 */
	public void count() throws Exception{
		renderJson(EvacuationSite.evacuationSite.count());
	}
	public void addDB()
	{
		renderJsonResult(getModel(EvacuationSite.class,"EvacuationSite").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(EvacuationSite.class,"EvacuationSite").update());
	}
	public void deleteDB()
	{
		renderJsonResult(EvacuationSite.evacuationSite.deleteBysId(getParaToInt("id")));
	}
}
