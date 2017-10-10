package com.huayue.business.controller.space;

import com.huayue.business.model.nospace.AftDisReport;
import com.huayue.business.model.space.DangerousSource;
import com.huayue.business.model.space.EnterpriseCode;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 重大火灾、爆炸、有毒和放射危险源属性表
 * @author CXL
 *
 */

@ControllerBind(controllerKey="/business/dangeroussource")
public class DangerousSourceController extends Controller<DangerousSource>{
	/**
	 * 统计
	 */
	public void count() throws Exception{
		renderJson(DangerousSource.dangerousSource.count());
	}
	public void addDB()
	{
		renderJsonResult(getModel(DangerousSource.class,"DangerousSource").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DangerousSource.class,"DangerousSource").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DangerousSource.dangerousSource.deleteBysId(getParaToInt("id")));
	}
}
