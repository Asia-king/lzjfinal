package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.DBuiCity1;
import com.huayue.business.model.nospace.DCityRatio;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 区县中城区房屋统计比例表
 * 
 * @author CXL
 *
 */

@ControllerBind(controllerKey = "/business/dcityratio")
public class DCityRatioController extends Controller<DCityRatio>{
	/**
	 * 查询数据
	 * parameter参数为null则查询所有数据
	 * parameter参数不为null则根据parameter参数为条件查询数据
	 * 返回json格式
	 */
	public void query() throws Exception{
		renderJson(DCityRatio.dCityRatio.query((Object)getPara("parameter")));
	}
	public void addDB()
	{
		renderJsonResult(getModel(DCityRatio.class,"DCityRatio").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DCityRatio.class,"DCityRatio").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DCityRatio.dCityRatio.deleteBysId(getParaToInt("id")));
	}
}
