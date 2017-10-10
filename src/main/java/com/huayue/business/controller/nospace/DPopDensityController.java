package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.DNsbCommunication;
import com.huayue.business.model.nospace.DPopDensity;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 人口密度
 * 
 * @author CXL
 *
 */

@ControllerBind(controllerKey = "/business/dpopdensity")
public class DPopDensityController extends Controller<DPopDensity>{
	/**
	 * 查询数据
	 * parameter参数为null则查询所有数据
	 * parameter参数不为null则根据parameter参数为条件查询数据
	 * 返回json格式
	 */
	public void query() throws Exception{
		renderJson(DPopDensity.dPopDensity.query((Object)getPara("parameter")));
	}
	public void addDB()
	{
		renderJsonResult(getModel(DPopDensity.class,"DPopDensity").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DPopDensity.class,"DPopDensity").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DPopDensity.dPopDensity.deleteBysId(getParaToInt("id")));
	}
}
