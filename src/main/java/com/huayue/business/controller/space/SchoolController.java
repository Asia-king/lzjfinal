package com.huayue.business.controller.space;

import com.huayue.business.model.space.GeologicalHazard;
import com.huayue.business.model.space.School;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 学校
 * @author CXL
 *
 */

@ControllerBind(controllerKey="/business/school")
public class SchoolController extends Controller<School>{
	/**
	 * 统计
	 */
	public void count() throws Exception{
		renderJson(School.school.count());
	}
	public void addDB()
	{
		renderJsonResult(getModel(School.class,"School").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(School.class,"School").update());
	}
	public void deleteDB()
	{
		renderJsonResult(School.school.deleteBysId(getParaToInt("id")));
	}
}
