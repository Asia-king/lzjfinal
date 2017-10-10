package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.DLocalNet;
import com.huayue.business.model.nospace.DMedical;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 行政区医疗力量数据表
 * 
 * @author CXL
 *
 */

@ControllerBind(controllerKey = "/business/dmedical")
public class DMedicalController extends Controller<DMedical>{
	/**
	 * 查询数据
	 * parameter参数为null则查询所有数据
	 * parameter参数不为null则根据parameter参数为条件查询数据
	 * 返回json格式
	 */
	public void query() throws Exception{
		renderJson(DMedical.dMedical.query((Object)getPara("parameter")));
	}
	public void addDB()
	{
		renderJsonResult(getModel(DMedical.class,"DMedical").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DMedical.class,"DMedical").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DMedical.dMedical.deleteBysId(getParaToInt("id")));
	}
}
