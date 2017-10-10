package com.huayue.business.controller.nospace;

import com.huayue.business.model.nospace.DBuiCity1;
import com.huayue.business.model.nospace.DBuiFirm;
import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.jfinal.ext.route.ControllerBind;

/**
 * 大型企业房屋统计表
 * @author CXL
 *
 */

@ControllerBind(controllerKey = "/business/dbuifirm")
public class DBuiFirmController extends Controller<DBuiFirm>{
	/**
	 * 查询数据
	 * parameter参数为null则查询所有数据
	 * parameter参数不为null则根据parameter参数为条件查询数据
	 * 返回json格式
	 */
	public void query() throws Exception{
		renderJson(DBuiFirm.dBuiFirm.query((Object)getPara("parameter")));
	}
	public void count() throws Exception{
		renderJson(DBuiFirm.dBuiFirm.count());
	}
	public void addDB()
	{
		renderJsonResult(getModel(DBuiFirm.class,"DBuiFirm").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DBuiFirm.class,"DBuiFirm").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DBuiFirm.dBuiFirm.deleteBysId(getParaToInt("id")));
	}
}
