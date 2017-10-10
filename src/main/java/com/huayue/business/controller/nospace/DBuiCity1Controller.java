package com.huayue.business.controller.nospace;

import com.huayue.jbase.jfinal.ext.ctrl.Controller;
import com.huayue.business.model.nospace.AftDisReport;
import com.huayue.business.model.nospace.DBuiCity1;
import com.huayue.business.model.space.DangerousSource;
import com.jfinal.ext.route.ControllerBind;

/**
 * 房屋统计表1(按结构)
 * 
 * @author CXL
 * 
 */

@ControllerBind(controllerKey = "/business/dbuicity1")
public class DBuiCity1Controller extends Controller<DBuiCity1>{
	/**
	 * 查询数据
	 * parameter参数为null则查询所有数据
	 * parameter参数不为null则根据parameter参数为条件查询数据
	 * 返回json格式
	 */
	public void query() throws Exception{
		renderJson(DBuiCity1.dBuiCity1.query((Object)getPara("parameter")));
	}
	public void addDB()
	{
		renderJsonResult(getModel(DBuiCity1.class,"DBuiCity1").save());
	}
	public void editDB()
	{
		renderJsonResult(getModel(DBuiCity1.class,"DBuiCity1").update());
	}
	public void deleteDB()
	{
		renderJsonResult(DBuiCity1.dBuiCity1.deleteBysId(getParaToInt("id")));
	}
}
