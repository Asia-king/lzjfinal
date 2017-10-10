package com.huayue.business.controller.space;

import com.huayue.business.model.space.School;
import com.huayue.business.model.space.SigObjective;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 重大目标
 * @author CXL
 *
 */

@ControllerBind(controllerKey="/business/sigobjective")
public class SigObjectiveController extends Controller<SigObjective>{
	/**
	 * 统计
	 */
	public void count() throws Exception{
		renderJson(SigObjective.sigObjective.count());
	}
	public void addDB()
	{
		renderJsonResult(getModel(SigObjective.class,"SigObjective").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(SigObjective.class,"SigObjective").update());
	}
	public void deleteDB()
	{
		renderJsonResult(SigObjective.sigObjective.deleteBysId(getParaToInt("id")));
	}
}
