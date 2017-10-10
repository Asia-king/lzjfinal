package com.huayue.business.controller.space;

import com.huayue.business.model.nospace.DEconomy;
import com.huayue.business.model.space.EnterpriseCode;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 大型企业表
 * @author CXL
 *
 */

@ControllerBind(controllerKey="/business/enterprisecode")
public class EnterpriseCodeController extends Controller<EnterpriseCode>{
	/**
	 * 统计
	 */
	public void count(){
		renderJson(EnterpriseCode.enterpriseCode.count());
	}
	
	public void addDB()
	{
		renderJsonResult(getModel(EnterpriseCode.class,"EnterpriseCode").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(EnterpriseCode.class,"EnterpriseCode").update());
	}
	public void deleteDB()
	{
		renderJsonResult(EnterpriseCode.enterpriseCode.deleteBysId(getParaToInt("id")));
	}
}
