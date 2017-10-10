package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.DLocalHeadquarters;
import com.huayue.business.model.nospace.DisStaReport;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 地方抗震救灾指挥部联系数据表
 * 
 * @author CXL
 *
 */

@ControllerBind(controllerKey = "/business/dlocalheadquarters")
public class DLocalHeadquartersController extends Controller<DLocalHeadquarters>{
	/**
	 * 查询数据
	 * parameter参数为null则查询所有数据
	 * parameter参数不为null则根据parameter参数为条件查询数据
	 * 返回json格式
	 */
	public void query() throws Exception{
		renderJson(DLocalHeadquarters.dLocalHeadquarters.query((Object)getPara("parameter")));
	}
	public void addDB()
	{
		renderJsonResult(getModel(DLocalHeadquarters.class,"DLocalHeadquarters").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DLocalHeadquarters.class,"DLocalHeadquarters").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DLocalHeadquarters.dLocalHeadquarters.deleteBysId(getParaToInt("id")));
	}
}
